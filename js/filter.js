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

  var prices = {
    min: 10000,
    max: 50000
  };

  var checkPrice = function (element) {
    switch (housingPrice.value) {
      case 'any':
        return true; /* Если выбрано any возвращается true  */
      case 'low':
        return (element.offer.price < prices.min); /* true false */
      case 'middle':
        return (element.offer.price > prices.min) && (element.offer.price < prices.max);
      case 'high':
        return (element.offer.price > prices.max);
      default:
        return element === housingPrice.value;
    }
  };

  var dataSave = []; /* Создаю пустой массив в который передам data для его последующего использования при фильтрации. */
  var verification = function (data) { /* Функция которая осуществит проверку соответствия пинов заявленым в фильтре требованиям. */
    dataSave = data;
    return data
      .filter(function (element) {
        var isOfferMatched = element.offer !== null || '' ? true : false;
        var isTypeMatched = housingType.value === 'any' ? true : element.offer.type === housingType.value; /* isTypeMatched если значение housingType.value равно 'any' тогда выполняется true - утверждение верно и выполнятеся следующая проверка/строка условие если же нет то выполняется вторая часть а именно element.offer.type === housingType.value которы  */
        var isRoomsMatched = housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value; /* + это как number унарный оператор. element.offer.rooms === +housingRooms.value */
        var isGuestMatched = housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
        var isPriceMatched = checkPrice(element);
        var requiredFeatures = Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) { /* Сначала Будет создана коллекция/псевдомассив из выбранных значений housingFeatures далее с помощью array.from он будет преобразован в реальный массив состоящий из выбранных значений и уже с помощью map будет создан новый массив который будет состоять из значений выбранных элементов */
          return item.value;
        });
        var isFeaturesMatched = requiredFeatures.every(function (feature) { /* .every вызвана на функции и проверяет соответствие каждого элемента  массива requiredFeatures на соответствие из условиям из функции и возвращает true или false.  Метод .includes работает здесь следующим образом он берет полученный массив и сравнивает значение из feature(Это каждый элемент массива requiredFeatures) и смотрит есть ли такой элемент в массиве element.offer.features который представляет из себя массив со строчными значениями. В том случае если есть совпадающее значение он возвращает true если такого значения нет он возвращает false */
          return element.offer.features.includes(feature);
        });

        return isOfferMatched && isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched;
      }).slice(0, ADS_NUM); /* .slice(0, ADS_NUM) создает новый массив в котором будут находиться элементы с 0 по 4 (Это с 1 по 5 включительно) он как бы вырежет из массива слева те элементы массива которые мне нужны.  */
  };

  var onFilterChange = window.debounce(function () {
    window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
    window.pin.renderPinCards(verification(dataSave));
  });
  // TODO рассмотреть в чем причины ошибки для наставника.
  // var onFilterChange = function () {
  //   // if (document.querySelector('.map__card')) {
  //   //   document.querySelector('.map__card').remove();
  //   // }
  //   window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
  //   // window.card.removePins();
  //   window.pin.renderPinCards(verification(dataSave));
  // };
  // TODO рассмотреть в чем причины ошибки для наставника.
  // mapFilters.addEventListener('change', window.debounce(window.filter.onFilterChange())); /* Пока сверну так как ошибка в дебаунсе В обработчике буду выполнять другую функцию - основную*/
  mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    verification: verification,
    mapFilters: mapFilters,
    onFilterChange: onFilterChange
  };
})();

