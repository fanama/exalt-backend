import { model } from "mongoose";
import { IUser as Interface } from "./interface";
import { UserModel } from "./model";
import { userSchema } from "./model";

export type IUser = Interface;

export const User = model<IUser, UserModel>("user", userSchema);
