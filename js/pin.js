'use strict';
(function () {
  var adForm = document.querySelector('.ad-form'); /* Находится форма для отправки из разметки */
  var WIDTH_AVATAR = 50;
  var HEIGHT_AVATAR = 70;

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main'); /* Главный пин на карте */
  var mapPinMainAddress = document.querySelector('#address'); /* Адрес(Поле) куда передаются данные о нахождении главного пина(Координаты) */
  var MAP_PIN_MAIN_AFTER_TIP = 22; /* Высота ножки/острия для метки(Пина) */
  // Корректировка расположения точки пина в неактивном состоянии.
  // // Координаты центра метки:
  mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop + mapPinMain.offsetHeight / 2);

  // ############# РЕНДЕР --- ВОЗМОЖНО ЭТОТ КОД БУДЕТ ПЕРЕНЕСЕН ##########################
  var renderPinCloneTemplateElements = function (item) { /* Относится к Рендеру *//* Отрисовщик ( А отрисовщик ли это? больше он похож на сборочную машину формирующую элементы.) данных на карте/может стоит отделить? */
    var pinCloneTemplate = templatePin.cloneNode(true);/* Создаем переменную в которую записываем/копируем/клонируем элемент/переменную/Шаблон(вернее шаблон, просто задан переменной.) template со всем ее содержимым(Т.е. всю ее разметку вместе с детьми/если бы были.(true), если дети узла должны быть клонированы или false для того, чтобы был клонирован только указанный узел.) */
    var pinCloneTemplateImage = pinCloneTemplate.querySelector('img');

    pinCloneTemplateImage.src = item.author.avatar;
    pinCloneTemplateImage.alt = item.offer.title;

    pinCloneTemplate.style.left = (item.location.x - WIDTH_AVATAR / 2) + 'px';/* Изменение по оси x. Ширина объекта исходя из разметки составляет 50px. Т.к. точка 0 для отрисованного объекта в разметке находится в левом верхнем углу фигуры мы понимаем что нам необходимо сместить фигуру для получения нахождения острия отображаемого изображения на половину ее ширины, тем самым разделив ее ширину пополам. Для этого будет заведена константа WIDTH_AVATAR и разделена пополам непосредственно в выполняемом выражении а после вычтена из создаваемой координаты для определения положения элемента на оси Х.  */
    pinCloneTemplate.style.top = (item.location.y - HEIGHT_AVATAR) + 'px'; /* Высота = 70px Смещение по вертикали на высоту элемента путем вычитания из положения по оси У целого значения высоты элемента.*/

    return pinCloneTemplate;
  };

  // var saveAllCards = window.data.createAllCards(); /* Переменная которая хранит массив с объектами.Запускаем выполнение функции по формированию массива с объектами. */
  // console.log(window.data.createAllCards());
  // console.log(window.xhr.response);
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');/* ДОБАВЛЕНИЕ ЧЕРЕЗ template// Создана переменная template(одноименна с названием элемента template) которая ищет элемент/шаблон template по id, после обращается к свойству данного элемента content(которое является единственным свойством данного элемента и предназначено для взаимодействия с его содержимым.) */
  var fragment = document.createDocumentFragment();/* Относится к Рендеру */
  var mapPins = document.querySelector('.map__pins');/* Относится к Рендеру *//* Переменная для нахождения блока с классом map__pins. (в последующем будет использоваться для добавления элементов в разметку посредством documentFragment)Это блок для отрисовки. */
  var NUMBER_ITEMS_DISPLAY_MAX = 5;


  var renderPinCards = function (items) { /*  Функция добавления элементов в разметку посредством fragment. */
    var mapPinNoMain = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNoMain.forEach(function (oldPin) { /* Удаляю элементы из разметки. */
      oldPin.remove();
    });

    var numberItemsDisplay = items.length < NUMBER_ITEMS_DISPLAY_MAX ? items.length : NUMBER_ITEMS_DISPLAY_MAX; /* Количество отображаемых элементов = В зависимость количества отображаемых элементов от разрешенной максимальной длинны и длинны полученного массива. Тернарная операция: Переменная = Условие1 < Условие2 ? true действия/значение если верно : fals действия/ значение если условие неверно. */

    for (var i = 0; i < numberItemsDisplay; i++) { /* Добавление в зависимости от количества подходящих вариантов/элементов. Цикл который добавляет элементы в разметку. (В виртуальную разметку-не меняет исходный HTML). */
      fragment.appendChild(renderPinCloneTemplateElements(items[i]));
    }
    mapPins.appendChild(fragment); /* Добавляем элемент|Фрагмент который представляет из себя элемент pin с всей разметкой и указанными нами свойствами в элемент с классом mapPins(внутрь данного элемента/вернее его клона) в конец. Это выполняется для т.н. накопления всех элементов этого блока для их совместной, последующей, единоразовой, последовательной отрисовки посредством использования fragment. */

    /* 3.3 начало Элемент для попапа - примет в себя данные(data или если изменится в фильтре newData которые здесь именуются как items)  */
    window.card.addOpeningProperty(items); /* Добавит слушатели на нажатие для отображаемых карточек объевлений */
    /* 3.3 Конец*/
  };
  // ############# РЕНДЕР-КОНЕЦ --- ВОЗМОЖНО ЭТОТ КОД БУДЕТ ПЕРЕНЕСЕН ##########################

  var mapPinMainActions = function () { /* Главная функция активация карты(Нажатием на pin)*/
    adForm.classList.remove('ad-form--disabled');

    window.map.removeAttributeDisabled(window.form.liveElements);
    window.map.removeAttributeDisabled(window.form.liveMapFilterElements);

    map.classList.remove('map--faded');/* Удален класс map--faded из элемента с классом map */ /* Удаляется согласно 4 заданию */

    /* Отрисовка в активном состоянии */

    var onSuccess = function (data) {
      // Возможно добавлю копирование первозданного ассива данных для возможного сравнения. (В лекции упоминалось.) Для этого data сохраню а в функцию передам копию.
      window.filter.pins(data); /* renderPinCards(saveAllCards);было. Теперь  */
      // console.log('Pin^Данные из onSuccess - data');
      // console.log(data); /* Данные которые были переданы в функцию посредством полученного в файле backend  объекта/ов и переданного посредством функции в параметр которой*/
    };

    var onError = function () {
      // console.log('Ошибка');
      // alert('Ошибка!')
    };


    window.backend.load(onSuccess, onError);/* Функция load принимает в себя параметры onSuccess, и onError  Это функция действий при загрузке данных с сервера.*/

    // Корректировка расположения точки в активном состоянии.
    /* // Координаты центра для иглы метки: map__pin--main */
    mapPinMainAddress.value = Math.round(mapPinMain.offsetLeft - mapPinMain.offsetWidth / 2) + ', ' + Math.round(mapPinMain.offsetTop - (mapPinMain.offsetHeight / 2 + MAP_PIN_MAIN_AFTER_TIP));/* Вычитание из расстояния сверху до метки половины высоты(оставшейся половины высоты метки) и высоты дополнительного визуального элемента ножки/острия выполненного псевдоэлементом.  */

    window.validation.onRoomNumbersCheck(); /* Проверка соответствия выбранного количества комнат - гостям. */
    window.validation.roomNumbers.addEventListener('change', window.validation.onRoomNumbersCheck); /*  количество Комнат Изменения/Добавлен слушатель/обработчик событие change */
    window.validation.guestsNumber.addEventListener('change', window.validation.onRoomNumbersCheck); /*  количество Гостей Изменения/Добавлен слушатель/обработчик событие change */
    window.validation.onRoomPriceCheck();
  };

  var onMainPinMouseOrKeyDown = function (evt) { /* Функция которая(Запустит действия при активации страницы) будет передана в слушатель */
    if (evt.which === 1 || evt.key === 'Enter') {
      mapPinMainActions();
      mapPinMain.removeEventListener('mousedown', onMainPinMouseOrKeyDown);/* // Удаление слушателя(Убрать эффект постоянного прибавления) mousedown */
    }
    window.validation.roomNumbers.addEventListener('change', window.validation.onRoomNumbersCheck);/* Слушатель выбора количества комнат который подскажет для какого количества гостей они предназначены. */

    window.validation.roomType.addEventListener('change', window.validation.onRoomPriceCheck); /* Слушатель взаимодействия с полем выбора "типа жилья" */
    // window.validation.roomPrice.addEventListener('change', console.log(roomPrice.value)); /* Как считывать в реальном времени? */
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseOrKeyDown); /* Добавлен слушатель/обработчик на событие mousedown + клик левой клавишей мыши*/

  window.pin = {
    renderPinCards: renderPinCards
  };
})();