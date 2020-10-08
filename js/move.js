/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var dragged = false;


  var onMapPinMainPress = function (evt) { /* слушатель Действия при нажатии мыши на объекте. */
    evt.preventDefault(); /* Отменил действие при нажатии на кнопку по умолчанию.  */
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault(); /* Отменили действие по умолчанию для движения. */
      mapPinMain.removeEventListener('click', window.pin.onMainPinMouseOrKeyDown); /* Удалил обработчик клика при начале движения. */

      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) { /* Действия при поднятии клавиши. будет удален слушатель перемещения курсора мыши и удалит слушатель поднятия клавиши сам себя. */
      upEvt.preventDefault(); /* Перестал слушать движения мыши */
      if (dragged === true) { /* Получил подтверждение что движения были. */

        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.addEventListener('click', window.pin.onMainPinMouseOrKeyDown); /* Добавлен слушатель/обработчик на событие click + клик левой клавишей мыши*/
          mapPinMain.removeEventListener('click', onClickPreventDefault);
        };

        mapPinMain.addEventListener('click', onClickPreventDefault);
      }
      document.removeEventListener('mousemove', onMouseMove); /* Удаляется обработчик движения для прекращения движения элемента */
      document.removeEventListener('mouseup', onMouseUp);/* Удаляет сам себя - удаляет слушатель/обработчик поднятия клавиши на документе. */
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  mapPinMain.addEventListener('mousedown', onMapPinMainPress);

  window.move = {
    // removeAttributeDisabled: removeAttributeDisabled,
  };
})();
