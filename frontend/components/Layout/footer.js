import Component from "../../core/Component.js";
import style from './layout.css' assert { type: 'css' };
document.adoptedStyleSheets.push(style);

export class Footer extends Component {
    template() {
        return (
            `<footer id="footer">
            <div class="footer-content">
              <div class="footer-nav">
                <ul>
                  <li><a href="">매장 찾기</a></li>
                  <li><a href="">브랜드 소개</a></li>
                  <li><a href="">멤버십</a></li>
                </ul>
              </div>
              <ul class="service">
                <li>고객센터</li>
                <li><a href="">010 111 1111</a></li>
                <li><span>상담시간 13:00 ~ 17:00</span><span>(월~금, 공휴일 제외)</span></li>
              </ul>
              <ul class="sns">
                <li><a href="">인스타</a></li>
                <li><a href="">페이스북</a></li>
                <li><a href="">카카오톡</a></li>
              </ul>
            </div>
            <div class="info">
              <ul class="footer-info-nav">
                <li><a href="">서비스 이용약관</a></li>
                <li><a href="">개인정보처리방침</a></li>
                <li><a href="">이메일 무단수집 거부</a></li>
              </ul>
              <div class="copy">
                <p>(주)unkonw box 대표이사: 1등조</p>      
                <p>본사 : 서울 성동구 아차산로17길 48</p>
                <p>사업자번호: 111-11-111111</p>
                <p>통신판매업신고번호 : 제 1111-서울-1111호<a href="">사업자 정보 확인</a></p>
                <p>개인정보보호책임자: 1등조</p>
                <p>Copyright ⓒ 2022 unkonwbox. All Rights Reserved. </p>
              </div>
            </div>
          </footer>`
        );
    }
}

export default Footer;