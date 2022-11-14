import { getRandomBoxProducts, putRandomBoxResult } from "../../apis/index.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./randomBox.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

const ANIMATION_TIME = 8000;
const IMAGE_SIZE = 600 * -1;
const ANIMATION_FRAME_UNIT = 1;
const ANIMATION_FRAME_START_INIT = 0;
const MAX_INDEX_START_INIT = 0;

export class RandomBox extends Component {
  async setup() {
    const [orderId, randomboxId, newboxId] = this.props;

    this.state = {
      count: 0,
      orderId,
      randomboxId,
      newboxId,
      productItems: await getRandomBoxProducts(randomboxId),
      productsNum: 0
    };
    this.state.productsNum = this.state.productItems.products.length;
    const maxIndex = await this.getMaxPriceIndex(
      this.state.productItems.products
    );
    this.state.count = this.getRandomNum();
    this.state.productItems.products = this.convertProductItems(maxIndex);
  }

  template() {
    const carouselItems = this.state.productItems.products.reduce(
      (prev, curr, index) => {
        return (
          prev +
          `<li class="randombox_carousel-item">
            <img src="${curr.thumbnail}" alt="carousel-${index}"/>
            <div class="randombox_carousel-item-desc">
              <h3 class="randombox_carousel-item-name">${curr.productName}</h3>
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

      await putRandomBoxResult({
        randomboxId: this.state.randomboxId,
        orderId: this.state.orderId,
        newboxId: this.state.newboxId,
        productId:
          this.state.productItems.products[this.state.productsNum - 1].productId
      });

      this.startCarouselAnimation();
    });

    qs(".randombox_button").addEventListener("click", () => {
      return (window.location = "/mypage");
    });
  }

  async getMaxPriceIndex(products) {
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
    return Math.floor(Math.random() * this.state.productsNum);
  }

  startCarouselAnimation() {
    let start = ANIMATION_FRAME_START_INIT;

    const callback = () => {
      const end = this.state.productItems.products.length - 1;

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
    const temp = this.state.productItems.products.filter(
      (_, index) => index !== this.state.count && index !== maxIndex
    );

    let newProducts = [];

    if (this.state.count === maxIndex) {
      newProducts = [
        ...temp,
        this.state.productItems.products[this.state.count]
      ];
    } else if (this.state.count !== maxIndex) {
      newProducts = [
        ...temp,
        this.state.productItems.products[maxIndex],
        this.state.productItems.products[this.state.count]
      ];
    }

    return [...newProducts, ...newProducts, ...newProducts];
  }
}
