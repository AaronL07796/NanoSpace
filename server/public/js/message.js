var Message = function() {
  var THIS = {}
  
  var SIZE = null
  var CONTAINER = null
  var ELEM_DISPLAYED = null
  
  var display_str = function(str, time, size) {
    if(!CONTAINER) return
    
    THIS.hide()
    if(!str) return
    
    if(typeof size == 'undefined') {
      if(str.length <= 5) {
        var size = '160px'
      } else if(str.length <= 10) {
        var size = '135px'
      } else {
        var size = '92px'
      }
    }
    
    CONTAINER_span.html(str).css('font-size', size)
    CONTAINER.clearQueue().removeClass(SIZE).addClass(size).css('opacity', 1).hide().fadeIn(200)
    SIZE = size
    
    if(time >= 0) {
      CONTAINER.delay(time).fadeOut(200)
    }
  }
  
  
  var display_elem = function(elem, time) {
    THIS.hide()
    ELEM_DISPLAYED = elem
    elem.clearQueue().css('opacity', 1).hide().fadeIn(200)
    if(time >= 0) {
      elem.delay(time).fadeOut(200)
    }
  }
  
  THIS.hide = function() {
    if(CONTAINER) CONTAINER.clearQueue().fadeOut(0)
    if(ELEM_DISPLAYED) ELEM_DISPLAYED.clearQueue().fadeOut(0)
  }
  
  
  THIS.display = function(message, time, size) {
    if(typeof time == 'undefined') time = 750
    
    if(!message || typeof message == 'string')  {
      display_str(message, time, size)
    } else {
      display_elem(message, time)
    }
  }
  
  
  $(function() {
    // Add the message div to the page
    CONTAINER = $('<div style="display:none"></div>')
    CONTAINER.addClass('_message')
    CONTAINER_span = $('<span></span>')
    CONTAINER_span.appendTo(CONTAINER)
    
    var container = $('.container')
    if(container.length == 0) container = $('body')
    CONTAINER.appendTo(container)
    
    // Style the container
    var style = ''
    style += '._message {'
    style += '  z-index:            9999;'
    style += '  position:           absolute;'
    style += '  top:                50%;'
    style += '  left:               50%;'
    style += '  width:              900px;'
    style += '  height:             250px;'
    style += '  line-height:        1;'
    style += '  margin:             -125px 0 0 -450px;'
    style += '  text-align:         center;'
    style += '  font-family:        "league-gothic-1","league-gothic-2",sans-serif;'
    style += '  -webkit-text-stroke:1px transparent;'
    style += '  text-shadow:        -.2em .2em 0 #000;'
    style += '  color:              #0FF;'
    style += '  }' + "\n"
      
    style += '._message span {'
    style += '  padding:            10px;'
    style += '  background-color:   transparent;'
    style += '  opacity:            1;'
    style += '  }' + "\n"
    
    $('<style type="text/css">'+style+'</style>').appendTo('head')
  })

  
  return THIS
}()
