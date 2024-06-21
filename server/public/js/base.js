/* Here, we set up some useful extensions to core JavaScript itself, since
 * we'll probably want to use them later on (because, of course, useful things
 * should be used). */

Math.TWO_PI = Math.PI * 2
Math.ONE_AND_A_HALF_PI = Math.PI * 1.5
Math.HALF_PI = Math.PI * 0.5

Math.constrain = function (i, min, max) {
  return i < min ? min : i > max ? max : i
}

Math.distance = function (x0, y0, x1, y1) {
  var dx = x1 - x0,
      dy = y1 - y0

  return Math.sqrt (dx * dx + dy * dy)
}

Math.randomRange = function (min, max) {
  return min + Math.random () * (max - min)
}

Math.roulette = function () {
  var n = arguments.length,
      pie = new Array (n),
      sum = 0,
      k = 0,
      i

  for (i = 0; i < n; ++i)
    sum += arguments[i]

  for (i = 0; i < n; ++i) {
    k += arguments[i]
    pie[i] = k / sum
  }

  k = Math.random ()

  for (i = 0; i < n; ++i)
    if (k < pie[i])
      return i

  /* If we got here, sum == 0, which means the user supplied invalid input. */
  return -1
}

Array.prototype.random = function () {
  return this[Math.floor (Math.random () * this.length)]
}

function roundRectPath (ctx, x, y, w, h, r) {
  var u = x + w - r,
      v = y + h - r

  x += r
  y += r

  ctx.arc (x, y, r, Math.PI,                Math.ONE_AND_A_HALF_PI, false)
  ctx.arc (u, y, r, Math.ONE_AND_A_HALF_PI, 0,                      false)
  ctx.arc (u, v, r, 0,                      Math.HALF_PI,           false)
  ctx.arc (x, v, r, Math.HALF_PI,           Math.PI,                false)
}
