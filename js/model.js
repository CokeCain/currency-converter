export const state = {
  date: [],
  time: {},
  currency: [],
  rates: {},
  result: [],
  valuta: [],
};

export const getCurrencyCodes = async function () {
  try {
    const data = await fetch(`https://api.ratesapi.io/api/latest`);
    const json = await data.json();
    populateRates(json);
    console.log(json);
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
        symbol: data[cur].symbol_native,
        name_plural: data[cur].name_plural,
      });
  });
}

/* export const getSymbolsName = function (handler) {
  Promise.all(
    Object.keys(state.rates).map(request => {
      return fetch(`https://restcountries.eu/rest/v2/currency/${request}`)
        .then(response => response.json())
        .then(data => data);
    })
  )
    .then(values => {
      values.map(cur => addInfoToSymbol(cur[0]));
      handler();
    })
    .catch(console.error.bind(console));
}; 

function addInfoToSymbol(data) {
  let country = {
    code: data.currencies[0].code,
    symbol: data.currencies[0].symbol,
    flag: data.flag,
    name: data.currencies[0].name,
  };
  state.currency.push(country);
}
*/

export const setResult = function (result) {
  state.result = result;
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
