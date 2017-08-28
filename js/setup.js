'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var wizards = createWizards();
var fragment = document.createDocumentFragment();
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var userDialogSubmit = userDialog.querySelector('.setup-submit');
var mainWizardSetup = userDialog.querySelector('.setup-wizard');
var mainWizardFireballColor = userDialog.querySelector('.setup-fireball-wrap');
var mainWizardCoat = mainWizardSetup.querySelector('.wizard-coat');
var mainWizardEyesColor = mainWizardSetup.querySelector('.wizard-eyes');

// Закрытие окна на ESC + проверка фокуса
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput.classList.contains('focused') === false) {
    closePopup();
  }
};

// Функция открытия попапа + добавление Esc листнера 
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия попапа + удаление Esc листнера 
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция рендера мага
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Функция генерации рандомного числа
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция генерации похожих магов
function createWizards() {
  var wizardsArrays = [];

  for (var i = 0; i < 4; i++) {
    wizardsArrays.push({
      name: WIZARD_NAMES[randomInteger(0, 7)] + ' ' + WIZARD_SECOND_NAMES[randomInteger(0, 7)],
      coatColor: WIZARD_COAT_COLORS[randomInteger(0, WIZARD_COAT_COLORS.length)],
      eyesColor: WIZARD_EYES_COLORS[randomInteger(0, WIZARD_EYES_COLORS.length)]
    });
  }
  return wizardsArrays;
}

// Функция вставки магов во фрагмент
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// Отображение похожих магов и самого блока с ними
similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Открытие попапа при нажатии на аватарку
userDialogOpen.addEventListener('click', function () {
  openPopup();
});

// Открытие попапа при нажатии на ENTER и фокусе аватарки
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Закрытие на крестик
userDialogClose.addEventListener('click', function () {
  closePopup();
});

// Закрытие крестика на ENTER в фокусе
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Закрытие окна на Enter если форма валидна
userDialogSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE && userNameInput.validity.valid) {
    closePopup();
  }
});

// Закрытие окна на кнопку если форма валидна
userDialogSubmit.addEventListener('click', function () {
  if (userNameInput.validity.valid) {
    closePopup();
  }
});

//  Проферка фокуса чтобы не срабатывал ESC при нем
userNameInput.addEventListener('focus', function () {
  userNameInput.classList.add('focused');
}, true);

//  Убираем класс фокуса когда его и правда нет
userNameInput.addEventListener('blur', function () {
  userNameInput.classList.remove('focused');
}, true);

// Красим пальто мага при клике
mainWizardCoat.addEventListener('click', function () {
  mainWizardCoat.style.fill = WIZARD_COAT_COLORS[randomInteger(0, WIZARD_COAT_COLORS.length)];
});

// Красим глаза мага при клике
mainWizardEyesColor.addEventListener('click', function () {
  mainWizardEyesColor.style.fill = WIZARD_EYES_COLORS[randomInteger(0, WIZARD_EYES_COLORS.length)];
});

// Красим фаерболл
mainWizardFireballColor.addEventListener('click', function () {
  mainWizardFireballColor.style.background = FIREBALL_COLORS[randomInteger(0, FIREBALL_COLORS.length)];
});

// Валидация формы
userNameInput.addEventListener('invalid', function () {
  if (!userNameInput.validity.valid) {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    }
  } else {
    userNameInput.setCustomValidity('');
  }
});

// Валидация формы для хромых браузеров
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// обработчик именуется как объект + событие + Handler
