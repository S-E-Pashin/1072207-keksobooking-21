/* eslint-disable no-var */
'use strict';
(function () {
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
    document.querySelector('main').appendChild(successTemplateClone);
    document.addEventListener('keydown', onCloseSuccesPopup);
    document.addEventListener('click', onCloseSuccesPopup);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorTemplateClone = errorTemplate.cloneNode(true);

  var onCloseErrorPopup = function (evt) {
    if (evt.which === 1 || evt.key === 'Escape') {
      document.removeEventListener('keydown', onCloseErrorPopup);
      document.removeEventListener('click', onCloseErrorPopup);
      document.querySelector('.error').remove();
    }
  };

  var getErrorPopup = function (error) {
    errorTemplateClone.textContent = 'Произошла ошибка загрузки объявления ' + error;
    document.querySelector('main').appendChild(errorTemplateClone);
    document.addEventListener('keydown', onCloseErrorPopup);
    document.addEventListener('click', onCloseErrorPopup);
  };

  window.sendMessage = {
    getSuccesPopup: getSuccesPopup,
    getErrorPopup: getErrorPopup
  };
})();
