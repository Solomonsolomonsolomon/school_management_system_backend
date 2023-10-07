import { Request, Response } from "express";
import { Bus, School, Student } from "../model/database";
import { CustomError } from "../middleware/decorators";
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
    let { studentId } = req.params;
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
    let { price } = req.body;
    let bus = await Bus.findOne({ studentId });
    if (!bus) throw new CustomError({}, "student details not found ", 500);
    bus.amountPaid = price;
    await bus.save();
    return res.status(200).json({
      msg: "successfult payment",
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
    let allStudents = await Bus.find({ school, schoolId });
    if (!allStudents.length)
      throw new CustomError({}, "No students added to bus line", 400);
    res.status(200).json({
      msg: "Students taking the bus",
      bus: allStudents,
      status: 200,
    });
  }
}

export default Object.freeze(new BusController());
