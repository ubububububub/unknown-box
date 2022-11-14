import { userModel } from "../db/models";
import { hashPassword } from "../utils/hash-password";
import JWT from "../utils/token";

class UserService {
  constructor(model) {
    this.model = model;
  }

  async createUser(userInfo) {
    const { email, password } = userInfo;
    const user = await this.model.getByEmail(email);

    if (user) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    await this.model.create({
      ...userInfo,
      password: hashPassword(password)
    });
  }

  async changePassword(accessToken, { password, newPassword }) {
    const { email } = JWT.decodeToken(accessToken);
    const user = await this.model.getByEmail(email);
    if (user.password !== hashPassword(password))
      throw new Error("비밀번호가 틀립니다.");
    const result = await this.model.modify(user.email, {
      password: hashPassword(newPassword)
    });
    return { result: result.matchedCount ? "success" : "fail" };
  }
  async getInMyPage(accessToken) {
    const { email } = JWT.decodeToken(accessToken);
    const { benefit, randomboxes, products, role } =
      await this.model.getByEmail(email);
    return {
      email,
      benefit,
      randomboxes: randomboxes.map(
        ({ randomboxId, randomboxName, thumbnail, price, orderId, _id }) => ({
          randomboxId,
          randomboxName,
          thumbnail,
          price,
          orderId,
          newboxId: _id
        })
      ),
      products,
      role
    };
  }
  async getUserInfo(accessToken) {
    const { email } = JWT.decodeToken(accessToken);
    const { name, address, phone } = await this.model.getByEmail(email);
    return {
      orderName: name || null,
      orderPhone: phone || null,
      orderAddress: address || null
    };
  }
}

const userService = new UserService(userModel);

export { userService };
