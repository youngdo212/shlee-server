import AddDeleteList from '../addDeleteList.js';
import {addedInput} from '../template.js';

const videoUrlList = new AddDeleteList({
  addButton: document.querySelector('.form__button--add'),
  listWrap: document.querySelector('.form__input-wrap--video'),
  listItemTemplate: addedInput({id: 'video-url', name: 'video-url'}),
});