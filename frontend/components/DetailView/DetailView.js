import { getItem } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from "./DetailView.css" assert { type: "css" };
import { cart } from "../../store/cart.js";
import { qs } from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class DetailView extends Component {
    template() {
        return (
            `<section class="detail-content">
            <div class="detail-wrap">
                <div class="detail-img">
                  <img src="http://unsplash.it/500/500?random=9" alt="">
                </div>
                <div class="detail-info">
                    <h5>상품명</h5>
                      <h4 id="product-name"></h4>
                    <p></p>
                  <div class="list-pay">
                    <h5>가격</h5>
                      <h5 id="price"></h5>
                      <span></span>
                  </div>
                  <div class="list-pay">
                    <h5>수량</h5>
                      <h5 id="count"></h5>
                      <span></span>
                  </div>
                  <select name="" id="">
                    <option value="">size</option>
                    <option value="빨강">S</option>
                    <option value="파랑">M</option>
                    <option value="노랑">L</option>
                  </select>
               </div> 
                  <div class="btn">
                    <button>BUY NOW</button>
                    <button id="addCart">장바구니</button>
                  </div>
              </div>
          </section>`
        );
    }
    setEvent() {
        const item = this.props;

        getItem(item).then(x => {
          qs("#product-name").innerHTML = x.name;
          qs("#price").innerHTML = x.price + "원";
          qs("#count").innerHTML = x.count + "개";

          qs("#addCart").addEventListener("click",() => {
              if(confirm("장바구니에 추가하시겠습니까?")){
                  cart.setCartItem({
                      name  : x.name,
                      price : x.price,
                      option: {
                          color: "orange",
                          size : "m"
                      }
                  })
              }
          })
      });
  }
}

export default DetailView;