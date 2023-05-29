export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputList = form.querySelectorAll(this._inputSelector);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._invalidErrorClass = config.invalidErrorClass;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }
  _showInputError(errorElement, input) {
    input.classList.add(this._invalidErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
    }

  _hideInputError(errorElement, input) {
    input.classList.remove(this._invalidErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`${this._inputErrorClass}${input.name}`);
    if (input.validity.valid) {
      this._hideInputError(errorElement, input);
     } else {
      this._showInputError(errorElement, input);
     }
  }

  _setEventListener() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toogleButton()
      })
    })
  }
  _toogleButton() {
    if (this._hasValidInput()) {
      this._enableButton();
  } else {
      this._disableButton(this._button);
  }
  }
  _hasValidInput() {
    return Array.from(this._inputList).every((input) => input.validity.valid);
  }
  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass)
    this._button.disabled = false;
  }
  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }
  //
  enablevalidation() {
    this._setEventListener();
  }
     resetErrorBeforeOpenForm() {
      this._inputList.forEach(input => {
        const errorElement = this._form.querySelector(`${this._inputErrorClass}${input.name}`);
        if (!input.validity.valid) {
          this._hideInputError(errorElement, input)
        }
      })
      this._disableButton();
  // +
    }
}
