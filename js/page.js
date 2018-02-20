'use strict';

(function () {
  // Состояние страницы
  var state = 'inactive';

  // Переводим страницу в активный режим
  var setPageStateActive = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    state = 'active';

    window.form.switchState('active');

    // Обработчик нажатия на карту
    document.querySelector('.map').addEventListener('click', window.map.onMapClick);

    // Отрисовываем элемент списка геометок
    window.backend.load(window.pins.render, showError);
  };

  // Переводим страницу в неактивный режим
  var setPageStateInactive = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.notice__form').classList.add('notice__form--disabled');
    state = 'inactive';

    window.form.switchState('inactive');

    // Обработчик нажатия на карту
    document.querySelector('.map').removeEventListener('click', window.map.onMapClick);

    // Удаляем геометки
    window.pins.remove();
  };

  //
  var showError = function (error) {
    var errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = error;
    document.querySelector('body').appendChild(errorDiv);

    setTimeout(hideError, 3000);
  };

  //
  var hideError = function () {
    document.querySelector('.error-message').remove();
  };


  // EXPORT
  window.page = {
    state: state,
    setStateActive: setPageStateActive,
    setStateInactive: setPageStateInactive,
    showError: showError
  };
})();
