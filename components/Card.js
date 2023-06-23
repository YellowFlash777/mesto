export default class Card {
  constructor(object, cardsTemplate, openImagePopup) {
    this._object = object;
    this._link = object.link;
    this._name = object.title;
    this._cardsTemplate = cardsTemplate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplateClone() {
    const templateEl = document.querySelector(this._cardsTemplate).content.querySelector('.element__wrapper').cloneNode(true);
    return templateEl;
  }
  _handlike = () =>  {
    this._likeIconEl.classList.toggle("element__icon_active");
  }
  _handDeleteTrashIcon = () => {
    this._trashIconEl.closest(".element__wrapper").remove()

  }
  _handZoomImage = () =>  {
    this._openImagePopup(this._object);
  }
  _setEventListeners() {
    this._likeIconEl.addEventListener('click', this._handlike);
    this._trashIconEl.addEventListener('click', this._handDeleteTrashIcon);
    this._imageEl.addEventListener('click', this._handZoomImage);
  }
  createCard() {
    this._cloneEl = this._getTemplateClone();
    this._imageEl = this._cloneEl.querySelector('.element__image');
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._subtitle = this._cloneEl.querySelector('.element__text');
    this._likeIconEl = this._cloneEl.querySelector('.element__icon');
    this._subtitle.textContent = this._name;
    this._trashIconEl = this._cloneEl.querySelector('.element__trash-icon');
    this._subtitle.textContent = this._name;
    this._setEventListeners();
    return this._cloneEl;
  }
}

