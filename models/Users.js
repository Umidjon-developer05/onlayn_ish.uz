import {model, models, Schema} from "mongoose";

const UsersSchema = new Schema({
  name: String,
  email: String,
  image: String,
  IsAdmin: String,
});

const Users = models?.Users || model('Users', UsersSchema);
export default Users