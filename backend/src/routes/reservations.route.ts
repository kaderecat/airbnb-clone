import { Router } from "express";
import {
  deleteReservation,
  getReservations,
  personalReservertaions,
  postReservation,
} from "../controllers/reservervationsController";

const router = Router();

router.get("/:id", getReservations);
router.post("/", postReservation);
router.get("/your-reservations/:id", personalReservertaions);
router.delete('/:id', deleteReservation)

export default router;
