'use strict';

(function () {
  //
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var form = document.querySelector('.map__filters');

  //
  var filterByNumber = function (formData, filteredData, attribute) {
    if (formData.get('housing-' + attribute) !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer[attribute] === parseInt(formData.get('housing-' + attribute), 10);
      });
    }

    return filteredData;
  };

  //
  var filterData = function () {
    var filteredData = window.backend.data;
    var formData = new FormData(form);
    var features = [];

    //
    form.querySelectorAll('.map__filter-set input:checked').forEach(function (checkbox) {
      features.push(checkbox.value);
    });

    //
    if (formData.get('housing-type') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.type === formData.get('housing-type');
      });
    }

    //
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

    filteredData = filterByNumber(formData, filteredData, 'rooms');
    filteredData = filterByNumber(formData, filteredData, 'guests');

    //
    if (features.length > 0) {
      features.forEach(function (feature) {
        filteredData = filteredData.filter(function (pin) {
          return pin.offer.features.includes(feature);
        });
      });
    }

    return filteredData;
  };

  //
  form.addEventListener('change', function () {
    var filteredData = filterData();
    var filteredPinsId = [];

    filteredData.forEach(function (pin) {
      filteredPinsId.push(pin.id);
    });

    window.pins.show(filteredPinsId);

    if (!filteredPinsId.length) {
      window.page.showError('Нет подходящих объявлений. Измените фильтр.', 2500);
    }
  });

  //
  var reset = function () {
    form.reset();
  };


  // EXPORT
  window.filter = {
    reset: reset
  };
})();
