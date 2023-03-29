let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button');
console.log(popupCloseButton);
let formElement = popup.querySelector('.popup__form')
let nameInput = popup.querySelector('.popup__form-input_type_name');
let jobInput = popup.querySelector('.popup__form-input_type_description');
let namePopup = document.querySelector('.profile__title-name');
let jobPopup = document.querySelector('.profile__text-job');

function handleClick () {
  nameInput.value = namePopup.textContent;
  jobInput.value = jobPopup.textContent;
  popup.classList.add('popup_opened')
  }
  editButton.addEventListener('click', handleClick);


function popUpHidden () {
popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popUpHidden);

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    namePopup.textContent = nameInput.value;
    jobPopup.textContent = jobInput.value;
    popUpHidden();
});









