module.exports = function () {

  const container = document.createElement('div');
  container.className = 'modal slide-modal search-modal';
  container.setAttribute('aria-hidden', true);
  
  let html = '<button class="close close-box-x" aria-label="Close dialog"><i class="fa fa-fw fa-times"></i></button>';
  html += '<div class="center force">';
  html += '<div class="modal-content column">';
  html += '<div class="center force">';
  html += '<div class="search-box">';
  html += '<form class="column force" action="/search" method="GET">';
  html += '<label for="search-site" class="visuallyhidden">Keyword</label>';
  html += '<input id="search-site" class="column" type="text" name="q" />';
  html += '<button class="button column" type="submit">';
  html += `<i class="fa fa-fw fa-search"></i><span class="text">Search</span>`;
  html += '</button>';
  html += '</form>';
  html += '</div></div></div></div>';

  container.innerHTML = html;

  return container;

};
