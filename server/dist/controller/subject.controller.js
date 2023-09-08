"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Subject_1 = require("../model/academic/Subject");
const decorators_1 = require("../middleware/decorators");
//setErrorStatusCode is a decorator that sets the status Code on error
// export async function addSubject(req: Request, res: Response) {
//   try {
//     const { subjectName, className, teacherId } = req.body;
//     await Subject.find({ className, subjectName }).then((subject) => {
//       if (subject.length < 1) {
//         new Subject({
//           subjectName,
//           className,
//           teacherId,
//         })
//           .save()
//           .then((subject) => {
//             res.status(201).json({
//               status: 201,
//               msg: "added subject successfully",
//               subject,
//             });
//           });
//       } else {
//         throw new Error("subject already added");
//       }
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       status: 400,
//       msg: "subject addition failed",
//       error,
//       err: error.message,
//     });
//   }
// }
class SubjectController {
    /**
     * getAllSubjects
     * addSubjects
     * editSubjects
     * deleteSubjects
     */
    getAllSubjects(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //   let allSubjects = await Subject.find({});
            //   if (!allSubjects.length)
            //     throw new CustomError({}, "no subjects found", 404);
            //   res
            //     .status(200)
            //     .json({ status: 200, msg: "all students found", subjects: allSubjects });
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let subjectsRawForm = yield Subject_1.Subject.find({ school });
            let sorted = subjectsRawForm.reduce((prev, curr) => {
                if (!prev[curr.className]) {
                    prev[curr.className] = [];
                }
                prev[curr.className].push(curr);
                return prev;
            }, {});
            res.status(200).json({
                status: 200,
                msg: "fetched successfully",
                subjects: sorted,
            });
        });
    }
    addSubjects(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const bulkPush = [];
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            const { subject, className, teacherId } = req.body;
            for (let i of className) {
                bulkPush.push({
                    updateOne: {
                        filter: {
                            name: `${i.toUpperCase()}_${subject.toUpperCase()}`,
                            school
                        },
                        update: {
                            $set: {
                                name: `${i.toUpperCase()}_${subject.toUpperCase()}`,
                                className: i,
                                subject,
                                school,
                                teacherId: teacherId || null,
                            },
                        },
                        upsert: true,
                    },
                });
            }
            let status = (yield Subject_1.Subject.bulkWrite(bulkPush)).isOk();
            if (status) {
                return res
                    .status(201)
                    .json({ status: 200, msg: "added subject successfully" });
            }
            else {
                throw new decorators_1.CustomError({}, "possible error in addition", 400);
            }
        });
    }
    editSubjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = yield new mongoose_1.Types.ObjectId(id);
            let original = yield Subject_1.Subject.findOne({ _id });
            if (!original)
                throw new Error("Subject not found");
            Object.assign(original, req.body);
            yield original.save().then((edited) => {
                res.status(200).json({
                    status: 200,
                    msg: "subject edit successful",
                    edited,
                });
            });
        });
    }
    deleteSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let _id = new mongoose_1.Types.ObjectId(id);
            yield Subject_1.Subject.findOneAndRemove({ _id })
                .then((e) => {
                if (!e)
                    throw new Error("Subject not found");
                res.status(200).json({
                    status: 200,
                    msg: "subject deleted successfully",
                });
            })
                .catch((err) => {
                throw err;
            });
        });
    }
    getAllSubjectsAsJson(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let school = (_a = req.user) === null || _a === void 0 ? void 0 : _a.school;
            let all = yield Subject_1.Subject.find({ school });
            if (!all)
                throw new decorators_1.CustomError({}, "no subject found", 404);
            res.status(200).json({
                status: 200,
                asJson: all,
            });
        });
    }
}
__decorate([
    (0, decorators_1.setErrorStatusCode)(400)
], SubjectController.prototype, "addSubjects", null);
__decorate([
    (0, decorators_1.setErrorStatusCode)(400)
], SubjectController.prototype, "editSubjects", null);
__decorate([
    (0, decorators_1.setErrorStatusCode)(400)
], SubjectController.prototype, "deleteSubjects", null);
exports.default = SubjectController;
