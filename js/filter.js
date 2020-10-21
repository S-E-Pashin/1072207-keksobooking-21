/* eslint-disable no-var */
// 'use strict';
// (function () {
// var selectHousingType = document.getElementById('housing-type');
// var selectHousingPrice = document.querySelector('#housing-price');
// var mapFilters = document.querySelector('.map__filters');

// var cards = [];


// var pinsFilter = function (data) { /* Фильтр В нем произойден фильтрация от поля выбора комнаты. В data будут находиться данные с сервера/Данные об объектах для отображения - xhr.response */
//   window.pin.renderPinCards(data);
//   window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
//   var onSelectFilter = function () {
//     cards = [];
//     var valueHousingType = selectHousingType.value;
//     var newDataType = [];
//     if (valueHousingType === 'any') {
//       newDataType = data;
//     } else {
//       newDataType = [];
//       data.forEach(function (i) {
//         if (valueHousingType === i.offer.type) {
//           newDataType.push(i);
//         }
//       });
//     }

//     var valueHousingPrice = selectHousingPrice.value;
//     var newDataPrice = [];
//     if (valueHousingPrice === 'any') {
//       newDataPrice = [];
//       newDataPrice = newDataType;
//     } else if (valueHousingPrice === 'middle') {
//       newDataPrice = [];
//       newDataType.forEach(function (i) {
//         if (i.offer.price >= 10000 && i.offer.price <= 50000) {
//           newDataPrice.push(i);
//         }
//       });
//     } else if (valueHousingPrice === 'low') {
//       newDataPrice = [];
//       newDataType.forEach(function (i) {
//         if (i.offer.price < 10000) {
//           newDataPrice.push(i);
//         }
//       });
//     } else if (valueHousingPrice === 'high') {
//       newDataPrice = [];
//       newDataType.forEach(function (i) {
//         if (i.offer.price > 50000) {
//           newDataPrice.push(i);
//         }
//       });
//     }

//     var valueHousingRooms = document.querySelector('#housing-rooms').value;
//     var newDataRooms = [];
//     if (valueHousingRooms === 'any') {
//       newDataRooms = newDataPrice;
//     } else {
//       newDataPrice.forEach(function (i) {
//         if (valueHousingRooms === String(i.offer.rooms)) {
//           newDataRooms.push(i);
//         }
//       });
//     }

//     var valueHousingGuests = document.querySelector('#housing-guests').value;
//     var newDataGuests = [];
//     if (valueHousingGuests === 'any') {
//       newDataGuests = newDataRooms;
//     } else {
//       newDataRooms.forEach(function (i) {
//         if (valueHousingGuests === String(i.offer.guests)) {
//           newDataGuests.push(i);
//         }
//       });
//     }

//     cards = newDataGuests;
//     window.pin.renderPinCards(cards);
//   };
//   mapFilters.addEventListener('input', onSelectFilter);
// };
// /* TODO как удалить слушатель mapFilters.addEventListener('input', onSelectFilter); ? У меня теряются данные если выносить функцию а как перенести ее в глобальную область видимости я не понимаю. */
// // mapFilters.removeEventListener('input', onSelectFilter);

//   window.filter = {/* Экспорт данных в область общей видимости. */
//     pins: pinsFilter
//   };
// })();


'use strict';
(function () {
  var ADS_NUM = 5; /*  */
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var prices = {
    min: 10000,
    max: 50000
  };

  var checkPrice = function (element) {

    // console.log('Впереди выполнение switch case в котором при определенном значении housingPrice.value');
    // console.log(checkPrice);
    switch (housingPrice.value) {
      case 'any':
        console.log(' Выполняется any. checkPrice равен=return true=');
        // console.log(checkPrice);
        return true; /* Если выбрано any возвращается true  */
      case 'low':
        console.log(' Выполняется low. checkPrice равен=return element.offer.price < prices.min=');
        // console.log(checkPrice);
        return (element.offer.price < prices.min);
      case 'middle':
        console.log(' Выполняется middle. checkPrice равен=return element.offer.price > prices.min=');
        // console.log(checkPrice);
        return (element.offer.price > prices.min) && (element.offer.price < prices.max);
      case 'high':
        console.log(' Выполняется high. checkPrice равен=return element.offer.price > prices.max=');
        // console.log(checkPrice);
        return (element.offer.price > prices.max);
      default:
        console.log(' Выполняется default. checkPrice равен=return element === housingPrice.value=');
        // console.log(checkPrice);
        return element === housingPrice.value;
    }
  };

  var dataSave = []; /* Создаю пустой массив в который передам data для его последующего использования при фильтрации. */
  var verification = function (data) { /* Функция которая осуществит проверку соответствия пинов заявленым в фильтре требованиям. */
    dataSave = data;
    // console.log('Данные исходного массива:');
    // console.log(data);
    // console.log(dataSave);
    return data
      .filter(function (element) {
        var isTypeMatched = housingType.value === 'any' ? true : element.offer.type === housingType.value;
        var isRoomsMatched = housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value;
        var isGuestMatched = housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
        var isPriceMatched = checkPrice(element);
        var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) {
          return item.value;
        });
        var isFeaturesMatched = requiredFeatures.every(function (feature) {
          return element.offer.features.includes(feature);
        });
        return isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched;
      }).slice(0, ADS_NUM);
  };
  // console.log(dataSave);
  // console.log(verification());
  /* Функция упрощена до решения проблемы с дебаунсом. */
  // var onFilterChange = window.debounce(function () {
  //   // if (document.querySelector('.map__card')) {
  //   //   document.querySelector('.map__card').remove();
  //   // }
  //   window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
  //   // window.card.removePins();
  //   window.card.renderPin(verification(window.ads));
  // });
  // console.log(window.data);

  var onFilterChange = function () {
    // if (document.querySelector('.map__card')) {
    //   document.querySelector('.map__card').remove();
    // }
    window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    // window.card.removePins();
    window.pin.renderPinCards(verification(dataSave));
  };

  mapFilters.addEventListener('change', onFilterChange); /* Пока сверну так как ошибка в дебаунсе В обработчике буду выполнять другую функцию - основную*/

  window.filter = {
    verification: verification,
    mapFilters: mapFilters,
  };
})();

/* Нужно поместить data в глобальную область видимости. */
