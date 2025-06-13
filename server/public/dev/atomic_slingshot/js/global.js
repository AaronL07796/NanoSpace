$(window).load(function() {
  
  var STAGE = {
    elem: $('#stage'),
    position: $('#stage').offset(),
    width: $('#stage').width(),
    height: $('#stage').height(),
    level_height: 93,
    level_offset: 32
  }
  
  var TARGET = {
    elem: null,
    width: 78,
    height: 54,
    hit_radius: 50
  }
  
  var SLINGSHOT = {
    x: 450,
    y: 460
  }
  
  var AMMO = {
    elem: null,
    radius: 12.5,
    close_radius: 25,
    pulling: false
  }
  
  var DOTS = {
    container: $('#dots'),
    elems: $('#dots span'),
    length: $('#dots span').length,
    radius: 3
  }
  
  
  var bind_slingshot_events = function() {
    AMMO.elem.bind('mousedown', grab_ammo)
    AMMO.elem.bind('touchstart', grab_ammo)
    $(document).bind('mouseup', release_ammo)
    $(document).bind('touchend', release_ammo)
  }
  
  var unbind_slingshot_events = function() {
    $(document).unbind('mousemove', pull_ammo)
    $(document).unbind('touchmove', pull_ammo)
    AMMO.elem.unbind('mousedown', grab_ammo)
    AMMO.elem.unbind('touchstart', grab_ammo)
    $(document).unbind('mouseup', release_ammo)
    $(document).unbind('touchend', release_ammo)
  }
  
  $(document).bind('touchstart', function(){return false})
  
  
  var load_slingshot = function() {
    AMMO.elem = $('<img />').attr('src', 'images/ammo/H.png').addClass('ammo')
    AMMO.elem.css({left: SLINGSHOT.x - AMMO.close_radius, top: SLINGSHOT.y - AMMO.close_radius})
    AMMO.elem.appendTo(STAGE.elem)
    bind_slingshot_events()
  }
  
  
  var grab_ammo = function() {
    AMMO.pulling = true
    $(document).bind('mousemove', pull_ammo)
    $(document).bind('touchmove', pull_ammo)
    align_dots()
    DOTS.container.show()
    return false
  }
  
  
  var release_ammo = function() {
    if(!AMMO.pulling) return
    
    DOTS.container.hide()
    
    AMMO.pulling = false
    unbind_slingshot_events()
    
    var ammo_position = AMMO.elem.position()
    var x = ammo_position.left - SLINGSHOT.x + AMMO.close_radius
    var y = ammo_position.top - SLINGSHOT.y + AMMO.close_radius
    var pull_distance = Math.sqrt(x*x + y*y)
    
    var travel_multiple = 4
    
    // The coordinates of the final position
    var xf = SLINGSHOT.x - travel_multiple * x
    var yf = SLINGSHOT.y - travel_multiple * y
    $('#pointer').css({left: xf, top: yf})
    
    // Are we going to hit the target?
    AMMO.hit_target = is_point_over_target(xf, yf)
      var angle = Math.atan(y/x)
      var bezier_angle = angle > 0 ? (90 - 57.2957 * angle) : (-90 - 57.2957 * angle)
      
      var bezier_params = {
        start: { 
          x: ammo_position.left, 
          y: ammo_position.top, 
          angle: bezier_angle
        },  
        end: { 
          x: xf - AMMO.radius,
          y: yf - AMMO.radius, 
          angle: -1*bezier_angle, 
          length: 0.25
        }
      }
      
      AMMO.elem.animate({
        width: 2*AMMO.radius,
        height: 2*AMMO.radius,
        path: new $.path.bezier(bezier_params)
      }, 750, 'linear', on_ammo_land)
//     AMMO.elem.animate({left: xf - AMMO.radius, top: yf - AMMO.radius}, 750, 'linear', on_ammo_land)
    
    return false
  }
  
  
  var pull_ammo = function(e) {
    e = e || window.event
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    
    var max_pull_distance = 200
    var multiple = 0.75
    
    // How far back have we pulled the ammo?
    var x = e.clientX - AMMO.close_radius - STAGE.position.left - SLINGSHOT.x
    var y = e.clientY - AMMO.close_radius - STAGE.position.top - SLINGSHOT.y
    
    var pull_distance = Math.sqrt(x*x + y*y)
    
    if(pull_distance <= max_pull_distance) {
      x *= multiple
      y *= multiple
      
    } else {
      pull_distance = max_pull_distance / pull_distance
      x *= multiple * pull_distance
      y *= multiple * pull_distance
    }
    
    // Move the ammo
    AMMO.elem.css({left: SLINGSHOT.x + x - AMMO.close_radius, top: SLINGSHOT.y + y - AMMO.close_radius})
    
    align_dots(x, y)
    
    return false
  }
  
  
  var align_dots = function(x, y) {
    // If we don't have x or y, just hide the dots offscreen
    if(!x || !y) {
      DOTS.elems.css('left', -999)
      return
    }
    
    var dot_multiple = 0.4
    
    for(var i = 0; i < DOTS.length; i++) {
      DOTS.elems.eq(i).css({
        left: SLINGSHOT.x - i*x*dot_multiple - DOTS.radius,
        top: SLINGSHOT.y - i*y*dot_multiple - DOTS.radius,
        opacity: 1 - Math.pow(i / DOTS.length, 2/3)
      })
    }
  }
  
  
  var on_ammo_land = function() {
    // AMMO.elem.remove()
    
    // Did we hit the target?
    if(AMMO.hit_target) {
      TARGET.elem.remove()
      create_random_target()
      
    } else {
    }
    
    // Reload the slingshot
    load_slingshot()
  }
  
  
  var create_random_target = function() {
    TARGET.elem = $('<div />').addClass('target')
    TARGET.elem.addClass('H2O')
    
    var level = 1 + Math.floor(Math.random()*3)
    
    TARGET.left = Math.random() * (STAGE.width - TARGET.width)
    TARGET.top = level * STAGE.level_height - TARGET.height - STAGE.level_offset
    
    TARGET.x = TARGET.left + TARGET.width/2
    TARGET.y = TARGET.top + TARGET.height/2
    
    TARGET.elem.css({left: TARGET.left, top: TARGET.top})
    TARGET.elem.appendTo(STAGE.elem)
  }
  
  
  var is_point_over_target = function(x, y) {
    var distance = Math.sqrt(Math.pow(TARGET.x-x, 2) + Math.pow(TARGET.y-y, 2))
    if(distance <= TARGET.hit_radius)
      return true
    else
      return false
  }
  
  
  create_random_target()
  load_slingshot()
  
})