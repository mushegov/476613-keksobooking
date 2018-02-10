'use strict';

var form = document.querySelector('.notice__form');
var typeInput = form.querySelector('#type');
var priceInput = form.querySelector('#price');
var timeinInput = form.querySelector('#timein');
var timeoutInput = form.querySelector('#timeout');
var roomNumberInput = form.querySelector('#room_number');
var capacityInput = form.querySelector('#capacity');

var minPrices = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var roomsCapacity = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': [0]
};


//
typeInput.addEventListener('change', function (evt) {
  var value = evt.target.value;

  priceInput.setAttribute('min', minPrices[value]);
  priceInput.setAttribute('placeholder', minPrices[value]);
});

//
timeinInput.addEventListener('change', function (evt) {
  var value = evt.target.value;

  timeoutInput.value = value;
});

//
timeoutInput.addEventListener('change', function (evt) {
  var value = evt.target.value;

  timeinInput.value = value;
});

//
roomNumberInput.addEventListener('change', function (evt) {
  var value = evt.target.value;
  var capacity = roomsCapacity[value];
  var options = capacityInput.querySelectorAll('option');

  for (var i = 0; i < options.length; i++) {
    capacityInput.querySelector('.capacity' + i).disabled = true;
    capacityInput.querySelector('.capacity' + i).selected = false;
  }

  capacityInput.querySelector('.capacity' + capacity[0]).selected = true;

  for (i = 0; i < capacity.length; i++) {
    capacityInput.querySelector('.capacity' + capacity[i]).disabled = false;
  }
});
