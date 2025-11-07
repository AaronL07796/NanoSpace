/* An "Application" is a collection of named applets that may switch between
 * each other, only allowing one to execute at any given moment. This allows
 * one to construct multiple "modes" in the Application, only one of which is
 * active at a time. */
import Rails from "@rails/ujs";
Rails.start();


function Application (id) {
  this.modes = {}
  this.globals = {}
  this.current = null
  this.canvas = document.getElementById (id)
  this.ctx = this.canvas.getContext ("2d")
  this.mouse = {
    x: this.canvas.width * 0.5,
    y: this.canvas.height * 0.5,
    button: false
  }
  this.now = 0
  this.then = 0
  this.frame = 0
  this.interval = null
}

//$(document).ready(function() {
  // Get the CSRF token from the meta tag
//  console.log("before csrf");

//  var csrfToken = $('meta[name="csrf-token"]').attr('content');

//  console.log(csrfToken);
  
  // Set up jQuery to include the CSRF token in all AJAX requests
//  $.ajaxSetup({
//    headers: {
//      'X-CSRF-Token': csrfToken
//    }
//  });

//  console.log("after csrf");
//});

/* Attach an applet to this application. */
Application.prototype.attach = function (id, constructor) {
  var mode = new constructor ()

  this.modes[id] = mode
  mode.application = this
}

/* Activate the named mode, and start it's execution. */
Application.prototype.start = function (id) {
  var app = this,
      applet = this.modes[id],
      init

  /* Set up our event handlers. */
  document.body.onmousemove = function (e) {
    var x = e.pageX,
        y = e.pageY,
        el = app.canvas

    do {
      x -= el.offsetLeft
      y -= el.offsetTop
    } while (el = el.offsetParent)

    app.mouse.x = x
    app.mouse.y = y
    applet.mouseMove ()
  }

  this.canvas.onmousedown = function (e) {
    app.mouse.button = true
    applet.mouseDown ()
  }

  this.canvas.onmouseup = function (e) {
    app.mouse.button = false
    applet.mouseUp ()
  }

  this.canvas.onclick = function (e) {
    applet.mouseClick ()
  }

  /* Start the main loop. */
  init = Date.now ()  

  this.current = applet
  this.then = 0
  this.now = 0
  this.frame = 0

  applet.setup ()

  this.interval = setInterval (function () {
    app.now = Date.now () - init
    app.frame++
    applet.update ()
    applet.draw ()
    app.then = app.now
  }, 1000 / applet.constructor.FRAMERATE)
}

/* Halt the execution of the current mode. */
Application.prototype.stop = function () {
  document.body.onmousemove = null
  this.canvas.onmousedown = null
  this.canvas.onmouseup = null
  this.canvas.onclick = null

  if (this.interval !== null) {
    clearInterval (this.interval)
    this.interval = null
  }
}

/* (Gracefully) switch between application modes. */
Application.prototype.switchMode = function (id) {
  var app = this

  app.stop ()
  setTimeout (function () { app.start (id) }, 0)
}

/* Set a global value. */
Application.prototype.setGlobal = function (id, value) {
  this.globals[id] = value
}

/* Retrieve a global value. */
/*Application.prototype.getGlobal = function (id) {
  return this.globals[id] || null
}

document.addEventListener("DOMContentLoaded", () => {
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  fetch('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify({
      user: {
        name: "test",
        password: "password",
        password_confirmation: "password"
      }
    })
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
});

*/
