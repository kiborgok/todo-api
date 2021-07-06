import mongoose from "mongoose";
import { groupSchema } from "./group.js";

export const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: groupSchema,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

export const Task = mongoose.model("Task", taskSchema);
