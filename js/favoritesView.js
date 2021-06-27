import View from './view.js';

class FavoritesView extends View {
  _parentElement = document.querySelector('.favorites');

  _generateMarkup() {
    console.log(this._data);
    if (this._data.length > 0) document.querySelector('.sub-title').style.display = 'block';
    else document.querySelector('.sub-title').style.display = 'none';
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    return `<button class="favorite-button" data-change="${val.split('-')[0]}-${val.split('-')[1]}">${val.split('-')[0]} > ${
      val.split('-')[1]
    }</button>`;
  }
}

export default new FavoritesView();
