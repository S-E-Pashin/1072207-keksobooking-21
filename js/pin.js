/* eslint-disable no-var */
'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */
  var WIDTH_AVATAR = 50;
  var HEIGHT_AVATAR = 70;

  var map = document.querySelector('.map');
  var START_NUMBER_ID = 1;

  window.address.onStartCoords();

  var renderPinCloneTemplateElements = function (item) { /* Относится к Рендеру Это функция которая сначала создает клон а потом просто присваивает этому клону необходимые значения. *//* Отрисовщик ( А отрисовщик ли это? больше он похож на сборочную машину формирующую элементы.) данных на карте/может стоит отделить? */
    var pinCloneTemplate = templatePin.cloneNode(true); /* Создаем переменную в которую записываем/копируем/клонируем элемент/переменную/Шаблон(вернее шаблон, просто задан переменной.) template со всем ее содержимым(Т.е. всю ее разметку вместе с детьми/если бы были.(true), если дети узла должны быть клонированы или false для того, чтобы был клонирован только указанный узел.) */
    var pinCloneTemplateImage = pinCloneTemplate.querySelector('img');

    pinCloneTemplateImage.src = item.author.avatar;
    pinCloneTemplateImage.alt = item.offer.title;
    pinCloneTemplateImage.id = item.author.id; /* Счетчик для id */
    pinCloneTemplate.style.left = (item.location.x - WIDTH_AVATAR / 2) + 'px';/* Изменение по оси x. Ширина объекта исходя из разметки составляет 50px. Т.к. точка 0 для отрисованного объекта в разметке находится в левом верхнем углу фигуры мы понимаем что нам необходимо сместить фигуру для получения нахождения острия отображаемого изображения на половину ее ширины, тем самым разделив ее ширину пополам. Для этого будет заведена константа WIDTH_AVATAR и разделена пополам непосредственно в выполняемом выражении а после вычтена из создаваемой координаты для определения положения элемента на оси Х.  */
    pinCloneTemplate.style.top = (item.location.y - HEIGHT_AVATAR) + 'px'; /* Высота = 70px Смещение по вертикали на высоту элемента путем вычитания из положения по оси У целого значения высоты элемента.*/

    return pinCloneTemplate;
  };

  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');/* ДОБАВЛЕНИЕ ЧЕРЕЗ template// Создана переменная template(одноименна с названием элемента template) которая ищет элемент/шаблон template по id, после обращается к свойству данного элемента content(которое является единственным свойством данного элемента и предназначено для взаимодействия с его содержимым.) */
  var fragment = document.createDocumentFragment();/* Относится к Рендеру */
  var mapPins = document.querySelector('.map__pins');/* Относится к Рендеру *//* Переменная для нахождения блока с классом map__pins. (в последующем будет использоваться для добавления элементов в разметку посредством documentFragment)Это блок для отрисовки. */
  var NUMBER_ITEMS_DISPLAY_MAX = 5;

  var removeOldPins = function () { /* Функция удаляющая пины из разметки */
    var mapPinNoMain = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNoMain.forEach(function (oldPin) { /* Удаляю элементы из разметки. */
      oldPin.remove();
    });
  };

  var renderPinCards = function (items) { /*  Функция добавления элементов в разметку посредством fragment. */

    removeOldPins(); /* Удаляю старые пины */

    var numberItemsDisplay = items.length < NUMBER_ITEMS_DISPLAY_MAX ? items.length : NUMBER_ITEMS_DISPLAY_MAX; /* Количество отображаемых элементов = В зависимость количества отображаемых элементов от разрешенной максимальной длинны и длинны полученного массива. Тернарная операция: Переменная = Условие1 < Условие2 ? true действия/значение если верно : fals действия/ значение если условие неверно. */
    for (var i = 0; i < numberItemsDisplay; i++) { /* Добавление в зависимости от количества подходящих вариантов/элементов. Цикл который добавляет элементы в разметку. (В виртуальную разметку-не меняет исходный HTML). */
      fragment.appendChild(renderPinCloneTemplateElements(items[i], i)); /* Добавлен передаваемый в функцию параметр i для создания счетчика для id */
    }
    mapPins.appendChild(fragment); /* Добавляем элемент|Фрагмент который представляет из себя элемент pin с всей разметкой и указанными нами свойствами в элемент с классом mapPins(внутрь данного элемента/вернее его клона) в конец. Это выполняется для т.н. накопления всех элементов этого блока для их совместной, последующей, единоразовой, последовательной отрисовки посредством использования fragment. */
    window.card.addOpeningProperty(items); /* Добавит слушатели на нажатие для отображаемых карточек объевлений */
  };

  var mapPinMainActions = function () { /* Главная функция активация карты(Нажатием на pin)*/
    adForm.classList.remove('ad-form--disabled');
    window.map.removeAttributeDisabled(window.form.liveElements);
    window.map.removeAttributeDisabled(window.form.liveMapFilterElements);
    map.classList.remove('map--faded');/* Удален класс map--faded из элемента с классом map */ /* Удаляется согласно 4 заданию */

    var onSuccess = function (data) {
      data.forEach(function (value, index) {
        value.author.id = index + START_NUMBER_ID;
      });

      window.pin.renderPinCards(window.filter.verification(data));
    };
    window.backend.load(onSuccess, window.loadMessage.getErrorPopup);/* Функция load принимает в себя параметры onSuccess, и onError  Это функция действий при загрузке данных с сервера.*/
    window.address.onMoveCoords();
    window.validation.onRoomNumbersCheck(); /* Проверка соответствия выбранного количества комнат - гостям. */
    window.validation.onRoomPriceCheck(); /* Проверка соответствия цены */
    window.validation.addFieldCheck(); /* Включены/ добавлены слушатели корректного ввода данных на страницу */
    window.form.getSubmitListener(); /* Слушатель кнопки отправки формы */
    window.form.getListenerResetValue(); /* Слушатель кнопки сброса формы  */
  };

  window.pin = {
    mapPinMainActions: mapPinMainActions,
    renderPinCards: renderPinCards,
    removeOldPins: removeOldPins
  };
})();
