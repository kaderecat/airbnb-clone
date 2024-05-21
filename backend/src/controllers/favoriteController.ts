import { RequestHandler } from "express";
import User from "../models/User";
import createHttpError from "http-errors";

export const like: RequestHandler = async (req, res, next) => {
  const { listingId, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return createHttpError(404, "Something went wrong!");

    user.favorites.push(listingId);

    user.save();

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const unlike: RequestHandler = async (req, res, next) => {
  const { userId, filteredArr } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          favorites: filteredArr,
        },
      },
      { new: true }
    );

    user?.save();
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
