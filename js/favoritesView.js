import View from './view.js';

class FavoritesView extends View {
  _parentElement = document.querySelector('.favorites');

  _generateMarkup() {
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    console.log(val);
    return `<button class="favorite-button" data-change="${val.from}-${val.to}">${val.from} > ${val.to}</button>`;
  }
}

export default new FavoritesView();
