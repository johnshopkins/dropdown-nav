module.exports = function () {
  
  document.querySelector('.skip-to-main').addEventListener('focus', (e) => {
    dispatchEvent(new Event('skiptomain:focused'));
  });

};




