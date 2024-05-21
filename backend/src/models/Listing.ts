import { InferSchemaType, Schema, model } from "mongoose";

const listingSchema = new Schema(
  {
    category: { type: String, required: true },
    location: { type: String, required: true },
    guestCount: { type: Number, required: true },
    roomCount: { type: Number, required: true },
    bathroomCount: { type: Number, required: true },
    imageSrc: { type: String, required: true },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

type Listing = InferSchemaType<typeof listingSchema>;

export default model<Listing>("Listing", listingSchema);
