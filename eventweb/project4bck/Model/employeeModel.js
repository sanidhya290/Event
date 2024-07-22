import mongoose from "mongoose";
import validator from "validator";

const empSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  phone_no: {
    type: String,
    required: [true, "Phone number is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  priority: {
    type: String,
    required: [true, "Please specify a priority"],
  },
});

const Employee = mongoose.model("Employee", empSchema);

export default Employee;
