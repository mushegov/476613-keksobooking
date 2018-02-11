'use strict';

var FORM = document.querySelector('.notice__form');
var TYPE_INPUT = FORM.querySelector('#type');
var PRICE_INPUT = FORM.querySelector('#price');
var TIMEIN_INPUT = FORM.querySelector('#timein');
var TIMEOUT_INPUT = FORM.querySelector('#timeout');
var ROOM_NUMBER_INPUT = FORM.querySelector('#room_number');
var CAPACITY_INPUT = FORM.querySelector('#capacity');

var MIN_PRICES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var ROOMS_CAPACITY = {
  '1': [1],
  '2': [2, 1],
  '3': [3, 2, 1],
  '100': [0]
};

//
var onRoomNumberInputChange = function (evt) {
  var value = evt.target.value;
  var capacity = ROOMS_CAPACITY[value];
  var options = CAPACITY_INPUT.querySelectorAll('option');

  for (var i = 0; i < options.length; i++) {
    CAPACITY_INPUT.querySelector('.capacity' + i).disabled = true;
    CAPACITY_INPUT.querySelector('.capacity' + i).selected = false;
  }

  CAPACITY_INPUT.querySelector('.capacity' + capacity[0]).selected = true;

  for (i = 0; i < capacity.length; i++) {
    CAPACITY_INPUT.querySelector('.capacity' + capacity[i]).disabled = false;
  }
};


//
TYPE_INPUT.addEventListener('change', function (evt) {
  var value = evt.target.value;

  PRICE_INPUT.setAttribute('min', MIN_PRICES[value]);
  PRICE_INPUT.setAttribute('placeholder', MIN_PRICES[value]);
});

//
TIMEIN_INPUT.addEventListener('change', function (evt) {
  var value = evt.target.value;

  TIMEOUT_INPUT.value = value;
});

//
TIMEOUT_INPUT.addEventListener('change', function (evt) {
  var value = evt.target.value;

  TIMEIN_INPUT.value = value;
});

//
ROOM_NUMBER_INPUT.addEventListener('change', onRoomNumberInputChange);
