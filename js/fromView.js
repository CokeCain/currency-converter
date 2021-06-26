import View from './view.js';

class FromView extends View {
  _parentElement = document.querySelector('.currency-from');

  _generateMarkup() {
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    return `<li class="currency-list-item"><div class="currency-flag currency-flag-${val.code.toLowerCase()}"></div><span class="kokara" data-value="${
      val.code
    }">${val.code}</span> - ${val.name}</li>`;
  }
}

export default new FromView();
