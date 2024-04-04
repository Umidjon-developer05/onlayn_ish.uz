import { model, Schema, models } from "mongoose";

const DashboardFindSchema = new Schema({
  price: String,
  description: String,
  name: String,
  email: String,
  image: String,
});

export const Dashboard = models?.Dashboard || model("Dashboard", DashboardFindSchema);
