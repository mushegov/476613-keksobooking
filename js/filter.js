'use strict';

(function () {
  //
  var form = document.querySelector('.map__filters');

  //
  var filterData = function () {
    var filteredData = window.backend.data;
    var formData = new FormData(form);
    var features = [];
    var LOW_PRICE = 10000;
    var HIGH_PRICE = 10000;

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

    //
    if (formData.get('housing-rooms') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.rooms === parseInt(formData.get('housing-rooms'), 10);
      });
    }

    //
    if (formData.get('housing-guests') !== 'any') {
      filteredData = filteredData.filter(function (pin) {
        return pin.offer.guests === parseInt(formData.get('housing-guests'), 10);
      });
    }

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

    window.pins.render(filteredData);

    if (!filteredData.length) {
      window.page.showError('Нет подходящих объявлений. Измените фильтр.', 2500);
    }
  });


  // EXPORT
  window.filter = {
    apply: 'apply',
    reset: 'reset'
  };
})();
