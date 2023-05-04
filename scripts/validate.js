const formValidationConfig = {
  allforms: document.forms,
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: '.popup__error_type_',
  errorClass: 'popup__error_active',
  invalidErrorClass: 'popup__error_invalid',
};
console.dir(formValidationConfig);
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
    errorElement.classList.add(invalidErrorClass);
  }

  function hideInputError(input, errorElement, errorClass, invalidErrorClass) {
    input.classList.remove(invalidErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(invalidErrorClass);
  }

  function toogleButton(inputList, button, inactiveButtonClass) {
    if (hasValidInput(inputList)) {
      enableButton(button, inactiveButtonClass);
  } else {
      disableButton(button, inactiveButtonClass);
  }
  }
  function hasValidInput(inputList) {
    return Array.from(inputList).every((input) => input.validity.valid)
  }

  function enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass)
    button.disabled = false;
  }

  function disableButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }

  function resetErrorForOpenForm(form) {
    form.querySelectorAll(formValidationConfig.inputSelector).forEach((input) => {
      const errorElement = document.querySelector(`${formValidationConfig.inputErrorClass}${input.name}`)
      console.log(errorElement);
      if (!input.validity.valid) {
      hideInputError(input, errorElement, formValidationConfig.invalidErrorClass, formValidationConfig.errorClass)
    }
  })
}
