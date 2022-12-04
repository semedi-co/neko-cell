const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// debouce function for search input
// const debouceSearch = _.debounce((e) => {
//   product.formCari = e.target.value;
// }, 500);

export default debounce;
