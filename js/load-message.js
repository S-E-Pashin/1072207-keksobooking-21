/* eslint-disable no-var */
'use strict';
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorLoadTemplateClone = errorTemplate.cloneNode(true);
  var onCloseErrorLoadPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseErrorLoadPopup);
      document.removeEventListener('mousedown', onCloseErrorLoadPopup);
      document.querySelector('.error').remove();
    }
  };

  var getErrorPopup = function (message) {
    errorLoadTemplateClone.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorLoadTemplateClone);
    document.addEventListener('keydown', onCloseErrorLoadPopup);
    document.addEventListener('mousedown', onCloseErrorLoadPopup);
  };

  window.loadMessage = {
    getErrorPopup: getErrorPopup
  };
})();
