/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
'use strict';

(function () {
  /* Функция удаления попапа по клику. Уничтожает сам себя (обработчик по клику popupCloseClick) и  обработчик по Эск popupCloseEsc */
  var onPopupEscPress = function () {
    document.querySelector('.popup__close').addEventListener('mousedown', popupCloseClick);
    document.addEventListener('keydown', popupCloseEsc);
  };

  var popupCloseEsc = function (event) { /* Удаления попапа через ESC */ /* Функция удаления попапа по Эскейпу. Выполняет условие что если нажат Эскейп и если попап не равен null т.е. ничему то удаляет сначала себя popupCloseEsc потом обработчика по клику popupCloseClick а затем удаляет попап. */
    if (event.key === 'Escape') {
      if (document.querySelector('.popup') !== null) {
        document.removeEventListener('keydown', popupCloseEsc);
        document.querySelector('.popup__close').removeEventListener('mousedown', popupCloseClick);
        document.querySelector('.popup').remove();
      }
    }
  };

  var popupCloseClick = function () { /* Удаление попапа через клик */
    document.querySelector('.popup__close').removeEventListener('mousedown', popupCloseClick);
    document.removeEventListener('keydown', popupCloseEsc);
    document.querySelector('.popup').remove();
  };

  var addOpeningProperty = function (data) { /* Добавление слушателя на каждое объявление Добавлено в pin renderPinCards */

    var onCardVisible = function (evt) { /* evt мгновенный снимок того с чем только что произошло событие именно в этот момент! */
      /* '' Условие для удаления старого попапа.  */
      var popup = document.querySelector('.popup');
      // var removeOldPopup;
      // removeOldPopup = (popup !== null) ? popup.remove() : '';
      if (popup !== null) {
        // console.log(popup);
        // document.querySelector('.map-card').remove();
        document.querySelector('.popup').remove();
      }
      var templatePopup = document.querySelector('#card').content.querySelector('.popup'); /* 1. хочу получить шаблон который смогу заполнить данными полученными от метки на которую было выполнено нажатие. */
      var templatePopupClone = templatePopup.cloneNode(true); /* 2. Хочу сделать клон указанного шаблона */
      var targetCard = data.find(function (card) { /* Поиск элемента поле offer.id которого совпадает с id-ом  */ /* Функция вызывается на массиве, переберает его элементы на предмет соответствия указанного нами значения(В частности evt.target.id-мгновенное значение из обекта с которым было выполнено взаимодействие), при совпадении с данным элементом вернет объект в котором он находится в переменную targetCard */
        if (evt.target.type === 'button') {
          var searchImgId = evt.target.querySelector('img');
          return card.author.id.toString() === searchImgId.id;
        } else {
          return card.author.id.toString() === evt.target.id;
        }
      });
      if (targetCard.offer.title) {
        templatePopupClone.querySelector('.popup__title').textContent = targetCard.offer.title;
      }/* Протестировано*/
      if (targetCard.offer.address) {
        templatePopupClone.querySelector('.popup__text--address').textContent = targetCard.offer.address;
      } /* Адрес Протестировано*/
      if (targetCard.offer.price) {
        templatePopupClone.querySelector('.popup__text--price').textContent = targetCard.offer.price + ' ₽/ночь';
      } /* Цена Протестировано*/
      if (targetCard.offer.rooms && targetCard.offer.guests) {
        templatePopupClone.querySelector('.popup__text--capacity').textContent = targetCard.offer.rooms + ' комнаты для ' + targetCard.offer.guests + ' гостей.';
      } /* количество гостей и комнат Протестировано*//* TODOF в будущем, можно улучшить условием если больше какого то числа то окончание камнат/ы изменяется */
      if (targetCard.offer.checkin && targetCard.offer.checkout) {
        templatePopupClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + targetCard.offer.checkin + ', выезд до ' + targetCard.offer.checkout;
      } /* Время заезда и выезда Протестировано*/

      var featuresClass = {
        wifi: 'popup__feature--wifi',
        dishwasher: 'popup__feature--dishwasher',
        parking: 'popup__feature--parking',
        washer: 'popup__feature--washer',
        elevator: 'popup__feature--elevator',
        conditioner: 'popup__feature--conditioner'
      };

      if (targetCard.offer.features.length !== 0) {
        // console.log(targetCard.offer.features);
        targetCard.offer.features.forEach(function (el) {
          var cloneFeature = templatePopup.querySelector('.popup__feature').cloneNode(true);
          cloneFeature.classList.add(featuresClass[el]);
          templatePopupClone.querySelector('.popup__features').appendChild(cloneFeature);
        });
        templatePopupClone.querySelectorAll('.popup__feature')[0].remove();
      } else {
        templatePopupClone.querySelector('.popup__feature').remove();
      }

      if (targetCard.offer.description) {
        templatePopupClone.querySelector('.popup__description').textContent = targetCard.offer.description;
      } /* описание объекта недвижимости Протестировано*/
      if (targetCard.author.avatar) {
        templatePopupClone.querySelector('.popup__avatar').src = targetCard.author.avatar;
      } /* src у аватарки Протестировано*/

      var apparmentType = {
        flat: 'Квартира',
        bungalo: 'Бунгало',
        house: 'Дом',
        palace: 'Дворец'
      };
      if (targetCard.offer.type) {
        templatePopupClone.querySelector('.popup__type').textContent = apparmentType[targetCard.offer.type];
      } /* Тип апартаментов Протестировано*/

      if (targetCard.offer.photos.length !== 0) {
        targetCard.offer.photos.forEach(function (el) {
          templatePopup.querySelector('.popup__photo').src = el;
          templatePopupClone.querySelector('.popup__photos').appendChild(templatePopup.querySelector('.popup__photo').cloneNode(true));
        });
        templatePopupClone.querySelectorAll('.popup__photo')[0].remove();
      }

      var mapPins = document.querySelector('.map__pins');
      mapPins.after(templatePopupClone); /* 5. Хочу  Отобразить полученный шаблон с внесенными в него данными на странице в виде попапа*/

      // /* TODO 6. Хочу Удалить данный шаблон если происходит какой либо клик вне поля данного объявления */
      // var onPopupEscPress = function () {

      onPopupEscPress();
    };

    var onNoMainPinMouseOrKeyDown = function (evt) { /* // TODO Разделить функцию на две */ /* Эта функция запустит функцию по отображению карточки и функцию по добавлению слушателей на закрытие данного попапа. */
      if (evt.which === 1 || evt.key === 'Enter') {
        onCardVisible(evt);
      }
    };

    var mapPinNoMainNew = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinNoMainNew.forEach(function (pinCard) { /* Добавляю слушателей для пинов без главного перебирая их на каждом элементе полученного массива. */
      pinCard.addEventListener('mousedown', onNoMainPinMouseOrKeyDown);
      pinCard.addEventListener('keydown', onNoMainPinMouseOrKeyDown);
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
