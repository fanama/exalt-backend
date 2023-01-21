import { Model, Schema } from "mongoose";
import { generatePlace, IPlace } from "./interface";

export interface PlaceModel extends Model<IPlace> {
  upgrade(_id: string, level: number): IPlace;
}

export const placeSchema = new Schema<IPlace, PlaceModel>({
  level: { type: Number },
  age: { type: Number },
  phone: { type: String },
  address: { type: String },
});

placeSchema.statics.upgrade = async function (_id: string, level: number) {
  try {
    const res = await this.updateOne({ _id }, { $set: { level } });

    return res;
  } catch (err) {
    console.error(err);
    return generatePlace({} as IPlace);
  }
};
