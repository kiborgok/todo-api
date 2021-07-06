import mongoose from "mongoose";

export const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Group = mongoose.model("Group", groupSchema);
