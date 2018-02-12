'use strict';

(function () {
  // Смещение по оси Y для рендера геометки
  var PIN_OFFSET = 35;
  var MAIN_PIN_OFFSET = 50;

  var body = document.querySelector('body');
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var mainPin = document.querySelector('.map__pin--main');

  // Переводим страницу в активный режим
  var setPageStateActive = function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    body.classList.add('active');

    var fieldsets = form.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }

    // Обработчик нажатия на карту
    map.addEventListener('click', onMapClick);

    // Отрисовываем элемент списка геометок
    renderMapPins(adverts);
  };

  // Получаем координаты главной геометки
  var getMainPinCoords = function (isInitial) {
    var x = mainPin.offsetLeft;
    var y = isInitial ? mainPin.offsetTop : mainPin.offsetTop + MAIN_PIN_OFFSET;

    return '{{' + x + '}}, {{' + y + '}}';
  };

  // Вносим позицию главной геометки в поле Адрес
  var setAddress = function (isInitial) {
    form.querySelector('#address').value = getMainPinCoords(isInitial);
  };

  // Обработчик нажатия на главную геометку
  var onMainPinMouseUp = function () {
    // Переводим страницу в активный режим, если он неактивный
    if (!body.classList.contains('active')) {
      setPageStateActive();
    }

    // Устанавливаем новый адрес
    setAddress(false);
  };

  // Обработчик нажатия на карту
  var onMapClick = function (evt) {
    var target = evt.target;
    var id;

    if (target.parentNode.className === 'map__pin') {
      id = target.offsetParent.getAttribute('data-pin');
    }

    if (target.className === 'map__pin') {
      id = target.getAttribute('data-pin');
    }

    if (id) {
      renderAdvertCard(adverts[id]);
    }
  };

  // Задаем первоначальный адрес
  setAddress(true);

  // Генерируем массив случайных объявлений
  var adverts = generateRandomAdverts(ADVERTS_AMOUNT);

  // Переводим страницу в активный режим при клике на главной геометке
  mainPin.addEventListener('mouseup', onMainPinMouseUp);

})();
