'use strict';

(function () {
  // Состояние страницы
  var state = 'inactive';

  // Переводим страницу в активный режим
  var setPageStateActive = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    state = 'active';

    window.form.enable();

    // Обработчик нажатия на карту
    document.querySelector('.map').addEventListener('click', window.map.onMapClick);

    // Отрисовываем элемент списка геометок
    window.pins.render(window.data);
  };

  // Переводим страницу в неактивный режим
  var setPageStateInactive = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.notice__form').classList.add('notice__form--disabled');
    state = 'inactive';

    window.form.disable();

    // Обработчик нажатия на карту
    document.querySelector('.map').removeEventListener('click', window.map.onMapClick);

    // Отрисовываем элемент списка геометок
    window.pins.hide();
  };


  // EXPORT
  window.page = {
    state: state,
    setStateActive: setPageStateActive,
    setStateInactive: setPageStateInactive
  };
})();
