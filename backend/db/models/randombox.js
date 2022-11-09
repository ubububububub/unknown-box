import mongoose from "mongoose";
import { randomboxSchema } from "../schemas";

const Randombox = mongoose.model("randomboxes", randomboxSchema);

class RandomboxModel {
  async getAll() {
    const randomboxes = await Randombox.find({});
    return randomboxes;
  }
  async getOne(_id) {
    const randombox = await Randombox.findOne({ _id });
    return randombox;
  }
  async getSome(categoryName) {
    const randomboxes = await Randombox.find({ categoryName });
    return randomboxes;
  }
  async regist(randomboxInfo) {
    await Randombox.create(randomboxInfo);
  }
  async modify(_id, randomboxInfo) {
    const result = await Randombox.updateOne({ _id }, randomboxInfo);
    return result;
  }
  async remove(_id) {
    const result = await Randombox.deleteOne({ _id });
    return result;
  }
}

const randomboxModel = new RandomboxModel();

export { randomboxModel };
