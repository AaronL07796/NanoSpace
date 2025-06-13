var Molecule = function(pdb_file, params) {  
  var THIS = {}
  
  var ROTATION_VECTOR_INIT = [0, 0, 0]
  var ROTATION_ANGLE_INIT = 0
  var ROTATION_VECTOR = [0, 0, 0]
  var ROTATION_ANGLE = 0
  
  THIS.coordinates = params.coordinates || [0, 0, 0]
  THIS.canvas = params.canvas
  THIS.container = THIS.canvas.parent()
  
  var ATOMS_ELEMS
  var ATOM_IMG
  
  var IS_DRAGGING = false
  var START_X = 0
  var START_Y = 0
  
  var SCREEN_SIZE, HALF_SCREEN_SIZE, ANGLE_OF_VIEW
  var CONTEXT
  
  var ATOM_STYLES = {
    'C':  {color: 'rgba(60, 60, 60, 0.95)', radius: 300},
    'H':  {color: 'rgba(20, 50, 255, 0.95)', radius: 200},
    'O':  {color: 'rgba(255, 0, 0, 0.95)', radius: 300},
    'PB': {color: 'rgba(255, 0, 255, 0.95)', radius: 700},
    'TI': {color: 'rgba(255, 255, 0, 0.95)', radius: 600},
    'N': {color: 'rgba(255, 0, 255, 0.95)', radius: 300},
    'S': {color: 'rgba(255, 255, 0, 0.95)', radius: 500},
    'P': {color: 'rgba(0, 200, 200, 0.95)', radius: 500},
    'default': {color: 'rgba(255, 255, 0, 0.95)', radius: 400}
  }
  
  
  // Check for Mobile Safari
  var MOBILE_WEBKIT = (navigator && navigator.userAgent && navigator.userAgent.match(/WebKit.*?Mobile/))
  MOBILE_WEBKIT = true
  
  
  String.prototype.strip = function() {
    return this.replace(/^\s+|\s+$/g, '')
  }
  
  // Load the atoms
  var load_atoms = function(file) {
    THIS.atoms = []
    
    file = file.strip()
    
    // If it's an SDF file
    if(file.substring(file.length-4) == '$$$$') {
      var lines = file.split(/[\n|\r]+/)  
      
      var num_atoms = parseInt(lines[2].strip().split(/\s+/)[0])
      
      for(var i = 3; i < num_atoms + 3; i++) {
        var line = lines[i].strip().split(/\s+/)
        var symbol = line[3].toUpperCase()
        
        var style = ATOM_STYLES[symbol]
        if(!style) {
          console.log("Couldn't find atom: "+symbol)
          style = ATOM_STYLES['default']
        }
        
        THIS.atoms.push({
          'symbol': symbol,
          'coordinates': [parseFloat(line[0]), parseFloat(line[1]), parseFloat(line[2])],
          'hidden': false,
          'color': style.color,
          'radius': style.radius
        })
      }
      
    // If it's a PDB file
    } else if(file.substring(file.length-3) == 'END') {
      var lines = file.split(/[\n|\r]+/)  

      for(var i = 0; i < lines.length; i++) {
        var line = lines[i].strip()
        if(line.substring(0, 4) != 'ATOM' && line.substring(0, 6) != 'HETATM') continue

        var symbol = line.substring(66, 9999).strip().toUpperCase()
        if(symbol == '') symbol = line.substring(12, 17).strip().toUpperCase()
        var coordinates = line.substring(32).strip().split(/\s+/)

        var style = ATOM_STYLES[symbol]
        if(!style) {
          console.log("Couldn't find atom: "+symbol)
          style = ATOM_STYLES['default']
        }

        THIS.atoms.push({
          'symbol': symbol,
          'coordinates': [parseFloat(coordinates[0]), parseFloat(coordinates[1]), parseFloat(coordinates[2])],
          'hidden': false,
          'color': style.color,
          'radius': style.radius
        })
      }
    
    // If we can't read the file, get out
    } else {
      return false
    }
    
    return true
  }
  
  
  var update_molecule_canvas = function() {
    var atom, atom_coordinates
    var x, y, z, x2, y2, z2, d_xz, ang_x, ang_y, left, top
    var color
    
    var atoms = THIS.atoms
    var num_atoms = atoms.length
    
    var x2, y2, z2
    
    Spin.set_rotation(ROTATION_VECTOR_INIT, ROTATION_ANGLE_INIT)
    Spin.add_rotation(ROTATION_VECTOR, ROTATION_ANGLE)
    
    var mx = THIS.coordinates[0]
    var my = THIS.coordinates[1] + 100
    var mz = THIS.coordinates[2] / 30
    
    for(var i = num_atoms-1; i >= 0; i--) {
      atom = atoms[i]
      atom_coordinates = Spin.rotate_point(atom.coordinates)
      
      x = atom_coordinates[0]
      x2 = x*x
      y = atom_coordinates[1]
      y2 = y*y
      z = atom_coordinates[2] - mz
      z2 = z*z
      
      // Don't show if it's behind the view
      if(z > 0) {
        atom.hidden = true
        continue
      } else {
        atom.hidden = false
      }
      
      d_xz = Math.sqrt(x2 + z2)
      ang_y = Math.atan(y / d_xz)
      // atom.top = my + HALF_SCREEN_SIZE[1] * ang_y / ANGLE_OF_VIEW[1]
      atom.top = my + 572.48 * ang_y
      
      d_yz = Math.sqrt(y2 + z2)
      ang_x = Math.atan(x / d_yz)
      // atom.left = mx + HALF_SCREEN_SIZE[0] * ang_x / ANGLE_OF_VIEW[0]
      atom.left = mx + 572.48 * ang_x
      
      atom.dist = Math.sqrt(x2 + y2 + z2)
      
      atom.size = 1.5*atom.radius * Math.tan(1/atom.dist)
    }
    
    draw_molecule_canvas()
  }
  
  
  // Setup the molecule
  var setup_molecule = function() {
    
    // If we're using Mobile Webkit,
    // Replace the canvas tag with a div, since we're going to be using CSS animations
    if(MOBILE_WEBKIT) {
      var canvas_id = THIS.canvas[0].id
      var canvas_class = THIS.canvas[0].className

      var new_canvas = $('<div />')
      new_canvas.attr('id', canvas_id)
      new_canvas.attr('class', canvas_class)

      THIS.canvas.replaceWith(new_canvas)
      THIS.canvas = new_canvas

      var atoms = THIS.atoms
      
      // Generate atom images
      // First, find all atoms that need generating...
      var atom_symbols = []
      for(var i = 0; i < atoms.length; i++) {
        if(atom_symbols.indexOf(atoms[i].symbol) == -1) {
          atom_symbols.push(atoms[i].symbol)
        }
      }
      
      // Next, generate the images and save them in ATOM_STYLES
      for(var i = 0; i < atom_symbols.length; i++) {
        var style = ATOM_STYLES[atom_symbols[i]]
        var radius = style.radius / 10
        var atom = {left: radius, top: radius, size: radius, color: style.color}
        style.img = $('<img />').draw(2*radius, 2*radius, function(c) {draw_atom(atom, c)})
      }
      
      
      // Now create each individual atom in the molecule and plunk it on the page
      for(var i = 0; i < atoms.length; i++) {
        var atom = atoms[i]
        var style = ATOM_STYLES[atom.symbol]
        
        var x = Math.round(38*atom.coordinates[0])
        var y = Math.round(38*atom.coordinates[1])
        var z = Math.round(38*atom.coordinates[2])
        
        var atom_container = $('<div></div>').addClass('atom')
        var atom_img = $('<img />').attr('src', style.img.attr('src'))
        
        atom_img.appendTo(atom_container)
        atom_container.appendTo(THIS.canvas)
        
        var atom_width = atom_container.width()
        atom_container.css('webkitTransform', 'translateX('+(x-atom_width/2)+'px) translateY('+(y-atom_width/2)+'px) translateZ('+(z)+'px)')
      }

      ATOMS_ELEMS = THIS.canvas.find('.atom img')
      
      // Move the molecule to the proper position
      $('#molecule').css({'left': THIS.coordinates[0], 'top': THIS.coordinates[1]})
      $('body').css('-webkit-transform-origin-z', THIS.coordinates[2])      
      
    // If we're using Canvas
    } else {
      update_molecule_canvas()
    }
  }
  
  
  var rotate_molecule = function() {
    if(MOBILE_WEBKIT) {
      Spin.set_rotation(ROTATION_VECTOR_INIT, ROTATION_ANGLE_INIT)
      Spin.add_rotation(ROTATION_VECTOR, ROTATION_ANGLE)
      var rotation = Spin.get_rotation()
      
      THIS.canvas.css('webkitTransform', 'rotate3d('+rotation.vector[0]+', '+rotation.vector[1]+', '+rotation.vector[2]+', '+rotation.angle+'rad)')
      ATOMS_ELEMS.css('webkitTransform', 'rotate3d('+rotation.vector[0]+', '+rotation.vector[1]+', '+rotation.vector[2]+', '+(-1*rotation.angle)+'rad)')
      
    } else {
      update_molecule_canvas()
    }
  }
  
  
  var draw_molecule_canvas = function() {
    CONTEXT.clearRect(0, 0, SCREEN_SIZE[0], SCREEN_SIZE[1])
    
    var atom
    var atoms = THIS.atoms
    var num_atoms = atoms.length
    
    atoms.sort(function(a, b){return a.dist - b.dist})
    
    CONTEXT.strokeStyle = 'rgba(0, 0, 0, 0.5)'
    CONTEXT.lineWidth = 3
    
    for(var i = num_atoms-1; i >= 0; i--) {
      atom = atoms[i]
      if(atom.hidden) continue
      draw_atom(atom, CONTEXT)      
    }
  }
  
  
  var draw_atom = function(atom, context) {
    context.save()
    
    // Draw the ball
    context.fillStyle = atom.color
    context.beginPath()
    context.arc(atom.left, atom.top, atom.size, Math.PI * 2, false)
    context.stroke()
    context.fill()
    
    // Set the clipping region for the highlight
    context.beginPath()
    context.arc(atom.left, atom.top, atom.size*0.94, Math.PI * 2, false)
    context.clip()
    
    // Draw the highlight
    context.fillStyle = 'rgba(255, 255, 255, 0.5)'
    context.fillRect(atom.left - atom.size, atom.top - atom.size, 2*atom.size, 2*atom.size)
    
    // Draw the fill color again
    context.fillStyle = atom.color
    context.beginPath()
    context.arc(atom.left - 0.15*atom.size, atom.top + 0.3*atom.size, 1.05*atom.size, Math.PI * 2, false)
    context.fill()
    
    context.restore()
  }
  
  
  var SCALE = 1
  var ZOOM = 0, ZOOM_INIT = 0
  
  THIS.do_scale = function(scale, duration) {
    duration = duration || 0
    SCALE = scale
    ZOOM = ZOOM_INIT + 400 * (SCALE - 1)
    
    THIS.container.css({
      webkitTransitionTimingFunction: 'cubic-bezier(0, 1, 1, 1)',
      webkitTransitionDuration: duration+'ms',
      webkitTransform: 'translateZ('+ZOOM+'px)'
    })
  }
  
  
  // ------------------------ MOUSE / TOUCH EVENTS ------------------------  
  
  var onmousedown = function(e) {
    e = e || window.event
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    START_X = e.clientX
    START_Y = e.clientY
    IS_DRAGGING = true
  }
  
  var onmouseup = function(e) {
    IS_DRAGGING = false
    var rotation = Spin.get_rotation()
    ROTATION_VECTOR_INIT = rotation.vector
    ROTATION_ANGLE_INIT = rotation.angle
  }
  
  var onmousemove = function(e) {
    if(!IS_DRAGGING) return
    e = e || window.event
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    
    var vector = [START_Y - e.clientY, e.clientX - START_X, 0]
    var length = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2])
    
    ROTATION_VECTOR = [vector[0] / length, vector[1] / length, vector[2] / length]
    ROTATION_ANGLE = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2)) / 250   
    
    rotate_molecule()
    return false
  }
  
  
  var initialize = function() {
    SCREEN_SIZE = [$(window).width(), $(window).height()]
    HALF_SCREEN_SIZE = [SCREEN_SIZE[0]/2, SCREEN_SIZE[1]/2]
    
    if(!MOBILE_WEBKIT) {
      HALF_SCREEN_SIZE = [SCREEN_SIZE[0]/2, SCREEN_SIZE[1]/2]
      ANGLE_OF_VIEW = [Math.PI/3, (SCREEN_SIZE[1] / SCREEN_SIZE[0]) * Math.PI/3]
      
      var canvas = THIS.canvas
      canvas.attr("width", SCREEN_SIZE[0])
      canvas.attr("height", SCREEN_SIZE[1])
      canvas.css("width", SCREEN_SIZE[0])
      canvas.css("height", SCREEN_SIZE[1])
      
      CONTEXT = canvas[0].getContext("2d")
      
      ATOM_IMG = $('#atom')[0]
    }
    
    load_atoms(pdb_file)
    setup_molecule()
    
    $(document).bind('mousedown', onmousedown)
    $(document).bind('touchstart', onmousedown)

    $(document).bind('mouseup', onmouseup)
    $(document).bind('touchend', onmouseup)

    $(document).bind('mousemove', onmousemove)
    $(document).bind('touchmove', onmousemove)
    
    THIS.do_scale(SCALE)
  }
  
  
  initialize()
  
  return THIS
  
}