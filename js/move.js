/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var MAX_Y_TOP = 49;
  var MAX_Y_BOTTOM = 549;
  var mapPinMain = document.querySelector('.map__pin--main');
  var dragged = true;
  var halfPinMain = mapPinMain.offsetWidth / 2;
  var minX = window.map.section.offsetWidth - window.map.section.offsetWidth - halfPinMain;
  var maxX = window.map.section.offsetWidth - halfPinMain;

  var getDraggedSwitch = function () {
    if (dragged) {
      window.pin.activateMainActions(); /* Запуск главной функции активации страницы */
    }
    dragged = false; /* Изменение флага удаляет повторный запуск отрисовки объявлений.*/
  };

  var onMapPinMainPress = function (evt) { /* слушатель Действия при нажатии мыши на объекте. */

    if (evt.key === 'Enter') {
      getDraggedSwitch(); /* Переключатель возможности активации главной метки. */
    }

    if (evt.which === 1) {
      evt.preventDefault(); /* Отменил действие при нажатии на кнопку по умолчанию.  */
      getDraggedSwitch(); /* Переключатель возможности активации главной метки. */
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault(); /* Отменили действие по умолчанию для движения. */

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };


        var newTopCoordinate = mapPinMain.offsetTop - shift.y;
        var newLeftCoordinate = mapPinMain.offsetLeft - shift.x;

        if (newTopCoordinate < MAX_Y_TOP) {
          newTopCoordinate = MAX_Y_TOP;
        } else if (newTopCoordinate > MAX_Y_BOTTOM) {
          newTopCoordinate = MAX_Y_BOTTOM;
        } else {
          newTopCoordinate = mapPinMain.offsetTop - shift.y;
        }

        if (newLeftCoordinate < minX) {
          newLeftCoordinate = minX;
        } else if (newLeftCoordinate > (maxX)) {
          newLeftCoordinate = maxX;
        } else {
          newLeftCoordinate = mapPinMain.offsetLeft - shift.x;
        }

        mapPinMain.style.top = newTopCoordinate + 'px';
        mapPinMain.style.left = newLeftCoordinate + 'px';

        window.address.getMoveCoords();
      };
      var onMouseUp = function (upEvt) { /* Действия при поднятии клавиши. будет удален слушатель перемещения курсора мыши и удалит слушатель поднятия клавиши сам себя. */
        upEvt.preventDefault(); /* Перестал слушать движения мыши */
        document.removeEventListener('mousemove', onMouseMove); /* Удаляется обработчик движения для прекращения движения элемента */
        document.removeEventListener('mouseup', onMouseUp);/* Удаляет сам себя - удаляет слушатель/обработчик поднятия клавиши на документе. */
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var activateMainPinRestart = function () {
    dragged = true;
  };

  var activateMainPin = function () {
    mapPinMain.addEventListener('mousedown', onMapPinMainPress);
    mapPinMain.addEventListener('keydown', onMapPinMainPress);
  };

  activateMainPin();

  window.move = {
    activateMainPin: activateMainPin,
    activateMainPinRestart: activateMainPinRestart
  };
})();
