/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*****************************!*\
  !*** ./js/preview-image.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var IMAGE_PHOTO_HEIGHT = '70';
var IMAGE_PHOTO_WIDTH = '70';
var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

var fileAvatar = document.querySelector('.ad-form-header__input');
var preview = document.querySelector('.ad-form-header__preview img');
var fileGallery = document.querySelector('.ad-form__input');
var previewUpload = document.querySelector('.ad-form__photo');
var fileAvatarStartSrc = preview.src;

var removeImg = function () {
  if (previewUpload.querySelector('img')) {
    previewUpload.querySelector('img').remove();
  }
};

var getFileChoiceNew = function (inputChooser) { /* Функция которая подставит выбранный пользователем файл изображения из поля выбора в место отображения картинки с заданными условиями. */
  var file = inputChooser.files[0]; /* Приравниваю значение file к значению файла который выбран в поле(Данное свойство всегда выглядит как массив.) */
  var fileName = file.name.toLowerCase(); /* Трансформирую имя файла для однотипного его восприятия. Приведен к строковым/маленьким.  */
  var matches = FILE_TYPES.some(function (it) { /* Проверка оканчивает ли имя файла на заданный тип. it он же ending. some это метод который будет вызван на каждый элемент массива FILE_TYPES и если строка оканчивается на переданую подстроку то тогда, если хоть один из вариантов константы(окончаний) подойдет/будет равен окончанию имени файла то он вернет true */
    return fileName.endsWith(it); /* Проверяет на соответствие заданным константам. */
  });


  if (matches) { /* Если условие верно и файл оканчивается на требуемый/заданный для нас, тогда. */
    var reader = new FileReader(); /* Получаю экземпляр ридера(некую копию) с помощью ключевого слова NEW. Ридер=Читатель, своя копия читателя посредством которой будем читать файлы пользователя. */

    if (inputChooser === fileAvatar) {
      var onReaderLoad = function () { /* Обработчик загрузки ридера.  */
        preview.src = reader.result; /* Передаю значения в картинку/в атрибут  результат который будет получен при наступлении события load которое в свою очередь будет запущено reader.readAsDataURL(file); */
      };

      reader.addEventListener('load', onReaderLoad); /* Событие load вызовется в тот момент как ридер прочтет файл который загрузил/выбрал пользователь. */

      reader.readAsDataURL(file); /* readAsDataURL - Метод - прочти как DATA URL. И дальше он открывает файл выбранный пользователем. */
    } else if (inputChooser === fileGallery) {
      var getImg = function () {
        var imagePhoto = document.createElement('img');
        imagePhoto.src = reader.result;
        imagePhoto.width = IMAGE_PHOTO_WIDTH;
        imagePhoto.height = IMAGE_PHOTO_HEIGHT;
        previewUpload.appendChild(imagePhoto);
      };


      var onReaderUpload = function () { /* Обработчик загрузки ридера.  */
        removeImg();
        getImg();
      };

      reader.addEventListener('load', onReaderUpload); /* Событие load вызовется в тот момент как ридер прочтет файл который загрузил/выбрал пользователь. */

      reader.readAsDataURL(file); /* readAsDataURL - Метод - прочти как DATA URL. И дальше он открывает файл выбранный пользователем. */
    }
  }
};

var onFileChoiceAvatar = function () {
  getFileChoiceNew(fileAvatar);
};

var onFileChoiceGallery = function () {
  getFileChoiceNew(fileGallery);
};

var getFileChoice = function () {
  fileAvatar.addEventListener('change', onFileChoiceAvatar);
  fileGallery.addEventListener('change', onFileChoiceGallery);
};

var removeFileChoice = function () {
  fileAvatar.removeEventListener('change', onFileChoiceAvatar);
  preview.src = fileAvatarStartSrc;
  fileGallery.removeEventListener('change', onFileChoiceGallery);
  removeImg();
};


window.previewImage = {
  getFileChoice: getFileChoice,
  removeFileChoice: removeFileChoice
};


})();

(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


var ifEscEvent = function (evt) {
  return evt.key === 'Escape';
};

window.utils = {
  ifEscEvent: ifEscEvent
};


})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var DEBOUNCE_INTERVAL = 300; // ms

window.debounce = function (cb) {
  var lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


})();

