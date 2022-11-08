import QnaList from "../../components/QnaBoard/QnaList.js";
import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";


export class QnaBoard extends Component {
    template() {
        return `<table class="table table-hover" id="qna-container">`;
    }

    mounted() {
            new QnaList(qs("#qna-container"));
    }
}
