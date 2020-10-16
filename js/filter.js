/* eslint-disable no-var */
'use strict';
(function () {
  var selectHousingType = document.getElementById('housing-type');

  // var onSelectHousingType = function (data) {
  //   // window.pin.renderPinCards(data);
  //   var valueHousingType = selectHousingType.value;
  //   var newData = [];

  //   if (valueHousingType === 'any') {
  //     newData = data;
  //   } else {
  //     data.forEach(function (i) {
  //       if (valueHousingType === i.offer.type) {
  //         newData.push(i);
  //       }
  //     });
  //   }
  //   window.pin.renderPinCards(newData);
  // };

  // var getRemoveSelectHousingType;

  var pinsFilter = function (data) { /* Фильтр В нем произойден фильтрация от поля выбора комнаты. В data будут находиться данные с сервера/Данные об объектах для отображения - xhr.response */

    window.pin.renderPinCards(data);
    // onSelectHousingType(data);
    var onSelectHousingType = function () {
      var valueHousingType = selectHousingType.value;
      var newData = [];

      if (valueHousingType === 'any') {
        newData = data;
      } else {
        data.forEach(function (i) {
          if (valueHousingType === i.offer.type) {
            newData.push(i);
          }
        });
      }
      window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
      window.pin.renderPinCards(newData);
    };

    selectHousingType.addEventListener('input', onSelectHousingType);

    // getRemoveSelectHousingType = selectHousingType.removeEventListener('input', onSelectHousingType);

  };
  // console.log(getRemoveSelectHousingType);


  window.filter = {/* Экспорт данных в область общей видимости. */
    pins: pinsFilter
    // onSelectHousingType: onSelectHousingType
  };
})();
