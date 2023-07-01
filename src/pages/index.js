import "../pages/index.css"
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import {
  initialCards,
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
  formValidationConfig,
  avatarSelectorPopup,
  avatarForm,
  profileAvatarBtn,
  deleteSelectorPopup,
}
 from '../utils/constants.js';


 const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '9257d7a9-df32-45bd-8002-d201ea4f4c47',
    'Content-Type': 'application/json'
  }
});

api.getCards()
  .then(res => console.log(res));


const userPopup = new UserInfo(profileSelectorName, profileSelectorJob, profileSelectorImage);
const popupImag = new PopupWithImage(popupImageSelector);
const popupDeleteCard = new PopupDeleteCard(deleteSelectorPopup, (item) => {
  item.handleRemoveCard();
  popupDeleteCard.close();
})


function createNewCard(item) {
  const card = new Card(item, cardsTemplate, popupImag.open, popupDeleteCard.open);
  return card.createCard()
}
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createNewCard(item));
  }
}, elementSelector);
// cardList.renderItems();

// Форма профиля
const popupProfiles  = new PopupWithForm(popupProfileSelector, (object) => {
  userPopup.setUserInfo(object)
  popupProfiles.close();
})

// Форма карточки
const popupCard = new PopupWithForm(popupCardSelector, (object) => {
  cardList.addItem(createNewCard(object));
  popupCard.close();
})

const popupAvatar = new PopupWithForm(avatarSelectorPopup, (object) => {
  document.querySelector('.profile__image').src = object.avatar;
  popupAvatar.close();
})


popupImag.setEventListeners();
popupProfiles.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

// конец ПР 8

  // Переменная для валидации попапа с именем и местом работы
  const validationForProfile = new FormValidator(formValidationConfig, profileForm);
  validationForProfile.enablevalidation();
  // Переменная для валидации попапа с созданием карточек
  const validationForCards = new FormValidator(formValidationConfig, cardCreatePopup);
  validationForCards.enablevalidation();

  const validationForAvatar = new FormValidator(formValidationConfig, avatarForm);
  validationForAvatar.enablevalidation();

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

profileAvatarBtn.addEventListener('click', () => {
  validationForCards.resetErrorBeforeOpenForm();
  popupAvatar.open()
})


Promise.all([api.getInitialCards(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    console.log(dataUser.id);
    dataCard.forEach(element => element.myid = dataUser._id);
    userPopup.setUserInfo({ name: dataUser.name, description: dataUser.about, avatar: dataUser.avatar });
    cardList.renderItems(dataCard)
  })
