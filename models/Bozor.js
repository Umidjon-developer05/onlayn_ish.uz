import  { model, Schema, models } from "mongoose";

const BozorFindSchema = new Schema({
  title: String,
  desription: String,
  text: String,
  Date: String,
  price: String,
  email1:String,
  name: String,
  email: String,
  image: String,
});

export const Bozorfind = models?.Bozorfind || model("Bozorfind", BozorFindSchema);
