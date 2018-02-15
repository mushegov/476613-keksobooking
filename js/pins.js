'use strict';

(function () {
  // Смещение геометки по оси Y
  var PIN_OFFSET = 35;

  var renderMapPins = function (array) {
    var template = window.util.templates.pin;

    var fragment = document.createDocumentFragment();

    // Генерируем элемент для каждого объявления и добавляем его во фрагмент
    for (var i = 0; i < array.length; i++) {
      var element = template.cloneNode(true);

      element.style.left = array[i].location.x + 'px';
      element.style.top = array[i].location.y - PIN_OFFSET + 'px';
      element.querySelector('img').src = array[i].author.avatar;
      element.setAttribute('data-pin', i);

      fragment.appendChild(element);
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var hideMapPins = function () {

  };


  // EXPORT
  window.pins = {
    render: renderMapPins,
    hide: hideMapPins
  };
})();
