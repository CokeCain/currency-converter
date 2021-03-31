import View from './view.js';

class FromView extends View {
  _parentElement = document.querySelector('.currency-from');

  _generateMarkup() {
    return this._data.map(cur => this._markup(cur)).join('');
  }

  _markup(val) {
    return `<li class="currency-list-item"><div class="currency-flag currency-flag-${val.code.toLowerCase()}"></div><span data-value="${val.code}">${
      val.code
    }</span> - ${val.name}</li>`;
    // return `<option value="${val.code}" style="background-image:url(${val.flag})><img style="width:30px;margin-right:10px;" src="${val.flag}">${val.code}</option>`;
  }
}

export default new FromView();
