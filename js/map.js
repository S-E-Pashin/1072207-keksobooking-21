/* eslint-disable no-var */
'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */

  var removeAttributeDisabled = function (data) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
    Array.from(data).forEach(function (value) {
      value.removeAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    });
  };

  var setAttributeDisabled = function (data) {
    Array.from(data).forEach(function (value) {
      value.setAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    });
  };

  window.map = {
    section: mapSection,
    removeAttributeDisabled: removeAttributeDisabled,
    setAttributeDisabled: setAttributeDisabled
  };
})();
