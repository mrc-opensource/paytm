export default  () => {
    let url =
      'https://api.exchangeratesapi.io/latest?base=CAD';
    // TODO isomorphic fetch does not support signal, find replacement
    return fetch(url).then(response => response.json());
  };