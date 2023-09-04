import express from "express";
import mongoose from "mongoose";
import { ClassLevel, Student } from "../model/database";
import { CustomError } from "../middleware/decorators";
import { name } from "ejs";
class ClassLevelController {
  /**
   * getAllClassLevels
   * createClassLevel
   * deleteClassLevel
   */

  public async getAllClassLevels(req: express.Request, res: express.Response) {
    await ClassLevel.find({}).sort({name:1}).then(async (classes) => {
      if (classes.length < 1)
        throw new CustomError({}, " no classes found", 404);
      let classthing = ClassLevel.aggregate([
        {
          $lookup: {
            from: "students",
            localField: "name",
            foreignField: "className",
            as: "student",
          },
        },
        {
          $lookup: {
            from: "teachers",
            localField: "formTeacherId", // Replace with your field name for form teacher reference
            foreignField: "_id",
            as: "formTeacher",
          },
        },
        {
          $project: {
            name: "$name",
            numberOfStudents: { $size: "$student" },
            formTeacher: { $arrayElemAt: ["$formTeacher.name", 0] },
          },
        },
      ]);

      let result = await classthing.exec();
      
      res.status(200).json({
        status: 200,
        msg: "success",
        classes: result,
      });
    });
  }
  public async createClassLevel(req: express.Request, res: express.Response) {
    let { name } = req.body;
    let classLevel = await ClassLevel.findOne({ name });
    if (classLevel)
      throw new CustomError({}, "class level already exists", 400);
    let newClassLevel = new ClassLevel({
      name,
      createdBy: req.user._id,
    });
    await newClassLevel.save();
    res.status(201).json({
      status: 201,
      msg: "class level added successfully",
      newClassLevel,
    });
  }
  public async deleteClassLevel(req: express.Request, res: express.Response) {
    let { id } = req.params;
    if (!(await mongoose.isValidObjectId(id)))
      throw new CustomError({}, "enter valid id", 400);
    const classLevelToDelete = await ClassLevel.findById(id);
    if (!classLevelToDelete) throw new CustomError({}, "class not found", 404);
    const classHasStudents: boolean = !!(await Student.countDocuments({
      className: classLevelToDelete?.name,
    }));
    if (classHasStudents)
      throw new CustomError(
        {},
        "cannot delete class.Students are associated with this class level",
        400
      );
    await classLevelToDelete.deleteOne();
    res.status(200).json({
      status: 200,
      msg: "deleted successfully",
    });
  }

}
export default ClassLevelController;
