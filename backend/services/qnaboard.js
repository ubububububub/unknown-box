import { qnaboardModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import JWT from "../utils/token";

class QnaboardService {
  constructor(qnaboardModel) {
    this.qnaboardModel = qnaboardModel;
  }
  async getList() {
    const qnaboards = await this.qnaboardModel.getAll();
    if (qnaboards.length === 0) throw new Error("작성된 문의가 없습니다.");
    return qnaboards.map(({ _id, title, author, createdAt, updatedAt }) => ({
      qnaboardId: _id,
      title,
      author,
      createdAt,
      updatedAt
    }));
  }
  async getPost({ qnaboardId }, { password }) {
    const qnaboard = await this.qnaboardModel.getOne(qnaboardId);
    if (!qnaboard) throw new Error("문의가 존재하지 않습니다.");
    if (qnaboard.password !== hashPassword(password))
      throw new Error("잘못된 비밀번호입니다.");
    return {
      qnaboardId: qnaboard._id,
      title: qnaboard.title,
      content: qnaboard.content,
      author: qnaboard.author,
      answer: qnaboard.answer || null,
      createdAt: qnaboard.createdAt,
      updatedAt: qnaboard.updatedAt
    };
  }
  async getPostForAdmin({ qnaboardId }) {
    const qnaboard = await this.qnaboardModel.getOne(qnaboardId);
    if (!qnaboard) throw new Error("문의가 존재하지 않습니다.");
    return {
      qnaboardId: qnaboard._id,
      title: qnaboard.title,
      content: qnaboard.content,
      author: qnaboard.author,
      answer: qnaboard.answer || null,
      createdAt: qnaboard.createdAt,
      updatedAt: qnaboard.updatedAt
    };
  }
  async regist({ title, content, password }, accessToken) {
    const { email } = JWT.decodeToken(accessToken);
    const qnaboardInfo = { title, content };
    if (password) qnaboardInfo.password = hashPassword(password);
    qnaboardInfo.author = email;
    const qnaboard = await this.qnaboardModel.regist(qnaboardInfo);
    return { qnaboardId: qnaboard._id };
  }
  async modify({ qnaboardId }, { title, content, password }) {
    const qnaboardInfo = {};
    if (title) qnaboardInfo.title = title;
    if (content) qnaboardInfo.content = content;
    if (password) qnaboardInfo.password = hashPassword(password);
    const result = await this.qnaboardModel.modify(qnaboardId, qnaboardInfo);
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async remove({ qnaboardId }, { password }) {
    const qnaboard = await this.qnaboardModel.getOne(qnaboardId);
    if (qnaboard.password !== hashPassword(password))
      throw new Error("잘못된 비밀번호입니다.");
    const result = await this.qnaboardModel.remove(qnaboardId);
    return { result: result.deletedCount ? "success" : "fail" };
  }
  async addAnswer({ qnaboardId }, { answer }) {
    const result = await this.qnaboardModel.modify(qnaboardId, { answer });
    if (result.modifiedCount === 0)
      throw new Error("답변이 등록되지 않았습니다.");
    return { qnaboardId };
  }
  async removeByAdmin({ qnaboardId }) {
    const result = await this.qnaboardModel.remove(qnaboardId);
    return { result: result.deletedCount ? "success" : "fail" };
  }
}

const qnaboardService = new QnaboardService(qnaboardModel);

export { qnaboardService };
