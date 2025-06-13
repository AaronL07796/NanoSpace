/*
Hey yall,

This code has been ripped out of a larger project (that uses canvas to render the 3D molecules
when 3D CSS transforms are unavailable), so it's kind of a mess. Forgive me!

-Adam (adam@jackadam.net)
*/


var Molecule = function(pdb_file) {  
  
  var ROTATION_VECTOR_INIT = [0, 0, 0]
  var ROTATION_ANGLE_INIT = 0
  var ROTATION_VECTOR = [0, 0, 0]
  var ROTATION_ANGLE = 0
    
  var ATOMS = []
  var ATOM_ELEMS
  var ATOM_IMG
  
  var IS_DRAGGING = false
  var START_X = 0
  var START_Y = 0
  
  
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
  
  
  var MOLECULE_ELEM = $('#molecule')
  var MOLECULE_CONTAINER_ELEM = $('#molecule_container')
  
  
  // Parse an SDF or PDB data file and load the atoms
  var load_atoms = function(file) {
    ATOMS = []
    
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
        
        ATOMS.push({
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
        symbol = symbol.replace(/\d/g, '')
        var coordinates = line.substring(32).strip().split(/\s+/)
        
        var style = ATOM_STYLES[symbol]
        if(!style) {
          console.log("Couldn't find atom: "+symbol)
          style = ATOM_STYLES['default']
        }

        ATOMS.push({
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
  
  
  var move_canvas = function() {
    MOLECULE_ELEM.css({'left': $(window).width()/2, 'top': $(window).height()/2})
  }
  $(window).bind('orientationchange', move_canvas)
  
  
  // Create the DOM elements for each atom
  var setup_molecule = function() {
        
    // Generate atom images
    // First, find all atoms that need generating...
    var atom_symbols = []
    for(var i = 0; i < ATOMS.length; i++) {
      if(atom_symbols.indexOf(ATOMS[i].symbol) == -1) {
        atom_symbols.push(ATOMS[i].symbol)
      }
    }
    
    // Next, generate the images using a canvas element and save them in ATOM_STYLES
    for(var i = 0; i < atom_symbols.length; i++) {
      var style = ATOM_STYLES[atom_symbols[i]]
      var radius = style.radius / 10
      var atom = {left: radius, top: radius, size: radius, color: style.color}
      style.img = $('<img />').attr({width: 2*radius, height: 2*radius}).draw(2*radius, 2*radius, function(c) {draw_atom(atom, c)})
    }
    
    // Now create each individual atom in the molecule and plunk it on the page
    for(var i = 0; i < ATOMS.length; i++) {
      var atom = ATOMS[i]
      var style = ATOM_STYLES[atom.symbol]
      
      var x = Math.round(38*atom.coordinates[0])
      var y = Math.round(38*atom.coordinates[1])
      var z = Math.round(38*atom.coordinates[2])
      
      var atom_container = $('<div></div>').addClass('atom')
      var atom_img = $('<img />').attr('src', style.img.attr('src'))
      
      atom_img.appendTo(atom_container)
      atom_container.appendTo(MOLECULE_ELEM)
      
      var atom_width = style.img[0].width
      atom_container.css('webkitTransform', 'translateX('+(x-atom_width/2)+'px) translateY('+(y-atom_width/2)+'px) translateZ('+(z)+'px)')
    }

    ATOM_ELEMS = MOLECULE_ELEM.find('.atom img')
    
    // Move the molecule to its proper position
    move_canvas()
  }
  
  
  // Rotate the molecule based on mouse movements
  var rotate_molecule = function() {
    Spin.set_rotation(ROTATION_VECTOR_INIT, ROTATION_ANGLE_INIT)
    Spin.add_rotation(ROTATION_VECTOR, ROTATION_ANGLE)
    var rotation = Spin.get_rotation()
    
    MOLECULE_ELEM.css('webkitTransform', 'rotate3d('+rotation.vector[0]+', '+rotation.vector[1]+', '+rotation.vector[2]+', '+rotation.angle+'rad)')
    ATOM_ELEMS.css('webkitTransform', 'rotate3d('+rotation.vector[0]+', '+rotation.vector[1]+', '+rotation.vector[2]+', '+(-1*rotation.angle)+'rad)')
  }
  
  
  // Draw a single atom using canvas
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
    context.fillStyle = 'rgba(255, 255, 255, 0.65)'
    context.fillRect(atom.left - atom.size, atom.top - atom.size, 2*atom.size, 2*atom.size)
    
    // Draw the fill color again
    context.fillStyle = atom.color
    context.beginPath()
    context.arc(atom.left - 0.15*atom.size, atom.top + 0.3*atom.size, 1.05*atom.size, Math.PI * 2, false)
    context.fill()
    
    context.restore()
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
    if(!IS_DRAGGING || ZOOMING) return
    
    e = e || window.event
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    
    var vector = [START_Y - e.clientY, e.clientX - START_X, 0]
    var length = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2])
    
    ROTATION_VECTOR = [vector[0] / length, vector[1] / length, vector[2] / length]
    ROTATION_ANGLE = length / 250
        
    rotate_molecule()
    return false
  }
  
  
  $(document).bind('mousedown', onmousedown)
  $(document).bind('touchstart', onmousedown)
  $(document).bind('mouseup', onmouseup)
  $(document).bind('touchend', onmouseup)
  $(document).bind('mousemove', onmousemove)
  $(document).bind('touchmove', onmousemove)
  
  var ZOOMING = false
  var ZOOM = 0
  var ZOOM_INIT = 0
  
  $(document).bind('gesturestart', function(e) {
    ZOOMING = true
  })
  
  $(document).bind('gesturechange', function(e) {
    var scale = e.originalEvent.scale
    var rotation = e.originalEvent.rotation
    ZOOM = ZOOM_INIT + 400 * (scale - 1)
    MOLECULE_CONTAINER_ELEM.css('webkitTransform', 'translateZ('+ZOOM+'px)')
    e.preventDefault()
  })
  
  $(document).bind('gestureend', function(e) {
    ZOOM_INIT = ZOOM
    ZOOMING = false
  })
  
  
  var destroy = function() {
    ROTATION_VECTOR_INIT = [0, 0, 0]
    ROTATION_ANGLE_INIT = 0
    ROTATION_VECTOR = [0, 0, 0]
    ROTATION_ANGLE = 0
    rotate_molecule()
    
    MOLECULE_ELEM.html('')
    $(document).unbind('mousedown', onmousedown)
    $(document).unbind('touchstart', onmousedown)
    $(document).unbind('mouseup', onmouseup)
    $(document).unbind('touchend', onmouseup)
    $(document).unbind('mousemove', onmousemove)
    $(document).unbind('touchmove', onmousemove)
  }
  
  MOLECULE_CONTAINER_ELEM.css('webkitTransform', 'translateZ(0px)')
  
  // Lets do it!
  load_atoms(pdb_file)
  setTimeout(setup_molecule, 0)
  
  
  return {destroy: destroy}
}


String.prototype.strip = function() {
  return this.replace(/^\s+|\s+$/g, '')
}