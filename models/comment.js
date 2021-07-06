import mongoose from "mongoose";
import { taskSchema } from "./task.js";
import { userSchema } from "./user.js";

export const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: userSchema,
    required: true,
  },
  task: {
    type: taskSchema,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
