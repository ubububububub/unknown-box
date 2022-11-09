import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      default: "etc.",
      unique: true,
      trim: true,
      index: true
    }
  },
  {
    collection: "categories",
    timestamps: true
  }
);

export { categorySchema };
