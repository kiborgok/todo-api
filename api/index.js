import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "../startup/db.js";
import { authenticationRoute } from "../authenticate.js";
import { Task } from "../models/task.js";

const port = process.env.PORT || 5000;
const app = express();

app.listen(port, () => console.log("Server listening on port ", port));

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

authenticationRoute(app);

app.post("/tasks/new", async (req, res) => {
  const task = new Task(req.body.task);
  await task.save();
  res.json({ task });
});

app.delete("/tasks/delete/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  res.json({ task });
});

app.post("/tasks/update", async (req, res) => {
  const { _id, group, name, isComplete } = req.body.task;

  if (group) {
    const task = await Task.findByIdAndUpdate(
      _id,
      {
        group,
      },
      { new: true }
    );
    if (!task)
      return res.status(404).send("The task with the given ID was not found.");
    res.json({ task });
  }
  if (name) {
    const task = await Task.findByIdAndUpdate(
      _id,
      {
        name,
      },
      { new: true }
    );
    if (!task)
      return res.status(404).send("The task with the given ID was not found.");
    res.json({ task });
  }
  if (isComplete !== undefined) {
    const task = await Task.findByIdAndUpdate(
      _id,
      {
        isComplete,
      },
      { new: true }
    );
    if (!task)
      return res.status(404).send("The task with the given ID was not found.");
    res.json({ task });
  }
});
