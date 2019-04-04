export default class FilePreview {
  constructor({wrapper, input, itemTemplate}) {
    this.$wrapper = wrapper;
    this.$input = input;
    this.itemTemplate = itemTemplate;
    this._registerListener();
  }

  _registerListener() {
    this.$input.addEventListener('change', ({target: {files}}) => {
      this.$wrapper.innerHTML = '';
      this._handleFiles(files);
    });
  }

  async _handleFiles(files) {
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      const src = await this._getDataURL({file});

      this.addItem({src});
    }
  }

  _getDataURL({file}) {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = ({target: {result}}) => {
        resolve(result);
      };
      reader.readAsDataURL(file);
    })
  }

  addItem({src}) {
    this.$wrapper.insertAdjacentHTML('beforeend', this.itemTemplate({src}));
  }
}