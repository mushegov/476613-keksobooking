'use strict';

(function () {
  // Типы обьявлений
  var TYPES = {
    'flat': 'Квартира',
    'house': 'Бунгало',
    'bungalo': 'Дом',
    'palace': 'Дворец'
  };

  var PHOTO_HEIGHT = 30;
  var ESC_KEYCODE = 27;


  // Отрисовываем элемент карточку предложени
  var renderCard = function (data) {
    // Удаляем предыдущую карточку
    closeCard();

    // Создаем шаблон
    var template = window.util.templates.card;

    // Создаем элемент из шаблона
    var element = template.cloneNode(true);

    // Записываем данные
    element.querySelector('.popup__avatar').src = data.author.avatar;
    element.querySelector('.popup__title').textContent = data.offer.title;
    element.querySelector('.popup__address').textContent = data.offer.address;
    element.querySelector('.popup__price').textContent = data.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = TYPES[data.offer.type];
    element.querySelector('.popup__guests-and-rooms').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    element.querySelector('.popup__checkin-checkout').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    element.querySelector('.popup__description').textContent = data.offer.description;

    // Отрисовываем удобства
    if (data.offer.features.length === 0) {
      element.querySelector('.popup__features').remove();
    } else {
      window.util.deleteNodeChildren(element.querySelector('.popup__features'));

      data.offer.features.forEach(function (feature) {
        var featuresItem = document.createElement('li');
        featuresItem.classList.add('feature', 'feature--' + feature);
        element.querySelector('.popup__features').appendChild(featuresItem);
      });
    }

    // Отрисовываем фото
    if (data.offer.photos.length === 0) {
      element.querySelector('.popup__pictures').remove();
    } else {
      window.util.deleteNodeChildren(element.querySelector('.popup__pictures'));

      data.offer.photos.forEach(function (photo) {
        var photoItem = document.createElement('li');
        var image = document.createElement('img');

        image.src = photo;
        image.height = PHOTO_HEIGHT;

        photoItem.appendChild(image);
        element.querySelector('.popup__pictures').appendChild(photoItem);
      });
    }

    // Слушаем нажатие на крестик
    element.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);

    // Скрываем карточку через клавиатуру
    document.addEventListener('keydown', onKeypress);

    // Вставляем готовый фрагмент в DOM
    document.querySelector('.map').insertBefore(element, document.querySelector('.map__filters-container'));
  };

  //
  var onPopupCloseClick = function () {
    closeCard();
  };

  //
  var onKeypress = function (evt) {
    if (document.querySelector('.map__card') && evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  //
  var closeCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card .popup__close').removeEventListener('click', onPopupCloseClick);
      document.removeEventListener('keydown', onKeypress);
      document.querySelector('.map__card').remove();
    }
  };


  // EXPORT
  window.card = {
    render: renderCard,
    hide: closeCard
  };
})();
