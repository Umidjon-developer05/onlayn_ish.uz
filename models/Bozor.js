import mongoose, { model, Schema, models } from "mongoose";

const BozorFindSchema = new Schema({
  title: String,
  desription: String,
  text: String,
  Date: String,
  price: String,
  email1: String,
  name: String,
  email: String,
  image: String,
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});

export const BozorFind = models?.BozorFind || model("BozorFind", BozorFindSchema);
