import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // hashed
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  userType: { type: String, enum: ["tenant", "landlord"], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", userSchema);
