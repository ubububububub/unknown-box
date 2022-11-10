import Component from "../../core/Component.js";
import style from "./layout.css" assert { type: "css" };
import { qs } from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class Header extends Component {
  template() {
    const isLogin = !!localStorage.getItem("role");
    const isAdmin = localStorage.getItem("role") === "admin";
    return `<section class="header">
            <div class="header-fix">
              <div class="header-top">
                <a href="/" class="header-logo">Shop logo</a>
                <div class="header-top-box">
                  <ul class="header-toplist">
                    <li>
                      ${
                        !isLogin
                          ? `<a href='/login'>로그인</a>`
                          : `<a href="javascript:void(0);" id='login_logout_btn'>로그아웃</a>`
                      }
                    </li>
                    <li>
                      ${
                        !isLogin
                          ? `<a href='/signin'>회원가입</a>`
                          : `<a href='/mypage'>마이페이지</a>`
                      }
                    </li>
                    <li>
                      ${isAdmin ? `<a>관리자 계정입니다.</a>` : ``}
                    </li>
                  </ul>
                  <ul class="header-btlist">
                    <li class="box-basket">
                        <a href="/cart" id="btn-cart" class="btn-cart">
                          <span class="s_cart_cnt">0</span>
                          장바구니
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="header-nav-btn">
                  <a href="javascript:;" id="btn-nav-open">MENU ></a>
              </div>
            </div>
            <nav id="side-nav" class="side-nav">
              <div class="nav-inner">
                <div class="nav-header">
                  <a href="/" class="header-logo">Shop logo</a>
                  <a href="javascript:void(0);" id="side-nav-close">메뉴닫기</a>
                </div>
                <ul class="">
                  <li class="menu">
                    <a href="#">SHOP</a>
                    <div class="depth2">
                      <ul>
                        <li class=""><a href="#">신상품</a></li>
                         <li><a href="/qnaboard">Q&A 게시판</a></li>
                        <li><a href="#">베스트</a></li>
                        <li><a href="#">알뜰</a></li>
                      </ul>
                    </div>
                  </li>
                  <li class="menu">
                    <a href="#">CATEGORY</a>
                    <div class="depth2">
                      <a href="#">가전</a>
                    </div>
                    <div class="depth2">
                      <a href="#">의류</a>
                      <ul class="depth3">
                        <li><a href="#">- 상의</a></li>
                        <li><a href="#">- 하의</a></li>
                      </ul>
                    </div>
                  </li>
                </ul> 
              </div>
            </nav>
          </section>`;
  }
  setEvent() {
    if (qs("#login_logout_btn")) {
      qs("#login_logout_btn").addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        location.reload();
      });
    }
    qs("#btn-nav-open").addEventListener("click", () => {
      qs("#side-nav").style.left = 0;
    });

    qs("#side-nav-close").addEventListener("click", () => {
      qs("#side-nav").style.left = "-450px";
    });
  }
}

export default Header;
