import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: { type: Number },
    course:String
});
export const userModel=mongoose.model("user",userSchema)


