import { InferSchemaType, Schema, model } from "mongoose";

const favoritesSchema = new Schema({
  userId: { type: [String] },
  listingId: { type: String },
});

type Favorites = InferSchemaType<typeof favoritesSchema>;

export default model<Favorites>("Favorites", favoritesSchema);
