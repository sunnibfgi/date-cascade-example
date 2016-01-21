
module.exports = {
  arrayNext: function(arr, item) {
    var len = arr.length,
      next;
    arr.forEach(function(el, i) {
      if (el === item) {
        next = i + 1 > len - 1 ? 0 : i + 1;
      }
    });
    return arr[next];
  },
  arrayPrev: function(arr, item) {
    var len = arr.length,
      prev;
    arr.forEach(function(el, i) {
      if (el === item) {
        prev = i - 1 < 0 ? len - 1 : i - 1;
      }
    });
    return arr[prev];
  }
};