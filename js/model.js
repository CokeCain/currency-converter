import * as config from './config.js';

export const state = {
  date: [],
  time: {},
  currency: [],
  rates: {},
  result: [],
  valuta: [],
  favorites: [],
};

export const getCurrencyCodes = async function () {
  try {
    const data = await fetch(`https://api.exchangerate.host/latest`);
    //getting CORS erros because exchangeratesapi is using http and netlify is forxing https
    // const data = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${config.API_KEY}`);
    const json = await data.json();
    //console.log(Object.keys(json.rates).length);
    populateRates(json);
  } catch (err) {
    console.log(err);
  }
};

export const getCurrencyNames = async function () {
  try {
    const data = await fetch(
      `https://gist.githubusercontent.com/Fluidbyte/2973986/raw/8bb35718d0c90fdacb388961c98b8d56abc392c9/Common-Currency.json`
    );
    const json = await data.json();
    createCurrencyObject(json);
  } catch (err) {
    console.log(err);
  }
};

function createCurrencyObject(data) {
  Object.keys(state.rates).forEach(cur => {
    if (data[cur])
      state.currency.push({
        code: cur,
        name: data[cur].name,
        rate: state.rates[cur],
        symbol: data[cur].symbol_native,
        name_plural: data[cur].name_plural,
      });
  });
}

export const setResult = function (result) {
  state.result = result;
};

const persistFavorites = function () {
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
};

export const addBookmark = function (from, to) {
  const set = `${from}-${to}`;
  state.favorites.push(set);
  state.result.favorited = true;
  persistFavorites();
};

export const deleteBookmark = function (from, to) {
  const index = state.favorites.findIndex(el => el === `${from}-${to}`);
  state.favorites.splice(index, 1);
  state.result.favorited = false;
  persistFavorites();
};

function populateRates(data) {
  state.date = data.date;
  state.rates = data.rates;
  state.time = getCurrentTime();
  state.rates['EUR'] = 1;
}

//helpers
function getCurrentTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  return `${hour}:${minute}`;
}

const init = function () {
  const storage = localStorage.getItem('favorites');
  if (storage) state.favorites = JSON.parse(storage);
};
init();
