import Component from "../../core/Component.js";
import { qs, isClassContained, MODAL } from "../../utils/index.js";
import {
  deleteAdminQna,
  getAdminQnaDetail,
  getAdminQnaList,
  postAdminQna
} from "../../apis/index.js";
import Navbar from "../../components/Navbar/Navbar.js";
import { ADMIN_PAGE_NAV } from "../../constants/index.js";
import Modal from "../../components/Modal/Modal.js";

export class AdminQna extends Component {
  setup() {
    //const qnaList = await getAdminQnaList();
    const mock = [
      {
        qnaboardId: 11,
        title: "test",
        author: "nahyun",
        createdAt: "2022-11-09T15:51:52",
        updatedAt: "2022-11-10T16:52:52"
      },
      {
        qnaboardId: 12,
        title: "test",
        author: "nahyun",
        createdAt: "2022-11-09T15:51:52",
        updatedAt: "2022-11-10T16:52:52"
      },
      {
        qnaboardId: 13,
        title: "test",
        author: "nahyun",
        createdAt: "2022-11-09T15:51:52",
        updatedAt: "2022-11-10T16:52:52"
      }
    ];
    this.state = { qnaList: mock };
  }
  template() {
    return `
          <section id="admin_qna-container">
            <div id="admin_qna-nav"></div>
            <table id="admin_qna-list-wrapper">
            <thead>
                <tr>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody id="admin_qna-list-body">
            ${this.state.qnaList
              .map(
                qna =>
                  `<tr class="qna" data-id="${qna.qnaboardId}">
                    <td>${qna.qnaboardId}</td>
                    <td>${qna.title}</td>
                    <td>${qna.author}</td>
                    <td>${qna.createdAt.slice(0, 10)}</td>
                    <td>${qna.updatedAt.slice(0, 10)}</td>
                    <td>
                      <button type="button" class="qna-btn admin_getDetail-qna">게시글 보기</button>
                    </td>
                </tr>`
              )
              .join("")}
            </tbody>
          </table>
        </section>
        `;
  }

  mounted() {
    new Navbar(qs("#admin_qna-nav"), ADMIN_PAGE_NAV);
  }

  setEvent() {
    this.target.addEventListener("click", e => {
      if (!isClassContained(e.target, "qna-btn")) return;

      const qnaId = e.target.closest("tr").dataset.id;
      if (isClassContained(e.target, "admin_getDetail-qna")) {
        this.getDetailHandler(qnaId);
      }
    });
  }

  getDetailHandler(qnaId) {
    //const qnaDetail = await getAdminQnaDetail(qnaId);
    const { qnaboardId, title, content, author, answer } =
      this.state.qnaList[0];

    new Modal(qs("#app"), {
      id: qnaboardId,
      type: "ANSWER",
      headerText: "QnA",
      contents: {
        body: [
          MODAL.Div({ className: "qna" }, [
            MODAL.Div({ className: "qna-title" }, [
              MODAL.Span({}, ["제목"]),
              MODAL.Span({}, [title])
            ]),
            MODAL.Div({ className: "qna-content" }, [
              MODAL.Span({}, ["내용"]),
              MODAL.Span({}, [content])
            ]),
            MODAL.Div({ className: "qna-quthor" }, [
              MODAL.Span({}, ["작성자"]),
              MODAL.Span({}, [author])
            ]),
            MODAL.Div({ className: "anq-answer" }, [
              MODAL.Span({}, ["답변"]),
              answer == undefined
                ? MODAL.Div({}, [MODAL.Textarea({}, [])])
                : MODAL.Span({}, [answer])
            ])
          ])
        ],
        footer: [
          MODAL.Button({}, ["삭제"], () => this.deleteHandler(qnaboardId))
        ]
      },
      submit: this.answerQna
    });
  }

  answerQna(id, data) {
    // await postAdminQna(id, data);
  }

  deleteHandler(id) {
    // await deleteAdminQna(id);
  }
}
