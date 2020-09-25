'use strict';

(function () {
  var addOpeningProperty = function (data) { /* Добавлено в pin renderPinCards */

    // Необходимо наполнить действиями с карточкой объявлений.
    var onCardVisible = function (evt) { /* evt мгновенный снимок того с чем только что произошло событие именно в этот момент! */
      var popup = document.querySelector('.popup');
      (popup !== null) ? popup.remove(): ''; /* Условие для удаления старого попапа.  */
      var templatePopup = document.querySelector('#card').content.querySelector('.popup'); /* 1. хочу получить шаблон который смогу заполнить данными полученными от метки на которую было выполнено нажатие. */
      var templatePopupClone = templatePopup.cloneNode(true); /* 2. Хочу сделать клон указанного шаблона */
      var targetCard = data.find(function (card) { /* Поиск элемента поле offer.id которого совпадает с id-ом  */ /* Функция вызывается на массиве, переберает его элементы на предмет соответствия указанного нами значения(В частности evt.target.id-мгновенное значение из обекта с которым было выполнено взаимодействие), при совпадении с данным элементом вернет объект в котором он находится в переменную targetCard */
        return card.author.id == evt.target.id;
      });

      if(targetCard.offer.title) {templatePopupClone.querySelector('.popup__title').textContent = targetCard.offer.title}; /* Протестировано*/
      if(targetCard.offer.address) {templatePopupClone.querySelector('.popup__text--address').textContent = targetCard.offer.address}; /* Адрес Протестировано*/
      if(targetCard.offer.price) {templatePopupClone.querySelector('.popup__text--price').textContent = targetCard.offer.price + ' ₽/ночь'}; /* Цена Протестировано*/

      var apparmentType = {
          flat: 'Квартира',
          bungalo: 'Бунгало',
          house: 'Дом',
          palace: 'Дворец'
      }
      if(targetCard.offer.type) {templatePopupClone.querySelector('.popup__type').textContent = apparmentType[targetCard.offer.type]}; /* Тип апартаментов Протестировано*/
      if(targetCard.offer.rooms && targetCard.offer.guests) {templatePopupClone.querySelector('.popup__text--capacity').textContent = targetCard.offer.rooms + ' комнаты для ' + targetCard.offer.guests + ' гостей.'}; /* количество гостей и комнат Протестировано*//* TODOF в будущем, можно улучшить условием если больше какого то числа то окончание камнат/ы изменяется */
      if(targetCard.offer.checkin && targetCard.offer.checkout) {templatePopupClone.querySelector('.popup__text--time').textContent = 'Заезд после ' +  targetCard.offer.checkin + ', выезд до ' + targetCard.offer.checkout}; /* Время заезда и выезда Протестировано*/
      if(targetCard.offer.features) {templatePopupClone.querySelector('.popup__features').textContent = targetCard.offer.features}; /* все доступные удобства в объявлении. Протестировано*/
      if(targetCard.offer.description) {templatePopupClone.querySelector('.popup__description').textContent = targetCard.offer.description}; /* описание объекта недвижимости Протестировано*/

      var photosPopup = templatePopupClone.querySelector('.popup__photos');
      var photoPopup = templatePopup.querySelector('.popup__photo');
      var photoPopupClone = photoPopup.cloneNode(true);

      var getPhotosPopup = function (photoMassive) {
        photoMassive.forEach(function (value) {
          photoPopupClone.src = value;
          photosPopup.appendChild(photoPopupClone);
        })
      };
      if(targetCard.offer.photos) {getPhotosPopup(targetCard.offer.photos)};  /* Протестировано /* В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения. */

      if(targetCard.author.avatar) {templatePopupClone.querySelector('.popup__avatar').src = targetCard.author.avatar};  /* src у аватарки Протестировано*/

      var mapPins = document.querySelector('.map__pins');
      mapPins.after(templatePopupClone); /* 5. Хочу  Отобразить полученный шаблон с внесенными в него данными на странице в виде попапа*/

      /* TODO 6. Хочу Удалить данный шаблон если происходит какой либо клик вне поля данного объявления */
    };

    var mapPinNoMainNew = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNoMainNew.forEach(function (pinCard) { /* Добавляю слушателей для пинов без главного перебирая их на каждом элементе полученного массива. */
      pinCard.addEventListener('mousedown', onCardVisible);
    });
  };

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
