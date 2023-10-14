"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolBus = void 0;
const mongoose_1 = require("mongoose");
let instance;
class schoolBusSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
            price: Number,
            school: String,
            schoolId: String,
            noOfSeats: Number,
            noOfBuses: Number,
            createdBy: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Admin",
            },
        }, {
            timestamps: true,
        });
    }
}
let schoolBus = (0, mongoose_1.model)("schoolBus", new schoolBusSchema().schema());
exports.schoolBus = schoolBus;
schoolBus.syncIndexes();
