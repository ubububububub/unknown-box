import Component from "../../core/Component.js";
import {insertQna, updateQna, deleteQna} from "../../apis/qna.js";
import { qs } from "../../utils/index.js";
import {getQnaDetail} from "../../apis/qna.js";
import style from "./QnaView.css" assert { type: "css" };
document.adoptedStyleSheets.push(style);

export default class QnaView extends Component {
    template() {
        return `
            <div id="qnaView"></div>
           
            <div class="qnaview-control">
                <a href="/qnaboard/list">글목록</a>
                <button id="delete">글삭제</button>
                <button  id="modify">글수정</button>
                <button  id="update" style="display: none">수정하기</button>                
            </div>
            `
    }

    setEvent() {
        window.addEventListener('load',function(){
            const urlParams = new URL(location.href).searchParams;
            const qnaboardId = urlParams.get('qnaboardId');
            const password = prompt("비밀번호를 입력해 주세요");

            if(password){
                getQnaDetail(qnaboardId,password).then(x =>
                    {
                        console.log(x);
                        if(x.error){
                            alert(x.error);
                            location.href = "/qnaboard/list";
                        }else{
                            qs("#qnaView").innerHTML += `
                             <table class="qnaview-table">
                                <thead>
                                    <tr>
                                        <th>${x.title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span>작성자 : ${x.author}</span><span>작성날짜 :${x.createdAt }</span></td>
                                    </tr>
                                    <tr>
                                        <td class="qnaview-area">${x.content}</td>
                                    </tr>
                                </tbody>
                            </table>
                            `
                            qs("#modify").addEventListener('click',()=>{
                                qs("#qnaView").innerHTML = `                                    
                                     <table class="qnaview-table">
                                        <thead>
                                            <tr>
                                                <th>제목:<input type="text" value="${x.title}" id="title"/></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span>작성자 : ${x.author}</span><span>작성날짜 :${x.createdAt}</span></td>
                                            </tr>
                                            <tr>
                                           
                                                <td class="qnaview-area">내용: <textarea id="content" cols="30" rows="5">${x.content}</textarea></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `
                                qs("#modify").style.display = 'none';
                                qs("#update").style.display = 'block';
                            })

                            qs("#update").addEventListener('click',()=>{
                                    if(title !== "" && content !==  ""){
                                        if(confirm("글을 수정하시겠습니까?")) {
                                            const formData = new FormData();
                                            const title = qs("#title").value;
                                            const content = qs("#content").value;
                                            formData.append("title", title);
                                            formData.append("content", content);
                                            updateQna(formData,x.qnaboardId).then(x =>{
                                                if (x.status === 200){
                                                    alert("수정이 완료 되었습니다.");
                                                    window.location.href = "/qnaboard/list";
                                                }else{
                                                    alert("수정실패");
                                                    return false;
                                                }
                                            })
                                    }else{
                                        alert("값을 모두 입력해 주세요");
                                        return false;
                                    }
                                }
                            })

                            qs("#delete").addEventListener('click',()=>{
                                const formData = new FormData();
                                console.log(x.password);
                                formData.append("password", password);
                                deleteQna(formData,x.qnaboardId).then(x =>{
                                    if (x.status === 200){
                                        alert("삭제가 완료 되었습니다.");
                                        window.location.href = "/qnaboard/list";
                                    }else{
                                        alert("삭제실패");
                                        return false;
                                    }
                                })

                            })
                        }
                    }
                );
            }else{
                alert('권한이 없습니다');
                window.location.href = "/qnaboard/list";
            }
        });
    }
}