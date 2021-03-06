function all(f, a) {
  if (arguments.length == 1) return function (a) { return all(f, a) }
  var i = 0, l = a.length
  for (i; i < l; i += 1) if (!f(a[i])) return false
  return true
}
