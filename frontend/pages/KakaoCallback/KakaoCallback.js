import Component from "../../core/Component.js";
import { postKakaoLoginToken } from "../../apis/index.js";

export class KakaoCallback extends Component {
  setEvent() {
    window.addEventListener("DOMContentLoaded", async () => {
      await this.setLoginTokens();
    });
  }

  getQuery() {
    const [_, email, __, role] = location.search.split(/=|&/g);

    return { email, role };
  }

  async setLoginTokens() {
    const { email, role } = this.getQuery();

    if (!email) {
      return;
    }

    const { newAccessToken, newRefreshToken } = await postKakaoLoginToken(
      email
    );

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("role", role);

    return (window.location = "/");
  }
}
