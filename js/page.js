'use strict';

(function () {
  window.state = 'inactive';
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');

  // Переключаем состояние страницы
  var switchPageState = function (state) {
    switch (state) {
      case 'inactive':
        window.state = 'inactive';

        map.classList.add('map--faded');
        noticeForm.classList.add('notice__form--disabled');
        window.form.state(window.state);
        window.filter.state(window.state);
        window.pins.hide();
        window.card.hide();
        window.map.reset();

        map.removeEventListener('click', window.map.onMapClick);

        window.scrollTo(0, 0);

        break;
      default:
        window.state = 'active';

        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        window.form.state(window.state);
        window.backend.load(window.pins.render, showError);

        map.addEventListener('click', window.map.onMapClick);
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
    state: switchPageState,
    showError: showError
  };
})();
