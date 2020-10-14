/* eslint-disable no-var */
'use strict';
(function () {
/*   Если отправка данных прошла успешно, показывается соответствующее сообщение. Разметка сообщения находится блоке #success внутри шаблона template. Сообщение должно исчезать по нажатию на клавишу Esc и по клику на произвольную область экрана. */
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successTemplateClone = successTemplate.cloneNode(true);
  var onCloseSuccesPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseSuccesPopup);
      document.removeEventListener('click', onCloseSuccesPopup);
      document.querySelector('.success').remove();
    }
  };

  var getSuccesPopup = function () {
    document.querySelector('.map').appendChild(successTemplateClone);
    document.addEventListener('keydown', onCloseSuccesPopup);
    document.addEventListener('click', onCloseSuccesPopup);
  };

  // getSuccesPopup();
  /* Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение. Разметку сообщения, которая находится в блоке #error в шаблоне template, нужно разместить в main. Сообщение должно исчезать после нажатия на кнопку .error__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.
 */

  // var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  // var errorTemplateClone = errorTemplate.cloneNode(true);

  // var onCloseErrorPopup = function (evt) {
  //   if (evt.which === 1 || evt.key === 'Escape') {
  //     document.removeEventListener('keydown', onCloseErrorPopup);
  //     document.removeEventListener('click', onCloseErrorPopup);
  //     document.querySelector('.error').remove();
  //   }
  // };

  // var getErrorPopup = function () {
  //   document.querySelector('main').appendChild(errorTemplateClone);
  //   document.addEventListener('keydown', onCloseErrorPopup);
  //   document.addEventListener('click', onCloseErrorPopup);
  // };

  // getErrorPopup();/* Запускатор функции для комфортного взаимодействия с функцией и ее теста. */


  // console.log(successTemplate);
  window.sendMessage = {
    getSuccesPopup: getSuccesPopup,
    // getRandomInteger: getRandomInteger
  };
})();
