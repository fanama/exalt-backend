import { model } from "mongoose";
import { IPass as Interface } from "./interface";
import { PassModel } from "./model";
import { passSchema } from "./model";

export type IPass = Interface;

export const Pass = model<IPass, PassModel>("pass", passSchema);
