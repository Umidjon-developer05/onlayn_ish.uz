import mongoose, { Schema } from "mongoose";

const buttonSchema = new Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);

const Button = mongoose.models.Button || mongoose.model("Button", buttonSchema);

export default Button;
