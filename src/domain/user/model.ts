import { Model, Schema } from "mongoose";
import { generateEmptyUser, IUser } from "./interface";

export interface UserModel extends Model<IUser> {
  subscribe(user: IUser): IUser;
  login(user: IUser): IUser;
  logout(token: string): boolean;
  setPassId(userId: string, passId: string): boolean;
}

export const userSchema = new Schema<IUser, UserModel>({
  username: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  phone: { type: String },
  address: { type: String },
  passID: { type: String },
  token: { type: String },
});

userSchema.statics.subscribe = async function (user: IUser) {
  try {
    const res = await this.create(user);
    return res;
  } catch (err) {
    console.error(err);
    return generateEmptyUser();
  }
};
userSchema.statics.login = async function (user: IUser) {
  try {
    const res = await this.findOne(user);

    return res;
  } catch (err) {
    console.error(err);
    return generateEmptyUser();
  }
};
userSchema.statics.logout = async function (token: string) {
  try {
    const user = await this.updateMany({ token }, { token: "" });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
userSchema.statics.setPassId = async function (userId: string, passID: string) {
  try {
    await this.updateOne({ _id: userId, passID });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
