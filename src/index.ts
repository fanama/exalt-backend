import * as dotenv from "dotenv";
import { connect } from "./infra/mongo";
import { server } from "./interface";
dotenv.config();
const { PORT } = process.env;

connect();

server.listen(PORT || 8000, () => {
  console.log("Server runs on " + PORT || 8000);
});
