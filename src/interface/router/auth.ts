import express from "express";
import { User, IUser } from "../../domain/user";
import {
  authenticateToken,
  generateAccessToken,
} from "../middleware/authentificateToken";

export const auth = express.Router();
auth.get("/", async (req, res) => {
  res.send({
    "sign in": "/login",
    "create user": "/subscribe",
  });
});

auth.get("/all", authenticateToken, async (req, res) => {
  const users = await User.find();
  res.send({ users });
});

auth.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user || user._id == "") {
    res.status(401).send("wrong password or username");
    return;
  }

  const accessToken = generateAccessToken({ username } as IUser);

  user.token = accessToken;

  user.save();

  res
    .cookie("accessToken", accessToken)
    .json({ accessToken, userId: user._id });
});

auth.post("/logout", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];

  try {
    let token =
      (authHeader && authHeader.split(" ")[1]) || req.cookies.accessToken;

    User.logout(token);

    res.send("success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

auth.post("/subscribe", async (req, res) => {
  const { username, password } = req.body;

  if (!(await User.subscribe({ username, password } as IUser))) {
    res.status(401).send("can't create this user");
    return;
  }

  return res.send("success");
});

auth.put("/:_id", authenticateToken, async (req, res) => {
  const { _id } = req.params;
  const { passID } = req.body;

  if (!passID) {
    return res.sendStatus(400).send("no pass selected");
  }

  try {
    await User.setPassId(_id, `${passID}`);
    return res.send("success");
  } catch (err) {
    console.error("can't update");
    return res.send("fail");
  }
});

auth.delete("/:id", authenticateToken, async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await User.deleteMany({ _id });

    if (result.deletedCount <= 0) {
      return res.status(500).send("the user does not exist");
    }

    return res.send(true);
  } catch (err) {
    console.error(err);

    return res.status(500).send(err);
  }
});
