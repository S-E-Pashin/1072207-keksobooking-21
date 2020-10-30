/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var MAX_Y_TOP = 184;
  var MAX_Y_BOTTOM = 684;
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var dragged = true;
  var halfPinMain = mapPinMain.offsetWidth / 2;
  var minX = map.offsetWidth - map.offsetWidth - halfPinMain;
  var maxX = map.offsetWidth - halfPinMain;

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

        var getMovingAxisY = function () {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        };

        var getMovingAxisX = function () {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        };


        if (mapPinMain.offsetTop > MAX_Y_TOP) {
          getMovingAxisY();
        } else {
          mapPinMain.style.top = MAX_Y_TOP + 'px';
        }

        if (mapPinMain.offsetTop < MAX_Y_BOTTOM) {
          getMovingAxisY();
        } else {
          mapPinMain.style.top = MAX_Y_BOTTOM + 'px';
        }

        if (mapPinMain.offsetLeft > minX) {
          getMovingAxisX();
        } else {
          mapPinMain.style.left = minX + 'px';
        }

        if (mapPinMain.offsetLeft < maxX) {
          getMovingAxisX();
        } else {
          mapPinMain.style.left = maxX + 'px';
        }

        window.address.onMoveCoords();
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
