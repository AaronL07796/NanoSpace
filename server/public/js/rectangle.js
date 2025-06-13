/* Just a boring object to store the boundaries of a rectangle. */
function Rectangle (x, y, w, h) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h
}

/* Being nice, friendly, and totally sweet, we also provide an easing function
 * so that you can procedurally morph one rectangle into another. */
Rectangle.prototype.ease = function (r, k) {
  this.x += (r.x - this.x) * k
  this.y += (r.y - this.y) * k
  this.w += (r.w - this.w) * k
  this.h += (r.h - this.h) * k
}

/* Okay, so all that jazz about this being a boring object? I lied. You can
 * actually apply it to a canvas, making the coordinates visible on the canvas
 * correspond to the bounds of this rectangle.
 *
 * Pretty sweet, if I do say so myself. */
Rectangle.prototype.apply = function (ctx, width, height) {
  var w = (width || ctx.canvas.width) / this.w,
      h = (height || ctx.canvas.height) / this.h

  ctx.transform (w, 0, 0, h, -(this.x * w), -(this.y * h))
}

/* toString, for debugging. */
Rectangle.prototype.toString = function () {
  return "[Rectangle <" + this.x + "," + this.y + "," + this.w + "," + this.h + ">]"
}
