'use strict';
(function () {
  // Количество объявлений
  var ADVERTS_AMOUNT = 8;

  // Аватары
  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  // Заголовки объявления
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  // Минимальная и максимальная цена аренды
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  // Типы обьявлений
  var TYPES = {
    'flat': 'Квартира',
    'house': 'Бунгало',
    'bungalo': 'Дом'
  };

  // Минимальное и максимальное количество комнат
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;

  // Варианты времени чекина и чекаута
  var CHECKIN_CHECKOUT_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  // Удобства
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  // Фото
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // Минимальные и максимальные координаты геометок
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;


  // Создаем массив случайных объявлений
  var generateRandomAdverts = function (amount) {
    var array = [];

    for (var i = 0; i < amount; i++) {
      var location = {
        'x': window.util.getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX),
        'y': window.util.getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX)
      };

      var advert = {
        'author': {
          'avatar': window.util.getRandomArrayElement(AVATARS, true)
        },
        'offer': {
          'title': window.util.getRandomArrayElement(TITLES, true),
          'address': '{{' + location.x + '}}, {{' + location.y + '}}',
          'price': window.util.getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
          'type': window.util.getRandomProperty(TYPES),
          'rooms': window.util.getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
          'guests': window.util.getRandomIntInclusive(1, 15),
          'checkin': window.util.getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
          'checkout': window.util.getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
          'features': window.util.getRandomArrayElements(window.util.shuffleArray(FEATURES), window.util.getRandomIntInclusive(0, FEATURES.length), true),
          'description': '',
          'photos': window.util.shuffleArray(PHOTOS)
        },
        'location': location
      };

      array.push(advert);
    }

    return array;
  };

  // EXPORT
  window.data = generateRandomAdverts(ADVERTS_AMOUNT);
})();
