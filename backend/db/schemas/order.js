import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    state: { type: String, required: true, default: "상품준비중" },
    orderEmail: { type: String, required: true },
    orderName: { type: String, required: true },
    orderPhone: { type: String, required: true },
    orderAddress: {
      type: {
        postalCode: { type: String, required: true },
        roadAddress: String,
        jibunAddress: String,
        detailAddress: String,
        extraAddress: String
      }
    },
    randomboxes: {
      type: [
        {
          randombox: { type: Schema.Types.ObjectId, ref: "randomboxes" },
          boxCount: { type: Number, required: true },
          _id: false
        }
      ]
    },
    products: {
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: "products" },
          count: { type: Number, required: true },
          _id: false
        }
      ]
    },
    boxesPrice: { type: Number, required: true, default: 0 },
    deliveryPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 }
  },
  {
    collection: "orders",
    timestamps: true
  }
);

export { orderSchema };
