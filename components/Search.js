const classUtils = require('js-utils').class;
const template = require('../templates/search');

const Search = function (container, searchButton, eventEmitter) {

  this.container = container;
  this.searchButton = searchButton;

  this.eventEmitter = eventEmitter;

  this.addModalHtml();

  this.opened = false;

  this.eventEmitter.addListener('skiptomain:focused', this.close.bind(this));
  this.eventEmitter.addListener('hamburger:opened', this.close.bind(this));

  this.searchButton.addEventListener('click', (e) => this.toggle(e));


};

Search.prototype.addModalHtml = function () {

  this.modal = template();
  this.modal.style.display = 'none';
  this.container.insertBefore(this.modal, this.container.firstChild);

  // save some references for later
  this.input = this.modal.querySelector('input');

  // add events
  this.modal.querySelector('button.close').addEventListener('click', (e) => this.toggle(e));

};

Search.prototype.open = function () {

  this.modal.style.display = 'block';

  setTimeout(() => {
    classUtils.addClass(this.modal, 'modal-open');
    classUtils.addClass(this.searchButton, 'open');
    classUtils.addClass(document.body, 'search-modal-open');
    classUtils.addClass(document.body, 'slide-modal-open');
    this.modal.removeAttribute('aria-hidden');
    this.input.focus();
  }, 50); // delay to allow for display:block to take effect

  this.opened = true;
  this.eventEmitter.emit('search:opened');

};

Search.prototype.close = function () {

  if (!this.opened) {
    // if already closed when auto-close is called
    return null;
  }

  classUtils.removeClass(this.modal, 'modal-open'); // triggers css animation
  classUtils.removeClass(this.searchButton, 'open');
  classUtils.removeClass(document.body, 'search-modal-open');
  classUtils.removeClass(document.body, 'slide-modal-open');
  this.modal.setAttribute('aria-hidden', true);
  this.searchButton.querySelector('a').focus();

  setTimeout(() => {
    this.modal.style.display = 'none';
  }, 800); // delay to allow for closing animation

  this.opened = false;

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
