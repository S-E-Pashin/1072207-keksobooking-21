/* eslint-disable no-var */
'use strict';
(function () {
  var selectHousingType = document.getElementById('housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var mapFilters = document.querySelector('.map__filters');

  var cards = [];


  var pinsFilter = function (data) { /* Фильтр В нем произойден фильтрация от поля выбора комнаты. В data будут находиться данные с сервера/Данные об объектах для отображения - xhr.response */
    window.pin.renderPinCards(data);
    window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    var onSelectFilter = function () {
      cards = [];
      var valueHousingType = selectHousingType.value;
      var newDataType = [];
      if (valueHousingType === 'any') {
        newDataType = data;
      } else {
        newDataType = [];
        data.forEach(function (i) {
          if (valueHousingType === i.offer.type) {
            newDataType.push(i);
          }
        });
      }

      var valueHousingPrice = selectHousingPrice.value;
      var newDataPrice = [];
      if (valueHousingPrice === 'any') {
        newDataPrice = [];
        newDataPrice = newDataType;
      } else if (valueHousingPrice === 'middle') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price >= 10000 && i.offer.price <= 50000) {
            newDataPrice.push(i);
          }
        });
      } else if (valueHousingPrice === 'low') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price < 10000) {
            newDataPrice.push(i);
          }
        });
      } else if (valueHousingPrice === 'high') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price > 50000) {
            newDataPrice.push(i);
          }
        });
      }

      var valueHousingRooms = document.querySelector('#housing-rooms').value;
      var newDataRooms = [];
      if (valueHousingRooms === 'any') {
        newDataRooms = newDataPrice;
      } else {
        newDataPrice.forEach(function (i) {
          if (valueHousingRooms === String(i.offer.rooms)) {
            newDataRooms.push(i);
          }
        });
      }

      var valueHousingGuests = document.querySelector('#housing-guests').value;
      var newDataGuests = [];
      if (valueHousingGuests === 'any') {
        newDataGuests = newDataRooms;
      } else {
        newDataRooms.forEach(function (i) {
          if (valueHousingGuests === String(i.offer.guests)) {
            newDataGuests.push(i);
          }
        });
      }

      cards = newDataGuests;
      window.pin.renderPinCards(cards);
    };
    mapFilters.addEventListener('input', onSelectFilter);
  };
  /* TODO как удалить слушатель mapFilters.addEventListener('input', onSelectFilter); ? У меня теряются данные если выносить функцию а как перенести ее в глобальную область видимости я не понимаю. */
  // mapFilters.removeEventListener('input', onSelectFilter);

  window.filter = {/* Экспорт данных в область общей видимости. */
    pins: pinsFilter
  };
})();
