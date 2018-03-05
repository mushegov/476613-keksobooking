'use strict';

(function () {
  var DEFAULT_ERROR_SHOW_DURATION = 5000;

  window.state = 'inactive'; // EXPORT
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');


  // При загрузке данных с сервера
  var onDataLoad = function (data) {
    window.filter.switchState('active');
    window.pins.render(data);
  };

  // Переключаем состояние страницы
  var switchPageState = function (state) {
    if (state === 'active') {
      window.state = 'active'; // EXPORT

      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      window.form.switchState(window.state);
      window.backend.load(onDataLoad, showError);

      map.addEventListener('click', window.map.onClick);
    } else {
      window.state = 'inactive'; // EXPORT

      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');
      window.form.switchState(window.state);
      window.filter.switchState(window.state);
      window.pins.hide();
      window.card.hide();
      window.map.reset();

      map.removeEventListener('click', window.map.onClick);

      window.scrollTo(0, 0);
    }
  };

  // Показываем ошибку
  var showError = function (errorText, duration) {
    duration = duration || DEFAULT_ERROR_SHOW_DURATION;
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
