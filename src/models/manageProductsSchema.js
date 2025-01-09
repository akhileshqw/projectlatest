import mongoose from "mongoose";
const manageProductSchema = new mongoose.Schema({
  vendorEmail: {
    type: String,
  },
  vendorLocation: {
    type: String,
  },
  phone: { type: Number },
  cowMilkPrice: {
    type: Number,
  },
  cowMilkSells: {
    type: Boolean,
    default: false,
  },
  buffaloMilkPrice: {
    type: Number,
  },
  buffaloMilkSells: {
    type: Boolean,
    default: false,
  },
  camelMilkPrice: {
    type: Number,
  },
  camelMilkSells: {
    type: Boolean,
    default: false,
  },
  donkeyMilkPrice: {
    type: Number,
  },
  donkeyMilkSells: {
    type: Boolean,
    default: false,
  },
  goatMilkPrice: {
    type: Number,
  },
  goatMilkSells: {
    type: Boolean,
    default: false,
  },
  cowGheePrice: {
    type: Number,
  },
  cowGheeSells: {
    type: Boolean,
    default: false,
  },
  buffaloGheePrice: {
    type: Number,
  },
  buffaloGheeSells: {
    type: Boolean,
    default: false,
  },

  cowCurdPrice: {
    type: Number,
  },
  cowCurdSells: {
    type: Boolean,
    default: false,
  },
  buffaloCurdPrice: {
    type: Number,
  },
  buffaloCurdSells: {
    type: Boolean,
    default: false,
  },
});

export const manageProductsModal = mongoose.model(
  "product",
  manageProductSchema
);
