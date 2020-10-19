/* eslint-disable no-var */
'use strict';
(function () {
  var selectHousingType = document.getElementById('housing-type');
  var selectHousingPrice = document.querySelector('#housing-price');
  var mapFilters = document.querySelector('.map__filters');

  var cards = [];
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
  // console.log(data);

  var pinsFilter = function (data) { /* Фильтр В нем произойден фильтрация от поля выбора комнаты. В data будут находиться данные с сервера/Данные об объектах для отображения - xhr.response */
    // window.pin.renderPinCards(data);
    // window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    // console.log(data);
    // cards = [];
    // var onSelectHousingType = function () {
    //   // var selectHousingType = document.getElementById('housing-type');
    //   var valueHousingType = selectHousingType.value;
    //   var newDataType = [];

    //   if (valueHousingType === 'any') {
    //     newDataType = data;
    //   } else {
    //     data.forEach(function (i) {
    //       if (valueHousingType === i.offer.type) {
    //         newDataType.push(i);
    //       }
    //     });
    //     cards = cards.concat(newDataType);
    //   }
    //   // window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    //   // window.pin.renderPinCards(newDataType);
    //   console.log(cards);
    // };
    // // console.log(cards);

    // mapFilters.addEventListener('input', onSelectHousingType);
    // selectHousingType.addEventListener('input', onSelectHousingType);


    // housing-price
    // <select name="housing-price" id="housing-price" class="map__filter">
    // <option value="any" selected>Любая</option>
    // <option value="middle">10000 - 50000&#x20bd;</option>
    // <option value="low">до 10000&#x20bd;</option>
    // <option value="high">от 50000&#x20bd;</option>
    // </select>
    // var price = {
    //   middle: '10000 - 50000', /* i.offer.price >= 10000 && i.offer.price <= 50000 */
    //   low: '10000', /* i.offer.price < 10000 */
    //   high: '50000' /* i.offer.price > 50000 */
    // };


    // var onSelectHousingPrice = function () {
    //   // var selectHousingType = document.getElementById('housing-type');
    //   var valueHousingPrice = selectHousingPrice.value;
    //   // console.log(data);
    //   cards = [];
    //   var newDataPrice = [];

    //   if (valueHousingPrice === 'any') {
    //     newDataPrice = data;
    //   } else if (valueHousingPrice === 'middle') {
    //     data.forEach(function (i) {
    //       if (i.offer.price >= 10000 && i.offer.price <= 50000) {
    //         newDataPrice.push(i);
    //       }
    //       cards = cards.concat(newDataPrice);
    //     });
    //     // window.pin.renderPinCards(newDataPrice);
    //   }


    //   // window.pin.renderPinCards(newData);
    //   console.log(cards);
    // };


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
        // cards = cards.concat(newDataType);
      }

      // console.log('по типу' + newDataType);


      // <option value="low">до 10000&#x20bd;</option>
      // <option value="high">от 50000&#x20bd;</option>
      var valueHousingPrice = selectHousingPrice.value;
      // console.log(data);
      // cards = [];
      var newDataPrice = [];

      if (valueHousingPrice === 'any') {
        newDataPrice = [];
        // newDataPrice = data;
        newDataPrice = newDataType;
      } else if (valueHousingPrice === 'middle') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price >= 10000 && i.offer.price <= 50000) {
            newDataPrice.push(i);
          }
          // cards = cards.concat(newDataPrice);
        });
        // window.pin.renderPinCards(newDataPrice);
      } else if (valueHousingPrice === 'low') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price < 10000) {
            newDataPrice.push(i);
          }
          // cards = cards.concat(newDataPrice);
        });
      } else if (valueHousingPrice === 'high') {
        newDataPrice = [];
        newDataType.forEach(function (i) {
          if (i.offer.price > 50000) {
            newDataPrice.push(i);
          }
          // cards = cards.concat(newDataPrice);
        });
      }

      // console.log(newDataPrice);


      // <select name="housing-rooms" id="housing-rooms" class="map__filter">
      // <option value="any" selected>Любое число комнат</option>
      // <option value="1">Одна комната</option>
      // <option value="2">Две комнаты</option>
      // <option value="3">Три комнаты</option>
      // </select>

      var valueHousingRooms = document.querySelector('#housing-rooms').value;
      // console.log(valueHousingRooms);
      var newDataRooms = [];

      if (valueHousingRooms === 'any') {
        newDataRooms = newDataPrice;
      } else {
        // newDataRooms = [];
        newDataPrice.forEach(function (i) {
          // console.log(typeof String(i.offer.rooms));
          // console.log(typeof valueHousingRooms);
          if (valueHousingRooms === String(i.offer.rooms)) {
            newDataRooms.push(i);
            // console.log(newDataRooms);
          }
        });
      }

      // console.log(newDataRooms);


      // <select name="housing-guests" id="housing-guests" class="map__filter">
      //   <option value="any" selected>Любое число гостей</option>
      //   <option value="2">Два гостя</option>
      //   <option value="1">Один гость</option>
      //   <option value="0">Не для гостей</option>
      // </select>


      // housing-guests


      var valueHousingGuests = document.querySelector('#housing-guests').value;
      // console.log(valueHousingGuests);
      // console.log(valueHousingRooms);
      var newDataGuests = [];
      if (valueHousingGuests === 'any') {
        newDataGuests = newDataRooms;
      } else {
        // newDataRooms = [];
        newDataRooms.forEach(function (i) {
          // console.log(typeof String(i.offer.rooms));
          // console.log(typeof valueHousingRooms);
          if (valueHousingGuests === String(i.offer.guests)) {
            newDataGuests.push(i);
            // console.log(newDataGuests);
          }
        });
      }

      // console.log(newDataGuests);


      cards = newDataGuests;


      // console.log('по типу');
      // console.log(newDataType);


      // console.log('По стоимости');
      // console.log(newDataPrice);
      // // window.pin.renderPinCards(newData);
      // console.log('Всего подходящих объявлений');
      // console.log(cards);
      window.pin.renderPinCards(cards);


    };


    // selectHousingPrice.addEventListener('input', onSelectHousingPrice);
    // getRemoveSelectHousingType = selectHousingType.removeEventListener('input', onSelectHousingType);
    mapFilters.addEventListener('input', onSelectFilter);
  };
  // console.log(getRemoveSelectHousingType);
  // mapFilters.removeEventListener('input', onSelectFilter);

  /* Я хочу что бы При каждом из нажатий на какой то элемент сортировки/фильтрации срабатывала функция которая просматривала исходный массив дата, проверяла его на соответствие выбранному условию этому и дальше проходила к выбору остальных условий т.е. взаимодействие на каждом этапе будет происходить с исходным массивом дата и итог сохраняться в новый массив в зависимости от фильтра. Новый массив изначально будет как бы пустым и будет наполняться в том случае если выбран какой то фильтр. В данном случае будет браться исходный массив дата и из него на каждом шаге будут записываться в новый массив только те элементы которые подходят для условия заданного пользователем т.к. согласно условию нет необходимости отображать не менее 5 объявления а четко указано что не более 5 объявлений. */


  window.filter = {/* Экспорт данных в область общей видимости. */
    pins: pinsFilter
    // onSelectHousingType: onSelectHousingType
  };
})();


// switch (valueHousingPrice) {
//   case 'middle':
//     var getNewDataPrice = function (data) {
//     data.forEach(function (i) {
//       // console.log(i.offer.price);
//       if (i.offer.price >= 10000 && i.offer.price <= 50000) {
//         newDataPrice.push(i);
//       }
//     });
//     console.log(newDataPrice);
//     window.pin.renderPinCards(newDataPrice); /* (comparisonExpression = i.offer.price >= 10000 && i.offer.price <= 50000) */;
//     return;
//   case 'low':
//     return '10000';
//   case 'high':
//     return '50000';
// }
// price(document.querySelector('#housing-price'))
// console.log(valueHousingPrice);
// console.log(price[valueHousingPrice]);
// console.log(document.querySelector('#housing-price').value);
// console.log(price[document.querySelector('#housing-price').value]);
// console.log(i.offer.price);

