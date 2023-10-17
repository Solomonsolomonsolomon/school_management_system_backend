import { model, Schema } from "mongoose";
let instance: any;
class UserSchema {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  public schema() {
    return new Schema({
      school: String,
      schoolId: String,
      userId: Schema.Types.ObjectId,
      role: String,
      name: String,
      email: String,
    });
  }
}

let User = model("User", Object.freeze(new UserSchema().schema()));
User.syncIndexes();
export default User;
