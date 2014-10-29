function range(s, e) {
  if (arguments.length == 1) {
    e = s
    s = 1
  }
  if (s > e) return []
  var r = Array(e - s + 1), x = -1
  for (s; s <= e; s += 1) r[++x] = s
  return r
}
