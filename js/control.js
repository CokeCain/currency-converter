import * as model from './model.js';
import fromView from './fromView.js';
import toView from './toView.js';
import convertView from './convertView.js';
import symbolView from './symbolView.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

const controller = async function () {
  try {
    await model.getCurrencyCodes();
    await model.getCurrencyNames();
    fromView.render(model.state.currency);
    toView.render(model.state.currency);
  } catch (err) {
    console.log(err);
  }
};

let index1, index2;
const calculate = function (amount, from, to) {
  model.state.currency.forEach((cur, i) => {
    if (cur.code.includes(from)) index1 = i;
    if (cur.code.includes(to)) index2 = i;
  });
  if (amount === '0' || amount === 0) {
    convertView.renderZeroError();
    return;
  }
  if (amount === 'letter') {
    convertView.renderLettersError();
    return;
  }
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
  symbolView.render(model.state.result);
};

const init = function () {
  controller();
  convertView.addHandlerGetRates(calculate);
};

init();
