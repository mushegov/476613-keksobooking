'use strict';

(function () {
  // Типы обьявлений
  var TYPES = {
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

    // Необязательные элементы
    var descriptionElement = element.querySelector('.popup__description');
    var featuresElement = element.querySelector('.popup__features');
    var photosElement = element.querySelector('.popup__pictures');

    // Обязательные элементы
    element.querySelector('.popup__avatar').src = data.author.avatar;
    element.querySelector('.popup__title').textContent = data.offer.title;
    element.querySelector('.popup__address').textContent = data.offer.address;
    element.querySelector('.popup__price').textContent = data.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = TYPES[data.offer.type];
    element.querySelector('.popup__guests-and-rooms').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    element.querySelector('.popup__checkin-checkout').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    // Проверяем на наличие необязательных полей
    // Описание
    if (data.offer.description.length === 0) {
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

    // Скрываем карточку при нажатии на крестик
    element.querySelector('.popup__close').addEventListener('click', closeCard);

    // Слушаем нажатие на ESC
    document.addEventListener('keydown', onKeypress);

    // Вставляем карточку в DOM
    document.querySelector('.map').insertBefore(element, document.querySelector('.map__filters-container'));

    // Передаем карточку выше
    card = document.querySelector('.map__card');
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
      card.querySelector('.popup__close').removeEventListener('click', closeCard);
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
