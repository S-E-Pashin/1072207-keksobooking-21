/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var dragged = true;
  /* Скрытый первоначальный вариант он вроде как именно правильный но в поле адреса увы передаются отличные значения ввиду этого скорректировано в соответствии с заданных значений константы с заданными ограничениями. */
  // var MAX_Y_TOP = 130;
  // var MAX_Y_BOTTOM = 630;
  var MAX_Y_TOP = 184;
  var MAX_Y_BOTTOM = 684;

  var halfPinMain = mapPinMain.offsetWidth / 2;
  var minX = map.offsetWidth - map.offsetWidth - halfPinMain;
  var maxX = map.offsetWidth - halfPinMain;

  var onMapPinMainPress = function (evt) { /* слушатель Действия при нажатии мыши на объекте. */
    if (evt.which === 1 || evt.key === 'Enter') {
      evt.preventDefault(); /* Отменил действие при нажатии на кнопку по умолчанию.  */
      if (dragged) {
        window.pin.mapPinMainActions();
        // console.log('Запущен рендер объявлений.');
      }
      dragged = false; /* Изменение флага удаляет повторный запуск отрисовки объявлений.*/

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault(); /* Отменили действие по умолчанию для движения. */
        // mapPinMain.removeEventListener('click', window.pin.onMainPinMouseOrKeyDown); /* Удалил обработчик клика при начале движения. */


        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var movingAxisY = function () {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        };

        var movingAxisX = function () {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        };


        if (mapPinMain.offsetTop > MAX_Y_TOP) {
        // mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
          movingAxisY();
        } else {
          mapPinMain.style.top = MAX_Y_TOP + 'px';
        }

        if (mapPinMain.offsetTop < MAX_Y_BOTTOM) {
          movingAxisY();
        } else {
          mapPinMain.style.top = MAX_Y_BOTTOM + 'px';
        }

        if (mapPinMain.offsetLeft > minX) {
          movingAxisX();
        } else {
          mapPinMain.style.left = minX + 'px';
        }

        if (mapPinMain.offsetLeft < maxX) {
          movingAxisX();
        } else {
          mapPinMain.style.left = maxX + 'px';
        }

        window.address.onMoveCoords();
      };
      var onMouseUp = function (upEvt) { /* Действия при поднятии клавиши. будет удален слушатель перемещения курсора мыши и удалит слушатель поднятия клавиши сам себя. */
        upEvt.preventDefault(); /* Перестал слушать движения мыши */
        /* !!! Вообще не нужное теперь условие и функция */
        // if (!dragged) { /* Получил подтверждение что движения были. */
        // // Обсудить отдельно потом.
        //   console.log('Движения были');
        //   var onClickPreventDefault = function (clickEvt) {
        //     clickEvt.preventDefault();
        //     mapPinMain.addEventListener('click', window.pin.onMainPinMouseOrKeyDown); /* Добавлен слушатель/обработчик на событие click + клик левой клавишей мыши*/
        //     // mapPinMain.removeEventListener('click', onClickPreventDefault);
        //     mapPinMain.removeEventListener('click', onClickPreventDefault);
        //   // document.removeEventListener('click', onClickPreventDefault);
        //   };
        //   mapPinMain.addEventListener('click', onClickPreventDefault);
        // // mapPinMain.addEventListener('click', window.pin.onMainPinMouseOrKeyDown); /* Добавлен слушатель/обработчик на событие click + клик левой клавишей мыши*/
        // }
        document.removeEventListener('mousemove', onMouseMove); /* Удаляется обработчик движения для прекращения движения элемента */
        document.removeEventListener('mouseup', onMouseUp);/* Удаляет сам себя - удаляет слушатель/обработчик поднятия клавиши на документе. */
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainPress);

  window.move = {
    // removeAttributeDisabled: removeAttributeDisabled,
  };
})();
