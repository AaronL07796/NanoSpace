window._area = 'arcade'
window._attraction = 'ion_storm'

$(window).load(function() {
  
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var CONTAINER = $('#container')
  var WIDTH = CONTAINER.width()
  var HEIGHT = CONTAINER.height()
  
  var WINDOW_HALF_X = window.innerWidth / 2
	var WINDOW_HALF_Y = window.innerHeight / 2
	
	$(window).bind('resize', function() {
    WINDOW_HALF_X = window.innerWidth / 2
    WINDOW_HALF_Y = window.innerHeight / 2
  })
	
	var RADAR_CONTEXT = $('#radar')[0].getContext('2d')
	var RADAR_WIDTH = $('#radar').width()
	var RADAR_WIDTH_2 = RADAR_WIDTH / 2
	var RADAR_HEIGHT = $('#radar').height()
	var RADAR_HEIGHT_2 = RADAR_HEIGHT / 2
	
	var PAUSED = false
    
  var CAMERA = new THREE.Camera(30, WIDTH / HEIGHT, 1, 3000)
  CAMERA.position.x = 0
  CAMERA.position.y = 0
  CAMERA.position.z = 0
  
  var SCENE = new THREE.Scene()
  
  var RENDERER = new THREE.CanvasRenderer()
  RENDERER.setSize(WIDTH, HEIGHT)
  
  CONTAINER[0].appendChild(RENDERER.domElement)
  $('canvas').css({'z-index': 2, 'position': 'absolute'})
  $('#radar').css({'z-index': 3})
  
  var NUM_PARTICLES = 75
  var MAX_TARGETS = 3
  var MIN_TARGETS = 2
  var NUM_TARGETS = 0
  
  var PARTICLES = []
  var AMMO = []
  
  var MISSED = 0
  var NEUTRALIZED = 0
  var NEUTRALIZED_SINCE_BOMB = 0
  
  var PARTICLE_SIZE = 15
  
  var LON = 0, LAT = 8, PHI = 0, THETA = 0
  
  var LIVES = 3
  var NUM_NEUTRALIZED_IN_A_ROW = 0
  
  
  var LOOP_INTERVAL = null
  var LOOP_TIME = Date.now()
  var go = function() {
    Game.play_sound('background')
    LOOP_TIME = Date.now()
    LOOP_INTERVAL = setInterval(loop, 1000 / 60)
  }
  
  var stop = function() {
    Game.stop_sound('background')
    clearInterval(LOOP_INTERVAL)
  }
  
  
  var update_number_of_targets = function() {
    $('#info .score .val').html(NEUTRALIZED)
    
    if(NEUTRALIZED > 0 && (NEUTRALIZED - NEUTRALIZED_SINCE_BOMB) >= MAX_TARGETS) {
      add_bomb(1000)
    }
    
    MAX_TARGETS = Math.round(NEUTRALIZED / 5)
    if(MAX_TARGETS < 3) MAX_TARGETS = 3
    MIN_TARGETS = Math.floor(MAX_TARGETS / 2)
  }
  
  
  var update_score = function() {
    $('#info .lives .val').html(LIVES)
  }
  
  
  var add_particle = function(height, maybe_a_target) {
    var particle = new THREE.Particle(new THREE.ParticleCircleMaterial({color: 0x00FFFF, opacity: 1}))
    particle.position.x = Math.random() * 2000 - 1000
    particle.position.y = height || Math.random() * 1000
    particle.position.z = Math.random() * 2000 - 1000
    particle.scale.x = particle.scale.y = PARTICLE_SIZE
    
    if(maybe_a_target && (NUM_TARGETS < MIN_TARGETS || (NUM_TARGETS < MAX_TARGETS && Math.random() > 0.95))) { // charged particle
      particle.charge = Math.random() > 0.5 ? 1 : -1
      NUM_TARGETS++
      Game.play_sound('ion_created')
      
    } else { // neutral particle
      particle.charge = 0
    }
    
    SCENE.addObject(particle)
    PARTICLES.push(particle)
  }
  
  
  var add_ammo = function(charge) {
    if(charge > 0) {
      Game.play_sound('fire_proton')
    } else {
      Game.play_sound('fire_electron')
    }
    
    particle = new THREE.Particle(new THREE.ParticleCircleMaterial({color: 0xFFFFFF, opacity: 1}))
    particle.position.copy(CAMERA.position)
    particle.scale.x = particle.scale.y = PARTICLE_SIZE
    particle.velocity = new THREE.Vector3()
    particle.velocity.copy(CAMERA.target.position).normalize().multiplyScalar(1.35)
    particle.charge = charge
    SCENE.addObject(particle)
    AMMO.push(particle)
  }
  
  
  var BOMB = null
  var add_bomb = function(height) {
    if(BOMB) return
    
    Game.play_sound('bomb_created')
    
    BOMB = new THREE.Particle(new THREE.ParticleCircleMaterial({color: 0xFFFF00, opacity: 1}))
    BOMB.position.x = Math.random() * 2000 - 1000
    BOMB.position.y = height || Math.random() * 1000
    BOMB.position.z = Math.random() * 2000 - 1000
    BOMB.scale.x = BOMB.scale.y = PARTICLE_SIZE
    BOMB.bomb = true
    
    SCENE.addObject(BOMB)
    PARTICLES.push(BOMB)
  }
  
  
  var crosshairs_timeout = null
  var update_crosshairs = function(val) {
  	clearTimeout(crosshairs_timeout)
  	$('#crosshairs').removeClass('positive').removeClass('negative')
  	if(val) $('#crosshairs').addClass(val)
  	crosshairs_timeout = setTimeout(function() {update_crosshairs(null)}, 500)
  }
  
  

  //
    
  $(document).bind('keyup', function(e) {
    if(PAUSED) return
    
    var key = e.which
    
		// Fire guns
    if(key == 90) {
      add_ammo(1)
      update_crosshairs('positive')
      
    } else if(key == 88) {
      add_ammo(-1)
      update_crosshairs('negative')
    }
  })
  
  var MOUSE_X = 0, MOUSE_Y = 0
  $(document).bind('mousemove', function(e) {
    MOUSE_X = e.clientX - WINDOW_HALF_X
		MOUSE_Y = e.clientY - WINDOW_HALF_Y
  })
  
  
  
	var game_over = function() {
	  stop()
	  Game.play_sound('game_over')
	  User.save_score('ion_storm', Math.max(0, NEUTRALIZED))
	  Message.display($('#game_over_message'), -1)
	}
	
	$('#game_over_message').click(function() {
    $('#game_over_message').hide()
    Game.show_high_scores()
  })
  
  
  var add_to_neutralized = function() {
    var prev_num_in_a_row = NUM_NEUTRALIZED_IN_A_ROW
    
    NEUTRALIZED++
    NUM_NEUTRALIZED_IN_A_ROW++
    
    if(prev_num_in_a_row < 500 && NUM_NEUTRALIZED_IN_A_ROW >= 500) {
      Game.unlock_achievement('ion_storm_4', 'Holy cow! You neutralized 500 ions without losing a life!')
    } else if(prev_num_in_a_row < 200 && NUM_NEUTRALIZED_IN_A_ROW >= 200) {
      Game.unlock_achievement('ion_storm_3', 'Amazing! You neutralized 200 ions without losing a life!')
    } else if(prev_num_in_a_row < 100 && NUM_NEUTRALIZED_IN_A_ROW >= 100) {
      Game.unlock_achievement('ion_storm_3', 'Wow! You neutralized 500 ions without losing a life!')
    } else if(prev_num_in_a_row < 50 && NUM_NEUTRALIZED_IN_A_ROW >= 50) {
      Game.unlock_achievement('ion_storm_4', 'Good job! You neutralized 50 ions without losing a life!')
    }
  }
  
	
  var loop = function() {
    var time = Date.now()
    var interval = time - LOOP_TIME
    LOOP_TIME = time
    
    // Update particles
    var removed_particles = []
    var particle, position, dist, color
    
    for(var i = 0; i < NUM_PARTICLES; i++) {
      particle = PARTICLES[i]
      position = particle.position
      
      if(particle.bomb) {
        position.y -= .055 * interval
      } else {
        position.y -= .035 * interval
      }
      
      if(position.y < 0) {
        removed_particles.push(particle)
        if(particle.charge != 0 && !particle.bomb) {
          LIVES--
          NUM_NEUTRALIZED_IN_A_ROW = 0
          if(LIVES < 0) LIVES = 0
          update_score()
          if(LIVES == 0) game_over()
        }
        
      } else {
        dist = Math.sqrt(Math.pow(position.x-CAMERA.position.x, 2) + Math.pow(position.y-CAMERA.position.y, 2) + Math.pow(position.z-CAMERA.position.z, 2))
        
        if(!particle.bomb) {
          opacity = Math.max(.15, 1 - dist / 1500)
          if(particle.charge > 0) {
            var color = 'rgba(255, 0, 100, '+opacity+')'
          } else if(particle.charge < 0) {
            var color = 'rgba(0, 100, 255, '+opacity+')'
          } else {
            var color = 'rgba(255, 255, 255, '+opacity+')'
          }
          particle.materials[0].color.__styleString = color
        }
      }
    }
    
    for(var i = 0; i < removed_particles.length; i++) {
      particle = removed_particles[i]
      if(particle.charge != 0) NUM_TARGETS--
      SCENE.removeObject(particle)
      PARTICLES.splice(PARTICLES.indexOf(particle), 1)
    }
    
    var create_this_many = NUM_PARTICLES - PARTICLES.length
    for(var i = 0; i < create_this_many; i++) add_particle(1000, true)
    
    
    // Update fired ammo
    var removed_ammo = []
    
    for(var i = 0; i < AMMO.length; i++) {
      particle = AMMO[i]
      position = particle.position
      dist = Math.sqrt(Math.pow(position.x-CAMERA.position.x, 2) + Math.pow(position.y-CAMERA.position.y, 2) + Math.pow(position.z-CAMERA.position.z, 2))
      
      opacity = Math.max(.15, 1 - dist / 1500)
      if(particle.charge > 0) {
        var color = 'rgba(255, 0, 100, '+opacity+')'
      } else if(particle.charge < 0) {
        var color = 'rgba(0, 100, 255, '+opacity+')'
      } else {
        var color = 'rgba(255, 255, 255, '+opacity+')'
      }
      
      particle.materials[0].color.__styleString = color
      
      particle.position.x += particle.velocity.x * interval
      particle.position.y += particle.velocity.y * interval
      particle.position.z += particle.velocity.z * interval
      
      // Have we hit a particle?
      var bomb_hit = false
      
      for(var j = 0; j < NUM_PARTICLES; j++) {
        dist = Math.sqrt(Math.pow(particle.position.x-PARTICLES[j].position.x, 2) + Math.pow(particle.position.y-PARTICLES[j].position.y, 2) + Math.pow(particle.position.z-PARTICLES[j].position.z, 2))
        if(dist < 2*PARTICLE_SIZE) {
          
          // Is it a bomb?
          if(PARTICLES[j].bomb) {
            bomb_hit = true
            
          // Is it an ion?
          } else {
            if(PARTICLES[j].charge == 0) NEUTRALIZED--          
            
            PARTICLES[j].charge += particle.charge
            
            if(PARTICLES[j].charge == 0) {
              NUM_TARGETS--
              add_to_neutralized()
              Game.play_sound('neutralized')
            }
            
            // Keep the particle to -1, 0, or 1
            PARTICLES[j].charge = Math.min(1, Math.max(-1, PARTICLES[j].charge))
            
            update_number_of_targets()
            
            particle.charge = 0
          }
          
          removed_ammo.push(particle)
        }
      }
      
      // Is the ammo far enough away to remove it?
      if(dist > 4000) removed_ammo.push(particle)
    }
    
    for(var i = 0; i < removed_ammo.length; i++) {
      particle = removed_ammo[i]
      SCENE.removeObject(particle)
      AMMO.splice(AMMO.indexOf(particle), 1)
    }
    
    // Have we hit a bomb?
    if(bomb_hit) {
      Game.play_sound('bomb_goes_off')
      $('#bomb_flash').css('opacity', 1).show().delay(250).animate({opacity: 0}, 1000)
      
      // Remove the bomb
      PARTICLES.splice(PARTICLES.indexOf(BOMB), 1)
      SCENE.removeObject(BOMB)
      BOMB = null
      add_particle()
      
      // Remove any charged particles
      for(var i = 0; i < PARTICLES.length; i++) {
        if(PARTICLES[i].charge != 0) {
          PARTICLES[i].charge = 0
          add_to_neutralized()
        }
      }
      NUM_TARGETS = 0
      
      NEUTRALIZED_SINCE_BOMB = NEUTRALIZED
      update_number_of_targets()
    }
    
    
    // Update camera pan/tilt
    LON += MOUSE_X * .000135 * interval
    LAT -= MOUSE_Y * .000135 * interval
    
//     var arrow_accel = 1.25
//     var arrow_max = 10
//     var arrow_multi = 0.2
//     
//     if(pan_up) {
//     	pan_up = Math.min(arrow_max, arrow_accel * pan_up)
//     	LAT += pan_up * arrow_multi
//     }
//     if(pan_down) {
//     	pan_down = Math.min(arrow_max, arrow_accel * pan_down)
//     	LAT -= pan_down * arrow_multi
//     }
//     if(pan_left) {
//     	pan_left = Math.min(arrow_max, arrow_accel * pan_left)
//     	LON -= pan_left * arrow_multi
//     }
//     if(pan_right) {
//     	pan_right = Math.min(arrow_max, arrow_accel * pan_right)
//     	LON += pan_right * arrow_multi
//     }
    
    
    LAT = Math.max(0, Math.min(85, LAT))
    PHI = (90 - LAT) * Math.PI / 180
    THETA = LON * Math.PI / 180
    
    var percent = Math.min(2, (6*LAT - 90) / -180)
    var bottom = percent * HEIGHT - 5
    $('#ground').css({'height': Math.max(0, 100 * percent) + '%'})
    $('#mountains_front').css({'bottom': bottom + 'px', 'background-position': (2.4*LON) + '% 0'})
    $('#mountains_back').css({'bottom': (bottom+20) + 'px', 'background-position': (2.1*LON) + '% 0'})
    
    CAMERA.target.position.x = 100 * Math.sin(PHI) * Math.cos(THETA) + CAMERA.position.x
    CAMERA.target.position.y = 100 * Math.cos(PHI) + CAMERA.position.y
    CAMERA.target.position.z = 100 * Math.sin(PHI) * Math.sin(THETA) + CAMERA.position.z
    
    
    // Render the scene
    RENDERER.render(SCENE, CAMERA)
    
    
    // Update radar
    var radius = 71
    RADAR_CONTEXT.clearRect(0, 0, RADAR_WIDTH, RADAR_HEIGHT)
    
		RADAR_CONTEXT.lineWidth = 2
				
    var camera_angle = Math.atan2(CAMERA.target.position.z, CAMERA.target.position.x) + Math.PI / 2
    var particle_angle = 0
		var x, y, r
				
    for(var i = 0; i < NUM_PARTICLES; i++) {
      particle = PARTICLES[i]
      if(particle.charge == 0) continue
      
      position = particle.position
      particle_angle = camera_angle - Math.atan2(position.z, position.x)
			      
			var x = RADAR_WIDTH_2 + Math.cos(particle_angle) * radius
			var y = RADAR_HEIGHT_2 - Math.sin(particle_angle) * radius
			var r = Math.max(1, 0.00002*Math.pow(1000 - position.y, 2))
			
			if(particle.bomb) {
			  RADAR_CONTEXT.strokeStyle = 'rgba(255, 255, 0, 0.5)'
			} else {
			  RADAR_CONTEXT.strokeStyle = 'rgba(32, 141, 243, 0.5)'
			}
			
			if(position.y < 200) {
				opacity = (0.75 + Math.cos(time / 75) / 4)
				
				if(particle.bomb) {
          RADAR_CONTEXT.fillStyle = 'rgba(255, 255, 0, '+opacity+')'
        } else {
          RADAR_CONTEXT.fillStyle = 'rgba(32, 141, 243, '+opacity+')'
        }
        
			} else {
				if(particle.bomb) {
          RADAR_CONTEXT.fillStyle = 'rgba(255, 255, 0, 0.5)'
        } else {
          RADAR_CONTEXT.fillStyle = 'rgba(32, 141, 243, 0.25)'
        }
			}
      
    	RADAR_CONTEXT.beginPath()
    	RADAR_CONTEXT.arc(x, y, r, 0, Math.PI * 2, false)
    	RADAR_CONTEXT.fill()
    	RADAR_CONTEXT.stroke()
    }
  }
  
  
  var start_new_game = function() {
    Game.stop_sound('theme')
    
    $('#high_scores').hide()
    Message.hide()
    $('#more_info2').hide()
    
    LOOP_TIME = Date.now()
    
    MOUSE_X = 0
    MOUSE_Y = 0
    LON = 0
    LAT = 6
    
    LIVES = 3
    NUM_TARGETS = 0
    NEUTRALIZED = 0
    update_number_of_targets()
    update_score()
    
    for(var i = 0; i < PARTICLES.length; i++) {
      SCENE.removeObject(PARTICLES[i])
    }
    PARTICLES = []
    
    for(var i = 0; i < AMMO.length; i++) {
      SCENE.removeObject(AMMO[i])
    }
    AMMO = []
    
    for(var i = 0; i < NUM_PARTICLES; i++) {
      add_particle()
    }
    
    NUM_NEUTRALIZED_IN_A_ROW = 0
    
    go()
  }
  
  $('#more_info').click(function() {
    $('#more_info').hide()
    $('#more_info2').show()
  })
  $('#more_info2').click(start_new_game)
	
	
  // ------------------ GAME SETUP ----------------------

  Game.load_sounds([
    {
      id: 'bomb_created',
      url: 'sounds/bomb_created.mp3',
      volume: 50
    }, {
      id: 'bomb_goes_off',
      url: 'sounds/bomb_goes_off.mp3',
      volume: 50
    }, {
      id: 'fire_electron',
      url: 'sounds/fire_electron.mp3',
      volume: 50
    }, {
      id: 'fire_proton',
      url: 'sounds/fire_proton.mp3',
      volume: 50
    }, {
      id: 'ion_created',
      url: 'sounds/ion_created.mp3',
      volume: 50
    }, {
      id: 'neutralized',
      url: 'sounds/neutralized.mp3',
      volume: 50
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
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
      volume: 35
    }
  ])

  Game.load_images([
    'images/crosshairs.png',
    'images/mountains_back.png',
    'images/mountains_front.png',
    'images/info.png',
    'images/info2.png',
    'images/high_scores.png'
  ])
  
  
  $(Game).bind('pause', function(e, paused) {
    if(paused && PAUSED) return
    
    if(paused) {
      PAUSED = true
      stop()
      Message.display('PAUSED', -1)
    } else {
      PAUSED = false
      go()
      Message.hide()
    }
  })
  
  Game.start_gameplay = function() {
    Message.hide()
    $('#more_info').show()
  }
  
  Game.show_high_scores = function() {
    Game.play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('ion_storm', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', start_new_game)
  
  Game.initialize()
  
})
