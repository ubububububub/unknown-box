import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class AddressForm extends Component {
  template() {
    const item = this.props;
    return `<label for="postcode">우편번호</label>
            <input type="text" id="postcode" name="postcode" ${
              item.postcode ? `value="${item.postcode}"` : null
            } readonly>
            <input type="button" class="address" value="우편번호 찾기"><br>
            <label for="roadAddress">도로명주소</label>
            <input type="text" id="roadAddress" name="roadAddress" ${
              item.roadAddress ? `value="${item.roadAddress}"` : null
            } readonly>
            <label for="jibunAddress">지번주소</label>
            <input type="text" id="jibunAddress" name="jibunAddress" ${
              item.jibunAddress ? `value="${item.jibunAddress}"` : null
            } readonly>
            <span id="guide" style="color:#999;display:none"></span>
            <label for="detailAddress">상세주소</label>
            <input type="text" id="detailAddress" name="detailAddress" ${
              item.detailAddress ? `value="${item.detailAddress}"` : null
            } >
            <label for="extraAddress">참고항목</label>
            <input type="text" id="extraAddress" name="extraAddress" ${
              item.extraAddress ? `value="${item.extraAddress}"` : null
            } readonly>
    `;
  }

  setEvent() {
    function execDaumPostcode() {
      new daum.Postcode({
        oncomplete(data) {
          qs("#postcode").value =
            qs("#roadAddress").value =
            qs("#jibunAddress").value =
            qs("#detailAddress").value =
            qs("#extraAddress").value =
              "";

          const roadAddr = data.roadAddress;
          let extraRoadAddr = "";

          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }

          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          qs("#postcode").value = data.zonecode;
          qs("#roadAddress").value = roadAddr;
          qs("#jibunAddress").value = data.jibunAddress;

          if (roadAddr !== "") {
            qs("#extraAddress").value = extraRoadAddr;
          } else {
            qs("#extraAddress").value = "";
          }

          const guideTextBox = qs("#guide");
          if (data.autoRoadAddress) {
            const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
            guideTextBox.style.display = "block";
          } else if (data.autoJibunAddress) {
            const expJibunAddr = data.autoJibunAddress;
            guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
            guideTextBox.style.display = "block";
          } else {
            guideTextBox.innerHTML = "";
            guideTextBox.style.display = "none";
          }
        }
      }).open();
    }

    qs(".address").addEventListener("click", execDaumPostcode);
  }
}

export default AddressForm;
