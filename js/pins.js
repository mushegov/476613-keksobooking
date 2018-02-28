'use strict';

(function () {
  // Смещение геометки по оси Y
  var PIN_OFFSET = 35;

  // Максимальное количество геометок на карте
  var MAX_PINS = 5;


  // Генерируем разметку геометки
  var renderPins = function (array) {
    var template = window.util.templates.pin;

    var fragment = document.createDocumentFragment();

    var pinsArray = [];

    // Генерируем элемент для каждого объявления и добавляем его во фрагмент
    array.forEach(function (pin, i) {
      var element = template.cloneNode(true);

      element.style.display = 'none';
      element.style.left = pin.location.x + 'px';
      element.style.top = pin.location.y - PIN_OFFSET + 'px';
      element.querySelector('img').src = pin.author.avatar;
      element.setAttribute('data-pin', i);
      element.setAttribute('id', 'pin' + i);

      fragment.appendChild(element);

      array[i].id = i;
      pinsArray.push(i);
    });

    document.querySelector('.map__pins').appendChild(fragment);

    showPins(pinsArray);
  };

  // Показываем геометки
  var showPins = function (array) {
    hidePins();

    array.forEach(function (id, i) {
      if (i < MAX_PINS) {
        document.querySelector('#pin' + id).style.display = 'block';
      }
    });
  };

  // Скрываем геометки
  var hidePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.style.display = 'none';
    });
  };


  // EXPORT
  window.pins = {
    render: renderPins,
    show: showPins,
    hide: hidePins
  };
})();
