import mongoose from "mongoose";

import { ImageDocument } from "../interfaces/image";

const imageSchema = new mongoose.Schema<ImageDocument>(
  {
    url: { type: String, required: true, unique: true },
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

const ImageModel = mongoose.model<ImageDocument>("Image", imageSchema);

export default ImageModel;
