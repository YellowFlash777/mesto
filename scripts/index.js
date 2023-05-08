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
const cardsTemplate = document.getElementById("template-cards");
const elementLists = document.querySelector(".element__lists");
const cardCreatePopup = cardPopup.querySelector(".popup__form");
const deleteButtonCard = cardPopup.querySelector(".popup__save-button");
// Константы для увеличения при нажатии
const popupImageCard = popupImage.querySelector(".popup-image__zoom");
const popupImageText = popupImage.querySelector(".popup-image__caption");

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
  resetErrorBeforeOpenForm(profileForm);
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



// Реализация 2-ого попапа с добавление карточек и удалением их
const templateCards = document.querySelector("#template-cards").content;
const cardElement = templateCards.querySelector(".element__wrapper");
// Работа с карточками
function createCard(object) {
  const cardElement = templateCards
    .querySelector(".element__wrapper")
    .cloneNode(true);
  const imageCards = cardElement.querySelector(".element__image");
  const trashCards = cardElement.querySelector(".element__trash-icon");
  const likeIconeCards = cardElement.querySelector(".element__icon");
  imageCards.src = object.link;
  imageCards.alt = object.name;
  cardElement.querySelector(".element__text").textContent = object.name;
  // Добавление лайка
  likeIconeCards.addEventListener("click", () => {
    likeIconeCards.classList.toggle("element__icon_active");
  });
  // Удаление карточки
  trashCards.addEventListener("click", () => {
    trashCards.closest(".element__wrapper").remove();
  });
  imageCards.addEventListener("click", () => {
    popupImageCard.src = object.link;
    popupImageCard.alt = object.name;
    popupImageText.textContent = object.name;
    openPopup(popupImage);
  });
  return cardElement;
}
initialCards.forEach((element) => {
  const creatCard = createCard(element);
  elementLists.append(creatCard);
});

profileAddButton.addEventListener("click", () => {
  const buttonFormForCard = formValidationConfig.inactiveButtonClass;
  disableButton(deleteButtonCard, buttonFormForCard);
  cardCreatePopup.reset();
  resetErrorBeforeOpenForm(cardCreatePopup);
  openPopup(cardPopup);
});

cardCreatePopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const initialCard = {
    name: newCardTitle.value,
    link: newCardUrl.value,
  };
  elementLists.prepend(createCard(initialCard));
  closePopup(cardPopup);
  evt.target.reset();
});


