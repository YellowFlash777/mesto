import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageCard = document.querySelector('.popup-image__zoom');
    this._popupImageText = this._popup.querySelectorAll('.popup-image__caption');
  }

  open = (object) => {
    this._popupImageCard.src = object.link;
    this._popupImageCard.alt = object.title;
    this._popupImageText.textContent = object.title;
    super.open();
  }
}
