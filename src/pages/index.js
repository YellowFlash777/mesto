import "../pages/index.css"
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
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
 from '../utils/constants.js';

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
const popupProfiles  = new PopupWithForm(popupProfileSelector, (data) => {
  userPopup.setUserInfo(data)
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



