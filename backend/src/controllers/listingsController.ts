import { RequestHandler } from "express";
import Listing from "../models/Listing";
import createHttpError from "http-errors";

interface ListingBody {
  category: string;
  location: {
    label: string;
    flag: string;
    lanlng: number[];
    region: string;
    value: string;
  };
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  price: number;
  title: string;
  imageSrc: string;
  description: string;
}

export const createListing: RequestHandler = async (req, res, next) => {
  const body: ListingBody = req.body;
  try {
    const listing = new Listing({ ...body });

    const newListing = await listing.save();

    res.status(201).send(newListing);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getListings: RequestHandler = async (req, res, next) => {
  try {
    const listings = await Listing.find(req.query);

    res.status(200).send(listings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMyProperties: RequestHandler = async (req, res, next) => {
  try {
    const myproperties = await Listing.find({ owner: req.params.id });

    res.status(200).send(myproperties);
  } catch (error) {
    next(error);
  }
};

export const getSingleListing: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  try {
    const singleListing = await Listing.findById(id);

    if (!singleListing) throw createHttpError(401, "Listing not found!");
    console.log(singleListing);

    res.status(200).send(singleListing);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const deleteProperty: RequestHandler = async (req, res, next) => {
  
  const id = req.params.id;
  try {
    const deletingProperty = await Listing.findByIdAndDelete(id);

    console.log(id);
    
    res.status(200).send(deletingProperty);
  } catch (error) {
    next(error);
  }
};