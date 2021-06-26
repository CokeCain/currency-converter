import * as model from './model.js';
import fromView from './fromView.js';
import toView from './toView.js';
import convertView from './convertView.js';
import fromSelectView from './fromSelectView.js';
import toSelectView from './toSelectView.js';
import favoritesView from './favoritesView.js';

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

function calculate(st) {
  let index1, index2;
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
  };
  model.setResult(result);
  convertView.render(model.state.result);
}

const init = function () {
  controller();
  convertView.addHandlerGetRates(calculate);
  convertView.addHandlerCallCalculate(calculate);
  convertView.addHandlerFavoriteClick(calculate);
};

init();
