import express from "express";
import { School } from "../model/database";
import { CustomError } from "../middleware/decorators";
let oldThemes = {
  button: "#4B5563",
  header: "#4a5568",
  text: "#000000",
  sideBar: "#4a5568",
  sideBarText: "#ffffff",
  background: "#ffffff",
  loginImg: "#ffffff",
  buttonText: "#ffffff",
};
let instance: any;
class SchoolController {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public async changeTheme(req: express.Request, res: express.Response) {
    let schoolId = req.user?.schoolId;
    let school = req.user?.school;
    let sch = await School.findOne({ schoolId, school });
    if (!sch)
      return await School.create({
        school,
        schoolId,
        themes: Object.assign(oldThemes, req.body),
      });
    let version = sch.__v;
    Object.assign(sch.themes, req.body);
    sch.__v = version;
    await sch.save();
    res.status(200).json({
      status: 200,
      msg: "successful update",
    });
  }
  public async getCurrentTheme(req: express.Request, res: express.Response) {
    let schoolId = req.user?.schoolId;
    let school = req.user?.school;

    let theSchool = await School.findOne({ schoolId });
    if (!theSchool) throw new CustomError({}, "school details not found", 404);
    res.status(200).json({
      msg: "theme",
      status: 200,
      themes: theSchool.themes,
    });
  }

  public async getDefaultTheme(req: express.Request, res: express.Response) {
    res.status(200).json({
      status: 200,
      msg: "default theme settings",
      default: {
        button: "#4B5563",
        header: "#4a5568",
        text: "#000000",
        sideBar: "#4a5568",
        sideBarText: "#ffffff",
        background: "#ffffff",
        loginImg: "#ffffff",
        buttonText: "#ffffff",
      },
    });
  }
  public async insertLogo(req: express.Request, res: express.Response) {
    let schoolId = req.user?.schoolId;
    let school = req.user?.school;
    let { logo } = req.body;
    let sch = await School.findOne({ schoolId, school });
    if (!sch) return await School.create({ school, schoolId, logo });
    let version = sch.__v;
    Object.assign(sch, req.body);
    sch.__v = version;
    await sch.save();
    res.status(200).json({
      status: 200,
      msg: "successful update",
    });
  }
  public async getLogo(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let sch = await School.findOne({ schoolId });
    if (!sch) throw new CustomError({}, "school details not found", 404);
    res.status(200).json({
      msg: "logo",
      status: 200,
      logo: sch.logo,
    });
  }
  public async logoAndThemes(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let sch = await School.findOne({ schoolId });
    if (!sch) throw new CustomError({}, "school details not found", 404);
    res.status(200).json({
      msg: "logo and themes",
      status: 200,
      logo: sch.logo,
      themes: sch.themes,
    });
  }
  public async setGradePoints(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let schools = await School.findOne({ school, schoolId });
    if (!schools) {
      schools = await School.create({ school, schoolId });
    }
    if (!Object.keys(schools?.gradePoints || {}).length) {
      throw new CustomError({}, "grade points not found", 400);
    }
    Object.assign(schools?.gradePoints, req.body);
    await schools.save();
    return res.status(200).json({
      msg: "successfully set",
      status: 200,
    });
  }
  public async getGradePoints(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let schools = await School.findOne({ school, schoolId });
    console.log(schools?.gradePoints);
    if (!Object.keys(schools?.gradePoints || {}).length) {
      throw new CustomError({}, "grade points not found", 400);
    }
    return res.status(200).json({
      gradePoints: schools?.gradePoints,
      msg: "grade points fetched ",
      status: 200,
    });
  }
}
export default SchoolController;
