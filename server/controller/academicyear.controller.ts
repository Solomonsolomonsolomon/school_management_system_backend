import { CustomError } from "../middleware/decorators";
import cron from "node-cron";
import express from "express";
import { AcademicYear } from "../model/database";
import mongoose from "mongoose";
class AcademicYearController {
  /**
   * addAcademicYear
   * addYearAutomatically
   * getAllYears
   * getCurrentYear
   * deleteYear
   * setCurrentYear
   */
  constructor() {
    this.addAcademicYear = this.addAcademicYear.bind(this);
    this.addYearAutomatically = this.addYearAutomatically.bind(this);
    this.setCurrentYear = this.setCurrentYear.bind(this);
  }
  // public async makeCurrent(year: any) {
  //   let previous = await AcademicYear.findOne({ isCurrent: true });
  //   if (previous) {
  //     previous.isCurrent = false;
  //    await previous.save();
  //   }
  //    year.isCurrent = true;
  // }

  public async makeCurrent(schoolId: string, term: any) {
    try {
      let previous = await AcademicYear.findOne({ isCurrent: true, schoolId });
      if (previous) {
        previous.isCurrent = false;
        await previous.save().catch((err: any) => {
          throw new CustomError(err, err.message, 400);
        });
      }
      term.isCurrent = true;
      await term.save();
    } catch (error) {
      console.error(error);
      throw new CustomError(error, "Error while setting current term", 500);
    }
  }
  public async addAcademicYear(req: express.Request, res: express.Response) {
    let { fromYear, toYear } = req.body;
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let name = `${fromYear}/${toYear}`;
    let year = await AcademicYear.findOne({ name, schoolId });
    if (year) {
      throw new CustomError({}, "year already added", 403);
    } else {
      let newYear = await new AcademicYear({
        name,
        fromYear,
        toYear,
        school,
        schoolId,
        createdBy: req.user._id,
      });
      await this.makeCurrent(schoolId, newYear);
      newYear.save().then((year: any) => {
        res.status(201).json({
          status: 201,
          msg: "academic year added successfully",
          year,
        });
      });
    }
  }
  public async addYearAutomatically(school: string) {
    await cron.schedule("0 0 * 9 * ", async () => {
      try {
        let date = new Date();

        let name = `${date.getFullYear()}/${date.getFullYear() + 1}`;
        let yearAlreadyAdded = await AcademicYear.findOne({ name });
        if (yearAlreadyAdded)
          throw new CustomError({}, "year already exists", 400);
        let newYear = new AcademicYear({
          name,
          fromYear: date.getFullYear(),
          toYear: date.getFullYear() + 1,
          createdByBot: true,
        });
        await this.makeCurrent(school, newYear);
        await newYear.save();
   
      } catch (error: any) {
        console.error(error.message);
      }
    });
  }
  public async getAllYears(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    await AcademicYear.find({ school,schoolId }).then((years: any[]) => {
      if (years.length < 1) throw new CustomError({}, "no years found", 404);
      res.status(200).json({
        status: 200,
        msg: "all years",
        years,
      });
    });
  }

  public async getCurrentYear(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let current = await AcademicYear.findOne({ isCurrent: true, school ,schoolId});
    if (!current)
      throw new CustomError({}, "no current year,please set current year", 404);
    await res.status(200).json({
      status: 200,
      msg: "current year fetched successfully",
      current,
    });
  }

  public async deleteYear(req: express.Request, res: express.Response) {
    let { id } = req.params;
    let _id = await new mongoose.Types.ObjectId(id);
    let isCurrent = !!(await AcademicYear.findOne({ _id, isCurrent: true }));
    if (isCurrent) throw new CustomError({}, "cannot delete current year", 403);
    let termToDelete = await AcademicYear.findOneAndRemove({ _id });
    if (!termToDelete)
      throw new CustomError(
        {},
        "year doesn't exist or year already deleted",
        404
      );
    res.status(200).json({
      status: 200,
      msg: "deleted year successfully",
    });
  }

  public async setCurrentYear(req: express.Request, res: express.Response) {
    let { id } = req.params;
    let _id = await new mongoose.Types.ObjectId(id);
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let previous = await AcademicYear.findOne({ isCurrent: true, school,schoolId });
    if (previous) {
      previous.isCurrent = false;
      await previous.save().catch((err: any) => {
        throw new CustomError(err, err.message, 400);
      });
    }
    let current = await AcademicYear.findOne({ _id });
    if (!current) throw new CustomError({}, "year not found", 404);
    current!.isCurrent = true;
    current!.updatedBy = req.user?._id;
    await current!
      .save()
      .then((current: any) => {
        res.status(200).json({
          status: 200,
          msg: "current set",
          current,
        });
      })
      .catch((err: any) => {
        throw new CustomError({}, err.message, 400);
      });
  }
}

export default AcademicYearController;
