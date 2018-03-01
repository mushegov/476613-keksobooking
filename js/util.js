'use strict';

(function () {
  // Шаблоны
  var TEMPLATES = document.querySelector('template');
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  // Очиащаем элемент
  var deleteNodeChildren = function (element) {
    var parent = element.parentNode;
    var newElement = element.cloneNode();

    parent.replaceChild(newElement, element);

    return newElement;
  };

  // Устраняем эффект "дребезга"
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };


  // EXPORT
  window.util = {
    templates: {
      pin: TEMPLATES.content.querySelector('.map__pin'),
      card: TEMPLATES.content.querySelector('.map__card')
    },
    deleteNodeChildren: deleteNodeChildren,
    debounce: debounce
  };
})();
