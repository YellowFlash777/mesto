export default class Section {
    constructor(renderer, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    renderedItems(dataCard, myid) {
    dataCard.forEach((item) => {
      this._renderer(item, myid)
    });
  }

  addItemPrepend(elementCard) {
    this._container.prepend(elementCard);
    }

  addItemAppend(elementCard) {
    this._container.append(elementCard);
    }
  }

