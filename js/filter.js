/* eslint-disable no-var */
'use strict';
(function () {
  var ADS_NUM = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var Prices = {
    min: 10000,
    max: 50000
  };

  var checkPrice = function (element) {
    switch (housingPrice.value) {
      case 'any':
        return true; /* Если выбрано any возвращается true  */
      case 'low':
        return (element.offer.price < Prices.min); /* true false */
      case 'middle':
        return (element.offer.price > Prices.min) && (element.offer.price < Prices.max);
      case 'high':
        return (element.offer.price > Prices.max);
      default:
        return element === housingPrice.value;
    }
  };

  var dataSave = []; /* Создаю пустой массив в который передам data для его последующего использования при фильтрации. */


  var requiredFeatures = function () {
    return Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) { /* Сначала Будет создана коллекция/псевдомассив из выбранных значений housingFeatures далее с помощью array.from он будет преобразован в реальный массив состоящий из выбранных значений и уже с помощью map будет создан новый массив который будет состоять из значений выбранных элементов */
      return item.value;
    });
  };

  var getVerification = function (data) { /* Функция которая осуществит проверку соответствия пинов заявленым в фильтре требованиям. */
    dataSave = data;

    return data
      .filter(function (element) {
        var isOfferMatched = !!(element.offer);
        var isTypeMatched = housingType.value === 'any' ? true : element.offer.type === housingType.value; /* isTypeMatched если значение housingType.value равно 'any' тогда выполняется true - утверждение верно и выполнятеся следующая проверка/строка условие если же нет то выполняется вторая часть а именно element.offer.type === housingType.value которы  */
        var isRoomsMatched = housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value; /* + это как number унарный оператор. */
        var isGuestMatched = housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
        var isPriceMatched = checkPrice(element);
        var isFeaturesMatched = requiredFeatures().every(function (feature) {
          return element.offer.features.includes(feature);
        });
        return isOfferMatched && isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched;
      }).slice(0, ADS_NUM); /* .slice(0, ADS_NUM) создает новый массив в котором будут находиться элементы с 0 по 4 (Это с 1 по 5 включительно) он как бы вырежет из массива слева те элементы массива которые мне нужны.  */
  };

  var onFilterChange = window.debounce(function () {
    window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    window.pin.renderCards(getVerification(dataSave));
  });

  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    getVerification: getVerification
  };
})();

