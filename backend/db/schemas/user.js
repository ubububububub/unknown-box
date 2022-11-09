import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
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
        postalCode: {
          type: String,
          required: true,
          default: "등록된 주소가 없습니다."
        },
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
