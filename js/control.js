import * as model from './model.js';
import fromView from './fromView.js';
import toView from './toView.js';
import convertView from './convertView.js';
import fromSelectView from './fromSelectView.js';
import toSelectView from './toSelectView.js';
import favoritesView from './favoritesView.js';
import favoriteButtonView from './favoriteButtonView.js';

/* import 'core-js/stable';
import 'regenerator-runtime/runtime'; */

const controller = async function () {
  try {
    await model.getCurrencyCodes();
    await model.getCurrencyNames();
    fromView.render(model.state.currency);
    toView.render(model.state.currency);
    favoritesView.render(model.state.favorites);
    /* fromSelectView.render(model.state.currency);
    toSelectView.render(model.state.currency); */
  } catch (err) {
    console.log(err);
  }
};

function checkIfFavorited(from, to) {
  if (model.state.favorites.includes(`${from}-${to}`)) return true;
  else return false;
}

function calculate(st) {
  let index1, index2, favorited;
  if (st === 'letter') {
    convertView.renderLettersError();
    return;
  }
  if (st === 0) {
    convertView.renderZeroError();
    return;
  }
  let amount = document.querySelector('.input-amount').value;
  let from = document.querySelector('.button-from span').dataset.value;
  let to = document.querySelector('.button-to span').dataset.value;

  model.state.currency.forEach((cur, i) => {
    if (cur.code.includes(from)) index1 = i;
    if (cur.code.includes(to)) index2 = i;
  });

  let result = {
    amount: amount,
    from: from,
    to: to,
    calc: ((model.state.rates[to] / model.state.rates[from]) * amount).toFixed(6),
    rate1: model.state.rates[to],
    rate0: model.state.rates[from],
    symbol: model.state.currency[index1].symbol,
    nameFrom: model.state.currency[index1].name,
    nameTo: model.state.currency[index2].name_plural,
    favorited: checkIfFavorited(from, to),
  };

  model.setResult(result);
  convertView.render(model.state.result);
  favoriteButtonView.render(model.state.result.favorited);
}

const controlBookmarks = function () {
  let from = document.querySelector('.button-from span').dataset.value;
  let to = document.querySelector('.button-to span').dataset.value;
  if (checkIfFavorited(from, to)) model.deleteBookmark(from, to);
  else model.addBookmark(from, to);

  favoritesView.render(model.state.favorites);
  favoriteButtonView.render(model.state.result.favorited);
};

const init = function () {
  controller();
  convertView.addHandlerGetRates(calculate);
  convertView.addHandlerCallCalculate(calculate);
  convertView.addHandlerFavoriteClick(calculate);
  favoriteButtonView.addHandlerFavoriteToggle(controlBookmarks);
};

init();
