const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} is not a valid role",
};

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: true
    },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: String,
  role: {
    type: String,
    default: "USER_ROLE",
    enum: validRoles,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

UserSchema.plugin(uniqueValidator, {
    message: '{PATH}, should be unique'
});

module.exports = mongoose.model("User", UserSchema);
