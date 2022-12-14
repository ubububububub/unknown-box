import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    state: {
      type: String,
      required: true,
      default: "박스 미오픈"
    },
    orderEmail: { type: String, required: true },
    orderName: { type: String, required: true },
    orderPhone: { type: String, required: true },
    orderAddress: {
      type: {
        postalcode: { type: String, required: true },
        roadAddress: String,
        jibunAddress: String,
        detailAddress: String,
        extraAddress: String
      },
      _id: false
    },
    randomboxes: {
      type: [
        {
          randombox: {
            type: Schema.Types.ObjectId,
            ref: "randomboxes"
          },
          opened: { type: Boolean, default: false, required: true },
          product: {
            productId: String,
            productName: String,
            price: Number,
            thumbnail: String
          },
          _id: false
        }
      ]
    },
    randomboxesCount: { type: Number, required: true, default: 0 },
    productsCount: { type: Number, required: true, default: 0 },
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
