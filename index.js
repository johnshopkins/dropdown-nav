const MenuStyleHandler = require('./components/MenuStyleHandler');
const Hamburger = require('./components/Hamburger');
const NavItem = require('./components/NavItem');
const Search = require('./components/Search');
const SkipToMainHandler = require('./components/SkipToMainHandler');

const Dropdown = function (el) {

  this.el = el;

  this.hamburger = this.getHambuger();
  this.search = this.getSearch();
  this.navItems = this.getNavItems();

  new MenuStyleHandler();
  new SkipToMainHandler();

};

Dropdown.prototype.getHambuger = function () {

  const el = this.el.querySelector('.hamburger-menu');

  if (!el) return null;

  return new Hamburger(el, this.el.querySelectorAll('.menu-item'));
};

Dropdown.prototype.getSearch = function () {

  const el = this.el.querySelector('.search-menu');

  if (!el) return null;

  return new Search(this.el, el);
};

Dropdown.prototype.getNavItems = function () {

  const elems = this.el.querySelectorAll('.tier-1 > li.menu-item');

  if (!elems) return null;

  let items = [];
  for (let i = 0; i < elems.length; i++) {
    items.push(new NavItem(
      elems[i],
      )
    );
  }

  return items;

};

module.exports = Dropdown;
