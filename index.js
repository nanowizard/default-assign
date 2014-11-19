'use strict';

module.exports = function defaultAssign(target, firstSource) {
  if (target === undefined || target === null)
    throw new TypeError("Cannot convert first argument to object");

  var to = Object(target);

  var hasPendingException = false;
  var pendingException;

  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null)
      continue;

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      try {
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if(desc !== undefined && desc.enumerable){
          if (to[nextKey] === undefined){
            to[nextKey] = nextSource[nextKey];
          }
          else if(typeof nextSource[nextKey] === 'object'){
            to[nextKey] = defaultAssign(to[nextKey], nextSource[nextKey]);
          }
        }
      } catch (e) {
        if (!hasPendingException) {
          hasPendingException = true;
          pendingException = e;
        }
      }
    }

    if (hasPendingException)
      throw pendingException;
  }
  return to;
}
