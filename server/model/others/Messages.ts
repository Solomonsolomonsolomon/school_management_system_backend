import { model, Schema, Types } from "mongoose";
let instance: any;
class MessagesSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public schema() {
    return new Schema(
      {
        school: String,
        schoolId: String,
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        content: String,
        recipient: { type: Schema.Types.ObjectId, ref: "User" },
        chat: {
          type: Schema.Types.ObjectId,
          ref: "Chat",
        },
      },

      {
        timestamps: true,
      }
    );
  }
}
let Messages = model("Messages", new MessagesSchema().schema());
Messages.syncIndexes();
export { Messages };
