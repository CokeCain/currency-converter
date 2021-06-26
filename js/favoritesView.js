import View from './view.js';

class FavoritesView extends View {
  _parentElement = document.querySelector('.favorites');

  _generateMarkup() {
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    return `<button class="favorite-button" data-change="${val.split('-')[0]}-${val.split('-')[1]}">${val.split('-')[0]} > ${
      val.split('-')[1]
    }</button>`;
  }
}

export default new FavoritesView();
