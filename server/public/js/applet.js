/* An "Applet" is a miniature application; in the UNIX philosophy, it does one
 * thing (whatever that may be) and does it well. (While you could, in theory,
 * build an entire multi-faceted application out of a single Applet, that way
 * lies madness.
 *
 * To make an Applet, the simplest approach would be to create a new
 * constructor inheriting from Applet and overriding `setup()`, `draw()`, and
 * any event handling functions needed to build whatever it is you're trying to
 * build.
 *
 * The astute reader who notices the similarity between building an Applet and
 * working with Processing should not, on the whole, be considered insane. */
function Applet () {
  this.application = null
}

/* If you wish to change the target framerate in a subconstructor, simply
 * override this FRAMERATE constant on that constructor. */
Applet.FRAMERATE = 60

/* When creating your own Applet, you should override some number of the below
 * methods in order to do so. */
Applet.prototype.setup = function () {}
Applet.prototype.update = function () {}
Applet.prototype.draw = function () {}
Applet.prototype.mouseMove = function () {}
Applet.prototype.mouseDown = function () {}
Applet.prototype.mouseUp = function () {}
Applet.prototype.mouseClick = function () {}

/* Wrappers around Application methods, for convenience. */
Applet.prototype.getContext = function () {
  return this.application.ctx
}

Applet.prototype.getWidth = function () {
  return this.application.canvas.width
}

Applet.prototype.getHeight = function () {
  return this.application.canvas.height
}

Applet.prototype.getMillis = function () {
  return this.application.now
}

Applet.prototype.getPrevMillis = function () {
  return this.application.then
}

Applet.prototype.getFrame = function () {
  return this.application.frame
}

Applet.prototype.getMouseX = function () {
  return this.application.mouse.x
}

Applet.prototype.getMouseY = function () {
  return this.application.mouse.y
}

Applet.prototype.getGlobal = function (id) {
  return this.application.getGlobal (id)
}

Applet.prototype.setGlobal = function (id, value) {
  this.application.setGlobal (id, value)
}

Applet.prototype.switchMode = function (id) {
  this.application.switchMode (id)
}
