var back = document.querySelector('#back');
back.addEventListener('click', function (ev) {
    showAll();
    back.classList.remove('show');
});

var boxes = document.querySelectorAll('#boxes .box')
for (var i = 0; i < boxes.length; i++) (function (box) {
  box.addEventListener('click', function (ev) {
    if (box.classList.contains('small')) {
        hideAll();
        box.style.display = 'block';
        box.classList.remove('small');
        back.classList.add('show');
    }
  })
})(boxes[i])

function hideAll () {
  for (var i = 0; i < boxes.length; i++) (function (box) {
    box.style.display = 'none';
  })(boxes[i])
}

function showAll () {
  for (var i = 0; i < boxes.length; i++) (function (box) {
    box.style.display = 'inline-block';
    box.classList.add('small');
  })(boxes[i])
}
