const classUtils = require('../utils/class');

const Hamburger = function (el, eventEmitter, menu) {

  this.el = el;
  this.eventEmitter = eventEmitter;
  this.menu = menu;

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

  if (newStyle === 'mobile' && this.menu.contains(document.activeElement)) {
    // only open if focused element is within the menu
    this.open();
  } else if (newStyle === 'nonmobile') {
    this.close();
  }

};

module.exports = Hamburger;
