/* eslint-disable no-var */
'use strict';

var successTemplate = document.querySelector('#success').content.querySelector('.success');
var successTemplateClone = successTemplate.cloneNode(true);

var onCloseSuccesPopup = function (evt) {
  if (evt.which === 1 || window.utils.ifEscEvent(evt)) {
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
  if (evt.which === 1 || window.utils.ifEscEvent(evt)) {
    document.removeEventListener('keydown', onCloseErrorPopup);
    document.removeEventListener('mousedown', onCloseErrorPopup);
    document.querySelector('.error').remove();
  }
};

var getErrorPopup = function (error) {
  errorTemplateClone.querySelector('.error__message').textContent = 'Ошибка загрузки объявления ' + error;
  document.querySelector('main').appendChild(errorTemplateClone);
  document.addEventListener('keydown', onCloseErrorPopup);
  document.addEventListener('mousedown', onCloseErrorPopup);
};

window.sendMessage = {
  getSuccessPopup: getSuccessPopup,
  getErrorPopup: getErrorPopup
};

