import { InferSchemaType, Schema, model } from "mongoose";

const reservationSchema = new Schema({
  startDate: { type: String },
  endDate: { type: String },
  listingInfo: { type: Object },
  userId: { type: String },
  totalPrice: { type: Number },
});

type Reservation = InferSchemaType<typeof reservationSchema>;

export default model<Reservation>("Reservation", reservationSchema);
