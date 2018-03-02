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
    map.addEventListener('click', window.map.onMapClick);
    window.backend.load(window.pins.render, showError);
  };

  // Переводим страницу в неактивный режим
  var setPageStateInactive = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    state = 'inactive';

    window.form.switchState('inactive');
    map.removeEventListener('click', window.map.onMapClick);
    window.pins.hide();
    window.card.hide();
    window.map.reset();
    window.filter.state('inactive');
  };

  // Показываем ошибку
  var showError = function (errorText, duration) {
    duration = duration || 5000;
    var errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = errorText;
    document.querySelector('body').appendChild(errorDiv);

    setTimeout(hideError, duration);
  };

  // Скрываем ошибку
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
