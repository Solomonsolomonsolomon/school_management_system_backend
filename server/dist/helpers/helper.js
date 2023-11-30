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
Object.defineProperty(exports, "__esModule", { value: true });
let instance = null;
class Helper {
    constructor() {
        if (!instance)
            instance = this;
        return instance;
    }
    paginate(Model, totalAmount, filter, sort, pageSize, page, populate, select) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * pageSize;
            const totalPages = Math.ceil(totalAmount / pageSize);
            let model = yield Model.find(filter)
                .sort(sort ? sort : {})
                .skip(skip)
                .limit(pageSize)
                .populate(populate ? populate : "")
                .select(select ? select : "");
            if (!model.length)
                throw new Error("Not found");
            return {
                model,
                page,
                totalPages,
            };
            //   .then((student: any) => {
            //     if (student.length < 1) throw new Error("No student found");
            //     return {
            //       student,
            //       page,
            //       totalPages,
            //     };
            //   });
        });
    }
}
exports.default = Object.freeze(new Helper());
