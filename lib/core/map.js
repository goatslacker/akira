function map(f, a) {
  if (arguments.length == 1) return function (a) { return map(f, a) }
  var i = 0, l = a.length, r = Array(l)
  for (i; i < l; i += 1) r[i] = f(a[i])
  return r
}
