'use strict';

(function () {
  /* Мысль следующая - 1. не пытаться получить все данные из мгновенного evt т.к. не могу найти где найти по этому поводу информацию.
  2. Получить данные data которые формируются при отрисовке элементов на отрисовку(да их больше чем отрисовывается но это не существенно.).
  3. При нажатии на объявление сравнить данные evt.target.alt с перебираемыми объектами из массива data.offer.title (console.log(data[2].offer.title);) а именно текстовым содержимым popup__title
  4. Выполнить формирование всплывающего попапа
  5. Отобразить всплывающий попап.
  6. Добавить проверку что если каких то данных нет то условие не выполняется.*/

  var addOpeningProperty = function (data) { /* Добавлено в pin renderPinCards */

    // Необходимо наполнить действиями с карточкой объявлений.
    var onCardVisible = function (evt) { /* evt мгновенный снимок того с чем только что произошло событие именно в этот момент! */
      /* 1. хочу получить шаблон который смогу заполнить данными полученными от метки на которую было выполнено нажатие. */
      var templatePopup = document.querySelector('#card').content.querySelector('.popup');
      /* 2. Хочу сделать клон указанного шаблона */
      var templatePopupClone = templatePopup.cloneNode(true);

      /* 3. При нажатии на объявление сравнить данные evt.target.alt с перебираемыми объектами из массива data.offer.title (console.log(data[2].offer.title);) */


      // var result = data.find(item =>item.offer.guests === 2);
      // var result = data.find(item =>item.offer.title === "Уютное гнездышко для молодоженов");
      var targetCard = data.find(item => item.offer.title === evt.target.alt); /* Поиск элемента поле offer.title которого совпадает с alt-ом  */
      // console.log(targetCard);
      // console.log(templatePopupClone);

      // author: {avatar: "img/avatars/user05.png"}
      // location: {x: 361, y: 517}
      // offer:
      // address: "102-0094 Tōkyō-to, Chiyoda-ku, Kioichō, 3"
      // checkin: "11:00"
      // checkout: "10:00"
      // description: "Маленькая квартирка на чердаке. Для самых не требовательных."
      // features: (3) ["wifi", "washer", "elevator"]
      // guests: 2
      // photos: (4) ["https://cdn.ostrovok.ru/t/x500/mec/hotels/5000000/4500000/4493700/4493658/4493658_17_b.jpg", "https://cdn.ostrovok.ru/t/x500/mec/b4/c6/b4c674087f12b74bc71fe073923ec744dfe1ed8f.jpeg", "https://cdn.ostrovok.ru/t/x500/mec/1e/e8/1ee854db105a1f6bcd19ea62e1aa294724af7885.jpeg", "https://cdn.ostrovok.ru/t/x500/mec/ca/9a/ca9ad256650553cdce9d8ff8baad93d4f17b9484.jpeg"]
      // price: 10000
      // rooms: 1
      // title: "Милейший чердачок"
      // type: "bungalo"

      /* 4. Хочу внести данныe из полученного в результате нажатия элемента evt в клон шаблона попапа. */

      // var imgPopup = templatePopupClone.querySelector('img');



      var titlePopup = templatePopupClone.querySelector('.popup__title');
      titlePopup.textContent = targetCard.offer.title;

      var textAddressPopup = templatePopupClone.querySelector('.popup__text--address');
      textAddressPopup.textContent = targetCard.offer.address;

      var textPricePopup = templatePopupClone.querySelector('.popup__text--price');
      textPricePopup.textContent = targetCard.offer.price + ' ₽/ночь';

      var typePopup = templatePopupClone.querySelector('.popup__type');
      typePopup.textContent = targetCard.offer.address;

      var textCapacityPopup = templatePopupClone.querySelector('.popup__text--capacity');
      textCapacityPopup.textContent = targetCard.offer.address;/* Здесь не все так просто требуется прорабатывать. */

      // var textTimePopup = templatePopupClone.querySelector('.popup__text--time');
      // textTimePopup.textContent = targetCard.offer.address;

      // var featuresPopup = templatePopupClone.querySelector('.popup__features');
      // featuresPopup.textContent = targetCard.offer.address;

      // var photosPopup = templatePopupClone.querySelector('.popup__photos');
      // photosPopup.textContent = targetCard.offer.address;

      // var photoPopup = templatePopupClone.querySelector('.popup__photo');
      // photoPopup.textContent = targetCard.offer.address;

      console.log(typePopup.textContent);






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
