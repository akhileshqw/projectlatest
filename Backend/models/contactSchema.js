import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: { type: Number },
    message: String,
});
export const contactModel = mongoose.model("contact", contactSchema);
