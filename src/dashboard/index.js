import './polyfill';
import Model from './model';
import View from './view';
import Controller from './controller';
import template from './template';
import validator from './validator';

const model = new Model();
const view = new View(template);
const controller = new Controller(model, view, validator);

window.addEventListener('DOMContentLoaded', () => {
  controller.setView();
});
