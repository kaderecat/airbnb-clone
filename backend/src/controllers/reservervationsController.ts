import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Reservations from "../models/Reservations";

export const postReservation: RequestHandler = async (req, res, next) => {
  const { endDate, startDate, listingInfo, userId, totalPrice } = req.body;


  try {
    if (!userId) {
      throw createHttpError(400, "You must be logged!");
    }

    if (!endDate || !startDate || !listingInfo || !totalPrice) {
      throw createHttpError(400, "Missing credentials!");
    }

    const newReservation = new Reservations(req.body);

    const savedRes = await newReservation.save();

    res.status(200).send(savedRes);
  } catch (error) {
    next(error);
  }
};

export const getReservations: RequestHandler = async (req, res, next) => {
  try {
    const listingId = req.params.id;

    const reservation = await Reservations.find({ listingId: listingId });

    res.status(200).send(reservation);
  } catch (error) {
    next(error);
  }
};

export const personalReservertaions: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.params.id;

    const reservation = await Reservations.find({ userId: userId });


    res.status(200).send(reservation);
  } catch (error) {
    next(error);
  }
};

export const deleteReservation: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletingReservation = await Reservations.findByIdAndDelete(id);

    res.status(200).send(deletingReservation);
  } catch (error) {
    next(error);
  }
};
