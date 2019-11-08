import Model from './model';
import View from './view';
import Controller from './controller';
import template from './template';

const model = new Model();
const view = new View(template);
const controller = new Controller(model, view);

window.addEventListener('DOMContentLoaded', () => {
  controller.setView();
});
