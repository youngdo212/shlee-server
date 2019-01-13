import Navigation from '../navigation.js'

import {navigationItems} from '../data.js';

const navigation = new Navigation({
  element: document.querySelector('.navigation'),
  items: navigationItems,
  activeItemIndex: 2,
});