(() => {
/*!****************************!*\
  !*** ./js/load-message.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var errorTemplate = document.querySelector('#error').content.querySelector('.error');
var errorLoadTemplateClone = errorTemplate.cloneNode(true);

var onCloseErrorLoadPopup = function (evt) {
  if (evt.which === 1 || window.utils.ifEscEvent(evt)) {
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

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */



var URL = 'https://21.javascript.pages.academy/keksobooking/data'; /* Адрес по которому будет направляться запрос open.  */
var LOAD_METHOD = 'GET'; /* Метод которым должен быть получен ответ от сервера(Тип предоставления) */
var STATUS_OK = 200;
var TIMEOUT_IN_MS = 10000;

var load = function (onSuccess, onError) { /*  Это функция загрузки данных с сервера.Функция которая будет вызвана в другом файле а ее параметры это в будущем функции которые примут в себя заданные здесь параметры и сработают с ними в том файле в котором будет вызвана данная функция через глобольный экспорт/импорт */
  var xhr = new XMLHttpRequest(); /* Свойство XMLHttpRequest.readyState возвращает текущее состояние объекта XMLHttpRequest.*/
  xhr.responseType = 'json'; /* Преобразую за счет встроенных возможностей браузера текст строку в данные что бы не выполнять трансформации в ручную посредством - console.log(JSON.parse(xhr.responseText)); /* Отобразит полученные данные от сервера строкой по посредством JSON.parse преобразует полученную строку в данные.  */

  xhr.addEventListener('load', function () { /* Прослушиватель события загрузки xhr */
    if (xhr.status === STATUS_OK) { /* Условие для соблюдения которого изменения произошедшие в xhr должны соответствовать выполненным без ошибок что соответствует xhr.status 200 */
      onSuccess(xhr.response); /* В случае успешного выполнения загрузки функция получаемая из параметра будет выполнена с параметром который будет содержать в себе данные из xhr.response */
    } else {
      onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText); /* статус ответа + строка статуса ответа. */
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Критичесское время выполнения запроса сервера ' + xhr.timeout + 'мс' + ' пожалуйста, повторите операцию.');
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(LOAD_METHOD, URL); /* Как и куда хочу обратиться(Адрес от куда получить данные.) Подготовка к запросу.*/
  xhr.send(); /* Запуск отправки запроса на сервер. Получены данные которые содержатся в response и responseText */
};


window.backend = {/* Экспорт данных в область общей видимости. */
  load: load
};


})();

(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var URL = 'https://21.javascript.pages.academy/keksobooking';
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

  xhr.open('POST', URL);
  xhr.send(data);
};

window.upload = {
  submitData: submitData
};

})();

