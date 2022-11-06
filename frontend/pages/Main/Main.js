import { getKakaoProfile } from "../../apis/main.js";
import ItemList from "../../components/ItemList/ItemList.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

export class Main extends Component {
  setup() {
    this.state = {
      user: {}
    };
  }

  template() {
    return `<main id="main-container"></main>`;
  }

  setEvent() {
    window.addEventListener("DOMContentLoaded", async () => {
      const accessTokenQuery = this.getAccessTokenQuery();

      if (!accessTokenQuery) {
        return;
      }

      const { email, nickname } = await getKakaoProfile(accessTokenQuery);
      this.setState({ user: { email, nickname } });
    });
  }

  mounted() {
    new ItemList(qs("#main-container"));

    this.printKakaoProfileInfo();
  }

  getAccessTokenQuery() {
    const params = new URLSearchParams(location.search);
    return params.get("access_token");
  }

  printKakaoProfileInfo() {
    if (this.state.user.email) {
      console.log(this.state.user.email);
      console.log(this.state.user.nickname);
    }
  }
}
