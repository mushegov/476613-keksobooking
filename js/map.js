'use strict';

// -------------
// КОНСТАНТЫ
// -------------

// Количество объявлений
var ADVERTS_AMOUNT = 8;

//
var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

// Заголовки объявления
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

// Минимальная и максимальная цена аренды
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

// Типы обьявлений
var TYPES = ['flat', 'house', 'bungalo'];

// Минимальное и максимальное количество комнат
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;

// Варианты времени чекина и чекаута
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

// Удобства
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Фото
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Минимальные и максимальные координаты
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 150;
var LOCATION_Y_MAX = 500;

// -------------


// -------------
// ФУНКЦИИ
// -------------

// Генерируем новый массив наполненный случайными неповторяющимися элементами из переданного массива, можно задать нужный размер нового массива
var shuffleArray = function (array, length) {
  // Объявляем новый массив в котором будет перемешанные значение из исходногом массива
  var newArray = [];

  // Копируем исходный массив во временный массив
  var tempArray = array.slice(0);

  // Если передана нужная длинная массива то используем её, иначе проходим весь массив
  var iterationCount = length ? length - 1 : tempArray.length - 1;

  // Цикл
  for (var i = iterationCount; i >= 0; i--) {
    // Генерируем случайный индекс массива
    var randomId = getRandomIntInclusive(0, tempArray.length - 1);

    // Записываем в новый массив случайный элемент из временного массива
    newArray.push(tempArray[randomId]);

    // Удаляем использованный элемент из временного массива
    tempArray.splice(randomId, 1);
  }

  return newArray;
};

// Геренируем случайное целое число из промежутка min-max (включая min-max)
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Геренируем случайное расположение
var getRandomLocation = function () {
  var location = {};

  location.x = getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX);
  location.y = getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX);

  return location;
};

// Выбираем случайный элемент из массива
var getRandomArrayElement = function (array, removeUsedElement) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];

  // Если нужно, можем удалить найденный элемент
  if (removeUsedElement) {
    array.splice(id, 1);
  }

  return element;
};

// Создаем массив случайных объявлений
var generateAdvertsArray = function (amount) {
  var array = [];

  for (var i = 0; i < amount; i++) {
    var advert = generateRandomAdvert();
    array.push(advert);
  }

  return array;
};

// Создаем случайное объявление
var generateRandomAdvert = function () {
  var advert = {};

  advert.avatar = getRandomArrayElement(AVATARS, true);

  advert.location = getRandomLocation();

  advert.offer = {};
  advert.offer.title = getRandomArrayElement(TITLES, true);
  advert.offer.address = '{{' + advert.location.x + '}}, {{' + advert.location.y + '}}';
  advert.offer.price = getRandomIntInclusive(PRICE_MIN, PRICE_MAX);
  advert.offer.type = getRandomArrayElement(TYPES);
  advert.offer.rooms = getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX);
  advert.offer.guests = getRandomIntInclusive(1, 15);
  advert.offer.checkin = getRandomArrayElement(CHECKIN_CHECKOUT_TIME);
  advert.offer.checkout = getRandomArrayElement(CHECKIN_CHECKOUT_TIME);
  advert.offer.features = shuffleArray(FEATURES, getRandomIntInclusive(0, FEATURES.length));
  advert.offer.description = '';
  advert.offer.photos = shuffleArray(PHOTOS);

  return advert;
};

// -------------


// -------------
// Задачи
// -------------

// Массив случайных объявлений
var adverts = generateAdvertsArray(ADVERTS_AMOUNT);

// Показываем карту
document.querySelector('.map').classList.remove('map--faded');
