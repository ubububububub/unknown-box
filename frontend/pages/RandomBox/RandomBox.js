import { getRandomBoxProducts, postRandomBoxResult } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./randomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

const PRODUCTS_NUM = 7;
const ANIMATION_TIME = 8000;
const IMAGE_SIZE = 600 * -1;
const ANIMATION_FRAME_UNIT = 1;
const ANIMATION_FRAME_START_INIT = 0;
const MAX_INDEX_START_INIT = 0;

export class RandomBox extends Component {
  async setup() {
    this.state = {
      count: 0,
      productItems: []
      // productItems: await getRandomBoxProducts()
    };

    this.state.productItems = [
      {
        name: "LG전자 울트라기어 27GP850",
        src: "https://picsum.photos/id/235/600/500",
        price: 2000000
      },
      {
        name: "하만 카돈 RADIANCE 2400 외 1개",
        src: "https://picsum.photos/id/236/600/500",
        price: 1000000
      },
      {
        name: "800도씨 캠핑 화로대 불멍 바비큐 그릴 외 1개",
        src: "https://picsum.photos/id/237/600/500",
        price: 300000
      },
      {
        name: "커세어 K70 RGB TKL 텐키리스 게이밍 기계식 키보드",
        src: "https://picsum.photos/id/238/600/500",
        price: 200000
      },
      {
        name: "캔스톤 R30BT PLUS 2채널 블루투스 스피커",
        src: "https://picsum.photos/id/239/600/500",
        price: 500000
      },
      {
        name: "시디즈 T80 의자 T800HLDAS",
        src: "https://picsum.photos/id/240/600/500",
        price: 300000
      },
      {
        name: "삼성전자 갤럭시 버즈 라이브",
        src: "https://picsum.photos/id/241/600/500",
        price: 400000
      }
    ];

    const maxIndex = this.getMaxPriceIndex(this.state.productItems);
    this.state.count = this.getRandomNum();
    this.state.productItems = this.convertProductItems(maxIndex);
  }

  template() {
    const carouselItems = this.state.productItems.reduce(
      (prev, curr, index) => {
        return (
          prev +
          `<li class="randombox_carousel-item">
            <img src="${curr.src}" alt="carousel-${index}" />
            <div class="randombox_carousel-item-desc">
              <h3 class="randombox_carousel-item-name">${curr.name}</h3>
              <strong class="randombox_carousel-item-price">정상가 : ${curr.price.toLocaleString()}원</strong>
            </div>
          </li>`
        );
      },
      ""
    );

    return `<main id="randombox_container">
      <h2 class="randombox_title">#Hashbox</h2>
      <strong class="randombox_desc">해시박스를 터치하면 상품이 오픈됩니다.</strong>
      <section class="randombox_carousel-container">
        <div class="randombox_img"> 
          <img src="https://cdn.dribbble.com/users/948184/screenshots/3787246/media/d67be67672960bffb78a6309af936540.gif" alt="움직이는 랜덤 박스"/>
        </div>
        <div class="randombox_carousel">
          <ul class="randombox_carousel-list">
          ${carouselItems}
          </ul>
        </div>
        <button type="button" class="randombox_button">마이페이지로 이동</button>
      </section>
    </main>`;
  }

  setEvent() {
    qs(".randombox_img").addEventListener("click", async () => {
      this.hideReadyImgAndText();
      this.showCarousel();
      const id = this.getProductId();

      if (!id) return;

      await postRandomBoxResult({
        result: this.state.productItems[this.state.count],
        id
      });

      this.startCarouselAnimation();
    });

    qs(".randombox_button").addEventListener("click", () => {
      return (window.location = "/mypage");
    });
  }

  getMaxPriceIndex(products) {
    let maxIndex = MAX_INDEX_START_INIT;

    products.reduce((prev, curr, index) => {
      if (prev < curr.price) {
        maxIndex = index;
        return;
      }
    }, Number.MIN_SAFE_INTEGER);

    return maxIndex;
  }

  getRandomNum() {
    return Math.floor(Math.random() * PRODUCTS_NUM);
  }

  startCarouselAnimation() {
    let start = ANIMATION_FRAME_START_INIT;

    const callback = () => {
      const end = this.state.productItems.length - 1;

      if (end < start) {
        this.showMyPageMoveButton();
        return;
      }

      qs(".randombox_carousel-list").style.left = start * IMAGE_SIZE + "px";
      start = start + ANIMATION_FRAME_UNIT;

      requestAnimationFrame(callback);
    };
    requestAnimationFrame(callback);
  }

  showMyPageMoveButton() {
    setTimeout(() => {
      qs(".randombox_button").style.display = "block";
    }, ANIMATION_TIME);
  }

  showCarousel() {
    qs(".randombox_carousel").style.display = "block";
  }

  hideReadyImgAndText() {
    qs(".randombox_desc").style.display = "none";
    qs(".randombox_img").style.display = "none";
  }

  convertProductItems(maxIndex) {
    const temp = this.state.productItems.filter(
      (_, index) => index !== this.state.count && index !== maxIndex
    );

    let newProducts = [];

    if (this.state.count === maxIndex) {
      newProducts = [...temp, this.state.productItems[this.state.count]];
    } else if (this.state.count !== maxIndex) {
      newProducts = [
        ...temp,
        this.state.productItems[maxIndex],
        this.state.productItems[this.state.count]
      ];
    }

    return [...newProducts, ...newProducts, ...newProducts];
  }

  getProductId() {
    const params = location.pathname.split("/")[2].split("=");

    if (params.length !== 2 && params[0] !== "id") {
      return;
    }

    return Number(params[1]);
  }
}
