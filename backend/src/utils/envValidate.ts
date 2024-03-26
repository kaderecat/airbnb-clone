import { cleanEnv, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  JWT_KEY: str(),
});
