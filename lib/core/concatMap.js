function concatMap(f, a) {
  if (arguments.length == 1) return function (a) { return concatMap(f, a) }
  var i = 0, l = a.length, r = [], v
  for (i; i < l; i += 1) {
    v = f(a[i])
    isArray(v)
      ? [].push.apply(r, v)
      : r.push(v)
  }
  return r
}
