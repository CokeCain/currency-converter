//<i class="far fa-heart"></i>

import View from './view.js';

class FavoriteButtonView extends View {
  _parentElement = document.querySelector('.add-to-favorites');

  _generateMarkup() {
    return `<div class="toggle-favorite"><i class="${this._data ? 'fas' : 'far'} fa-heart"></i><p style="margin-top:10px">${
      !this._data ? 'Add favorite' : 'Remove favorite'
    }</p></div>`;
  }

  addHandlerFavoriteToggle(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.toggle-favorite');
      if (!btn) return;
      handler();
    });
  }
}

export default new FavoriteButtonView();
