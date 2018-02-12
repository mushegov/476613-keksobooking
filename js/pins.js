'use strict';

(function () {
  // Смещение по оси Y для рендера геометки
  var PIN_OFFSET = 35;

  // Отрисовываем геометки
  var renderMapPins = function (array) {
    // Создаем шаблон
    var template = window.util.templates.pin;

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

  // EXPORT
  window.pins = renderMapPins;
})();
