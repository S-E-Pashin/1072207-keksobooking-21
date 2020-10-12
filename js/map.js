/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var map = document.querySelector('.map');
  // НЕАКТИВНОЕ СОСТОЯНИЕ:
  map.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */
  // АКТИВНОЕ СОСТОЯНИЕ
  var removeAttributeDisabled = function (liveCollection) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
    for (var i = 0; i < liveCollection.length; i++) { /* Цикл для удаления  атрибута к полям */
      liveCollection[i].removeAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    }
    return liveCollection;
  };

  /* Почему не работает? */
  /*   var addAttributeDisabled = function (liveCollection) {
    liveCollection.forEach(function (value) {
      value.setAttribute('disabled', 'disabled');
    });
    return liveCollection;
  }; */


  var setAttributeDisabled = function (liveCollection) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
    for (var i = 0; i < liveCollection.length; i++) { /* Цикл для удаления  атрибута к полям */
      liveCollection[i].setAttribute('disabled', 'disabled'); /* Поочередное удаление атрибута к каждому филдсету полей. */
    }
    return liveCollection;
  };

  window.map = {
    removeAttributeDisabled: removeAttributeDisabled,
    // addAttributeDisabled: addAttributeDisabled,
    setAttributeDisabled: setAttributeDisabled
  };
})();
