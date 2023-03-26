let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('popup__close-button');
let handleFormSubmit = popup.querySelector('profile__save-button');
let popupOpened = document.querySelector('.popup_opened');
let formElement = document.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__form-input_name');
let jobInput = formElement.querySelector('.popup__form-input_job');
let namePopup = document.querySelector('.profile__title-name');
let jobPopup = document.querySelector('.profile__text-job');

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    namePopup.textContent = nameInput.value;
    jobPopup.textContent = jobInput.value;

    popupOpened.classList.remove('popup_opened');
});

function handleClick () {
  popup.classList.add('popup_opened')
  }

  editButton.addEventListener('click', handleClick);







