/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var MAP_PIN_MAIN_AFTER_TIP = 22; /* Высота ножки/острия для метки(Пина) */
  var onStartCoords = function () {
    var mapPinMainAddress = document.querySelector('#address'); /* Адрес(Поле) куда передаются данные о нахождении главного пина(Координаты) */
    var mapPinMain = document.querySelector('.map__pin--main'); /* Главный пин на карте */
    mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
    return mapPinMainAddress.value;
    // console.log(onStartCoords);
  };

  // Корректировка расположения точки в активном состоянии.
  /* // Координаты центра для иглы метки: map__pin--main */
  var onMoveCoords = function () {
    var mapPinMainAddress = document.querySelector('#address'); /* Адрес(Поле) куда передаются данные о нахождении главного пина(Координаты) */
    var mapPinMain = document.querySelector('.map__pin--main'); /* Главный пин на карте */
    mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop - (mapPinMain.offsetHeight / 2 + MAP_PIN_MAIN_AFTER_TIP));/* Вычитание из расстояния сверху до метки половины высоты(оставшейся половины высоты метки) и высоты дополнительного визуального элемента ножки/острия выполненного псевдоэлементом.  */
  };

  window.address = {
    onStartCoords: onStartCoords,
    onMoveCoords: onMoveCoords
  };
})();
