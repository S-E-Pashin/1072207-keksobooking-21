'use strict';
(function () {
  var ifEscEvent = function (evt) {
    return evt.key === 'Escape';
  };

  window.utils = {
    ifEscEvent: ifEscEvent
  };
})();
