import { getItem } from "../../apis/main.js";
import Component from "../../core/Component.js";
import style from './DetailView.css' assert { type: 'css' };
import { cart } from '../../store/cart.js';
import { qs } from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class DetailView extends Component {
    template() {
        return (
            `<section class="detail-content">
            <div class="detail-wrap">
                <div class="detail-img">
                  <img src="" alt="">
                </div>
                <div class="detail-info">
                  <h5>카테고리 명</h5>
                  <h4 id="name"></h4>
                  <p>상품 설명</p>
                  <div class="list-pay">
                      <h5>50,000원</h5>
                      <span>제조사</span>
                  </div>
                  <select name="" id="">
                    <option value="">옵션</option>
                    <option value="빨강">빨강</option>
                    <option value="파랑">파랑</option>
                    <option value="노랑">노랑</option>
                  </select>
                  <div class="btn">
                    <button>BUY NOW</button>
                    <button id="addCart">장바구니</button>
                  </div>
                </div>
              </div>
            <div class="detail-view">
              <h2>detail-view</h2>
              <img src="https://www.espoir.com/UPLOAD/UPLOAD_IMAGE/EDITOR/20221019/IMG1666epi154486208.jpg" alt="">
            </div>
          </section>`
        );
    }
    setEvent() {
        const item = this.props;
        let name = "";

        getItem(item)
            .then(res => res)
            .then(data =>{
                name = data;
                qs('#name').innerHTML = data;
            })

        qs('#addCart').addEventListener('click',() => {
            if(confirm('장바구니에 추가하시겠습니까?')){
                cart.setCartItem({
                    name  : name,
                    price : 1,
                    option: {
                        color: "orange",
                        size : "m"
                    }
                })
            }
        })
    }
}

export default DetailView;
