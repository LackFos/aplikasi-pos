import { ObjectId } from "mongoose";

export interface MenuDocument {
  id: ObjectId;
  name: string;
  description: string;
  basePrice: number;
  image?: ObjectId;
  categories: string[];
}
