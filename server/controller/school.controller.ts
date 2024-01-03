import express from "express";
import { School } from "../model/database";
import { CustomError } from "../utils/globalErrorHandler";
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
    let v = schools.__v;
    Object.assign(schools?.gradePoints || {}, req.body);
    console.log(schools?.gradePoints, req.body);
    schools.__v = v;
    await schools.save().then((e) => {
      console.log(e.gradePoints);
    });

    return res.status(200).json({
      msg: "successfully set",
      status: 200,
    });
  }
  public async getGradePoints(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let schools = await School.findOne({ school, schoolId }).sort({});

    if (!Object.keys(schools?.gradePoints || {}).length) {
      throw new CustomError({}, "grade points not found", 400);
    }
    return res.status(200).json({
      gradePoints: schools?.gradePoints,
      msg: "grade points fetched ",
      status: 200,
    });
  }
  public async addGradePoints(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    const { grades } = req.body;

    let schoolToUpdate = await School.findOne({ school, schoolId });
    if (!schoolToUpdate) throw new CustomError({}, "school not found", 400);
    if (schoolToUpdate.gradePoints) {
      schoolToUpdate.gradePoints = {
        ...(schoolToUpdate?.gradePoints || {}),
        ...grades,
      };
    }
    await schoolToUpdate.save();
    return res.json({
      status: 200,
      msg: "updated grade points",
      gradePoints: schoolToUpdate?.gradePoints,
    });
  }

  public async deleteGradePoint(req: express.Request, res: express.Response) {
    interface IGrade {
      grade: string | undefined;
    }
    // let school = req.user?.school;
    // let schoolId = req.user?.schoolId;
    // let { grade }: IGrade = req.body;
    // if (!grade) throw new CustomError({}, "grade not found", 404);
    // let schoolToUpdate = await School.findOne({ school, schoolId });
    // if (!schoolToUpdate) throw new CustomError({}, "school not found", 400);
    // delete schoolToUpdate.gradePoints[grade];
    // await schoolToUpdate.save();
    // return res.status(204);
  }
  public async setGradeStyle(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let schoolDetails = await School.findOne({ school, schoolId });
    if (!schoolDetails) {
      return await School.create({
        school,
        schoolId,
        gradeStyle: req.body?.gradeStyle,
      });
    }
    //if(!schoolDetails?.gradeStyle)schoolDetails.gradeStyle='Tertiary'
    schoolDetails.gradeStyle = req.body?.gradeStyle;
    await schoolDetails.save();
    return res.status(200).json({
      msg: "updated gradestyle successfully",
      status: 200,
    });
  }
  public async getGradeStyle(req: express.Request, res: express.Response) {
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let schoolDetails = await School.findOne({ school, schoolId });
    if (!schoolDetails) {
      await School.create({
        school,
        schoolId,
        gradeStyle: "Tertiary",
      }).then((schoolDetail) => {
        return res.status(200).json({
          gradeStyle: schoolDetail.gradeStyle,
        });
      });
    } else {
      return res.status(200).json({
        gradeStyle: schoolDetails?.gradeStyle,
      });
    }
  }
  //add and remove grade points
}
export default SchoolController;
