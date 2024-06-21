window._area = 'h2o'
window._attraction = 'h2o_parlor'

$( function() {
  
	// CONSTANTS
	var	_ROOM_TEMP = 70,
			_TEMP_INCREMENT = 2,
			_READY_ITEMS_LIMIT = 8,
			_ORDER_LIMIT = 5,
			_ORDER_LENGTH_LIMIT = 3,
			_INITIAL_TIME_BETWEEN_ORDERS = 20e3,
			_MIN_TIME_BETWEEN_ORDERS = 6e3,
			_MIN_TEMPERATURE = 0, // deg F
			_MAX_TEMPERATURE = 250, // deg F
      _TIME_LEFT = 0,
      _TARGET_EARNED = 0
      _EARNED = 0
      _TOTAL_EARNED = 0
      _CAN_PAUSE = false
      _PAUSED = false

  var _person_state = [
    {name: 'happy', duration: 2.0},
    {name: 'bored', duration: 2.0},
    {name: 'angry', duration: 2.0}
  ]

	// "GLOBAL" VARIABLES
	var _temp,
			_dest_temp,
			_temp_interval,
			_gasbox,
			_items = [

				{
					name: 'snow_cone',
					display_name: 'Snow Cone',
					min_temp: null,
					max_temp: 32,
					prep_time: 1e3,
					expiration: 20000,
					price: 3.00
				},

				{
					name: 'water',
					display_name: 'Glass of Water',
					min_temp: 32,
					max_temp: 212,
					prep_time: 1e3,
					expiration: null,
					price: 1.00
				},

				{
					name: 'balloon',
					display_name: 'Balloon',
					min_temp: 212,
					max_temp: null,
					prep_time: 1e3,
					expiration: 30000,
					price: 2.00
				}

			],
			_item,
			_item_interval,
			_item_start_time,
			_prepared_items = [],
			_orders = [],
			_time_between_orders,
			_new_order_timeout,
			_time_interval,
			_last_time
	
	var _person_positions = [
      { bottom: -75, left: '29%'},
      { bottom: -75, left: '57%'},
      { bottom: -75, left: '84%'},
      { bottom: 0,  left: '36%'},
      { bottom: 0,  left: '62%'}
    ],
    _prepared_item_positions = [
      { bottom: 166, left: 52  },
      { bottom: 166, left: 106  },
      { bottom: 166, left: 163 },
      { bottom: 166, left: 225 },
      { bottom: 166, left: 287 },
      { bottom: 166, left: 342 },
      { bottom: 166, left: 403 },
      { bottom: 166, left: 459 }
    ]
  
  var _levels = [
    {
      time: 2*60000,
      target_earned: 5.00,
      initial_time_between_orders: 20e3,
      min_time_between_orders: 6e3,
      order_limit: 2,
      order_length_limit: 1,
      person_state: [
        {name: 'happy', duration: 2.0},
        {name: 'bored', duration: 2.0},
        {name: 'angry', duration: 2.0}
      ]
    }, {
      time: 3*60000,
      target_earned: 10.00,
      initial_time_between_orders: 20e3,
      min_time_between_orders: 5e3,
      order_limit: 2,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 2.0},
        {name: 'bored', duration: 2.0},
        {name: 'angry', duration: 2.0}
      ]
    }, {
      time: 4*60000,
      target_earned: 15.00,
      initial_time_between_orders: 20e3,
      min_time_between_orders: 5e3,
      order_limit: 3,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 3.0},
        {name: 'bored', duration: 3.0},
        {name: 'angry', duration: 3.0}
      ]
    }, {
      time: 5*60000,
      target_earned: 25.00,
      initial_time_between_orders: 18e3,
      min_time_between_orders: 4.5e3,
      order_limit: 4,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 3.0},
        {name: 'bored', duration: 3.0},
        {name: 'angry', duration: 3.0}
      ]
    }, {
      time: 6*60000,
      target_earned: 30.00,
      initial_time_between_orders: 16e3,
      min_time_between_orders: 4.25e3,
      order_limit: 5,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 2.5},
        {name: 'bored', duration: 2.5},
        {name: 'angry', duration: 2.5}
      ]
    }, {
      time: 7*60000,
      target_earned: 50.00,
      initial_time_between_orders: 14e3,
      min_time_between_orders: 3.75e3,
      order_limit: 5,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 2.0},
        {name: 'bored', duration: 1.5},
        {name: 'angry', duration: 2.0}
      ]
    }, {
      time: 5*60000,
      target_earned: 100.00,
      initial_time_between_orders: 12e3,
      min_time_between_orders: 3e3,
      order_limit: 5,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 1.5},
        {name: 'bored', duration: 1.0},
        {name: 'angry', duration: 1.5}
      ]
    }, {
      time: 5*60000,
      target_earned: 100.00,
      initial_time_between_orders: 10e3,
      min_time_between_orders: 2e3,
      order_limit: 5,
      order_length_limit: 3,
      person_state: [
        {name: 'happy', duration: 1.5},
        {name: 'bored', duration: 1.0},
        {name: 'angry', duration: 1.5}
      ]
    }
  ]
  
  var _level_i = null


	// SETUP AND EVENT ATTACHMENTS
	var initialize = function() {

		$( '#target_temp_slider' ).slider( {
      min: _MIN_TEMPERATURE,
      max: _MAX_TEMPERATURE,
      change: set_dest_temp,
      value: _ROOM_TEMP,
      slide: preview_dest_temp
    } )
    
		$( '#button' ).click( begin_new_item )

    $('body').disableSelection()
    
		_gasbox = new GasBox($('canvas'), {
			num_molecules: 200,
			molecule_radius: 10,
			molecule_passing: 2,
			initial_avg_velocity: 0.2,
			gravity: -0.0001,
      inelastic_cutoff_velocity: 0.1,
	    liquid_velocity_min: 0.064,
	    liquid_velocity_max: 0.424,
	    liquid_force_field: .001,
			color: '#0FF'
		})
    
	}
	
	
	// BASIC GAME-OPERATION FUNCTIONS
	var start = function() {
	  _CAN_PAUSE = true
	  
	  Timer.resume_all()
	  
	  _last_time = Date.now()
    _time_interval = setInterval(update_time, 100)
	}
	
	
	var stop = function() {
	  Timer.pause_all()
	  clearInterval(_time_interval)
	}
	
	
	var _load_next_level_timeout = null
	var next_level_prompt = function() {
	  _CAN_PAUSE = false
	  stop()
	  
	  var level = _levels[_level_i]
	  
	  if(_level_i == 0) {
	    $('#start_level_message .good_job').hide()
	    $('#start_level_message .now').hide()
	  } else {
	    $('#start_level_message .good_job').show()
	    $('#start_level_message .now').show()
	  }
	  
	  $('#start_level_message .target').html('$'+level.target_earned.toFixed(2))
	  $('#start_level_message .time').html(format_time(level.time))
	  
	  Message.display($('#start_level_message'), 4000)
	  _load_next_level_timeout = Timer.set(load_next_level, 4000)
	}
	
	$('#start_level_message').click(function() {
	  Timer.clear(_load_next_level_timeout)
	  load_next_level()
	})
	
	
	
	var load_next_level = function() {
	  Message.hide()
	  Game.stop_sound('theme')
	  Game.play_sound('new_level')
	  
    var level = _levels[_level_i]
    
    _ORDER_LIMIT = level.order_limit
    _ORDER_LENGTH_LIMIT = level.order_length_limit
    _INITIAL_TIME_BETWEEN_ORDERS = level.initial_time_between_orders
    _MIN_TIME_BETWEEN_ORDERS = level.min_time_between_orders
    _person_state = level.person_state
    _TIME_LEFT = level.time
    
    _TARGET_EARNED = level.target_earned
    _TOTAL_EARNED += _EARNED
    _EARNED = 0
    
    clear_orders()
    
		_temp = _ROOM_TEMP
		display_temp(_temp)
		
		$('#target_temp_slider').slider('value', _temp)
    $('#status .target .val').html('$'+_TARGET_EARNED.toFixed(2))
    $('#status .earned .val').html('$0.00')
    
		_time_between_orders = _INITIAL_TIME_BETWEEN_ORDERS
		
    start()
    
    Timer.clear(_new_order_timeout)
		generate_new_order()
  }
  
  
  var update_time = function() {
    var time = Date.now()
    var interval = time - _last_time
    _last_time = time
    
    _TIME_LEFT -= interval
    if(_TIME_LEFT < 0) _TIME_LEFT = 0
    
    $('#status .time .val').html(format_time(_TIME_LEFT))
    
    if(_TIME_LEFT == 0) game_over()
  }
  
  
  var game_over = function() {
    _CAN_PAUSE = false
    Game.play_sound('game_over')
    stop()
    clear_orders()
    
    User.save_score('h2o_parlor', Math.round(_TOTAL_EARNED), '$'+_TOTAL_EARNED.toFixed(2))
    
    Message.display($('#game_over_message'), -1)
  }
  $('#game_over_message').click(function(){Game.show_high_scores()})


	// TEMPERATURE-RELATED FUNCTIONS
	var update_temp_slider_offset = function(ui) {
		var percent = (ui.value - _MIN_TEMPERATURE) / (_MAX_TEMPERATURE - _MIN_TEMPERATURE)
		var handle_offset_top = 40 * Math.pow(2 * Math.abs(percent - 0.5), 2)
		$('#target_temp_slider .ui-slider-handle').css('margin-top', handle_offset_top)
	}
	
	var preview_dest_temp = function( event, ui ) {
	  update_temp_slider_offset(ui)
		display_dest_temp( ui.value )
	}

	var set_dest_temp = function( event, ui ) {
    update_temp_slider_offset(ui)
    
		_dest_temp = ui.value

		display_dest_temp( _dest_temp )

		if ( _temp_interval ) {
			clearInterval( _temp_interval )
		}

		_temp_interval = setInterval( update_temp, 33 )

	}

	var update_temp = function() {
    if(_PAUSED) return
    
		if ( Math.abs( _dest_temp - _temp ) <= _TEMP_INCREMENT ) {
			_temp = _dest_temp
			clearInterval( _temp_interval )
		}

		else if ( _dest_temp > _temp ) {
			_temp += _TEMP_INCREMENT
		}

		else if ( _dest_temp < _temp ) {
			_temp -= _TEMP_INCREMENT
		}

		display_temp( _temp )

	}



	// ITEM-RELATED FUNCTIONS
	
	var animate_new_item = function(item_type) {
    
    var items = $('#prepared_items .item')
    
    var occupied_positions = items.map(function() {
      return $(this).data('position')
    }).get()
    
    for( var i = 0; i < 8; i++ ) {
      if( occupied_positions.indexOf(i) == -1 ) {
        var item_position = i
        break
      }
    } 
    
    var item = $('<div />')
                 .addClass('item enter_position '+item_type)
                 .data('position', item_position)
                 .prependTo('#prepared_items')
    
    item
      .switchClass('enter_position', 'just_finished_position', 200)
      .delay(400)
      .animate({
        left:   [_prepared_item_positions[item_position].left,   'easeOutQuad'],
        bottom: [_prepared_item_positions[item_position].bottom, 'easeOutBackForPreparedItems']
      }, 600)
    
    Timer.set(function() {
      item.css('zIndex', 90)
    }, 900)
    
    if(item.hasClass('snow_cone')) {
      $('#snowcone_holder').stop(true, true).addClass('visible', 200).delay(400).removeClass('visible', 400)
    }
    
    return item
    
  }
  
  var animate_trash_item = function(item) {
    Game.play_sound('trash_item')
    item.css({'z-index': 95, top: 'auto'})
    
    item.animate({
      bottom: [-74, 'easeInBack'],
      left: [29, 'easeInQuad']
    }, {
      duration: 800,
      complete: function() {
        item.remove()
      }
    })
    
    Timer.set(function() {
      item.css('zIndex', 110)
    }, 400)
    
    $('#trash_lid')
      .stop(true)
      .delay(300)
      .animate( {height: '25%'}, {duration: 300, easing: 'easeOutQuad'} )
      .delay(400)
      .animate( {height: '100%'}, {duration: 600, easing: 'easeOutElastic'} )
    
  }
  
	var begin_new_item = function() {
	  if(_PAUSED) return false
	  Game.play_sound('button_press')

		// If an item was already in-progress, dispose of it
		if ( _item ) {
			$( '#status_message' ).text( 'Disposed of ' + _item.display_name + ' that was being made!' )
			clearInterval( _item_interval )
			$('#prepared_items').trigger( { type: 'item_cancelled', reason: 'new_item_started' } )
		}

		// Based on temperature, determine which item can be made
		for ( var i = 0; i < _items.length; i++ ) {

			if ( ( !_items[i].min_temp || _temp >= _items[i].min_temp ) &&
					 ( !_items[i].max_temp || _temp < _items[i].max_temp ) ) {

				_item = _items[i]
				break

			}

		}
    
		_item_start_time = new Date()
		_item_interval = setInterval( update_item, 33 )
	}

	var update_item = function() {

		var time_elapsed = new Date() - _item_start_time
    
    var stop_building = false
    
		if ( _item.min_temp && _temp < _item.min_temp ) {
			$( '#status_message' ).text( 'Too cold to finish the ' + _item.display_name.toLowerCase() )
			$('#prepared_items').trigger( { type: 'item_cancelled', reason: 'too_hot' } )
			stop_building = true
		}
		else if ( _item.max_temp && _temp >= _item.max_temp ) {
			$( '#status_message' ).text( 'Too hot to finish the ' + _item.display_name.toLowerCase() )
			$('#prepared_items').trigger( { type: 'item_cancelled', reason: 'too_cold' } )
			stop_building = true
		}
		else if ( time_elapsed >= _item.prep_time ) {
			var completed_item = $.extend({}, _item)
			
			Game.play_sound(completed_item.name+'_created')
			
			var item_el = animate_new_item(completed_item.name)
      completed_item.el = item_el
			completed_item.el.data('item', completed_item)
			set_expiration(completed_item)
			
			_prepared_items.push(completed_item)
			$('#prepared_items .item').draggable({
			  revert: 'invalid',
			  start: function(event, ui) {
			    $('#people').addClass('dragging')
			  },
			  stop: function(event, ui) {
			    $('#people').removeClass('dragging')
			    set_expiration(ui.helper.data('item'))
			  }
			})
			
			trim_item_queue()
			$( '#status_message' ).empty()
			
			stop_building = true
		}

		if( stop_building ) {
			clearInterval( _item_interval )
			_item = null
			$( '#item_progress' ).css('height', '0%')
		}
		else {
			var percent_complete = parseInt( time_elapsed / _item.prep_time * 100 )
			$( '#item_progress' ).css('height', percent_complete+'%')
		}

	}

	var trim_item_queue = function() {
    
		var items = $('#prepared_items .item')
		var num_ready = items.length
    
		if ( num_ready > _READY_ITEMS_LIMIT ) {
			var overflow = num_ready - _READY_ITEMS_LIMIT
			items.slice(0, overflow).remove()
		}
    
	}
	
  var trash_item = function() {
    var item_el = $(this)
    var item = item_el.data('item')
    Timer.clear(item.expiration_timeout)
    _prepared_items.splice(_prepared_items.indexOf(item), 1)
    animate_trash_item(item_el)
  }
  
  $('#prepared_items .item').live('click', trash_item)
  
  
  var set_expiration = function(item) {
    if(item.expiration) {
      Timer.clear(item.expiration_timeout)
			item.expiration_timeout = Timer.set(function(){expire_item(item)}, item.expiration)
		}
  }
  
  
  var expire_item = function(item) {
    if(item.el.hasClass('ui-draggable-dragging')) return
    _prepared_items.splice(_prepared_items.indexOf(item), 1)
    item.el.animate({
      bottom: 140,
      opacity: 0
    }, {
      duration: 800,
      complete: function(){item.el.remove()}
    })
  }
  



	// ORDER-RELATED FUNCTIONS
	var update_person_state = function(order) {
	  order.state++
    
	  // Has the person been waiting too long?
	  if(order.state >= _person_state.length) {
	    Game.play_sound('customer_walks_away')
	    order.el.trigger('walk_away')
	  
	  // If not, set the timeout again
	  } else {
	    if(_person_state[order.state].name == 'bored')
        animate_bored_person(order.el)
      else if(_person_state[order.state].name == 'angry')
        animate_angry_person(order.el)
      
      order.state_timeout = Timer.set(function() {
        update_person_state(order)
      }, _person_state[order.state].duration * _time_between_orders)
	  }
	}
	
	
	var animate_bored_person = function(person) {
    person = $(person)
    
    if( person.is('.person_state_1') ) {
      Game.play_sound('bored_customer')
      return person.addClass('person_state_2').removeClass('person_state_1 person_state_3')
    }
    else {
      return false
    }
  
  }
  
  var animate_angry_person = function(person) {
    
    person = $(person)
    
    if( person.is('.person_state_2') ) {
      Game.play_sound('angry_customer')
      
      return person
              .animate(
                {bottom: '-=40'},
                {
                  duration: 300,
                  easing: 'easeOutQuint',
                  complete: function() {
                    person
                      .addClass('person_state_3')
                      .removeClass('person_state_1 person_state_2')
                      .effect('bounce', {direction: 'up', times: 3, duration: 200, distance: 20})
                  }
                }
              )
    }
    else {
      return false
    }
  
  }
	
	var person_walks_away = function(e) {
	  var person = $(e.target)
	  var order = person.data('order')
    
    person.data('position', null)
    person.data('person_type', null)
    
		Timer.clear(order.state_timeout)
		var order_i = _orders.indexOf(order)
		if(order_i != -1) _orders.splice(order_i, 1)
    
    person
      .animate(
        {left: '0%'},
        {
          duration: 750,
          easing: 'easeInBack',
          complete: function() {person.remove()}
        }
      )
	}
	
	var generate_new_order = function() {
	      
    if(_orders.length >= _ORDER_LIMIT) {
  		_new_order_timeout = Timer.set( generate_new_order, _time_between_orders )
      return
    }
    
    _time_between_orders -= 2e3
		_time_between_orders = Math.max( _time_between_orders, _MIN_TIME_BETWEEN_ORDERS )
    
		var order_length = Math.ceil(Math.random() * _ORDER_LENGTH_LIMIT)
		var order_items = []
		var order_el = $( '<li />' )
    
    var order_price = 0
		for ( var i = 0; i < order_length; i++ ) {
			var random_item = _items[ Math.floor(Math.random() * _items.length) ]
			order_items.push( random_item.name )
			order_price += random_item.price
		}
    
		var people = $('#people .person')

    var num_people = people.length
    
    var occupied_positions = people.map(function() {
      return $(this).data('position')
    }).get()
    
    do {
      var rand = Math.ceil( Math.random() * 5 )
      if( occupied_positions.indexOf(rand) == -1 ) {
        var person_position = rand
      }
    } while (!person_position)
  
    var existing_ids = people.map(function() {
      return $(this).data('person_type')
    }).get()
    
    do {
      var rand = Math.ceil( Math.random() * 6 )
      if( existing_ids.indexOf(rand) == -1 ) {
        var person_type_num = rand
      }
    } while (!person_type_num)
    
    var person = $('<div />')
      .addClass('person enter_position person_state_1 position_'+person_position)
      .data('position', person_position)    
      .data('person_type', person_type_num)    
      .attr('id', 'person_type_'+person_type_num)
      .appendTo('#people')
    var order_elem = $('<div />').addClass('order').appendTo(person)
    
    order_elem.droppable({
      
      // Check to see if the dragged item is in our order
      accept: function(elem) {
        var item = $(elem).data('item')
        if(!item) return false
        var item_index = order_items.indexOf(item.name)
        return (item_index == -1) ? false : true
      },
      
      // Remove the dragged item from the order
      drop: function(event, ui) {
        Game.play_sound('hand_item_to_customer')
        
        $('#people').removeClass('dragging')
        var item = $(ui.draggable).data('item')
        item.el.remove()
        
        var item_index = order_items.indexOf(item.name)
        order_items.splice(item_index, 1)
        order_elem.find('.item').eq(item_index).remove()
        order_length--
        
        // Is the order complete?
        if(order_items.length <= 0) {
          order_complete(order)
        }
      }
    })
    
    for( var i = 0; i < order_items.length; i++ ) {
      $('<div />').addClass('item '+order_items[i]).appendTo(order_elem)
    } 
  
    person
      .animate({
        left: [_person_positions[person_position-1].left, 'easeOutQuad'],
        bottom:  [_person_positions[person_position-1].bottom,  'easeInBounce']
      }, 400)
      .children('.order')
      .delay(400)
      .addClass('visible', 600)
    
    person.bind('walk_away', person_walks_away)
    
    var order = {
			state: 0,
			items: order_items,
			el: person,
			price: order_price
		}
		order.state_timeout = Timer.set(function() {update_person_state(order)}, _person_state[0].duration * _time_between_orders)
		person.data('order', order)
		
		_orders.push( order )
    Game.play_sound('new_customer')
    
		$('#people').trigger('order_placed')
		
		_new_order_timeout = Timer.set(generate_new_order, _time_between_orders)
	}
	
	
	var order_complete = function(order) {
	  Game.play_sound('successful_customer')
	  _EARNED += order.price
	  $('#status .earned .val').html('$'+_EARNED.toFixed(2))
	  if(_EARNED >= _TARGET_EARNED) {
	    level_complete()	  
	  } else {
	    animate_order_fulfilled(order)
	  }
	}
  
  
  var animate_order_fulfilled = function(order) {
    
    for( var k = 0; k < order.items.length; k++ ) {
      // Loop through all prepared items until you find the first one of the right type
      for( var l = 0; l < _prepared_items.length; l++ ) {
        
        // Delete this item
        if ( order.items.indexOf( _prepared_items[l].name ) != -1 ) {
          _prepared_items[l].el.animate({
            bottom: 300,
            opacity: 0
          }, {
            duration: 500,
            complete: function() {
              $(this).remove()
            }
          })
          _prepared_items.splice(l, 1)
          l--
        }
      }
    }
    
    order.el.find('.order').empty().append($('<div />').addClass('speech').html('THANKS!'))
    Timer.set(function() {
      order.el.trigger('walk_away', person_walks_away)
    }, 2000)
    
    // If there aren't any more orders, create one immediately
    if(_orders.length <= 1) {
      Timer.set(function() {
        if(_orders.length <= 1) {
          Timer.clear(_new_order_timeout)
          generate_new_order()
        }
      }, 4000)
    }
    
  }
  
  
  var clear_orders = function() {
    for(var i = 0; i < _orders.length; i++) {
      Timer.clear(_orders[i].state_timeout)
      _orders[i].el.remove()
    }
    _orders = []
    
    for( var i = 0; i < _prepared_items.length; i++ ) {
      Timer.clear(_prepared_items[i].expiration_timeout)
      _prepared_items[i].el.remove()
    }
    _prepared_items = []
  }
  
  
  var level_complete = function() {
    stop()
    clear_orders()
    
    if(_level_i == 5-1) {
      Game.unlock_achievement('h2o_parlor_1', 'H2O Parlor Server')
    } else if(_level_i == 8-1) {
      Game.unlock_achievement('h2o_parlor_2', 'H2O Parlor Pro')
    } else if(_level_i == 10-1) {
      Game.unlock_achievement('h2o_parlor_3', 'H2O Parlor Master')
    }
    
    _level_i++
    if(_level_i >= _levels.length) _level_i = _levels.length - 1
    next_level_prompt()
  }
  

	// UTILITY FUNCTIONS
	var display_dest_temp = function(temp_in_f) {
		temp_in_f = ( Math.round(temp_in_f * 10) / 10 )
		temp_in_c = ( Math.round(f_to_c( temp_in_f ) * 10) / 10 )
		$( '#target_temp_f' ).text( temp_in_f )
		$( '#target_temp_c' ).text( temp_in_c )
	}

	var display_temp = function(temp_in_f) {
	  if(temp_in_f <= 32) {
	    var avg_velocity = 0.005
	  } else if(temp_in_f <= 100) {
	    var avg_velocity = 0.175
	  } else if(temp_in_f <= 180) {
	    var avg_velocity = 0.2
	  } else if(temp_in_f <= 213) {
	    var avg_velocity = 0.225
	  } else {
	    var avg_velocity = 0.375
	  }
	  _gasbox.set_avg_velocity(avg_velocity)
	  
		temp_in_f = ( Math.round(temp_in_f * 10) / 10 )
		temp_in_c = ( Math.round(f_to_c( temp_in_f ) * 10) / 10 )
		var percent = 100 * (temp_in_f - _MIN_TEMPERATURE) / (_MAX_TEMPERATURE - _MIN_TEMPERATURE)
		$('#current_temp').css('height', Math.min(99, Math.max(1, percent))+'%')
	}

	var f_to_c = function( temp_in_f ) {
		return (5 / 9) * (temp_in_f - 32)
	}

  jQuery.easing.easeOutBackForPreparedItems = function (x, t, b, c, d) {
    var s = 12
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b
  }
  
  var format_time = function(time) {
    var time_seconds = time / 1000
    var minutes = Math.floor(time_seconds / 60)
    var seconds = Math.floor(time_seconds - minutes*60)
    if(seconds < 10) seconds = '0'+seconds
    return minutes+':'+seconds
  }  
  
  
  var start_game = function() {
    
    $('#high_scores').hide()
    Message.hide()
    
    Game.stop_sound('background').play_sound('background')
    
    if(_level_i == null) {
      initialize()
    }
    
    _level_i = 0
    _TOTAL_EARNED = 0
    next_level_prompt()
  }
  
  
  // ------------------ GAME SETUP ----------------------

  Game.load_sounds([
    {
      id: 'snow_cone_created',
      url: 'sounds/snow_cone_created.mp3',
      volume: 50
    }, {
      id: 'water_created',
      url: 'sounds/water_created.mp3',
      volume: 50
    }, {
      id: 'balloon_created',
      url: 'sounds/balloon_created.mp3',
      volume: 50
    }, {
      id: 'button_press',
      url: 'sounds/button_press.mp3',
      volume: 50
    }, {
      id: 'new_customer',
      url: 'sounds/new_customer.mp3',
      volume: 50
    }, {
      id: 'successful_customer',
      url: 'sounds/successful_customer.mp3',
      volume: 50
    }, {
      id: 'bored_customer',
      url: 'sounds/bored_customer.mp3',
      volume: 50
    }, {
      id: 'angry_customer',
      url: 'sounds/angry_customer.mp3',
      volume: 50
    }, {
      id: 'customer_walks_away',
      url: 'sounds/customer_walks_away.mp3',
      volume: 50
    }, {
      id: 'hand_item_to_customer',
      url: 'sounds/hand_item_to_customer.mp3',
      volume: 50
    }, {
      id: 'trash_item',
      url: 'sounds/trash_item.mp3',
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
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
      loops: 999999,
      volume: 35
    }
  ])
  
  var images_to_preload = [
    'images/background.jpg',
    'images/balloon_small.png',
    'images/balloon.png',
    'images/holder_front.png',
    'images/overlay.png',
    'images/snowcone_holder.png',
    'images/snowcone_small.png',
    'images/snowcone.png',
    'images/speech_bubble.png',
    'images/speech_bubble_highlighted.png',
    'images/target_temp_arrow.png',
    'images/trash_lid.png',
    'images/water_small.png',
    'images/water.png',
    'images/characters/1/1.png',
    'images/characters/1/2.png',
    'images/characters/1/3.png',
    'images/characters/2/1.png',
    'images/characters/2/2.png',
    'images/characters/2/3.png',
    'images/characters/3/1.png',
    'images/characters/3/2.png',
    'images/characters/3/3.png',
    'images/characters/4/1.png',
    'images/characters/4/2.png',
    'images/characters/4/3.png',
    'images/characters/5/1.png',
    'images/characters/5/2.png',
    'images/characters/5/3.png',
    'images/characters/6/1.png',
    'images/characters/6/2.png',
    'images/characters/6/3.png',
    'images/high_scores.png'
  ]
  
  Game.load_images(images_to_preload)
  
  Game.can_pause = function() {
    return _CAN_PAUSE
  }
  
  $(Game).bind('pause', function(e, paused) {
    if(paused && _PAUSED) return
    
    if(paused) {
      _PAUSED = true
      stop()
      Message.display('PAUSED', -1)
      $( '#target_temp_slider' ).slider('option', 'disabled', true)
    } else {
      _PAUSED = false
      Message.hide()
      start()
      $( '#target_temp_slider' ).slider('option', 'disabled', false)
    }
  })
  
  Game.start_gameplay = function() {
    start_game()
  }
  
  Game.show_high_scores = function() {
    Game.play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('h2o_parlor', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="score">'+scores[i].misc+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', start_game)
  
  Game.initialize()
})
