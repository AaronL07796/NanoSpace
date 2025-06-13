/*
Oh, hi!

This JS is just a proof-of-concept, so it's a bit messy
and mostly lacks comments and overall consistency.

Sorry, yo.

-Arg
adam@jackadam.net

*/

var JS3D = function() {
  
  var _this_ = {}
  
  var CONTAINER = null
  var CONTEXT = null
  var OBJECTS = []
  var CAMERA = {}
  var SCREEN_SIZE = [0, 0]
  var HALF_SCREEN_SIZE = [0, 0]
  var ANGLE_OF_VIEW = [0, 0]
  var SPHERE_IMG = null
  
  
  var ROTATION_SPEED = 0.025
  
  var loop = function() {
    var object
    var x, y, z, x2, y2, z2, d_xz, ang_x, ang_y, left, top
    var color
    
    var num_objects = OBJECTS.length
    
    var x2, y2, z2
    
    for(var i = num_objects-1; i >= 0; i--) {
      object = OBJECTS[i]
      
      x2 = object.z*Math.sin(ROTATION_SPEED) + object.x*Math.cos(ROTATION_SPEED)
      y2 = object.y
      z2 = object.z*Math.cos(ROTATION_SPEED) - object.x*Math.sin(ROTATION_SPEED)
      object.x = x2
      object.y = y2
      object.z = z2
      
      x = object.x - CAMERA.x
      x2 = x*x
      y = object.y - CAMERA.y
      y2 = y*y
      z = object.z - CAMERA.z
      z2 = z*z
      
      // Don't show if it's behind the camera
      if(z > 0) {
        object.hidden = true
        continue;
      } else {
        object.hidden = false
      }
            
      d_xz = Math.sqrt(x2 + z2)
      ang_y = Math.atan(y / d_xz) - CAMERA.ang_y
      object.top = HALF_SCREEN_SIZE[1] * (1 + (ang_y / ANGLE_OF_VIEW[1]))

      d_yz = Math.sqrt(y2 + z2)
      ang_x = Math.atan(x / d_yz) - CAMERA.ang_x
      object.left = HALF_SCREEN_SIZE[0] * (1 + (ang_x / ANGLE_OF_VIEW[0]))
      
      object.dist = Math.sqrt(x2 + y2 + z2)
      
      object.color = Math.round(Math.max(30, Math.min(255, 255 * (1 - object.dist/200))))
      object.size = object.r * Math.tan(1/object.dist)
    }
    
    CAMERA.x += CAMERA.vx
    CAMERA.y += CAMERA.vy
    CAMERA.z += CAMERA.vz
    CAMERA.ang_x += CAMERA.ang_vx
    CAMERA.ang_y += CAMERA.ang_vy
    
    draw()
  }
  
  
  var draw = function() {
    CONTEXT.clearRect(0, 0, SCREEN_SIZE[0], SCREEN_SIZE[1])
    
    var object
    var num_objects = OBJECTS.length
    
    OBJECTS.sort(function(a, b){return a.dist - b.dist})
        
    for(var i = num_objects-1; i >= 0; i--) {
      object = OBJECTS[i]
      if(object.hidden) continue
            
      // if(object.c == 0)
      //   CONTEXT.fillStyle = 'rgba('+object.color+', '+object.color+', 30, 0.95)'
      // else if(object.c == 1)
      //   CONTEXT.fillStyle = 'rgba('+object.color+', 30, '+object.color+', 0.95)'
      // else if(object.c == 2)
      //   CONTEXT.fillStyle = 'rgba(30, '+object.color+', '+object.color+', 0.95)'
      //       
      // 
      // CONTEXT.beginPath()
      // CONTEXT.arc(object.left, object.top, object.size, 0, Math.PI * 2, true)
      // CONTEXT.fill()
            
      CONTEXT.save()
      
      CONTEXT.beginPath()
      CONTEXT.arc(object.left, object.top, object.size, Math.PI * 2, false)
      CONTEXT.clip()
      
      // Draw the darker shadow
      CONTEXT.fillStyle = 'rgb(128, 30, 50)'
      CONTEXT.fillRect(object.left - object.size, object.top - object.size, 2*object.size, 2*object.size)
      
      // Draw the lighter fill color
      CONTEXT.fillStyle = 'rgb(193, 58, 37)'
      CONTEXT.beginPath()
      CONTEXT.arc(object.left + 0.15*object.size, object.top - 0.3*object.size, 1.05*object.size, Math.PI * 2, false)
      CONTEXT.fill()
      
      CONTEXT.restore()
      
      // CONTEXT.drawImage(SPHERE_IMG, object.left, object.top, object.size, object.size)
    }
    
    
    // var opac
    // for(var j = 0; j < SCREEN_SIZE[1]; j+=4) {
    //   opac = Math.random() / 20
    //   CONTEXT.fillStyle = 'rgba(30, 30, 30, '+opac+')'
    //   CONTEXT.fillRect(0, j, SCREEN_SIZE[0], 2)
    // }
  }
  
  
  var setup = function() {
    SCREEN_SIZE = [CONTAINER.width(), CONTAINER.height()]
    HALF_SCREEN_SIZE = [SCREEN_SIZE[0]/2, SCREEN_SIZE[1]/2]
    ANGLE_OF_VIEW = [Math.PI/3, (SCREEN_SIZE[1] / SCREEN_SIZE[0]) * Math.PI/3]
    
    var canvas = $("#canvas")[0]
    canvas.setAttribute("width", SCREEN_SIZE[0])
  	canvas.setAttribute("height", SCREEN_SIZE[1])
  	CONTAINER[0].appendChild(canvas)
  	CONTEXT = canvas.getContext("2d")
  	
  	SPHERE_IMG = $('#sphere')[0]
  }
  
  
  _this_.initialize = function(container, camera, objects) {
    CONTAINER = container
    CAMERA = camera
    OBJECTS = objects
    setup()
    setInterval(loop, 33)
  }
  
  
  var CAMERA_SPEED = [0, 0, 0]
  $(document).keydown(function(e) {
    var speed = 2
    
    if(e.keyCode == 37) {
      CAMERA.vx = -1*speed
    } else if(e.keyCode == 39) {
      CAMERA.vx = speed
    } else if(e.keyCode == 38) {
      CAMERA.vy = -1*speed
    } else if(e.keyCode == 40) {
      CAMERA.vy = speed
    } else if(e.keyCode == 65) {
      CAMERA.vz = -2*speed
    } else if(e.keyCode == 90) {
      CAMERA.vz = 2*speed
    // } else if(e.keyCode == 73) {
    //   CAMERA.ang_vy = -.01*speed
    // } else if(e.keyCode == 75) {
    //   CAMERA.ang_vy = .01*speed
    // } else if(e.keyCode == 74) {
    //   CAMERA.ang_vx = -.01*speed
    // } else if(e.keyCode == 76) {
    //   CAMERA.ang_vx = .01*speed
    } else {
      return
    }
  })
  
  $(document).keyup(function(e) {
    if(e.keyCode == 37) {
      CAMERA.vx = 0
    } else if(e.keyCode == 39) {
      CAMERA.vx = 0
    } else if(e.keyCode == 38) {
      CAMERA.vy = 0
    } else if(e.keyCode == 40) {
      CAMERA.vy = 0
    } else if(e.keyCode == 65) {
      CAMERA.vz = 0
    } else if(e.keyCode == 90) {
      CAMERA.vz = 0
    // } else if(e.keyCode == 73) {
    //   CAMERA.ang_vy = 0
    // } else if(e.keyCode == 75) {
    //   CAMERA.ang_vy = 0
    // } else if(e.keyCode == 74) {
    //   CAMERA.ang_vx = 0
    // } else if(e.keyCode == 76) {
    //   CAMERA.ang_vx = 0
    } else {
      return
    }
  })
  
  
  Math.sgn = function(x) {
    if(x > 0) return 1;
    if(x < 0) return -1;
    return 0
  }
  
    
  return _this_
  
}()