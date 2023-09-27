import { CustomError } from "../middleware/decorators";
import { AcademicTerm } from "../model/database";
import mongoose from "mongoose";
import express from "express";

//#please note that the routes for this controller are in admin.routes not academicTerm
class AcademicTermController {
  /**
   * getAllTerms
   * addATerm
   * setCurrentTerm
   * deleteATerm
   */
  public async getAllTerms(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let allTerms = await AcademicTerm.find({ school });
    if (!allTerms.length) throw new CustomError({}, "no terms found", 404);
    res.status(200).json({
      status: 200,
      msg: "all terms data",
      terms: allTerms,
      school,
      schoolId,
    });
  }
  public async addATerm(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let name = req.body.name;
    let termExists = await AcademicTerm.findOne({ name, school });
    if (termExists)
      throw new CustomError({}, "term has been added already", 400);
    let newTerm = await new AcademicTerm({
      createdBy: req.user?._id,
      ...req.body,
      school,
      schoolId,
    });
    await newTerm
      .save()
      .then((term) =>
        res.json({ status: "2xx", msg: "term added successfully", term })
      );
  }
  public async setCurrentTerm(req: express.Request, res: express.Response) {
    let { id } = req.params;
    let _id = await new mongoose.Types.ObjectId(id);
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let previous = await AcademicTerm.findOne({
      isCurrent: true,
      school,
      schoolId,
    });
    if (previous) {
      previous.isCurrent = false;
      await previous.save().catch((err) => {
        throw new CustomError(err, err.message, 400);
      });
    }

    let current = await AcademicTerm.findOne({ _id });

    current!.isCurrent = true;
    current!.updatedBy = req.user?._id;
    await current!
      .save()
      .then((current) => {
        res.status(200).json({
          status: 200,
          msg: "current set",
          current,
        });
      })
      .catch((err) => {
        throw new CustomError({}, err.message, 400);
      });
  }
  public async deleteTerm(req: express.Request, res: express.Response) {
    let { id } = req.params;
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let _id = new mongoose.Types.ObjectId(id);
    let isCurrent = !!(await AcademicTerm.findOne({
      _id,
      isCurrent: true,
      school,
      schoolId,
    }));
    if (isCurrent) throw new CustomError({}, "cannot delete current term", 403);
    let term = await AcademicTerm.findOneAndRemove({ _id, school, schoolId });
    if (!term) {
      throw new CustomError(
        {},
        "term already deleted or term doesnt exist",
        404
      );
    } else {
      res.status(200).json({ status: "2xx", msg: "term deleted successfully" });
    }
  }
  public async getCurrentTerm(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId: string = req.user?.schoolId;

    await AcademicTerm.findOne({
      isCurrent: true,
      schoolId,
    }).then((currentTerm) => {
      if (!currentTerm)
        throw new CustomError({}, "no current term set,set new term", 404);
      res.status(200).json({
        status: 200,
        message: "current term found",
        currentTerm,
      });
    });
  }
}
export default AcademicTermController;
