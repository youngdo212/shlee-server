import Navigation from '../navigation.js'

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  isMobile: window.matchMedia('only screen and (max-width: 425px)').matches,
});