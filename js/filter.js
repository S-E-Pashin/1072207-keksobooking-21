'use strict';
(function () {
  var selectHousingType = document.getElementById('housing-type');
  var pinsFilter = function (data) { /* Фильтр В нем произойден фильтрация от поля выбора комнаты. В data будут находиться данные с сервера/Данные об объектах для отображения - xhr.response */

    window.pin.renderPinCards(data);
    selectHousingType.addEventListener('input', function () {
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
      window.pin.renderPinCards(newData);
      // console.log('new');
      // console.log(newData);
      // console.log('old');
      console.log(data);
    });
  };
  // console.log(selectHousingType.value);
  window.filter = {/* Экспорт данных в область общей видимости. */
    pins: pinsFilter
  };
})();
