import { model, Schema } from "mongoose";
let instance: any;
class ChatSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }
  public schema() {
    return new Schema(
      {
        chatName: {
          type: String,
          trim: true,
        },
        isGroupChat: {
          type: Boolean,
        },
        users: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        ],
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