(() => {
/*!****************************!*\
  !*** ./js/send-message.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


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


})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var roomNumbers = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');
var roomPrice = document.querySelector('#price');
var roomType = document.querySelector('#type');

var MinPriceRoom = {
  'bungalo': '0',
  'flat': '1000',
  'house': '5000',
  'palace': '10000'
};

var onRoomNumbersCheck = function () { /* Функция проверки валидности заполнения полей комнат и количества гостей. */
  if (guestsNumber.options[guestsNumber.selectedIndex].value !== roomNumbers.options[roomNumbers.selectedIndex].value) { /* Если значение(количественное)value выбранному значению(в данный момент) номера не равно количественному значению комнат тогда выполнится условие */
    if (guestsNumber.options[guestsNumber.selectedIndex].value > roomNumbers.options[roomNumbers.selectedIndex].value || guestsNumber.options[guestsNumber.selectedIndex].value === '0' && roomNumbers.options[roomNumbers.selectedIndex].value > guestsNumber.options[guestsNumber.selectedIndex].value) { /* Если число гостей выбранное в данный момент превышает количество выбранных в данный момент комнат ИЛИ значение количества выбранных комнат строго равно 0 И количество выбранных комнат больше чем количество выбранных для заселения гостей(В данном случае если количество выбранных гостей равно 0 что подразумевает что комната выбрана не для заселения физ лиц а для аренды Юр лицом.) */
      roomNumbers.setCustomValidity('Некорректное значение');
      guestsNumber.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
      roomNumbers.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
    } else {
      roomNumbers.setCustomValidity(''); /* Убрать значение не соответствия валидации */
      guestsNumber.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
      roomNumbers.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
    }
  } else {
    roomNumbers.setCustomValidity(''); /* Убрать значение не соответствия валидации */
    guestsNumber.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
    roomNumbers.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
  }
};


var onRoomPriceCheck = function () {
  roomPrice.placeholder = roomPrice.min = MinPriceRoom[document.querySelector('#type').value]; /* Значения будут равны значению которое соответствует ключу в объекте который находится в MinPriceRoom  */
};

var timeIn = document.querySelector('#timein'); /* Получаю поле адреса заезда, устанавливаю слушатель события выбора, при выборе одного значения такое же значение будет передано в поле выезда. */
timeIn.onchange = function () {
  document.querySelector('#timeout').value = timeIn.value;
};


var timeOut = document.querySelector('#timeout'); /* Получаю адрес выезда устанавливаю слушатель события выбора который при выборе одного из установленных значений поля приравняет другое поле к этому же значению что подходит для логики выполнения задания. */
timeOut.onchange = function () {
  document.querySelector('#timein').value = timeOut.value;
};

var removeTitleCheck = function () {
  inputTitle.setCustomValidity(''); /* Убрать значение не соответствия валидации */
  inputTitle.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
  inputTitle.style.backgroundColor = ''; /* Убрать подсвет розовым неверного ответа */
};

var inputTitle = document.querySelector('#title');
var getTitleCheck = function () {
  if (inputTitle.value.length < inputTitle.min || inputTitle.value.length > inputTitle.max) {
    inputTitle.setCustomValidity('Количество вводимых символов составляет от ' + inputTitle.min + ' до ' + inputTitle.max);
    inputTitle.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
    inputTitle.style.backgroundColor = 'pink'; /* Подсвет розовым неверного ответа */
  } else {
    removeTitleCheck();
  }
};

var onGetTitleCheck = function () {
  getTitleCheck();
};


var addFieldCheck = function () {
  roomNumbers.addEventListener('change', onRoomNumbersCheck); /*  количество Комнат Изменения/Добавлен слушатель/обработчик событие change */
  guestsNumber.addEventListener('change', onRoomNumbersCheck); /*  количество Гостей Изменения/Добавлен слушатель/обработчик событие change */
  roomType.addEventListener('change', onRoomPriceCheck); /* Слушатель взаимодействия с полем выбора "типа жилья" */
  inputTitle.addEventListener('input', onGetTitleCheck); /* Слушатель корректного ввода длинны заголовка объявления. */
};

var removeFieldCheck = function () {
  roomNumbers.removeEventListener('change', onRoomNumbersCheck); /*  количество Комнат Изменения/Добавлен слушатель/обработчик событие change */
  guestsNumber.removeEventListener('change', onRoomNumbersCheck); /*  количество Гостей Изменения/Добавлен слушатель/обработчик событие change */
  roomType.removeEventListener('change', onRoomPriceCheck); /* Слушатель взаимодействия с полем выбора "типа жилья" */
  inputTitle.removeEventListener('input', onGetTitleCheck); /* Слушатель корректного ввода длинны заголовка объявления. */
};

window.validation = {
  onRoomNumbersCheck: onRoomNumbersCheck,
  onRoomPriceCheck: onRoomPriceCheck,
  addFieldCheck: addFieldCheck,
  removeFieldCheck: removeFieldCheck,
  removeTitleCheck: removeTitleCheck
};


})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var mapSection = document.querySelector('.map');
mapSection.classList.add('map--faded'); /* Добавляется неактивность для карты и содержимого */

var removeAttributeDisabled = function (data) { /*  Функция поочередно удаляющая атрибуты неактивности к полям */
  Array.from(data).forEach(function (value) {
    value.removeAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
  });
};

var setAttributeDisabled = function (data) {
  Array.from(data).forEach(function (value) {
    value.setAttribute('disabled', 'true'); /* Поочередное удаление атрибута к каждому филдсету полей. */
  });
};

window.map = {
  section: mapSection,
  removeAttributeDisabled: removeAttributeDisabled,
  setAttributeDisabled: setAttributeDisabled
};


})();

