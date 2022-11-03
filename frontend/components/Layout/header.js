import Component from "../../core/Component.js";
import style from './layout.css' assert { type: 'css' };
import {qs} from "../../utils/index.js";
document.adoptedStyleSheets.push(style);

export class Header extends Component {
    template() {
        return (
            `<section class="header">
            <div class="header-fix">
              <div class="header-top">
                <a href="#" class="header-logo">Shop logo</a>
                <div class="header-top-box">
                  <ul class="header-toplist">
                    <li>
                      <a href="#">로그인</a>
                    </li>
                    <li>
                      <a href="#">회원가입</a>
                    </li>          
                  </ul>
                  <ul class="header-btlist">
                    <li class="box-search">
                      <a href="#">검색</a>
                    </li>
                    <li class="box-basket">
                        <a href="#" id="btn-cart" class="btn-cart">
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
                  <a href="#" class="header-logo">Shop logo</a>
                  <a href="javascript:void(0);" id="side-nav-close">메뉴닫기</a>
                </div>
                <ul class="">
                  <li class="menu">
                    <a href="#">SHOP</a>
                    <div class="depth2">
                      <ul>
                        <li class=""><a href="#">HOT DEAL</a></li>
                        <li><a href="#">OTHER</a></li>
                        <li><a href="#">LOOK BOOK</a></li>
                      </ul>
                    </div>
                  </li>
                  <li class="menu">
                    <a href="#">ARTIST SERVICE</a>
                    <div class="depth2">
                      <a href="#">ONLINE CONSULTING</a>
                    </div>
                    <div class="depth2">
                      <a href="#">OFFLINE CONSULTING</a>
                      <ul class="depth3">
                        <li><a href="#">- TOUCH UP</a></li>
                        <li><a href="#">- EYEBROW BAR</a></li>
                      </ul>
                    </div>
                  </li>
                </ul> 
              </div>
            </nav>
          </section>`
        );
    }
    setEvent() {
        qs('#btn-nav-open').addEventListener('click',() => {
           qs('#side-nav').style.left = 0;
        })

        qs('#side-nav-close').addEventListener('click',() => {
          qs('#side-nav').style.left = '-450px';
        })
    }

}

export default Header;