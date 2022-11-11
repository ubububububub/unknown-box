import { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      default: "고객센터에 문의하세요",
      trim: true
    },
    categoryName: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    count: { type: Number, required: true, default: 0 },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true, default: "#" } // default: 상품준비중.jpg
  },
  {
    collection: "products",
    timestamps: true
  }
);

export { productSchema };
