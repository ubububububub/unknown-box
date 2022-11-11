import { getItem } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from "./DetailView.css" assert { type: "css" };
import { cart } from "../../store/cart.js";
import { qs } from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class DetailView extends Component {
    template() {
        return (
            `<div class="detail-wrap">
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
                      <button id="plus">+</button><button id="minus">-</button>  
                      <h5 id="count">0</h5>
                      <span></span>
                  </div>
                  <div class="detail-item-btn">
                    <button>BUY NOW</button>
                    <button id="addCart">장바구니</button>
                  </div>
               </div> 
              </div>`
        );
    }
    setEvent() {
        const item = this.props;
        let count = 1;
        getItem(item).then(x => {
          qs("#product-name").innerHTML = x.name;
          qs("#price").innerHTML = x.price + "원";
          qs("#count").innerHTML = count + "개";

          qs("#plus").addEventListener('click',()=>{
              qs("#count").innerHTML = (count + 1 ) + "개";
              count++;
          })
          qs("#minus").addEventListener('click',()=>{
            if(count > 0){
                qs("#count").innerHTML = (count - 1 ) + "개";
                count--;
            }
          })



          qs("#addCart").addEventListener("click",() => {
              if(confirm("장바구니에 추가하시겠습니까?")){
                  cart.setCartItem({
                      randombox: "아이디",
                      thumbnail : "랜덤박스 img",
                      randomboxName : "랜덤박스 등급명",
                      categoryName :"”카테고리 이름”",
                      price : 50000,
                      quantity : 50,
                  })
              }
          })
      });
  }
}

export default DetailView;