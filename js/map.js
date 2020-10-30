/* eslint-disable no-var */
'use strict';

(function () {
  var map = document.querySelector('.map');
  map.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */

  var removeAttributeDisabled = function (liveCollection) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
    for (var i = 0; i < liveCollection.length; i++) { /* Цикл для удаления  атрибута к полям */
      liveCollection[i].removeAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    }
    return liveCollection;
  };

  var setAttributeDisabled = function (liveCollection) {
    for (var i = 0; i < liveCollection.length; i++) {
      liveCollection[i].setAttribute('disabled', 'true');
    }
    return liveCollection;
  };

  window.map = {
    removeAttributeDisabled: removeAttributeDisabled,
    setAttributeDisabled: setAttributeDisabled
  };
})();
