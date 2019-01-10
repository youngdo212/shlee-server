import Navigation from './navigation.js';
import Modal from './modal.js';
import ProjectSectionView from './projectSectionView.js';
import Header from './header.js';
import FooterForm from './footerForm.js';
import Loader from './loader.js';

import {showreel} from './data.js';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  header: document.querySelector('header'),
  items: [
    {name: 'Work', path: '/work'},
    {name: 'Lab', path: '/lab'},
    {name: 'Info', path: '/info'},
  ],
});

const modal = new Modal({
  modal: document.querySelector('.modal'),
})

const projectSectionView = new ProjectSectionView({
  wrapper: document.querySelector('section'),
  quickViewHandler: modal.activate.bind(modal),
})

const loader = new Loader({
  loader: document.querySelector('.loader'),
  handler: projectSectionView.addProject.bind(projectSectionView),
  url: 'http://127.0.0.1:3000/api/project',
})

const showreelButton = document.querySelector('.header__showreel');

showreelButton.addEventListener('click', modal.activate.bind(modal, showreel));

const header = new Header({
  header: document.querySelector('header'),
})

const footerForm = new FooterForm({
  form: document.querySelector('.footer__form'),
  formMessage: document.querySelector('.footer__form-message'),
  submitMessage: 'Thank you for subscribing!',
  rejectMessage: 'Please enter a valid email address.',
})