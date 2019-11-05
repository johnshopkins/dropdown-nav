/**
 * From jQuery
 */
function stripAndCollapse(value) {
  const tokens = value.match(/[^\x20\t\r\n\f]+/g) || [];
  return tokens.join(' ');
}

/**
 * From jQuery
 */
function getClass(elem) {
  return elem.getAttribute && elem.getAttribute('class') || '';
}

module.exports = {

  hasClass: function(elem, selector) {
    const className =' ' + selector + ' ';
  
    if (elem.nodeType === 1 && (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1) {
      return true;
    }
  
    return false;
  },

  addClass: function (elem, className) {

    let classes = stripAndCollapse(getClass(elem)).split(' ');
  
    if (classes.indexOf(className) === -1) {
      classes.push(className)
      elem.setAttribute('class', classes.join(' '))
    }
  
  },
  
  removeClass: function(elem, className) {
  
    let classes = stripAndCollapse(getClass(elem)).split(' ');
    const index = classes.indexOf(className);
  
    if (index > -1) {
      classes.splice(index, 1)
      elem.setAttribute('class', classes.join(' '))
    }
  }

};
