import Component from "../../core/Component.js";
import { getKakaoLoginToken } from "../../apis/index.js";

export class KakaoCallback extends Component {
  setEvent() {
    window.addEventListener("DOMContentLoaded", async () => {
      await this.setLoginTokens();
    });
  }

  getEmailQuery() {
    const params = new URLSearchParams(location.search);
    return params.get("email");
  }

  async setLoginTokens() {
    const email = this.getEmailQuery();

    if (!email) {
      return;
    }

    const { newAccessToken, newRefreshToken } = await getKakaoLoginToken(email);

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return (window.location = "/");
  }
}
