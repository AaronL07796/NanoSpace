var Game = function() {
  
  var THIS = {}
  
  var GAMEPLAY_STARTED = false
  
  
  // This function gets overridden by each individual game,
  // and ultimately gets called when the user closes the splash screen and all preloading is finished.
  THIS.start_gameplay = function(){}
  
  
  // Set up soundManager stuff
  soundManager.url = '../../js/'
  soundManager.debugMode = false
  soundManager.wmode = 'transparent'
  soundManager.flashVersion = 9
  soundManager.useHTML5Audio = false
  soundManager.useFastPolling = false
  soundManager.useHighPerformance = false
  
  
  // Preloader callback - This gets called whenever an asset has loaded.
  var ITEMS_LOADED = 0
  var LAST_LOADED_TIMEOUT = null
  var DONE_LOADING = false
  
  var item_loaded = function() {
    clearTimeout(LAST_LOADED_TIMEOUT)
    ITEMS_LOADED++
    var num_items = NUM_SOUNDS + NUM_IMAGES
    
    $(THIS).trigger('loading', [ITEMS_LOADED / num_items])
    
    if(ITEMS_LOADED >= num_items) {
      DONE_LOADING = true
      $(THIS).trigger('load')
    } else {
      LAST_LOADED_TIMEOUT = setTimeout(kill_preloading, 6000)
    }
  }
  
  
  // This is called if preloading dies for some reason.
  // Instead of preventing the game from continuing, we just pretend preloading has finished.
  var kill_preloading = function() {
    $(THIS).trigger('preload_killed')
    ITEMS_LOADED = NUM_SOUNDS + NUM_IMAGES
    item_loaded()
  }
  
  
  // Load sounds - This loads them into soundManager, and preloads them.
  var NUM_SOUNDS = 0
  var MUSIC_MUTEABLE_SOUNDS = []
  
  THIS.load_sounds = function(sounds) {
    var sound = {}
    
    for(var i = 0, ii = sounds.length; i < ii; i++) {
      if(!sounds[i].stream) NUM_SOUNDS++
    }
    
    soundManager.onready(function() {
      if(!soundManager.supported()) return
      
      for(var i = 0, ii = sounds.length; i < ii; i++) {
        sound = sounds[i]
        sound.multiShot = true
        sound.autoLoad = true
        
        if(!sound.stream) sound.onload = item_loaded
        
        if(sound.music_muteable && sound.id) {
          MUSIC_MUTEABLE_SOUNDS.push(sound.id)
        }
        
        soundManager.createSound(sound).dialog = sound.dialog
      }
    })
  }
  
  
  // Load images (i.e. preload them)
  var IMAGES = []
  var NUM_IMAGES = 0
  
  THIS.load_images = function(images) {
    for(var i = 0, ii = images.length; i < ii; i++) {
      IMAGES[i] = new Image()
      IMAGES[i].onload = item_loaded
      IMAGES[i].src = images[i]
      NUM_IMAGES++
    }
  }
  
  
  // Play / Stop a sound
  THIS.play_sound = function(sound_id) {
    try{
      if(typeof sound_id == 'object') {
        sound_id = sound_id[Math.floor(Math.random() * sound_id.length)]
      }

      soundManager.play(sound_id)

      if(MUTED || (MUSIC_MUTED && MUSIC_MUTEABLE_SOUNDS.indexOf(sound_id) != -1)) {
        soundManager.mute(sound_id)
      }
    } catch(e){}
    return THIS
  }
  
  THIS.stop_sound = function(sound_id) { 
    try {
      soundManager.stop(sound_id)
    } catch(e){}
    return THIS
  }
  
  THIS.fade_in_sound = function(sound_id, duration, step) {    
    if(MUTED || (MUSIC_MUTED && MUSIC_MUTEABLE_SOUNDS.indexOf(sound_id) != -1)) {
      soundManager.play(sound_id)
      soundManager.mute(sound_id)
      return
    }
    
    var s = soundManager.getSoundById(sound_id)
    
    if( typeof step === 'undefined' ) {
      if( s.readyState == 1 ) {setTimeout(function(){THIS.fade_in_sound(sound_id, duration, step)}, 20); return}
      step = 2.5 / duration
      s.setVolume(0)
      s.play()
    }
    var vol = s.volume
    if( vol >= 50 ) return
    s.setVolume(Math.min(50, vol+step))
    setTimeout(function(){THIS.fade_in_sound(sound_id, duration, step)}, 20)
  }
  
  THIS.fade_out_sound = function(sound_id, duration, step) {
    var s = soundManager.getSoundById(sound_id)
    if(typeof step === 'undefined') {
      if( s.readyState == 1 ) {setTimeout(function(){THIS.fade_out_sound(sound_id, duration, step)}, 20); return}
      step = 2.5 / duration
    }
    var vol = s.volume
    if (vol <= 0) {
      s.stop()
      s.setVolume(50)
      return
  }
    s.setVolume(Math.max(0, vol+(-1*step)))
    setTimeout(function(){THIS.fade_out_sound(sound_id, duration, step)}, 20)
  }
  
  
  // Preloading progress bar
  $(THIS).bind('loading', function(e, percent_complete) {
    $('#loading .progress').css('width', (100*percent_complete)+'%')
  })
  
  
  // When preloading has finished, start the game
  $(THIS).bind('load', function(e, percent_complete) {
    $('#loading').clearQueue().fadeOut(200)
    if(!SPLASH_TRIGGERED && !GAMEPLAY_STARTED) {
      $('#splash').fadeOut(200)
      start_game()
    }
  })
  
  
  // Display achievement animation
  var _achievement_timeout = null
  
  var show_achievement = function(message, callback) {
    var num_achievements = User.num_achievements()
    if(num_achievements < 1) num_achievements = 1
    var symbol = PERIODIC_TABLE_SYMBOLS[num_achievements]
    var element = PERIODIC_TABLE[symbol]
    
    var achievement_elem = $('\
    <div id="user_achievement"> \
      <div class="inner"> \
        <h2>CONGRATULATIONS!</h2> \
        <div id="user_badge"> \
          <a class="face" href="javascript:;"></a> \
          <span class="number"></span> \
          <span class="symbol"></span> \
        </div> \
        <div class="achievement_message"></div> \
        <div class="element_status">Your element status is now: <span></span></div> \
      </div> \
    </div> \
    ')
    
    achievement_elem.hide().appendTo('body')
    
    $('#user_achievement .achievement_message').html(message)
    
    User.create_atom_face($('#user_badge .face'), 0.185)
    $('#user_badge').attr('class', 'period-'+element.period)
    $('#user_badge .number').html(element.atomic_number)
    $('#user_badge .symbol').html(symbol)
    
    $('#user_achievement .element_status span').html(element.name)
    
    var hide_achievement = function() {
      clearTimeout(_achievement_timeout)
      $('body').unbind('click', hide_achievement)
      achievement_elem.fadeOut(250, function() {
        achievement_elem.remove()
      })
    }
    $('body').bind('click', hide_achievement)
    _achievement_timeout = setTimeout(hide_achievement, 5000)
    
    achievement_elem.fadeIn()
    
    if(typeof callback == 'function') callback()
  }
  
  
  // Unlock an achievement
  THIS.unlock_achievement = function(label, message, callback) {
    User.unlock_achievement(label, {
      new_achievement: function() {
        show_achievement(message, callback)
      },
      existing_achievement: callback
    })
  }
  
  
  // Mute button callback
  var MUTED = false
  var MUSIC_MUTED = false
  
  var mute = function(e) {
    if(e) {
      var elem = $(e.currentTarget)
      
      if(elem.data('mute') == 'music') {
        MUSIC_MUTED = !MUSIC_MUTED
      } else {
        MUTED = !MUTED
      }
    }
    
    $('#header .mute_buttons').removeClass('muted').removeClass('music_muted')
    
    if(!MUTED) soundManager.unmute()
    
    if(MUSIC_MUTED) {
      $('#header .mute_buttons').addClass('music_muted')
      for(var i = 0; i < MUSIC_MUTEABLE_SOUNDS.length; i++) {
        soundManager.mute(MUSIC_MUTEABLE_SOUNDS[i])
      }
    } else {
      for(var i = 0; i < MUSIC_MUTEABLE_SOUNDS.length; i++) {
        soundManager.unmute(MUSIC_MUTEABLE_SOUNDS[i])
      }
    }
    
    if(MUTED) {
      $('#header .mute_buttons').addClass('muted')
      soundManager.mute()
    }
    
    $.cookie('muted', MUTED+'', {path: '/'})
    $.cookie('music_muted', MUSIC_MUTED+'', {path: '/'})
  }
  
  
  // Show the splash image
  var SPLASH_TRIGGERED = false
  var show_splash = function() {
    $('body').removeClass('revealed')
    
    if($('#splash').length == 0) {
      $('body').addClass('no_scroll')
      $('#loading').hide()
      trigger_splash()
      return
    }
    
    SPLASH_TRIGGERED = true
    
    $('#splash img').show().click(trigger_splash).mousedown(function() {return false})
    
    $('body').addClass('no_scroll')
    $('#loading').hide()
    soundManager.onready(function(){if(SPLASH_TRIGGERED) THIS.play_sound('theme')})
  }
  
  
  // Close the splash image
  var trigger_splash = function() {
    $('#splash img').unbind('click')
    SPLASH_TRIGGERED = false
    
    // No preloading necessary?
    if(NUM_SOUNDS + NUM_IMAGES == 0) item_loaded()
    
    if(DONE_LOADING && !GAMEPLAY_STARTED) {
      $('#loading').fadeOut(100)
      $('#splash').fadeOut(200)
      start_game()
    } else {
      $('#loading').fadeIn(100)
    }
  }
  
  
  // Pause / Unpause the game
  var muted_before_pause = false
  var music_muted_before_pause = false
  
  var pause = function(do_mute) {
    if(SPLASH_TRIGGERED) return
    if(typeof THIS.can_pause == 'function' && !THIS.can_pause()) return
    if(typeof do_mute == 'undefined') do_mute = true
    
    // Unpause
    if($('#header .pause_button').hasClass('paused')) {
      if(do_mute) {
        MUTED = muted_before_pause ? true : false
        MUSIC_MUTED = music_muted_before_pause ? true : false
      }
      $('#header .pause_button').removeClass('paused')
      $(THIS).trigger('pause', [false])
    
    // Pause
    } else {
      if(do_mute) {
        muted_before_pause = MUTED ? true : false
        music_muted_before_pause = MUSIC_MUTED ? true : false
        MUTED = true
        MUSIC_MUTED = true
      }
      $('#header .pause_button').addClass('paused')
      $(THIS).trigger('pause', [true])
    }
    
    if(do_mute) mute(null)
  }
  
  
  var open_instructions = function() {
    pause(false)
    SPLASH_TRIGGERED = true
    $('#splash').fadeIn(0)
    $('body').removeClass('revealed')
    $('#splash').bind('click', close_instructions)
  }
  
  
  var close_instructions = function() {
    SPLASH_TRIGGERED = false
    pause(false)
    $('#splash').fadeOut(200)
    $('body').addClass('revealed')
    $('#splash').unbind('click', close_instructions)
  }
  
  
  
  // Start the game!
  var start_game = function() {
    GAMEPLAY_STARTED = true
    if(!USER_LOADED) return
    
    $('#high_scores').hide()
    
    // Show instructions (splash) button
    $('#header .open_instructions').click(function() {
      if(typeof THIS.should_open_instructions == 'function' && !THIS.should_open_instructions()) return;
      if(!$('#splash').is(':visible')) {
        open_instructions()
      } else {
        close_instructions()
      }
    })
    
    $('body').removeClass('no_scroll').addClass('revealed')
    THIS.start_gameplay()
    $(THIS).trigger('game_started')
  }
  
  
  // This function is called by each game, whenever it's ready to start.
  THIS.initialize = function() {
    // Is there a pause button?
    if($('#header .pause_button').length > 0) {
      $('#header .pause_button').click(pause)
      $(document).keypress(function(e){if(e.which == 112) pause()})
    }
    
    $('#header .mute_buttons a').click(mute)
    if($.cookie('music_muted') == 'true') $('#header .mute_buttons .mute_music').click()
    if($.cookie('muted') == 'true') $('#header .mute_buttons .mute').click()
    
    show_splash()
  }
  
  
  // Wait until the user has loaded before continuing to the game
  var USER_LOADED = false
  if(typeof User == 'undefined') {
    USER_LOADED = true
    
  } else {
    User.resume_login({complete: function() {
      USER_LOADED = true
      
      User.logged_in() ? $('#high_scores .log_in_message').hide() : $('#high_scores .log_in_message').show()
      
      if(typeof Game.on_resume_login == 'function') Game.on_resume_login()
      if(GAMEPLAY_STARTED) start_game()
    }}) 
  } 
  
  return THIS
}()


$(function() {
  $('#go_to_login').bind('mousedown', function() {
    $.cookie('reveal_login_arrow', 'yes', {path: '/'})
    return true
  })
})


// Area Achievements
$(function() {
  var attractions_per_area = {
    arcade: 5,
    h2o: 4,
    materials: 4,
    sizes: 4,
    dna: 4
  }
  
  var area_names = {
    arcade: 'The Arcade',
    h2o: 'The H2O Park',
    materials: 'Material Boulevard',
    sizes: 'Universal Dimensions',
    dna: 'DNA land'
  }
  
  setTimeout(function() {
    if(!window._area || !window._attraction) return
    var achievement = 'all_'+window._area
        
    var attractions = []
    if($.cookie(achievement)) {
      attractions = $.cookie(achievement).split(',')
    }
        
    if(attractions.indexOf(window._attraction) == -1) {
      attractions.push(window._attraction)
      $.cookie(achievement, attractions.join(','), {path: '/'})
      if(attractions.length >= attractions_per_area[window._area]) {
        Game.unlock_achievement(achievement, 'Expert - '+area_names[window._area])
      }
    }
    
  }, 3000)
})
