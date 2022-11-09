import mongoose from "mongoose";
import { qnaboardSchema } from "../schemas";

const Qnaboard = mongoose.model("qnaboards", qnaboardSchema);

class QnaboardModel {
  async getAll() {
    const qnaboards = await Qnaboard.find({});
    return qnaboards;
  }
  async getOne(_id) {
    const qnaboard = await Qnaboard.findOne({ _id });
    return qnaboard;
  }
  async regist(qnaboardInfo) {
    const qnaboard = await Qnaboard.create(qnaboardInfo);
    return qnaboard;
  }
  async modify(_id, qnaboardInfo) {
    const result = await Qnaboard.updateOne({ _id }, qnaboardInfo);
    return result;
  }
  async remove(_id) {
    const result = await Qnaboard.deleteOne({ _id });
    return result;
  }
}

const qnaboardModel = new QnaboardModel();

export { qnaboardModel };
