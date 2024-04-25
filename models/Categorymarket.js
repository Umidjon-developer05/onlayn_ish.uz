const { Schema, models, model, default: mongoose } = require("mongoose");

const CategorymarketSchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Categorymarket" },
});

export const Categorymarket =
  models?.Categorymarket || model("Categorymarket", CategorymarketSchema);
