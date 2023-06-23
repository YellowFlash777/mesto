
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import PopupWithForm from './components/PopupWithForm.js';
import {
  initialCards,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  profileForm,
  profileSelectorName,
  profileSelectorJob,
  profileAddButton,
  editButton,
  elementSelector,
  cardsTemplate,
  cardCreatePopup,
  formValidationConfig
}
 from './utils/constants.js';
// // Общие попапы
// const popupProfile = document.querySelector(".popup-profile");
// const popupImage = document.querySelector(".popup-image");
// const cardPopup = document.querySelector(".card-element-popup");
// // Селекторы попапов
// const popupProfileSelector = ".popup-profile";
// const popupCardSelector = '.card-element-popup';
// const popupImageSelector = '.popup-image';
// //
// const editButton = document.querySelector(".profile__edit-button");
// const popups = document.querySelectorAll(".popup");
// const popupSelector = "#popup";
// const popupCloseButtons = document.querySelectorAll(".popup__close-button");
// const profileForm = popupProfile.querySelector(".popup__form");
// // Инпуты для 1-ого первого попапа
// const nameInput = popupProfile.querySelector(".popup__form-input_type_name");
// const profileSelectorName = '.profile__title-name';

// const jobInput = popupProfile.querySelector(".popup__form-input_type_description");
// const profileSelectorJob = '.profile__text-job';

// const namePopup = document.querySelector(".profile__title-name");
// const jobPopup = document.querySelector(".profile__text-job");
// //
// // инпуты для 2-ого попапа с карточками
// const newCardTitle = cardPopup.querySelector(".popup__form-input_type_title");
// const newCardUrl = cardPopup.querySelector(".popup__form-input_type_url");
// //
// const profileAddButton = document.querySelector(".profile__add-button");
// const elementLists = document.querySelector(".element__lists");
// const elementSelector = '.element__lists';
// const cardsTemplate = "#template-cards";
// const cardCreatePopup = cardPopup.querySelector(".popup__form");
// const deleteButtonCard = cardPopup.querySelector(".popup__save-button");
// // Константы для увеличения при нажатии
// const popupImageCard = popupImage.querySelector(".popup-image__zoom");
// const popupImageText = popupImage.querySelector(".popup-image__caption");
// пр7
// const formValidationConfig = {
//   inputSelector: '.popup__form-input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: '.popup__error_type_',
//   errorClass: 'popup__error_active',
//   invalidErrorClass: 'popup__error_invalid',
// };

// PR 8
const userPopup = new UserInfo(profileSelectorName, profileSelectorJob);
const popupImag = new PopupWithImage(popupImageSelector);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardsTemplate, popupImag.open);
    return card.createCard()
  }
}, elementSelector);
cardList.renderItems();

// Форма профиля
const popupProfiles  = new PopupWithForm(popupProfileSelector, () => {
  userPopup.setUserInfo(popupProfiles._getInputValue())
  popupProfiles.close();
})


// Форма карточки
const popupCard = new PopupWithForm(popupCardSelector, (object) => {
  cardList.addItem(object);
  popupCard.close();
})


popupImag.setEventListeners();
popupProfiles.setEventListeners();
popupCard.setEventListeners();
// конец ПР 8

  // Переменная для валидации попапа с именем и местом работы
  const validationForProfile = new FormValidator(formValidationConfig, profileForm);
  validationForProfile.enablevalidation();
  // Переменная для валидации попапа с созданием карточек
  const validationForCards = new FormValidator(formValidationConfig, cardCreatePopup);
  validationForCards.enablevalidation();

function openProfilePopup() {
  validationForProfile.resetErrorBeforeOpenForm()
  popupProfiles.setInputValue(userPopup.getUserInfo());
  popupProfiles.open()
}
editButton.addEventListener("click", openProfilePopup);

profileAddButton.addEventListener("click", () => {
  cardCreatePopup.reset();
  validationForCards.resetErrorBeforeOpenForm();
  popupCard.open()
});



