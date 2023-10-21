"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let instance;
class UserSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
            school: String,
            schoolId: String,
            userId: mongoose_1.Schema.Types.ObjectId,
            role: String,
            name: String,
            email: String,
        });
    }
}
let User = (0, mongoose_1.model)("User", Object.freeze(new UserSchema().schema()));
User.syncIndexes();
exports.default = User;
