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

  // Форма и поля
  var form = document.querySelector('.notice__form');
  var typeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');


  // Обработчик
  var onRoomNumberInputChange = function (evt) {
    var value = evt.target.value;
    var capacity = ROOMS_CAPACITY[value];
    var options = capacityInput.querySelectorAll('option');

    for (var i = 0; i < options.length; i++) {
      capacityInput.querySelector('.capacity' + i).disabled = true;
      capacityInput.querySelector('.capacity' + i).selected = false;
    }

    capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

    for (i = 0; i < capacity.length; i++) {
      capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
    }
  };


  // Слушатели
  typeInput.addEventListener('change', function (evt) {
    var value = evt.target.value;

    priceInput.setAttribute('min', MIN_PRICES[value]);
    priceInput.setAttribute('placeholder', MIN_PRICES[value]);
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

})();
