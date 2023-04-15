// Общие попапы
const popupProfile = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.card-element-popup');
const popupImage = document.querySelector('.popup-image');
//
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const formElement = popupProfile.querySelector('.popup__form')
// Инпуты для 1-ого первого попапа
const nameInput = popupProfile.querySelector('.popup__form-input_type_name');
const jobInput = popupProfile.querySelector('.popup__form-input_type_description');
const namePopup = document.querySelector('.profile__title-name');
const jobPopup = document.querySelector('.profile__text-job');
//

// инпуты для 2-ого попапа с карточками
const newCardTitle = cardPopup.querySelector('.popup__form-input_type_title');
const newCardUrl = cardPopup.querySelector('.popup__form-input_type_url');
//
const profileAddButton = document.querySelector('.profile__add-button')
const cardsTemplate = document.getElementById('template-cards');
const elementLists = document.querySelector('.element__lists');
const cardCreatePopup = cardPopup.querySelector('.popup__form');
const deleteButtonCard = cardPopup.querySelector('.popup__save-button');
// Константы для увеличения при нажатии
const popupImageCard = popupImage.querySelector('.popup-image__zoom');
const popupImageText = popupImage.querySelector('.popup-image__caption');

// Первый попап, 4ПР открытие закрытие карточки Кусто


function handleClick () {
  nameInput.value = namePopup.textContent;
  jobInput.value = jobPopup.textContent;
  popupProfile.classList.add('popup_opened');
  }
  editButton.addEventListener('click', handleClick);


function popUpOpen (popup) {
  popup.classList.add('popup_opened');
}

function popUpHidden (popup) {
  popup.classList.remove('popup_opened');
}


formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    namePopup.textContent = nameInput.value;
    jobPopup.textContent = jobInput.value;
    popUpHidden(popupProfile);
});

popupCloseButton.forEach(function(item) {
  const popup = item.closest('.popup')
  item.addEventListener('click', () => {
  popUpHidden(popup)});
});
//

// Реализация 2-ого попапа с добавление карточек и удалением их
const templateCards = document.querySelector('#template-cards').content;
const listCards = templateCards.querySelector('.element__wrapper');
// Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function findCard(object) {
  const listCards = templateCards.querySelector('.element__wrapper').cloneNode(true);
  const imageCards = listCards.querySelector('.element__image');
  const trashCards = listCards.querySelector('.element__trash-icon');
  const likeIconeCards = listCards.querySelector('.element__icon');
  imageCards.src = object.link;
  imageCards.alt = object.name;
  listCards.querySelector('.element__text').textContent = object.name;
  // Добавление лайка
  likeIconeCards.addEventListener('click', () => {
    likeIconeCards.classList.toggle('element__icon_active')});
  // Удаление карточки
  trashCards.addEventListener('click', () => {
    trashCards.closest('.element__wrapper').remove()
  });
    imageCards.addEventListener('click', () => {
    popupImageCard.src = object.link;
    popupImageCard.alt = object.name;
    popupImageText.textContent = object.name;
    popUpOpen(popupImage)
  });
  return listCards;
}
initialCards.forEach((element) => {
  const creatCard = findCard(element);
  elementLists.append(creatCard);
});

function deleteCard() {
  cardCreatePopup.classList.remove('.popup__form');
}


profileAddButton.addEventListener('click', () => {
  cardPopup.classList.add('popup_opened');
});

cardCreatePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const initialCard = {
    name: newCardTitle.value,
    link: newCardUrl.value
  };
  elementLists.prepend(findCard(initialCard));
  popUpHidden(cardPopup);
  evt.target.reset();
});


