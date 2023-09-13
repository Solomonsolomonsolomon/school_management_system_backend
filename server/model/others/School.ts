import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  button: String,
  headers: String,
  text: String,
  
});

const schoolSchema = new mongoose.Schema({
  name: String,
  schoolId: String,
  account_number: String,
  subaccount_code: String,
  themes: {
    type: themeSchema,
    default: {
      button: "",
      headers: "",
      text: "",
      saveButtons: "",
      cancelButtons: "",
    },
  },
});

const School = mongoose.model("School", schoolSchema);
School.syncIndexes();
export { School };
