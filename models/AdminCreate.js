const { Schema, models, model, default: mongoose } = require("mongoose");

const AdminCreateSchema = new Schema({
  email: String,
  password: String,
});

const AdminCreate = models?.AdminCreate || model("AdminCreate", AdminCreateSchema);
export default AdminCreate;