(() => {
/*!***********************!*\
  !*** ./js/address.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */


var MAP_PIN_MAIN_AFTER_TIP = 22; /* Высота ножки/острия для метки(Пина) */
var mapPinMain = document.querySelector('.map__pin--main'); /* Главный пин на карте */
var mapPinMainAddress = document.querySelector('#address'); /* Адрес(Поле) куда передаются данные о нахождении главного пина(Координаты) */

var firstCoords = {/* Сохраненное первозданное значение координат главной метки */
  x: mapPinMain.style.left,
  y: mapPinMain.style.top
};

var getStartCoords = function () { /* Стартовые координаты - вывод в поле */
  mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);
  return mapPinMainAddress.value;
};

var returnFirstCoordsMapPinMain = function () { /* Функция возвращения главное метки на первоначальное положение и передача координат данного положения в поле для вывода информации о адресе. */
  mapPinMain.style.left = firstCoords.x;
  mapPinMain.style.top = firstCoords.y;
  getStartCoords();
};

var getMoveCoords = function () { /* // Координаты центра для иглы метки: map__pin--main */
  mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop - (mapPinMain.offsetHeight / 2 + MAP_PIN_MAIN_AFTER_TIP));/* Вычитание из расстояния сверху до метки половины высоты(оставшейся половины высоты метки) и высоты дополнительного визуального элемента ножки/острия выполненного псевдоэлементом.  */
};

window.address = {
  getStartCoords: getStartCoords,
  getMoveCoords: getMoveCoords,
  returnFirstCoordsMapPinMain: returnFirstCoordsMapPinMain
};


})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var WIDTH_AVATAR = 50;
var HEIGHT_AVATAR = 70;
var START_NUMBER_ID = 1;
var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */

window.address.getStartCoords();

var renderPinCloneTemplateElements = function (item) { /* Относится к Рендеру Это функция которая сначала создает клон а потом просто присваивает этому клону необходимые значения. */
  var pinCloneTemplate = templatePin.cloneNode(true); /* Создаем переменную в которую записываем/копируем/клонируем элемент/переменную/Шаблон template со всем ее содержимым(Т.е. всю ее разметку вместе с детьми/если бы были.(true), если дети узла должны быть клонированы или false для того, чтобы был клонирован только указанный узел.) */
  var pinCloneTemplateImage = pinCloneTemplate.querySelector('img');
  pinCloneTemplateImage.src = item.author.avatar;
  pinCloneTemplateImage.alt = item.offer.title;
  pinCloneTemplateImage.id = item.author.id; /* Счетчик для id */
  pinCloneTemplate.style.left = (item.location.x - WIDTH_AVATAR / 2) + 'px';/* Изменение по оси x. Ширина объекта исходя из разметки составляет 50px. Т.к. точка 0 для отрисованного объекта в разметке находится в левом верхнем углу фигуры мы понимаем что нам необходимо сместить фигуру для получения нахождения острия отображаемого изображения на половину ее ширины, тем самым разделив ее ширину пополам. Для этого будет заведена константа WIDTH_AVATAR и разделена пополам непосредственно в выполняемом выражении а после вычтена из создаваемой координаты для определения положения элемента на оси Х.  */
  pinCloneTemplate.style.top = (item.location.y - HEIGHT_AVATAR) + 'px'; /* Высота = 70px Смещение по вертикали на высоту элемента путем вычитания из положения по оси У целого значения высоты элемента.*/
  return pinCloneTemplate;
};

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');/* ДОБАВЛЕНИЕ ЧЕРЕЗ template Создана переменная template(одноименна с названием элемента template) которая ищет элемент/шаблон template по id, после обращается к свойству данного элемента content(которое является единственным свойством данного элемента и предназначено для взаимодействия с его содержимым.) */
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins'); /* Переменная для нахождения блока с классом map__pins. (в последующем будет использоваться для добавления элементов в разметку посредством documentFragment)Это блок для отрисовки. */

var removeOlds = function () { /* Функция удаляющая пины из разметки */
  var mapPinsNoMain = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPinsNoMain.forEach(function (oldPin) { /* Удаляю элементы из разметки. */
    oldPin.remove();
  });
};

var renderCards = function (items) { /*  Функция добавления элементов в разметку посредством fragment. */

  removeOlds(); /* Удаляю старые пины */

  items.forEach(function (value, index) { /* Добавление в зависимости от количества подходящих вариантов/элементов. Цикл который добавляет элементы в разметку. (В виртуальную разметку-не меняет исходный HTML). */
    fragment.appendChild(renderPinCloneTemplateElements(value, index)); /* Добавлен передаваемый в функцию параметр index для создания счетчика для id */
  });

  mapPins.appendChild(fragment); /* Добавляем элемент|Фрагмент который представляет из себя элемент pin с всей разметкой и указанными нами свойствами в элемент с классом mapPins(внутрь данного элемента/вернее его клона) в конец. Это выполняется для т.н. накопления всех элементов этого блока для их совместной, последующей, единоразовой, последовательной отрисовки посредством использования fragment. */
  window.card.addOpeningProperty(items); /* Добавит слушатели на нажатие для отображаемых карточек объевлений */
};

