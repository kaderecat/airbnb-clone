/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/envValidate";

export const registerFn: RequestHandler = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      throw new Error("Missing credentials");
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) throw createHttpError(400, "Email already used!");

    const hashedPass = bcrypt.hashSync(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPass,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};
export const loginFn: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email || !req.body.password)
      throw createHttpError(404, "Missing credentials");

    const user = await User.findOne({ email });

    if (!user) throw createHttpError(401, "Wrong email or password!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) throw createHttpError(401, "Wrong email or   password!");

    const token = jwt.sign(
      {
        id: user._id,
      },
      env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    res.cookie("accessToken", token, { httpOnly: true }).status(201).send(info);
  } catch (error) {
    next(error);
  }
};
export const logoutFn: RequestHandler = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", { sameSite: "none", secure: true })
      .status(200)
      .send("Logged off");
  } catch (error) {
    next(error);
  }
};
