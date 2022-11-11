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
                  <img id="detail-img" src="" alt="">
                </div>
                <div class="detail-info">
                  <div class="list-pay">
                      <h4 id="product-name"></h4>
                  </div>
                  <div class="list-pay">
                      <h5 id="price"></h5>
                  </div>
                  <div class="list-pay detail-description">
                    <label>상품설명</label>
                    <h5 id="description"></h5>
                  </div>
                  <div class="list-pay">
                    <div class="item-count">
                    <button id="minus">-</button>
                      <h5 id="count">0</h5>
                      <button id="plus">+</button> 
                      <span></span>
                    </div>
                  </div>
                  <div class="detail-item-btn">
                    <button id="addCart">장바구니</button>
                  </div>
               </div> 
              </div>`
        );
    }
    setEvent() {
        let count = 1;

        getItem(this.props).then(x => {
            console.log(x);
            const maxCount = x.count;
            qs("#product-name").innerHTML = x.randomboxName;
            qs("#price").innerHTML = x.price + "원";
            qs("#count").innerHTML = count + "개";
            qs("#description").innerHTML = x.description;
            qs("#detail-img").src = x.thumbnail;
            qs("#plus").addEventListener('click',()=>{
                if(count === maxCount){alert("등록할 수 있는 최대 수량입니다."); return false;}
                else {
                    qs("#count").innerHTML = (count + 1 ) + "개";
                    count++;
                }
            })
            qs("#minus").addEventListener('click',()=>{
                if(count > 1) {
                    qs("#count").innerHTML = (count - 1) + "개";
                    count--;
                }
            })

            qs("#addCart").addEventListener("click",() => {
                if(confirm("장바구니에 추가하시겠습니까?")){
                    let result = cart.setCartItem({
                        randombox: x.randomboxId,
                        thumbnail : x.thumbnail,
                        randomboxName :x.randomboxName,
                        categoryName :x.categoryName,
                        price : x.price,
                        quantity : count,
                    })
                    if(result){
                        alert("장바구니에 담겼습니다!");
                        window.location.reload();
                    }
                }
            })
        });
    }
}

export default DetailView;