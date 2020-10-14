/* eslint-disable no-var */
/* eslint-disable no-console */
'use strict';

(function () {

  var URL = 'https://21.javascript.pages.academy/keksobooking/data'; /* Адрес по которому будет направляться запрос open.  */
  var LOAD_METHOD = 'GET'; /* Метод которым должен быть получен ответ от сервера(Тип предоставления) */
  var STATUS_OK = 200;
  var TIMEOUT_IN_MS = 1000;

  var load = function (onSuccess, onError) { /*  Это функция загрузки данных с сервера.Функция которая будет вызвана в другом файле а ее параметры это в будущем функции которые примут в себя заданные здесь параметры и сработают с ними в том файле в котором будет вызвана данная функция через глобольный экспорт/импорт */
    var xhr = new XMLHttpRequest(); /* Свойство XMLHttpRequest.readyState возвращает текущее состояние объекта XMLHttpRequest.*/
    xhr.responseType = 'json'; /* Преобразую за счет встроенных возможностей браузера текст строку в данные что бы не выполнять трансформации в ручную посредством - console.log(JSON.parse(xhr.responseText)); /* Отобразит полученные данные от сервера строкой по посредством JSON.parse преобразует полученную строку в данные.  */

    xhr.addEventListener('load', function () { /* Прослушиватель события загрузки xhr */
      if (xhr.status === STATUS_OK) { /* Условие для соблюдения которого изменения произошедшие в xhr должны соответствовать выполненным без ошибок что соответствует xhr.status 200 */
        onSuccess(xhr.response); /* В случае успешного выполнения загрузки функция получаемая из параметра будет выполнена с параметром который будет содержать в себе данные из xhr.response */
        // console.log("Слушатель на загрузку сработал");
      } else {
        // console.log('Статус ответа');
        // console.log('Статус ответа' + xhr.status + xhr.statusText);
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText); /* статус ответа + строка статуса ответа. */
        // window.loadMessage.getErrorPopup('Статус ответа' + xhr.status + xhr.statusText);
      }

      // События, ошибки:
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
        // console.log("Еррор");
      });

      xhr.addEventListener('timeout', function () {
        onError('Критичесское время выполнения запроса сервера ' + xhr.timeout + 'мс' + ' пожалуйста, повторите операцию.');
        // console.log("Таймер");
      });
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(LOAD_METHOD, URL); /* Как и куда хочу обратиться(Адрес от куда получить данные.) Подготовка к запросу.*/
    xhr.send(); /* Запуск отправки запроса на сервер. Получены данные которые содержатся в response и responseText */
  };


  window.backend = {/* Экспорт данных в область общей видимости. */
    load: load
  };
})();
