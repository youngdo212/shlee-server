export default class Controller {
  constructor({section, loader, modal = null}) {
    this.section = section;
    this.loader = loader;
    this.modal = modal;

    this.loader.bindAddItems(this._addItems.bind(this));
    this.modal && this.section.bindShowItem(this._showItem.bind(this));
  }

  _addItems(items) {
    this.section.addItems(items);
  }

  _showItem(item) {
    this.modal.open(item);
  }
}