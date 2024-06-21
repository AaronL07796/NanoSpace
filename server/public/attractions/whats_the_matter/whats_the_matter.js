window._area = 'materials'
window._attraction = 'whats_the_matter'

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var BOX = null
  
  var ELEMENTS = {
    'H':  {symbol: 'H', name: 'Hydrogen', color: '#A57CB8', melting_temp: -434.45, boiling_temp: -423.17},
    'He': {symbol: 'He', name: 'Helium', color: '#D9519E', melting_temp: -457.96, boiling_temp: -452.07},
    'Ne': {symbol: 'Ne', name: 'Neon', color: '#7F60A9', melting_temp: -415.46, boiling_temp: -410.94},
    'Si': {symbol: 'Si', name: 'Silicon', color: '#4D4B81', melting_temp: 2577, boiling_temp: 4271},
    'Cu': {symbol: 'Cu', name: 'Copper', color: '#D67A31', melting_temp: 1984.32, boiling_temp: 4643},
    'Kr': {symbol: 'Kr', name: 'Krypton', color: '#227141', melting_temp: -251.25, boiling_temp: -244.12},
    'Au': {symbol: 'Au', name: 'Gold', color: '#EFBA34', melting_temp: 1947.52, boiling_temp: 5173},
    'Hg': {symbol: 'Hg', name: 'Mercury', color: '#61BEBE', melting_temp: -37.89, boiling_temp: 674.11},
    'Pb': {symbol: 'Pb', name: 'Lead', color: '#9FA1A4', melting_temp: 621.43, boiling_temp: 3180}
  }
  
  var ELEMENT = null
  var TEMPERATURE_F = 0
  var UNITS = 'F'
  var PREV_TEMPS = []
  
  var MAX_TEMP = 6000
  var MIN_TEMP = -459
  var TEMP_RANGE = MAX_TEMP - MIN_TEMP
  
  var MIN_VELOCITY = 0.0
  var MELT_VELOCITY = 0.08937
  var BOIL_VELOCITY = 0.20963
  var MAX_VELOCITY = 0.45
  
  var START_VELOCITY = 0
  
  var AVG_VELOCITY = START_VELOCITY
  var TARGET_AVG_VELOCITY = START_VELOCITY
  var VELOCITY_MOVING = false
  var TEMP_FINE_ADJUSTMENT = 0
  var VELOCITY_PER_DEGREE = 0.0
  
  var SELECTED_MELT_TEMP = null
  var SELECTED_BOIL_TEMP = null
  
  var COMPLETED = []
  
  var PHASE = 'gas'
  
  var SPRITES = {
    condensation:    { frames: 21,  frame_limit: 21,  fps: 10 },
    crystallization: { frames: 23,  frame_limit: 23,  fps: 10 },
    evaporation:     { frames: 24,  frame_limit: 24,  fps: 10 },
    melting:         { frames: 24,  frame_limit: 24,  fps: 10 },
    transformation:  { frames: 25,  frame_limit: 25,  fps: 10 }
  }
  
  var THERMONATOR = null
  
  var play_sprite = function(name) {
    Game.stop_sound('toma').play_sound('toma')
    if(THERMONATOR) THERMONATOR.destroy()
    $('#thermonator_container').html('')
    THERMONATOR = $('<div class="thermonator" />').attr('id', name).appendTo($('#thermonator_container'))
    THERMONATOR.sprite({
      no_of_frames: SPRITES[name].frames,
      fps:          SPRITES[name].fps,
      play_frames:  SPRITES[name].frame_limit
    })
    return THERMONATOR
  }
  
  
  var load_element = function(symbol) {
    Game.stop_sound('theme')
    ELEMENT = ELEMENTS[symbol]
    
    if(BOX) BOX.stop()
    BOX = new GasBox($('canvas'), {color: ELEMENT.color})
    
    TEMPERATURE_F = (MAX_TEMP - MIN_TEMP) / 2.0
    START_VELOCITY = (MAX_VELOCITY - MIN_VELOCITY) / 2.0
    TARGET_AVG_VELOCITY = START_VELOCITY
    AVG_VELOCITY = TARGET_AVG_VELOCITY
    
    SELECTED_MELT_TEMP = null
    SELECTED_BOIL_TEMP = null
    
    $('.atom_label').html(ELEMENT.name).css({color: ELEMENT.color})
    $('#animation_container .readout').removeClass('locked')
    
    update_thermometer()
    set_avg_velocity()
  }
  
  
  var set_avg_velocity = function() {
    if(TEMP_FINE_ADJUSTMENT != 0) {
      TEMPERATURE_F += TEMP_FINE_ADJUSTMENT
      update_target_avg_velocity(false)
      update_thermometer()
    }
    
    VELOCITY_MOVING = true
    AVG_VELOCITY += (TARGET_AVG_VELOCITY - AVG_VELOCITY) / 5.0
    
    if(TEMP_FINE_ADJUSTMENT == 0 && Math.abs(1 - TARGET_AVG_VELOCITY/AVG_VELOCITY) < 0.0001) {
      VELOCITY_MOVING = false
      AVG_VELOCITY = TARGET_AVG_VELOCITY
    } else {
      setTimeout(set_avg_velocity, 33)
    }
    
    BOX.set_avg_velocity(Math.max(0.01, Math.min(0.75, AVG_VELOCITY)))
    update_phase()
  }
  
  
  var update_target_avg_velocity = function(do_set_avg_velocity) {
    if(do_set_avg_velocity !== false) do_set_avg_velocity = true
    
    if(TEMPERATURE_F < ELEMENT.melting_temp) {
      var percent = (TEMPERATURE_F - MIN_TEMP) / (ELEMENT.melting_temp - MIN_TEMP)
      TARGET_AVG_VELOCITY = MIN_VELOCITY + percent * (MELT_VELOCITY - MIN_VELOCITY)
      
    } else if(TEMPERATURE_F < ELEMENT.boiling_temp) {
      var percent = (TEMPERATURE_F - ELEMENT.melting_temp) / (ELEMENT.boiling_temp - ELEMENT.melting_temp)
      TARGET_AVG_VELOCITY = MELT_VELOCITY + percent * (BOIL_VELOCITY - MELT_VELOCITY)
      
    } else {
      var percent = (TEMPERATURE_F - ELEMENT.boiling_temp) / (MAX_TEMP - ELEMENT.boiling_temp)
      TARGET_AVG_VELOCITY = BOIL_VELOCITY + percent * (MAX_VELOCITY - BOIL_VELOCITY)
    }
    
    update_thermometer()
    if(do_set_avg_velocity && !VELOCITY_MOVING) set_avg_velocity()
  }
  
  
  var update_thermometer = function() {
    var percent = (TEMPERATURE_F - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)
    
    $('#temperature_slider .holder').slider('value', TEMPERATURE_F)
    $('.temp_holder .temp_indicator').css('bottom', 450*percent + 60)
    
    var temp_str = Math.round(temp_in_units(TEMPERATURE_F))+'&deg;'+UNITS
    $('.temp_holder .temp_indicator .readout').html(temp_str)
    
    temp_str = Math.round(temp_in_units(SELECTED_MELT_TEMP === null ? TEMPERATURE_F : SELECTED_MELT_TEMP))+'&deg;'+UNITS
    $('#animation_container .freeze.readout').html(temp_str)
    
    temp_str = Math.round(temp_in_units(SELECTED_BOIL_TEMP === null ? TEMPERATURE_F : SELECTED_BOIL_TEMP))+'&deg;'+UNITS
    $('#animation_container .boil.readout').html(temp_str)
  }
  
  
  var update_phase = function() {
    if(TEMPERATURE_F > ELEMENT.melting_temp) {
      if(TEMPERATURE_F > ELEMENT.boiling_temp) {
        var phase = 'gas'
      } else {
        var phase = 'liquid'
      }
    } else {
      var phase = 'solid'
    }
    
    if(phase != PHASE) {
      
      var sprite = 'transformation'
      if(PHASE == 'gas' && phase == 'liquid') {
        sprite = 'condensation'
      } else if(PHASE == 'liquid' && phase == 'solid') {
        sprite = 'crystallization'
      } else if(PHASE == 'solid' && phase == 'liquid') {
        sprite = 'melting'
      } else if(PHASE == 'liquid' && phase == 'gas') {
        sprite = 'evaporation'
      }
      
      play_sprite(sprite)
      Game.stop_sound('solid').stop_sound('liquid').stop_sound('gas').play_sound(phase)
      
      PHASE = phase
      
      if($('.phase span').length > 1) $('.phase span').eq(0).stop(true).remove()
      $('<span />').html(PHASE.toUpperCase()).appendTo($('.phase'))
      $('.phase span').eq(0).animate({'margin-top': 100, 'opacity': 0}, 500, function() {
        $('.phase span').eq(0).remove()
      })
    }
  }
  
  
  var update_units = function() {
    $('.temp_holder .max_temp').html(Math.round(temp_in_units(MAX_TEMP)))
    $('.temp_holder .min_temp').html(Math.round(temp_in_units(MIN_TEMP)))
    $('.temp_holder .units').html('&deg;'+UNITS)
    update_thermometer()
  }
  
  
  var temp_in_units = function(temp) {
    return (UNITS == 'F') ? temp : (temp - 32) / 1.8
  }
  
  
  var temp_in_kelvin = function(temp) {
    return (temp + 459.67) / 1.8
  }
  
  
  var show_results = function() {
    if(COMPLETED.indexOf(ELEMENT.symbol) == -1) {
      COMPLETED.push(ELEMENT.symbol)
    }
    
    if(COMPLETED.length == 3) {
     Game.unlock_achievement('whats_the_matter_1', 'Transformation of Matter Pro!')
    } else if(COMPLETED.length == 6) {
     Game.unlock_achievement('whats_the_matter_2', 'Transformation of Matter Expert!')
    } else if(COMPLETED.length == ELEMENTS.length) {
     Game.unlock_achievement('whats_the_matter_3', 'Transformation of Matter Master!')
    }
    
    var melting_temp = temp_in_units(ELEMENT.melting_temp)
    var boiling_temp = temp_in_units(ELEMENT.boiling_temp)
    var error_melting = Math.abs(melting_temp - temp_in_units(SELECTED_MELT_TEMP))
    var error_boiling = Math.abs(boiling_temp - temp_in_units(SELECTED_BOIL_TEMP))
    
    if(error_melting + error_boiling < 3) {
     Game.unlock_achievement('whats_the_matter_exact', 'Perfect Accuracy! Transformation of Matter Ace!')
    }
    
    $('#results_message .element_name').html(ELEMENT.name)
    $('#results_message .actual_melting').html(Math.round(melting_temp)+'&deg;'+UNITS)
    $('#results_message .actual_boiling').html(Math.round(boiling_temp)+'&deg;'+UNITS)
    $('#results_message .error_melting').html(Math.round(error_melting)+'&deg;'+UNITS)
    $('#results_message .error_boiling').html(Math.round(error_boiling)+'&deg;'+UNITS)
    
    $('#results_message').show()
  }
  
  
  $('#results_message').click(function() {
    $('#results_message').hide()
    var current_element_button = $('[data-element="'+ELEMENT.symbol+'"]')
    var next_element = current_element_button.next().data('element')
    if(!next_element) next_element = $('.element_selector span').first().data('element')
    load_element(next_element)
  })
  
  
  // Element selector
  $('.element_selector span').bind('click', function(e) {
    Game.play_sound('select_element')
    var symbol = $(e.currentTarget).data('element')
    load_element(symbol)
  })
  
  
  // Set up temperature slider
  $('#temperature_slider .holder').slider({
    min: MIN_TEMP,
    max: MAX_TEMP,
    value: (MAX_TEMP - MIN_TEMP) / 2.0,
    orientation: 'vertical',
    slide: function(event, ui) {
      TEMPERATURE_F = ui.value
      update_target_avg_velocity()
    }
  })
  
  
  // Set up fine-tuned controls
  $('.temp_holder .temp_indicator .button').bind('mousedown', function(e) {
    var direction = $(e.currentTarget).hasClass('up') ? 1 : -1
    TEMP_FINE_ADJUSTMENT = direction * 0.15
    if(!VELOCITY_MOVING) set_avg_velocity()
  })
  $(document).bind('mouseup', function() {TEMP_FINE_ADJUSTMENT = 0})
  
  
  // Units button
  $('.temp_holder .units').bind('click', function() {
    if(UNITS == 'F') {
      UNITS = 'C'
    } else {
      UNITS = 'F'
    }
    update_units()
  })
  
  
  // Freeze / Boil buttons
  $('#animation_container .button').click(function(e) {
    Game.play_sound('button')
    
    if($(e.currentTarget).hasClass('freeze')) {
      if(SELECTED_MELT_TEMP === null) {
        SELECTED_MELT_TEMP = TEMPERATURE_F
        $('#animation_container .freeze.readout').addClass('locked')
      } else {
        SELECTED_MELT_TEMP = null
        $('#animation_container .freeze.readout').removeClass('locked')
      }
    
    } else {
      if(SELECTED_BOIL_TEMP === null) {
        SELECTED_BOIL_TEMP = TEMPERATURE_F
        $('#animation_container .boil.readout').addClass('locked')
      } else {
        SELECTED_BOIL_TEMP = null
        $('#animation_container .boil.readout').removeClass('locked')
      }
    }
    
    update_thermometer()
    
    // Are both clicked?
    if(SELECTED_MELT_TEMP !== null && SELECTED_BOIL_TEMP !== null) show_results()
  })
  
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
     id: 'solid',
     url: 'sounds/solid.mp3',
     music_muteable: true,
     loops: 999999,
     volume: 30
    }, {
     id: 'liquid',
     url: 'sounds/liquid.mp3',
     music_muteable: true,
     loops: 999999,
     volume: 30
    }, {
     id: 'gas',
     url: 'sounds/gas.mp3',
     music_muteable: true,
     loops: 999999,
     volume: 30
    }, {
     id: 'toma',
     url: 'sounds/toma.mp3',
     volume: 40
    }, {
     id: 'select_element',
     url: 'sounds/select_element.mp3',
     volume: 50
    }, {
     id: 'button',
     url: 'sounds/button.mp3',
     volume: 50
    }, {
     id: 'theme',
     url: 'sounds/theme.mp3',
     music_muteable: true,
     stream: true,
     loops: 999999,
     volume: 35
    }
  ])
  
  Game.load_images([
    'images/atom_label.png',
    'images/element_selector.png',
    'images/slider_holder.png',
    'images/slider.png',
    'images/temp_holder.png',
    'images/temp_indicator.png',
    'images/container.png',
    'images/thermo_gradient.png',
    'images/sprites/still.png',
    'images/sprites/condensation.png',
    'images/sprites/crystallization.png',
    'images/sprites/evaporation.png',
    'images/sprites/melting.png',
    'images/sprites/transformation.png'
  ])
  
  Game.start_gameplay = function() {
    update_units()
    Game.stop_sound('theme')
    load_element('H')
  }
    
  Game.initialize()

})
