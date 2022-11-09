import { Schema } from "mongoose";

const randomboxSchema = new Schema(
  {
    randomboxName: {
      type: String,
      required: true,
      trim: true
    },
    categoryName: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: this.price }, // this가 되나?
    count: { type: Number, required: true, default: 0 },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true, default: "#" }, // default: 상품준비중.jpg
    products: {
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: "products" },
          _id: false
        }
      ]
    }
  },
  {
    collection: "randomboxes",
    timestamps: true
  }
);

export { randomboxSchema };
