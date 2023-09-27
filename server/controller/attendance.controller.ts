import { CustomError } from "../middleware/decorators";
import Attendance from "../model/academic/Attendance";
import express from "express";
import { AcademicYear } from "../model/database";
let instance: any;
class AttendanceController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public async getAttendanceDetails(
    req: express.Request,
    res: express.Response
  ) {
    const { id, className } = req.params;
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let year = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let term = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    if (!year || !term)
      throw new CustomError(
        {},
        "set year and term to get attendance records",
        400
      );
    let details = await Attendance.findOne({
      studentId: id,
      className,
      year,
      term,
    });
    if (!details) throw new CustomError({}, "no recorded attendance", 404);
    res.status(200).json({
      msg: "attendance details",
      attendance: details,
    });
  }
  public async setAttendanceDetails(
    req: express.Request,
    res: express.Response
  ) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const { date, status } = req.body;
  
    const { id, className } = req.params;
    let year = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let term = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    if (!year || !term)
      throw new CustomError(
        {},
        "set year and term to set attendance record",
        400
      );
    let details = await Attendance.findOne({
      studentId: id,
      className,
      year,
      term,
    });
    //if no attendance details,create it
    if (!details) {
      await new Attendance({
        studentId: id,
        className,
        school: req.user?.school,
        schoolId: req.user?.schoolId,
        year,
        term,
        ...req.body,
        attendanceDetails: {
          date,
          status,
        },
      }).save();
    } else {
      //else append to existing
      if (!details?.attendanceDetails)
        throw new CustomError({}, "no attendance details found", 400);
      for (let i of details?.attendanceDetails) {
        if (i.date === date) {
          throw new CustomError({}, "Attendance already computed", 400);
        }
      }
      details.attendanceDetails.push({
        ...req.body,
      });
      await details.save();
    }
    return res.status(201).json({
      msg: "successful addition",
      status: 201,
    });
  }
  public async EditAttendanceDetails(
    req: express.Request,
    res: express.Response
  ) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const { date, status } = req.body;

    const { id, className } = req.params;
    let year = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    let term = await AcademicYear.findOne({
      school,
      schoolId,
      isCurrent: true,
    });
    if (!year || !term)
      throw new CustomError(
        {},
        "set year and term to update attendance record",
        400
      );
    let details = await Attendance.findOne({
      studentId: id,
      className,
      year,
      term,
    });
    if (!details) throw new CustomError({}, "no recorded attendance", 404);
    let version = details.__v;
    let oldAttendance = details.attendanceDetails;
    let oldDetails = oldAttendance.find((record) => record.date === date);
    if (!oldDetails)
      throw new CustomError(
        {},
        "error fetching previous attendance record",
        400
      );
    Object.assign(oldDetails, req.body);
    details.__v = version;
    await details.save();
    return res.status(200).json({
      msg: "successful update",
      status: 200,
    });
  }
}

let attendance = Object.freeze(new AttendanceController());
export { attendance };
