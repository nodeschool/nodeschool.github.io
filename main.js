var back = document.createElement('button');
back.appendChild(document.createTextNode('Back'));
back.id = 'back';
back.addEventListener('click', function (ev) {
  showIndex();
  changeHistory();
});

function showIndex() {
  showAll();
  back.classList.remove('show');
}

var boxContainer = document.getElementById('boxes');
boxContainer.parentNode.insertBefore(back, boxContainer);

var boxes = boxContainer.querySelectorAll('.box')
for (var i = 0; i < boxes.length; i++) (function (box) {
  box.addEventListener('click', function (ev) {
    if (box.classList.contains('small')) {
      hideAll();
      box.style.display = 'block';
      box.classList.remove('small');
      back.classList.add('show');
      changeHistory(box);
    }
  })
  box.classList.add('small');
})(boxes[i]);

function hideAll() {
  for (var i = 0; i < boxes.length; i++) (function (box) {
    box.style.display = 'none';
  })(boxes[i])
}

function showAll() {
  for (var i = 0; i < boxes.length; i++) (function (box) {
    box.style.display = 'inline-block';
    box.classList.add('small');
  })(boxes[i]);
}

function changeHistory(item) {
  var url = '#' + (item && item.dataset.url || '');
  window.history.pushState({url: url}, '', url);
}

window.addEventListener('popstate', handlePopstate);

function handlePopstate(ev) {
  if (ev.state.url == '#')
    return showIndex();
  showItemByUrl(ev.state.url);
}

function showItemByUrl(frag) {
  var el;
  frag = (frag || window.location.hash).slice(1);
  if (frag) {
    el = document.querySelector('*[data-url="'+frag+'"]');
    if (el) { el.click(); }
  }
}

showItemByUrl();