var activateMainActions = function () { /* Главная функция активация карты(Нажатием на pin)*/
  adForm.classList.remove('ad-form--disabled');
  window.map.removeAttributeDisabled(window.form.liveElements);
  window.map.removeAttributeDisabled(window.form.liveMapFilterElements);
  window.map.section.classList.remove('map--faded');/* Удален класс map--faded из элемента с классом map */

  var onSuccess = function (data) {
    data.forEach(function (value, index) {
      value.author.id = index + START_NUMBER_ID;
    });

    window.pin.renderCards(window.filter.getVerification(data));
  };
  window.backend.load(onSuccess, window.loadMessage.getErrorPopup);/* Функция load принимает в себя параметры onSuccess, и onError  Это функция действий при загрузке данных с сервера.*/
  window.address.getMoveCoords();
  window.validation.onRoomNumbersCheck(); /* Проверка соответствия выбранного количества комнат - гостям. */
  window.validation.onRoomPriceCheck(); /* Проверка соответствия цены */
  window.validation.addFieldCheck(); /* Включены/ добавлены слушатели корректного ввода данных на страницу */
  window.previewImage.getFileChoice();
  window.form.getSubmitListener(); /* Слушатель кнопки отправки формы */
  window.form.getListenerResetValue(); /* Слушатель кнопки сброса формы  */
};

window.pin = {
  activateMainActions: activateMainActions,
  renderCards: renderCards,
  removeOlds: removeOlds
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var ADS_NUM = 5;
var mapFilters = document.querySelector('.map__filters');
var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = document.querySelector('#housing-features');

var Prices = {
  min: 10000,
  max: 50000
};

var checkPrice = function (element) {
  switch (housingPrice.value) {
    case 'any':
      return true; /* Если выбрано any возвращается true  */
    case 'low':
      return (element.offer.price < Prices.min); /* true false */
    case 'middle':
      return (element.offer.price > Prices.min) && (element.offer.price < Prices.max);
    case 'high':
      return (element.offer.price > Prices.max);
    default:
      return element === housingPrice.value;
  }
};

var dataSave = []; /* Создаю пустой массив в который передам data для его последующего использования при фильтрации. */


var requiredFeatures = function () {
  return Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (item) { /* Сначала Будет создана коллекция/псевдомассив из выбранных значений housingFeatures далее с помощью array.from он будет преобразован в реальный массив состоящий из выбранных значений и уже с помощью map будет создан новый массив который будет состоять из значений выбранных элементов */
    return item.value;
  });
};

var getVerification = function (data) { /* Функция которая осуществит проверку соответствия пинов заявленым в фильтре требованиям. */
  dataSave = data;

  return data
      .filter(function (element) {
        var isOfferMatched = !!(element.offer);
        var isTypeMatched = housingType.value === 'any' ? true : element.offer.type === housingType.value; /* isTypeMatched если значение housingType.value равно 'any' тогда выполняется true - утверждение верно и выполнятеся следующая проверка/строка условие если же нет то выполняется вторая часть а именно element.offer.type === housingType.value которы  */
        var isRoomsMatched = housingRooms.value === 'any' ? true : element.offer.rooms === +housingRooms.value; /* + это как number унарный оператор. */
        var isGuestMatched = housingGuests.value === 'any' ? true : element.offer.guests === +housingGuests.value;
        var isPriceMatched = checkPrice(element);
        var isFeaturesMatched = requiredFeatures().every(function (feature) {
          return element.offer.features.includes(feature);
        });
        return isOfferMatched && isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeaturesMatched;
      }).slice(0, ADS_NUM); /* .slice(0, ADS_NUM) создает новый массив в котором будут находиться элементы с 0 по 4 (Это с 1 по 5 включительно) он как бы вырежет из массива слева те элементы массива которые мне нужны.  */
};

var onFilterChange = window.debounce(function () {
  window.card.popupDelete(); /* Функция которая удалит открытый попап/карточку объявления при условии что она открыта. */
  window.pin.renderCards(getVerification(dataSave));
});

mapFilters.addEventListener('change', onFilterChange);

window.filter = {
  getVerification: getVerification
};



})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */


