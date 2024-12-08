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
});
export const RegisterModel = mongoose.model("register", registerSchema);
