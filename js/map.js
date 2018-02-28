'use strict';

(function () {
  // Отступ геометки сверху и снизу от блока
  var MAIN_PIN_MIN_Y = 150;
  var MAIN_PIN_MAX_Y = 500;

  // Отступ геометки слева и справа от блока
  var MAIN_PIN_OFFSET_X = 50;

  // Смещение по оси Y для рендера геометки
  var MAIN_PIN_OFFSET_Y = 50;

  // Элементы
  var mainPin = document.querySelector('.map__pin--main');


  // Получаем координаты главной геометки
  var getMainPinCoords = function (isInitial) {
    var x = mainPin.offsetLeft;
    var y = isInitial ? mainPin.offsetTop : mainPin.offsetTop + MAIN_PIN_OFFSET_Y;

    return '{{' + x + '}}, {{' + y + '}}';
  };

  //
  var onMapClick = function (evt) {
    var target = evt.target;
    var id;

    if (target.parentNode.className === 'map__pin') {
      target = evt.target.parentNode;
    }

    id = target.getAttribute('data-pin');

    if (id) {
      window.card.render(window.backend.data[id]);
    }
  };

  // Проверяем не заходит ли геометка за рамки
  var checkCoords = function (coords) {
    var minX = MAIN_PIN_OFFSET_X;
    var maxX = document.querySelector('.map').offsetWidth - MAIN_PIN_OFFSET_X;
    var minY = MAIN_PIN_MIN_Y - MAIN_PIN_OFFSET_Y;
    var maxY = MAIN_PIN_MAX_Y - MAIN_PIN_OFFSET_Y;

    if (coords.x < minX) {
      coords.x = minX;
    }

    if (coords.x > maxX) {
      coords.x = maxX;
    }

    if (coords.y < minY) {
      coords.y = minY;
    }

    if (coords.y > maxY) {
      coords.y = maxY;
    }

    return coords;
  };

  //
  var onMainPinMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    //
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      // Проверяем не заходит ли геометка за рамки
      newCoords = checkCoords(newCoords);

      mainPin.style.top = (newCoords.y) + 'px';
      mainPin.style.left = (newCoords.x) + 'px';
    };

    //
    var onMouseUp = function () {
      // Переводим страницу в активный режим, если он неактивный
      if (window.page.state === 'inactive') {
        window.page.setStateActive();
      }

      // Устанавливаем новый адрес
      window.form.setAddress(false);

      //
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  // Слушатели
  mainPin.addEventListener('mousedown', onMainPinMouseDown);


  // EXPORT
  window.map = {
    getMainPinCoords: getMainPinCoords,
    onMapClick: onMapClick
  };
})();
