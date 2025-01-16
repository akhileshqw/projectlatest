import mongoose from "mongoose";
const registerSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: { type: Number },
  password: String,
  confirmpassword: String,
  address: String,
  isVendor: { type: Boolean, default: false },
  work: { type: String },
  rating: { type: Number },
  isCertified: { type: Boolean, default: false },
  milk: { type: Boolean, default: false },
  curd: { type: Boolean, default: false },
  ghee: { type: Boolean, default: false },
  lat: { type: Number },
  lng: { type: Number },

  

});
export const RegisterModel = mongoose.model("register", registerSchema);
