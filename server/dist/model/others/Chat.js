"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
let instance;
let userSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    role: String,
});
class ChatSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
            school: String,
            schoolId: String,
            chatName: {
                type: String,
                trim: true,
            },
            isGroupChat: {
                type: Boolean,
            },
            users: [userSchema],
            groupAdmin: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            latestMessage: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Messages",
            },
        }, {
            timestamps: true,
        });
    }
}
let Chat = (0, mongoose_1.model)("Chat", new ChatSchema().schema());
exports.Chat = Chat;
Chat.syncIndexes();
