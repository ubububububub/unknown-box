import { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "etc.",
      unique: true,
      trim: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

export { categorySchema };
