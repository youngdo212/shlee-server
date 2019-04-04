import AddDeleteList from '../addDeleteList.js';
import FilePreview from '../filePreview.js';
import {addedInput, thumbnailPreviewItem, headerImagePreviewItem, snapshotPreviewItem} from '../template.js'

const videoUrlList = new AddDeleteList({
  addButton: document.querySelector('.form__button--add'),
  listWrap: document.querySelector('.form__input-wrap--video'),
  listItemTemplate: addedInput({id: 'video-url', name: 'video-url'}),
});

const thumbnailPreview = new FilePreview({
  wrapper: document.querySelector('.thumbnail-preview'),
  input: document.querySelector('#thumbnail'),
  itemTemplate: thumbnailPreviewItem,
});

const headerImagePreview = new FilePreview({
  wrapper: document.querySelector('.header-image-preview'),
  input: document.querySelector('#header-image'),
  itemTemplate: headerImagePreviewItem,
});

const snapshotPreview = new FilePreview({
  wrapper: document.querySelector('.snapshot-preview'),
  input: document.querySelector('#snapshot'),
  itemTemplate: snapshotPreviewItem,
});