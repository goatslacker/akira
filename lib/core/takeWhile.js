function takeWhile(f, a) {
  if (arguments.length == 1) return function (a) { return takeWhile(f, a) }
  var i = 0, l = a.length, r = []
  for (i; i < l; i += 1)
    if (f(a[i]) === true) r.push(a[i])
    else break
  return r
}
