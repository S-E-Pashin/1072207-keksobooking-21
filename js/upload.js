/* eslint-disable no-var */
'use strict';

var URL_POST = 'https://21.javascript.pages.academy/keksobooking';
var STATUS_OK = 200;
var TIMEOUT_IN_MS = 10000;

var submitData = function (data, onSuccess, onError) {

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === STATUS_OK) {
      onSuccess(xhr.response);
    } else {
      onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка отправки');
  });

  xhr.addEventListener('timeout', function () {
    onError('Критичесское время выполнения отправки на сервер ' + xhr.timeout + 'мс' + ' пожалуйста, повторите операцию.');
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open('POST', URL_POST);
  xhr.send(data);
};

window.upload = {
  submitData: submitData
};
