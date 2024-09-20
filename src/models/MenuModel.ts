import mongoose from "mongoose";
import { MenuDocument } from "../interfaces/menu";

const MenuSchema = new mongoose.Schema<MenuDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    basePrice: { type: Number, required: true },
    image: { type: String },
    categories: { type: [String] },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const MenuModel = mongoose.model<MenuDocument>("Menu", MenuSchema);

export default MenuModel;
