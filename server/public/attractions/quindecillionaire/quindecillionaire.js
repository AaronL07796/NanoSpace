window._area = 'h2o'
window._attraction = 'quindecillionaire'

$(function() {
  
  var _levels = [
        { object: 'virus', exponent: 6 },
        { object: 'bacteria', exponent: 9 },
        { object: 'yeast', exponent: 12 },
        { object: 'blood_cell', exponent: 15 },
        { object: 'salt', exponent: 18 },
        { object: 'golf_ball', exponent: 24 },
        { object: 'semitruck', exponent: 30 },
        { object: 'dubai_tower', exponent: 36 },
        { object: 'great_lakes', exponent: 42 },
        { object: 'moon', exponent: 48 }
      ],
      _level,
      _current_question,
      _lifelines = $('#lifelines'),
      _skip = true,
      _hint = true,
      _fifty_fifty = true,
      _playing_background = 'a',
      _bod = $('body'),
      _calc,
      _sprites = [ { name: 'talking', frames: 30, frame_limit: 30, fps: 4 } ]


  var setup = function() {

    // BIND NORMAL EVENTS
    $('body').bind('dragstart selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
    $('#answers li').click( answer )
    $('#skip').click( skip )
    $('#hint').click( hint )
    $('#fifty_fifty').click( fifty_fifty )
    // $('#skip_animation').click( return_to_game )
    $('#you_win').click( start_game )

    // BIND CUSTOM EVENTS
    $('#answers').bind('answered_incorrectly', function() { setTimeout(start_game, 800)                 })
    $('#answers').bind('answered_correctly', function() {   // $('#skip_animation').delay(200).fadeIn(200)
                                                            setTimeout(hide_level_meter, 0)
                                                            setTimeout(show_beaker, 400)
                                                            setTimeout(show_prize, 400)
                                                            setTimeout(function() {
                                                              Game.fade_in_sound('reward_background', 0.5)
                                                            }, 200)
                                                            setTimeout(function() {
                                                              var success_sound_id = 'success_' + (_level-1)
                                                              Game.play_sound(success_sound_id)
                                                              $('#results').text( soundManager.getSoundById(success_sound_id).dialog )
                                                            }, 1400)                                    })
    $('#beaker').bind('shown', function() {                 setTimeout(fill_beaker, 200)
                                                            setTimeout(show_calc, 100)                  })
    $('#beaker').bind('filled', function() {                setTimeout(show_score, 200)                 })
    $('#beaker').bind('score_shown', function() {           setTimeout(raise_curtain, 2200)             })
    $('#prize').bind('curtain_raised', function() {         setTimeout(return_to_game, 3500)            })
  
  }

  var show_calc = function() {

    if( _calc ) _calc.destroy().remove()

    var sprite_info = _sprites[Math.floor(Math.random() * _sprites.length)]

    _calc = $('<div class="calculator" />')
      .attr('id', sprite_info.name)
      .css('bottom', -150)
      .insertBefore('#results')
      .animate( { bottom: 115 },
                { easing: 'easeOutCubic',
                  complete: function() {
                    $(this).sprite( { no_of_frames: sprite_info.frames,
                                      fps:          sprite_info.fps,
                                      play_frames:  sprite_info.frame_limit  } )
                  }} )

  }

  var hide_calc = function() {
    _calc.stop().animate(  { bottom: -150 },
                    { easing: 'easeInCubic'} )
  }

  var start_game = function() {
    if( _bod.is('.busy') ) return
    Game.stop_sound('winning')
    _level = 1
    _skip = true
    _hint = true
    _fifty_fifty = true
    _lifelines.children('li').removeClass('used')
    update_level_indicator()
    $('#you_win').fadeOut()
    ask()
  }

  var ask = function() {
  
    if( _bod.is('.busy') || _bod.is('.asking') ) return
    _bod.addClass('busy asking')

    Game.fade_out_sound('reward_background', 1)

    $('#answers li').removeClass('disabled')

    $('#results').text( 'Choose the correct answer, or try a lifeline…' )

    var questions_at_level = []

    for ( var i = 0; i < QUESTIONS.length; i++ ) {

      if ( QUESTIONS[i].level == _level ) {
        questions_at_level.push( QUESTIONS[i] )
      }

    }

    _current_question = questions_at_level[ Math.floor( Math.random() * questions_at_level.length ) ]

    if ( !_current_question ) {
      game_won()
      return
    }

    var possible_answers = _current_question.incorrect_answers.slice()
    possible_answers.push( _current_question.correct_answer )
    possible_answers = $.shuffle( possible_answers )

    Game.play_sound('next_level')
    setTimeout(function() {Game.play_sound('questions_fly_in')}, 800)
    setTimeout(function() {
      Game.stop_sound('background_' + _playing_background)
      _playing_background = (_playing_background == 'a' ? 'b' : 'a')
      Game.play_sound('background_' + _playing_background)
    }, 1400)

    $('#question_box').css('top', -222).show()
    $('#question').text( _current_question.question ).widowFix()
    var is_two_lines = ( $('#question').height() > parseInt($('#question').css('line-height')) )
    $('#question').toggleClass( 'two_line', is_two_lines )
    $('#question_box').delay(200).animate({top: 8}, 600, 'easeOutElastic')

    $('#answers li').each( function(i) {
      $(this).css({marginBottom: -265, opacity: 1, display: 'block'}).show()
      $(this).children('a').text( possible_answers[i] )
      $(this).delay((150 * i) + 800).animate({marginBottom: 0}, 400, 'easeOutQuart')
    } )
    
    setTimeout(function() {
      _lifelines.removeClass('disabled')
      _bod.removeClass('busy')
    }, 1650)

  }

  var answer = function(e) {
    if( _bod.is('.busy') ) return
    _bod.addClass('busy').removeClass('asking')

    _lifelines.addClass('disabled')

    Game.fade_out_sound('background_' + _playing_background, 1)
    Game.play_sound('click_on_answer')

    var clicked_answer = $(e.currentTarget)

    $('#answers li').not( clicked_answer ).animate({opacity: 0.4}, 200)

    var correct = (clicked_answer.children('a').text() == _current_question.correct_answer)

    if( correct ) {
      Game.play_sound('correct_answer')
      correct_sound_id = 'correct_'+Math.ceil(Math.random() * 12)
      Game.play_sound(correct_sound_id)
      $('#results').text( soundManager.getSoundById(correct_sound_id).dialog )
      _level++
    }
    else {
      Game.play_sound('wrong_answer')
      $('#results').text( 'You lose, start over at level 1.' )
    }
    
    setTimeout(function() {
      Game.play_sound('questions_fly_out')
      $('#answers li').each( function(i) {
        $(this).delay(150 * i).animate({marginBottom: -265}, 400, 'easeInBack')
      } )
      $('#question_box').delay(800).animate({top: -222}, 400, 'easeInBack', function() {
        _bod.removeClass('busy')
        $('#answers').trigger( correct ? 'answered_correctly' : 'answered_incorrectly' )
      })
    }, 800)

  }

  var skip = function() {
    if( _bod.is('.busy') || _lifelines.hasClass('disabled') || !_skip ) return
    _skip = false
    $('#skip').addClass('used')
    _level++
    Game.fade_out_sound('background_' + _playing_background, 1)
    update_level_indicator()
    _bod.removeClass('asking')
    ask()
  }

  var hint = function() {
    if( _bod.is('.busy') || _lifelines.hasClass('disabled') || !_hint ) return
    _hint = false
    $('#hint').addClass('used')
    Game.stop_sound('background_' + _playing_background)
    _playing_background = 'lifeline'
    Game.play_sound('background_' + _playing_background)
    $('#question').text( _current_question.hint ).widowFix()
    var is_two_lines = ( $('#question').height() > parseInt($('#question').css('line-height')) )
    $('#question').toggleClass( 'two_line', is_two_lines )
  }

  var fifty_fifty = function() {
    if( _bod.is('.busy') || _lifelines.hasClass('disabled') || !_fifty_fifty ) return
    _fifty_fifty = false
    $('#fifty_fifty').addClass('used')
    Game.stop_sound('background_' + _playing_background)
    _playing_background = 'lifeline'
    Game.play_sound('background_' + _playing_background)
    var correct_answer = $('#answers li a').filter( function() {
      return $(this).text() == _current_question.correct_answer
    }).closest('li')
    var wrong_answers = $('#answers li').not( correct_answer )
    var wrong_answer_to_keep = wrong_answers.eq( Math.floor( Math.random() * 3 ) )
    wrong_answers.not( wrong_answer_to_keep ).addClass('disabled')
  }

  var update_level_indicator = function() {
    $('#level_indicator').css('height', _level-1+'%')
  }

  var return_to_game = function() {
    // $('#skip_animation').fadeOut(200)
    Game.stop_sound('success_' + (_level-1))
    hide_prize()
    hide_calc()
    hide_beaker()
    setTimeout(show_level_meter, 500)
    setTimeout(ask, 1200)
  }

  // ANIMATIONS
  var hide_level_meter = function() {
    $('#level_meter').stop().animate(
      { left: -68 },
      {
        duration: 200,
        easing: 'easeInCubic',
        complete: function() { $(this).trigger( 'hidden' ) }
      }
    )
  }

  var show_level_meter = function() {
    update_level_indicator()
    $('#level_meter').stop().animate(
      { left: 0 },
      {
        duration: 400,
        easing: 'easeInCubic',
        complete: function() { 
          $(this).trigger( 'shown' ) 
        }
      }
    )
  }

  var show_beaker = function() {
    $('#liquid_container').css('height', 0)
    $('#score').css('opacity', 0)
    var $beaker = $('#beaker').stop()

    var beaker_scale = Math.pow(0.1 * _level, 0.5)

    if( $.browser.mozilla ) {
      $beaker.css('-moz-transform', 'scale(' + beaker_scale + ')')
    } else {
      $beaker
        .css('webkitTransform', 'translateZ(0) scale(' + beaker_scale + ')')
        .css('transform', 'scale(' + beaker_scale + ')')
    }

    $beaker.animate(
      { left: 130 },
      {
        duration: 400,
        easing: 'easeOutBack',
        complete: function() { $(this).trigger( 'shown' ) }
      }
    )
  }

  var hide_beaker = function() {
    $('#beaker').stop().animate(
      { left: -356 },
      {
        duration: 400,
        easing: 'easeInBack',
        complete: function() { $(this).trigger( 'hidden' ) }
      }
    )
  }

  var show_prize = function() {
    $('#curtain').css('height', '100%')
    var image_path = 'images/objects/' + _levels[_level-2].object + '.png'
    $('#object').attr('class', _levels[_level-2].object).css( 'background-image', 'url(' + image_path + ')' )
  
    $('#prize').stop().animate(
      { right: 30 },
      {
        duration: 400,
        easing: 'easeOutBack',
        complete: function() { $(this).trigger( 'shown' ) }
      }
    )
  }

  var hide_prize = function() {
    $('#prize').stop().animate(
      { right: -383 },
      {
        duration: 400,
        easing: 'easeInBack',
        complete: function() { $(this).trigger( 'hidden' ) }
      }
    )
  }

  var fill_beaker = function() {
    Game.play_sound('beaker_fills_up')
    $('#liquid_container').stop().animate(
      { height: 343 },
      {
        duration: 2200,
        easing: 'easeOutCubic',
        complete: function() { $(this).trigger( 'filled' ) }
      }
    )
  }
  
  var show_score = function() {
    $('#exponent').text( _levels[_level-2].exponent )
    $('#score').stop().animate( 
      { opacity: 1 },
      {
        duration: 400,
        easing: 'easeInCubic',
        complete: function() { $(this).trigger( 'score_shown' ) }
      }
    )
  }
  
  var raise_curtain = function() {
    $('#curtain').stop().animate( 
      { height: 0 },
      {
        duration: 800,
        easing: 'easeInCubic',
        complete: function() { $(this).trigger( 'curtain_raised' ) }
      }
    )
  }

  var game_won = function() {
    $('#you_win').fadeIn( function() {
      Game.play_sound('winning')
      _bod.removeClass('busy asking')
    } )
    
    setTimeout(function() {
      Game.unlock_achievement('quindecillionaire', 'Quindecillionaire!')
    }, 2000)
  }

  $(window).load(setup)

  Game.load_sounds([
    {
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
      volume: 75
    }, {
      id: 'beaker_fills_up',
      url: 'sounds/beaker_fills_up.mp3',
      volume: 50
    }, {
      id: 'click_on_answer',
      url: 'sounds/click_on_answer.mp3',
      volume: 100
    }, {
      id: 'correct_answer',
      url: 'sounds/correct_answer.mp3',
      volume: 50
    }, {
      id: 'wrong_answer',
      url: 'sounds/wrong_answer.mp3',
      volume: 50
    }, {
      id: 'curtain_fly_up',
      url: 'sounds/curtain_fly_up.mp3',
      volume: 50
    }, {
      id: 'background_lifeline',
      url: 'sounds/background_lifeline.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
    }, {
      id: 'next_level',
      url: 'sounds/next_level.mp3',
      volume: 50
    }, {
      id: 'questions_fly_in',
      url: 'sounds/questions_fly_in.mp3',
      volume: 30
    }, {
      id: 'questions_fly_out',
      url: 'sounds/questions_fly_out.mp3',
      volume: 30
    }, {
      id: 'reward_background',
      url: 'sounds/reward_background.mp3',
      music_muteable: true,
      volume: 50
    }, {
      id: 'winning',
      url: 'sounds/winning.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
    }, {
      id: 'correct_1',
      url: 'sounds/correct_1.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_2',
      url: 'sounds/correct_2.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_3',
      url: 'sounds/correct_3.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_4',
      url: 'sounds/correct_4.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_5',
      url: 'sounds/correct_5.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_6',
      url: 'sounds/correct_6.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_7',
      url: 'sounds/correct_7.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_8',
      url: 'sounds/correct_8.mp3',
      volume: 50,
      dialog: 'Yes! You are correct!'
    }, {
      id: 'correct_9',
      url: 'sounds/correct_9.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_10',
      url: 'sounds/correct_10.mp3',
      volume: 50,
      dialog: 'Very good!'
    }, {
      id: 'correct_11',
      url: 'sounds/correct_11.mp3',
      volume: 50,
      dialog: 'You are correct!'
    }, {
      id: 'correct_12',
      url: 'sounds/correct_12.mp3',
      volume: 50,
      dialog: 'Well done!'
    }, {
      id: 'success_1',
      url: 'sounds/success_1.mp3',
      volume: 50,
      dialog: 'You have won one million H₂O molecules, which has the volume of a common virus.'
    }, {
      id: 'success_2',
      url: 'sounds/success_2.mp3',
      volume: 50,
      dialog: 'You have won one billion H₂O molecules, which has the volume of a bacteria.'
    }, {
      id: 'success_3',
      url: 'sounds/success_3.mp3',
      volume: 50,
      dialog: 'You have won one trillion H₂O molecules, which has the volume of a yeast particle.'
    }, {
      id: 'success_4',
      url: 'sounds/success_4.mp3',
      volume: 50,
      dialog: 'You have won one quadrillion H₂O molecules, which has the volume of a red blood cell.'
    }, {
      id: 'success_5',
      url: 'sounds/success_5.mp3',
      volume: 50,
      dialog: 'You have won one quintillion H₂O molecules, which has the volume of a grain of salt.'
    }, {
      id: 'success_6',
      url: 'sounds/success_6.mp3',
      volume: 50,
      dialog: 'You have won one septillion H₂O molecules, which has the volume of a golf ball.'
    }, {
      id: 'success_7',
      url: 'sounds/success_7.mp3',
      volume: 50,
      dialog: 'You have won one nonillion H₂O molecules, which has the volume of semi-truck.'
    }, {
      id: 'success_8',
      url: 'sounds/success_8.mp3',
      volume: 50,
      dialog: 'You have won one undecillion H₂O molecules, which has the volume of the Burj Khalifa.'
    }, {
      id: 'success_9',
      url: 'sounds/success_9.mp3',
      volume: 50,
      dialog: 'You won one tredecillion H₂O molecules, which has the volume of the great lakes.'
    }, {
      id: 'success_10',
      url: 'sounds/success_10.mp3',
      volume: 50,
      dialog: 'You have won one quindecillion H₂O molecules, which has the volume of the Moon.'
    }
  ])

  Game.load_images([
    'images/answer_box.png',
    'images/background.jpg',
    'images/beaker.png',
    'images/curtain.png',
    'images/databox.png',
    'images/fifty_fifty_button.png',
    'images/glint.png',
    'images/hint_button.png',
    'images/level_meter_background.png',
    'images/level_meter_overlay.png',
    'images/liquid.png',
    'images/peripherals.png',
    'images/platform.png',
    'images/question_box.png',
    'images/skip_button.png',
    'images/you_win.png',
    'images/objects/bacteria.png',
    'images/objects/blood_cell.png',
    'images/objects/dubai_tower.png',
    'images/objects/golf_ball.png',
    'images/objects/great_lakes.png',
    'images/objects/moon.png',
    'images/objects/salt.png',
    'images/objects/semitruck.png',
    'images/objects/virus.png',
    'images/objects/yeast.png',
    'images/sprites/talking.png'
  ])

  Game.start_gameplay = function() {
    Game.fade_out_sound('theme', 1)
    start_game()
  }

  Game.initialize()

})
