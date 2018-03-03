'use strict';

(function () {
  window.state = 'inactive'; // EXPORT
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');


  // Переключаем состояние страницы
  var switchPageState = function (state) {
    if (state === 'active') {
      window.state = 'active'; // EXPORT

      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      window.form.switchState(window.state);
      window.backend.load(window.pins.render, showError);

      map.addEventListener('click', window.map.onMapClick);
    } else {
      window.state = 'inactive'; // EXPORT

      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');
      window.form.switchState(window.state);
      window.filter.switchState(window.state);
      window.pins.hide();
      window.card.hide();
      window.map.reset();

      map.removeEventListener('click', window.map.onMapClick);

      window.scrollTo(0, 0);
    }
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
    switchState: switchPageState,
    showError: showError
  };
})();
