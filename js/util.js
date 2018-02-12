'use strict';

(function () {
  // Шаблоны
  var TEMPLATES = document.querySelector('template');

  // Генерируем новый массив наполненный случайными неповторяющимися элементами из переданного массива
  var shuffleArray = function (array) {
    // Объявляем новый массив в котором будет перемешанные значение из исходногом массива
    var newArray = [];

    // Копируем исходный массив во временный массив
    var tempArray = array.slice(0);

    // Цикл
    for (var i = tempArray.length - 1; i >= 0; i--) {
      // Генерируем случайный индекс массива
      var randomId = getRandomIntInclusive(0, tempArray.length - 1);

      // Записываем в новый массив случайный элемент из временного массива
      newArray.push(tempArray[randomId]);

      // Удаляем использованный элемент из временного массива
      tempArray.splice(randomId, 1);
    }

    return newArray;
  };

  // Получаем случайный элемент из массива
  var getRandomArrayElement = function (array, removeUsedElement) {
    var id = Math.floor(Math.random() * array.length);
    var element = array[id];

    // Если нужно, можем удалить найденный элемент
    if (removeUsedElement) {
      array.splice(id, 1);
    }

    return element;
  };

  // Получаем несколько случайных элементов из массива
  var getRandomArrayElements = function (array, amount, removeUsedElement) {
    var newArray = [];

    for (var i = 0; i < amount; i++) {
      newArray.push(getRandomArrayElement(array, removeUsedElement));
    }

    return newArray;
  };

  // Геренируем случайное целое число из промежутка min-max (включая min-max)
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Получаем случайный ключ из объекта
  var getRandomProperty = function (obj) {
    var keys = Object.keys(obj);

    return keys[keys.length * Math.random() << 0];
  };

  // Очиащаем элемент
  var deleteNodeChildren = function (element) {
    var parent = element.parentNode;
    var newElement = element.cloneNode();

    parent.replaceChild(newElement, element);

    return newElement;
  };

  // EXPORT
  window.util = {
    templates: TEMPLATES,
    shuffleArray: shuffleArray,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayElements: getRandomArrayElements,
    getRandomProperty: getRandomProperty,
    deleteNodeChildren: deleteNodeChildren
  };
})();
