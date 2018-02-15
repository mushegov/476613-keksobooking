'use strict';

(function () {
  // КОНСТАНТЫ
  // Минимальные цены для разных типов жилья
  var MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Заивисимость количества жильцов от количества комнат
  var ROOMS_CAPACITY = {
    '1': [1],
    '2': [2, 1],
    '3': [3, 2, 1],
    '100': [0]
  };

  // Элементы
  var form = document.querySelector('.notice__form');
  var typeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var fieldsets = form.querySelectorAll('fieldset');


  // Вносим позицию главной геометки в поле Адрес
  var setAddress = function (isInitial) {
    form.querySelector('#address').value = window.map.getMainPinCoords(isInitial);
  };

  // Включаем поля формы
  var enableForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = false;
    }
  };

  // Отключаем поля формы
  var disableForm = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].disabled = true;
    }
  };

  // Обработчик
  var onRoomNumberInputChange = function (evt) {
    var value = evt.target.value;
    var capacity = ROOMS_CAPACITY[value];
    var options = capacityInput.querySelectorAll('option');

    // Отключаем все опции
    for (var i = 0; i < options.length; i++) {
      capacityInput.querySelector('.capacity' + i).disabled = true;
      capacityInput.querySelector('.capacity' + i).selected = false;
    }

    // Первое подходящее значение помечаем как выделенное
    capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

    // Включаем только подходящие опции
    for (i = 0; i < capacity.length; i++) {
      capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
    }
  };


  // Слушатели
  //
  typeInput.addEventListener('change', function (evt) {
    var value = MIN_PRICES[evt.target.value];

    priceInput.setAttribute('min', value);
    priceInput.setAttribute('placeholder', value);
  });

  //
  timeInInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    timeOutInput.value = value;
  });

  //
  timeOutInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    timeInInput.value = value;
  });

  //
  roomNumberInput.addEventListener('change', onRoomNumberInputChange);

  //
  form.addEventListener('reset', function () {
    window.page.setStateInactive();
  });


  // EXPORT
  window.form = {
    setAddress: setAddress,
    enable: enableForm,
    disable: disableForm
  };
})();
