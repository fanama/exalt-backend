import { model } from "mongoose";
import { IPlace as Interface } from "./interface";
import { PlaceModel } from "./model";
import { placeSchema } from "./model";

export type IPlace = Interface;

export const Place = model<IPlace, PlaceModel>("place", placeSchema);
