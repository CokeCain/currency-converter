export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderZeroError() {
    this._clear();
    this._parentElement.innerHTML = `<p>${this._zeroMessage}</p>`;
  }
  renderLettersError() {
    this._clear();
    this._parentElement.innerHTML = `<p>${this._lettersMessage}</p>`;
  }
}
