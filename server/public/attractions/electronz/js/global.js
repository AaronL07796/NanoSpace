window._area = 'arcade'
window._attraction = 'electronz'

$(function() {
  
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var ELEMENTS = []
  for(var symbol in PERIODIC_TABLE) {ELEMENTS.push(symbol)}
  
  var CURRENT_ELEMENT_I = null
  
  var ELECTRONS_PER_SHELL = [2, 8, 18, 32, 50, 72, 98]
  
  var SHIP_IMG = $('#ship')[0]
  var SHIP_THRUSTER_IMG = $('#ship_thruster')[0]
  var SHIP_THRUSTER_REVERSE_IMG = $('#ship_thruster_reverse')[0]
  
  var CANVAS = $('#canvas')[0]
  var CANVAS_ELEM = CANVAS[0]
  var CONTEXT = CANVAS.getContext('2d')
  
  var FULL_WIDTH = CANVAS.width
  var FULL_HEIGHT = CANVAS.height
  var WIDTH = FULL_WIDTH
  var HEIGHT = FULL_HEIGHT
  
  var SCALE = 1
  var INTERVAL = 0
    
  var SHIP = {}
  SHIP.width = 41
  SHIP.height = 41
  SHIP.radius = SHIP.width/2
  SHIP.neg_width_2 = -1*SHIP.width/2
  SHIP.neg_height_2 = -1*SHIP.height/2
  SHIP.x = 60
  SHIP.y = 60
  SHIP.angle = Math.PI * 0.75
  SHIP.vx = 0
  SHIP.vy = 0
  SHIP.rotational_speed = 0.0035
  SHIP.rotational_direction = 0
  SHIP.thruster = 0
  SHIP.thruster_accel = 0.00075
  SHIP.coeff_friction = 0.025
  SHIP.fired_electrons = []
  SHIP.electron_speed = 0.8
  SHIP.mass = 10
  SHIP.fired_electron_count = 0
  SHIP.health = 1.0
  SHIP.invulnerable = false
  SHIP.invulnerable_time = null
  SHIP.invulnerable_pulse_frequency = 100
  
  var ATOM = {}
  ATOM.x = WIDTH / 2
  ATOM.y = HEIGHT / 2
  ATOM.nucleus_rotation_speed = 0.005
  ATOM.nucleus_angle = 0
  ATOM.nucleus_attraction_force = 0.125
  
  ATOM.electron_mass = 1
  ATOM.electron_radius = 9
  
  ATOM.num_electrons = 0
  ATOM.num_electrons_filled = 0
  ATOM.num_electrons_filled_by_user = 0
  ATOM.levels = []
    
  var SCORE = 0
  var ACCURACY = 0
  
  var ELAPSED_TIME = null
  var START_TIME = new Date()
  var TIMER_INT = null
  
  LEVEL_PARAMS = [
    {radius: 100, rotation_speed: .0025, scale: 1},
    {radius: 196, rotation_speed: -.0015, scale: 1},
    {radius: 300, rotation_speed: 0.001, scale: 1.25},
    {radius: 400, rotation_speed: -0.0006, scale: 1.5},
    {radius: 500, rotation_speed: 0.0005, scale: 1.75},
    {radius: 600, rotation_speed: -0.0004, scale: 2},
    {radius: 700, rotation_speed: 0.0003, scale: 2.5}
  ]
  
  
  // Colors
  var COLORS = {}
  COLORS.electron_filled = '#1FFFAA'
  COLORS.electron_empty = '#000000'
  COLORS.electron_stroke = '#3F53ED'
  COLORS.complete_level = '#3F53ED'
  COLORS.partial_level = '#131948'
  COLORS.proton_fill = '#7D3FE0'
  COLORS.proton_stroke = '#B67EFF'
  COLORS.neutron_fill = '#125899'
  COLORS.neutron_stroke = '#7472FF'
  
  var LAST_TIME = new Date().getTime()
  var LOOP = false
  
  
  // Load nucleus images
  var NUCLEUS_IMG = null
  var NUCLEUS_WIDTH = 120
  var NUCLEUS_HEIGHT = 120
  var NUCLEUS_NEG_WIDTH_2 = -1*NUCLEUS_WIDTH/2
  var NUCLEUS_NEG_HEIGHT_2 = -1*NUCLEUS_HEIGHT/2

  
	var NUCLEUS_IMAGES = [
  	[1, new Image()],
  	[2, new Image()],
  	[3, new Image()],
  	[4, new Image()],
  	[6, new Image()],
  	[8, new Image()],
  	[11, new Image()],
  	[20, new Image()],
  	[30, new Image()]
  ]
  for(var i = 0; i < NUCLEUS_IMAGES.length; i++) {
  	NUCLEUS_IMAGES[i][1].src = 'images/nucleus/'+NUCLEUS_IMAGES[i][0]+'.png'
  }
  
  
  var draw = function() {
    var time = new Date().getTime()
    INTERVAL = time - LAST_TIME
    LAST_TIME = time
    
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    
    CONTEXT.save()
    SCALE += (ATOM.scale - SCALE) / 10
    CONTEXT.scale(SCALE, SCALE)
    
    WIDTH = FULL_WIDTH / SCALE
    HEIGHT = FULL_HEIGHT / SCALE
    ATOM.x = WIDTH / 2
    ATOM.y = HEIGHT / 2
    
    update_atom()
    update_fired_electrons()
    update_ship()
    
    CONTEXT.restore()
    
    if(LOOP) requestAnimFrame(draw, CANVAS_ELEM)
  }
  
  
  var update_atom = function() {    
    
    // Draw orbitals
    var delete_i = []
    
    CONTEXT.lineWidth = 2
    
    var e_x, e_y, e_angle, dist, fired_electron
    
    var levels_complete_from_center = true
    
    var num_levels = ATOM.levels.length
    var level_complete = false
    
    for(var o = num_levels-1; o >= 0; o--) {
      var level = ATOM.levels[o]
      
      if(level.complete) {
        CONTEXT.beginPath()
        CONTEXT.strokeStyle = levels_complete_from_center ? COLORS.complete_level : COLORS.partial_level
        CONTEXT.arc(ATOM.x, ATOM.y, level.radius, 0, Math.PI * 2, true)
        CONTEXT.stroke()
      }
      
      if(!level.complete) levels_complete_from_center = false
      
      level.angle += level.rotation_speed * INTERVAL
      
      // Draw electron slots
      for(var i = 0; i < level.num_electrons; i++) {      
        e_angle = level.angle + i * Math.PI*2 / level.num_electrons
        e_x = ATOM.x + level.radius * Math.cos(e_angle)
        e_y = ATOM.y + level.radius * Math.sin(e_angle)
        level_complete = level.complete && levels_complete_from_center
        
        if(!level_complete) {
          
          // Has the slot been hit by a fired electron?
          var num_fired = SHIP.fired_electrons.length
          for(var j = 0; j < num_fired; j++) {
            fired_electron = SHIP.fired_electrons[j]
            if(!fired_electron) continue
            dist = Math.sqrt(Math.pow(e_x - fired_electron.x, 2) + Math.pow(e_y - fired_electron.y, 2))
  
            if(dist < ATOM.electron_radius*2) {
              level.filled_electrons[i] = !level.filled_electrons[i]
  
              // If the slot has been filled, remove the fired electron
              if(level.filled_electrons[i]) {
                Game.play_sound('electron_filled')
                delete_i.push(j)
                update_electrons_filled(1, level)
  
              // Otherwise, pop a new electron out
              } else {
                Game.play_sound('electron_collision')
                fired_electron.x = e_x + 2*ATOM.electron_radius
                fired_electron.y = e_y + 2*ATOM.electron_radius
                fired_electron.vx = 0.5
                fired_electron.vy = 0.5
                fire_electron({
                  x: e_x - 2*ATOM.electron_radius,
                  y: e_y - 2*ATOM.electron_radius,
                  vx: -1*fired_electron.vy,
                  vy: -1*fired_electron.vx
                })
                
                update_electrons_filled(-1, level)
              }
            }
          }
        }
        
        // If the slot is full and has been hit by the ship:
        // - knock out the electron
        // - decrease ship health
        if(level.filled_electrons[i] && !SHIP.invulnerable) {
          dist = Math.sqrt(Math.pow(e_x - SHIP.x, 2) + Math.pow(e_y - SHIP.y, 2))
          if(dist < SHIP.radius + ATOM.electron_radius) {
            Game.play_sound('ship_collision')
            
            if(!level_complete) {
              level.filled_electrons[i] = false
              
              fire_electron({
                x: e_x - 2*ATOM.electron_radius,
                y: e_y - 2*ATOM.electron_radius,
                vx: 0.75 * Math.sin(e_angle),
                vy: 0.75 * Math.cos(e_angle)
              })
              
              update_electrons_filled(-1, level)
            }
            
            update_health(-0.1)
          }
        }
        
        
        // Draw the slot
        if(level.filled_electrons[i]) {
          CONTEXT.fillStyle = COLORS.electron_filled
        } else {
          CONTEXT.fillStyle = COLORS.electron_empty
        }
        
        CONTEXT.strokeStyle = COLORS.electron_stroke
        CONTEXT.beginPath()
        CONTEXT.arc(e_x, e_y, ATOM.electron_radius, 0, Math.PI * 2, true)
        CONTEXT.fill()
        CONTEXT.stroke()
      }
    }
        
    // Remove any collided electrons
    remove_electrons(delete_i)
        
    // Update and draw nucleus
    ATOM.nucleus_angle += ATOM.nucleus_rotation_speed * INTERVAL
    
    CONTEXT.save()
    CONTEXT.translate(ATOM.x, ATOM.y)
    CONTEXT.rotate(ATOM.nucleus_angle)
    CONTEXT.drawImage(NUCLEUS_IMG, NUCLEUS_NEG_WIDTH_2, NUCLEUS_NEG_HEIGHT_2)
    CONTEXT.restore()
  }
  
  
  var update_fired_electrons = function() {
    var num_electrons = SHIP.fired_electrons.length
    if(num_electrons == 0) return
    
    CONTEXT.fillStyle = COLORS.electron_filled
    CONTEXT.strokeStyle = COLORS.electron_stroke
    CONTEXT.lineWidth = 1
    
    var delete_i = []
    var electron, accel, x, y, dist
    
    for(var i = 0; i < num_electrons; i++) {
      electron = SHIP.fired_electrons[i]
      
      // The nucleus is attracting the electron
      x = ATOM.x - electron.x
      y = ATOM.y - electron.y
      dist = Math.sqrt(x*x + y*y)
      accel = ATOM.nucleus_attraction_force / (ATOM.electron_mass * dist) // Yeah yeah, it's not proportional to the *square* of the distance. Like, whatever, man.
      electron.vx += (x / dist) * (accel * INTERVAL)
      electron.vy += (y / dist) * (accel * INTERVAL)
      
      electron.x += electron.vx * INTERVAL
      electron.y += electron.vy * INTERVAL
      
      // Is the electron off the screen?
      if(electron.x < 0 || electron.x > WIDTH || electron.y < 0 || electron.y > HEIGHT) {
        delete_i.push(i)
        continue
      }
      
      // Draw the electron
      CONTEXT.beginPath()
      CONTEXT.arc(electron.x, electron.y, 5, 0, Math.PI * 2, true)
      CONTEXT.fill()
      CONTEXT.stroke()
    }
    
    // Delete any electrons that are off the screen
    remove_electrons(delete_i)
  }
  
  
  var update_ship = function() {
    CONTEXT.save()
    
    // Rotate the ship?
    if(SHIP.rotational_direction) {
      SHIP.angle += SHIP.rotational_direction * (SHIP.rotational_speed * INTERVAL)
    }
    
    // Add thruster acceleration
    if(SHIP.thruster) {
      SHIP.vy -= Math.cos(SHIP.angle) * (SHIP.thruster * SHIP.thruster_accel * INTERVAL)
      SHIP.vx += Math.sin(SHIP.angle) * (SHIP.thruster * SHIP.thruster_accel * INTERVAL)
    }
        
    // Add friction
    SHIP.vx -= SHIP.coeff_friction * SHIP.vx
    SHIP.vy -= SHIP.coeff_friction * SHIP.vy
    
    // Update the position of the ship, and draw it
    SHIP.x += SHIP.vx * INTERVAL
    SHIP.y += SHIP.vy * INTERVAL
    
    // If the ship is off the screen, wrap it back around
    if(SHIP.x < SHIP.neg_width_2) { // right side
      SHIP.x = WIDTH-SHIP.neg_width_2
    } else if(SHIP.x > WIDTH-SHIP.neg_width_2) { // left side
      SHIP.x = 0+SHIP.neg_width_2
    } else if(SHIP.y < SHIP.neg_height_2) { // top
      SHIP.y = HEIGHT-SHIP.neg_height_2
    } else if(SHIP.y > HEIGHT-SHIP.neg_width_2) { // bottom
      SHIP.y = 0+SHIP.neg_height_2
    }
    
    CONTEXT.translate(SHIP.x, SHIP.y)
    CONTEXT.rotate(SHIP.angle)
    
    if(SHIP.invulnerable) {
      CONTEXT.globalAlpha = 0.5 + Math.cos((new Date().getTime() - SHIP.invulnerable_time) / SHIP.invulnerable_pulse_frequency) / 4
    } else {
      CONTEXT.globalAlpha = 1
    }
    
    if(SHIP.thruster > 0) {
      CONTEXT.drawImage(SHIP_THRUSTER_IMG, SHIP.neg_width_2, SHIP.neg_height_2)
    } else if(SHIP.thruster < 0) {
      CONTEXT.drawImage(SHIP_THRUSTER_REVERSE_IMG, SHIP.neg_width_2, SHIP.neg_height_2)
    } else {
      CONTEXT.drawImage(SHIP_IMG, SHIP.neg_width_2, SHIP.neg_height_2)
    }
    
    CONTEXT.restore()
  }
  
  
  // Create a new electron that has been fired from the ship
  var fire_electron = function(params, from_ship) {
    Game.play_sound('fire_electron')
    
    params = params || {}
    SHIP.fired_electrons.push({
      x: params.x || SHIP.x,
      y: params.y || SHIP.y,
      vx: params.vx || SHIP.vx + SHIP.electron_speed * Math.sin(-1*SHIP.angle) * -1,
      vy: params.vy || SHIP.vy + SHIP.electron_speed * Math.cos(SHIP.angle) * -1
    })
    
    if(from_ship) {
      SHIP.fired_electron_count++
      update_accuracy()
    }
  }
  
  
  // Remove fired electrons
  var remove_electrons = function(delete_i) {
    if(delete_i.length <= 0) return
    for(var i = 0; i < delete_i.length; i++) {
      SHIP.fired_electrons.splice(delete_i[i], 1)
    }
  }
  
  
  $(document).bind('keydown', function(e) {
    if(!LOOP) return
    var key = e.which
    
    if(key == 38 && SHIP.thruster != 1) { // forward thrust
      SHIP.thruster = 1
      Game.play_sound('thruster_forward')
    } else if(key == 40 && SHIP.thruster != -1) { // backward thrust
      SHIP.thruster = -1
      Game.play_sound('thruster_backward')
    } else if(key == 37) { // counter-clockwise rotation
      SHIP.rotational_direction = -1
    } else if(key == 39) { // clockwise rotation
      SHIP.rotational_direction = 1
    } else if(key == 32) { // fire electron
      fire_electron({}, true)
    }
  })
  
  $(document).bind('keyup', function(e) {
    if(!LOOP) return
    var key = e.which
    
    if(key == 38 || key == 40) { // thrusters
      SHIP.thruster = false
      Game.stop_sound('thruster_forward')
      Game.stop_sound('thruster_backward')
    } else if(key == 37) { // counter-clockwise rotation
      SHIP.rotational_direction = 0
    } else if(key == 39) { // clockwise rotation
      SHIP.rotational_direction = 0
    }
  })
  
  
  var set_nucleus_image = function(element) {
  	for(var i = 0; i <= NUCLEUS_IMAGES.length; i++) {
  		var next_img = NUCLEUS_IMAGES[i+1]
  		if(!next_img || next_img[0] > element.atomic_number) {
  			NUCLEUS_IMG = NUCLEUS_IMAGES[i][1]
  			break
  		}
  	}
  }
  
  
  var show_level_selector = function() {
    Game.stop_sound('background')
    stop()
    
    var levels_container = $('#level_selector .levels')
    var level = null
    
    var user_max_level = 99999
    
    levels_container.html('')
    
    var i = 0
    var element = null
    for(var symbol in PERIODIC_TABLE) {
      element = PERIODIC_TABLE[symbol]
      
      level = $('<div />').data('level_num', i)
      level.addClass('level').addClass('col'+element.pos[0]).addClass('row'+element.pos[1])
      $('<span />').addClass('num').html(element.atomic_number).appendTo(level)
      $('<span />').addClass('symbol').html(symbol).appendTo(level)
      
      if(i == CURRENT_ELEMENT_I || (i == 0 && !CURRENT_ELEMENT_I)) level.addClass('current')
      
      if(i > user_max_level) {
        level.addClass('inactive')
      } else {
        level.click(load_element)
      }
      
      level.appendTo(levels_container)
      i++
    }
    
    $('#level_selector_toggle a').hide()
    $('#level_selector').show()
  }
  
  
  var hide_level_selector = function() {
    $('#level_selector').hide()
    $('#level_selector_toggle a').show()
  }
  
  $('#level_selector_toggle a').click(show_level_selector)
  
  var load_element = function(e) {
    var level_num = $(e.currentTarget).data('level_num')
    if(level_num != null || CURRENT_ELEMENT_I == null) {
      CURRENT_ELEMENT_I = level_num || 0
      load_current_element()
    }
    hide_level_selector()
    go()
  }
  $('#level_selector .close').click(load_element)
  
  
  var load_current_element = function() {
    Game.play_sound('new_level')
    Game.stop_sound('theme')
    
    SHIP.fired_electrons = []
    SHIP.fired_electron_count = 0
    SHIP.x = 60
    SHIP.y = 60
    SHIP.angle = Math.PI * 0.75
    
    ATOM.num_electrons = 0
    ATOM.num_electrons_filled = 0
    ATOM.num_electrons_filled_by_user = 0
    ATOM.levels = []
    
    var symbol = ELEMENTS[CURRENT_ELEMENT_I]
    var element = PERIODIC_TABLE[symbol]    
    set_nucleus_image(element)
    
    for(var i = 0; i < element.levels.length; i++) {
      ATOM.num_electrons += element.levels[i]
    }
        
    if(CURRENT_ELEMENT_I < 16) {
      var num_pre_filled_levels = 0
    } else if(CURRENT_ELEMENT_I < 20) {
      var num_pre_filled_levels = 1
    } else if(CURRENT_ELEMENT_I < 60) {
      var num_pre_filled_levels = 2
    } else {
      var num_pre_filled_levels = 3
    }
    
    
    for(var i = 0; i < element.levels.length; i++) {
      var num_filled = 0
      filled_electrons = []
      
      if(i < num_pre_filled_levels) {
        for(var n = 0; n < element.levels[i]; n++) {
          filled_electrons.push(true)
          num_filled++
        }
      }
      
      ATOM.levels.unshift({
        radius: LEVEL_PARAMS[i].radius,
        rotation_speed: LEVEL_PARAMS[i].rotation_speed,
        angle: 0,
        num_electrons: element.levels[i],
        filled_electrons: filled_electrons
      })
      
      update_electrons_filled(num_filled, ATOM.levels[0], true)
    }
    
    ATOM.scale = 1 / LEVEL_PARAMS[element.levels.length-1].scale
    
    START_TIME = new Date().getTime()
    TIMER_INT = setInterval(update_time, 1000)
    update_time()
    
    $('#element').animate({left: -128}, 250, function() {
      $('#element .atomic_number').html(element.atomic_number)
      $('#element .symbol').html(symbol)
      $('#element .name').html(element.name)
      if(element.name.length > 10) {
        $('#element .name').addClass('long')
      } else {
        $('#element .name').removeClass('long')
      }
      $('#element').animate({left: 15}, 500)
    })
    
    go()
  }
  
  
  var go = function() {
    if(LOOP) return
    LOOP = true
    draw()
  }
  
  
  var stop = function() {
    clearInterval(TIMER_INT)
    LOOP = false
  }
  
  
  var atom_is_finished = function() {
    stop()
    update_score()
    
    $('#level_complete_message .element span').html(PERIODIC_TABLE[ELEMENTS[CURRENT_ELEMENT_I]].name)
    $('#level_complete_message .score span').html(SCORE)
    
    // Achievements
    if(ELEMENTS[CURRENT_ELEMENT_I] == 'Ne') {
      Game.unlock_achievement('electrons_ne', 'Outer Orbital Complete - Neon')
    } else if(ELEMENTS[CURRENT_ELEMENT_I] == 'Ar') {
      Game.unlock_achievement('electrons_ar', 'Outer Orbital Complete - Argon')
    } else if(ELEMENTS[CURRENT_ELEMENT_I] == 'Kr') {
      Game.unlock_achievement('electrons_kr', 'Outer Orbital Complete - Krypton')
    } else if(ELEMENTS[CURRENT_ELEMENT_I] == 'Xe') {
      Game.unlock_achievement('electrons_xe', 'Outer Orbital Complete - Xenon')
    } else if(ELEMENTS[CURRENT_ELEMENT_I] == 'Rn') {
      Game.unlock_achievement('electrons_rn', 'Outer Orbital Complete - Radon')
    } else if(ELEMENTS[CURRENT_ELEMENT_I] == 'Uuo') {
      Game.unlock_achievement('electrons_uuo', 'Electronz Expert - All elements complete!')
    }
    
    var next_element = ELEMENTS[CURRENT_ELEMENT_I+1]
    if(next_element) {
      $('#level_complete_message .next_element span').html(PERIODIC_TABLE[next_element].name)
      $('#level_complete_message').show()
    } else {
      $('#level_complete_message').hide()
    }
    
    Message.display($('#level_complete_message'), 2000)
    
    setTimeout(function() {
      CURRENT_ELEMENT_I++
      if(CURRENT_ELEMENT_I >= ELEMENTS.length - 1) CURRENT_ELEMENT_I = 0
      load_current_element()
    }, 2500)
  }
  
  
  var update_score = function(update) {
    if(update !== false) SCORE += Math.max(100, Math.round((ACCURACY * ATOM.num_electrons_filled - ELAPSED_TIME) * 10))
    $('#score .value').html(SCORE)
  }
  
  
  var update_electrons_filled = function(change, level, filled_automatically) {
    var previously_complete = level.complete
    
    ATOM.num_electrons_filled += change
    if(!filled_automatically) ATOM.num_electrons_filled_by_user += change
    
    update_accuracy()
    
    // Is the level complete?
    if(level) {
      var num_filled = 0
      for(var i in level.filled_electrons) {if(level.filled_electrons[i]) num_filled++}
      level.complete = (num_filled == level.num_electrons) 
    }
    
    // Play the appropriate sound
    if(level.complete && !previously_complete) {
      Game.play_sound('shell_filled')
    } else if(!level.complete && previously_complete) {
      Game.play_sound('shell_broken')
    }
    
    // Have we finished the atom?
    if(ATOM.num_electrons_filled == ATOM.num_electrons) {
      atom_is_finished()
    }
  }
  
  
  var update_accuracy = function() {
    if(SHIP.fired_electron_count == 0) {
      ACCURACY = 0
    } else {
      ACCURACY = Math.round(100 * ATOM.num_electrons_filled_by_user / SHIP.fired_electron_count)
    }
    if(ACCURACY < 0) ACCURACY = 0
    $('#accuracy .value').html(ACCURACY+'%')
  }
  
  
  var update_time = function() {
    ELAPSED_TIME = ((new Date()).getTime() - START_TIME) / 1000
    $('#time .value').html(Math.round(ELAPSED_TIME))
  }
  
  
  var update_health = function(change) {
    if(SHIP.invulnerable) return
    
    if(change) SHIP.health += change
    var shields = Math.round(100*SHIP.health)
    $('#shields .value').html(shields+'%')
    if(shields <= 0) game_over()
    
    // Low shield warning
    if(shields <= 30) {
    	if(!$('#shields .value').hasClass('warning')) {
    		Message.display('WARNING: Low Shields!', 1000, '64px')
    		$('#shields .value').addClass('warning')
    	}
    } else {
    	$('#shields .value').removeClass('warning')
    }
    
    if(change <= 0) {
      SHIP.invulnerable = true
      SHIP.invulnerable_time = new Date().getTime()
      setTimeout(function() {SHIP.invulnerable = false}, 3000)
    }
  }
  
  
  var game_over = function() {
    stop()
    $('#level_selector_toggle a').hide()
    var symbol = ELEMENTS[CURRENT_ELEMENT_I]
    User.save_score('electronz', SCORE, PERIODIC_TABLE[symbol].name)
    Message.display($('#game_over_message'), -1)
  }
  
  $('#game_over_message').click(function() {
    $('#game_over_message').hide()
    Game.show_high_scores()
  })
  
  
    
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'fire_electron',
      url: 'sounds/fire_electron.mp3',
      volume: 20
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 20
    }, {
      id: 'ship_collision',
      url: 'sounds/ship_collision.mp3',
      volume: 20
    }, {
      id: 'electron_filled',
      url: 'sounds/electron_filled.mp3',
      volume: 20
    }, {
      id: 'electron_collision',
      url: 'sounds/electron_collision.mp3',
      volume: 20
    }, {
      id: 'shell_broken',
      url: 'sounds/shell_broken.mp3',
      volume: 20
    }, {
      id: 'shell_filled',
      url: 'sounds/shell_filled.mp3',
      volume: 20
    }, {
      id: 'thruster_forward',
      url: 'sounds/thruster_forward.mp3',
      loops: 999999,
      volume: 80
    }, {
      id: 'thruster_backward',
      url: 'sounds/thruster_backward.mp3',
      loops: 999999,
      volume: 80
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      stream: true,
      music_muteable: true,
      loops: 999999,
      volume: 100
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      stream: true,
      music_muteable: true,
      volume: 100
    }
  ])
  
  Game.load_images([
    'images/ship.png',
    'images/ship_thruster.png',
    'images/ship_thruster_reverse.png',
    'images/nucleus/1.png',
    'images/nucleus/2.png',
    'images/nucleus/3.png',
    'images/nucleus/4.png',
    'images/nucleus/6.png',
    'images/nucleus/8.png',
    'images/nucleus/11.png',
    'images/nucleus/20.png',
    'images/nucleus/30.png',
    'images/high_scores.png'
  ])
  
  Game.start_gameplay = function() {
    $('#high_scores').hide()
    $('#info').animate({bottom: 0}, 250)
    Message.hide()
    
    SHIP.fired_electrons = []
    SHIP.fired_electron_count = 0
    SHIP.health = 1.0
    SHIP.invulnerable = false
    SHIP.invulnerable_time = null
    SCORE = 0
    
    update_score(false)
    update_health()
    show_level_selector()
  }
  
  Game.show_high_scores = function() {
    Game.stop_sound('theme').play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('electronz', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="level">'+scores[i].misc+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', Game.start_gameplay)
  
  Game.initialize()
})
