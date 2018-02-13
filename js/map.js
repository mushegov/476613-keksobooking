'use strict';

(function () {
  // Смещение по оси Y для рендера геометки
  var MAIN_PIN_OFFSET = 50;

  // Элементы
  var mainPin = document.querySelector('.map__pin--main');


  // Получаем координаты главной геометки
  var getMainPinCoords = function (isInitial) {
    var x = mainPin.offsetLeft;
    var y = isInitial ? mainPin.offsetTop : mainPin.offsetTop + MAIN_PIN_OFFSET;

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
      window.card(window.data[id]);
    }
  };

  //
  var onMainPinMouseUp = function () {
    // Переводим страницу в активный режим, если он неактивный
    if (!document.querySelector('body').classList.contains('active')) {
      window.util.setPageStateActive();
    }

    // Устанавливаем новый адрес
    window.form.setAddress(false);
  };


  // Слушатели
  mainPin.addEventListener('mouseup', onMainPinMouseUp);


  // EXPORT
  window.map = {
    getMainPinCoords: getMainPinCoords,
    onMapClick: onMapClick
  };
})();
