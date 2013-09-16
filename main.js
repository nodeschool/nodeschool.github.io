var back = document.createElement('button');
back.appendChild(document.createTextNode('Back'));
back.id = 'back';
back.addEventListener('click', function (ev) {
  window.location.hash = '#';
});

var boxContainer = document.getElementById('boxes');
boxContainer.parentNode.insertBefore(back, boxContainer);

var boxes = [].slice.call(boxContainer.querySelectorAll('.box'));
boxes.forEach(function (box) {
  box.addEventListener('click', function (ev) {
    window.location.hash = '#' + this.getAttribute('data-url');
  });
  box.classList.add('small');
});

function hideAll() {
  boxes.forEach(function (box) {
    box.style.display = 'none';
  });
}

function showAll() {
  boxes.forEach(function (box) {
    box.style.display = 'inline-block';
    box.classList.add('small');
  });
}

window.addEventListener('hashchange', handleHashChange);

function handleHashChange() {
  var hash = window.location.hash.slice(1);

  if (!hash)
    return showIndex();
  showItemByUrl(hash);
}

function showIndex() {
  showAll();
  back.classList.remove('show');
}

function showItemByUrl(frag) {
  var el = document.querySelector('*[data-url="'+frag+'"]');
  if (el && el.classList.contains('small')) {
    hideAll();
    el.style.display = 'block';
    el.classList.remove('small');
    back.classList.add('show');
  }
}

handleHashChange();
