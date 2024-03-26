import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorStatus = 500;
  let errorMesg = "unknown error";

  if (isHttpError(error)) {
    errorStatus = error.status;
    errorMesg = error.message;
  }

  res.status(errorStatus).send(errorMesg);
});

export default app;
