'use strict';

(function () {
  // Смещение геометки по оси Y
  var PIN_OFFSET = 35;

  // Максимальное количество геометок на карте
  var MAX_PINS = 5;


  // Отрисовываем геометки
  var renderMapPins = function (array) {
    removeMapPins();

    var template = window.util.templates.pin;

    var fragment = document.createDocumentFragment();

    var pinsAmount = array.length < MAX_PINS ? array.length : MAX_PINS;

    // Генерируем элемент для каждого объявления и добавляем его во фрагмент
    for (var i = 0; i < pinsAmount; i++) {
      var element = template.cloneNode(true);

      element.style.left = array[i].location.x + 'px';
      element.style.top = array[i].location.y - PIN_OFFSET + 'px';
      element.querySelector('img').src = array[i].author.avatar;
      element.setAttribute('data-pin', i);

      fragment.appendChild(element);
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  // Убираем геометк
  var removeMapPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };


  // EXPORT
  window.pins = {
    render: renderMapPins,
    remove: removeMapPins
  };
})();
