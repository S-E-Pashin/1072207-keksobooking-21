/* eslint-disable no-var */
'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */
  var liveElements = document.querySelector('.ad-form').children; /* Внутри находится коллекция дочерних элементов */
  var liveMapFilterElements = document.querySelector('.map__filters').children; /* Внутри находится коллекция дочерних элементов */
  adForm.classList.add('ad-form--disabled');

  var addAttributeDisabled = function (liveCollection) {
    for (var i = 0; i < liveCollection.length; i++) { /* Цикл для добавления атрибута к полям */
      liveCollection[i].setAttribute('disabled', 'true'); /* Поочередное добавление атрибута к каждому филдсету полей. */
    }
    return liveCollection;
  };
  addAttributeDisabled(liveElements);
  addAttributeDisabled(liveMapFilterElements);

  // var onSuccessSubmitForm = function (responce) {

  // };

  // var submitForm = function (evt) {
  //   window.upload.submitData(new FormData(adForm), function (responce) { /* function (responce) Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
  //     /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер.*/
  //     // var map = document.querySelector('.map');
  //     // // НЕАКТИВНОЕ СОСТОЯНИЕ:
  //     // map.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */
  //   });
  //   evt.preventDefault(); /* отменим действие формы по умолчанию */
  // };
  var onSubmit = function (evt) {
    try {
      window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
        /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер. */
        var map = document.querySelector('.map');
        // // НЕАКТИВНОЕ СОСТОЯНИЕ:
        map.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
        adForm.reset(); /* Обнулил поля формы */
        adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
        window.map.setAttributeDisabled(window.form.liveElements); /* Сделал неактивными поля формы */
        window.map.setAttributeDisabled(window.form.liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */
        window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
        window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/

        window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */

        // TODO++++
        /* Удаляю обработчики с полей фильтра */
        // Не так все просто с ними, обсудить с наставником, может их вообще можно не удалять или же это нужно делать как то иначе. Не все функции передаются и отрабатывают должным образом.
        /* Удаляю обработчики с полей форм. */
        /* Не получается это сделать */
        // TODO----

        window.move.activeMainPinRestart();
        window.move.activeMainPin();
        window.sendMessage.getSuccesPopup(); /* Сообщение о успешной отправке формы */

        /*  */

        // console.log('Форма отправлена');
        // mapPinMain.addEventListener('mousedown', onMapPinMainPress);
        // window.move.mapPinMain.addEventListener('mousedown', window.move.onMapPinMainPress);
      });
      evt.preventDefault(); /* отменим действие формы по умолчанию */
    } catch (error) {
      window.sendMessage.getErrorPopup();
    }
  };


  // var onSubmit = function (evt) {
  //   try {
  //     window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
  //       /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер. */
  //       var map = document.querySelector('.map');
  //       // // НЕАКТИВНОЕ СОСТОЯНИЕ:
  //       map.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
  //       adForm.reset(); /* Обнулил поля формы */
  //       adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
  //       window.map.setAttributeDisabled(window.form.liveElements); /* Сделал неактивными поля формы */
  //       window.map.setAttributeDisabled(window.form.liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */
  //       window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
  //       window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/

  //       window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */

  //       // TODO++++
  //       /* Удаляю обработчики с полей фильтра */
  //       // Не так все просто с ними, обсудить с наставником, может их вообще можно не удалять или же это нужно делать как то иначе. Не все функции передаются и отрабатывают должным образом.
  //       /* Удаляю обработчики с полей форм. */
  //       /* Не получается это сделать */
  //       // TODO----

  //       window.move.activeMainPinRestart();
  //       window.move.activeMainPin();
  //       window.sendMessage.getSuccesPopup(); /* Сообщение о успешной отправке формы */

  //       /*  */

  //       // console.log('Форма отправлена');
  //       // mapPinMain.addEventListener('mousedown', onMapPinMainPress);
  //       // window.move.mapPinMain.addEventListener('mousedown', window.move.onMapPinMainPress);
  //     });
  //     evt.preventDefault(); /* отменим действие формы по умолчанию */
  //   } catch (error) {
  //     window.sendMessage.getErrorPopup();
  //   }
  // };


  // var onSubmitCheck = function () {
  //   try {
  //     onSubmit();
  //   } catch (error) {
  //     window.sendMessage.getErrorPopup();
  //   }
  // };


  adForm.addEventListener('submit', onSubmit);


  // try {

  // } catch (error) {
  //   window.sendMessage.getErrorPopup();
  // }

  // adForm.addEventListener('submit', function (evt) {
  //   window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
  //     /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер. */
  //     var map = document.querySelector('.map');
  //     // // НЕАКТИВНОЕ СОСТОЯНИЕ:
  //     map.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
  //     adForm.reset(); /* Обнулил поля формы */
  //     adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
  //     window.map.setAttributeDisabled(window.form.liveElements); /* Сделал неактивными поля формы */
  //     window.map.setAttributeDisabled(window.form.liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */
  //     window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
  //     window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/

  //     window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */

  //     // TODO++++
  //     /* Удаляю обработчики с полей фильтра */
  //     // Не так все просто с ними, обсудить с наставником, может их вообще можно не удалять или же это нужно делать как то иначе. Не все функции передаются и отрабатывают должным образом.
  //     /* Удаляю обработчики с полей форм. */
  //     /* Не получается это сделать */
  //     // TODO----

  //     window.move.activeMainPinRestart();
  //     window.move.activeMainPin();
  //     window.sendMessage.getSuccesPopup(); /* Сообщение о успешной отправке формы */

  //     /*  */

  //     // console.log('Форма отправлена');
  //     // mapPinMain.addEventListener('mousedown', onMapPinMainPress);
  //     // window.move.mapPinMain.addEventListener('mousedown', window.move.onMapPinMainPress);
  //   });
  //   evt.preventDefault(); /* отменим действие формы по умолчанию */
  // });

  window.form = {
    liveElements: liveElements,
    liveMapFilterElements: liveMapFilterElements,
  };
})();

