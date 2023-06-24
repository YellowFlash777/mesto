import "../pages/index.css"
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
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
 from '../scripts/utils/constants.js';

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



