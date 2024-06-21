window._area = 'arcade'
window._attraction = 'atomatic'

var Stage = function() {
  var THIS = {}
  
  var CANVAS = null
  var CANVAS_ELEM = null
  var CONTEXT = null
  
  THIS.width = 0
  THIS.height = 0
  
  var GUN = {}
  var GUN_IMG = null
  
  var MOLECULES = []
  var NUM_MOLECULES = 0
  THIS.molecules = function() {return MOLECULES}
  
  var ATOM_INITIAL_VELOCITY = 1.4
  var FRICTION_COEFF = 0.00125
  var FRICTION_ANG_COEFF = 0.00125
  
  var LAST_TIME = new Date()
  var INTERVAL = 0
  
  var POINTS = 0
  var TOTAL_POINTS = 0
  
  var LOOP = false
  var LEVEL_ENDED = false
  
  var AMMO = {}
  
  var LEVEL_NUM = 0
  
  var HIGHEST_LEVEL = 0
  
  
  // Update the atom gun's position and draw it
  var update_gun = function() {
    
    GUN.angle += GUN.angular_velocity * INTERVAL
    
    if(GUN.angle < GUN.min_angle) {
      GUN.angle = GUN.min_angle
      GUN.angular_velocity *= -1
    } else if(GUN.angle > GUN.max_angle) {
      GUN.angle = GUN.max_angle
      GUN.angular_velocity *= -1
    }
    
    // Draw the gun
    CONTEXT.save()
    CONTEXT.fillStyle = GUN.color
    CONTEXT.translate(GUN.x, GUN.y)
    CONTEXT.rotate(GUN.angle)
    CONTEXT.drawImage(GUN_IMG, GUN.neg_width_2, 0)
    CONTEXT.restore()
  }
  
  
  // Update each molecule's position,
  // Check for collisions, and draw them.
  var update_molecules = function() {
    var dist, m, m2
    
    var all_molecules_are_stationary = true
    
    for(var i = 0; i < NUM_MOLECULES; i++) {
      m = MOLECULES[i]
      
      // Add friction
      m.vx -= FRICTION_COEFF * m.vx * INTERVAL
      m.vy -= FRICTION_COEFF * m.vy * INTERVAL
      
      // Move molecule
      m.x += m.vx * INTERVAL
      m.y += m.vy * INTERVAL
      
      // Rotate molecule
      if(Math.abs(m.v_angle) > 0.0005) {
        m.v_angle -= FRICTION_ANG_COEFF * m.v_angle * INTERVAL
        m.angle += m.v_angle * INTERVAL
      }
      
      // Have we collided with the walls?
      if(m.x < 0) {
        m.vx *= -1
        m.x = 0
        Game.play_sound('bounce_collision')
      } else if(m.x > THIS.width) {
        m.vx *= -1
        m.x = THIS.width
        Game.play_sound('bounce_collision')
      } else if(m.y < 0) {
        m.vy *= -1
        m.y = 0
        Game.play_sound('bounce_collision')
      } else if(m.y > THIS.height) {
        m.vy *= -1
        m.y = THIS.height
        Game.play_sound('bounce_collision')
      }
            
      // If the molecule is close enough to stationary, make it still and don't check for collisions
      if(m.vx*m.vx + m.vy*m.vy < 0.0005) {
        m.vx = 0
        m.vy = 0
        
      // otherwise, check for collisions with other molecules
      } else {
        all_molecules_are_stationary = false
        
        for(var j = 0; j < NUM_MOLECULES; j++) {
          m2 = MOLECULES[j]
          if(m == m2) continue
          dist = Math.sqrt(Math.pow(m.x - m2.x, 2) + Math.pow(m.y - m2.y, 2))
          if(dist <= m.radius + m2.radius) collision_between(m, m2, i, j)
        }
      }
      
      m.draw(CONTEXT)
    }
    
    if(all_molecules_are_stationary && AMMO.length == 0 && !LEVEL_ENDED) end_level()
  }
  
  
  // Figure out what to do when two molecules collide
  var collision_between = function(m1, m2, m1_i, m2_i) {
    
    // Add random angular velocity to both molecules
    var collision_velocity = Math.sqrt(Math.pow(m2.vx - m1.vx, 2) + Math.pow(m2.vx - m1.vx, 2))
    var v_angle = 0.05 * (collision_velocity - (0.5 * collision_velocity))
    m1.v_angle = v_angle * m2.mass / (m1.mass + m2.mass)
    m2.v_angle = -1 * v_angle * m1.mass / (m1.mass + m2.mass)
    
    
    // If both atoms are stable, just bounce them off each other
    if(m1.stable || m2.stable) {
      Game.play_sound('bounce_collision')
      elastic_bounce(m1, m2)
      return
    }
    
    // Otherwise, check MoleculeFragments to see if the potential new molecule exists
    var symbol = m1.atoms.concat(m2.atoms).sort(function(a, b) {
      return AtomDefinitions[b].mass - AtomDefinitions[a].mass
    }).join('')
    
    // If so, create the new molecule
    if(MoleculeFragments[symbol]) {
      inelastic_bounce(m1, m2)
      m1.add_molecule(m2)
      MOLECULES.splice(m2_i, 1)
      NUM_MOLECULES--
      
      // Have we completed a molecule? If so, update the score
      if(CompleteMolecules[symbol]) {
        Game.play_sound('molecule_made')
        completed_molecule(symbol)
      } else {
        Game.play_sound('bond')
      }
      
    // Otherwise, bounce the molecules off each other
    } else {
      elastic_bounce(m1, m2)
    }
  }
  
  
  // The user has completed a molecule, so update the score
  var completed_molecule = function(symbol) {
    CompleteMolecules[symbol].num += 1
    var points = CompleteMolecules[symbol].points
    POINTS += points
    update_score_display(points)
  }
  
  
  // Update the score display
  var update_score_display = function(points) {
    if(points > 0) {
      Message.display('+'+points+'!')
    }
    $('#score').html('Your Score: '+POINTS)
  }
  
  
  // Bounce two molecules off each other elastically
  var elastic_bounce = function(m1, m2) {
	  var x1 = m1.x
    var y1 = m1.y
    var mass1 = m1.mass
    
    var x2 = m2.x
    var y2 = m2.y
    var mass2 = m2.mass
    
    var n = [x2-x1, y2-y1]
    var n_bar = Math.sqrt(n[0]*n[0] + n[1]*n[1])
    var un = [n[0]/n_bar, n[1]/n_bar]
    var ut = [-1*un[1], un[0]]
    
    var v1 = [m1.vx, m1.vy]
    var v2 = [m2.vx, m2.vy]
    
    var v1n = un[0]*v1[0] + un[1]*v1[1]
    var v1t = ut[0]*v1[0] + ut[1]*v1[1]
    var v2n = un[0]*v2[0] + un[1]*v2[1]
    var v2t = ut[0]*v2[0] + ut[1]*v2[1]
    
    var vf1t = v1t
    var vf2t = v2t
    var vf1n = (v1n*(mass1-mass2) + 2*mass2*v2n) / (mass1+mass2)
    var vf2n = (v2n*(mass2-mass1) + 2*mass1*v1n) / (mass1+mass2)
    
    vf1n = [vf1n*un[0], vf1n*un[1]]
    vf1t = [vf1t*ut[0], vf1t*ut[1]]
    vf2n = [vf2n*un[0], vf2n*un[1]]
    vf2t = [vf2t*ut[0], vf2t*ut[1]]
    
    var vf1 = [vf1n[0]+vf1t[0], vf1n[1]+vf1t[1]]
    var vf2 = [vf2n[0]+vf2t[0], vf2n[1]+vf2t[1]]
    
    m1.vx = vf1[0]
    m1.vy = vf1[1]
   
    m2.vx = vf2[0]
    m2.vy = vf2[1]
    
    
    // Make sure they aren't overlapping
    var distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
    if((m1.radius + m2.radius) - distance > 0) {
      
      // http://mathworld.wolfram.com/Circle-CircleIntersection.html
      var d1 = (distance*distance - m2.radius*m2.radius + m1.radius*m1.radius) / (2*distance)
      var d2 = distance - d1
      var overlap = (m1.radius - d1) + (m2.radius - d2)
      var ratio = (overlap / 2) / distance
      
      dx = ratio * (x2 - x1)
      dy = ratio * (y2 - y1)
      
      m1.x -= dx
      m1.y -= dy
      m2.x += dx
      m2.y += dy
    }
	}
	
	
	// Perfectly inelastic collision between two molecules -- i.e. they stick together.
	// (We're assuming that the second molecule is going to be removed, so it won't be updated)
	var inelastic_bounce = function(m1, m2) {
	  var total_mass = m1.mass + m2.mass
	  
	  // Find new velocity
	  m1.vx = (m1.mass*m1.vx + m2.mass*m2.vx) / total_mass
	  m1.vy = (m1.mass*m1.vy + m2.mass*m2.vy) / total_mass
    
    // Set the position to the center of mass
    m1.x = (m1.mass*m1.x + m2.mass*m2.x) / total_mass
	  m1.y = (m1.mass*m1.y + m2.mass*m2.y) / total_mass
	}
	
	
	// Add a new molecule to the stage
	THIS.add_molecule_to_stage = function(molecule) {
	  MOLECULES.push(molecule)
	  NUM_MOLECULES++
	  return molecule
	}
  
  
	// Remove a molecule from the stage
	THIS.remove_molecule_from_stage = function(molecule) {
	  for(var i = 0; i < NUM_MOLECULES; i++) {
      if(molecule != MOLECULES[i]) continue
  	  MOLECULES.splice(i, 1)
  	  NUM_MOLECULES--
      return true
    }
    
    return false
	}
	  
  
  // Fire an atom out of the gun
  var fire_atom = function(velocity) {
		if(AMMO.length == 0) return
		Message.hide()
		
		Game.play_sound('cannon_shot')
		
		var atom = AMMO.shift()
		$('#ammo img.removed').remove()
		var current_img = $('#ammo img').eq(0)
		var next_img = $('#ammo img').eq(1)
		current_img.removeClass('selected').addClass('removed').animate({width: 0, height: 0}, 200, function(){current_img.remove()})
   	next_img.addClass('selected')
    
    THIS.add_molecule_to_stage(new Molecule({
      x: GUN.x - GUN.height * Math.sin(GUN.angle),
      y: GUN.y + GUN.height * Math.cos(GUN.angle),
      vx: -1 * velocity * Math.sin(GUN.angle),
      vy: velocity * Math.cos(GUN.angle),
      atoms: [atom]
    }))
  }
  
  
  // Find the molecule located at the given point
  THIS.molecule_at_point = function(x, y) {
    var dist
    
    for(var i = 0; i < NUM_MOLECULES; i++) {
      m = MOLECULES[i]
      dist = Math.sqrt(Math.pow(m.x - x, 2) + Math.pow(m.y - y, 2))
      if(dist <= m.radius) return m
    }
    
    return null
  }
  
  
  // The main animation loop!
  var loop = function() {
    CONTEXT.clearRect(0, 0, THIS.width, THIS.height)
    
    var time = new Date().getTime()
    INTERVAL = time - LAST_TIME
    LAST_TIME = time
    
    update_molecules()
    update_gun()
    
    if(LOOP) requestAnimFrame(loop, CANVAS_ELEM)
  }
  
  
  // Add the initial molecules for the level
  var add_initial_molecues = function() {    
    var molecules = Levels[LEVEL_NUM].initial_molecules
    for(var i = 0; i < molecules.length; i++) {
      THIS.add_molecule_to_stage(new Molecule({
        symbol: molecules[i][0], x: molecules[i][1], y: molecules[i][2], angle: molecules[i][3], vx: 0, vy: 0
      }))
    }
  }
  
  
  // Reload the ammo
  THIS.add_ammo_to_dom = function(symbol, delay) {
		$('<img />').data('atom', symbol).draw(100, 100, function(c) {
			new Molecule({x: 50, y: 50, atoms: [symbol]}).draw(c)
		})
		.attr({
		  'width': 50,
		  'height': 50,
		})
		.css('margin-left', 490)
		.appendTo($('#ammo'))
		.delay(delay)
		.animate({'margin-left': 0}, 250)
  }
  
  THIS.reload_ammo = function() {
    AMMO = Levels[LEVEL_NUM].ammo.slice(0)
    
    // Set up ammo images
    $('#ammo').html('')
    for(var i = 0; i < AMMO.length; i++) {
    	THIS.add_ammo_to_dom(AMMO[i], i*250)
    }
    $('#ammo img').eq(0).addClass('selected')
  }
  THIS.set_ammo = function(ammo) {
  	AMMO = ammo.slice(0)
  }
  
  
  // Start a new level
  THIS.start_level = function(e) {
    Game.stop_sound('theme')
    Game.stop_sound('background').play_sound('background')
    
    hide_high_scores()
    $('#level_selector').hide()
    
    // Have they picked a level from the Level Selector?
    if(e && e.currentTarget) {
      var level_num = $(e.currentTarget).data('level_num')
      if(typeof level_num == "number") LEVEL_NUM = level_num
      $('#level_selector').hide()
    }
    
    LEVEL_ENDED = false
    
    if(!LOOP) {
      LOOP = true
      loop()
    }
    
    if(LEVEL_NUM > 0) Game.play_sound('new_level')
    
    $('#start_level_message .goal .val').html(Levels[LEVEL_NUM].points)
    $('#start_level_message .level .val').html(LEVEL_NUM+1)
    Message.display($('#start_level_message'), 2000)
    
    POINTS = 0
    update_score_display(0)
    
    MOLECULES = []
    NUM_MOLECULES = 0
            
    for(var symbol in CompleteMolecules) {
      CompleteMolecules[symbol].num = 0
    }
        
    $('#required_score').html('Goal: '+Levels[LEVEL_NUM].points+' pts')
    $('#level_num').html('Level '+(LEVEL_NUM+1))
    
    add_initial_molecues()
    THIS.reload_ammo()
  }
  
  
  // The player has won the game!
  var end_game = function() {
    LOOP = false
    Message.display('Game over! You win!', 2000)
  }
  
  
  // The current level has ended
  var end_level = function() {
    LEVEL_ENDED = true
    
    if(LEVEL_NUM > HIGHEST_LEVEL) HIGHEST_LEVEL = LEVEL_NUM
    TOTAL_POINTS += POINTS
    
    // Go to the next level
    if(POINTS >= Levels[LEVEL_NUM].points) {
      User.set_flag('atomatic_max_level', LEVEL_NUM)
      var delay_time = 3000
      Message.display($('#level_complete_message'), delay_time)
      User.save_score('atomatic', TOTAL_POINTS, 'Level '+HIGHEST_LEVEL)
      
      // Achievements
      if(LEVEL_NUM == 7-1) {
        Game.unlock_achievement('atomatic_1', 'Atomatic Achievement')
      } else if(LEVEL_NUM == 14-1) {
        Game.unlock_achievement('atomatic_2', 'Atomatic Ace')
      } else if(LEVEL_NUM == 21-1) {
        Game.unlock_achievement('atomatic_3', 'Atomatic Pro')
      } else if(LEVEL_NUM == 28-1) {
        Game.unlock_achievement('atomatic_4', 'Atomatic Expert')
      } else if(LEVEL_NUM == 35-1) {
        Game.unlock_achievement('atomatic_5', 'Atomatic Master')
      } else if(LEVEL_NUM == 42-1) {
        Game.unlock_achievement('atomatic_6', 'Atomatic Champ')
      }
      
      LEVEL_NUM++
      
    // Repeat the current level
    } else {
      Game.play_sound('you_lose')
      var delay_time = 4000
      $('#try_again_message .goal .val').html(Levels[LEVEL_NUM].points)
      $('#try_again_message .score .val').html(POINTS)
      Message.display($('#try_again_message'), delay_time)
      setTimeout(function() {THIS.start_level()}, delay_time)
      return
    }
    
    if(Levels[LEVEL_NUM])
      setTimeout(function() {THIS.start_level()}, delay_time)
    else
      end_game()
  }
  
  
  THIS.show_level_selector = function() {
    hide_high_scores()
    Game.stop_sound('background')
    LOOP = false
    
    // Lock levels based on how far the user has gotten
    var max_level = User.get_flag('atomatic_max_level')
    if(!max_level && max_level !== 0) max_level = -1
        
    var levels_container = $('#level_selector .levels')
    var level = null
    
    levels_container.html('')
    for(var i = 0, ii = Levels.length; i < ii; i++) {
      level = $('<a />').html(i+1).data('level_num', i)
      
      if(i == LEVEL_NUM) level.addClass('current')
      
      if(i > max_level + 1) {
        level.addClass('locked')
      } else {
        level.click(Stage.start_level)
      }
      
      level.appendTo(levels_container)
    }
    
    $('#level_selector').show()
  }
  
  
  var hide_high_scores = function() {
    $('#high_scores').hide()
  }
  
  THIS.show_high_scores = function() {
    if($('#high_scores').is(':visible')) return hide_high_scores()
    Game.show_high_scores()
  }
  $('#high_scores').bind('click', hide_high_scores)
  
  
  THIS.initialize = function() {
    $('body').bind('dragstart', function(e){e.preventDefault()})
    $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
	  
    CANVAS = $('#canvas')
    CANVAS_ELEM = CANVAS[0]
    CONTEXT = CANVAS[0].getContext('2d')
    
    THIS.canvas = CANVAS
    THIS.context = CONTEXT
    
    THIS.width = CANVAS.width()
    THIS.height = CANVAS.height()
    
    GUN.angle = Math.PI
    GUN.min_angle = Math.PI/2 + 0.2
    GUN.max_angle = 3*Math.PI/2 - 0.2
    GUN.angular_velocity = 0.0012
    GUN.width = 45
    GUN.height = 60
    GUN.x = (THIS.width - GUN.width) / 2
    GUN.y = THIS.height + GUN.width / 2
    GUN.neg_width_2 = GUN.width/-2
    GUN.color = 'rgb(180, 180, 180)'
    
    // Set up points legend
    $('#points_legend').html('')
    for(var symbol in CompleteMolecules) {
      var m = CompleteMolecules[symbol]
      $('<div />').html('<img src="images/molecules/'+m.formula+'.png" align="left" />' + m.formula.replace(/(\d+)/, '<sub>$1</sub>', 'g')+' <span>'+m.points+'pts</span>').appendTo($('#points_legend'))
    }
  }
  
  
  var LEFT_HOLD = false
  var RIGHT_HOLD = false
  
  var rotate_right = [83, 76, 39]
  var rotate_left = [65, 75, 37]
  var toggle_right = [87, 80, 38]
  var toggle_left = [81, 79, 40]
  
  var key_being_held = false
    
  $(document).bind('keydown', function(e) {
  	var key = e.which
  	
  	if(key == 32) {
			if(key_being_held) return
			key_being_held = true
			fire_atom(ATOM_INITIAL_VELOCITY)
		}
  })
  
  $(document).bind('keyup', function(e) {
  	var key = e.which
		if(key == 32) key_being_held = false
  })
  
    
  // ------------------ GAME SETUP ----------------------
  
  $(function() {    
    Game.load_sounds([
      {
        id: 'cannon_shot',
        url: 'sounds/cannon_shot.mp3',
        volume: 50
      }, {
        id: 'bond',
        url: 'sounds/bond.mp3',
        volume: 50
      }, {
        id: 'bounce_collision',
        url: 'sounds/bounce_collision.mp3',
        volume: 25
      }, {
        id: 'molecule_made',
        url: 'sounds/molecule_made.mp3',
        volume: 50
      }, {
        id: 'new_level',
        url: 'sounds/new_level.mp3',
        music_muteable: true,
        volume: 30
      }, {
        id: 'you_lose',
        url: 'sounds/you_lose.mp3',
        volume: 50
      }, {
        id: 'background',
        url: 'sounds/background.mp3',
        music_muteable: true,
        stream: true,
        loops: 999999,
        volume: 45
      }, {
        id: 'theme',
        url: 'sounds/theme.mp3',
        music_muteable: true,
        stream: true,
        loops: 999999,
        volume: 35
      }
    ])
    
    var images_to_preload = [
      'images/elements/H.png',
      'images/elements/O.png',
      'images/elements/N.png',
      'images/elements/C.png',
      'images/ammo_background_highlight.png',
      'images/ammo_background.png',
      'images/level_current.png',
      'images/level.png',
      'images/cannon.png',
      'images/high_scores.png'
    ]
    
    for(var i in CompleteMolecules) {
      images_to_preload.push('images/molecules/'+CompleteMolecules[i].formula+'.png')
    }
    
    Game.load_images(images_to_preload)
    
    Game.start_gameplay = function() {
      Stage.initialize()
      
      TOTAL_POINTS = 0
      HIGHEST_LEVEL = 0
      
      GUN_IMG = $('#gun_img')[0]
      
      // Were we passed a level in the URL?
      var level_json = window.location.hash.split('#level=')[1]
      if(level_json) {
        level_json = decodeURIComponent(level_json)
        Levels = [$.evalJSON(level_json)]
        Stage.start_level()
      
      // If not, show the level selector
      } else {
        THIS.show_level_selector()
      }
      
      $('#level_selector .close').click(Stage.start_level)
    }
    
    Game.initialize()
  })
  
  Game.show_high_scores = function() {
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('atomatic', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="level">'+scores[i].misc+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  
  
  return THIS
}()
