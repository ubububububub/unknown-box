import { insertQna } from "../../apis/qna.js";
import Component from "../../core/Component.js";
import {qs} from "../../utils/index.js";
import style from "./QnaWrite.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class QnaWrite extends Component {

    template() {
        return `
            <form class="qnawrite-form">
                <div class="qnawrite-title">
                    <label for="qnawrite-title">제목</label>
                    <input id="qnawrite-title" name="title" type="text">
                </div>
                <div class="qnawrite-col-wrap">
                    <label for="qnawrite-password">비밀번호</label>
                    <input id="qnawrite-password"  name="password" type="password">
                </div>
                <div class="qnawrite-content-wrap">
                    <label for="qnawrite-content">내용</label>
                    <textarea id="qnawrite-content"  rows="30"  name="content" ></textarea> 
                </div>
                 <button id="submit">작성</button>
            </form> 
            <div class="qnawrite-control">
                <a href="/qnaboard/list">< 목록</a>
             </div>
            `
    }

    setEvent() {
        super.setEvent();
        qs("#submit").addEventListener("click", (e) => {
            const formData = new FormData();
            const title = qs("#qnawrite-title").value;
            const password = qs("#qnawrite-password").value;
            const content = qs("#qnawrite-content").value;
            if(title !== "" && password !==  "" && content !== ""){
                formData.append("title", title);
                formData.append("password", password);
                formData.append("content", content);
                insertQna(formData).then(x =>{
                 if (x.status === 201){
                     alert("게시글 작성이 완료 되었습니다.");
                     window.location.href = "/qnaboard/list";
                 }else{
                     alert("로그인후 이용해 주세요");
                     window.location.href = "/login";
                 }
                });
            }else{
                alert("모든항목을 입력해 주세요");
            }
            e.preventDefault();
        });
    }
}