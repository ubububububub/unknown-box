import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class MyInfo extends Component {
  template() {
    return `<div>
              <div>
                <span>이름</span>
                <span>이상조</span>
              </div>
              <div>
                <span>주소</span>
                <span>서울시 강남구</span>
              </div>
              <div>
                <span>이메일</span>
                <span>cent7425@gmail.com</span>
              </div>
              <div>
                <span>전화번호</span>
                <span>010-7425-3535</span>
              </div>
            </div>
            <button>수정하기</button>
    `;
  }
}

export default MyInfo;
