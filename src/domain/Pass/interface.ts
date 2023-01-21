import { Date } from "mongoose";
import { formatDate } from "../../utils/format/date";

export interface IPass {
  _id?: string;
  level: number;
  created_at: string;
  update_at: string;
}

export function generateEmptyPass(level: number = 0): IPass {
  const date = new Date();

  return {
    level,
    created_at: formatDate(date),
    update_at: formatDate(date),
  };
}
