const formValidationConfig = {
  allforms: document.forms,
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: '.popup__error_type_',
  errorClass: 'popup__error_active',
  invalidErrorClass: 'popup__error_invalid',
};


enablevalidation(formValidationConfig)
function enablevalidation(configuration) {
  const formList = Array.from(configuration.allforms);
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(configuration.inputSelector)
    const button = form.querySelector(configuration.submitButtonSelector)
    handleEventListener(inputList, button, configuration.inputErrorClass, configuration.errorClass, configuration.inactiveButtonClass, configuration.invalidErrorClass);
  })
}
function handleEventListener(inputList, button, inputErrorClass, errorClass, inactiveButtonClass, invalidErrorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, inputErrorClass, errorClass, invalidErrorClass);
      toogleButton(inputList, button, inactiveButtonClass)
    })
  })
}

function checkInputValidity(input, inputErrorClass, errorClass, invalidErrorClass) {
  const errorElement = document.querySelector(`${inputErrorClass}${input.name}`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, errorClass, invalidErrorClass);
   } else {
    showInputError(input, errorElement, errorClass, invalidErrorClass);
   }
  }

  function showInputError(input, errorElement, errorClass, invalidErrorClass) {
    input.classList.add(invalidErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(invalidErrorClass, errorClass);
  }

  function hideInputError(input, errorElement, errorClass, invalidErrorClass) {
    input.classList.remove(invalidErrorClass, errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(invalidErrorClass, errorClass);
  }
// кнопка
  function toogleButton(inputList, button, inactiveButtonClass) {
    if (hasValidInput(inputList)) {
      enableButton(button, inactiveButtonClass);
  } else {
      disableButton(button, inactiveButtonClass);
  }
  }
  // кнопка
  function hasValidInput(inputList) {
    return Array.from(inputList).every((input) => input.validity.valid)
  }
// кнопка
  function enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass)
    button.disabled = false;
  }
// кнопка
  function disableButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }
// кнопка
  function resetErrorBeforeOpenForm(form) {
    form.querySelectorAll(formValidationConfig.inputSelector).forEach((input) => {
      const errorElement = document.querySelector(`${formValidationConfig.inputErrorClass}${input.name}`)
      if (!input.validity.valid) {
      hideInputError(input, errorElement, formValidationConfig.invalidErrorClass, formValidationConfig.errorClass)
    }
  })
}
