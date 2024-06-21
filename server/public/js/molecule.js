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


var Molecule = function(pdb_file, params) {  
  var THIS = {}
  
  var SCREEN = params.container || params.canvas.parent()
  
  var ROTATION_VECTOR_INIT = [0, 0, 0]
  var ROTATION_ANGLE_INIT = 0
  var ROTATION_VECTOR = params.rotation_vector || [0, 0, 0]
  var ROTATION_ANGLE = params.rotation_angle || 0
  var ANGULAR_VELOCITY = 0
  var TARGET_ANGULAR_VELOCITY = 0
  
  THIS.coordinates = params.coordinates || [0, 0, 0]
  THIS.original_coordinates = THIS.coordinates.slice(0)
  THIS.canvas = params.canvas
  THIS.canvas_elem = params.canvas[0]
  THIS.container = THIS.canvas.parent()
  
  var ATOMS_ELEMS
  var ATOM_IMG
  
  THIS.scale = params.scale || 1
  var OFFSET_X = 0
  var OFFSET_Y = 0
  
  var IS_DRAGGING = false
  var START_X = 0
  var START_Y = 0
  
  var SCREEN_SIZE, HALF_SCREEN_SIZE, ANGLE_OF_VIEW
  var CONTEXT
    
  var ATOM_STYLES = {
    'C':  {color: '#374451', radius: 280},
    'H':  {color: '#E0CFEA', radius: 160},
    'O':  {color: '#FF3E3B', radius: 280},
    'PB': {color: '#FF00FF', radius: 660},
    'TI': {color: '#021FCF', radius: 560},
    'N': {color: '#00A6DA', radius: 280},
    'S': {color: '#FFB541', radius: 300},
    'P': {color: '#912B88', radius: 460},
    'default': {color: '#FFFF00', radius: 380}
  }
  
  
  // Check for Mobile Safari
  var MOBILE_WEBKIT = (navigator && navigator.userAgent && navigator.userAgent.match(/WebKit/))
  MOBILE_WEBKIT = false
  
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
      
      // Load atoms
      for(var i = 3; i < num_atoms + 3; i++) {
        var line = lines[i].strip().split(/\s+/)
        var symbol = line[3].toUpperCase()
        
        var style = ATOM_STYLES[symbol]
        if(!style) {
          style = ATOM_STYLES['default']
        }
        
        THIS.atoms.push({
          'symbol': symbol,
          'coordinates': [parseFloat(line[0]), parseFloat(line[1]), parseFloat(line[2])],
          'hidden': false,
          'unfilled': false,
          'color': style.color,
          'radius': style.radius,
          'bonds': []
        })
      }
      
      // Load atom bond data
      var bond_lines = lines.slice(num_atoms+3, -2)
      for(var i = 0, ii = bond_lines.length; i < ii; i++) {
        var line = bond_lines[i].strip().split(/\s+/)
        var atom1_i = parseInt(line[0]) - 1
        var atom2_i = parseInt(line[1]) - 1
        THIS.atoms[atom1_i].bonds.push(atom2_i)
        THIS.atoms[atom2_i].bonds.push(atom1_i)
      }
    
    
    // If it's a PDB file
    } else if(file.substring(file.length-3) == 'END') {
      var lines = file.split(/[\n|\r]+/)  
      
      var bond_lines = []
      
      for(var i = 0; i < lines.length; i++) {
        var line = lines[i].strip()
        
        if(line.substring(0, 6) == 'CONECT') {
          bond_lines.push(line)
          continue
        }
        
        if(line.substring(0, 4) != 'ATOM' && line.substring(0, 6) != 'HETATM') continue

        var symbol = line.substring(66, 9999).strip().toUpperCase()
        if(symbol == '') symbol = line.substring(12, 17).strip().toUpperCase()
        var coordinates = line.substring(32).strip().split(/\s+/)

        var style = ATOM_STYLES[symbol]
        if(!style) {
          style = ATOM_STYLES['default']
        }

        THIS.atoms.push({
          'symbol': symbol,
          'coordinates': [parseFloat(coordinates[0]), parseFloat(coordinates[1]), parseFloat(coordinates[2])],
          'hidden': false,
          'unfilled': false,
          'color': style.color,
          'radius': style.radius,
          'bonds': []
        })
      }
      
      // Load atom bond data
      var atom2_i
      for(var i = 0, ii = bond_lines.length; i < ii; i++) {
        var line = bond_lines[i].split(/\s+/)
        var atom1_i = parseInt(line[1]) - 1
        
        for(var b = 2; b < line.length; b++) {
          atom2_i = parseInt(line[b]) - 1
          if(atom2_i < 0) continue
          THIS.atoms[atom1_i].bonds.push(atom2_i)
          THIS.atoms[atom2_i].bonds.push(atom1_i)
        }
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
    var my = THIS.coordinates[1]
    var mz = THIS.coordinates[2] / 30
    
    for(var i = num_atoms-1; i >= 0; i--) {
      atom = atoms[i]
      atom_coordinates = Spin.rotate_point(atom.coordinates)
      
      x = THIS.scale * atom_coordinates[0] + OFFSET_X
      x2 = x*x
      y = THIS.scale * atom_coordinates[1] + OFFSET_Y
      y2 = y*y
      z = THIS.scale * atom_coordinates[2] - mz
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
      atom.top = my + 572.48 * ang_y
      
      d_yz = Math.sqrt(y2 + z2)
      ang_x = Math.atan(x / d_yz)
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
      
      THIS.canvas.css({
        '-webkit-transform-style':  'preserve-3d',
        'position': 'absolute',
        'width': 1,
        'height': 1,
        'left': THIS.coordinates[0],
        'top': THIS.coordinates[1]
      })
      
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
        var radius = style.radius / 11
        var atom = {left: radius, top: radius, size: radius, color: style.color}
        style.img = $('<img />').draw(2*radius, 2*radius, function(c) {draw_atom(atom, c)})
      }
      
      
      // Now create each individual atom in the molecule and plunk it on the page
      for(var i = 0; i < atoms.length; i++) {
        var atom = atoms[i]
        var style = ATOM_STYLES[atom.symbol]
        
        var x = Math.round(32*atom.coordinates[0])
        var y = Math.round(32*atom.coordinates[1])
        var z = Math.round(32*atom.coordinates[2])
        
        var atom_container = $('<div></div>').addClass('atom')
        var atom_img = $('<img />').attr('src', style.img.attr('src'))
        
        atom_img.appendTo(atom_container)
        atom_container.appendTo(THIS.canvas)
        
        var atom_width = atom_container.width()
        atom_container.css('webkitTransform', 'translateX('+(x-atom_width/2)+'px) translateY('+(y-atom_width/2)+'px) translateZ('+(z)+'px)')
      }

      ATOMS_ELEMS = THIS.canvas.find('.atom img')
      
      $('body').css('-webkit-transform-origin-z', THIS.coordinates[2])      
      
    // If we're using Canvas
    } else {
      THIS.canvas.css({position: 'absolute'})
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
  
  
  THIS.get_rotation = function() {
    var rotation = Spin.get_rotation()
    return {vector: rotation.vector, angle: rotation.angle}
  }
  
  
  var draw_molecule_canvas = function() {
    CONTEXT.clearRect(0, 0, SCREEN_SIZE[0], SCREEN_SIZE[1])
    
    var atom
    var atoms = THIS.atoms.slice(0)
    var num_atoms = atoms.length
    
    atoms.sort(function(a, b){return a.dist - b.dist})
    
    CONTEXT.strokeStyle = 'rgba(0, 0, 0, 0.5)'
    CONTEXT.lineWidth = 3
    
    for(var i = num_atoms-1; i >= 0; i--) {
      atom = atoms[i]
      if(atom.hidden || atom.unfilled) continue
      draw_atom(atom, CONTEXT)      
    }
  }
  THIS.draw = draw_molecule_canvas
  
    
  var draw_atom = function(atom, context) {
    context = context || CONTEXT
    context.save()
    var size = THIS.scale * atom.size
    
    if(atom.opacity && atom.opacity < 1) {
      CONTEXT.globalAlpha = atom.opacity
    }
    
    // Draw the ball
    context.fillStyle = atom.color
    context.beginPath()
    context.arc(atom.left, atom.top, size, 0, Math.PI * 2, false)
    context.fill()
    
    // Set the clipping region for the highlight
    context.beginPath()
    context.arc(atom.left, atom.top, size*0.94, 0, Math.PI * 2, false)
    context.clip()
    
    // Draw the highlight
    context.fillStyle = 'rgba(255, 255, 255, 0.5)'
    context.fillRect(atom.left - size, atom.top - size, 2*size, 2*size)
    
    // Draw the fill color again
    context.fillStyle = atom.color
    context.beginPath()
    context.arc(atom.left - 0.15*size, atom.top + 0.3*size, 1.05*size, 0, Math.PI * 2, false)
    context.fill()
    
    context.restore()
    
    // If the atom is highlighted, draw a box around it
    if(atom.highlighted) {
      context.fillStyle = atom.highlighted_color_fill || 'rgba(255, 255, 255, 0.25)'
      context.strokeStyle = atom.highlighted_color_stroke || 'rgba(255, 255, 255, 0.75)'
      CONTEXT.lineWidth = 2
      context.beginPath()
      context.arc(atom.left, atom.top, 1.2*size, 0, Math.PI * 2, false)
      context.fill()
      
      // restore old stroke style
      CONTEXT.strokeStyle = 'rgba(0, 0, 0, 0.5)'
      CONTEXT.lineWidth = 3
    }
  }
  THIS.draw_atom = draw_atom
  
  
  var update_rotation_init = function() {
    var rotation = Spin.get_rotation()
    ROTATION_VECTOR_INIT = rotation.vector
    ROTATION_ANGLE_INIT = rotation.angle
    ROTATION_ANGLE = 0
  }
  
  
  var scale_duration = null
  var start_scale_time = null
  var start_scale = null
  var end_scale = null
  var start_y = null
  var end_y = null
  
  var animate_scale = function() {
    var time = new Date().getTime()
    var percent_complete = 1 - Math.max(0, scale_duration - (time - start_scale_time)) / scale_duration
    THIS.scale = start_scale + percent_complete * (end_scale - start_scale)
    OFFSET_Y = start_y + percent_complete * (end_y - start_y)
    update_molecule_canvas()
    if(percent_complete < 1) requestAnimFrame(animate_scale, THIS.canvas_elem)
  }
  
  THIS.do_scale = function(scale, duration, offset_y) {
    duration = duration || 0
    offset_y = offset_y || 0
    update_rotation_init()
    
    if(MOBILE_WEBKIT) {
      THIS.scale = scale
      var top = THIS.container.offset().top / (2 * scale)
      THIS.container.css({
        webkitTransitionDuration: duration+'ms',
        webkitTransform: 'translateY('+top+'px) scale('+scale+')'
      })
      
    } else {      
      if(duration == 0) {
        THIS.scale = scale
        OFFSET_Y = offset_y
        update_molecule_canvas()
      } else {
        start_scale = THIS.scale
        end_scale = scale
        start_y = OFFSET_Y
        end_y = offset_y
        
        scale_duration = duration
        start_scale_time = new Date().getTime()
        animate_scale()
      }
    }
  }
  
  
  // Give the molecule some angular velocity
  var spin_time = null
  var is_spin_loop = false
  
  var spin_loop = function() {
    var time = $.now()
    
    if(IS_DRAGGING) {
      is_spin_loop = false
      return
    }
    
    // Adjust angular velocity, if necessary
    if(ANGULAR_VELOCITY != TARGET_ANGULAR_VELOCITY) {
      ANGULAR_VELOCITY -= (ANGULAR_VELOCITY - TARGET_ANGULAR_VELOCITY) / 10.0
      if(Math.abs((ANGULAR_VELOCITY - TARGET_ANGULAR_VELOCITY) / ANGULAR_VELOCITY) < 0.05) {
        ANGULAR_VELOCITY = TARGET_ANGULAR_VELOCITY
      }
    }
    
    // Rotate the molecule
    var interval = time - spin_time
    ROTATION_ANGLE += ANGULAR_VELOCITY * interval
    rotate_molecule()
    
    spin_time = time
    
    if(TARGET_ANGULAR_VELOCITY != 0 || ANGULAR_VELOCITY != 0)
      requestAnimFrame(spin_loop, THIS.canvas_elem)
  }
  
  THIS.spin = function(v, accel) {
    
    // Just stop the molecule?
    if(!v && !accel) {
      TARGET_ANGULAR_VELOCITY = 0
      ANGULAR_VELOCITY = 0
      is_spin_loop = false
      return
    }
    
    if(!accel) ANGULAR_VELOCITY = v
    TARGET_ANGULAR_VELOCITY = v
    
    spin_time = $.now()
    
    if(!is_spin_loop) {
      is_spin_loop = true
      spin_loop()
    }
  }
  
  
  // ------------------------ MOUSE / TOUCH EVENTS ------------------------  
  
  var angular_velocity_history = []
  var last_move_time = null
  var last_angle = 0
  
  var onmousedown = function(e) {
    e = e || window.event
    e.preventDefault()
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    START_X = e.clientX
    START_Y = e.clientY
    IS_DRAGGING = true
    update_rotation_init()
  }
  
  var onmouseup = function(e) {
    IS_DRAGGING = false
    last_move_time = null
    
    if(angular_velocity_history.length > 0) {
      var avg_velocity = 0
      for(var i = 0; i < angular_velocity_history.length; i++) {
        avg_velocity += angular_velocity_history[i]
      }
      avg_velocity /= angular_velocity_history.length
      
      ANGULAR_VELOCITY = avg_velocity
      angular_velocity_history = []
      
      THIS.spin(TARGET_ANGULAR_VELOCITY, true)
    
    } else {
      THIS.spin(TARGET_ANGULAR_VELOCITY, false)
    }
    
    update_rotation_init()
  }
    
  var onmousemove = function(e) {
    if(!IS_DRAGGING) return
    e = e || window.event
    e.preventDefault()
    if(e.originalEvent && e.originalEvent.touches) e = e.originalEvent.touches[0]
    
    var vector = [START_Y - e.clientY, e.clientX - START_X, 0]
    var length = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2])
    
    ROTATION_VECTOR = [vector[0] / length, vector[1] / length, vector[2] / length]
    ROTATION_ANGLE = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2)) / 250   
    
    var time = $.now()
    if(last_move_time && last_move_time != time) {
      angular_velocity_history.push((ROTATION_ANGLE - last_angle) / (time - last_move_time))
      if(angular_velocity_history.length > 4) angular_velocity_history.shift()
    }
    last_move_time = time
    last_angle = ROTATION_ANGLE
    
    
    rotate_molecule()
    return false
  }
  
  
  var initialize = function() {
    SCREEN_SIZE = [SCREEN.width(), SCREEN.height()]
    HALF_SCREEN_SIZE = [SCREEN_SIZE[0]/2, SCREEN_SIZE[1]/2]
    
    if(!MOBILE_WEBKIT) {
      HALF_SCREEN_SIZE = [SCREEN_SIZE[0]/2, SCREEN_SIZE[1]/2]
      ANGLE_OF_VIEW = [Math.PI/3, (SCREEN_SIZE[1] / SCREEN_SIZE[0]) * Math.PI/3]
      
      var canvas = THIS.canvas
      canvas.attr("width", SCREEN_SIZE[0])
      canvas.attr("height", SCREEN_SIZE[1])
      canvas.css("width", SCREEN_SIZE[0])
      canvas.css("height", SCREEN_SIZE[1])
      
      canvas = canvas[0]
      
      if(typeof FlashCanvas != 'undefined') FlashCanvas.initElement(canvas)
      
      CONTEXT = canvas.getContext("2d")
      
      ATOM_IMG = $('#atom')[0]
    }
    
    load_atoms(pdb_file)
    setup_molecule()
    
    update_rotation_init()
    
    $(document).bind('mousedown', onmousedown)
    $('#motm').bind('touchstart', onmousedown)
    $(document).bind('mouseup', onmouseup)
    $('#motm').bind('touchend', onmouseup)
    $(document).bind('mousemove', onmousemove)
    $('#motm').bind('touchmove', onmousemove)
  }
  
  
  THIS.destroy = function() {
    THIS.spin(false)
    $(document).unbind('mousedown', onmousedown)
    $('#motm').unbind('touchstart', onmousedown)
    $(document).unbind('mouseup', onmouseup)
    $('#motm').unbind('touchend', onmouseup)
    $(document).unbind('mousemove', onmousemove)
    $('#motm').unbind('touchmove', onmousemove)
    THIS.atoms = []
    THIS.destroyed = true
  }
  
  
  initialize()
  
  return THIS
  
}
