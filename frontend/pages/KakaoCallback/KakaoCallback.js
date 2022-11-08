import Component from "../../core/Component.js";
import { getKakaoLoginToken } from "../../apis/main.js";

export class KakaoCallback extends Component {
  setEvent() {
    window.addEventListener("DOMContentLoaded", async () => {
      await this.setLoginTokens();
    });
  }

  getAccessTokenQuery() {
    const params = new URLSearchParams(location.search);
    return params.get("email");
  }

  async setLoginTokens() {
    const emailQuery = decodeURIComponent(this.getAccessTokenQuery());

    if (!emailQuery) {
      return;
    }

    const { newAccessToken, newRefreshToken } = await getKakaoLoginToken(
      emailQuery
    );

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return (window.location = "/");
  }
}
