window._area = 'arcade'
window._attraction = 'build_em'

var molecule = null

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var MOLECULES = [
    {
      name: 'water',
      title: 'Water',
      chemical_formula: 'H2O',
      coordinates: [350, 250, 500],
      scale: 2.5,
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Water is the most abundant chemical compound on Earth, covering over 70% of the surface. It is vital to all known forms of life.'
//     },{
//       name: 'carbon_dioxide',
//       title: 'Carbon Dioxide',
//       chemical_formula: 'CO2',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'hydrogen_cyanide',
//       title: 'Hydrogen Cyanide',
//       chemical_formula: 'HCN',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'ammonia',
//       title: 'Ammonia',
//       chemical_formula: 'NH3',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'formaldehyde',
//       title: 'Formaldehyde',
//       chemical_formula: 'H2CO',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'methane',
//       title: 'Methane',
//       chemical_formula: 'CH4',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'nitric_acid',
//       title: 'Nitric Acid',
//       chemical_formula: 'HNO3',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
//     },{
//       name: 'ethane',
//       title: 'Ethane',
//       chemical_formula: 'C2H6',
//       coordinates: [350, 250, 500],
//       scale: 2.5,
//       rotation_angle: 0,
//       rotation_vector: [0, 1, 0],
//       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium ultrices diam, vel iaculis enim consectetur quis. Vivamus vitae dui massa, et sollicitudin diam.'
    },{
      name: 'ethanol',
      title: 'Ethanol',
      chemical_formula: 'C2H6O',
      scale: 2.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Ethanol is pure alcohol. It is the intoxicating ingredient in alcoholic beverages. It is also used as a motor fuel additive.'
    },{
      name: 'propane',
      title: 'Propane',
      chemical_formula: 'C3H8',
      scale: 2.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Propane is a fuel commonly used for barbecues, portable stoves and central heating. It is a by-product of natural gas and petroleum processing.'
    },{
      name: 'butane',
      title: 'Butane',
      chemical_formula: 'C4H10',
      coordinates: [350, 250, 500],
      scale: 2.5,
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Butane is a colorless, highly flammable gas that is easy to liquify.  It is commonly used as fuel for lighters and cooking.'
    },{
      name: 'acetone',
      title: 'Acetone',
      chemical_formula: 'C3H6O',
      scale: 2.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Acetone is a solvent.  It is the active ingredient in paint thinner and nail polish remover.'
    },{
      name: 'benzene',
      title: 'Benzene',
      chemical_formula: 'C6H6',
      scale: 2.4,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Benzene is a highly flammable, colorless liquid. It is common industrial chemical used in the production of plastics and synthetic rubber. It is found in crude oil, gasoline and cigarette smoke and known to cause cancer.'
    },{
      name: 'aspirin',
      title: 'Aspirin',
      chemical_formula: 'C9H8O4',
      scale: 1.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Aspirin is a common anti inflammatory drug used to relieve minor aches and pains. It was first synthesized in 1853.'
    },{
      name: 'ascorbic_acid',
      title: 'Vitimin C',
      chemical_formula: 'C6H8O6',
      scale: 1.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Vitamin C, also know as ascorbic acid, is an essential nutrient for humans. It is an anitoxidant that is found in many citrus fruits and vegetables.'
    },{
      name: 'fructose',
      title: 'Fructose',
      chemical_formula: 'C6H12O6',
      scale: 1.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Fructose is also known as "fruit sugar" is a simple sugar commonly found in fruits, berries and honey.'
    },{
      name: 'caffeine',
      title: 'Caffeine',
      chemical_formula: 'C8H10N4O2',
      scale: 1.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Caffeine is a stimulant that was first isolated in coffee in 1820. It is a common ingredient in coffee, tea, soft drinks and energy drinks.'
    },{
      name: 'nicotine',
      title: 'Nicotine',
      chemical_formula: 'C10H14N2',
      coordinates: [350, 250, 500],
      scale: 1.5,
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Nicotine is a highly addictive drug commonly found in tobacco. It is named after a French man that first imported tobacco plants and seeds from Brazil to Paris in 1560.'
    },{
      name: 'menthol',
      title: 'Menthol',
      chemical_formula: 'C10H20O',
      scale: 1.5,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Menthol is an organic compound commonly found in mints. It is a mild local anesthetic that is widely used to relieve sore throats.'
    },{
      name: 'procaine',
      title: 'Procaine (Novocain)',
      chemical_formula: 'C13H20N2O2',
      scale: 1.25,
      coordinates: [350, 250, 500],
      rotation_angle: 0,
      rotation_vector: [0, 1, 0],
      description: 'Procaine is a local anesthetic drug commonly used by dentists to block pain. Novocain is the common commercial name of this drug.'
    }
  ]
  
  var MORE_INFO_BEFORE_THIS_I = 7
  var MORE_INFO_DISPLAYED = false
  
  var SELECTED_MOLECULE_I = 0
  var SELECTED_MOLECULE = null
  
  var ATOM_TYPES = {}
  
  
  var draw_bins = function() {
    
    var canvas = $('#bins')
    var context = canvas[0].getContext('2d')
    context.clearRect(0, 0, canvas.width(), canvas.height())
    
    context.strokeStyle = '#0E54ED'
    context.fillStyle = '#010D38'
    context.lineWidth = 4
    
    var height = 90
    var height_radius = height / 2
    var top = 5
    var left = 5
    var bin_radius = 33
    var bin_padding = 13
    var atom_size = 0.62 / SELECTED_MOLECULE.scale
    
    // Determine the width of the bin container
    var num_bins = 0
    for(var i in ATOM_TYPES) num_bins++
    var square_width = 2*bin_radius*num_bins + (num_bins+1)*bin_padding - height
    
    // Draw the left circle
    context.beginPath()
    context.arc(height_radius+left, height_radius+top, height_radius, 0, Math.PI * 2, false)
    context.stroke()
    context.fill()
    
    // Draw the right circle
    context.beginPath()
    context.arc(height_radius+left+square_width, height_radius+top, height_radius, 0, Math.PI * 2, false)
    context.stroke()
    context.fill()
    
    // Draw the center area
    context.strokeStyle = '#0E54ED'
    context.fillStyle = '#010D38'
    context.lineWidth = 2
    context.fillRect(height_radius+left, top, square_width, height);
    context.beginPath()
    context.moveTo(height_radius+left, top-1)
    context.lineTo(height_radius+left+square_width, top-1)
    context.stroke()
    context.beginPath()
    context.moveTo(height_radius+left, height+top+1)
    context.lineTo(height_radius+left+square_width, height+top+1)
    context.stroke()
    
    // Draw each bin
    context.strokeStyle = '#0E54ED'
    context.fillStyle = '#000'
    context.lineWidth = 4
    
    var x = left + bin_padding + bin_radius
    var y = top + height/2
    
    var bin_labels = $('#bin_labels').html('')
    
    for(var symbol in ATOM_TYPES) {
      var atom = ATOM_TYPES[symbol]
      var atom_radius = atom_size * atom.radius
      var empty = (atom.count_used >= atom.count)
      atom.bin = {x: x, y: y, radius: bin_radius}
            
      context.beginPath()
      context.arc(x, y, bin_radius, 0, Math.PI * 2, false)
      context.stroke()
      context.fill()
      
      context.save()
      
      if(empty) context.globalAlpha = 0.05
      
      context.translate(x - atom_radius, y - atom_radius)
      molecule.draw_atom({
        left: atom_radius,
        top: atom_radius,
        size: atom_radius,
        color: atom.color
      }, context)
      
      context.restore()
      
      x += bin_padding + 2*bin_radius
      
      $('<span />').html(symbol).appendTo(bin_labels)
    }
  }
  
  
  
  /* -------------------------------------------- */
  
  
  var start_new_molecule = function() {
    $('#next_molecule').fadeOut(250)
    
    Game.stop_sound('background').play_sound('background')
    
    // Should we show the info screen?
    if(!MORE_INFO_DISPLAYED && SELECTED_MOLECULE_I >= MORE_INFO_BEFORE_THIS_I) {
      MORE_INFO_DISPLAYED = true
      $('#more_info').show()
    } else {
      $('#more_info').hide()
    }
    
    var m = MOLECULES[SELECTED_MOLECULE_I]
    SELECTED_MOLECULE = m
    
    if(molecule) molecule.destroy()
    molecule = new Molecule(ML[m.name], {
      scale: m.scale,
      coordinates: m.coordinates,
      rotation_vector: m.rotation_vector,
      rotation_angle: m.rotation_angle,
      canvas: $('#molecule')
    })
    
    // Set molecule info
    $('#info .title').html(m.title)
    $('#info .chemical_formula').html(m.chemical_formula.replace(/(\d+)/g, '<span class="sub">$1</span>'))
    $('#molecule_description .title').html(m.title)
    $('#molecule_description .description').html(m.description)
    $('#molecule_description').show()
    
    // Generate a list of all the different types of atoms in this molecule
    ATOM_TYPES = {}
    var atom
    for(var i = 0, ii = molecule.atoms.length; i < ii; i++) {
      atom = molecule.atoms[i]
      if(ATOM_TYPES[atom.symbol]) {
        ATOM_TYPES[atom.symbol].count += 1
      } else {
        ATOM_TYPES[atom.symbol] = {
          symbol: atom.symbol,
          color: atom.color,
          radius: 0.1*atom.radius,
          count: 1,
          count_used: 0
        }
      }
    }
    
    // Set every atom as unfilled, except the first one
    for(var i = 0, ii = molecule.atoms.length; i < ii; i++) {
      if(i == 0) {
        ATOM_TYPES[molecule.atoms[i].symbol].count_used += 1
      } else {
        molecule.atoms[i].unfilled = true
      }
    }
    
    molecule.draw()
    setTimeout(function(){molecule.draw()}, 500) // FIXME: This is a stupid hack to fix a stupid bug
    
    // Create the chemical formula image
    $('#chemical_diagram').attr('src', 'images/chemical_diagrams/'+m.name+'.png')
    
    // Populate atom selector bins
    draw_bins(ATOM_TYPES)
    
    calculate_percent_complete()
  }
  
  
  var molecule_complete = function() {
    User.set_flag('build_em_max_level', SELECTED_MOLECULE_I)
    
    // Check for achievement
    var name = MOLECULES[SELECTED_MOLECULE_I].name
    if(name == 'butane') {
      Game.unlock_achievement('buildem_molecule_builder', 'Molecule Builder!')
    } else if(name == 'aspirin') {
      Game.unlock_achievement('buildem_pro_molecule_builder', 'Pro Molecule Builder!')
    } else if(name == 'caffeine') {
      Game.unlock_achievement('buildem_expert_molecule_builder', 'Expert Molecule Builder!')
    } else if(name == 'procaine') {
      Game.unlock_achievement('buildem_master_molecule_builder', 'Master Molecule Builder!')
    }
    
    SELECTED_MOLECULE_I++
    
    if(MOLECULES[SELECTED_MOLECULE_I]) {
      Game.play_sound('complete_molecule')
      
      molecule.spin(.0015, true)
      Message.display('Good Job!', 1000, '92px')
      
      $('#next_molecule .title').html(MOLECULES[SELECTED_MOLECULE_I].title)
      $('#next_molecule').fadeIn(250)
    } else {
      game_over()
    }
  }
  
  
  var game_over = function() {
    Game.play_sound('game_over')
    Message.display("Good Job!<br/>You've completed all the molecules!", 3000, '92px')
  }
    
  
  var calculate_percent_complete = function() {
    var percent_complete = 0
    for(var i = 0, ii = molecule.atoms.length; i < ii; i++) {
      if(!molecule.atoms[i].unfilled) percent_complete++
    }
    percent_complete = 100 * percent_complete / molecule.atoms.length
    $('#info .percent_complete').html(Math.round(percent_complete)+'%')
    
    if(percent_complete < 1) {
      $('#progress_bar span').css('height', 0).hide()
    } else {
      $('#progress_bar span').show().animate({height: Math.min(99, percent_complete)+'%'}, 1000, function() {
        // Are we done?
        if(percent_complete >= 100) molecule_complete()
      })
    }
  }
  
  
  var bondable_atom = function(source_atom, target_atom) {
    var atom
    for(var i = 0; i < target_atom.bonds.length; i++) {
      atom = molecule.atoms[target_atom.bonds[i]]
      if(source_atom.symbol == atom.symbol && atom.unfilled)
        return atom
    }
    return null
  }
  
  
  var HIGHLIGHTED_ATOM = null
  var DRAGGING_SELECTOR = null
  
  var selector_mousedown = function(e) {
    e.preventDefault()
    e.stopPropagation()
    
    var bin_position = $('#bins').position()
    var x = e.layerX - bin_position.left
    var y = e.layerY - bin_position.top
    
    DRAGGING_SELECTOR = null
    
    // Have they clicked on an atom bin?
    for(var symbol in ATOM_TYPES) {
      var atom = ATOM_TYPES[symbol]      
      var distance = Math.sqrt(Math.pow(atom.bin.x - x, 2) + Math.pow(atom.bin.y - y, 2))
      if(distance <= atom.bin.radius) {
        DRAGGING_SELECTOR = atom
        break
      }
    }
  
    if(DRAGGING_SELECTOR) $('#molecule').bind('mousemove', selector_mousemove)
  }
  
  
  var selector_mouseup = function(e) {
    $('#molecule').unbind('mousemove', selector_mousemove)
    
    if(HIGHLIGHTED_ATOM) {
      
      // Check to see if the atom is valid and add it to the molecule
      var atom = bondable_atom(DRAGGING_SELECTOR, HIGHLIGHTED_ATOM)
      
      if(atom) {
        Game.play_sound('bond')
        atom.unfilled = false
        ATOM_TYPES[atom.symbol].count_used += 1
        
        // Have we used up all the atoms of that element?
        if(ATOM_TYPES[atom.symbol].count_used >= ATOM_TYPES[atom.symbol].count) {
          draw_bins(ATOM_TYPES)
        }
      
      } else {
        Game.play_sound('wrong_bond')
      }
            
      // What percentage of the molecule is complete?
      calculate_percent_complete()
      
      // Unset the highlight
      HIGHLIGHTED_ATOM = null
      
      for(var i = 0, ii = molecule.atoms.length; i < ii; i++)
        molecule.atoms[i].highlighted = false
    }
    
    if(molecule) molecule.draw()
    
    DRAGGING_SELECTOR = null
  }  
  
    
  var selector_mousemove = function(e) {
    e.preventDefault()
    e.stopPropagation()
    
    var x = e.layerX
    var y = e.layerY
    
    // Find the highlighted atom, if any
    HIGHLIGHTED_ATOM = null
        
    var atoms = molecule.atoms.slice(0)
    var num_atoms = atoms.length
    
    atoms.sort(function(a, b){return a.dist - b.dist})
    
    var atom = null
    var dist_squared
    var found_highlighted = false
    
    // Look for an atom that we're hoving over (so we can highlight it)
    for(var i = 0, ii = atoms.length; i < ii; i++) {
      a = atoms[i]
      a.highlighted = false
      if(found_highlighted || a.hidden || a.unfilled) continue
      
      dist_squared = Math.pow(a.left - x, 2) + Math.pow(a.top - y, 2)
      if(dist_squared <= Math.pow(molecule.scale*a.size, 2)) {
        a.highlighted = true
        if(bondable_atom(DRAGGING_SELECTOR, a)) {
          a.highlighted_color_fill = 'rgba(100, 200, 255, 0.25)'
          a.highlighted_color_stroke = 'rgba(100, 200, 255, 0.75)'
        } else {
          a.highlighted_color_fill = 'rgba(255, 100, 100, 0.25)'
          a.highlighted_color_stroke = 'rgba(255, 20, 0, 0.75)'
        }
        
        HIGHLIGHTED_ATOM = a
        found_highlighted = true
      }

    }
    
    // If we aren't directly hovering over an atom, look for overlap
    if(!found_highlighted) {
      for(var i = 0, ii = atoms.length; i < ii; i++) {
        a = atoms[i]
        if(a.hidden || a.unfilled) continue
        
        dist_squared = Math.pow(a.left - x, 2) + Math.pow(a.top - y, 2)
        if(dist_squared <= Math.pow(molecule.scale*(a.size + DRAGGING_SELECTOR.radius), 2)) {
          a.highlighted = true
          if(bondable_atom(DRAGGING_SELECTOR, a)) {
            a.highlighted_color_fill = 'rgba(100, 200, 255, 0.25)'
            a.highlighted_color_stroke = 'rgba(100, 200, 255, 0.75)'
          } else {
            a.highlighted_color_fill = 'rgba(255, 100, 100, 0.25)'
            a.highlighted_color_stroke = 'rgba(255, 20, 0, 0.75)'
          }
          
          HIGHLIGHTED_ATOM = a
          found_highlighted = true
          break
        }
      }
    }
    
    // Redraw the molecule
    molecule.draw()
    
    // Now draw the selector
    molecule.draw_atom({
      left: x,
      top: y,
      size: DRAGGING_SELECTOR.radius,
      color: DRAGGING_SELECTOR.color,
      opacity: 0.35
    })
  }
  
  
  var show_level_selector = function() {
    Game.stop_sound('background')
    
    // Lock levels based on how far the user has gotten
    var max_level = User.get_flag('build_em_max_level')
    if(!max_level && max_level !== 0) max_level = -1
    
    $('#level_selector .level').each(function(level_i, elem) {
      if(level_i > max_level + 1) {
        $(elem).addClass('locked')
      } else {
        $(elem).removeClass('locked')
      }
    })
    
    $('#level_selector').show()
    $('#change_molecule').fadeOut(250)
  }
  
  var hide_level_selector = function() {
    Game.stop_sound('background').play_sound('background')
    $('#level_selector').fadeOut(250)
    $('#change_molecule').fadeIn(250)
  }
  
  var choose_level = function(e) {
    var elem = $(e.currentTarget)
    if(elem.is('.locked')) return
    SELECTED_MOLECULE_I = parseInt(elem.data('molecule_index'))
    start_new_molecule()
    hide_level_selector()
  }
  
  
  $('#more_info').click(function() {$('#more_info').hide()})
  
  
  
  // ------------------ GAME SETUP ----------------------
    
  Game.load_sounds([
    {
      id: 'bond',
      url: 'sounds/bond.mp3',
      volume: 50
    }, {
      id: 'wrong_bond',
      url: 'sounds/wrong_bond.mp3',
      volume: 25
    }, {
      id: 'complete_molecule',
      url: 'sounds/complete_molecule.mp3',
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      music_muteable: true,
      volume: 30
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
      volume: 25
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 35
    }
  ])
  
  images_to_preload = [
    'images/arrow.png',
    'images/more_info.png',
    'images/splash.png'
  ]
  
  for(var i = 0; i < MOLECULES.length; i++) {
    images_to_preload.push('images/chemical_diagrams/'+MOLECULES[i].name+'.png')
  }
  
  Game.load_images(images_to_preload)
  
  Game.start_gameplay = function() {
    $(document).bind('mousedown', selector_mousedown)
    $(document).bind('mouseup', selector_mouseup)
    
    // Set up level selector
    var levels = $('#level_selector .levels')
    levels.html('')
    for(var i = 0; i < MOLECULES.length; i++) {
      var m = MOLECULES[i]
      var level = $('<div />').addClass('level').data('molecule_index', i).click(choose_level)
      $('<img />').attr('src', 'images/chemical_diagrams/'+m.name+'.png').appendTo(level)
      $('<span />').html(m.title).appendTo(level)
      level.appendTo(levels)
    }
    
    Game.stop_sound('theme')
    show_level_selector()
    
    
    SELECTED_MOLECULE_I = 0
    $('#next_molecule').click(function() {
      hide_level_selector()
      start_new_molecule()
    })
    $('#level_selector .close').click(hide_level_selector)
    $('#change_molecule').click(show_level_selector)
    
    start_new_molecule()
  }
  
  
  // Override open_instructions button to show the more_info screen
  Game.should_open_instructions = function() {
    if($('#more_info').is(':visible')) {
      $('#more_info').hide()
      return false
    }
    
    if(SELECTED_MOLECULE_I >= MORE_INFO_BEFORE_THIS_I) {
      $('#more_info').show()
      return false
      
    } else {
      return true
    }
  }
  
  
  Game.initialize()
  
})
