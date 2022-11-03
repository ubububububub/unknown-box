import Component from "../../core/Component.js";
import ProductItem from "../ProductItem/ProductItem.js";
import { qs } from "../../utils/index.js";

export default class ProductList extends Component {
    
    template () {
        return `
            <thead>
                <tr>
                    <th>No</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>설명</th>
                </tr>
            </thead>
            <tbody id="product-list-body"></tbody>
            <button type="button">추가하기</button>
        </table>
        `
    }

    mounted () {
        this.props.forEach(product =>
            new ProductItem(qs('#product-list-body'), product)
        )
    }  
}