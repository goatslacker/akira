function foldl(f, a, s) {
  if (arguments.length == 1) return function (a, s) { return foldl(f, a, s) }
  var i = 0, l = a.length, v
  if (s === undefined) {
    if (!l) throw new Error(emptyList)
    v = a[i++]
  } else {
    v = s
  }
  for (i; i < l; i += 1) v = f(v, a[i])
  return v
}
