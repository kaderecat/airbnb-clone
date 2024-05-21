import { Router } from "express";
import {
  createListing,
  getListings,
  getSingleListing,
} from "../controllers/listingsController";

const router = Router();

router.get("/", getListings);
router.post("/", createListing);
router.get("/:id", getSingleListing);

export default router;
