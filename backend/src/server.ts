import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../src/utils/envValidate";
import app from "./app";

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("db connected");
  app.listen(env.PORT, () => {
    console.log("app is runnig on port " + env.PORT);
  });
});
