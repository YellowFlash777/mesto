export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButtons = this._popup.querySelector('.popup__close-button');
    this._form = this._popup.querySelector('.popup__form');

  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
    this.close();
    }
  }
  _handleCloseByOverlay = (event) => {
    if (event.currentTarget === event.target) {
      this.close();
  }
  }
  _handleCloseButton = () => {
    this.close();
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupCloseButtons.addEventListener('click', this._handleCloseButton)
    this._popup.addEventListener('click', this._handleCloseByOverlay)
}
}


