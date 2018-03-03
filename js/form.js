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
  var setAddress = function (coords) {
    form.querySelector('#address').value = '{{' + coords.x + '}}, {{' + coords.y + '}}';
  };
  // Устанавливаем первоначальные координаты
  setAddress(window.map.mainPinInitialCoords);

  // Переключаем состояние формы
  var switchFormState = function (state) {
    var isDisabled = false;

    if (state !== 'active') {
      isDisabled = true;
      form.reset();
      setAddress(window.map.mainPinInitialCoords);
    }

    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = isDisabled;
    });
  };

  // Обработчики
  //
  var onRoomNumberInputChange = function (evt) {
    var capacity = ROOMS_CAPACITY[evt.target.value];
    var options = capacityInput.querySelectorAll('option');

    // Отключаем все опции
    options.forEach(function (item, i) {
      capacityInput.querySelector('.capacity' + i).disabled = true;
      capacityInput.querySelector('.capacity' + i).selected = false;
    });

    // Первое подходящее значение помечаем как выделенное
    capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

    // Включаем только подходящие опции
    capacity.forEach(function (item, i) {
      capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
    });
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
    window.page.state('inactive');
  });

  //
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(form);

    window.backend.send(data, window.page.state('inactive'), window.page.showError);
  });


  // EXPORT
  window.form = {
    setAddress: setAddress,
    state: switchFormState
  };
})();
