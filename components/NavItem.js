const classUtils = require('../utils/class');

const NavItem = function (el, eventEmitter) {

  this.el = el;
  this.subnav = this.el.querySelector('ul');
  this.eventEmitter = eventEmitter;

  this.opened = false;

  this.eventEmitter.addListener('skiptomain:focused', this.close.bind(this));
  this.eventEmitter.addListener('menu:closeall', this.close.bind(this));
  this.eventEmitter.addListener('search:opened', this.close.bind(this));

  // touch screens
  this.toggleTrigger = this.el.querySelector('.toggle-section');
  if (this.toggleTrigger) {
    this.toggleTrigger.addEventListener('click', this.toggle.bind(this));
    this.icon = this.toggleTrigger.querySelector('i');
  }

  // keyboard/voiceover (first a)
  this.el.querySelector('a').addEventListener('focus', this.open.bind(this));

  // mouse (first a)
  this.el.querySelector('a').addEventListener('mouseover', this.open.bind(this));
  this.el.addEventListener('mouseleave', this.close.bind(this));

};

NavItem.prototype.open = function (e) {

  // already opened
  if (this.opened) return;

  this.eventEmitter.emit('menu:closeall'); // close the other nav dropdowns

  this.opened = true;
  classUtils.addClass(this.el, 'open');
  if (this.subnav) this.subnav.removeAttribute('aria-hidden');

  if (this.toggleTrigger) this.updateText();

};

NavItem.prototype.close = function (e) {

  // already closed
  if (!this.opened) return;

  this.opened = false;
  classUtils.removeClass(this.el, 'open');
  if (this.subnav) this.subnav.setAttribute('aria-hidden', true);

  if (this.toggleTrigger) this.updateText();

};

NavItem.prototype.toggle = function (e) {

  e.preventDefault();

  if (!this.opened) {
    this.open();
  } else {
    this.close();
  }

};

NavItem.prototype.updateText = function () {

  const label = this.toggleTrigger.querySelector('span.visuallyhidden');

  if (this.opened) {
    label.textContent = label.textContent.replace('Open', 'Close');
    classUtils.removeClass(this.icon, 'fa-plus-square-o');
    classUtils.addClass(this.icon, 'fa-minus-square-o');
  } else {
    label.textContent = label.textContent.replace('Close', 'Open');
    classUtils.removeClass(this.icon, 'fa-minus-square-o');
    classUtils.addClass(this.icon, 'fa-plus-square-o');
  }

};

module.exports = NavItem;
