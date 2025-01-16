import mongoose from "mongoose";
const certifiedvendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
  },
  vendorEmail: {
    type: String,
  },
  phone: { type: Number },
  Address: {
    type: String,
  },
  anotherBusiness: { type: Boolean, default: false },
  imageUrl: {
    type: String,
  },
});

export const certifiedVendorModal = mongoose.model(
  "certify",
  certifiedvendorSchema
);
