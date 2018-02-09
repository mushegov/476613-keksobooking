'use strict';

// -------------
// КОНСТАНТЫ
// -------------

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

// Смещение по оси Y для рендера геометки
var PIN_OFFSET = 35;
var MAIN_PIN_OFFSET = 50;

// Шаблоны
var TEMPLATES = document.querySelector('template');

// -------------


// -------------
// ПЕРЕМЕННЫЕ
// -------------

// Количество объявлений
var body = document.querySelector('body');
var map = document.querySelector('.map');
var form = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');

// -------------


// -------------
// ФУНКЦИИ
// -------------

// Генерируем новый массив наполненный случайными неповторяющимися элементами из переданного массива
var shuffleArray = function (array) {
  // Объявляем новый массив в котором будет перемешанные значение из исходногом массива
  var newArray = [];

  // Копируем исходный массив во временный массив
  var tempArray = array.slice(0);

  // Цикл
  for (var i = tempArray.length - 1; i >= 0; i--) {
    // Генерируем случайный индекс массива
    var randomId = getRandomIntInclusive(0, tempArray.length - 1);

    // Записываем в новый массив случайный элемент из временного массива
    newArray.push(tempArray[randomId]);

    // Удаляем использованный элемент из временного массива
    tempArray.splice(randomId, 1);
  }

  return newArray;
};

// Получаем случайный элемент из массива
var getRandomArrayElement = function (array, removeUsedElement) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];

  // Если нужно, можем удалить найденный элемент
  if (removeUsedElement) {
    array.splice(id, 1);
  }

  return element;
};

// Получаем несколько случайных элементов из массива
var getRandomArrayElements = function (array, amount, removeUsedElement) {
  var newArray = [];

  for (var i = 0; i < amount; i++) {
    newArray.push(getRandomArrayElement(array, removeUsedElement));
  }

  return newArray;
};

// Геренируем случайное целое число из промежутка min-max (включая min-max)
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получаем случайный ключ из объекта
var getRandomProperty = function (obj) {
  var keys = Object.keys(obj);

  return keys[keys.length * Math.random() << 0];
};

// Очиащаем элемент
var deleteNodeChildren = function (element) {
  var parent = element.parentNode;
  var newElement = element.cloneNode();

  parent.replaceChild(newElement, element);

  return newElement;
};

// -------------

// Создаем массив случайных объявлений
var generateRandomAdverts = function (amount) {
  var array = [];

  for (var i = 0; i < amount; i++) {
    var location = {
      'x': getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX),
      'y': getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };

    var advert = {
      'author': {
        'avatar': getRandomArrayElement(AVATARS, true)
      },
      'offer': {
        'title': getRandomArrayElement(TITLES, true),
        'address': '{{' + location.x + '}}, {{' + location.y + '}}',
        'price': getRandomIntInclusive(PRICE_MIN, PRICE_MAX),
        'type': getRandomProperty(TYPES),
        'rooms': getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomIntInclusive(1, 15),
        'checkin': getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
        'checkout': getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
        'features': getRandomArrayElements(shuffleArray(FEATURES), getRandomIntInclusive(0, FEATURES.length), true),
        'description': '',
        'photos': shuffleArray(PHOTOS)
      },
      'location': location
    };

    array.push(advert);
  }

  return array;
};

// Отрисовываем геометки
var renderMapPins = function (array) {
  // Создаем шаблон
  var template = TEMPLATES.content.querySelector('.map__pin');

  // Создаем фрагмент
  var fragment = document.createDocumentFragment();

  // Генерируем элемент для каждого объявления и добавляем его во фрагмент
  for (var i = 0; i < array.length; i++) {
    var element = template.cloneNode(true);

    element.style.left = array[i].location.x + 'px';
    element.style.top = array[i].location.y - PIN_OFFSET + 'px';
    element.querySelector('img').src = array[i].author.avatar;
    element.setAttribute('data-pin', i);

    fragment.appendChild(element);
  }

  // Вставляем готовый фрагмент в DOM
  document.querySelector('.map__pins').appendChild(fragment);
};

// Отрисовываем элемент карточку предложени
var renderAdvertCard = function (data) {
  // Создаем шаблон
  var template = TEMPLATES.content.querySelector('.map__card');

  // Создаем элемент из шаблона
  var element = template.cloneNode(true);

  // Записываем данные
  element.querySelector('.popup__avatar').src = data.author.avatar;
  element.querySelector('h3').textContent = data.offer.title;
  element.querySelector('p small').textContent = data.offer.address;
  element.querySelector('.popup__price').textContent = data.offer.price + '₽/ночь';
  element.querySelector('h4').textContent = TYPES[data.offer.type];
  element.querySelector('h4 + p').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  element.querySelector('h4 + p + p').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  element.querySelector('.popup__features + p').textContent = data.offer.description;

  // Отрисовываем удобства
  // Очищаем элемент
  deleteNodeChildren(element.querySelector('.popup__features'));

  // Генерируем элементы для каждого удобства
  for (var i = 0; i < data.offer.features.length; i++) {
    var featuresItem = document.createElement('li');
    featuresItem.classList.add('feature', 'feature--' + data.offer.features[i]);
    element.querySelector('.popup__features').appendChild(featuresItem);
  }

  // Отрисовываем фото
  deleteNodeChildren(element.querySelector('.popup__pictures'));

  // Фото
  for (var j = 0; j < data.offer.photos.length; j++) {
    var photoItem = document.createElement('li');
    var image = document.createElement('img');

    image.src = data.offer.photos[j];
    image.width = 210;

    photoItem.appendChild(image);
    element.querySelector('.popup__pictures').appendChild(photoItem);
  }

  // Вставляем готовый фрагмент в DOM
  document.querySelector('.map').insertBefore(element, document.querySelector('.map__filters-container'));
};

// -------------

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

// -------------


// -------------
// Задачи
// -------------

// Задаем первоначальный адрес
setAddress(true);

// Генерируем массив случайных объявлений
var adverts = generateRandomAdverts(ADVERTS_AMOUNT);

// Переводим страницу в активный режим при клике на главной геометке
mainPin.addEventListener('mouseup', onMainPinMouseUp);
