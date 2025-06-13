// requestAnimationFrame shim
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 11);
          };
})();


var GasBox = function(canvas, params) {
	var THIS = {}
	
	params = params || {}
	
	var CANVAS = canvas
	var CANVAS_ELEM = CANVAS[0]
	var CONTEXT = CANVAS[0].getContext('2d')
	
	var WIDTH = CANVAS.width()
	var HEIGHT = CANVAS.height()
	
	var LAST_TIME = Date.now()
	var LOOPING = false
	
	
	var MOLECULES = []
	
	// Molecule Parameters
	var NUM_MOLECULES = params.num_molecules || 250
	var MOLECULE_RADIUS = params.molecule_radius || 10
	var MOLECULE_DIAMETER = MOLECULE_RADIUS * 2
	var MOLECULE_PADDING = params.molecule_passing || 2
	var GRAVITY = params.gravity || -0.0001
	var GRAVITY_CUTOFF_HEIGHT = params.gravity_cutoff_height || HEIGHT - 50
	var TARGET_AVG_VELOCITY = params.initial_avg_velocity || 0.25
	var INELASTIC_CUTOFF_VELOCITY = params.inelastic_cutoff_velocity || 0.1
	var LIQUID_VELOCITY_MIN = params.liquid_velocity_min || 0.1
	var LIQUID_VELOCITY_MAX = params.liquid_velocity_max || 0.225
	var LIQUID_FORCE_FIELD = params.liquid_force_field || .002
	
	var LIQUID_VELOCITY_SPAN = LIQUID_VELOCITY_MAX - LIQUID_VELOCITY_MIN
	var MOLECULE_RADIUS_SQUARED_2 = 2*MOLECULE_RADIUS*MOLECULE_RADIUS
	var AVG_VELOCITY = 0
	
	CONTEXT.fillStyle = params.color || 'rgb(255, 100, 0)'
	
	// Collision Detection Grid
	var COLLISION_GRID_SIZE = 50
	var COLLISION_GRID_X = Math.ceil(WIDTH / COLLISION_GRID_SIZE)
	var COLLISION_GRID_Y = Math.ceil(HEIGHT / COLLISION_GRID_SIZE)
	var COLLISION_GRID = []
	
	for(var x = 0; x < COLLISION_GRID_X; x++) {
		COLLISION_GRID[x] = []
		for(var y = 0; y < COLLISION_GRID_Y; y++) {
			COLLISION_GRID[x][y] = []
		}
	}
	
	var update_collision_grid = function(molecule) {
		// Remove the molecule from it's old grid positions
		for(var i = 0, g = [], gi = []; i < molecule.grid.length; i++) {
			gi = molecule.grid[i]
			g = COLLISION_GRID[gi[0]][gi[1]]
			g.splice(g.indexOf(molecule), 1)
		}
		
		// Find new grid positions
		var x1 = Math.max(0, Math.floor((molecule.x - MOLECULE_RADIUS) / COLLISION_GRID_SIZE))
		var x2 = Math.min(COLLISION_GRID_X-1, Math.floor((molecule.x + MOLECULE_RADIUS) / COLLISION_GRID_SIZE))
		var y1 = Math.max(0, Math.floor((molecule.y - MOLECULE_RADIUS) / COLLISION_GRID_SIZE))
		var y2 = Math.min(COLLISION_GRID_Y-1, Math.floor((molecule.y + MOLECULE_RADIUS) / COLLISION_GRID_SIZE))
		
		molecule.grid = []
		for(var x = x1; x <= x2; x++) {
			for(var y = y1; y <= y2; y++) {
				molecule.grid.push([x,y])
				COLLISION_GRID[x][y].push(molecule)
			}
		}
	}
	
	var potential_collisions_for = function(molecule) {
		var molecules = []
		
		for(var i = 0, gi = []; i < molecule.grid.length; i++) {
			gi = molecule.grid[i]
			molecules = molecules.concat(COLLISION_GRID[gi[0]][gi[1]])
		}
		
		return molecules
	}
	
	
	// Set the TARGET_AVG_VELOCITY
	THIS.set_avg_velocity = function(velocity) {
		TARGET_AVG_VELOCITY = velocity
	}
	
	
	// Set up initial molecules
	var randomize_molecule = function(molecule) {
		molecule.x = Math.random() * WIDTH
		molecule.y = Math.random() * HEIGHT
		molecule.vx = (Math.random() - Math.random()) * 0.25
		molecule.vy = (Math.random() - Math.random()) * 0.25
		update_collision_grid(molecule)
	}
	
	for(var i = 0; i < NUM_MOLECULES; i++) {
		var molecule = {x: 0, y: 0, vx: 0, vy: 0, grid: []}
		randomize_molecule(molecule)
		MOLECULES.push(molecule)
	}
	
	
	// Main Loop
	var loop = function() {
		var time = Date.now()
    var interval = time - LAST_TIME
    LAST_TIME = time
    if(interval > 40) interval = 40
    
    var velocity = 0, j = 0, jj = 0
    var molecules = []
    var wall_collision = false
    var wall_molecule = {}
    
    AVG_VELOCITY = 0
		
		CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
		
		// Update each molecules
		var molecule, m2
		for(var i = 0; i < NUM_MOLECULES; i++) {
			molecule = MOLECULES[i]
		  
			// Gravity
			if(molecule.y < GRAVITY_CUTOFF_HEIGHT) molecule.vy -= GRAVITY * interval
			
			// If the material is in the liquid state, add an invisible force field
			//if(TARGET_AVG_VELOCITY < LIQUID_VELOCITY && molecule.y < 500 && molecule.vy < 0) {
			if(TARGET_AVG_VELOCITY < LIQUID_VELOCITY_MAX && molecule.y < 500 && molecule.vy < 0) {
				molecule.vy += Math.min(1, 1 - (TARGET_AVG_VELOCITY - LIQUID_VELOCITY_MIN) / LIQUID_VELOCITY_SPAN) * LIQUID_FORCE_FIELD * interval
			}
			
			// Calculate velocity
			velocity = Math.sqrt(molecule.vx*molecule.vx + molecule.vy*molecule.vy)
			
			// If it's off the scales, just reset the molecule
			if(isNaN(velocity)) {
				randomize_molecule(molecule)
				velocity = Math.sqrt(molecule.vx*molecule.vx + molecule.vy*molecule.vy)
			}
			
			AVG_VELOCITY += velocity
			
			// Update position
			molecule.x += molecule.vx * interval
			molecule.y += molecule.vy * interval
			update_collision_grid(molecule)
			
			// Check for wall collisions
			wall_collision = false
			if(molecule.x > WIDTH) {
				molecule.vx *= -1
				molecule.x = WIDTH
				wall_collision = true
				wall_molecule.x = WIDTH + MOLECULE_DIAMETER
				wall_molecule.y = molecule.y
			} else if(molecule.x < 0) {
				molecule.vx *= -1
				molecule.x = 0
				wall_collision = true
				wall_molecule.x = 0 - MOLECULE_DIAMETER
				wall_molecule.y = molecule.y
			}
			
			if(molecule.y > HEIGHT) {
				molecule.vy *= -1
				molecule.y = HEIGHT
				wall_collision = true
				wall_molecule.x = molecule.x
				wall_molecule.y = HEIGHT + MOLECULE_DIAMETER
			} else if(molecule.y < 0) {
				molecule.vy *= -1
				molecule.y = 0
				wall_collision = true
				wall_molecule.x = molecule.x
				wall_molecule.y = 0 - MOLECULE_DIAMETER
			}
			
			// Heat or cool the molecule if it has hit a wall
			if(wall_collision) {
				wall_molecule.vx = 2.828 * TARGET_AVG_VELOCITY * (Math.random() - Math.random())
				wall_molecule.vy = 2.828 * TARGET_AVG_VELOCITY * (Math.random() - Math.random())
				elastic_bounce(molecule, wall_molecule)
			}
			
			// Check for molecule collisions			
			molecules = potential_collisions_for(molecule)
			for(j = 0, jj = molecules.length; j < jj; j++) {
				m2 = molecules[j]
				if(m2 == molecule) continue
				dist = Math.sqrt(Math.pow(molecule.x - m2.x, 2) + Math.pow(molecule.y - m2.y, 2))
				if(dist <= MOLECULE_DIAMETER) collide(molecule, m2)
			}
			
			// Draw the molecule
      CONTEXT.beginPath()
      CONTEXT.arc(molecule.x, molecule.y, MOLECULE_RADIUS-MOLECULE_PADDING, 0, Math.PI * 2, false)
      CONTEXT.fill()
		}
		
		AVG_VELOCITY /= NUM_MOLECULES
		
		if(LOOPING) requestAnimFrame(loop, CANVAS_ELEM)
	}
	
	
	// Collision between two molecules
	var collide = function(m1, m2) {
		var dv = Math.sqrt(Math.pow(m2.vx-m1.vx, 2) + Math.pow(m2.vy-m1.vy, 2))
		var elasticity = Math.pow(Math.max(0, INELASTIC_CUTOFF_VELOCITY - dv) / INELASTIC_CUTOFF_VELOCITY, 2)
		elastic_bounce(m1, m2, elasticity)
	}
	
	
  // Bounce two molecules off each other elastically
  var elastic_bounce = function(m1, m2, inelasticity) {
    var n = [m2.x-m1.x, m2.y-m1.y]
    var distance = Math.sqrt(n[0]*n[0] + n[1]*n[1])
    if(distance == 0) return
    
    var un = [n[0]/distance, n[1]/distance]
    var ut = [-1*un[1], un[0]]
    
    var v1 = [m1.vx, m1.vy]
    var v2 = [m2.vx, m2.vy]
    
    var v1n = un[0]*v1[0] + un[1]*v1[1]
    var v1t = ut[0]*v1[0] + ut[1]*v1[1]
    var v2n = un[0]*v2[0] + un[1]*v2[1]
    var v2t = ut[0]*v2[0] + ut[1]*v2[1]
    
    
    var vx1 = v2n*un[0] + v1t*ut[0]
    var vy1 = v2n*un[1] + v1t*ut[1]
    var vx2 = v1n*un[0] + v2t*ut[0]
    var vy2 = v1n*un[1] + v2t*ut[1]
		
    if(inelasticity) {
    	var inelasticity_inv = 1 - inelasticity
    	var vxi = inelasticity * (m1.vx + m2.vx) / 2
    	var vyi = inelasticity * (m1.vy + m2.vy) / 2
			vx1 = vxi + inelasticity_inv*vx1
			vy1 = vyi + inelasticity_inv*vy1
			vx2 = vxi + inelasticity_inv*vx2
			vy2 = vyi + inelasticity_inv*vy2
    }
    
    m1.vx = vx1
    m1.vy = vy1
    m2.vx = vx2
    m2.vy = vy2
    
    // Prevent the two molecules from physically overlapping
    if(MOLECULE_DIAMETER - distance > 0) {
      // http://mathworld.wolfram.com/Circle-CircleIntersection.html
      var d1 = (distance*distance - MOLECULE_RADIUS_SQUARED_2) / (2*distance)
      var d2 = distance - d1
      var overlap = (MOLECULE_RADIUS - d1) + (MOLECULE_RADIUS - d2)
      var ratio = (overlap / 2) / distance
      
      dx = ratio * (m2.x - m1.x)
      dy = ratio * (m2.y - m1.y)
      
      m1.x -= dx
      m1.y -= dy
      m2.x += dx
      m2.y += dy
    }
	}
	
	
	THIS.stop = function() {
	  LOOPING = false
	}
	
	
	THIS.start = function() {
	  LOOPING = true
	  loop()
	}
	
	
	THIS.start()
	return THIS
}
