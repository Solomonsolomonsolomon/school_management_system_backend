import { Request, Response } from "express";
import { Bus, School, Student } from "../model/database";
import { CustomError } from "../utils/globalErrorHandler";
import { schoolBus } from "../model/others/SchoolBus";
import getPlan from "../middleware/getPlan";
CustomError;
let instance: any;
class BusController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public async registerForBus(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let { studentId } = req.body;
    let isValidStudentId = !!(await Student.countDocuments({ studentId }));
    if (!isValidStudentId)
      throw new CustomError({}, "Enter valid student id", 400);
    let bus = await schoolBus.findOne({ school, schoolId });
    if (!bus || !bus.price)
      throw new CustomError({}, "Register school`s bus details", 400);
    let isStudentRegistered = !!(await Bus.findOne({ studentId }));
    if (isStudentRegistered)
      throw new CustomError({}, "student already registered for bus", 400);
    if (!bus.noOfSeats || bus.noOfSeats - 1 < 1)
      throw new CustomError({}, "No available seats left on bus", 400);
    await new Bus({
      studentId,
      school,
      isPaid: false,
      schoolId,
      percentagePaid: 0,
      balance: bus?.price,
      amountPaid: 0,
      address: req.body.address,
    }).save();
    bus.noOfSeats--;
    await bus.save();
    return res.status(201).json({
      msg: "student added to bus",
      status: 201,
    });
  }
  public async payBusFees(req: Request, res: Response) {
    const { studentId } = req.params;
    let { amountPaid } = req.body;
    let bus = await Bus.findOne({ studentId });
    if (!bus) throw new CustomError({}, "student details not found ", 500);

    bus.amountPaid = amountPaid;
    req.body.isPaid ? (bus.isPaid = req.body.isPaid) : "";
    await bus.save();
    return res.status(200).json({
      msg: "successful payment",
      status: 200,
    });
  }
  public async resetAllBusDetails(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let bulkOperations: any[] = [];
    let bus = await schoolBus.findOne({ school, schoolId });
    if (!bus || !bus.price)
      throw new CustomError({}, "school`s bus details not found", 400);
    let students = await Bus.find({ school, schoolId });
    for (let i of students) {
      bulkOperations.push({
        updateOne: {
          filter: { school, schoolId },
          update: {
            $set: {
              balance: bus.price,
              percentagePaid: 0,
              amountPaid: 0,
              isPaid: false,
            },
          },
        },
      });
    }
    await Bus.bulkWrite(bulkOperations);
    return res.status(200).json({
      msg: "reset successful",
    });
  }
  public async registerSchoolBusDetails(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let bus = await schoolBus.findOne({ school, schoolId });
    if (bus)
      throw new CustomError({}, "school bus details already on record", 400);
    await new schoolBus({ school, schoolId, ...req.body }).save();
    return res
      .status(201)
      .json({ msg: "school bus details registered", status: 200 });
  }
  public async editSchoolBusDetails(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let bus = await schoolBus.findOne({ school, schoolId });
    if (!bus) throw new CustomError({}, "school bus details  not found", 400);
    let version = bus.__v;
    Object.assign(bus, req.body);
    bus.__v = version;
    await bus.save();
    return res
      .status(201)
      .json({ msg: "school bus details edited", status: 200 });
  }
  public async editStudentBusDetails(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let studentId = req.params.studentId;

    let bus = await Bus.findOne({ school, schoolId, studentId });
    if (!bus)
      throw new CustomError(
        {},
        "student details  not found in bus records",
        500
      );
    let version = bus.__v;
    Object.assign(bus, req.body);
    bus.__v = version;
    await bus.save();
    return res
      .status(201)
      .json({ msg: "student bus details edited", status: 200 });
  }
  public async getAllStudentsTakingBus(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    // let allStudents = await Bus.find({ school, schoolId });
    let totalStudents = await Bus.countDocuments({ school, schoolId });
    if (!totalStudents)
      throw new CustomError({}, "No students added to bus line", 400);
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalStudents / pageSize);
    const students = await Bus.find({ school, schoolId })
      .skip(skip)
      .limit(pageSize)
      .populate("id")
      .sort({ id: 1 })
      .exec();

    res.status(200).json({
      msg: "Students taking the bus",
      bus: students,
      status: 200,
      page,
      pageSize,
      totalPages,
      totalStudents,
    });
  }
  public async deleteSingleStudent(req: Request, res: Response) {
    let { studentId } = req.params;
    let bus = await Bus.findOneAndDelete({ studentId });
    if (!bus) throw new CustomError({}, "couldnt delete", 400);
    res.status(200).json({
      status: 200,
      msg: "deleted successfully",
    });
  }
  public async getSchoolDetails(req: Request, res: Response) {
    let schoolDetails = await schoolBus.findOne({
      school: req.user?.school,
      schoolId: req.user?.schoolId,
    });
    if (!schoolDetails)
      throw new CustomError({}, "school bus details not registered", 400);
    res.status(200).json({
      msg: "school details",
      status: 200,
      schoolDetails,
    });
  }
  public async searchBusStudent(req: Request, res: Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let { query } = req.query;
    let allStudents = await Bus.find({
      school,
      schoolId,
      studentId: { $regex: `(.*)${query}(.*)` },
    });

    return res.status(200).json({
      msg: "srarch results",
      filtered: allStudents,
      status: 200,
    });
  }
}

export default Object.freeze(new BusController());
