 const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// Общие попапы
const popupProfile = document.querySelector(".popup-profile");
const popupImage = document.querySelector(".popup-image");
const cardPopup = document.querySelector(".card-element-popup");
const avatarPopup = document.querySelector('.popup-avatar')
// Селекторы попапов
const popupProfileSelector = ".popup-profile";
const popupCardSelector = '.card-element-popup';
const popupImageSelector = '.popup-image';
const avatarSelectorPopup = '.popup-avatar';
const deleteSelectorPopup = '.popup-delete';
//
const avatarForm = avatarPopup.querySelector('.popup__form')
const profileAvatarBtn = document.querySelector('.profile__avatar-btn')
const profileForm = popupProfile.querySelector(".popup__form");
const profileSelectorName = '.profile__title-name';
const profileSelectorJob = '.profile__text-job';
const profileSelectorImage = '.profile__image'
const profileAddButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const elementSelector = '.element__lists';
const cardsTemplate = "#template-cards";
const cardCreatePopup = cardPopup.querySelector(".popup__form");
const formValidationConfig = {
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: '.popup__error_type_',
  errorClass: 'popup__error_active',
  invalidErrorClass: 'popup__error_invalid',
};

export {
  deleteSelectorPopup,
  avatarPopup,
  avatarSelectorPopup,
  avatarForm,
  profileAvatarBtn,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  profileForm,
  profileSelectorName,
  profileSelectorJob,
  profileSelectorImage,
  profileAddButton,
  editButton,
  elementSelector,
  cardsTemplate,
  cardCreatePopup,
  formValidationConfig
}
