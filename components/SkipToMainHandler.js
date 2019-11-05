module.exports = function (eventEmitter) {
  
  document.querySelector('.skip-to-main').addEventListener('focus', (e) => {
    eventEmitter.emit('skiptomain:focused');
  });

};




