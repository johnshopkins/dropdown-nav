const classUtils = require('../utils/class');

const Search = function (el, eventEmitter, searchObject) {

  this.el = el;
  this.eventEmitter = eventEmitter;
  this.searchObject = searchObject;

  this.opened = false;

  this.eventEmitter.addListener('skiptomain:focused', this.close.bind(this));
  this.eventEmitter.addListener('hamburger:opened', this.close.bind(this));

  this.el.addEventListener('click', (e) => this.toggle(e));
  

};

Search.prototype.open = function () {

  this.opened = true;
  this.eventEmitter.emit('search:opened');

  if (this.searchObject) {
    this.searchObject.open();
  }

  classUtils.addClass(this.el, 'open');

};

Search.prototype.close = function () {

  this.opened = false;

  if (this.searchObject) {
    this.searchObject.close();
  }

  classUtils.removeClass(this.el, 'open');

};

Search.prototype.toggle = function (e) {

  e.preventDefault();

    if (!this.opened) {
      this.open();
    } else {
      this.close();
    }

};

module.exports = Search;
