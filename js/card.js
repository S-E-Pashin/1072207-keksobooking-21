'use strict';

(function () {
  /* TODO Новая идея:
  что если присваивать каждому элементу картинке не просто id как данные data  а своего рода все данные из данных с сервера. */
  // id в начале
  // пин равный ид.
  /* Мысль следующая - 1. не пытаться получить все данные из мгновенного evt т.к. не могу найти где найти по этому поводу информацию.
  2. Получить данные data которые формируются при отрисовке элементов на отрисовку(да их больше чем отрисовывается но это не существенно.).
  3. При нажатии на объявление сравнить данные evt.target.alt с перебираемыми объектами из массива data.offer.title (console.log(data[2].offer.title);) а именно текстовым содержимым popup__title
  4. Выполнить формирование всплывающего попапа
  5. Отобразить всплывающий попап.
  6. Добавить проверку что если каких то данных нет то условие не выполняется.*/

  var addOpeningProperty = function (data) { /* Добавлено в pin renderPinCards */

    // Необходимо наполнить действиями с карточкой объявлений.
    var onCardVisible = function (evt) { /* evt мгновенный снимок того с чем только что произошло событие именно в этот момент! */
      var popup = document.querySelector('.popup');
      // console.log(popup);
      // popup.remove();

      (popup !== null) ? popup.remove(): ''; /* Условие для удаления старого попапа.  */


      /* 1. хочу получить шаблон который смогу заполнить данными полученными от метки на которую было выполнено нажатие. */
      var templatePopup = document.querySelector('#card').content.querySelector('.popup');
      /* 2. Хочу сделать клон указанного шаблона */
      var templatePopupClone = templatePopup.cloneNode(true);

      /* 3. При нажатии на объявление сравнить данные evt.target.alt с перебираемыми объектами из массива data.offer.title (console.log(data[2].offer.title);) */

      // ##################
      // TODO Модифицировать, вместо альта использовать data-id
      // var targetCard = data.find(item => item.author.id === evt.target.id); /* Поиск элемента поле offer.title которого совпадает с alt-ом  */
      var targetCard = data.find(function (card) { /* Функция вызывается на массиве, переберает его элементы на предмет соответствия указанного нами значения(В частности evt.target.id-мгновенное значение из обекта с которым было выполнено взаимодействие), при совпадении с данным элементом вернет объект в котором он находится в переменную targetCard */
        return card.author.id == evt.target.id;
      });
      // #################

      /* 4. Хочу внести данныe из полученного в результате нажатия элемента evt в клон шаблона попапа. */

      // var titlePopup = templatePopupClone.querySelector('.popup__title');
      // titlePopup.textContent = targetCard.offer.title;
      if(targetCard.offer.title) {templatePopupClone.querySelector('.popup__title').textContent = targetCard.offer.title}; /* Протестировано*/

      // var textAddressPopup = templatePopupClone.querySelector('.popup__text--address');
      // textAddressPopup.textContent = targetCard.offer.address;
      if(targetCard.offer.address) {templatePopupClone.querySelector('.popup__text--address').textContent = targetCard.offer.address}; /* Протестировано*/

      // var textPricePopup = templatePopupClone.querySelector('.popup__text--price');
      // textPricePopup.textContent = targetCard.offer.price + ' ₽/ночь';
      if(targetCard.offer.price) {templatePopupClone.querySelector('.popup__text--price').textContent = targetCard.offer.price + ' ₽/ночь'};

      var apparmentType = {
          flat: 'Квартира',
          bungalo: 'Бунгало',
          house: 'Дом',
          palace: 'Дворец'
      }
      // var typePopup = templatePopupClone.querySelector('.popup__type');
      // typePopup.textContent = apparmentType[targetCard.offer.type];
      if(targetCard.offer.type) {templatePopupClone.querySelector('.popup__type').textContent = apparmentType[targetCard.offer.type]};

    /* Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей. */

    // var textCapacityPopup = templatePopupClone.querySelector('.popup__text--capacity');
    // textCapacityPopup.textContent = targetCard.offer.rooms + ' комнаты для ' + targetCard.offer.guests + ' гостей.';/* TODOF в будущем, можно улучшить условием если больше какого то числа то окончание камнат/ы изменяется */
      if(targetCard.offer.rooms && targetCard.offer.guests) {templatePopupClone.querySelector('.popup__text--capacity').textContent = targetCard.offer.rooms + ' комнаты для ' + targetCard.offer.guests + ' гостей.'};/* TODOF в будущем, можно улучшить условием если больше какого то числа то окончание камнат/ы изменяется */

      /* Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00. */

      // var textTimePopup = templatePopupClone.querySelector('.popup__text--time');
      // textTimePopup.textContent = 'Заезд после ' +  targetCard.offer.checkin + ', выезд до ' + targetCard.offer.checkout;
      if(targetCard.offer.checkin && targetCard.offer.checkout) {templatePopupClone.querySelector('.popup__text--time').textContent = 'Заезд после ' +  targetCard.offer.checkin + ', выезд до ' + targetCard.offer.checkout};


      /* В список .popup__features выведите все доступные удобства в объявлении. */

      // var featuresPopup = templatePopupClone.querySelector('.popup__features');
      // featuresPopup.textContent = targetCard.offer.features;
      if(targetCard.offer.features) {templatePopupClone.querySelector('.popup__features').textContent = targetCard.offer.features};

      /* В блок .popup__description выведите описание объекта недвижимости offer.description. */

      // var descriptionPopup = templatePopupClone.querySelector('.popup__description');
      // descriptionPopup.textContent = targetCard.offer.description;
      if(targetCard.offer.description) {templatePopupClone.querySelector('.popup__description').textContent = targetCard.offer.description};

      /* В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения. */
      /* <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья"> */
      // var getPhotosPopup = function (photoMassive) {
      //   photoMassive.map(function (wizard) {
      //     '<img src="' + wizard + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      //   })
      // };

      var photosPopup = templatePopupClone.querySelector('.popup__photos');
      var photoPopup = templatePopup.querySelector('.popup__photo');
      var photoPopupClone = photoPopup.cloneNode(true);

      var getPhotosPopup = function (photoMassive) {
        photoMassive.forEach(function (value) {
          photoPopupClone.src = value;
          photosPopup.appendChild(photoPopupClone);
        })
      };
      if(targetCard.offer.photos) {getPhotosPopup(targetCard.offer.photos)};


      /* Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта. */
      // var avatarPopup = templatePopupClone.querySelector('.popup__avatar');
      // avatarPopup.src = targetCard.author.avatar;
      if(targetCard.author.avatar) {templatePopupClone.querySelector('.popup__avatar').src = targetCard.author.avatar};
      /* // Другой вариант записи
      templatePopupClone.querySelector('.popup__avatar').src = targetCard.author.avatar;

      console.log(templatePopupClone.querySelector('.popup__avatar').src); */

      // console.log(photosPopup);



      var mapPins = document.querySelector('.map__pins');
      mapPins.after(templatePopupClone);
      // var photoPopup = templatePopupClone.querySelector('.popup__photo');
      // photoPopup.textContent = targetCard.offer.address;

      // console.log('Мгновенный id');
      // console.log(evt.target.id);
      // console.log('Объект выбранной карты');
      // console.log(targetCard);
      // console.log('заголовок объявления');
      // console.log(titlePopup.textContent);
      // console.log('адрес');
      // console.log(textAddressPopup.textContent);
      // console.log('Цена за ночь');
      // console.log(textPricePopup.textContent);
      // console.log('Тип');
      // console.log(typePopup.textContent);
      // console.log('количество гостей и комнат');
      // console.log(textCapacityPopup.textContent);
      // console.log('Время заезда и выезда.');
      // console.log(templatePopupClone.querySelector('.popup__text--time').textContent);
      // console.log('Доступные удобства');
      // console.log(featuresPopup.textContent);
      // console.log('Описание');
      // console.log(descriptionPopup.textContent);
      // console.log('Фотографии');
      // console.log(photosPopup);

      // console.log('Аватар');
      // console.log(targetCard.offer.photos);

      // console.log(evt.target);
      // console.log(evt.target.alt);
      // console.log(data);

      /* 5. Хочу  Отобразить полученный шаблон с внесенными в него данными на странице в виде попапа*/
      /* 6. Хочу Удалить данный шаблон если происходит какой либо клик вне поля данного объявления */
      // console.log(templatePopupClone);
      // console.log(evt);
      // console.log(pinCard);

      // console.log('Активирована страница объявления');
    };

    var mapPinNoMainNew = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNoMainNew.forEach(function (pinCard) { /* Добавляю слушателей для пинов без главного перебирая их на каждом элементе полученного массива. */
      pinCard.addEventListener('mousedown', onCardVisible);
    });
    // console.log(mapPinNoMainNew);
  };

  //   console.log('СОБЫТИЕ');

  window.card = {
    addOpeningProperty: addOpeningProperty
  };
})();


// ##################### Работает но необходимо встроить в то место где будет каждый раз, при любом действии присваиваться элементам слушатель.А это и после фильтрации и просто после отрисовки на странице в первый раз. Пока есть мысли что можно внедрить в каждое событие но думаю можно обобщить как то.
// Нужно найти момент отображения пинов на странице, они же отображаются каждый раз заново. Отрисовываются.

// var mapPinNoMain = document.querySelectorAll('.map__pin:not(.map__pin--main)');
// var onCardVisible = function () {
//   console.log('Активирована страница объявления');
//   console.log('СОБЫТИЕ');
// };
// mapPinNoMain.forEach(function (pinCard) { /* Добавляю слушателей для пинов без главного перебирая их на каждом элементе полученного массива. */
//   pinCard.addEventListener('mousedown', onCardVisible);
// });
// #####################
