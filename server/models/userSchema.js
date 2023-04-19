import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    access_token: { type: String },
    refresh_token: { type: String },
    unique_id: { type: String },
    loggedInState: { type: Boolean },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
