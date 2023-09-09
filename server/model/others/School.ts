import mongoose from "mongoose";

let schoolSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  account_number: String,
});

let School = mongoose.model("School", schoolSchema);

export default School;
