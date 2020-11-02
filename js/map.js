/* eslint-disable no-var */
'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */

  var removeAttributeDisabled = function (data) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
    for (var i = 0; i < data.length; i++) { /* Цикл для удаления  атрибута к полям */
      data[i].removeAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    }
    return data;
  };

  var setAttributeDisabled = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].setAttribute('disabled', 'true');
    }
    return data;
  };

  window.map = {
    section: mapSection,
    removeAttributeDisabled: removeAttributeDisabled,
    setAttributeDisabled: setAttributeDisabled
  };
})();
