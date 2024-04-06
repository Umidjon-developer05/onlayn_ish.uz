import { model, models, Schema } from "mongoose";

const UsersSchema = new Schema({
  email: String,
  name: String,
  image: String,
  role: String,
});

const Users = models?.Users || model("Users", UsersSchema);
export default Users;
