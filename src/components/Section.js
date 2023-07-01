export default class Section {
    constructor(renderer, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }

    renderedItems(dataCard) {
    dataCard.forEach((item) => {
      this._renderer(item)
    });
  }

  addItemPrepend(elementCard) {
    this._container.prepend(elementCard);
    }

  addItemAppend(elementCard) {
    this._container.append(elementCard);
    }
  }

