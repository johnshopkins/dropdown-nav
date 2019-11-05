const EventEmitter = require('wolfy87-eventemitter');
const MenuStyleHandler = require('./components/MenuStyleHandler');
const Hamburger = require('./components/Hamburger');
const NavItem = require('./components/NavItem');
const Search = require('./components/Search');
const SkipToMainHandler = require('./components/SkipToMainHandler');

const Dropdown = function (el, searchObject) {

  this.el = el;
  this.searchObject = searchObject;

  this.eventEmitter = new EventEmitter();

  this.hamburger = this.getHambuger();
  this.search = this.getSearch();
  this.navItems = this.getNavItems();

  new MenuStyleHandler(this.eventEmitter);
  new SkipToMainHandler(this.eventEmitter);

};

Dropdown.prototype.getHambuger = function () {

  const el = this.el.querySelector('.hamburger-menu');

  if (!el) return null;

  return new Hamburger(el, this.eventEmitter, this.el.querySelectorAll('.navitem'));
};

Dropdown.prototype.getSearch = function () {

  const el = this.el.querySelector('.search-menu');

  if (!el || !this.searchObject) return null;

  return new Search(el, this.eventEmitter, this.searchObject);
};

Dropdown.prototype.getNavItems = function () {

  const elems = this.el.querySelectorAll('.tier-1 > li.navitem');

  if (!elems) return null;

  let items = [];
  for (let i = 0; i < elems.length; i++) {
    items.push(new NavItem(
      elems[i],
      this.eventEmitter)
    );
  }

  return items;

};

module.exports = Dropdown;
