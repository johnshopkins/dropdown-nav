const classUtils = require('js-utils').class;

const Hamburger = function (el, eventEmitter, menuItems) {

  this.el = el;
  this.eventEmitter = eventEmitter;
  this.menuItems = menuItems;

  this.opened = false;

  this.eventEmitter.addListener('skiptomain:focused', this.close.bind(this));
  this.eventEmitter.addListener('search:opened', this.close.bind(this));
  this.eventEmitter.addListener('menustyle:change', this.handleMenuStyleChangen.bind(this));

  this.el.addEventListener('click', (e) => this.toggle(e));

};

Hamburger.prototype.open = function () {

  // already opened
  if (this.opened) return;

  this.opened = true;
  this.eventEmitter.emit('hamburger:opened');
  classUtils.addClass(this.el, 'open')

};

Hamburger.prototype.close = function () {

  // already closed
  if (!this.opened) return;

  this.opened = false;
  classUtils.removeClass(this.el, 'open');

};

Hamburger.prototype.toggle = function (e) {

  e.preventDefault();

  if (!this.opened) {
    this.open();
  } else {
    this.close();
  }

};

Hamburger.prototype.handleMenuStyleChangen = function (newStyle) {

  if (newStyle === 'mobile' && this.focusInMenu()) {
    // only open if focused element is within the menu
    this.open();
  } else if (newStyle === 'nonmobile') {
    this.close();
  }

};

Hamburger.prototype.focusInMenu = function () {

  let focusInMenu = false;
  const numItems = this.menuItems.length;

  for (let i = 0; i < numItems; i++) {
    const item = this.menuItems[i];
    if (item.contains(document.activeElement)) {
      focusInMenu = true;
      break;
    }
  }

  return focusInMenu;

};

module.exports = Hamburger;
