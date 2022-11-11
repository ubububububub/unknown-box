import Component from "../../core/Component.js";
import { qs } from "../../utils/index.js";

class ImageUploadForm extends Component {
  setup() {
    this.state = { base64Image: "" };
  }

  template() {
    const { base64Image } = this.state;
    return `<div class="image-upload-form_container">
                <div class="image-upload-form_preview">
                    <div>
                        <img src="${base64Image}" />
                    </div>
                </div>
                <input type="file" accept="image/*" class="image-upload-form_input" />
                <input type="hidden" id="hiddenInput" name="thumbnail" class="image-upload-form_hidden-input"/> 
            </div>

    `;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.setEvent();
  }

  setEvent() {
    qs(".image-upload-form_input").addEventListener("change", e => {
      this.handleImageUpload(e);
    });
  }

  async handleImageUpload(e) {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 512,
      useWebWorker: true
    };
    try {
      const image = await imageCompression(e.currentTarget.files[0], options);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        this.setState({
          base64Image: reader.result
        });
        qs(".image-upload-form_hidden-input").setAttribute(
          "value",
          reader.result
        );
      };
    } catch (err) {
      console.dir(err);
    }
  }
}

export default ImageUploadForm;
