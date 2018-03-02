'use strict';

(function () {
  // Типы обьявлений
  var Types = {
    'flat': 'Квартира',
    'house': 'Бунгало',
    'bungalo': 'Дом',
    'palace': 'Дворец'
  };

  // Размер фото
  var PHOTO_HEIGHT = 30;

  // Код ESC
  var ESC_KEYCODE = 27;

  // Сюда запишем элемент карточки
  var card;


  // Отрисовываем элемент карточку предложени
  var renderCard = function (data) {
    // Удаляем предыдущую карточку
    closeCard();

    // Создаем шаблон
    var template = window.util.templates.card;
    var element = template.cloneNode(true);

    //
    var avatarElement = element.querySelector('.popup__avatar');
    var titleElement = element.querySelector('.popup__title');
    var addressElement = element.querySelector('.popup__address');
    var priceElement = element.querySelector('.popup__price');
    var typeElement = element.querySelector('.popup__type');
    var guestsAndRoomsElement = element.querySelector('.popup__guests-and-rooms');
    var checkinCheckoutElement = element.querySelector('.popup__checkin-checkout');
    var descriptionElement = element.querySelector('.popup__description');
    var featuresElement = element.querySelector('.popup__features');
    var photosElement = element.querySelector('.popup__pictures');

    //
    if (data.author.avatar === '') {
      avatarElement.remove();
    } else {
      avatarElement.src = data.author.avatar;
    }

    //
    if (data.offer.title === '') {
      titleElement.remove();
    } else {
      titleElement.textContent = data.offer.title;
    }

    //
    if (data.offer.address === '') {
      addressElement.remove();
    } else {
      addressElement.textContent = data.offer.address;
    }

    //
    if (data.offer.price === '') {
      priceElement.remove();
    } else {
      priceElement.textContent = data.offer.price + '₽/ночь';
    }

    //
    if (data.offer.price === '') {
      typeElement.remove();
    } else {
      typeElement.textContent = Types[data.offer.type];
    }

    //
    if (data.offer.rooms === '' || data.offer.guests === '') {
      guestsAndRoomsElement.remove();
    } else {
      guestsAndRoomsElement.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    }

    //
    if (data.offer.checkin === '' || data.offer.checkout === '') {
      checkinCheckoutElement.remove();
    } else {
      checkinCheckoutElement.textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    }

    //
    if (data.offer.description === '') {
      descriptionElement.remove();
    } else {
      descriptionElement.textContent = data.offer.description;
    }

    // Удобства
    if (data.offer.features.length === 0) {
      featuresElement.remove();
    } else {
      // Очищаем элемент
      featuresElement = window.util.deleteNodeChildren(featuresElement);

      data.offer.features.forEach(function (feature) {
        var featuresItem = document.createElement('li');
        featuresItem.classList.add('feature', 'feature--' + feature);
        featuresElement.appendChild(featuresItem);
      });
    }

    // Фото
    if (data.offer.photos.length === 0) {
      photosElement.remove();
    } else {
      // Очищаем элемент
      photosElement = window.util.deleteNodeChildren(photosElement);

      data.offer.photos.forEach(function (photo) {
        var photoItem = document.createElement('li');
        var image = document.createElement('img');

        image.src = photo;
        image.height = PHOTO_HEIGHT;

        photoItem.appendChild(image);
        photosElement.appendChild(photoItem);
      });
    }

    // Слушаем нажатие на крестик
    element.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);

    // Слушаем нажатие на ESC
    document.addEventListener('keydown', onKeypress);

    // Вставляем карточку в DOM
    document.querySelector('.map').insertBefore(element, document.querySelector('.map__filters-container'));

    // Передаем карточку выше
    card = document.querySelector('.map__card');
  };

  // Скрываем карточку при нажатии на крестик
  var onPopupCloseClick = function () {
    closeCard();
  };

  // Скрываем карточку при нажатии ESC
  var onKeypress = function (evt) {
    if (card && evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  // Закрывам карточку
  var closeCard = function () {
    if (card) {
      card.querySelector('.popup__close').removeEventListener('click', onPopupCloseClick);
      document.removeEventListener('keydown', onKeypress);
      card.remove();
    }
  };


  // EXPORT
  window.card = {
    render: renderCard,
    hide: closeCard
  };
})();
