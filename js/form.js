/* eslint-disable no-var */
'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */
  var liveElements = document.querySelector('.ad-form').children; /* Внутри находится коллекция дочерних элементов */
  var liveMapFilterElements = document.querySelector('.map__filters').children; /* Внутри находится коллекция дочерних элементов */
  adForm.classList.add('ad-form--disabled');

  var getDisabledField = function () {
    window.map.setAttributeDisabled(liveElements); /* Сделал неактивными поля формы */
    window.map.setAttributeDisabled(liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */
  };
  getDisabledField();

  var formReset = function () {
    var map = document.querySelector('.map');
    map.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
    adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
    getDisabledField(); /* Убрал активность полей */
    removeSubmitListener(); /* Удалил слушатель кнопки отправки */
    removeListenerResetValue(); /* Удалил слушатель кнопки рестарта */
    document.querySelector('.map__filters').reset(); /* Обнулил поля формы фильтра-пинов/объявлений. */
    adForm.reset(); /* Обнулил поля формы */
    window.validation.removeFieldCheck();/* Удаляю слушатели полей формы*/
    window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
    window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/
    window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */
    window.move.activeMainPinRestart(); /* Изменяю флаг для возможности переиспользования функции активации главного пина */
    window.move.activeMainPin(); /* Активирую главный пин. */
  };

  var getFormResetButton = function (evt) {
    evt.preventDefault(); /* отменил действие формы по умолчанию */
    formReset();
  };

  var resetButton = adForm.querySelector('.ad-form__reset');

  var getListenerResetValue = function () {
    resetButton.addEventListener('click', getFormResetButton);
  };

  var removeListenerResetValue = function () {
    resetButton.removeEventListener('click', getFormResetButton);
  };

  var onSubmit = function () {
    window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
      formReset();
      window.sendMessage.getSuccessPopup(); /* Сообщение о успешной отправке формы */
    });
  };


  var onSubmitCheck = function (evt) {
    try {
      onSubmit();
      evt.preventDefault(); /* отменил действие формы по умолчанию */
    } catch (error) {
      evt.preventDefault(); /* отменил действие формы по умолчанию */
      window.sendMessage.getErrorPopup(error);
    }
  };

  var getSubmitListener = function () {
    adForm.addEventListener('submit', onSubmitCheck);
  };

  var removeSubmitListener = function () {
    adForm.removeEventListener('submit', onSubmitCheck);
  };

  window.form = {
    liveElements: liveElements,
    liveMapFilterElements: liveMapFilterElements,
    getSubmitListener: getSubmitListener,
    getListenerResetValue: getListenerResetValue
  };
})();

