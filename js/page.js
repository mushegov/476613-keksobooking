'use strict';

(function () {
  var state = 'inactive';
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');

  // Переводим страницу в активный режим
  var setPageStateActive = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    state = 'active';

    window.form.switchState('active');

    // Обработчик нажатия на карту
    map.addEventListener('click', window.map.onMapClick);

    // Отрисовываем элемент списка геометок
    window.backend.load(window.pins.render, showError);
  };

  // Переводим страницу в неактивный режим
  var setPageStateInactive = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    state = 'inactive';

    window.form.switchState('inactive');

    // Обработчик нажатия на карту
    map.removeEventListener('click', window.map.onMapClick);

    // Удаляем геометки
    window.pins.hide();

    // Сбрасываем форму фильтра геометок
    window.filter.reset();
  };

  //
  var showError = function (errorText, duration) {
    duration = duration || 5000;
    var errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = errorText;
    document.querySelector('body').appendChild(errorDiv);

    setTimeout(hideError, duration);
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
