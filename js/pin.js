/* eslint-disable no-var */
'use strict';
(function () {
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
    window.form.getSubmitListener(); /* Слушатель кнопки отправки формы */
    window.form.getListenerResetValue(); /* Слушатель кнопки сброса формы  */
  };

  window.pin = {
    activateMainActions: activateMainActions,
    renderCards: renderCards,
    removeOlds: removeOlds
  };
})();
