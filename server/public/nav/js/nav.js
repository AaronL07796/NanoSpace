;(function($) {
  var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false)
  
  var loader = $('#loading'),
      progress_bar = $('#loading .loading_progress span'),
      total_images = 0,
      total_assets = 0,
      assets_loaded = 0,
      fake_images,
      last_loaded_timeout = null,
      done_loading_images = false,
      done_loading_everything = false,
      IMAGES = [],
      _hall = $('#hall_area'),
      _outside = $('#outside_wrapper'),
      _current_area,
      _areas = $('.area'),
      _stages = _areas.children('.stage'),
      SOUNDS_DIR = 'nav/sounds/',
      MUTED = false,
      PLAYING_SOUNDS = [],
      PLAYING_AREA_EVENT = null,
      area_event_sound_timeout = null,
      SOUNDS =  [ { name: 'gate_to_hall',
                    type: 'transition',
                    volume: 75 },
                  { name: 'hall_to_park',
                    type: 'transition',
                    volume: 75 },
                  { name: 'park_to_hall',
                    type: 'transition',
                    volume: 75 },
                  { name: 'park_to_attraction',
                    type: 'transition',
                    volume: 75 },
                  { name: 'park_to_park_l2r',
                    type: 'transition',
                    volume: 100 },
                  { name: 'park_to_park_r2l',
                    type: 'transition',
                    volume: 100 },
                  { name: 'hall_to_motm',
                    type: 'transition',
                    volume: 100 },
                  { name: 'motm_to_hall',
                    type: 'transition',
                    volume: 100 },
                  { name: 'theater_to_hall',
                    type: 'transition',
                    volume: 100 },
                  { name: 'arcade_to_hall',
                    type: 'transition',
                    volume: 100 },
                  { name: 'hall_to_arcade',
                    type: 'transition',
                    volume: 100 },

                  { name: 'arcade',
                    type: 'background_loop' },
                  { name: 'theater',
                    type: 'background_loop' },
                  { name: 'materials',
                    type: 'background_loop' },
                  { name: 'dna',
                    type: 'background_loop' },
                  { name: 'gate',
                    type: 'background_loop' },
                  { name: 'h2o',
                    type: 'background_loop' },
                  { name: 'hall',
                    type: 'background_loop' },
                  { name: 'motm',
                    type: 'background_loop' },
                  { name: 'sizes',
                    type: 'background_loop',
                    volume: 100 },

                  { name: 'dna/helix_of_fortune',
                    type: 'area'},
                  { name: 'dna/replication_rush',
                    type: 'area'},
                  { name: 'dna/unravel_the_chromosome',
                    type: 'area'},
                  { name: 'h2o/h2o_ferris_wheel',
                    type: 'area'},
                  { name: 'h2o/h2o_parlor',
                    type: 'area'},
                  { name: 'h2o/quindecillionaire',
                    type: 'area'},
                  { name: 'materials/carbon_is_incredible',
                    type: 'area'},
                  { name: 'materials/periodic_memory',
                    type: 'area'},
                  { name: 'materials/polymer_chain_game',
                    type: 'area'},
                  { name: 'materials/whats_the_matter',
                    type: 'area'},
                  { name: 'sizes/cosmic_calculations',
                    type: 'area'},
                  { name: 'sizes/dimension_zone',
                    type: 'area'},
                  { name: 'sizes/mega_penny',
                    type: 'area'},
                  { name: 'sizes/micro_lab',
                    type: 'area'} ]

  // Set up soundManager stuff
  soundManager.url = '../../js/'
  soundManager.debugMode = false
  soundManager.wmode = 'transparent'
  soundManager.flashVersion = 9
  soundManager.useHTML5Audio = true
  soundManager.useFastPolling = false
  soundManager.useHighPerformance = false
  
  var load_sounds = function() {
    
    soundManager.onready(function() {
      if(!soundManager.supported()) return
      
      for(var i = 0, ii = SOUNDS.length; i < ii; i++) {
        if(SOUNDS[i].type == 'area') SOUNDS[i].area = SOUNDS[i].name.split('/')[0]

        var sound = { id:           SOUNDS[i].name,
                      url:          SOUNDS_DIR+SOUNDS[i].type+'s/'+SOUNDS[i].name+'.mp3',
                      volume:       SOUNDS[i].volume || 50,
                      loops:        SOUNDS[i].type == 'background_loop' ? 999999 : 1,
                      stream:       SOUNDS[i].type != 'transition',
                      autoLoad:     SOUNDS[i].type == 'transition' }
        
        if(SOUNDS[i].type == 'transition') sound.onload = item_loaded

        soundManager.createSound(sound)
      }
    })

  }
  
  // Play / Stop a sound
  var play_sound = function(sound_id, callback) {
    callback = callback || $.noop()

    try{
      if(typeof sound_id == 'object') {
        sound_id = sound_id[Math.floor(Math.random() * sound_id.length)]
      }

      soundManager.play(sound_id, {onfinish: callback})

      if(MUTED) {
        soundManager.mute(sound_id)
      }
    } catch(e){}
    return sound_id
  }
  
  var stop_sound = function(sound_id) { 
    try {
      soundManager.stop(sound_id)
    } catch(e){}
    return sound_id
  }

  var play_area_sounds = function(area) {
    area = ( $.type(area) == 'string' ? area : $(area).data('name') )

    PLAYING_SOUNDS.push(area)
    PLAYING_SOUNDS = $.distinct( PLAYING_SOUNDS )
    play_sound(area)

    play_an_area_event()
  }

  var play_an_area_event = function() {
    clearTimeout(area_event_sound_timeout)

    var area = _areas.filter('.outside.active').data('name')
    if(!area) return

    var event_sounds = []

    for(var i = 0; i < SOUNDS.length; i++) {
      if(SOUNDS[i].type && SOUNDS[i].type == 'area' && SOUNDS[i].area == area) {
        event_sounds.push(SOUNDS[i].name)
      }
    }

    PLAYING_AREA_EVENT = event_sounds[Math.floor(Math.random() * event_sounds.length)]

    area_event_sound_timeout = setTimeout( function() {
      play_sound(PLAYING_AREA_EVENT, function() {
        PLAYING_AREA_EVENT = null
        play_an_area_event()
      })
    }, parseInt( (Math.random() * 3000) + 2000, 10 ) )

  }

  var stop_area_sounds = function(area) {
    area = ( $.type(area) == 'string' ? area : $(area).data('name') )
    PLAYING_SOUNDS.push(PLAYING_AREA_EVENT)
    for(var i = 0; i < PLAYING_SOUNDS.length; i++) {
      fade_out_sound(PLAYING_SOUNDS[i], 0.5)
    }
    PLAYING_SOUNDS = []
    PLAYING_AREA_EVENT = null
  }

  var fade_out_sound = function(sound_id, duration, step) {
    if(!sound_id) return
    var s = soundManager.getSoundById(sound_id)
    if(!s) return
    if(typeof step === 'undefined') {
      if( s.readyState == 1 ) {setTimeout(function(){fade_out_sound(sound_id, duration, step)}, 20); return}
      step = 2.5 / duration
    }
    var vol = s.volume
    if (vol <= 0) {
      s.stop()

      var vol = 50
      for(var i = 0; i < SOUNDS.length; i++) {
        if(SOUNDS[i].name == sound_id && SOUNDS[i].volume) {
          vol = SOUNDS[i].volume
        }
      }

      s.setVolume(vol)
      return
  }
    s.setVolume(Math.max(0, vol+(-1*step)))
    setTimeout(function(){fade_out_sound(sound_id, duration, step)}, 20)
  }

  
  // Mute button callback
  var mute = function(e) {
    if(e) {
      MUTED = !MUTED
    } else {
      MUTED = ($.cookie('muted') == 'true')
    }

    if(!MUTED) {
      soundManager.unmute()
      for(var i = 0; i < SOUNDS.length; i++) {
        soundManager.unmute(SOUNDS[i])
      }
      $('#mute').removeClass('muted')
    } else {
      soundManager.mute()
      $('#mute').addClass('muted')
    }

    $.cookie('muted', MUTED+'', {path: '/'})
  }

  var begin_preloader = function() {
  
    fake_images = $('.img[data-src]')

    var fake_image_hrefs = fake_images.map(function() {
      return $(this).data('src')
    }).get()
  
    var background_hrefs = $('.area, .screen, #outside_wrapper').map(function() {
      var image_url = $(this).css('background-image')
      if(image_url != 'none') {
        return image_url.replace('url(','').replace(')','').replace(/"/g,'')
      }
    }).get()

    var alpha_hrefs = $('[data-alpha-src]').map(function() {
      return $(this).data('alpha-src')
    }).get()

    total_images = fake_image_hrefs.length + background_hrefs.length + alpha_hrefs.length
  
    var preload_images = function() {
      load_images(fake_image_hrefs)
      load_images(background_hrefs)
      load_images(alpha_hrefs)
    }
  
// console.log('X')
    if(soundManager.supported() && !iOS) {
// console.log('XX')
      var transition_sounds = 0
      for(var i = 0, ii = SOUNDS.length; i < ii; i++) {
        if(SOUNDS[i].type == 'transition') transition_sounds++
      }
      total_assets = total_images + transition_sounds
    } else {
// console.log('XXX')
      total_assets = total_images
      preload_images() 
    }

    soundManager.onready(function() {
// console.log('XXXX')
      mute()

      if(soundManager.supported() && $.cookie('muted') == 'true') {
        soundManager.createSound({
          id: 'loading',
          url: SOUNDS_DIR+'loading.mp3',
          autoPlay: true,
          onload: preload_images
        })
      } else {
        preload_images()
      }
    })

  }


  var load_images = function(images) {
    for(var i = 0, ii = images.length; i < ii; i++) {
      IMAGES[i] = new Image()
      IMAGES[i].onload = item_loaded
      IMAGES[i].src = images[i]
    }
  }
  
  
  var item_loaded = function() {
    clearTimeout(last_loaded_timeout)
    assets_loaded++
    
    loader.trigger('loading', [assets_loaded / total_assets])

    if(!done_loading_everything && assets_loaded >= total_assets) {
      done_loading_everything = true
      loader.trigger('loading_complete')
    } else if (!done_loading_images && assets_loaded >= total_images) {
      done_loading_images = true
      load_sounds()
    } else {
      last_loaded_timeout = setTimeout(kill_preloading, 6000)
    }
  }
  
  
  // This is called if preloading dies for some reason
  var kill_preloading = function() {
    loader.trigger('preload_killed')
    assets_loaded = total_assets
    item_loaded()
  }
  
  
  var convert_fake_images = function() {
  
    $('.img').each(function() {
      var fake_img = $(this),
      		img = $('<img />').attr('src', fake_img.data('src'))

			if( fake_img.is('a') ) {
				var link = $('<a />').attr('href', fake_img.attr('href').replace('_area','')).append(img)
				if( fake_img.attr('target') ) {
					link.attr('target', fake_img.attr('target'))
				}
				img = link
			}

			img[0].className = fake_img[0].className
			img.attr('id', fake_img.attr('id'))

			if( fake_img.data('parallax-factor') ) img.data('parallax-factor', fake_img.data('parallax-factor'))
			if( fake_img.hasClass('hide') ) img.hide()
			fake_img.replaceWith(img)      
    })
  
  }
  
  
  var prepare_and_show_park = function() {

    convert_fake_images()
    $('#park').trigger('images_ready')

    $('#loading .loading_message').text('All done!')
    
    loader.delay(1000).animate({top: '-50%'}, {duration: 800, easing: 'easeInBack'})
    fade_out_sound('loading', 3)

    $('#park').delay(1800).fadeIn(400, function() {
      $(window).bind('hashchange', process_hashchange).trigger('hashchange')
      $('#loading').remove()
      $(this).trigger('park_entered')
    })

  }
  
  
  var process_hashchange = function(e) {
  
    if(!done_loading_everything) return
  
    var hash = e.fragment || _areas.first().attr('id').split('_area')[0]
    
    // If it's a login token, not an area of the park
    if(hash.substring(0,2) == 't=') {
      hash = _areas.first().attr('id').split('_area')[0]
    }
    
    var last_area = _current_area
    var active_area = _areas.filter('#' + hash + '_area')
    _current_area = _areas.index(active_area)
        
    if ( typeof active_area != 'undefined' && (_current_area || typeof last_area != 'undefined') ) {
      show_area()
    }

    else {
      _current_area = 0      
      _areas.removeClass('active').first().addClass('active')
      show_area()
    }  
  }
  
  
  var show_area = function() {
  
    var old_area = _areas.filter('.active'),
        old_stage = old_area.children('.stage'),
        old_area_index = _areas.index(old_area),
        old_parallax = old_stage.children('.parallax'),

        new_area = _areas.eq(_current_area),
        new_stage = new_area.children('.stage'),
        new_parallax = new_stage.children('.parallax')
        
    document.title = new_area.data('area-title')
    
    // Fire off events at the beginning of a transition to…
    // …tell the outgoing area to stop the animation
    old_area.trigger('exit')
    // …tell the incoming area to prepare itself…
    new_area.trigger('enter')

    if(old_area_index != -1 && _current_area != -1) {

      if ( old_area.is('#hall_area') && new_area.is('.outside') ) {
        zoom_in()
      } else if ( new_area.is('#hall_area') && old_area.is('.outside') ) {
        zoom_out()
      } else if ( old_area.is('.outside') && new_area.is('.outside') ) {
        var direction = _current_area > old_area_index ? 'right' : 'left'
        slide(direction)
      } else if (old_area.is('#gate_area') && new_area.is('#hall_area')) {
        gate_zoom(new_area)
      } else if (old_area[0] == new_area[0]) {
        fade_in()
      } else {
        dip_to_black(new_area)
      }

    } else {
      fade_in()
    }

    _areas.removeClass('active').eq(_current_area).addClass('active')
    
  }


  var slide = function(dir) {

    var old_area = _areas.filter('.active'),
        old_stage = old_area.children('.stage'),
        old_attractions = old_stage.children('.parallax'),
  
        new_area = _areas.eq(_current_area),
        new_stage = new_area.children('.stage'),
        new_attractions = new_stage.children('.parallax')
  
    if( $.browser.real_safari ) {

			var win_width = $(window).width()
        	parallax_travel = 300,
					old_stage_destination =           ( dir == 'right' ? win_width * -1 : win_width ),
					new_stage_origin =                ( dir == 'right' ? win_width : win_width * -1 ),
					old_attraction_parallax_travel =  ( dir == 'right' ? ( parallax_travel * -1) : parallax_travel ),
					new_attraction_parallax_travel =  ( dir == 'right' ? parallax_travel :( parallax_travel * -1) )
	
			// Place new stage off screen, then turn on transitions, then show it.
			new_stage
				.unbind('webkitTransitionEnd')
				.css('webkitTransform', 'translate3d(' + new_stage_origin + 'px, 0, 0)')
				.addClass('transition')
				.one('webkitTransitionEnd', function() {
					new_stage.removeClass('transition').trigger('enter_complete')
				})
			
			new_attractions.each(function() {
				var $this = $(this)
				$this
					.unbind('webkitTransitionEnd')
					.css('webkitTransform', 'translate3d(' + $(this).data('parallax-factor') * new_attraction_parallax_travel + 'px, 0, 0)')
					.addClass('transition')
					.one('webkitTransitionEnd', function() {
						$this.removeClass('transition')
					})
			})
	
			new_area.show()
			new_stage.height()
			new_stage.css('webkitTransform', 'translate3d(0, 0, 0)')
			new_attractions.css('webkitTransform', 'translate3d(0, 0, 0)')
	
			old_stage
				.unbind('webkitTransitionEnd')
				.one('webkitTransitionEnd', function() {
					old_area.hide()
					old_stage.removeClass('transition').trigger('exit_complete')
				})
				.addClass('transition')
				.css('webkitTransform', 'translate3d(' + old_stage_destination + 'px, 0, 0)')
	
			old_attractions.each(function() {
				var $this = $(this)
				$this
					.unbind('webkitTransitionEnd')
					.one('webkitTransitionEnd', function() {
						$this.removeClass('transition')
					})
					.addClass('transition')
					.css('webkitTransform', 'translate3d(' + $this.data('parallax-factor') * old_attraction_parallax_travel + 'px, 0, 0)')
			 })


    }
    else {

			var old_stage_destination = ( dir == 'right' ? '-50%' : '150%' ),
					new_stage_origin =      ( dir == 'right' ? '150%' : '-50%' )
					
			new_area.show()
			new_stage.addClass('transition').stop(true).css('left', new_stage_origin).animate({left: '50%'}, 400, 'swing', function() {
				new_stage.trigger('enter_complete').removeClass('transition')
			})

			old_stage.addClass('transition').stop(true).animate({left: old_stage_destination}, 400, 'swing', function() {
				old_area.hide()
				old_stage.trigger('exit_complete').removeClass('transition')
			})

    }

    play_sound( 'park_to_park_' + (dir =='right' ? 'r2l' : 'l2r') )

  }


  var dip_to_black = function(new_area) {
    var old_area = _areas.filter('.active')

    old_area.animate( { opacity: 0 }, 600, 'swing', function() {
      if(old_area.is('.outside')) _outside.hide()
      old_area.hide().trigger('exit_complete')
      fade_in()
    })

    if (old_area.is('#gate_area') && new_area.is('#hall_area')) {
      play_sound('gate_to_hall')
    } else if (old_area.is('#hall_area') && new_area.is('#gate_area')) {
      play_sound('gate_to_hall')
    } else if (old_area.is('#theater_area') && new_area.is('#hall_area')) {
      play_sound('theater_to_hall')
    } else if (old_area.is('#arcade_area') && new_area.is('#hall_area')) {
      play_sound('arcade_to_hall')
    } else if (old_area.is('#hall_area') && new_area.is('#arcade_area')) {
      play_sound('hall_to_arcade')
    }
  }

  
  var fade_in = function() {

    var new_area = _areas.eq(_current_area)

    if(new_area.is('.outside')) {
      _outside
        .css('opacity', 0)
        .show()
      
      new_area.show()
      
      _outside.animate( { opacity: 1 }, 600, 'swing', function() {
        // Let new area know it can begin it's animations
        new_area.trigger('enter_complete')
      })
    } else {
  
      new_area
        .css('opacity', 0)
        .show()
        .animate( { opacity: 1 }, 600, 'swing', function() {
          // Let new area know it can begin it's animations
          new_area.trigger('enter_complete')
        })

    }

  }


  var zoom_in = function() {

    var new_area = _areas.eq(_current_area),
        doorway = _hall.find( '.' + new_area.attr('id').replace('_area','') ),
        zoom_duration = 600,
        door_slide_duration = 1000,
        zoom = 2,
        ground = _hall.find('.ground'),
        door = doorway.children('.door'),
        distant = doorway.children('.distant'),
        background = _hall.find('.background'),
        doorway_center = doorway.center()

    _outside.hide()
    new_area.show()
    
    var wrapper_offset = _outside.children('.area').index(new_area) * -100

    _hall.find('.door, .distant').hide()
    door.show()
    distant.show()
    ground.show()

    door.animate( { top: door.height() }, door_slide_duration, 'easeInOutQuint', function() {
      door.hide()
      ground.hide()      
      $('#motm').fadeOut()
    })
  
    var dest_x = doorway_center.x
    var dest_y = doorway_center.y
  
    var els_to_scatter = _hall.find('.vitrine, .people')
    
    els_to_scatter.each(function() {
  
      var el = $(this)
  
      var el_dist_to_dest_x = el.center().x - dest_x
      var el_dist_to_dest_y = el.center().y - dest_y
  
      var el_current_offset = el.position()
  
      el.delay(door_slide_duration).animate( {
        marginTop: el_current_offset.top + (el_dist_to_dest_y * 3),
        marginLeft: el_current_offset.left + (el_dist_to_dest_x * 3)
      }, zoom_duration, 'easeInQuint' )
      
    })

  
    background.delay(door_slide_duration).animate( {
      marginTop: background.position().top - doorway_center.y * (zoom - 1),
      marginLeft: background.position().left - doorway_center.x * (zoom - 1),
      width: background.width() * zoom
    }, zoom_duration, 'easeInQuint' )
    
    distant.delay(door_slide_duration).animate( {
      marginTop: distant.position().top - distant.center().y * (zoom - 1),
      marginLeft: distant.position().left - distant.center().x * (zoom - 1),
      width: distant.width() * zoom
    }, zoom_duration, 'easeInQuint' )
  
    _hall
      .css('opacity', 1)
      .delay(door_slide_duration)
      .animate( { opacity: 0 }, zoom_duration, 'easeInQuint', function() {
        _hall.hide()
        _hall.trigger('exit_complete')
        setTimeout(fade_in_parallax, 250)
      })
    
    play_sound('hall_to_park')

  }
  
  
  var zoom_out = function() {

    var old_area = _areas.filter('.active'),
        new_area = _areas.eq(_current_area),
        doorway = _hall.find( '.' + old_area.attr('id').replace('_area','') ),
        fade_out_duration = 800,
        zoom_duration = 600,
        door_slide_duration = 1000,
        zoom = 2,
        ground = _hall.find('.ground'),
        door = doorway.children('.door'),
        distant = doorway.children('.distant'),
        background = _hall.find('.background'),
        doorway_center = doorway.center()

    _hall.css('opacity', 0).show()
    door.css('top', door.height()).hide()
    distant.show()
    ground.hide()
        
    // Begin setting up the hallway to the zoomed-into-a-door state
    // with all of the objects scattered around
    var dest_x = doorway_center.x
    var dest_y = doorway_center.y
  
    var els_to_scatter = _hall.find('.vitrine, .people')
    
    els_to_scatter.each(function() {
  
      var el = $(this)
  
      var el_dist_to_dest_x = el.center().x - dest_x
      var el_dist_to_dest_y = el.center().y - dest_y
  
      var el_current_offset = el.position()
  
      el.css( {
        marginTop: el_current_offset.top + (el_dist_to_dest_y * 3),
        marginLeft: el_current_offset.left + (el_dist_to_dest_x * 3)
      } )
      
    })

    background.css( {
      marginTop: background.position().top - doorway_center.y * (zoom - 1),
      marginLeft: background.position().left - doorway_center.x * (zoom - 1),
      width: background.width() * zoom
    } )
    
    // Store the normal width of the door so we canl scale it back to normal as we zoom out
    var original_width_of_distant_view = distant.width()

    distant.css( {
      marginTop: distant.position().top - distant.center().y * (zoom - 1),
      marginLeft: distant.position().left - distant.center().x * (zoom - 1),
      width: distant.width() * zoom
    } )


    // Fade out the old area
    _outside.animate( { opacity: 0 }, fade_out_duration, 'swing', function() {
      _outside.hide()
      old_area.trigger('exit_complete')
    })

    
    // Zoom out by scaling the door an background back to their normal dimensions and positions
    _hall.delay(fade_out_duration).animate( {
      opacity: 1
    }, zoom_duration, 'easeOutQuint')

    distant.delay(fade_out_duration).animate( {
      marginTop: 0,
      marginLeft: 0,
      width: original_width_of_distant_view
    }, zoom_duration, 'easeOutQuint' )

    background.delay(fade_out_duration).animate( {
      marginTop: 0,
      marginLeft: 0,
      width: 1050
    }, zoom_duration, 'easeOutQuint' )
  

    els_to_scatter.delay(fade_out_duration).animate( {
      marginTop: 0,
      marginLeft: 0
    }, zoom_duration, 'easeOutQuint' )

    setTimeout(function() {
      ground.show()
      door.show().animate( { top: 0 }, door_slide_duration, 'easeInOutQuint', function() {
        old_area.hide()
        door.hide()
        distant.hide()
        $('#motm').fadeIn()
        _hall.trigger('enter_complete')
      })    
    }, fade_out_duration + zoom_duration)

    play_sound('park_to_hall')

  }


  var fade_in_parallax = function() {
  
    var new_area = _areas.eq(_current_area),
        new_stage = new_area.children('.stage'),
        new_parallax = new_stage.children('.parallax')
  

    _outside
      .css('opacity', 0)
      .show()

   	new_stage.css({
   		left: '50%',
   		webkitTransform: 'translate3d(0, 0, 0)'
   	})
    
    var stage_width = new_stage.width()
  
    new_parallax.each(function() {
      var el = $(this)
      var width = el.width()
      var left = parseInt( el.css('left'), 10 )
      var center_x = left - ( width / 2 )
      var dist_from_center = center_x - ( stage_width / 2 )
      el.css( {
        webkitTransitionDuration: '0s',
        webkitTransform: 'translate3d('+(dist_from_center*-.1)+'px, 0px, 0px)'
      } )
    })
    
    setTimeout(function() {
      new_parallax.css( {
        webkitTransitionTimingFunction: 'cubic-bezier(0, 1, 1, 1)',
        webkitTransitionDuration: '600ms',
        webkitTransform: 'translate3d(0px, 0px, 0px)'
      } )
    }, 0)

    new_area.show()
    
    _outside.animate( { opacity: 1 }, 400, 'swing', function() {
      // Let new area know it can begin it's animations
      new_area.trigger('enter_complete')
    })
  
  }


  var clean_up_hall = function() {

    var ground = _hall.find('.ground'),
        doors = _hall.find('.door'),
        distants = _hall.find('.distant'),
        background = _hall.find('.background')

    doors.hide()
    distants.hide()
    ground.hide()

    doors.css('top', 0)

    _hall.find('.vitrine, .people').css({
      marginTop: 0,
      marginLeft: 0
    })
    
    background.css({
      top: 0,
      left: 0,
      width: 'auto'
    })
    
    distants.css( {
      top: 0,
      left: 0,
      width: 'auto'
    })

  }
  
  
  var gate_zoom = function(new_area) {

    var $area = $('#gate_area'),
        $stage = $area.children('.stage')
        $attractions = $stage.children('.attractions')
        $dome = $stage.children('.dome')
  
    $attractions.addClass('slide_out')
    $dome.addClass('zoom_in')
    dip_to_black(new_area)

  }
  
  

  // USERS
  
  // Hide the form until we know whether they're logged in or not
  $('#user').attr('class', '')
  
  // Once the user has logged in, set up the badge, etc
  var onlogin = function() {
    $('#user').attr('class', 'logged_in')
    $('#user .login_form .password_input').val('')
    
    var symbol = PERIODIC_TABLE_SYMBOLS[User.num_achievements()]
    var element = PERIODIC_TABLE[symbol]
    
    $('#user_badge').attr('class', 'period-'+element.period)
    $('#user_badge .number').html(element.atomic_number)
    $('#user_badge .symbol').html(symbol)
    
    User.create_atom_face($('#user .atom_face'), 0.15)
    User.create_atom_face($('#user_badge .face'), 0.185)
  }
    
  // Setup some events
  $('#user .login_link').bind('click', function() {
    $('#user').attr('class', 'logging_in')
    $('#user .login_form .username_input').focus()
  })
  
  $('#user .logout_link').bind('click', function() {
    $('#user').attr('class', 'logged_out')
    User.logout()
  })
  
  $('#user .login_form .cancel_login_link').bind('click', function() {
    $('#user').attr('class', 'logged_out')
    $('#user .message').hide()
  })
  
  var toggle_user_badge = function(e) {
    e.preventDefault()
    e.stopPropagation()
    
    var initial_y = -188
    var final_y = 10
    
    if($('#user_badge').is(':visible')) {
      $('#user_badge').animate({top: initial_y, opacity: 0}, 250, function() {
        $('#user_badge').hide()
      })
      $(document).unbind('click', toggle_user_badge)
    } else {
      $('#user_badge').css({top: initial_y, display: 'block', opacity: 0})
                      .animate({top: final_y, opacity: 1}, 250)
      $(document).bind('click', toggle_user_badge)
    }
  }
  
  $('#user .atom_face').bind('click', toggle_user_badge)
  $('#user_badge .face').bind('mousedown', function() {
    window.location.href = '../attractions/atom_face/'
  })
  
  // Log in the user
  var do_login = function(e) {
    e.preventDefault()
    $('#user .message').hide()
    
    var username = $('#user .login_form .username_input').val()
    var password = $('#user .login_form .password_input').val()
    if(!username || !password) {
      $('#user .message').html('Please enter both a username and password.').show()
      return
    }
    
    $('#user').addClass('loading')
    User.login(username, password, {
      success: function() {
        $('#user').removeClass('loading')
        onlogin()
      },
      failure: function() {
        $('#user').removeClass('loading')
        $('#user .message').html('Invalid username or password.').show()
      }
    })
  }
  
  $('#user .login_submit_link').bind('click', do_login)
  $('#user .login_form').bind('submit', do_login)
  
  // Check to see if the user is already logged in
  User.resume_login({
    success: function() {
      onlogin()
    },
    failure: function() {
      $('#user').attr('class', 'logged_out')
    }
  })
  
  
  // USER SETTINGS
   $('#user .settings_link').bind('click', function() {
    $('#user_settings').fadeIn(500)
  })
  
  $('#user_settings .cancel').bind('click', function() {
    $('#user_settings').fadeOut(500)
  })
  
  $('#settings_form').bind('submit', function(e) {
    e.preventDefault()
    $('#settings_form .message').html('')
    
    var password = $('#settings_form .password input').val()
    var password_confirmation = $('#settings_form .password_confirmation input').val()
    
    if(!password || !password_confirmation) {
      $('#settings_form .message').html('Please fill in all the fields.')
      return
    }
    
    if(password != password_confirmation) {
      $('#settings_form .message').html('Your passwords do not match. Try entering them again.')
      return
    }
    
    $('#settings_form').addClass('loading')
    
    var user = {
      password: password,
      password_confirmation: password_confirmation
    }
    
    User.save(user, {
      success: function(user) {
        $('#user_settings').fadeOut(500)
        setTimeout(function(){$('#settings_form').removeClass('loading')}, 500)
      },
      
      failure: function(error) {
        $('#settings_form').removeClass('loading')
        var errors = []
        for(var field in error) errors.push(field + ' ' + error[field])
      $('#settings_form .message').html('Oops! ' + errors[0])
      }
    })
  })
  
  
  // USER SIGNUP FORM
  $('#user .signup_link').bind('click', function() {
    $('#user').fadeOut(500)
    $('#user_signup').fadeIn(500)
  })
  
  $('#user_signup_final .not_now').bind('click', function() {
    $('#user_signup_final').fadeOut(500)
  })
  
  $('#signup_form .cancel').bind('click', function() {
    $('#user_signup').fadeOut(500)
    $('#user').fadeIn(500)
  })
  
  $('#signup_form').bind('submit', function(e) {
    e.preventDefault()
    $('#user_signup .message').html('')
    
    var username = $('#signup_form .username input').val()
    var password = $('#signup_form .password input').val()
    var password_confirmation = $('#signup_form .password_confirmation input').val()
    
    if(!username || !password || !password_confirmation) {
      $('#user_signup .message').html('Please fill in all the fields.')
      return
    }
    
    if(password != password_confirmation) {
      $('#user_signup .message').html('Your passwords do not match. Try entering them again.')
      return
    }
    
    $('#user_signup').addClass('loading')
    
    var user = {
      name: username,
      password: password,
      password_confirmation: password_confirmation
    }
    
    User.create(user, {
      success: function(user) {
        $('#user_signup').fadeOut(500)
        $('#user').fadeIn(500)
        
        $('#user_signup_final .username').html(user.name)
        $('#user_signup_final').fadeIn(500)
        
        setTimeout(function(){$('#user_signup').removeClass('loading')}, 500)
        onlogin()
      },
      
      failure: function(error) {
        $('#user_signup').removeClass('loading')
        var errors = []
        for(var field in error) errors.push(field + ' ' + error[field])
      $('#user_signup .message').html('Oops! ' + errors[0])
      }
    })
  })
  
  
  // SHOW USER LOGIN ARROW?
  $('.area').bind('enter', function() {
    if($.cookie('reveal_login_arrow') == 'yes') {
      $.cookie('reveal_login_arrow', 'no', {path: '/'})
      setTimeout(function() {
        $('#user_login_arrow').stop()
        for(var i = 0; i < 4; i++) {$('#user_login_arrow').fadeIn().fadeOut()}
      }, 1000)
    } else {
      $('#user_login_arrow').stop().hide()
    }
      
  })
  
  
  // EVENTS
    _areas.bind({
      enter_complete: function() {
        play_area_sounds(this)
      },
      'exit video_playing transitioning_to_attraction': function() {
        stop_area_sounds(this)
      }
    })

    $('#motm').bind({
      motm_enter: function() {
        play_sound( 'hall_to_motm' )
        play_sound( 'motm' )
      },
      motm_enter_complete: function() {
        stop_sound( 'hall' )
      },
      motm_exit: function() {
        stop_sound( 'motm' )
        play_sound( 'motm_to_hall' )
        play_sound( 'hall' )
      }
    })

  $('#outside_wrapper map area.has_spotlight.attraction').click(function() {
    play_sound('park_to_attraction')
  })

  $('#viewbox').live({
    enter_viewbox: function() {
      stop_area_sounds( _areas.filter('.active') )
    },
    exit_viewbox: function() {
      play_area_sounds( _areas.filter('.active') )
    }
  })

  $('#mute').click(mute)

  _hall.bind('enter', clean_up_hall)  
  
  loader.bind({
    loading: function(e, percent_complete) {
      progress_bar.css('width', parseInt(percent_complete * 100, 10)+'%')
    },
    loading_complete: prepare_and_show_park
  })
  
  $(window).bind( {
    load: begin_preloader,
    unload: $.noop
  } )

})(jQuery);

