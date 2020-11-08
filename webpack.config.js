const path = require("path")

module.exports = {
  entry: [
    "./js/preview-image.js",
    "./js/utils.js",
    "./js/debounce.js",
    "./js/load-message.js",
    "./js/backend.js",
    "./js/upload.js",
    "./js/send-message.js",
    "./js/validation.js",
    "./js/map.js",
    "./js/address.js",
    "./js/pin.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/move.js",
    "./js/form.js",
    ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
