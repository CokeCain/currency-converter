import View from './view.js';
import symbolView from './symbolView.js';

class ConvertView extends View {
  _parentElement = document.querySelector('.result');
  _zeroMessage = `Please enter an amount greater than 0`;
  _lettersMessage = `Please enter a valid amount`;

  _activeFrom;
  _activeTo;
  _generateMarkup() {
    symbolView.render(this._data.symbol);
    return `
    <p class="from">${this._data.amount} ${this._data.nameFrom} =</p>
    <p class="is-equal">${this._styleDifferently(this._data.calc)} ${this._data.nameTo}</p>
    <p class="rate-1">1 ${this._data.from} = ${this._data.rate1 / this._data.rate0} ${this._data.to}</p>
    <p class="rate-2">1 ${this._data.to} = ${this._data.rate0 / this._data.rate1} ${this._data.from}</p>
    `;
  }

  _styleDifferently(val) {
    let localed = this._setLocaleResult(val);
    if (localed.includes('.')) {
      let index;
      if (localed.indexOf(',') <= localed.indexOf('.')) index = localed.indexOf('.');
      else index = localed.indexOf(',');
      let firstPart = localed.slice(0, localed.length - (localed.length - (index + 3)));
      let lastPart = localed.slice(index + 2);
      return `${firstPart}<span>${lastPart}</span>`;
    }
    return val;
  }

  _setLocaleResult(val) {
    let language = navigator.languages != undefined ? navigator.languages[0] : navigator.language;
    let result = new Intl.NumberFormat(language).format(val);
    return result;
  }

  addHandlerGetRates(handler) {
    document.querySelector('.flex').addEventListener('click', function (e) {
      let numbers = /^[0-9]+$/;
      if (document.querySelector('.input-amount').value === '0') handler(0);
      if (document.querySelector('.input-amount').value.match(numbers)) {
        if (document.querySelector('.button-from span') !== null && document.querySelector('.button-to span') !== null)
          handler(
            document.querySelector('.input-amount').value,
            document.querySelector('.button-from span').dataset.value,
            document.querySelector('.button-to span').dataset.value
          );
      } else handler('letter');
    });
    document.querySelector('.input-amount').addEventListener('input', function (e) {
      let numbers = /^[0-9]+$/;
      if (document.querySelector('.input-amount').value === '0') handler(0);
      if (document.querySelector('.input-amount').value.match(numbers)) {
        if (document.querySelector('.button-from span') !== null && document.querySelector('.button-to span') !== null) handler();
      } else handler('letter');
    });
  }

  addHandlerCallCalculate(handler) {
    document.querySelector('.switch').addEventListener('click', function () {
      document.querySelectorAll('.currency-from .currency-list-item').forEach((cur, i) => {
        if (cur.classList.contains('active')) {
          this._activeFrom = i;
          cur.classList.remove('active');
        } else return;
      });
      document.querySelectorAll('.currency-to .currency-list-item').forEach((cur, i) => {
        if (cur.classList.contains('active')) {
          this._activeTo = i;
          cur.classList.remove('active');
        } else return;
      });
      if (this._activeFrom !== undefined && this._activeTo !== undefined) {
        document.querySelectorAll('.currency-from .currency-list-item')[this._activeTo].classList.add('active');
        document.querySelector('.button-from.dropdown-button').innerHTML =
          document.querySelectorAll('.currency-from .currency-list-item')[this._activeTo].innerHTML;
        document.querySelectorAll('.currency-to .currency-list-item')[this._activeFrom].classList.add('active');
        document.querySelector('.button-to.dropdown-button').innerHTML =
          document.querySelectorAll('.currency-to .currency-list-item')[this._activeFrom].innerHTML;
        handler();
      } else {
        console.log('undefined');
        return;
      }
    });
  }

  addHandlerFavoriteClick(handler) {
    document.querySelector('.favorites').addEventListener('click', function (e) {
      const btn = e.target.closest('.favorite-button');
      if (!btn) return;
      const [from, to] = btn.dataset.change.split('-');
      // console.log(document.getElementById('from-dropdown'));
      const allFromValutes = [...document.querySelectorAll('.currency-from .currency-list-item span')];
      const allToValutes = [...document.querySelectorAll('.currency-from .currency-list-item span')];

      /* const findFrom=allFromValutes.findIndex(from);
      console.log(findFrom); */

      const fromDatasetArray = [];

      allFromValutes.forEach(cur => {
        fromDatasetArray.push(cur.dataset.value);
      });
      const findFrom = fromDatasetArray.indexOf(from);
      const findTo = fromDatasetArray.indexOf(to);

      document.querySelectorAll('.currency-from .currency-list-item').forEach(cur => cur.classList.remove('active'));
      document.querySelectorAll('.currency-to .currency-list-item').forEach(cur => cur.classList.remove('active'));
      document.querySelectorAll('.currency-to .currency-list-item')[findTo].classList.add('active');
      document.querySelectorAll('.currency-from .currency-list-item')[findFrom].classList.add('active');
      document.querySelector('.button-from.dropdown-button').innerHTML = allFromValutes[findFrom].parentElement.innerHTML;
      document.querySelector('.button-to.dropdown-button').innerHTML = allToValutes[findTo].parentElement.innerHTML;
      handler();
    });
  }
}

['from-dropdown', 'to-dropdown'].forEach(cur => document.getElementById(cur).addEventListener('click', showDropdown));

let activeDropdown = {};

function showDropdown(e) {
  let children = [...this.children];
  if (activeDropdown.id && activeDropdown.id !== e.target.id) {
    activeDropdown.ul.classList.remove('active');
  }
  if (e.target.tagName === 'LI') {
    activeDropdown.button.innerHTML = e.target.innerHTML;
    let children = [...e.target.parentNode.children];
    children.forEach(cur => cur.classList.remove('active'));
    e.target.classList.add('active');
  }
  children.forEach(cur => {
    if (cur.classList.contains('dropdown-selection')) {
      cur.classList.add('active');
      activeDropdown.ul = cur;
      activeDropdown.id = this.id;
    } else if (cur.classList.contains('dropdown-button')) {
      activeDropdown.button = cur;
    }
  });
}

//clicking outside
document.onclick = function (e) {
  if (activeDropdown.ul === undefined) return;
  if (!e.target.classList.contains('dropdown-button')) activeDropdown.ul.classList.remove('active');
};

export default new ConvertView();
