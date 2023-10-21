"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const mongoose_1 = require("mongoose");
let instance;
class MessagesSchema {
    constructor() {
        if (instance)
            return instance;
        instance = this;
    }
    schema() {
        return new mongoose_1.Schema({
            school: String,
            schoolId: String,
            sender: { type: mongoose_1.Schema.Types.ObjectId },
            senderRole: String,
            content: String,
            recipient: { type: mongoose_1.Schema.Types.ObjectId },
            recipientRole: String,
            chat: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Chat",
            },
        }, {
            timestamps: true,
        });
    }
}
let Messages = (0, mongoose_1.model)("Messages", new MessagesSchema().schema());
exports.Messages = Messages;
Messages.syncIndexes();
