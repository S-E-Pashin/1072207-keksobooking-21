/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

var MAP_PIN_MAIN_AFTER_TIP = 16; /* Высота ножки/острия для метки(Пина) c учетом отступов. */
var MAP_PIN_MAIN_CORRECTION_EQUATING_TO_ZERO = 1;
var mapPinMain = document.querySelector('.map__pin--main'); /* Главный пин на карте */
var mapPinMainAddress = document.querySelector('#address'); /* Адрес(Поле) куда передаются данные о нахождении главного пина(Координаты) */

var firstCoords = {/* Сохраненное первозданное значение координат главной метки */
  x: mapPinMain.style.left,
  y: mapPinMain.style.top
};

var getStartCoords = function () { /* Стартовые координаты - вывод в поле */
  mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
  return mapPinMainAddress.value;
};

var returnFirstCoordsMapPinMain = function () { /* Функция возвращения главное метки на первоначальное положение и передача координат данного положения в поле для вывода информации о адресе. */
  mapPinMain.style.left = firstCoords.x;
  mapPinMain.style.top = firstCoords.y;
  getStartCoords();
};

var getMoveCoords = function () {
  mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2 - MAP_PIN_MAIN_CORRECTION_EQUATING_TO_ZERO) + ', ' + Math.round(mapPinMain.offsetTop + (mapPinMain.offsetHeight + MAP_PIN_MAIN_AFTER_TIP));
};

window.address = {
  getStartCoords: getStartCoords,
  getMoveCoords: getMoveCoords,
  returnFirstCoordsMapPinMain: returnFirstCoordsMapPinMain
};

