/* eslint-disable no-var */
'use strict';
(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successTemplateClone = successTemplate.cloneNode(true);

  var onCloseSuccesPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseSuccesPopup);
      document.removeEventListener('mousedown', onCloseSuccesPopup);
      document.querySelector('.success').remove();
    }
  };

  var getSuccessPopup = function () {
    document.querySelector('main').appendChild(successTemplateClone);
    document.addEventListener('keydown', onCloseSuccesPopup);
    document.addEventListener('mousedown', onCloseSuccesPopup);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorTemplateClone = errorTemplate.cloneNode(true);

  var onCloseErrorPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseErrorPopup);
      document.removeEventListener('mousedown', onCloseErrorPopup);
      document.querySelector('.error').remove();
    }
  };

  var getErrorPopup = function (error) {
    errorTemplateClone.textContent = 'Ошибка загрузки объявления ' + error;
    errorTemplateClone.style.color = 'red';
    errorTemplateClone.style.fontSize = '34px';
    document.querySelector('main').appendChild(errorTemplateClone);
    document.addEventListener('keydown', onCloseErrorPopup);
    document.addEventListener('mousedown', onCloseErrorPopup);
  };

  window.sendMessage = {
    getSuccessPopup: getSuccessPopup,
    getErrorPopup: getErrorPopup
  };
})();
