import { Model, Schema } from "mongoose";
import { formatDate } from "../../utils/format/date";
import { generateEmptyPass, IPass } from "./interface";

export interface PassModel extends Model<IPass> {
  subscribe(level: number): IPass;
  upgrade(_id: string, level: number): IPass;
}

export const passSchema = new Schema<IPass, PassModel>({
  level: { type: Number },
  created_at: { type: String },
  update_at: { type: String },
});

passSchema.statics.subscribe = async function (level: number) {
  try {
    const pass = generateEmptyPass(level);

    const res = await this.create(pass);
    return res;
  } catch (err) {
    console.error(err);
    return generateEmptyPass();
  }
};
passSchema.statics.upgrade = async function (_id: string, level: number) {
  try {
    const date = new Date();

    const res = await this.updateOne(
      { _id },
      { level, update_at: formatDate(date) }
    );

    return res;
  } catch (err) {
    console.error(err);
    return generateEmptyPass();
  }
};
