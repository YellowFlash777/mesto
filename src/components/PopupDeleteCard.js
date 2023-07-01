import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {

  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;

  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFunction({card: this._card, cardId: this._cardId});
    })
  }
  open = ({card, cardId}) => {
    super.open();
    this._card = card;
    this._cardId = cardId;

  }
}
