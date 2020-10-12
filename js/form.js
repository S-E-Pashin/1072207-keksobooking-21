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

  adForm.addEventListener('submit', function (evt) {
    window.upload.submitData(new FormData(adForm), function () { /* function () Это колбек т.н. onSuccess */ /* FormData Позволяет собрать данные с формы для последующей отправки. */
      /* Действия как только данные будут успешно сохранены В учебном проекте это закрытие диалога, возможно это действия при успешной отправке формы на сервер. */
      /* Видимо необходимо добавлять неактивность- деактевировать так же как активировал, через цикл добавлять атрибут. */
      var map = document.querySelector('.map');
      // // НЕАКТИВНОЕ СОСТОЯНИЕ:
      map.classList.add('map--faded'); /* Добавляется неактивность для пина*/
      adForm.reset(); /* Обнулил поля формы */
      adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
      window.map.setAttributeDisabled(window.form.liveElements); /* Сделал неактивными поля формы */
      window.map.setAttributeDisabled(window.form.liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */

      window.pin.removeOldPins(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */

      window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/

      window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */

      /* Сообщение о успешной отправке формы */
      /*  */










      console.log('Форма отправлена');
    });
    evt.preventDefault(); /* отменим действие формы по умолчанию */
  });





  window.form = {
    liveElements: liveElements,
    liveMapFilterElements: liveMapFilterElements,
  };
})();

