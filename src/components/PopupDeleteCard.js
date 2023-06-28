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
      this._submitFunction(this._item);
    })
  }
  open = (item) => {
    super.open();
    this._item = item;

  }
}
