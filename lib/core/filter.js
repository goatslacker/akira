function filter(f, a) {
  if (arguments.length == 1) return function (a) { return filter(f, a) }
  var i = 0, l = a.length, r = []
  for (i; i < l; i += 1) f(a[i]) === true && r.push(a[i])
  return r
}
