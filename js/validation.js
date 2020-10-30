/* eslint-disable no-var */
'use strict';
(function () {
  var roomNumbers = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var roomPrice = document.querySelector('#price');
  var roomType = document.querySelector('#type');

  var MinPriceRoom = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var onRoomNumbersCheck = function () { /* Функция проверки валидности заполнения полей комнат и количества гостей. */
    if (guestsNumber.options[guestsNumber.selectedIndex].value !== roomNumbers.options[roomNumbers.selectedIndex].value) { /* Если значение(количественное)value выбранному значению(в данный момент) номера не равно количественному значению комнат тогда выполнится условие */
      if (guestsNumber.options[guestsNumber.selectedIndex].value > roomNumbers.options[roomNumbers.selectedIndex].value || guestsNumber.options[guestsNumber.selectedIndex].value === '0' && roomNumbers.options[roomNumbers.selectedIndex].value > guestsNumber.options[guestsNumber.selectedIndex].value) { /* Если число гостей выбранное в данный момент превышает количество выбранных в данный момент комнат ИЛИ значение количества выбранных комнат строго равно 0 И количество выбранных комнат больше чем количество выбранных для заселения гостей(В данном случае если количество выбранных гостей равно 0 что подразумевает что комната выбрана не для заселения физ лиц а для аренды Юр лицом.) */
        roomNumbers.setCustomValidity('Некорректное значение');
        guestsNumber.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
        roomNumbers.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
      } else {
        roomNumbers.setCustomValidity(''); /* Убрать значение не соответствия валидации */
        guestsNumber.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
        roomNumbers.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
      }
    } else {
      roomNumbers.setCustomValidity(''); /* Убрать значение не соответствия валидации */
      guestsNumber.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
      roomNumbers.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
    }
  };


  var onRoomPriceCheck = function () {
    roomPrice.placeholder = roomPrice.min = MinPriceRoom[document.querySelector('#type').value]; /* Значения будут равны значению которое соответствует ключу в объекте который находится в MinPriceRoom  */
  };

  var timeIn = document.querySelector('#timein'); /* Получаю поле адреса заезда, устанавливаю слушатель события выбора, при выборе одного значения такое же значение будет передано в поле выезда. */
  timeIn.onchange = function () {
    document.querySelector('#timeout').value = timeIn.value;
  };


  var timeOut = document.querySelector('#timeout'); /* Получаю адрес выезда устанавливаю слушатель события выбора который при выборе одного из установленных значений поля приравняет другое поле к этому же значению что подходит для логики выполнения задания. */
  timeOut.onchange = function () {
    document.querySelector('#timein').value = timeOut.value;
  };


  var inputTitle = document.querySelector('#title');
  var getTitleCheck = function () {
    if (inputTitle.value.length < inputTitle.min || inputTitle.value.length > inputTitle.max) {
      inputTitle.setCustomValidity('Количество вводимых символов составляет от ' + inputTitle.min + ' до ' + inputTitle.max);
      inputTitle.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
      inputTitle.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
    } else {
      inputTitle.setCustomValidity(''); /* Убрать значение не соответствия валидации */
      inputTitle.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
      inputTitle.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
    }
  };


  var addFieldCheck = function () {
    roomNumbers.addEventListener('change', onRoomNumbersCheck); /*  количество Комнат Изменения/Добавлен слушатель/обработчик событие change */
    guestsNumber.addEventListener('change', onRoomNumbersCheck); /*  количество Гостей Изменения/Добавлен слушатель/обработчик событие change */
    roomType.addEventListener('change', onRoomPriceCheck); /* Слушатель взаимодействия с полем выбора "типа жилья" */
    inputTitle.addEventListener('input', getTitleCheck); /* Слушатель корректного ввода длинны заголовка объявления. */
  };

  var removeFieldCheck = function () {
    roomNumbers.removeEventListener('change', onRoomNumbersCheck); /*  количество Комнат Изменения/Добавлен слушатель/обработчик событие change */
    guestsNumber.removeEventListener('change', onRoomNumbersCheck); /*  количество Гостей Изменения/Добавлен слушатель/обработчик событие change */
    roomType.removeEventListener('change', onRoomPriceCheck); /* Слушатель взаимодействия с полем выбора "типа жилья" */
    inputTitle.removeEventListener('input', getTitleCheck); /* Слушатель корректного ввода длинны заголовка объявления. */
  };

  window.validation = {
    onRoomNumbersCheck: onRoomNumbersCheck,
    onRoomPriceCheck: onRoomPriceCheck,
    addFieldCheck: addFieldCheck,
    removeFieldCheck: removeFieldCheck
  };
})();
