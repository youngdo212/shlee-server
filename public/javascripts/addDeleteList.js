export default class AddDeleteList {
  constructor({addButton, listWrap, listItemTemplate}) {
    this.$addButton = addButton;
    this.$listWrap = listWrap;
    this.listItemTemplate = listItemTemplate;
    this._registerEventListener();
  }

  _registerEventListener() {
    this.$addButton.addEventListener('click', () => {
      this._addItem();
    });
  }

  _addItem() {
    this.$listWrap.insertAdjacentHTML('beforeend', this.listItemTemplate());
    const newItem = this.$listWrap.lastElementChild;
    const deleteButton = newItem.querySelector('button');
    deleteButton.addEventListener('click', this._deleteItem.bind(this, newItem));
  }

  _deleteItem(item) {
    this.$listWrap.removeChild(item);
  }
}