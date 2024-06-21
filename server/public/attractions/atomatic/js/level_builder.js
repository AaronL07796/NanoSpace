Levels = [
  {ammo: ['H','H','O','O','N','N','C','C'], points: 200, initial_molecules: []}
]
var SAVED_LEVEL = $.extend({}, Levels[0])


Game.start_gameplay = function(){}

$(Game).bind('start_gameplay', function() {
  
  var CANVAS_TOP = Stage.canvas.offset().top
  var CANVAS_LEFT = Stage.canvas.offset().left
  
  var MOUSE_X = null
  var MOUSE_Y = null
  
  var SELECTED_MOLECULE = null
  var MOUSE_DOWN = false
  
  
  // Save molecules on the stage to the initial_molecules array
  var save_initial_molecules = function() {
    Levels[0].initial_molecules = []
    var molecules = Stage.molecules()
        
    for(var i = 0; i < molecules.length; i++) {
      Levels[0].initial_molecules.push([
        molecules[i].symbol,
        Math.round(molecules[i].x),
        Math.round(molecules[i].y),
        Math.round(1000*molecules[i].angle) / 1000
      ])
    }
  }
  
  
  // "Add Molecule" menu
  for(var symbol in AtomDefinitions) {
    $('<option />').val(symbol).html(symbol).appendTo($('#add_molecule select'))
  }
  
  var MoleculeMenu = [
		{symbol: 'H', value: 'H'},
		{symbol: 'H2', value: 'HH'},
		{symbol: 'C', value: 'C'},
		{symbol: 'N', value: 'N'},
		{symbol: 'N2', value: 'NN'},
		{symbol: 'O', value: 'O'},
		{symbol: 'O2', value: 'OO'},
		{symbol: 'OH', value: 'OH'},
		{symbol: 'H2O', value: 'OHH'},
		{symbol: 'NO', value: 'ON'},
		{symbol: 'NO2', value: 'OON'},
		{symbol: 'CO', value: 'OC'},
		{symbol: 'CO2', value: 'OOC'},
		{symbol: 'CH', value: 'CH'},
		{symbol: 'CH2', value: 'CHH'},
		{symbol: 'CH3', value: 'CHHH'},
		{symbol: 'CH4', value: 'CHHHH'},
		{symbol: 'NH', value: 'NH'},
		{symbol: 'NH2', value: 'NHH'},
		{symbol: 'NH3', value: 'NHHH'},
		{symbol: 'HCN', value: 'NCH'}
	]
  for(var i = 0; i < MoleculeMenu.length; i++) {
    $('<option />').val(MoleculeMenu[i].value).html(MoleculeMenu[i].symbol).appendTo($('#add_molecule select'))
  }
  
  $('#add_molecule select').change(function(e) {
    var symbol = e.currentTarget.value
    
    SELECTED_MOLECULE = Stage.add_molecule_to_stage(new Molecule({
      x: 0, y: 40, vx: 0.25, vy: 0, symbol: symbol
    }))
    highlight_ammo(false)
    
    $('#add_molecule select').val('')
  })
  
  
  // Ammo chooser
  var add_ammo = function(e) {
  	var elem = $(e.currentTarget)
  	Stage.add_ammo_to_dom(elem.data('atom'))
  	set_ammo_from_dom()
  	highlight_ammo(elem)
  }
  
  
  // Set ammo based on DOM
  var set_ammo_from_dom = function(save) {
  	ammo = []
		$('#ammo img').each(function(i, elem) {
			ammo.push($(elem).data('atom'))
		})
		Stage.set_ammo(ammo)
		$('#ammo img').removeClass('selected')
		$('#ammo img').eq(0).addClass('selected')
		if(save) Levels[0].ammo = ammo.splice(0)
	}
	
	
	// Highlight an ammo atom
	var HIGHLIGHTED_AMMO = null
	var highlight_ammo = function(elem) {
		$('#ammo img.highlighted').removeClass('highlighted')
		if(!elem) {
			HIGHLIGHTED_AMMO = null
			return
		}
		HIGHLIGHTED_AMMO = elem
		HIGHLIGHTED_AMMO.addClass('highlighted')
	}
	
  
  for(var symbol in AtomDefinitions) {
    var li = $('<li />')
    $('<a>'+symbol+'</a>').data('atom', symbol).click(add_ammo).appendTo(li)
    li.appendTo($('#ammo_chooser ul'))
  }
    
  
  // Points needed
  $('#points_needed').val(Levels[0].points)
  $('#required_score').html('Required Score: '+Levels[0].points)
  var set_points_needed = function() {
    Levels[0].points = parseInt($('#points_needed').val())
    $('#required_score').html('Required Score: '+Levels[0].points)
  }
  $('#points_needed').change(set_points_needed)
  $('#set_points_needed').click(set_points_needed)
  
  
  // "Save Level" prompt
  $('#save_level').click(function() {
  	save_initial_molecules()
  	set_ammo_from_dom(true)
  	SAVED_LEVEL = $.extend({}, Levels[0])
  	Stage.start_level()
  })
  
  
  // "Restore to Saved prompt
  $('#restore_level').click(function() {
  	Levels[0] = $.extend({}, SAVED_LEVEL)
  	Stage.start_level()
  })
  
  
  // "Copy Saved Level" prompt
  $('#copy_level').click(function() {
    prompt('Level Specification:', $.toJSON(SAVED_LEVEL))
  })
  
  
  // "Play Saved Level" link
  $('#play_level').click(function() {
    window.open('index.html#level='+encodeURIComponent($.toJSON(SAVED_LEVEL)))
  })
  
  
  // Molecule mouse events  
  $(document).mousedown(function(e) {
    MOUSE_DOWN = true
    
    MOUSE_X = e.clientX - CANVAS_LEFT
    MOUSE_Y = e.clientY - CANVAS_TOP
    
    SELECTED_MOLECULE = Stage.molecule_at_point(MOUSE_X, MOUSE_Y)
    if(!SELECTED_MOLECULE) return
    
    highlight_ammo(false)
    
    SELECTED_MOLECULE.vx = 0
    SELECTED_MOLECULE.vy = 0
    SELECTED_MOLECULE.v_angle = 0
  })
  
  $(document).mouseup(function(e) {
    MOUSE_DOWN = false
  })
  
  $(document).mousemove(function(e) {
    MOUSE_X = e.clientX - CANVAS_LEFT
    MOUSE_Y = e.clientY - CANVAS_TOP
    
    if(MOUSE_DOWN && SELECTED_MOLECULE) {
      SELECTED_MOLECULE.x = MOUSE_X
      SELECTED_MOLECULE.y = MOUSE_Y
    }
    
    return false
  })
  
  $(document).bind('keydown', function(e) {
    var key = e.which
    if(key == 8) e.preventDefault()
    
    if(SELECTED_MOLECULE) {
			if(key == 37) { // counter-clockwise rotation
				SELECTED_MOLECULE.v_angle = -0.075
				
			} else if(key == 39) { // clockwise rotation
				SELECTED_MOLECULE.v_angle = 0.075
				
			} else if(key == 8) { // delete key
				// Remove the selected molecule from the stage
				Stage.remove_molecule_from_stage(SELECTED_MOLECULE)
				SELECTED_MOLECULE = null
			}
		
		} else if(HIGHLIGHTED_AMMO && key == 8) {
			HIGHLIGHTED_AMMO.remove()
			highlight_ammo(false)
			set_ammo_from_dom()
		}
  })
  
  $(document).bind('keyup', function(e) {
    if(!SELECTED_MOLECULE) return
    var key = e.which
    SELECTED_MOLECULE.v_angle = 0
  })
  
  
  $('#ammo').sortable({
  	update: set_ammo_from_dom
  })
  
  $('#ammo img').live('mousedown', function(e) {
  	highlight_ammo($(e.currentTarget))
  })
  
  
  // Go!
  Game.start_gameplay = function() {
    Stage.initialize()
    Stage.start_level()
    soundManager.mute()
  }
})