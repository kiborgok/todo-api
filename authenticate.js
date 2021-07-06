import md5 from "md5";
import { User } from "./models/user.js";
import { Task } from "./models/task.js";
import { Group } from "./models/group.js";

const authenticationTokens = [];

async function assembleUserState(user) {
  const tasks = await Task.find({ owner: user._id });
  const groups = await Group.find();

  return {
    tasks,
    groups,
    session: {
      authenticated: "AUTHENTICATED",
      user,
    },
  };
}

export const authenticationRoute = (app) => {
  app.get(`/tasks/:id`, async (req, res) => {
    const tasks = await Task.find({ owner: req.params.id });
    res.json({ tasks });
  });

  app.get(`/tasks`, async (req, res) => {
    const tasks = await Task.find();
    res.json({ tasks });
  });

  app.get(`/groups`, async (req, res) => {
    const groups = await Group.find();
    res.json({ groups });
  });

  app.post(`/authenticate`, async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ name: username });

    if (!user) return res.status(400).send("Invalid email or password.");

    const hash = md5(password);
    const passwordCorrect = hash === user.passwordHash;

    if (!passwordCorrect) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = user.generateAuthToken();

    authenticationTokens.push({
      token,
      userId: user._id,
    });

    const state = await assembleUserState(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({ token, state });
  });

  app.post(`/user/register`, async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ name: username });
    if (user) return res.json({ "error": "User already registered." });

    user = new User({
      name: username,
      passwordHash: md5(password),
    });

    await user.save();

    const token = user.generateAuthToken();

    authenticationTokens.push({
      token,
      userId: user._id,
    });

    const state = await assembleUserState(user);

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ token, state });
  });
};
