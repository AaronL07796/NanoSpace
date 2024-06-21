window._area = 'sizes'
window._attraction = 'cosmic_calculations'

$(function() {
    
  var _score = 0,
      _max_score_award = 1e+6,
      _wrong_guess_limit = 5,
      _wrong_guesses = 0,
      _current_object,
      _last_guess,
      _number_names = [
        { name: 'One', exponent: 0 },
        { name: 'Ten', exponent: 1 },
        { name: 'Hundred', exponent: 2 },
        { name: 'Thousand', exponent: 3 },
        { name: 'Million', exponent: 6 },
        { name: 'Billion', exponent: 9 },
        { name: 'Trillion', exponent: 12 },
        { name: 'Quadrillion', exponent: 15 },
        { name: 'Quintillion', exponent: 18 },
        { name: 'Sextillion', exponent: 21 },
        { name: 'Septillion', exponent: 24 },
        { name: 'Octillion', exponent: 27 },
        { name: 'Nonillion', exponent: 30 },
        { name: 'Decillion', exponent: 33 },
        { name: 'Undecillion', exponent: 36 },
        { name: 'Duodecillion', exponent: 39 },
        { name: 'Tredecillion', exponent: 42 },
        { name: 'Quattuordecillion', exponent: 45 },
        { name: 'Quindecillion', exponent: 48 },
        { name: 'Sexdecillion', exponent: 51 },
        { name: 'Septendecillion', exponent: 54 },
        { name: 'Octodecillion', exponent: 57 },
        { name: 'Novemdecillion', exponent: 60 },
        { name: 'Vigintillion', exponent: 63 },
        { name: 'Unvigintillion', exponent: 66 },
        { name: 'Duovigintillion', exponent: 69 },
        { name: 'Trevigintillion', exponent: 72 },
        { name: 'Quattuorvigintillion', exponent: 75 },
        { name: 'Quinvigintillion', exponent: 78 },
        { name: 'Sexvigintillion', exponent: 81 },
        { name: 'Septenvigintillion', exponent: 84 },
        { name: 'Octovigintillion', exponent: 87 },
        { name: 'Novemvigintillion', exponent: 90 },
        { name: 'Trigintillion', exponent: 93 },
        { name: 'Untrigintillion', exponent: 96 },
        { name: 'Duotrigintillion', exponent: 99 },
        { name: 'Googol (google)', exponent: 100 },
        { name: 'Tretrigintillion', exponent: 102 },
        { name: 'Quattuortrigintillion', exponent: 105 },
        { name: 'Quintrigintillion', exponent: 108 },
        { name: 'Sextrigintillion', exponent: 111 },
        { name: 'Septentrigintillion', exponent: 114 },
        { name: 'Octotrigintillion', exponent: 117 },
        { name: 'Novemtrigintillion', exponent: 120 }
      ],
      _objects = [
        { name: 'sun', display_name: 'The Sun', atoms: 9.78e+56 },
        { name: 'earth', display_name: 'The Earth', atoms: 1.349e+50 },
        { name: 'eiffel_tower', display_name: 'The Eiffel Tower', atoms: 9.79e+31 },
        { name: 'blue_whale', display_name: 'A Blue Whale', atoms: 2.73e+29 },
        { name: 'human', display_name: 'A Human', atoms: 6.67e+27 },
        { name: 'penny', display_name: 'A Penny', atoms: 2.3e+22 },
        { name: 'jelly_bean', display_name: 'A Jelly Bean', atoms: 1.6e+23 },
        { name: 'ant', display_name: 'An Ant', atoms: 2e+20 },
        { name: 'sand', display_name: 'A Grain of Sand', atoms: 7.83e+14 },
        { name: 'red_blood_cell', display_name: 'A Red Blood Cell', atoms: 7.5e+12 }
      ],
      _objects_not_yet_asked = [],
      _playing_background = 'a',
      _top = $('#top'),
      _calc,
      _sprites = { approval: 		{ frames: 10, frame_limit: 10,	 	fps: 5 },
									 disapproval: { frames: 10, frame_limit: 10,	 	fps: 5 },
									 higher: 			{ frames: 8,  frame_limit: 16,		fps: 5 },
									 lower: 			{ frames: 11, frame_limit: 22,	 	fps: 5 },
									 talk_1: 			{ frames: 11, frame_limit: null, 	fps: 5 },
									 talk_2: 			{ frames: 11, frame_limit: null, 	fps: 5 },
									 walk_left: 	{ frames: 8,  frame_limit: 19,		fps: 8 },
									 walk_right: 	{ frames: 8,  frame_limit: 19,		fps: 8 },
									 wait: 				{ frames: 11, frame_limit: null, 	fps: 3 } }

  var setup = function() {

    $('body').bind('dragstart selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')

    _objects_not_yet_asked = $.extend(true, [], _objects)

    $('#guess_slider').slider( {
      min: 0,
      max: 60,
      stop: guess,
      change: preview_guess,
      slide: function(event, ui) {
        preview_guess(event, ui)
        Game.play_sound('slider_click')
      },
      value: 30
    } )
    
    disable_slider()

  	$('#game_over_message').click(function(){Game.show_high_scores()})

  }
	
	var sprite = function(name) {
		
		if( _calc ) _calc.destroy().remove()

		_calc = $('<div class="calculator" />').attr('id', name).appendTo(_top)

		_calc.sprite( {	no_of_frames: _sprites[name].frames,
										fps: 					_sprites[name].fps,
										play_frames: 	_sprites[name].frame_limit	} )

    return _calc

	}

  var start_game = function() {
    Game.play_sound('new_level')
    _score = 0
    update_score()
    $('#results').empty()
    _objects_not_yet_asked = $.extend(true, [], _objects)
    Message.hide()
    $('#high_scores').hide()
		sprite('walk_right').animate( { left: 10 },
                                  { duration: 2200, easing: 'linear', complete: ask } )
  }
  
  
  var disable_slider = function() {
    $('#guess_slider').slider('option', 'disabled', true)
  }
  
  var enable_slider = function() {
    $('#guess_slider').slider('option', 'disabled', false)
  }
  

  var ask = function() {
	 	sprite( 'talk_' + Math.ceil( Math.random() * 2 ) )

  	play_random(['canyouguess_a', 'canyouguess_b', 'canyouguess_c', 'canyouguess_d', 'canyouguess_e'], 600)

  	$('.guess').addClass('hidden')
  	$('#guess_in_english, #exponent').empty()
  	$('#guess_in_decimal').text('Guess a number of atoms with the slider…').fadeTo(600, 1.0)

    _wrong_guesses = 0

    update_score()

    $('#speech_bubble').stop().fadeTo(200, 0.0)

    if( _objects_not_yet_asked.length == 0 ) {
      game_over('You guessed every object correctly!')
      setTimeout(function() {
        Game.unlock_achievement('cosmic_calculations_all', 'Cosmic Calculator!')
      }, 1500)
      return
    }
    _current_object = $.shuffle( _objects_not_yet_asked ).pop()
    $('#object_name').text( _current_object.display_name ).fadeTo(600, 1.0)

    var image_path = 'images/objects/' + _current_object.name + '.png'

    $('<img />')
      .attr( 'src', image_path )
      .appendTo('#object_image')
      .animate( { marginTop: 0 },
                { duration: 600, easing: 'easeOutBounce' } )
    
    setTimeout(enable_slider, 600)
      
		setTimeout(function() {
			sprite('wait')
		}, 4000)
  }

  var preview_guess = function(event, ui) {
    
    $('.guess').each(function() {
			if( $(this).hasClass('hidden') ) {
				$(this).removeClass('hidden').fadeTo(400, 1.0)
			}
    })

    var exponent = ui.value

    $('#exponent').text( exponent )

    var decimal_str = '1'
    for( var i = 0; i < exponent; i++ ) {
      decimal_str += '0'
    }
    decimal_str += ' Atoms'
    decimal_str = decimal_str.replace('1 Atoms', '1 Atom')
    $('#guess_in_decimal').text( decimal_str ).digits()

    var english_str = ''
    for( var i = 0; i < _number_names.length; i++ ) {
      if( exponent <= _number_names[i].exponent ) {

        if( exponent == _number_names[i].exponent ) {
          var english_str = 'One ' + _number_names[i].name + ' Atoms!'
        }
        else if( exponent == _number_names[i].exponent - 2 ) {
          var english_str = 'Ten ' + _number_names[i - 1].name + ' Atoms!'
        }
        else if( exponent == _number_names[i].exponent - 1 ) {
          var english_str = 'One Hundred ' + _number_names[i - 1].name + ' Atoms!'
        }

        break;

      }
    }

    english_str = english_str.replace('One One Atoms', 'One Atom').replace('One Ten', 'Ten')
    $('#guess_in_english').text( english_str )

  }

  var guess = function() {

		Game.play_sound('guess')

    var guessed = Math.pow( 10, $('#guess_slider').slider('value') )

    if( guessed == _last_guess ) {
      return
    }

    var difference = guessed / _current_object.atoms

    if ( difference < 1 && difference > 0.1 ) {
			sprite('approval')
      correct()
    }

    else {
      _wrong_guesses++
      var guesses_remaining = _wrong_guess_limit - _wrong_guesses

      if ( _wrong_guesses >= _wrong_guess_limit ) {
        disable_slider()
        play_random(['5try_a', '5try_b', '5try_c', '5try_d', '5try_e', '5try_f'], 800)
        var correct_exponent = Math.floor( Math.log( _current_object.atoms ) / Math.LN10 )
        var correct_mantissa = ( _current_object.atoms / Math.pow( 10, correct_exponent ) ).toFixed(2)
        var message_str = 'Sorry, the correct answer is ' + correct_mantissa + ' <sub>x</sub> 10<sup>' + correct_exponent + '</sup>'
        sprite('disapproval')
        game_over(message_str)
        setTimeout(function() {
          sprite('walk_left').animate( { left: -200 },
                                       { duration: 2200, easing: 'linear' } )
        }, 2000)
      }
      else {

        if ( guessed < _current_object.atoms ) {
          sprite('higher')
          var response_num = Math.floor( Math.random() * 4 )
          var responses = [ { text: 'Higher!',        audio: 'wrong_low_higher'         },
                            { text: 'More!',          audio: 'wrong_low_more'           },
                            { text: 'Try even more!', audio: 'wrong_low_try_even_more'  },
                            { text: 'Try More!',      audio: 'wrong_low_try_more'       } ]
        }
        else if ( guessed > _current_object.atoms ) {
					sprite('lower')
          var response_num = Math.floor( Math.random() * 3 )
          var responses = [ { text: 'Less!',  audio: 'wrong_high_less_a'  },
                            { text: 'Less!',  audio: 'wrong_high_less_b'  },
                            { text: 'Lower!', audio: 'wrong_high_lower'   } ]
        }

        $('#speech_bubble').text( responses[response_num].text ).stop().fadeTo(200, 1.0)

        setTimeout( function() {
          Game.play_sound( responses[response_num].audio )
        }, 400 )

      }
    }

    update_score()

    _last_guess = guessed

  }

  var correct = function() {
    disable_slider()
		$('#speech_bubble').text('Correct!').stop().fadeTo(200, 1.0)

    if(_wrong_guesses == 0)
      play_random(['correct_1try_a', 'correct_1try_b', 'correct_1try_c'])
    else if(_wrong_guesses == 1)
      play_random(['correct_2try_a', 'correct_2try_b', 'correct_2try_c', 'correct_2try_d', 'correct_2try_e', 'correct_2try_f'])
    else if(_wrong_guesses == 2)
      play_random(['correct_3try_a', 'correct_3try_b', 'correct_3try_c'])
    else if(_wrong_guesses >= 3)
      play_random(['correct_4try_a', 'correct_4try_b', 'correct_4try_c'])
    
    var points_won = _max_score_award / Math.pow( 2,  _wrong_guesses )
    _score += points_won

    update_score()
    
		$('#level_completed_message .alert').text('Correct! You won ' + points_won + ' points!').digits()
    Message.display($('#level_completed_message'), 4000)
    
    // Achievement
    if(_wrong_guesses == 0) {
      Game.unlock_achievement('cosmic_calculations_first_try', 'Excellent Guess!')
    }

		setTimeout(reset_guesses, 2000)

		setTimeout(ask, 5000)
  }

  var game_over = function(message) {
    
    User.save_score('cosmic_calculations', _score)
    
    setTimeout( function() {
      Game.play_sound('game_over')
    }, 1e3 )
    
    $('#game_over_message .alert').html(message)
    Message.display($('#game_over_message'), -1)

		reset_guesses()

    $('#object_image img').fadeOut( 400, function() {
      $(this).remove()
      setTimeout( function() {Game.play_sound('incorrect')}, 3e3 )
    } )

  }
  
  var reset_guesses = function() {
		$('#guess_in_decimal, #guess_in_english, #guess_in_exponential').fadeTo(400, 0)

    $('#object_image img').fadeOut( 200, function() {
      $(this).remove()
    } )
		$('#object_name, #speech_bubble').fadeTo(400, 0)
	}

  var update_score = function() {
    var guesses_remaining = _wrong_guess_limit - _wrong_guesses
    $('#guesses_remaining').text( guesses_remaining ).digits()
    $('#score').text( _score ).digits()
  }

  var play_random = function(sounds, delay) {
    var play_num = Math.floor( Math.random() * sounds.length )
    setTimeout(function() {
    	Game.play_sound( sounds[play_num] )
    }, delay || 0)
  }

  $(window).load(setup)

  Game.load_sounds([
  	{
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 75
    }, {
      id: 'incorrect',
      url: 'sounds/incorrect.mp3',
      volume: 75
    }, {
      id: 'guess',
      url: 'sounds/guess.mp3',
      volume: 75
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 75
    }, {
      id: 'slider_click',
      url: 'sounds/slider_click.mp3',
      multiShot: true,
      volume: 20
    }, {
      id: 'background_a',
      url: 'sounds/background_a.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
    }, {
      id: 'background_b',
      url: 'sounds/background_b.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
    }, {
      id: '5try_a',
      url: 'sounds/5try_a.mp3',
      volume: 75
    }, {
      id: '5try_b',
      url: 'sounds/5try_b.mp3',
      volume: 75
    }, {
      id: '5try_c',
      url: 'sounds/5try_c.mp3',
      volume: 75
    }, {
      id: '5try_d',
      url: 'sounds/5try_d.mp3',
      volume: 75
    }, {
      id: '5try_e',
      url: 'sounds/5try_e.mp3',
      volume: 75
    }, {
      id: '5try_f',
      url: 'sounds/5try_f.mp3',
      volume: 75
    }, {
      id: 'canyouguess_a',
      url: 'sounds/canyouguess_a.mp3',
      volume: 75
    }, {
      id: 'canyouguess_b',
      url: 'sounds/canyouguess_b.mp3',
      volume: 75
    }, {
      id: 'canyouguess_c',
      url: 'sounds/canyouguess_c.mp3',
      volume: 75
    }, {
      id: 'canyouguess_d',
      url: 'sounds/canyouguess_d.mp3',
      volume: 75
    }, {
      id: 'canyouguess_e',
      url: 'sounds/canyouguess_e.mp3',
      volume: 75
    }, {
      id: 'correct_1try_a',
      url: 'sounds/correct_1try_a.mp3',
      volume: 75
    }, {
      id: 'correct_1try_b',
      url: 'sounds/correct_1try_b.mp3',
      volume: 75
    }, {
      id: 'correct_1try_c',
      url: 'sounds/correct_1try_c.mp3',
      volume: 75
    }, {
      id: 'correct_2try_a',
      url: 'sounds/correct_2try_a.mp3',
      volume: 75
    }, {
      id: 'correct_2try_b',
      url: 'sounds/correct_2try_b.mp3',
      volume: 75
    }, {
      id: 'correct_2try_c',
      url: 'sounds/correct_2try_c.mp3',
      volume: 75
    }, {
      id: 'correct_2try_d',
      url: 'sounds/correct_2try_d.mp3',
      volume: 75
    }, {
      id: 'correct_2try_e',
      url: 'sounds/correct_2try_e.mp3',
      volume: 75
    }, {
      id: 'correct_2try_f',
      url: 'sounds/correct_2try_f.mp3',
      volume: 75
    }, {
      id: 'correct_3try_a',
      url: 'sounds/correct_3try_a.mp3',
      volume: 75
    }, {
      id: 'correct_3try_b',
      url: 'sounds/correct_3try_b.mp3',
      volume: 75
    }, {
      id: 'correct_3try_c',
      url: 'sounds/correct_3try_c.mp3',
      volume: 75
    }, {
      id: 'correct_4try_a',
      url: 'sounds/correct_4try_a.mp3',
      volume: 75
    }, {
      id: 'correct_4try_b',
      url: 'sounds/correct_4try_b.mp3',
      volume: 75
    }, {
      id: 'correct_4try_c',
      url: 'sounds/correct_4try_c.mp3',
      volume: 75
    }, {
      id: 'wrong_high_less_a',
      url: 'sounds/wrong_high_less_a.mp3',
      volume: 75
    }, {
      id: 'wrong_high_less_b',
      url: 'sounds/wrong_high_less_b.mp3',
      volume: 75
    }, {
      id: 'wrong_high_lower',
      url: 'sounds/wrong_high_lower.mp3',
      volume: 75
    }, {
      id: 'wrong_low_higher',
      url: 'sounds/wrong_low_higher.mp3',
      volume: 75
    }, {
      id: 'wrong_low_more',
      url: 'sounds/wrong_low_more.mp3',
      volume: 75
    }, {
      id: 'wrong_low_try_even_more',
      url: 'sounds/wrong_low_try_even_more.mp3',
      volume: 75
    }, {
      id: 'wrong_low_try_more',
      url: 'sounds/wrong_low_try_more.mp3',
      volume: 75
    }
  ])

  Game.load_images([
    'images/top_background.png',
    'images/bottom_background.png',
    'images/knob.png',
    'images/objects/ant.png',
    'images/objects/blue_whale.png',
    'images/objects/earth.png',
    'images/objects/eiffel_tower.png',
    'images/objects/human.png',
    'images/objects/jelly_bean.png',
    'images/objects/penny.png',
    'images/objects/red_blood_cell.png',
    'images/objects/sand.png',
    'images/objects/sun.png',
    'images/high_scores.png',
    'images/sprites/approval.png',
    'images/sprites/disapproval.png',
    'images/sprites/higher.png',
    'images/sprites/lower.png',
    'images/sprites/talk_1.png',
    'images/sprites/talk_2.png',
    'images/sprites/wait.png',
    'images/sprites/walk_left.png',
    'images/sprites/walk_right.png'
  ])
  
  Game.start_gameplay = function() {
    Game.stop_sound('theme')
		Game.stop_sound('background_' + _playing_background)
		_playing_background = (_playing_background == 'a' ? 'b' : 'a')
		Game.play_sound('background_' + _playing_background)
    start_game()
  }

  Game.show_high_scores = function() {
    var $high_scores = $('#high_scores')
    var $inner = $high_scores.children('.inner')
    $inner.empty()
    
    User.all_high_scores_for_game('cosmic_calculations', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var $div = $('<div />')
        var $place = $('<span class="place" />').text(i+1).appendTo($div)
        var $score = $('<span class="score" />').text(scores[i].score).digits().appendTo($div)
        var $username = $('<span class="username" />').text(scores[i].username).appendTo($div)
        $div.appendTo($inner)
      }
    })

    $('#high_scores').show()
  }
  $('#high_scores').bind('click', function(){Game.start_gameplay()})
    
  Game.initialize()

})
