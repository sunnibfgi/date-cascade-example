module.exports = {
  arrayNext: (arr, item) => {
    var len = arr.length,
      next;
    arr.forEach((el, i) => {
      if (el === item) {
        next = i + 1 > len - 1 ? 0 : i + 1;
        return;
      }
    });
    return arr[next];
  },
  arrayPrev: (arr, item) => {
    var len = arr.length,
      prev;
    arr.forEach((el, i) => {
      if (el === item) {
        prev = i - 1 < 0 ? len - 1 : i - 1;
        return;
      }
    });
    return arr[prev];
  }
};