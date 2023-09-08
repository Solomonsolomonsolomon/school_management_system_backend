"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../model/database");
const decorators_1 = require("../middleware/decorators");
class ClassLevelController {
    /**
     * getAllClassLevels
     * createClassLevel
     * deleteClassLevel
     */
    getAllClassLevels(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.ClassLevel.aggregate([
                // Match only the documents for the specific school (replace 'YourSchoolName' with the actual school name).
                {
                    $match: {
                        school: (_a = req.user) === null || _a === void 0 ? void 0 : _a.school,
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
                                            { $eq: ["$className", "$$className"] },
                                            { $eq: ["$school", (_b = req.user) === null || _b === void 0 ? void 0 : _b.school] }, // Match students from the specific school.
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
                        _id: 1, // Exclude the "_id" field.
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
        });
    }
    createClassLevel(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let { name } = req.body;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let classLevel = yield database_1.ClassLevel.findOne({ name, school });
            if (classLevel)
                throw new decorators_1.CustomError({}, "class level already exists", 400);
            let newClassLevel = new database_1.ClassLevel({
                name,
                createdBy: req.user._id,
                school,
            });
            yield newClassLevel.save();
            res.status(201).json({
                status: 201,
                msg: "class level added successfully",
                newClassLevel,
            });
        });
    }
    deleteClassLevel(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            console.log(id);
            let _id = new mongoose_1.default.Types.ObjectId(id);
            const classLevelToDelete = yield database_1.ClassLevel.findById(_id);
            if (!classLevelToDelete)
                throw new decorators_1.CustomError({}, "class not found", 404);
            const classHasStudents = !!(yield database_1.Student.countDocuments({
                className: classLevelToDelete === null || classLevelToDelete === void 0 ? void 0 : classLevelToDelete.name,
                school,
            }));
            if (classHasStudents)
                throw new decorators_1.CustomError({}, "cannot delete class.Students are associated with this class level", 400);
            yield classLevelToDelete.deleteOne();
            res.status(200).json({
                status: 200,
                msg: "deleted successfully",
            });
        });
    }
}
exports.default = ClassLevelController;
