window._area = 'arcade'
window._attraction = 'mission_to_bond'

$(window).load(function() {
  
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var Molecules = {
    'H2O':  {symbol: 'H2O', atoms: ['H','O','H'],          atoms_draw_order: ['H','O','H'],          positions: [[12,12], [0,0], [-12,12]],                      mass: 8,  radius: 18, bondable: false},
    'HO':   {symbol: 'HO', 	atoms: ['H','O'],              atoms_draw_order: ['O','H'],              positions: [[0,0], [-12,12]],                               mass: 6,  radius: 10, bondable: true},
    'H2':   {symbol: 'H2', 	atoms: ['H','H'],              atoms_draw_order: ['H', 'H'],             positions: [[-3,4], [3,-4]],                                mass: 2,  radius: 10, bondable: false},
    'CH4':  {symbol: 'CH4', atoms: ['C','H','H','H','H'],  atoms_draw_order: ['H','H','C','H','H'],  positions: [[-10,-10], [10,-10], [0,0], [-12,10], [12,10]], mass: 10, radius: 18, bondable: false},
    'CH3':  {symbol: 'CH3', atoms: ['C','H','H','H'],      atoms_draw_order: ['H','C','H','H'],      positions: [[10,-10], [0,0], [-12,10], [12,10]],            mass: 9,  radius: 18, bondable: true},
    'CH2':  {symbol: 'CH2', atoms: ['C','H','H'],          atoms_draw_order: ['H', 'C', 'H'],        positions: [[10,-10], [0,0], [-12,10]],                     mass: 8,  radius: 18, bondable: true},
    'CH':   {symbol: 'CH', 	atoms: ['C','H'],              atoms_draw_order: ['C','H'],              positions: [[0,0], [-12,10]],                               mass: 7,  radius: 14, bondable: true},
    'NH3':  {symbol: 'NH3', atoms: ['N','H','H','H'],      atoms_draw_order: ['H','N','H','H'],      positions: [[2,-13], [0,0], [-14,6], [16,6]],               mass: 9,  radius: 18, bondable: false},
    'NH2':  {symbol: 'NH2', atoms: ['N','H','H'],          atoms_draw_order: ['H', 'N', 'H'],        positions: [[2,-13], [0,0], [-14,6]],                       mass: 8,  radius: 18, bondable: true},
    'NH':   {symbol: 'NH', 	atoms: ['N','H'],              atoms_draw_order: ['N','H'],              positions: [[0,0], [-14,6]],                                mass: 7,  radius: 14, bondable: true},
    'CO2':  {symbol: 'CO2', atoms: ['C','O','O'],          atoms_draw_order: ['O', 'C', 'O'],        positions: [[0,-16], [0,0], [0,16]],                        mass: 18, radius: 22, bondable: false},
    'CO':   {symbol: 'CO',  atoms: ['C','O'],              atoms_draw_order: ['O', 'C'],             positions: [[0,-8], [0,8]],                                 mass: 12, radius: 14, bondable: true},
    'NO2':  {symbol: 'NO2', atoms: ['N','O','O'],          atoms_draw_order: ['O', 'N', 'O'],        positions: [[12,12], [0,0], [-12,12]],                      mass: 18, radius: 22, bondable: false},
    'NO':   {symbol: 'NO',  atoms: ['N','O'],              atoms_draw_order: ['O', 'N'],             positions: [[0,0], [-12,12]],                               mass: 12, radius: 14, bondable: true},
    'N2':   {symbol: 'N2', 	atoms: ['N', 'N'],             atoms_draw_order: ['N', 'N'],             positions: [[0,-8], [0,8]],                                 mass: 12, radius: 14, bondable: true},
    'O2':   {symbol: 'O2', 	atoms: ['O', 'O'],             atoms_draw_order: ['O', 'O'],             positions: [[0,-8], [0,8]],                                 mass: 12, radius: 14, bondable: false},
    'H':    {symbol: 'H', 	atoms: ['H'],                  atoms_draw_order: ['H'],                  positions: [[0,0]],                                         mass: 1,  radius: 8,  bondable: true},
    'C':    {symbol: 'C', 	atoms: ['C'],                  atoms_draw_order: ['C'],                  positions: [[0,0]],                                         mass: 6,  radius: 10, bondable: true},
    'O':    {symbol: 'O', 	atoms: ['O'],                  atoms_draw_order: ['O'],                  positions: [[0,0]],                                         mass: 6,  radius: 10, bondable: true},
    'N':    {symbol: 'N', 	atoms: ['N'],                  atoms_draw_order: ['N'],                  positions: [[0,0]],                                         mass: 6,  radius: 10, bondable: true}
  }
    
  var Atoms = {}
  Atoms['H'] = {color: PERIODIC_TABLE['H'].color, radius: 20*PERIODIC_TABLE['H'].radius}
  Atoms['C'] = {color: PERIODIC_TABLE['C'].color, radius: 20*PERIODIC_TABLE['C'].radius}
  Atoms['O'] = {color: PERIODIC_TABLE['O'].color, radius: 20*PERIODIC_TABLE['O'].radius}
  Atoms['N'] = {color: PERIODIC_TABLE['N'].color, radius: 20*PERIODIC_TABLE['N'].radius}
  
  // These are the target molecules that the user needs to create
  var Targets = [
    'O2',
    'H2O',
    'CO2',
    'NH3',
    'N2',
    'NO2',
    'CH4'
  ]
  
  // These are the molecules that randomly enter the stage
  // (There should be as many of these as Targets)
  var RandomMolecules = [
    ['N2', 'N2', 'N2', 'O2', 'O2', 'O', 'N', 'H2O', 'CO2', 'CO'],
    ['H2O', 'H2O', 'H2O', 'O', 'H', 'CO2', 'CO', 'O2'],
    ['C', 'C', 'H2', 'H2', 'O', 'CH4', 'CH3', 'HO'],
    ['H2O', 'H2', 'CH4', 'NH3', 'CO2', 'N2', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N'],
    ['H2O', 'H2', 'CH4', 'NH3', 'CO2', 'N2', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N'],
    ['H2O', 'H2', 'CH4', 'NH3', 'CO2', 'N2', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N'],
    ['H2O', 'H2', 'CH4', 'NH3', 'CO2', 'N2', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N', 'H', 'C', 'O', 'N']
  ]
  
  var Iterations = {
    qty: [3, 5, 8, 10],
    incoming_rate: [2, 1.65, 1.4, 1],
    initial_molecules: [4, 5, 6, 7]
  }
  
  var TARGET = null
  var QTY = 0
  var INCOMING_RATE = 0
  var INITIAL_MOLECULES = 0
  var MAX_MOLECULES = 0
  var MAX_MAX_MOLECULES = 25 // Heh, this is the maximum value of MAX_MOLECULES
  
  var MAX_SPEED = 325
  var MIN_SPEED = 50
  
  var CAN_PAUSE = true
      
  var LEVEL_NUM = -1
  var LEVEL = {}
  var PAUSED = true
    
  var CONTAINER = $("#container")
  var WIDTH = CONTAINER.width()
  var HEIGHT = CONTAINER.height()
    
  var CONTAINER_TOP = CONTAINER.offset().top
  var CONTAINER_LEFT = CONTAINER.offset().left
  
  $(window).bind('resize', function() {
    CONTAINER_TOP = CONTAINER.offset().top
    CONTAINER_LEFT = CONTAINER.offset().left
  })
  
  var CANVAS = $("#canvas")
  var CANVAS_ELEM = CANVAS[0]
  var CONTEXT = CANVAS[0].getContext("2d")
  
  var PLAYER = {
    x: WIDTH/2,
    y: HEIGHT/2,
    vx: 0,
    vy: 0,
    molecule: null,
    target_molecule: null,
    target_atom_index: 1,
    target_atom_symbol: null,
    lives_left: 3,
    molecules_created: 0,
    invincible: false,
    score: 0
  }
  
  
  var PENALTY_POINTS_FOR_COLLISION = 100
  
  
  CANVAS.attr({'width': WIDTH, 'height': HEIGHT})
  CANVAS.css({'width': WIDTH, 'height': HEIGHT})
  
  
  var NUM_MOLECULES = 0
  var MOLECULES = []
  
  
  // Create a single molecule and add it to the stage
  var add_molecule = function(symbol, molecule) {
    molecule = molecule || {}
    
    molecule.symbol = symbol
    molecule.x = (typeof molecule.x == 'undefined') ? null : molecule.x
    molecule.y = (typeof molecule.y == 'undefined') ? null : molecule.y
    molecule.vx = (typeof molecule.vx == 'undefined') ? null : molecule.vx
    molecule.vy = (typeof molecule.vy == 'undefined') ? null : molecule.vy
    molecule.radius = molecule.radius || Molecules[symbol].radius
    molecule.color = molecule.color || Molecules[symbol].color
    molecule.mass = molecule.mass || Molecules[symbol].mass
    
    if(typeof molecule.angle == 'undefined') {
      molecule.angle = 2 * Math.PI * Math.random()
    }
    
    var min_v_angle = 1
    var max_v_angle = 5
    var v_angle_range = max_v_angle - min_v_angle
    if(typeof molecule.v_angle == 'undefined') {
      molecule.v_angle = min_v_angle + v_angle_range * Math.random()
      if(Math.random() < 0.5) molecule.v_angle *= -1
    }
    
    if(molecule.vx == null) molecule.vx = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
    if(molecule.vy == null) molecule.vy = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
    molecule.v = Math.sqrt(molecule.vx*molecule.vx + molecule.vy*molecule.vy)
    
    if(molecule.x == null || molecule.y == null) {
      // Start the molecule on the top or bottom
      if(Math.random() < 0.5) {
        molecule.x = Math.random() * WIDTH
      
        if(Math.random() < 0.5) { // top
          molecule.y = 0
        } else { // bottom
          molecule.y = HEIGHT
          molecule.vy *= -1
        }
    
      // Start the molecule on the left or right size
      } else {
        molecule.y = Math.random() * HEIGHT
      
        if(Math.random() < 0.5) { // left
          molecule.x = 0
        } else { // right
          molecule.x = WIDTH
          molecule.vx *= -1
        }
      }
    }
    
    // Add the molecule to the collection of molecules
    MOLECULES.push(molecule)
    NUM_MOLECULES += 1
    
    return molecule
  }
  
  
  var add_next_player_atom = function() {
    var next_molecule_symbol = PLAYER.target_molecule.atoms[PLAYER.target_atom_index]
    add_molecule(next_molecule_symbol)
  }
  
  
  // Add a random molecule to the stage
  var add_random_molecule = function() {
    if(!PLAYER.target_molecule) return
    
    // Make sure that there's always at least one of the next required molecule...
    var next_molecule_symbol = PLAYER.target_molecule.atoms[PLAYER.target_atom_index]
    
    if(next_molecule_symbol) {
      var next_molecule_exists = false
      for(var i = 0; i < NUM_MOLECULES; i++) {
        if(MOLECULES[i].symbol == next_molecule_symbol) {
          next_molecule_exists = true
          break
        }
      }
    } else {
      var next_molecule_exists = true
    }
    
    // If not, create it
    if(!next_molecule_exists) {
      add_molecule(next_molecule_symbol)
    
    // Otherwise, add a random molecule that isn't the next molecule
    } else {
      var symbols = RandomMolecules[LEVEL_NUM % RandomMolecules.length].slice(0)
      
      if(next_molecule_symbol) {
        for(var i = 0; i < symbols.length; i++) {
          if(next_molecule_symbol == symbols[i]) symbols.splice(i, 1)
        }
      }
      add_molecule(symbols[Math.floor(Math.random() * symbols.length)])
    }
  }
  
  
  var keep_adding_random_molecules = function() {
    if(NUM_MOLECULES < MAX_MOLECULES) add_random_molecule()
    setTimeout(keep_adding_random_molecules, INCOMING_RATE * 1000)
  }
  
  
  // Remove a molecule from the stage
  var REMOVED_MOLECULES = []
  var remove_molecule = function(molecule) {
    REMOVED_MOLECULES.push(molecule)
  }
  
  
  // The player has collided with the given molecule. What should we do?
  var collide_with = function(molecule) {
    if(new Date() - molecule.last_collision < 1000) return
    molecule.last_collision = new Date()
    
    // Is the molecule a valid target (i.e. the next atom we need to hit)?
    // If so, "add" it to the player's molecule
    if(molecule.symbol == PLAYER.target_atom_symbol) {
      
      Game.play_sound('bond')
      
      // Add the molecule to the player
      add_molecule_to_player(molecule)
      make_player_invincible(false)
      
      // Is the molecule now complete?
      if(PLAYER.molecule == PLAYER.target_molecule) {
        Game.play_sound('molecule_made')
        
        // Iterate the number of molecules completed
        PLAYER.molecules_created += 1
                
        // Drop the molecule
        add_molecule(TARGET, {
          x: PLAYER.x,
          y: PLAYER.y,
          vx: 150 * (Math.random() - Math.random()),
          vy: 150 * (Math.random() - Math.random()),
          angle: 2 * Math.PI * Math.random(),
          v_angle: 0.25 * (Math.random() - Math.random())
        })
        reset_player_for_another_molecule()
        make_player_invincible(true)
        
        // Update the score
        PLAYER.score += 100 * PLAYER.target_molecule.atoms.length
        
        // Have we completed all the molecules? If so, the level is done!
        if(PLAYER.molecules_created >= QTY) {
          Game.play_sound('level_complete')
          loop() // make sure to redraw a final time
          
          // Achievements
          if(LEVEL_NUM == 5-1) {
            Game.unlock_achievement('mission_to_bond_1', '5th Mission Complete')
          } else if(LEVEL_NUM == 10-1) {
            Game.unlock_achievement('mission_to_bond_2', '10th Mission Complete')
          } else if(LEVEL_NUM == 15-1) {
            Game.unlock_achievement('mission_to_bond_3', '15th Mission Complete')
          }
          
          load_next_level()
          start_level_prompt()
          
        } else {
          $('#to_go_message span').html(QTY - PLAYER.molecules_created)
          Message.display($('#to_go_message'), 500)
        }
        
        update_display()
      }
      
      add_next_player_atom()
      
      
    // If the molecule isn't a valid target, check to see whether the player has bonded with the molecule
    } else if(!PLAYER.invincible) {
      if(molecule.symbol != TARGET && Molecules[molecule.symbol].bondable && PLAYER.molecule.bondable) {
        Game.play_sound('wrong_atom')
        
        // Drop the molecule
        var atoms = PLAYER.molecule.atoms.slice(0)
        atoms.push(molecule.symbol)
        var new_molecule = find_molecule_using_atom_array(atoms)
        if(new_molecule) {
          remove_molecule(molecule)
          add_molecule(new_molecule.symbol, {
            x: PLAYER.x,
            y: PLAYER.y,
            vx: 150 * (Math.random() - Math.random()),
            vy: 150 * (Math.random() - Math.random()),
            angle: 2 * Math.PI * Math.random(),
            v_angle: 0.25 * (Math.random() - Math.random())
          })
        }
        
        // Update the score
        PLAYER.score -= PENALTY_POINTS_FOR_COLLISION
        if(PLAYER.score < 0)  PLAYER.score = 0
        
        PLAYER.lives_left -= 1
        if(PLAYER.lives_left <= 0) return game_over()
        
        $('#wrong_bond_message .tries_left .num').html(PLAYER.lives_left)
        Message.display($('#wrong_bond_message'), 1000)
        
        reset_player_for_another_molecule()
        make_player_invincible(true)
        add_next_player_atom()
                
      // If not, bounce the molecule away
      } else {
        Game.play_sound('bounce_collision')
        bounce(molecule)
      }
    }
    
    update_display()
  }
  
  
  // Add the atom/molecule to the player's molecule
  var add_molecule_to_player = function(molecule) {
    var atoms = PLAYER.molecule.atoms.slice(0)
    atoms.push(molecule.symbol)
    PLAYER.molecule = find_molecule_using_atom_array(atoms)
    PLAYER.target_atom_index++
    PLAYER.target_atom_symbol = PLAYER.target_molecule.atoms[PLAYER.target_atom_index]
    remove_molecule(molecule)
  }
  
  
  // Reset the player to start building a new molecule on the current level
  var reset_player_for_another_molecule = function() {
    PLAYER.molecule = Molecules[Molecules[TARGET].atoms[0]]
    PLAYER.target_atom_index = 1
    PLAYER.target_atom_symbol = PLAYER.target_molecule.atoms[PLAYER.target_atom_index]
  }
  
  
  // The given molecule has bounced off the player
  var bounce = function(molecule) {        
    var n = [molecule.x-PLAYER.x, molecule.y-PLAYER.y]
    var n_bar = Math.sqrt(n[0]*n[0] + n[1]*n[1])
    var un = [n[0]/n_bar, n[1]/n_bar]
    var ut = [-1*un[1], un[0]]
    
    var v1 = [PLAYER.vx, PLAYER.vy]
    var v2 = [molecule.vx, molecule.vy]
    
    var v1n = un[0]*v1[0] + un[1]*v1[1]
    var v2n = un[0]*v2[0] + un[1]*v2[1]
    var v2t = ut[0]*v2[0] + ut[1]*v2[1]
    
    var vf2n = (2*v1n - v2n)
    vf2n = [vf2n*un[0], vf2n*un[1]]
    
    var vf2t = [v2t*ut[0], v2t*ut[1]]
    var vf2 = [vf2n[0]+vf2t[0], vf2n[1]+vf2t[1]]
    
    // Set new velocity and starting position
    molecule.vx = vf2[0]
    molecule.vy = vf2[1]
    molecule.v = Math.sqrt(molecule.vx*molecule.vx + molecule.vy*molecule.vy)
  }
  
  
  // Find a molecule given the atoms in that molecule
  var find_molecule_using_atom_array = function(atoms) {    
    var atom_str = atoms.slice(0).sort().join(',')
    
    for(var i in Molecules) {
      if(atom_str == Molecules[i].atoms.slice(0).sort().join(',')) {
        return Molecules[i]
      }
    }
    
    return null
  }
  
  
  // Game over. Sorry, man
  var game_over = function() {
    Game.play_sound('you_lose')
    PAUSED = true
    $('#container').css('cursor', 'auto')
    $(document).unbind('mousemove', mousemove)
    $(document).unbind('touchmove', mousemove)
    User.save_score('mission_to_bond', PLAYER.score)
    Message.display($('#game_over_message'), -1)
  }
  $('#game_over_message').click(function(){Game.show_high_scores()})
  
  
  // Make the player invincible
  var INVINCIBLE_TIMEOUT = null
  var make_player_invincible = function(is_invincible) {
    clearTimeout(INVINCIBLE_TIMEOUT)
    PLAYER.invincible = is_invincible
    if(is_invincible) {
      INVINCIBLE_TIMEOUT = setTimeout(function() {PLAYER.invincible = false}, 3000)
    }
  }
  
  
  // Draw the molecules
  var PREVIOUS_TIME = Date.now()
  var TIME = Date.now()
  
  var loop = function() {
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    
    TIME = Date.now()
    var interval = (TIME - PREVIOUS_TIME) / 1000
    PREVIOUS_TIME = TIME
    
    var molecule, mouse_dist, interval_multiple
    
    for(var i = 0; i < NUM_MOLECULES; i++) {
      molecule = MOLECULES[i]
      molecule.angle += interval * molecule.v_angle
      
      // Update the molecule's position
      molecule.x += interval * molecule.vx
      molecule.y += interval * molecule.vy
      
      // If we've hit a wall, reflect the molecule
      if(molecule.x <= 0) {
        molecule.vx *= -1
        molecule.x = 1
      } else if(molecule.x >= WIDTH) {
        molecule.vx *= -1
        molecule.x = WIDTH-1
      } else if(molecule.y <= 0) {
        molecule.vy *= -1
        molecule.y = 1
      } else if(molecule.y >= HEIGHT) {
        molecule.vy *= -1
        molecule.y = HEIGHT-1
      }
      
      // Have we collided with the player's molecule?
      // TODO: If an molecule passes through the player, it will register a bad collision or none at all.
      //       So draw a line through the player circle to figure out the exact hit point.
      mouse_dist = Math.sqrt(Math.pow(PLAYER.x - molecule.x, 2) + Math.pow(PLAYER.y - molecule.y, 2))
      if(mouse_dist <= molecule.radius + PLAYER.molecule.radius) collide_with(molecule)
      
      // Draw the molecule
      draw_molecule(Molecules[molecule.symbol], molecule.x, molecule.y, molecule.angle, CONTEXT, 1, true)
    }
    
    // Remove any molecules marked for removal
    if(REMOVED_MOLECULES.length > 0) {
      for(var r = 0; r < REMOVED_MOLECULES.length; r++) {
        var mi = MOLECULES.indexOf(REMOVED_MOLECULES[r])
        if(mi != -1) {
          MOLECULES.splice(mi, 1)
          NUM_MOLECULES--
        }
      }
    }
    
    // Draw player
    if(TIME - LAST_TRAIL_ADDED_TIME > 30) {
      TRAIL.push([PLAYER.x, PLAYER.y])
      if(TRAIL.length >= TRAIL_LENGTH) TRAIL.shift()
      LAST_TRAIL_ADDED_TIME = TIME
    }
    
    CONTEXT.lineCap = 'round'
    CONTEXT.lineWidth = 2
    CONTEXT.beginPath()
    CONTEXT.moveTo(TRAIL[TRAIL.length-1][0], TRAIL[TRAIL.length-1][1])
    
    var opacity = 0
    for(var i = TRAIL.length - 2; i >= 0; i--) {
      opacity = i / (20*TRAIL_LENGTH)
      CONTEXT.strokeStyle = 'rgba(255, 255, 255, '+opacity+')'
      if(TRAIL[i-1]) {
        CONTEXT.quadraticCurveTo(TRAIL[i][0], TRAIL[i][1], (TRAIL[i-1][0] + TRAIL[i][0]) / 2, (TRAIL[i-1][1] + TRAIL[i][1]) / 2)
      } else {
        CONTEXT.lineTo(TRAIL[i][0], TRAIL[i][1])
      }
      CONTEXT.stroke()
    }
    
    draw_molecule(PLAYER.molecule, PLAYER.x, PLAYER.y, 0, CONTEXT, PLAYER.invincible ? 0.25 : 1)
    
    if(!PAUSED) requestAnimFrame(loop, CANVAS_ELEM)
  }
  
  
  // Draw a single molecule
  var draw_molecule = function(m, x, y, angle, context, opacity, highlight) {
    opacity = opacity || 1
    var atom
    
    context.lineWidth = 2
    context.strokeStyle = 'rgb(0, 0, 0)'
    
    context.save()
    context.translate(x, y)
    context.rotate(angle)
    
    for(var j = 0; j < m.atoms_draw_order.length; j++) {      
      atom = m.atoms_draw_order[j]
      
      context.save()
      if(opacity != 1) context.globalAlpha = opacity
            
      var color = Atoms[atom].color
      var left = m.positions[j][0]
      var top = m.positions[j][1]
      var radius = Atoms[atom].radius
      
      // Draw the ball
      context.fillStyle = color
      context.beginPath()
      context.arc(left, top, radius, 0, Math.PI * 2, false)
      context.stroke()
      context.fill()
      
      // Set the clipping region for the highlight
      context.beginPath()
      context.arc(left, top, radius*0.94, 0, Math.PI * 2, false)
      context.clip()
      
      // Draw the highlight
      context.fillStyle = 'rgba(255, 255, 255, 0.5)'
      context.translate(left, top)
      context.rotate(-1*angle)
      context.translate(-1*left, -1*top)
      context.fillRect(left - radius, top - radius, 2*radius, 2*radius)
      
      // Draw the fill color again
      context.fillStyle = color
      context.beginPath()
      context.arc(left - 0.25*radius, top + 0.5*radius, radius, 0, Math.PI * 2, false)
      context.fill()
      
      context.restore()
      
      // Draw the highlight, if necessary
      if(highlight && m.symbol == PLAYER.target_atom_symbol) {
      	var opacity = 0.6 + 0.4 * Math.cos(TIME / 100.0)
      	context.strokeStyle = 'rgba(32, 141, 243, '+opacity+')'
      	context.lineWidth = 2
      	context.beginPath()
      	context.arc(left, top, radius+5, 0, Math.PI * 2, false)
      	context.stroke()
      }
    }
    
    context.restore()
  }
    
  
  var update_display = function() {
    $('#target_img img').each(function(i, elem) {
      if(i < PLAYER.molecules_created) {
        $(elem).removeClass('empty')
      } else {
        $(elem).attr('class', 'empty')
      }
    })
    
    $('#lives_left .value').html(PLAYER.lives_left)
    $('#score .value').html(PLAYER.score)
  }
  
  
  // Watch for mouse movements
  var TRAIL = []
  var TRAIL_LENGTH = 25
  var LAST_TRAIL_ADDED_TIME = 0
  
  var mousemove = function(e) {
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]    
    PLAYER.x = e.clientX - CONTAINER_LEFT
    PLAYER.y = e.clientY - CONTAINER_TOP
    return false
  }
  
  
  var load_next_level = function() {
    LEVEL_NUM += 1
    TARGET = Targets[LEVEL_NUM % Targets.length]
    
    MAX_MOLECULES++
    if(MAX_MOLECULES > MAX_MAX_MOLECULES) MAX_MOLECULES = MAX_MAX_MOLECULES
    
    var iteration = Math.floor(LEVEL_NUM / Targets.length)
    
    QTY = Iterations.qty[iteration]
    if(!QTY) QTY = Iterations.qty[Iterations.qty.length-1]
    
    INCOMING_RATE = Iterations.incoming_rate[iteration]
    if(!INCOMING_RATE) INCOMING_RATE = Iterations.incoming_rate[Iterations.incoming_rate.length-1]
    
    INITIAL_MOLECULES = Iterations.initial_molecules[iteration]
    if(!INITIAL_MOLECULES) INITIAL_MOLECULES = Iterations.initial_molecules[Iterations.initial_molecules.length-1]
  }
  
  
  var start_level = function() {
    Game.stop_sound('theme').stop_sound('level_complete')
    Game.stop_sound('background').play_sound('background')
    Game.play_sound('new_level')
    
    PAUSED = false
    CAN_PAUSE = true
    
    Message.hide()
    if(LEVEL_NUM == 0) $('#info').animate({bottom: -53}, 250)
    
    $('#container').css('cursor', 'none')
    $('#level_indicator span').html(LEVEL_NUM + 1)
    
    // Setup player
    var player_symbol = Molecules[TARGET].atoms[0]
    PLAYER.molecule = Molecules[player_symbol]
    PLAYER.target_molecule = Molecules[TARGET]
    PLAYER.target_molecule_symbol = TARGET
    PLAYER.target_atom_index = 1
    PLAYER.target_atom_symbol = PLAYER.target_molecule.atoms[PLAYER.target_atom_index]
    PLAYER.molecules_created = 0
    
    make_player_invincible(false)
    
    // Create initial molecules
    NUM_MOLECULES = 0
    MOLECULES = []
    
    // Add some initial atoms to the mix
    for(var i = 0; i < INITIAL_MOLECULES; i++) {
      add_random_molecule()
    }
    
    // Render the target molecules
    $('#target_img').html('')
    
    for(var i = 0; i < QTY; i++) {
      $('<img />').draw(80, 80, function(c) {
        draw_molecule(PLAYER.target_molecule, 40, 40, 0, c)
      }).attr('class', 'empty').css({width: 50, height: 50}).appendTo($('#target_img'))
    }
    
    // Update info display
    update_display()
    
    // Start looping
    loop()
    
    setTimeout(keep_adding_random_molecules, INCOMING_RATE * 1000)
  }
  
  
  var start_level_message_timeout = null
  var start_level_prompt = function() {
    CAN_PAUSE = false
    $('#container').css('cursor', 'auto')
    
    PAUSED = true
    var total_level_num = LEVEL_NUM + 1
    if(total_level_num == 1) {
      $('#start_level_message .mission_accomplished').hide()
    } else {
      $('#start_level_message .mission_accomplished').show()
    }
    $('#start_level_message .level .num').html(total_level_num)
    $('#start_level_message .create .num').html(QTY)
    $('#start_level_message .create .target').html(TARGET.replace(/(\d+)/, '<sub>$1</sub>', 'g'))
    Message.display($('#start_level_message'), 4000)
    start_level_message_timeout = setTimeout(start_level, 4000)
  }
  
  $('#start_level_message').bind('click', function() {
    clearTimeout(start_level_message_timeout)
    start_level()
  })
  
  
  
  // ------------------ GAME SETUP ----------------------
    
  Game.load_sounds([
    {
      id: 'wrong_atom',
      url: 'sounds/wrong_atom.mp3',
      volume: 50
    }, {
      id: 'bond',
      url: 'sounds/bond.mp3',
      volume: 100
    }, {
      id: 'bounce_collision',
      url: 'sounds/bounce_collision.mp3',
      volume: 50
    }, {
      id: 'molecule_made',
      url: 'sounds/molecule_made.mp3',
      volume: 50
    }, {
      id: 'level_complete',
      url: 'sounds/level_complete.mp3',
      music_muteable: true,
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      music_muteable: true,
      volume: 50
    }, {
      id: 'you_lose',
      url: 'sounds/you_lose.mp3',
      volume: 50
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      stream: true,
      loops: 999999,
      music_muteable: true,
      volume: 50
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      stream: true,
      music_muteable: true,
      volume: 70
    }
  ])
  
  Game.load_images([
    'images/high_scores.png'
  ])
  
  Game.start_gameplay = function() {
    $('#high_scores').hide()
    $(document).bind('mousemove', mousemove)
    $(document).bind('touchmove', mousemove)
    
    PLAYER = {
      x: WIDTH/2,
      y: HEIGHT/2,
      vx: 0,
      vy: 0,
      molecule: null,
      target_molecule: null,
      target_atom_index: 1,
      target_atom_symbol: null,
      lives_left: 3,
      molecules_created: 0,
      invincible: false,
      score: 0
    }
  
    MAX_MOLECULES = 5
    
    LEVEL_NUM = -1
    load_next_level()
    start_level_prompt()
  }
  
  Game.show_high_scores = function() {
    Game.play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('mission_to_bond', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', function(){Game.start_gameplay()})
  
  Game.can_pause = function() {
    return CAN_PAUSE
  }
  
  $(Game).bind('pause', function(e, paused) {
    if(paused && PAUSED) return
    
    if(paused) {
      PAUSED = true
      $('#container').css('cursor', 'auto')
      setTimeout(function(){CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)}, 100)
      Message.display('PAUSED', -1)
    } else {
      PAUSED = false
      PREVIOUS_TIME = Date.now()
      $('#container').css('cursor', 'none')
      Message.hide()
      loop()
    }
  })
  
  Game.initialize()
})
