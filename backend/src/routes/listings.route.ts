import { Router } from "express";
import {
  createListing,
  deleteProperty,
  getListings,
  getMyProperties,
  getSingleListing,
} from "../controllers/listingsController";

const router = Router();

router.get("/", getListings);
router.post("/", createListing);
router.get("/:id", getSingleListing);
router.get("/my-properties/:id", getMyProperties);
router.delete("/my-properties/:id", deleteProperty);

export default router;
