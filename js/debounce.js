/* eslint-disable no-var */
'use strict';
// (function () {
//   var DEBOUNCE_INTERVAL = 300;

//   window.debounce = function (cb) {
//     var lastTimeout = null;

//     return function () {
//       var parameters = arguments;
//       if (lastTimeout) {
//         window.clearTimeout(lastTimeout);
//       }
//       lastTimeout = window.setTimeout(function () {
//         cb.apply(null, parameters);
//       }, DEBOUNCE_INTERVAL);
//     };
//   };

//   // window.debounce =  {
//   //   debounce: debounce
//   // };
// })();

(function () {
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

// 'use strict';
// (function () {
//   var DEBOUNCE_INTERVAL = 500;

//   function debounce(cb) {
//     var lastTimeout = null;
//     return function () {
//       var args = arguments;
//       if (lastTimeout) {
//         window.clearTimeout(lastTimeout);
//       }
//       lastTimeout = window.setTimeout(function () {
//         cb.apply(null, args);
//       }, DEBOUNCE_INTERVAL);
//     };
//   }

//   window.debounce = debounce;
// })();
