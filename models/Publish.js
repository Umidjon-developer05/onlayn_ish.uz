import { model, Schema, models } from "mongoose";

const PublishFindSchema = new Schema({
  id: String,
  Action: String,
});

export const Publish = models?.Publish || model("Publish", PublishFindSchema);