var FeaturesClass = {
  wifi: 'popup__feature--wifi',
  dishwasher: 'popup__feature--dishwasher',
  parking: 'popup__feature--parking',
  washer: 'popup__feature--washer',
  elevator: 'popup__feature--elevator',
  conditioner: 'popup__feature--conditioner'
};

var ApparmentType = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

/* Функция удаления попапа по клику. Уничтожает сам себя (обработчик по клику onPopupCloseClick) и  обработчик по Эск onPopupCloseEsc */
var addPopupCloseListeners = function () {
  document.querySelector('.popup__close').addEventListener('mousedown', onPopupCloseClick);
  document.querySelector('.popup__close').addEventListener('keydown', onPopupCloseClick);
  document.addEventListener('keydown', onPopupCloseEsc);
};

var popupDelete = function () { /* Удаление старого попапа при условии что он есть. */
  var popup = document.querySelector('.popup');
  if (popup !== null) {
    document.removeEventListener('keydown', onPopupCloseEsc);
    document.querySelector('.popup__close').removeEventListener('mousedown', onPopupCloseClick);
    document.querySelector('.popup').remove();
  }
};

var onPopupCloseEsc = function (evt) { /* Функция удаления попапа по Эскейпу. Выполняет условие что если нажат Эскейп и если попап не равен null т.е. ничему то удаляет сначала себя onPopupCloseEsc потом обработчика по клику onPopupCloseClick а затем удаляет попап. */
  if (window.utils.ifEscEvent(evt)) {
    popupDelete();
    activePinClassDelete(); /* Функция для снятия класса с неактивной метки объявления */
  }
};

var getPopupCloseClick = function (evt) { /* Удаление попапа через клик */
  if (evt.which === 1 || evt.key === 'Enter') {
    document.querySelector('.popup__close').removeEventListener('mousedown', onPopupCloseClick);
    document.querySelector('.popup__close').removeEventListener('keydown', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupCloseEsc);
    document.querySelector('.popup').remove();
    activePinClassDelete(); /* Функция для снятия класса с неактивной метки объявления */
  }
};

var onPopupCloseClick = function (evt) {
  getPopupCloseClick(evt);
};

var addOpeningProperty = function (data) { /* Добавление слушателя на каждое объявление Добавлено в pin renderCards */

  var getCardVisible = function (evt) {
    popupDelete();
    activePinClassDelete();/* Функция для снятия класса с неактивной метки объявления */
    evt.currentTarget.classList.add('map__pin--active'); /* Добавляю активное состояние метке посредством присвоения необходимого класса элементу полученному посредством получения элемента на котором был установлен слушатель. */

    var templatePopup = document.querySelector('#card').content.querySelector('.popup'); /* Получить шаблон который смогу заполнить данными полученными от метки на которую было выполнено нажатие. */
    var templatePopupClone = templatePopup.cloneNode(true); /* Хочу сделать клон указанного шаблона */
    var targetCard = data.find(function (card) { /* Поиск элемента поле offer.id которого совпадает с id-ом  */ /* Функция вызывается на массиве, переберает его элементы на предмет соответствия указанного нами значения(В частности evt.target.id-мгновенное значение из обекта с которым было выполнено взаимодействие), при совпадении с данным элементом вернет объект в котором он находится в переменную targetCard */
      if (evt.target.type === 'button') {
        var searchImg = evt.target.querySelector('img');
        return card.author.id.toString() === searchImg.id;
      } else {
        return card.author.id.toString() === evt.target.id;
      }
    });
    if (targetCard.offer.title) {
      templatePopupClone.querySelector('.popup__title').textContent = targetCard.offer.title;
    }
    if (targetCard.offer.address) {
      templatePopupClone.querySelector('.popup__text--address').textContent = targetCard.offer.address;
    }
    if (targetCard.offer.price) {
      templatePopupClone.querySelector('.popup__text--price').textContent = targetCard.offer.price + ' ₽/ночь';
    }
    if (targetCard.offer.rooms && targetCard.offer.guests) {
      templatePopupClone.querySelector('.popup__text--capacity').textContent = targetCard.offer.rooms + ' комнаты для ' + targetCard.offer.guests + ' гостей.';
    }
    if (targetCard.offer.checkin && targetCard.offer.checkout) {
      templatePopupClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + targetCard.offer.checkin + ', выезд до ' + targetCard.offer.checkout;
    }

    if (targetCard.offer.features.length !== 0) {
      targetCard.offer.features.forEach(function (el) {
        var cloneFeature = templatePopup.querySelector('.popup__feature').cloneNode(true);
        cloneFeature.classList.add(FeaturesClass[el]);
        templatePopupClone.querySelector('.popup__features').appendChild(cloneFeature);
      });
      templatePopupClone.querySelectorAll('.popup__feature')[0].remove();
    } else {
      templatePopupClone.querySelector('.popup__features').remove();
    }

    if (targetCard.offer.description) {
      templatePopupClone.querySelector('.popup__description').textContent = targetCard.offer.description;
    }

    if (targetCard.author.avatar) {
      templatePopupClone.querySelector('.popup__avatar').src = targetCard.author.avatar;
    }

    if (targetCard.offer.type) {
      templatePopupClone.querySelector('.popup__type').textContent = ApparmentType[targetCard.offer.type];
    }

    if (targetCard.offer.photos.length !== 0) {
      targetCard.offer.photos.forEach(function (el) {
        templatePopup.querySelector('.popup__photo').src = el;
        templatePopupClone.querySelector('.popup__photos').appendChild(templatePopup.querySelector('.popup__photo').cloneNode(true));
      });
      templatePopupClone.querySelectorAll('.popup__photo')[0].remove();
    }

    var mapPins = document.querySelector('.map__pins');
    mapPins.after(templatePopupClone); /* Отображаю полученный шаблон с внесенными в него данными на странице в виде попапа*/

    addPopupCloseListeners();
  };

  var onNoMainPinMouseOrKeyDown = function (evt) { /* Эта функция запустит функцию по отображению карточки и функцию по добавлению слушателей на закрытие данного попапа. */
    if (evt.which === 1 || evt.key === 'Enter') {
      getCardVisible(evt);
    }
  };

  var mapPinsNoMainNew = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPinsNoMainNew.forEach(function (pinCard) { /* Добавляю слушателей для пинов без главного перебирая их на каждом элементе полученного массива. */
    pinCard.addEventListener('mousedown', onNoMainPinMouseOrKeyDown);
    pinCard.addEventListener('keydown', onNoMainPinMouseOrKeyDown);
  });

};

