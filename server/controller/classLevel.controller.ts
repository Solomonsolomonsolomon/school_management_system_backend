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
    await ClassLevel.aggregate([
      // Match only the documents for the specific school (replace 'YourSchoolName' with the actual school name).
      {
        $match: {
          school: req.user?.school,
        },
      },
      // Lookup students that belong to the current class and school.
      {
        $lookup: {
          from: "students",
          let: { className: "$name" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$className", "$$className"] }, // Match students with the same class name.
                    { $eq: ["$school", req.user?.school] }, // Match students from the specific school.
                  ],
                },
              },
            },
          ],
          as: "students",
        },
      },
      // Group by class name and calculate the number of students in each class.
      {
        $group: {
          _id: "$name",
          numberOfStudents: {
            $sum: { $size: "$students" },
          },
        },
      },
      // Project to reshape the output.
      {
        $project: {
          name: "$_id",
          numberOfStudents: 1,
          _id: 0, // Exclude the "_id" field.
        },
      },
    ])
      .then((result) => {
        res.status(200).json({
          status: 200,
          msg: "success",
          classes: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: 500,
          msg: "An error occurred",
        });
      });
  }
  public async createClassLevel(req: express.Request, res: express.Response) {
    let { name } = req.body;
    let school = req.user?.school;
    let classLevel = await ClassLevel.findOne({ name, school });
    if (classLevel)
      throw new CustomError({}, "class level already exists", 400);
    let newClassLevel = new ClassLevel({
      name,
      createdBy: req.user._id,
      school,
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
