import { ObjectId } from "mongoose";

export interface ImageDocument {
  id: ObjectId;
  url: string;
}