;(function($) {

	var $outside_areas = $('#outside_wrapper .area'),
			$nav_map_areas = $outside_areas.find('.show_nav_label')
	
	var show_related_label = function() {
		var area = $(this).closest($outside_areas)
		var label_name = this.href.split('#')[1]
		var related_label = area.find('.nav_label').filter('.'+label_name)

    if ($.support.opacity )
  		related_label.stop().css(	{opacity: 0, display: 'block', bottom: 75} ).animate( {opacity: 1, bottom: 65}, 200 )
    else
      related_label.show()
	}
	
	var hide_related_label = function() {
		var area = $(this).closest($outside_areas)
		var label_name = this.href.split('#')[1]
		var related_label = area.find('.nav_label').filter('.'+label_name)

    if ($.support.opacity )
  		related_label.stop().animate(	{opacity: 0, bottom: 75}, 200)
    else
      related_label.hide()
	}
	
	var hide_all_labels = function() {
		$outside_areas.find('.nav_label').hide()
	}
	
	$nav_map_areas.hover(show_related_label, hide_related_label)
	$outside_areas.bind('enter', hide_all_labels)

})(jQuery);

// Display achievement animation
var show_achievement = function(message, callback) {
  // alert('ACHIVEMENT: '+message)
  // if(typeof callback == 'function') callback()
}


// Unlock an achievement
var unlock_achievement = function(label, message, callback) {
  User.unlock_achievement(label, {
    new_achievement: function() {
      show_achievement(message, callback)
    },
    existing_achievement: callback
  })
}

if( $.browser.msie ) {
  $('#park').bind('images_ready', function() {
    $('*').attr({
      tabindex: '-1'
    })
    $('area').attr({
      hideFocus: 'hidefocus',
    })
  })

}
