function take(n, a) {
  if (arguments.length == 1) return function (a) { return take(n, a) }
  if (n < 0) return []
  var i = 0, l = a.length, x = min([n, l]), r = Array(x)
  for (i; i < x; i += 1) r[i] = a[i]
  return r
}
