import { Schema } from "mongoose";

const qnaboardSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    password: { type: String, required: false },
    answer: { type: String, required: false }
  },
  {
    collection: "qnaboards",
    timestamps: true
  }
);

export { qnaboardSchema };
