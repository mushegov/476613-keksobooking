'use strict';

(function () {
  // Загрузка данных
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // Получаем данные
        window.backend.data = xhr.response; // EXPORT

        // Передаем данные
        onLoad(window.backend.data);
      } else {
        onError('Ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  // Отправка данных
  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };


  // EXPORT
  window.backend = {
    load: load,
    send: send
  };
})();
