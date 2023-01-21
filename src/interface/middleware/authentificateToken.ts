import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { IUser, User } from "../../domain/user";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  let token =
    (authHeader && authHeader.split(" ")[1]) || req.cookies.accessToken;
  if (!token) return res.sendStatus(401);

  const users = await User.find({ token });

  if (users.length <= 0) {
    return res.send(403);
  }

  jwt.verify(
    token,
    JSON.stringify(process.env.ACCESS_TOKEN_SECRET),
    (err: any) => {
      if (err) return res.sendStatus(403);

      next();
    }
  );
}
export function generateAccessToken(user: IUser) {
  return jwt.sign(
    user.username,
    JSON.stringify(process.env.ACCESS_TOKEN_SECRET)
  );
}
