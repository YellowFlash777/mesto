import initialCards from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
// Общие попапы
const popupProfile = document.querySelector(".popup-profile");
const cardPopup = document.querySelector(".card-element-popup");
const popupImage = document.querySelector(".popup-image");
//
const editButton = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileForm = popupProfile.querySelector(".popup__form");
// Инпуты для 1-ого первого попапа
const nameInput = popupProfile.querySelector(".popup__form-input_type_name");
const jobInput = popupProfile.querySelector(".popup__form-input_type_description");
const namePopup = document.querySelector(".profile__title-name");
const jobPopup = document.querySelector(".profile__text-job");
//

// инпуты для 2-ого попапа с карточками
const newCardTitle = cardPopup.querySelector(".popup__form-input_type_title");
const newCardUrl = cardPopup.querySelector(".popup__form-input_type_url");
//
const profileAddButton = document.querySelector(".profile__add-button");
const elementLists = document.querySelector(".element__lists");
const cardsTemplate = "#template-cards";
const cardCreatePopup = cardPopup.querySelector(".popup__form");
const deleteButtonCard = cardPopup.querySelector(".popup__save-button");
// Константы для увеличения при нажатии
const popupImageCard = popupImage.querySelector(".popup-image__zoom");
const popupImageText = popupImage.querySelector(".popup-image__caption");
// пр7
const formValidationConfig = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: '.popup__error_type_',
  errorClass: 'popup__error_active',
  invalidErrorClass: 'popup__error_invalid',
};

  // Переменная для валидации попапа с именем и местом работы
  const validationForProfile = new FormValidator(formValidationConfig, profileForm);
  validationForProfile.enablevalidation();
  // Переменная для валидации попапа с созданием карточек
  const validationForCards = new FormValidator(formValidationConfig, cardCreatePopup);
  validationForCards.enablevalidation();

function openImagePopup(object) {
  popupImageCard.src = object.link;
  popupImageCard.alt = object.name;
  popupImageText.textContent = object.name;
  openPopup(popupImage);
 };

function addCard(add, card) {
  add.prepend(card);
}
initialCards.forEach((item) => {
  addCard(elementLists, createNewCard(item));
});
function createNewCard(item) {
  const card = new Card(item, cardsTemplate, openImagePopup);
  return card.createCard()
}


// Открытие Попапов
function openPopup(popups) {
  popups.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupWithEsc);
}
// Закрытие Попапов
function closePopup(popups) {
  popups.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupWithEsc);
}
// Попап открытия с формой имени и професии
function openProfilePopup() {
  validationForProfile.resetErrorBeforeOpenForm()
  nameInput.value = namePopup.textContent;
  jobInput.value = jobPopup.textContent;
  openPopup(popupProfile);
}
editButton.addEventListener("click", openProfilePopup);


// Закрытие Попапа на Esc
function closePopupWithEsc (evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  };
}
// Закрытие попапа на оверлей
function closePopupWithOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  };
}
popups.forEach(function(item) {
  item.addEventListener('click', closePopupWithOverlay);
});

// Закрытие попапов на Крестик
popupCloseButtons.forEach(function (item) {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => {
    closePopup(popup);
  });
});

// Слушатель открытия карточек добавлением картинок
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  namePopup.textContent = nameInput.value;
  jobPopup.textContent = jobInput.value;
  closePopup(popupProfile);
});

profileAddButton.addEventListener("click", () => {
  cardCreatePopup.reset();
  validationForCards.resetErrorBeforeOpenForm()
  openPopup(cardPopup);
});

cardCreatePopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const initialCard = {
    name: newCardTitle.value,
    link: newCardUrl.value,
  };
  addCard(elementLists, createNewCard(initialCard));
  closePopup(cardPopup);
  evt.target.reset();
});


