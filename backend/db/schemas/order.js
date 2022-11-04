import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    state: { type: String, required: true, default: "상품준비중" },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      type: {
        postalCode: { type: String, required: true },
        roadAddress: String,
        jibunAddress: String,
        detailAddress: String,
        extraAddress: String
      }
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "products"
          },
          count: { type: Number, required: true },
          _id: false
        }
      ],
      required: true
    }
  },
  {
    collection: "orders",
    timestamps: true
  }
);

export { orderSchema };
