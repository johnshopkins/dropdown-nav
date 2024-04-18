const Hamburger = function (el, menuItems) {

  this.el = el;
  this.menuItems = menuItems;

  this.opened = false;

  addEventListener('skiptomain:focused', this.close.bind(this));
  addEventListener('search:opened', this.close.bind(this));
  addEventListener('menustyle:change', this.handleMenuStyleChanged.bind(this));

  this.el.addEventListener('click', (e) => this.toggle(e));

};

Hamburger.prototype.open = function () {

  // already opened
  if (this.opened) return;

  this.opened = true;
  dispatchEvent(new Event('hamburger:opened'));
  this.el.classList.add('open');

};

Hamburger.prototype.close = function () {

  // already closed
  if (!this.opened) return;

  this.opened = false;
  this.el.classList.remove('open');

};

Hamburger.prototype.toggle = function (e) {

  e.preventDefault();

  if (!this.opened) {
    this.open();
  } else {
    this.close();
  }

};

Hamburger.prototype.handleMenuStyleChanged = function (e) {

  const newStyle = e.detail;

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
