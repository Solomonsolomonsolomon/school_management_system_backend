import { model, Schema, Types } from "mongoose";
let instance: any;
interface User {
  role: string;
  id: Types.ObjectId;
}
let userSchema = new Schema<User>({
  id: Schema.Types.ObjectId,
  role: String,
});
class ChatSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public schema() {
    return new Schema(
      {
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
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        latestMessage: {
          type: Schema.Types.ObjectId,
          ref: "Messages",
        },
      },

      {
        timestamps: true,
      }
    );
  }
}
let Chat = model("Chat", new ChatSchema().schema());
Chat.syncIndexes();
export { Chat };