var activePinClassDelete = function () { /* Удаление старого попапа при условии что он есть. */
  var activePin = document.querySelector('.map__pin--active');
  if (activePin !== null) {
    activePin.classList.remove('map__pin--active');
  }
};

window.card = {
  addOpeningProperty: addOpeningProperty,
  popupDelete: popupDelete
};

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */



var MAX_Y_TOP = 130;
var MAX_Y_BOTTOM = 630;
var mapPinMain = document.querySelector('.map__pin--main');
var dragged = true;
var halfPinMain = mapPinMain.offsetWidth / 2;
var minX = window.map.section.offsetWidth - window.map.section.offsetWidth - halfPinMain;
var maxX = window.map.section.offsetWidth - halfPinMain;

var getDraggedSwitch = function () {
  if (dragged) {
    window.pin.activateMainActions(); /* Запуск главной функции активации страницы */
  }
  dragged = false; /* Изменение флага удаляет повторный запуск отрисовки объявлений.*/
};

var onMapPinMainPress = function (evt) { /* слушатель Действия при нажатии мыши на объекте. */

  if (evt.key === 'Enter') {
    getDraggedSwitch(); /* Переключатель возможности активации главной метки. */
  }

  if (evt.which === 1) {
    evt.preventDefault(); /* Отменил действие при нажатии на кнопку по умолчанию.  */
    getDraggedSwitch(); /* Переключатель возможности активации главной метки. */
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault(); /* Отменили действие по умолчанию для движения. */

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var newTopCoordinate = mapPinMain.offsetTop - shift.y;
      var newLeftCoordinate = mapPinMain.offsetLeft - shift.x;

      if (newTopCoordinate < MAX_Y_TOP) {
        newTopCoordinate = MAX_Y_TOP;
      } else if (newTopCoordinate > MAX_Y_BOTTOM) {
        newTopCoordinate = MAX_Y_BOTTOM;
      } else {
        newTopCoordinate = mapPinMain.offsetTop - shift.y;
      }

      if (newLeftCoordinate < minX) {
        newLeftCoordinate = minX;
      } else if (newLeftCoordinate > (maxX)) {
        newLeftCoordinate = maxX;
      } else {
        newLeftCoordinate = mapPinMain.offsetLeft - shift.x;
      }

      mapPinMain.style.top = newTopCoordinate + 'px';
      mapPinMain.style.left = newLeftCoordinate + 'px';

      window.address.getMoveCoords();
    };
    var onMouseUp = function (upEvt) { /* Действия при поднятии клавиши. будет удален слушатель перемещения курсора мыши и удалит слушатель поднятия клавиши сам себя. */
      upEvt.preventDefault(); /* Перестал слушать движения мыши */
      document.removeEventListener('mousemove', onMouseMove); /* Удаляется обработчик движения для прекращения движения элемента */
      document.removeEventListener('mouseup', onMouseUp);/* Удаляет сам себя - удаляет слушатель/обработчик поднятия клавиши на документе. */
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
};

var activateMainPinRestart = function () {
  dragged = true;
};

var activateMainPin = function () {
  mapPinMain.addEventListener('mousedown', onMapPinMainPress);
  mapPinMain.addEventListener('keydown', onMapPinMainPress);
};

activateMainPin();

window.move = {
  activateMainPin: activateMainPin,
  activateMainPinRestart: activateMainPinRestart
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable no-var */


var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */
var liveElements = document.querySelector('.ad-form').children; /* Внутри находится коллекция дочерних элементов */
var liveMapFilterElements = document.querySelector('.map__filters').children; /* Внутри находится коллекция дочерних элементов */
adForm.classList.add('ad-form--disabled');

var getDisabledField = function () {
  window.map.setAttributeDisabled(liveElements); /* Сделал неактивными поля формы */
  window.map.setAttributeDisabled(liveMapFilterElements); /* Сделал неактивными поля фильтра на карте. */
};
getDisabledField();

var formReset = function () {
  window.map.section.classList.add('map--faded'); /* Добавляется неактивность для пина изменяется его визуальное отображение.*/
  adForm.classList.add('ad-form--disabled'); /* Добавил полям формы класс дезактивации */
  getDisabledField(); /* Убрал активность полей */
  removeSubmitListener(); /* Удалил слушатель кнопки отправки */
  removeListenerResetValue(); /* Удалил слушатель кнопки рестарта */
  window.previewImage.removeFileChoice(); /* Удалил слушатели и деактивировал предварительные изображения для поля аватара и фотографии жилья. */
  document.querySelector('.map__filters').reset(); /* Обнулил поля формы фильтра-пинов/объявлений. */
  adForm.reset(); /* Обнулил поля формы */
  window.validation.removeFieldCheck();/* Удаляю слушатели полей формы*/
  window.pin.removeOlds(); /* Удаляю метки похожих объявлений проверяю, если есть удаляю обработчики. */
  window.card.popupDelete(); /* Удаляю  если есть карточку активного объявления.*/
  window.address.returnFirstCoordsMapPinMain(); /* Возвращяю метку в исходное положение, передаю координаты в поле адреса. */
  window.move.activateMainPinRestart(); /* Изменяю флаг для возможности переиспользования функции активации главного пина */
  window.move.activateMainPin(); /* Активирую главный пин. */
  window.validation.removeTitleCheck();
  window.validation.onRoomNumbersCheck();
};

var onFormReset = function (evt) {
  evt.preventDefault(); /* отменил действие формы по умолчанию */
  formReset();
};

var resetButton = adForm.querySelector('.ad-form__reset');

var getListenerResetValue = function () {
  resetButton.addEventListener('click', onFormReset);
};

var removeListenerResetValue = function () {
  resetButton.removeEventListener('click', onFormReset);
};

var onSuccess = function () {
  formReset();
  window.sendMessage.getSuccessPopup(); /* Сообщение о успешной отправке формы */
};

var getSubmit = function () {
  window.upload.submitData(new FormData(adForm), onSuccess, window.sendMessage.getErrorPopup);
};

var onSubmitCheck = function (evt) {
  try {
    getSubmit();
    evt.preventDefault(); /* отменил действие формы по умолчанию */
  } catch (error) {
    evt.preventDefault(); /* отменил действие формы по умолчанию */
    window.sendMessage.getErrorPopup(error);
  }
};

var getSubmitListener = function () {
  adForm.addEventListener('submit', onSubmitCheck);
};

var removeSubmitListener = function () {
  adForm.removeEventListener('submit', onSubmitCheck);
};

window.form = {
  liveElements: liveElements,
  liveMapFilterElements: liveMapFilterElements,
  getSubmitListener: getSubmitListener,
  getListenerResetValue: getListenerResetValue
};



})();

/******/ })()
;