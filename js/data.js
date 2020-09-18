// 'use strict';
// (function () {
//   // Данные для создания карты.
//   var PRICES = [0, 1000, 5000, 10000];
//   var TYPES_ROOM = ['palace', 'flat', 'house', 'bungalo'];
//   var NUMBER_ROOMS = [1, 2, 3, 100];
//   var NUMBER_GUESTS = [1, 2, 3, 0];
//   var CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
//   var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//   var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
//   var X_MIN = 0;
//   var X_MAX = 1200;
//   var Y_MIN = 130;
//   var Y_MAX = 630;
//   var NUMBER_CARDS = 8; /* Количество карт карт/объектов для последующего добавления в массив. */

//   // -------------------Данные для  СОЗДАНИя ЭЛЕМЕНТОВ ДЛЯ КАРТЫ -------------------------------
//   var createAllCards = function () { /* // Функция которая запускает цикл создания указанного (из диапазона) количества элементов. Элементы с каждым циклом формируются и их общее значение приравнивается(Является составляющим/ими элементами/объектами) переменной createCardObject(Данная переменная является объектом который с каждой итерацией создает уникальный объект/впитывает в себя значения) следующий шаг это запустить функцию и записать данный объект в массив createdCardsArray */
//     var createdCardsArray = [];
//     for (var i = 0; i < NUMBER_CARDS; i++) {
//       var createCardObject = {
//         'author': {
//           'avatar': 'img/avatars/user0' + (i + 1) + '.png'
//         },
//         'offer': {
//           'title': 'Заголовок предложения',
//           'address': '600, 350', /* // На данный момент решения о передаче данных из location не нашел. */
//           'price': PRICES[window.util.getRandomArrayIndex(PRICES)], /* Значение ключа берется из массива, номер элемента массива формируется посредством применения функции getRandomArrayIndex которая в свою очередь формирует рандомное число основываясь на полученных данны о данной функции а именнона ее длинне. */
//           'type': TYPES_ROOM[window.util.getRandomArrayIndex(TYPES_ROOM)],
//           'rooms': NUMBER_ROOMS[window.util.getRandomArrayIndex(NUMBER_ROOMS)],
//           'guests': NUMBER_GUESTS[window.util.getRandomArrayIndex(NUMBER_GUESTS)],
//           'checkin': CHECKINS_CHECKOUTS[window.util.getRandomArrayIndex(CHECKINS_CHECKOUTS)],
//           'checkout': CHECKINS_CHECKOUTS[window.util.getRandomArrayIndex(CHECKINS_CHECKOUTS)],
//           'features': FEATURES.slice(0, window.util.getRandomArrayIndex(FEATURES)), /* Ключу равно значение копии исходного массива FEATURESARRAY от которого отрезана часть его элементов. Это выполнено посредством метода slice которому задано минимальное значение 0 а максимальное(то до которого необходимо совершить вырезание необходимой части цикла) представлено в виде выполняемой функции предоставления рандомного числа элемента массива который основывается на полученной информации о данном массиве. */
//           'description': 'строка с описанием',
//           'photos': PHOTOS.slice(0, window.util.getRandomArrayIndex(PHOTOS)),
//         },
//         'location': {
//           'x': window.util.getRandomInteger(X_MIN, X_MAX),
//           'y': window.util.getRandomInteger(Y_MIN, Y_MAX)
//         },
//       };
//       createdCardsArray.push(createCardObject);
//     }
//     return createdCardsArray;
//   };

//   window.data = {
//     createAllCards: createAllCards
//   };
// })();
