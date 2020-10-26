/* eslint-disable no-var */
'use strict';
(function () {
  var URL = 'https://21.javascript.pages.academy/keksobooking';

  /* TODO посмотреть, сравнить что можно выделить в отдельные функции и использовать как здесь так и пре загрузке данный с сервера. Желание что то объединять не возникло.  */

  var submitData = function (data, onSuccess) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    submitData: submitData
  };
})();
