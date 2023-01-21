import express from "express";
import { Place } from "../../domain/Place";
import { generatePlace, IPlace } from "../../domain/Place/interface";
import { authenticateToken } from "../middleware/authentificateToken";

export const placeRouter = express.Router();

placeRouter.get("/all", authenticateToken, async (req, res) => {
  try {
    const places = await Place.find();
    return res.send(places);
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

placeRouter.post("/", async (req, res) => {
  try {
    const { level, age, phone, address } = req.body;

    if (!address) {
      return res.sendStatus(400).send("No address provided !");
    }

    const place = generatePlace({
      level,
      age,
      phone,
      address,
    } as IPlace);

    const duplicatePlace = await Place.findOne({ address });

    if (duplicatePlace?._id) {
      return res.sendStatus(400).send("the place aldready exist");
    }
    Place.create(place);

    res.send("success");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

placeRouter.put("/", async (req, res) => {
  try {
    const { _id } = req.query;

    const { level, age, phone, address } = req.body;

    if (!level || !age || !phone || !address) {
      return res.sendStatus(400).send("attribute missin' !");
    }

    const place = generatePlace({
      level,
      age,
      phone,
      address,
    } as IPlace);

    if (!_id) {
      return res.sendStatus(400).send("No id provided !");
    }

    if (!level) {
      return res.sendStatus(400).send("No id provided !");
    }

    await Place.updateMany({ _id }, place);

    return res.send("success");
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

placeRouter.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await Place.deleteMany({ _id });

    if (result.deletedCount <= 0) {
      return res.status(500).send("the user does not exist");
    }

    return res.send(true);
  } catch (err) {
    console.error(err);

    return res.status(500).send(err);
  }
});
