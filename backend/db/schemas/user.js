import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String
    },
    name: {
      type: String,
      trim: true
    },
    address: {
      type: {
        postalcode: String,
        roadAddress: String,
        jibunAddress: String,
        detailAddress: String,
        extraAddress: String
      },
      _id: false
    },
    phone: {
      type: String
    },
    benefit: { type: Number, requried: true, default: 0 },
    randomboxes: {
      type: [
        {
          randomboxId: String,
          randomboxName: String,
          thumbnail: String,
          price: Number,
          orderId: String
        }
      ],
      required: true,
      default: []
    },
    products: {
      type: [
        {
          productId: String,
          productName: String,
          thumbnail: String,
          price: Number
        }
      ],
      required: true,
      default: []
    },
    role: {
      type: String,
      required: true,
      default: "user"
    },
    refreshToken: {
      type: String,
      required: true,
      default: "empty"
    }
  },
  {
    collection: "users",
    timestamps: true
  }
);

export { userSchema };
