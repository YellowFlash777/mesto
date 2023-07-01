import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitFormFunction = submitFormFunction;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__form-input");
    this._submitBtn = this._form.querySelector(".popup__save-button");
    this._defaultBtntxt = this._submitBtn.textContent;
  }
  close() {
    super.close();
    this._form.reset();
  }

  _getInputValue() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputValue(obj) {
    this._inputList.forEach((input) => {
      input.value = obj[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitBtn.textContent = `${this._submitBtn.textContent}...`;
      this._submitFormFunction(this._getInputValue());
    });
  }
  setDefaultText() {
    this._submitBtn.textContent = this._defaultBtntxt;
  }
}
