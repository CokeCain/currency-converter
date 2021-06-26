import View from './view.js';

class FromSelectView extends View {
  _parentElement = document.querySelector('.select-from');

  _generateMarkup() {
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    return `<option value="${val.code}">${val.code}</option>`;
  }
}

export default new FromSelectView();
