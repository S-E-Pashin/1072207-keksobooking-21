/* eslint-disable no-var */
'use strict';

var IMAGE_PHOTO_HEIGHT = '70';
var IMAGE_PHOTO_WIDTH = '70';
var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

var fileAvatar = document.querySelector('.ad-form-header__input');
var preview = document.querySelector('.ad-form-header__preview img');
var fileGallery = document.querySelector('.ad-form__input');
var previewUpload = document.querySelector('.ad-form__photo');
var fileAvatarStartSrc = preview.src;

var removeImg = function () {
  if (previewUpload.querySelector('img')) {
    previewUpload.querySelector('img').remove();
  }
};

var getFileInputChooser = function (inputChooser) { /* Функция которая подставит выбранный пользователем файл изображения из поля выбора в место отображения картинки с заданными условиями. */
  var file = inputChooser.files[0]; /* Приравниваю значение file к значению файла который выбран в поле(Данное свойство всегда выглядит как массив.) */
  var fileName = file.name.toLowerCase(); /* Трансформирую имя файла для однотипного его восприятия. Приведен к строковым/маленьким.  */
  var matches = FILE_TYPES.some(function (it) { /* Проверка оканчивает ли имя файла на заданный тип. it он же ending. some это метод который будет вызван на каждый элемент массива FILE_TYPES и если строка оканчивается на переданую подстроку то тогда, если хоть один из вариантов константы(окончаний) подойдет/будет равен окончанию имени файла то он вернет true */
    return fileName.endsWith(it); /* Проверяет на соответствие заданным константам. */
  });


  if (matches) { /* Если условие верно и файл оканчивается на требуемый/заданный для нас, тогда. */
    var reader = new FileReader(); /* Получаю экземпляр ридера(некую копию) с помощью ключевого слова NEW. Ридер=Читатель, своя копия читателя посредством которой будем читать файлы пользователя. */

    if (inputChooser === fileAvatar) {
      var onReaderLoad = function () { /* Обработчик загрузки ридера.  */
        preview.src = reader.result; /* Передаю значения в картинку/в атрибут  результат который будет получен при наступлении события load которое в свою очередь будет запущено reader.readAsDataURL(file); */
      };

      reader.addEventListener('load', onReaderLoad); /* Событие load вызовется в тот момент как ридер прочтет файл который загрузил/выбрал пользователь. */

      reader.readAsDataURL(file); /* readAsDataURL - Метод - прочти как DATA URL. И дальше он открывает файл выбранный пользователем. */
    } else if (inputChooser === fileGallery) {
      var getImg = function () {
        var imagePhoto = document.createElement('img');
        imagePhoto.src = reader.result;
        imagePhoto.width = IMAGE_PHOTO_WIDTH;
        imagePhoto.height = IMAGE_PHOTO_HEIGHT;
        previewUpload.appendChild(imagePhoto);
      };


      var onReaderUpload = function () { /* Обработчик загрузки ридера.  */
        removeImg();
        getImg();
      };

      reader.addEventListener('load', onReaderUpload); /* Событие load вызовется в тот момент как ридер прочтет файл который загрузил/выбрал пользователь. */

      reader.readAsDataURL(file); /* readAsDataURL - Метод - прочти как DATA URL. И дальше он открывает файл выбранный пользователем. */
    }
  }
};

var onFileChoiceAvatar = function () {
  getFileInputChooser(fileAvatar);
};

var onFileChoiceGallery = function () {
  getFileInputChooser(fileGallery);
};

var getFileChoice = function () {
  fileAvatar.addEventListener('change', onFileChoiceAvatar);
  fileGallery.addEventListener('change', onFileChoiceGallery);
};

var removeFileChoice = function () {
  fileAvatar.removeEventListener('change', onFileChoiceAvatar);
  preview.src = fileAvatarStartSrc;
  fileGallery.removeEventListener('change', onFileChoiceGallery);
  removeImg();
};


window.previewImage = {
  getFileChoice: getFileChoice,
  removeFileChoice: removeFileChoice
};
