import mongoose from "mongoose";

export async function db() {
  const db = process.env.MONGODB_URI || "mongodb://localhost:27017/todoapp";
  await mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log(`Connected to ${db}...`));
}

db();
