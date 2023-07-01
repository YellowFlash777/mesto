import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Api from "../components/Api.js";
import {
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
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
    authorization: "9257d7a9-df32-45bd-8002-d201ea4f4c47",
    "Content-Type": "application/json",
  },
});

const userPopup = new UserInfo(
  profileSelectorName,
  profileSelectorJob,
  profileSelectorImage
);
const popupImag = new PopupWithImage(popupImageSelector);

const popupDeleteCard = new PopupDeleteCard(
  deleteSelectorPopup,
  ({ card, cardId }) => {
    api
      .removeCard(cardId)
      .then((res) => {
        console.log(res);
        card.handleRemoveCard();
        popupDeleteCard.close();
      })
      .catch((error) =>
        console.error(`Упс..., произошла ошибка при удалении карточки ${error}`)
      );
  }
);

function createNewCard(item) {
  const card = new Card(
    item,
    cardsTemplate,
    popupImag.open,
    popupDeleteCard.open,
    (likeIconEl, cardId) => {
      if (likeIconEl.classList.contains(".element__icon_active")) {
        api
          .deleteLikeCard(cardId)
          .then((res) => {
            card._toogLike(res.likes);
          })
          .catch((error) =>
            console.error(
              `Упс..., произошла ошибка при удалении карточки ${error}`
            )
          );
      } else {
        api
          .addLikeCard(cardId)
          .then((res) => {
            card._toogLike(res.likes);
          })
          .catch((error) =>
            console.error(
              `Упс..., произошла ошибка при добавлении лайка ${error}`
            )
          );
      }
    }
  );
  return card.createCard();
}

const cardList = new Section((item) => {
  cardList.addItemAppend(createNewCard(item));
}, elementSelector);

// Форма профиля
const popupProfiles = new PopupWithForm(popupProfileSelector, (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userPopup.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      popupProfiles.close();
    })
    .catch((error) =>
      console.error(`Упс..., произошла ошибка при работе с профилем ${error}`)
    )
    .finally(() => popupProfiles.setDefaultText());
});

// Форма карточки
const popupCard = new PopupWithForm(popupCardSelector, (data) => {
  Promise.all([api.getInitialCards(), api.addNewCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      cardList.addItemPrepend(createNewCard(dataCard));
      popupCard.close();
    })
    .catch((error) =>
      console.error(
        `Упс..., произошла ошибка при добавлении новой карточки ${error}`
      )
    )
    .finally(() => popupCard.setDefaultText());
});

const popupAvatar = new PopupWithForm(avatarSelectorPopup, (data) => {
  api
    .setChangeAvatar(data)
    .then((res) => {
      userPopup.setUserInfo({
        name: res.name,
        description: res.about,
        avatar: res.avatar,
      });
      popupAvatar.close();
    })
    .catch((error) =>
      console.error(
        `Упс..., произошла ошибка при смене фотографии профиля ${error}`
      )
    )
    .finally(() => popupAvatar.setDefaultText());
});

popupImag.setEventListeners();
popupProfiles.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

// конец ПР 8

// Переменная для валидации попапа с именем и местом работы
const validationForProfile = new FormValidator(
  formValidationConfig,
  profileForm
);
validationForProfile.enablevalidation();
// Переменная для валидации попапа с созданием карточек
const validationForCards = new FormValidator(
  formValidationConfig,
  cardCreatePopup
);
validationForCards.enablevalidation();

const validationForAvatar = new FormValidator(formValidationConfig, avatarForm);
validationForAvatar.enablevalidation();

function openProfilePopup() {
  validationForProfile.resetErrorBeforeOpenForm();
  popupProfiles.setInputValue(userPopup.getUserInfo());
  popupProfiles.open();
}
editButton.addEventListener("click", openProfilePopup);

profileAddButton.addEventListener("click", () => {
  cardCreatePopup.reset();
  validationForCards.resetErrorBeforeOpenForm();
  popupCard.open();
});

profileAvatarBtn.addEventListener("click", () => {
  validationForCards.resetErrorBeforeOpenForm();
  popupAvatar.open();
});

Promise.all([api.getInitialCards(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myid = dataUser._id));
    userPopup.setUserInfo({
      name: dataUser.name,
      description: dataUser.about,
      avatar: dataUser.avatar,
    });
    cardList.renderedItems(dataCard);
  })
  .catch((error) =>
    console.error(
      `Упс..., произошла ошибка при работе с карточками на странице ${error}`
    )
  );
