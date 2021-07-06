//const config = require("config");
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  friends: [],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    "jwtPrivateKey"
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
