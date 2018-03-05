'use strict';

(function () {
  var TIMEOUT = 10000;
  var CODE_OK = 200;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';


  // Загрузка данных
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
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

    xhr.timeout = TIMEOUT;

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  // Отправка данных
  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
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

    xhr.timeout = TIMEOUT;

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };


  // EXPORT
  window.backend = {
    load: load,
    send: send
  };
})();
