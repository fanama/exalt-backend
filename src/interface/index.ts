import express from "express";
import coockieParser from "cookie-parser";
import { auth } from "./router/auth";
import { authenticateToken } from "./middleware/authentificateToken";
import { placeRouter } from "./router/place";
import { passRouter } from "./router/pass";

export const expressStatic = express;
export const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(coockieParser());
server.use("/user", auth);
server.use("/place", authenticateToken, placeRouter);
server.use("/pass", authenticateToken, passRouter);

server.get("/", (req, res) => {
  res.send("hello world");
});
