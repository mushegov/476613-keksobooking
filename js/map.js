'use strict';

(function () {
  // Отступ геометки сверху и снизу от блока
  var MAIN_PIN_MIN_Y = 150;
  var MAIN_PIN_MAX_Y = 500;

  // Отступ геометки слева и справа от блока
  var MAIN_PIN_OFFSET_X = 50;

  // Смещение по оси Y для рендера геометки
  var MAIN_PIN_OFFSET_Y = 50;

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinInitialCoords;


  // Получаем координаты главной геометки
  var getMainPinCoords = function () {
    var coords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop + MAIN_PIN_OFFSET_Y
    };

    return coords;
  };
  mainPinInitialCoords = getMainPinCoords();

  // Устанавливаем главной метке изначальные координаты
  var resetMap = function () {
    mainPin.style.top = mainPinInitialCoords.y - MAIN_PIN_OFFSET_Y + 'px';
    mainPin.style.left = mainPinInitialCoords.x + 'px';
  };

  // Слушаем нажатия на геометки
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

  // Драг-н-дроп для главной геометки
  var onMainPinMouseDown = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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

    var onMouseUp = function () {
      // Переводим страницу в активный режим, если он неактивный
      if (window.state === 'inactive') {
        window.page.switchState('active');
      }

      // Устанавливаем новый адрес
      window.form.setAddress(getMainPinCoords());

      // Отключаем слушатели
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
    mainPinInitialCoords: mainPinInitialCoords,
    getMainPinCoords: getMainPinCoords,
    onClick: onMapClick,
    reset: resetMap
  };
})();
