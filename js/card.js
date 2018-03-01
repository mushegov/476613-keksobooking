'use strict';

(function () {
  // Типы обьявлений
  var TYPES = {
    'flat': 'Квартира',
    'house': 'Бунгало',
    'bungalo': 'Дом',
    'palace': 'Дворец'
  };


  // Отрисовываем элемент карточку предложени
  var renderCard = function (data) {
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
    // Очищаем элемент
    window.util.deleteNodeChildren(element.querySelector('.popup__features'));

    // Генерируем элементы для каждого удобства
    for (var i = 0; i < data.offer.features.length; i++) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('feature', 'feature--' + data.offer.features[i]);
      element.querySelector('.popup__features').appendChild(featuresItem);
    }

    // Отрисовываем фото
    window.util.deleteNodeChildren(element.querySelector('.popup__pictures'));

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

  // EXPORT
  window.card = {
    render: renderCard
  };
})();
