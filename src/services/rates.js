const RATE_CACHE = {
  rates: [],
  expiry: 0
};

export default  () => {
    if (RATE_CACHE && RATE_CACHE.expiry > (new Date()).getTime()) {
      return new Promise((resolve, reject) => {
        resolve(RATE_CACHE.rates);
      });
    }
    let url =  'https://api.exchangeratesapi.io/latest?base=CAD';
    // TODO isomorphic fetch does not support signal, find replacement
    return fetch(url, {signal: controller.signal}).then(response => response.json()).then(data => {
      RATE_CACHE.rates = data;
      RATE_CACHE.expiry = (new Date()).getTime() + 10000;
      return data;
    });
  };