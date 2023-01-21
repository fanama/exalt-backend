import express from "express";
import { Pass } from "../../domain/Pass";

export const passRouter = express.Router();

passRouter.get("/all", async (req, res) => {
  try {
    const passes = await Pass.find();
    return res.send(passes);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

passRouter.post("/", async (req, res) => {
  try {
    const { level } = req.body;

    if (!level) {
      return res.sendStatus(400).send("attribute missin' !");
    }

    await Pass.subscribe(level);

    res.send("success");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

passRouter.put("/", async (req, res) => {
  try {
    const { _id } = req.query;

    const { level } = req.body;

    if (!level) {
      return res.sendStatus(400).send("attribute missin' !");
    }

    Pass.upgrade(`${_id}`, level);

    return res.send("success");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

passRouter.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await Pass.deleteMany({ _id });

    if (result.deletedCount <= 0) {
      return res.status(500).send("the pass does not exist");
    }

    return res.send(true);
  } catch (err) {
    console.error(err);

    return res.status(500).send(err);
  }
});
