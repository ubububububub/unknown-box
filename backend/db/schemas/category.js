import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "etc.",
      unique: true,
      trim: true
    }
  },
  {
    collection: "categories",
    timestamps: true
  }
);

export { categorySchema };
