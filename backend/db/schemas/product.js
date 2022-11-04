import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, default: "하다못해 이름만은" },
    price: { type: Number, required: true, default: 0 },
    count: { type: Number, required: true, default: 1 },
    description: { type: String, required: false },
    imageUrl: { type: [String], required: false },
    thumbnail: { type: String, required: true, default: "#" }, // default: 상품준비중.jpg
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { productSchema };
