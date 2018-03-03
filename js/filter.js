'use strict';

(function () {
  // Ранжирование цен
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var form = document.querySelector('.map__filters');
  var formElements = form.querySelectorAll('.map__filter, .map__filter-set');


  // Переключаем состояние формы
  var switchFormState = function (state) {
    var value = false;

    if (state !== 'active') {
      value = true;
      form.reset();
    }

    formElements.forEach(function (element) {
      element.disabled = value;
    });
  };

  // Фильтруем по числу
  var filterByNumber = function (formData, filteredData, attr) {
    var value = formData.get('housing-' + attr);

    if (value !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer[attr] === parseInt(value, 10);
      });
    }

    return filteredData;
  };

  // Фильтруем данные
  var filterData = function () {
    var filteredData = window.backend.data;
    var formData = new FormData(form);
    var features = [];

    // Собираем массив выбраных удобств
    form.querySelectorAll('.map__filter-set input:checked').forEach(function (checkbox) {
      features.push(checkbox.value);
    });

    // Фильтруем по типу
    if (formData.get('housing-type') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.type === formData.get('housing-type');
      });
    }

    // Фильтруем по цене
    if (formData.get('housing-price') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        var price = 'middle';

        if (pin.offer.price < LOW_PRICE) {
          price = 'low';
        } else if (pin.offer.price > HIGH_PRICE) {
          price = 'high';
        }

        return price === formData.get('housing-price');
      });
    }

    // Фильтруем по количеству комнат
    filteredData = filterByNumber(formData, filteredData, 'rooms');

    // Фильтруем по количеству гостей
    filteredData = filterByNumber(formData, filteredData, 'guests');

    // Фильтруем по удобствам
    if (features.length > 0) {
      features.forEach(function (feature) {
        filteredData = filteredData.filter(function (pin) {
          return pin.offer.features.includes(feature);
        });
      });
    }

    return filteredData;
  };

  // Слушаем изменение формы
  form.addEventListener('change', function () {
    var filteredData = filterData();
    var filteredPinsId = [];

    // Собираем айдишники отфильтрованных объявлений
    filteredData.forEach(function (pin) {
      filteredPinsId.push(pin.id);
    });

    // Показываем геометки отфильтрованных объявлений
    window.pins.show(filteredPinsId);

    // Прячем карточку объявления
    window.card.hide();

    // Если фильтр не дал результата показываем ошибку
    if (!filteredPinsId.length) {
      window.page.showError('Нет подходящих объявлений. Измените фильтр.', 2500);
    }
  });


  // EXPORT
  window.filter = {
    switchState: switchFormState
  };
})();
