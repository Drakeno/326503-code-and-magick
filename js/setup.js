'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var wizardRandName = WIZARD_NAMES[randomInteger(0, 7)];
var wizardRandSecName = WIZARD_SECOND_NAMES[randomInteger(0, 7)];
var coatColor = WIZARD_COAT_COLORS[randomInteger(0, 5)];
var eyesColor = WIZARD_EYES_COLORS[randomInteger(0, 4)];

var wizards = [
  {
    name: WIZARD_NAMES[randomInteger(0, 7)] + ' ' + WIZARD_SECOND_NAMES[randomInteger(0, 7)],
    coatColor: WIZARD_COAT_COLORS[randomInteger(0, 5)],
    eyesColor: WIZARD_EYES_COLORS[randomInteger(0, 4)]
  },
  {
    name: WIZARD_NAMES[randomInteger(0, 7)] + ' ' + WIZARD_SECOND_NAMES[randomInteger(0, 7)],
    coatColor: WIZARD_COAT_COLORS[randomInteger(0, 5)],
    eyesColor: WIZARD_EYES_COLORS[randomInteger(0, 4)]
  },
  {
    name: WIZARD_NAMES[randomInteger(0, 7)] + ' ' + WIZARD_SECOND_NAMES[randomInteger(0, 7)],
    coatColor: WIZARD_COAT_COLORS[randomInteger(0, 5)],
    eyesColor: WIZARD_EYES_COLORS[randomInteger(0, 4)]
  },
  {
    name: WIZARD_NAMES[randomInteger(0, 7)] + ' ' + WIZARD_SECOND_NAMES[randomInteger(0, 7)],
    coatColor: WIZARD_COAT_COLORS[randomInteger(0, 5)],
    eyesColor: WIZARD_EYES_COLORS[randomInteger(0, 4)]
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');