export default class Card {
  constructor(
    cardData,
    cardsTemplate,
    openImagePopup,
    openDeletPopup,
    likeSwitch
  ) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._myid = cardData.myid;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._cardsTemplate = cardsTemplate;
    this._openImagePopup = openImagePopup;
    this._openDeletPopup = openDeletPopup;
    this._likeSwitch = likeSwitch;
    this._cloneEl = this._getTemplateClone();
    this._imageEl = this._cloneEl.querySelector(".element__image");
    this._trashIconEl = this._cloneEl.querySelector(".element__trash-icon");
    this._subtitle = this._cloneEl.querySelector(".element__text");
    this._likeIconEl = this._cloneEl.querySelector(".element__icon");
    this._counter = this._cloneEl.querySelector(".element__like-counter");
  }

  _getTemplateClone() {
    const templateEl = document
      .querySelector(this._cardsTemplate)
      .content.querySelector(".element__wrapper")
      .cloneNode(true);
    return templateEl;
  }

  _handlikebtn = () => {
    this._likeSwitch(this._likeIconEl, this._cardId);
   };

  _handDeleteTrashIcon = () => {
    this._openDeletPopup({ card: this, cardId: this._cardId });
  };

  handleRemoveCard() {
    this._cloneEl.remove();
    this._cloneElement = null;
  }

  _handZoomImage = () => {
    this._openImagePopup(this._cardData);
  };

  _setEventListeners() {
    this._likeIconEl.addEventListener("click", this._handlikebtn);
    this._trashIconEl.addEventListener("click", this._handDeleteTrashIcon);
    this._imageEl.addEventListener("click", this._handZoomImage);
  }

  _checkLikesQuantity() {
    this._likes.forEach(item => {
      if (item._id !== this._myId) {
        this._likeIconEl.classList.add("element__icon_active");
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }



  toogLike(likes) {
    this._likeIconEl.classList.toggle("element__icon_active");
    this._counter.textContent = likes.length;
  };

  _checkMineTrashButtonIcon() {
    if (this._ownerId !== this._myid) {
      this._trashIconEl.remove();
    }
  }

  createCard() {
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._subtitle.textContent = this._name;
    this._checkLikesQuantity();
    this._checkMineTrashButtonIcon();
    this._setEventListeners();
    return this._cloneEl;
  }
}





