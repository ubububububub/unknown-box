// import { getCategory } from "../../apis/main.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";
import style from "./MainRandom.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class MainRandom extends Component {
    template() {
        return `<ul class="main-catelist"><ul/>`;
    }
    setEvent() {
      //getCategory().then(result => {
        let category = ["의류", "화장품", "식품", "가전", "랜덤"];

        qs(".main-catelist").innerHTML = `
        <li>
           <a href="/category/${category[0]}">
             <img src="https://cdn-icons-png.flaticon.com/512/2357/2357127.png" />
           </a>
           <span>${category[0]}</span>
         </li>
         <li>
           <a href="/category1">
             <img src="https://cdn-icons-png.flaticon.com/512/3057/3057396.png" />
           </a>
           <span>${category[1]}</span>
         </li>
         <li>
           <a href="/category1">
             <img src="https://cdn-icons-png.flaticon.com/512/2756/2756708.png" />
           </a>
           <span>${category[2]}</span>
         </li>
         <li>
           <a href="/category1">
             <img src="https://cdn-icons-png.flaticon.com/512/3659/3659944.png" />
           </a>
           <span>${category[3]}</span>
         </li>
         <li>
           <a href="/category1">
             <img src="https://cdn-icons-png.flaticon.com/512/5726/5726678.png" />
           </a>
           <span>${category[4]}</span>
         </li>`
  }
}
