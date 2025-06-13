$(window).load(function() {
  
  var WIDTH = $(window).width()
  var HEIGHT = $(window).height()
  
  var CANVAS = $("#canvas")[0]
  CANVAS.setAttribute("width", WIDTH)
	CANVAS.setAttribute("height", HEIGHT)
	var CONTEXT = CANVAS.getContext("2d")
  
  var MOUSE_X = 0
  var MOUSE_Y = 0
  
  var TRAIL = []
  var TRAIL_LENGTH = 15
  
  var loop = function() {
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    
    TRAIL.push([MOUSE_X, MOUSE_Y])
    if(TRAIL.length >= TRAIL_LENGTH) TRAIL.shift()
        
    CONTEXT.lineCap = 'round'
    CONTEXT.lineWidth = 2
    CONTEXT.beginPath()
    CONTEXT.moveTo(TRAIL[TRAIL.length-1][0], TRAIL[TRAIL.length-1][1])
    
    var opacity = 0
    for(var i = TRAIL.length - 2; i >= 0; i--) {
      opacity = i / (10*TRAIL_LENGTH)
      CONTEXT.strokeStyle = 'rgba(255, 255, 255, '+opacity+')'
      if(TRAIL[i-1]) {
        CONTEXT.quadraticCurveTo(TRAIL[i][0], TRAIL[i][1], (TRAIL[i-1][0] + TRAIL[i][0]) / 2, (TRAIL[i-1][1] + TRAIL[i][1]) / 2)
      } else {
        CONTEXT.lineTo(TRAIL[i][0], TRAIL[i][1])
      }
      CONTEXT.stroke()
    }
    
    CONTEXT.fillStyle = 'rgba(30, 255, 255, 1)'
    CONTEXT.beginPath()
    CONTEXT.arc(MOUSE_X, MOUSE_Y, 10, 0, Math.PI * 2, true)
    CONTEXT.fill()
  }
  
  
  $(document).mousemove(function(e) {
    MOUSE_X = e.clientX
    MOUSE_Y = e.clientY
  })
  
  $(document).bind('touchmove', function(e) {
    e = e.originalEvent ? e.originalEvent.touches[0] : e
    MOUSE_X = e.clientX
    MOUSE_Y = e.clientY
    return false
  })
  
  
  setInterval(loop, 33)
  
})
