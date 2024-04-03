import  { model, Schema, models } from "mongoose";

const WorkFindSchema = new Schema({
  title: String,
  desription: String,
  text: String,
  Date: String,
});

export const WorkFind = models?.WorkFind || model("WorkFind", WorkFindSchema);
