const breakpoints = require('breakpoints');
const WindowResizeWatcher = require('window-resize-watcher');

module.exports = function () {

  new WindowResizeWatcher('nav');

  this.menuStyle = null

  window.addEventListener('nav:winresize:done', (e) => {
    
    const newStyle = (breakpoints.getWidth() === 'hand' || breakpoints.getHeight() === 'hand') ? 'mobile' : 'nonmobile';

    if (this.menuStyle === null) {
      this.menuStyle = newStyle;
      return;
    }

    if (this.menuStyle !== newStyle) {
      this.menuStyle = newStyle;
      dispatchEvent(new CustomEvent('menustyle:change', { detail: newStyle }));
    }

  });
};




