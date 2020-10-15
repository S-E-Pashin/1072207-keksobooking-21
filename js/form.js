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

  var formReset = function (evt) {
    evt.preventDefault(); /* отменим действие формы по умолчанию */
    window.address.onSaveCoords(); /* Сохранил настоящие координаты метки */
    adForm.reset(); /* Обнулил поля формы */
    window.address.getSaveCoords(); /* Передал сохраненные координаты метки в поле адреса  */
  };


  var resetButton = adForm.querySelector('.ad-form__reset');

  var getListenerResetValue = function () {
    resetButton.addEventListener('click', formReset);
  };

  var removeListenerResetValue = function () {
    resetButton.removeEventListener('click', formReset);
  };

  var onSubmit = function () {
    // console.log('');
    // console.log('Запущена функция онСубмит');
    window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
      // console.log('Запущена функция которая говорит о том что отправка формы прошла успешно.');
      /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер. */
      var map = document.querySelector('.map');
      // // НЕАКТИВНОЕ СОСТОЯНИЕ:
      map.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
      adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
      getDisabledField();
      removeSubmitListener();
      removeListenerResetValue();

      adForm.reset(); /* Обнулил поля формы */
      // window.validation.removeFieldCheck();/* Удаляю слушатели полей формы*/

      window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
      window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/

      window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */

      window.move.activeMainPinRestart(); /* Изменяю флаг для возможности переиспользования функции активации главного пина */
      window.move.activeMainPin(); /* Активирую главный пин. */
      window.sendMessage.getSuccesPopup(); /* Сообщение о успешной отправке формы */

      // TODO++++
      /* Удаляю обработчики с полей фильтра */
      // Не так все просто с ними, обсудить с наставником, может их вообще можно не удалять или же это нужно делать как то иначе. Не все функции передаются и отрабатывают должным образом.
      /* Удаляю обработчики с полей форм. */
      /* Не получается это сделать */
      // TODO----
      // document.querySelector('.map__filters').reset();

      // console.log('Форма отправлена');
      // console.log('Выполнены действия при отправке формы');
    });
    // evt.preventDefault(); /* отменим действие формы по умолчанию */
    // console.log('Выполнена отмена действия формы по умолчанию');
  };


  var onSubmitCheck = function (evt) {
    try {
      // console.log('Начало try впереди онСубмит');
      onSubmit();
      // console.log('онСубмит выполнена');
      evt.preventDefault(); /* отменим действие формы по умолчанию */
      // console.log('Отменено действие по умолчанию для кнопки отправки');
    } catch (error) {
      // console.log('Запучена действие при ошибке');
      evt.preventDefault(); /* отменим действие формы по умолчанию */
      // console.log('Отменено действие по умолчанию для кнопки отправки');
      window.sendMessage.getErrorPopup(error);
      // console.log('Выполнена функция предусмотренная при ошибке в онСубмит');
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

