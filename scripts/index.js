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
const jobInput = popupProfile.querySelector(
  ".popup__form-input_type_description"
);
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

// Первый попап, 4ПР открытие закрытие карточки Кусто

function openPopup(popups) {
  popups.classList.add("popup_opened");
}

function closePopup(popups) {
  popups.classList.remove("popup_opened");
}

function openProfilePopup() {
  nameInput.value = namePopup.textContent;
  jobInput.value = jobPopup.textContent;
  openPopup(popupProfile);
}
editButton.addEventListener("click", openProfilePopup);

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  namePopup.textContent = nameInput.value;
  jobPopup.textContent = jobInput.value;
  closePopup(popupProfile);
});

popupCloseButtons.forEach(function (item) {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => {
    closePopup(popup);
  });
});
//

// Реализация 2-ого попапа с добавление карточек и удалением их
const templateCards = document.querySelector("#template-cards").content;
const cardElement = templateCards.querySelector(".element__wrapper");
// Массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
