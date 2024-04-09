import { model, Schema, models } from "mongoose";

const OfferFindSchema = new Schema({
  phone: String,
  text: String,
  name: String,
  email: String,
  image: String,
});

export const Offer =
  models?.Offer || model("Offer", OfferFindSchema);
