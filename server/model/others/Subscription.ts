import { Schema, model, Types } from "mongoose";
const subscriptionSchema = new Schema({
  school: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});
let Subscription = model("Subscription", subscriptionSchema);
export { Subscription };
