const NavItem = function (el) {

  this.el = el;
  this.subnav = this.el.querySelector('ul');

  this.opened = false;

  addEventListener('skiptomain:focused', this.close.bind(this));
  addEventListener('menu:closeall', this.close.bind(this));
  addEventListener('search:opened', this.close.bind(this));

  // touch screens
  this.toggleTrigger = this.el.querySelector('.toggle-section');
  if (this.toggleTrigger) {
    this.toggleTrigger.addEventListener('click', this.toggle.bind(this));
    this.icon = this.toggleTrigger.querySelector('i');
  }

  // keyboard/voiceover (first a)
  this.el.querySelector('a').addEventListener('focus', this.open.bind(this));

  // keyboard/voiceover (last a)
  if (this.subnav) {
    const links = this.subnav.querySelectorAll('li a');
    const last = links[links.length- 1];

    this.el.addEventListener('focusout', (e) => {
      if (e.target === last) {
        this.close();
      }
    });
  }

  // mouse (first a)
  this.el.querySelector('a').addEventListener('mouseover', this.open.bind(this));
  this.el.addEventListener('mouseleave', this.close.bind(this));

};

NavItem.prototype.open = function (e) {

  // already opened
  if (this.opened) return;

  dispatchEvent(new Event('menu:closeall')); // close the other nav dropdowns

  this.opened = true;
  this.el.classList.add('open');
  if (this.subnav) this.subnav.removeAttribute('aria-hidden');

  if (this.toggleTrigger) this.updateText();

};

NavItem.prototype.close = function (e) {

  // already closed
  if (!this.opened) return;

  this.opened = false;
  this.el.classList.remove('open');
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
    this.icon.classList.remove('fa-plus-square-o');
    this.icon.classList.add('fa-minus-square-o');
  } else {
    label.textContent = label.textContent.replace('Close', 'Open');
    this.icon.classList.remove('fa-minus-square-o');
    this.icon.classList.add('fa-plus-square-o');
  }

};

module.exports = NavItem;
