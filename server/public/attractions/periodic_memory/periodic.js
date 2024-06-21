window._area = 'materials'
window._attraction = 'periodic_memory'

;(function($) {

  var _minutes_el = $('#minutes'),
      _seconds_el = $('#seconds'),
      _level_el = $('#level span'),
      _score_el = $('#score span'),
      _total_time,
      _time,
      _level,
      _score = 0,
      _level_complete = false,
      _levels = {
        category: [
           { name: 'alkali_metals', table_coords: [300, 160], clone_coords: [130, 160] }
          ,{ name: 'halogens', table_coords: [-80, 150], clone_coords: [130, 150] }
          ,{ name: 'alkali_earth_metals', table_coords: [340, 160], clone_coords: [130, 160] }
          ,{ name: 'noble_gases', table_coords: [-180, 150], clone_coords: [40, 150] }
          ,{ name: 'lanthanides', table_coords: [90, -130], clone_coords: [160, 130] }
          ,{ name: 'other_metals', table_coords: [-210, 150], clone_coords: [160, 150] }
          ,{ name: 'transition_metals_part_1', table_coords: [130, 320], clone_coords: [130, 8] }
          ,{ name: 'actinides', table_coords: [30, -150], clone_coords: [180, 70] }
          ,{ name: 'nonmetals', table_coords: [-220, 160], clone_coords: [120, 220] }
          ,{ name: 'metalloids', table_coords: [-260, 150], clone_coords: [120, 150] }
          ,{ name: 'unknown_metals', table_coords: [-280, 60], clone_coords: [100, 60] }
          ,{ name: 'transition_metals_part_2', table_coords: [130, 260], clone_coords: [130, -100] }
        ],
        period: [
           // { name: '1', table_coords: [90,280], clone_coords: [90,160] }
           { name: '2', table_coords: [105,340], clone_coords: [105,140] }
          ,{ name: '3', table_coords: [105,296], clone_coords: [105,74] }
          ,{ name: '4', table_coords: [105,252], clone_coords: [105,8] }
          ,{ name: '5', table_coords: [105,252], clone_coords: [105,-36] }
          ,{ name: '6', table_coords: [30,-140], clone_coords: [180,180] }
          ,{ name: '7', table_coords: [180,-174], clone_coords: [30,126] }
        ]
      },
      _play_mode = 'category',
      _play_mode_buttons = $('.play_mode_button'),
      _elements,
      _chosen_elements,
      _flipped_in_table,
      _flipped_in_clone,
      _paused = false
  
  var build_table = function() {

    var periodic_table = $('<div id="periodic_table" />')
    
    for(var symbol in PERIODIC_TABLE) {
      $('<div class="element" />')
        .text(symbol)
        .addClass('col_' + PERIODIC_TABLE[symbol].pos[0])
        .addClass('row_' + PERIODIC_TABLE[symbol].pos[1])
        .addClass('period_' + PERIODIC_TABLE[symbol].period)
        .addClass('category_' + PERIODIC_TABLE[symbol].category)
        .data('element-name', PERIODIC_TABLE[symbol].name)
        .data('atomic-number', PERIODIC_TABLE[symbol].atomic_number)
        .appendTo(periodic_table)
    }
    
    $('#play_field')
      .empty()
      .addClass('show_' + _play_mode)
      .append(periodic_table)

    _elements = $('#periodic_table .element')

  }
  
  var start_game = function() {
    _score = 0
    _level = 0
    Message.hide()
    $('#high_scores').hide()
    update_score()
    start_level()
  }
  
  var start_level = function() {

    Game.play_sound('new_level')

    $('#shuffled').remove()
      
    _elements.removeClass('flipped matched')
    
    var level_name = _levels[_play_mode][_level].name
    
    _chosen_elements = _elements.filter('.' + _play_mode + '_' + level_name)
    
    _chosen_elements.addClass('active').animate( {opacity: 1.0, color: 'black'}, 500)
    
    if( _play_mode == 'period' ) level_name = 'Period ' + level_name + ' Elements'
    
    $('#group_name').text( level_name.replace(/_/g,' ') )
    
    var level_str = _level+1
    if( level_str < 10 ) level_str = '0' + level_str
    _level_el.text( level_str )
    
    _total_time = parseInt(Math.pow(_chosen_elements.length, 1.2) * 7, 10)
    _time = _total_time
    display_time()
  
    $('#info')
      .fadeIn( 800, function() {
        _elements
          .not(_chosen_elements)
          .delay(500)
          .fadeTo( 500, 0.3 )
        
        $('#periodic_table')
          .delay(500)
          .animate( { left: _levels[_play_mode][_level].table_coords[0],
                      top: _levels[_play_mode][_level].table_coords[1] }, 600 )
          
        var shuffled = $('<div id="shuffled" />')

        var border_and_text_color = _chosen_elements.css('backgroundColor')

        _chosen_elements
          .clone(true)
          .css( { opacity: 1.0,
                  backgroundColor: 'black',
                  borderColor: border_and_text_color,
                  color: border_and_text_color } )
          .appendTo(shuffled)

        shuffled
          .css( { opacity: 0.0,
                  left: _levels[_play_mode][_level].table_coords[0],
                  top: _levels[_play_mode][_level].table_coords[1] } )
          .appendTo('#play_field')
          .delay(1300)
          .animate( { left: _levels[_play_mode][_level].clone_coords[0],
                      top: _levels[_play_mode][_level].clone_coords[1],
                      opacity: 1 }, {
                      duration: 500,
                      easing: 'easeOutCubic',
                      complete: function() {
                        setTimeout( scramble, 1000 )
                      } } )
    } )        
  }
  
  var fade_out_text = function(callback) {
  
    var callback = callback || $.noop
    var fade_these = $('.element').not('.completed')
    var last_el = fade_these.last()

    fade_these.each( function() {
      
      var element = $(this)
      var text_color = element.css('background-color')

      element
        .delay(800)
        .animate( { color: text_color },
                  { duration: 600,
                    complete: function() {
                      if( element.equals(last_el) ) callback()
                    } } )
  
    })
    
  }
  
  var fade_in_table_text = function() {
  
    $('#periodic_table').fadeTo(600, 1.0)
    $('.element').not('.completed').animate( {color: 'black'}, 600 )
  
  }
  
  var scramble = function() {
  
    var cloned_elements = $('#shuffled .element')
    
    cloned_elements.each( function() {
      
      var element = $(this)
      var offsets = element.position()
      
      element.data('original_position', {
        top: offsets.top,
        left: offsets.left
      } )
  
    })
    
    cloned_elements.each( function() {
      
      var element = $(this)
      var original_offsets = element.data('original_position')
      
      $(this).css( {
        position: 'absolute',
        top: original_offsets.top,
        left: original_offsets.left
      } )
      
    } )
    
    var shuffled_elements = $('#shuffled').clone().shuffle().children('.element')
    
    var text_color = cloned_elements.first().css('background-color')
    
    Game.play_sound('card_shuffle')
    
    // Shuffling for one second, then pause for one second second, then fade out text in a half second
    // Total animation = 2500ms
    cloned_elements.each( function(i) {
    
      $(this).animate( {
        top: shuffled_elements.eq(i).css('top'),
        left: shuffled_elements.eq(i).css('left')
      }, 1000, 'easeInOutBack' )
    
    } )
    
    setTimeout( function() {
      fade_out_text(tick)
    }, 2500 )
  
  }
  
  var flip_card = function() {
  
    var clicked_card = $(this)
  
    if( clicked_card.equals(_flipped_in_table) || clicked_card.equals(_flipped_in_clone) || clicked_card.hasClass('matched') ) 
      return

    var is_clone = clicked_card.parent().is('#shuffled')

    reveal_card(clicked_card)

    if( is_clone ) {
      if( _flipped_in_clone ) reset_card(_flipped_in_clone)
      _flipped_in_clone = clicked_card
    }
    else {
      if( _flipped_in_table ) reset_card(_flipped_in_table)
      _flipped_in_table = clicked_card
    }

    evaluate_cards()

  }
  
  var reveal_card = function(card) {

    Game.play_sound('card_flip')

    var is_clone = card.parent().is('#shuffled')

    var text_color = card.css('borderTopColor')
    
    card.stop(true).animate( {color: text_color} )
  
  }
  
  var reset_card = function(card, delay) {
  
    var is_clone = card.parent().is('#shuffled')
  
    var text_color = ( is_clone ? 'black' : card.css('background-color') )
    
    if( !delay ) card.stop(true)
    
    card.animate( {color: text_color} )
  
  }
  
  var evaluate_cards = function() {

    if( !_flipped_in_table || !_flipped_in_clone ) return

    var match = (_flipped_in_table.data('atomic-number') == _flipped_in_clone.data('atomic-number'))

    if( match ) {
      show_match()
    } else {
      Game.play_sound('sorry_wrong')
      reset_card(_flipped_in_table, true)
      reset_card(_flipped_in_clone, true)
    }

    _flipped_in_clone = null
    _flipped_in_table = null
    
  }
  
  var show_match = function() {
  
    Game.play_sound('good_job')
  
    var in_table = $(_flipped_in_table).addClass('matched')
    var in_clone = $(_flipped_in_clone).addClass('matched')
    
    in_table
      .css( {zIndex: 100} )
      .animate( {transform: 'scale(3.5)'}, 400, 'easeOutCubic', function() {
  
        var atomic_number = in_table.data('atomic-number')
        $('<div />').addClass('atomic_number').text(atomic_number).appendTo(in_table).fadeIn(150)
    
        var element_name = in_table.data('element-name')
        var element_name_div = $('<div />').addClass('element_name').text(element_name).appendTo(in_table)
        if( element_name_div.width() > (in_table.width() - 10) )
          element_name_div.addClass('small')
        element_name_div.fadeIn(150)
  
      })
      .delay( 1200 )
      .animate( {transform: 'scale(1)'}, 400, 'easeInBack', function() {
        in_table.css( {zIndex: 'auto'} )
        var info_divs = in_table.children()
        info_divs.fadeOut(150, function() { info_divs.remove() })
        in_clone.animate( {transform: 'scale(0)'}, 150, function() {
          in_clone.remove()
        })
      })
  
  }
  
  var display_time = function() {
  
    var seconds = _time
    var minutes = Math.floor( seconds / 60 )
    var remainder = seconds - (minutes*60)
  
    if( minutes < 10 ) minutes = '0' + minutes
    if( remainder < 10 ) remainder = '0' + remainder
    
    _minutes_el.text( minutes )
    _seconds_el.text( remainder )
  
  }
  
  var tick = function() {
  
    if( _paused ) return
  
    var num_elements_remaining = $('#shuffled .element').length
  
    if( num_elements_remaining == 0 ) {
      level_complete()
      return
    }
    _time--
    display_time()
    if( _time > 0 ) {
      setTimeout(tick, 1000)
      // setTimeout(tick, 20)
    }
    else {
      game_over()
  //     level_complete()
    }
  }
  
  var level_complete = function() {
  

    var bonus = _time * 50
    _score = _score + bonus
    
    // Achievement
    if(_time / _total_time >= 0.5) {
      Game.unlock_achievement('periodic_memory_half_time', 'Speed Memory')
    }
    
    _level++

    if( _level >= _levels[_play_mode].length ) {
  
      User.save_score('periodic_memory', _score)

      Message.display( 'You won the entire game!', 4000 )
  
      fade_in_table_text()
  
      $('#periodic_table')
        .animate( {
          left: 90,
          top: 110
        }, 800 )
  
      $('#info').fadeOut(800)
    
    }
    else {
  
      // Message.display( 'Nice work! Let’s try another…', 1200 )

      $('#level_completed_message .alert').text('You did it with '+_time+' seconds remaining…\n'+bonus+' point bonus!').digits()
      Message.display($('#level_completed_message'), 4000)

      _chosen_elements.addClass('completed')
  
      setTimeout(start_level, 3000)
  
    }
  
    update_score()

  }
  
  var game_over = function() {

    User.save_score('periodic_memory', _score)

    Game.play_sound('game_over')

    $('#game_over_message .alert').html('You ran out of time. You lose.')
    Message.display($('#game_over_message'), -1)
  
    $('#shuffled').delay(1000).fadeOut(600)
  
  }
  
  var update_score = function() {
    var score_str = _score
    if( score_str < 10 ) score_str = '0' + score_str
    _score_el.text( score_str ).digits()
  }

  _play_mode_buttons.click(function() {
    _play_mode_buttons.removeClass('active')
    $(this).addClass('active')
    _play_mode = $(this).data('play-mode')
    setTimeout(function() {
      $('#splash img').trigger('click')
    }, 200)  
  })

  $('body').bind('dragstart selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  $('#game_over_message').click(function(){Game.show_high_scores()})

  Game.load_sounds([
    {
      id: 'card_flip',
      url: 'sounds/card_flip.mp3',
      volume: 50
    }, {
      id: 'card_shuffle',
      url: 'sounds/card_shuffle.mp3',
      volume: 50
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 50
    }, {
      id: 'good_job',
      url: 'sounds/good_job.mp3',
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 50
    }, {
      id: 'sorry_wrong',
      url: 'sounds/sorry_wrong.mp3',
      volume: 50
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
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
    }
  ])
  
  Game.load_images([
    'images/high_scores.png'
  ])
  
  $(Game).bind('pause', function(e, paused) {
    _paused = paused
    if( _paused ) {
      Message.display('PAUSED', -1)
    } else {
      Message.hide()
      tick()
    }
  })
  
  Game.start_gameplay = function() {
    Game.stop_sound('theme')
    Game.stop_sound('background').play_sound('background')
    $('.element.active').live('click', flip_card)
    build_table()
    start_game()
  }

  Game.show_high_scores = function() {
    var $high_scores = $('#high_scores')
    var $inner = $high_scores.children('.inner')
    $inner.empty()
    
    User.all_high_scores_for_game('periodic_memory', function(scores) {
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

})(jQuery)
