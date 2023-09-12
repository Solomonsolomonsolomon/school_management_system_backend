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
          schoolId: req.user?.schoolId,
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
                    { $eq: ["$schoolId", req.user?.schoolId] }, // Match students from the specific school.
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
          _id: "$_id",
          name: { $first: "$name" },
          price: { $first: "$price" },
          numberOfStudents: {
            $sum: { $size: "$students" },
          },
        },
      },
      // Project to reshape the output.
      {
        $project: {
          name: "$name",
          numberOfStudents: 1,
          _id: 1, // Exclude the "_id" field.
          price: "$price",
        },
      },
    ])
      .then((result) => {
        console.log(result);
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
    let { name, price } = req.body;
   
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let classLevel = await ClassLevel.findOne({ name, school, schoolId });
    if (classLevel)
      throw new CustomError({}, "class level already exists", 400);
    let newClassLevel = new ClassLevel({
      name,
      createdBy: req.user._id,
      school,
      schoolId,
      price,
    });
    console.log(newClassLevel);
    await newClassLevel.save();
    res.status(201).json({
      status: 201,
      msg: "class level added successfully",
      newClassLevel,
    });
  }
  public async deleteClassLevel(req: express.Request, res: express.Response) {
    let { id } = req.params;
    console.log(id);
    let school = req.user?.school;
    let schoolId = req.user?.schoolId;
    let _id = new mongoose.Types.ObjectId(id);
    const classLevelToDelete = await ClassLevel.findById(_id);
    if (!classLevelToDelete) throw new CustomError({}, "class not found", 404);
    const classHasStudents: boolean = !!(await Student.countDocuments({
      className: classLevelToDelete?.name,
      school,
      schoolId,
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
