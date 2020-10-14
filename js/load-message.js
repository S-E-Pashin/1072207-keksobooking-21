/* eslint-disable no-var */
'use strict';
(function () {
  /* Добавьте обработку возможных ошибок при загрузке: создайте DOM-элемент, который будет показывать сообщения об ошибках, произошедших по ходу загрузки данных. Дизайн DOM-элемента предлагается придумать самостоятельно. */

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorLoadTemplateClone = errorTemplate.cloneNode(true);

  var onCloseErrorLoadPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseErrorLoadPopup);
      document.removeEventListener('click', onCloseErrorLoadPopup);
      document.querySelector('.error').remove();
    }
  };

  var getErrorPopup = function (message) {
    // console.log('Сработал попап ошибки загрузки');
    errorLoadTemplateClone.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorLoadTemplateClone);
    document.addEventListener('keydown', onCloseErrorLoadPopup);
    document.addEventListener('click', onCloseErrorLoadPopup);
  };

  // getErrorPopup();/* Запускатор функции для комфортного взаимодействия с функцией и ее теста. */

  window.loadMessage = {
    getErrorPopup: getErrorPopup
  };
})();
