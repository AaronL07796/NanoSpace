window._area = 'h2o'
window._attraction = 'h2o_ferris_wheel'

var supports_css3

$(function() {
  supports_css3 = typeof Modernizr != 'undefined' && Modernizr.csstransitions && Modernizr.cssanimations
})

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var _stage = $('#stage'),
      _wheel = $('#wheel'),
      _orange_arrows_container = $('#orange_arrows_container'),
      _orange_arrows = $('#orange_arrows'),
      _molecules_container = $('#water_molecules'),
      _molecules,
      _molecule_paths = [],
      _precipitation = $('.precipitation'),
      _waves = $('.wave'),
      _wheel_rotate_time = 40000,
      _wheel_fade_time = 800,
      _evaporation = $('#evaporation'),
      _squiggles = _evaporation.children('.squiggles'),
      _squiggles_timeout,
      _magnifiers = $('.magnifier'),
      _labels = $('.label'),
      _sounds = [ 'gas',
                  'condensation',
                  'solid',
                  'precipitation',
                  'liquid',
                  'evaporation' ]


  
  var setup = function() {
    $('.img').each(function() {
      var fake_img = $(this),
          img = $('<img />').attr('src', fake_img.data('src'))
      fake_img.replaceWith(img)      
    })

    create_water_molecule()
    $('map area').hover(  function() {
                            _stage.addClass('active')
                            var index = $(this).data('mag-num') - 1
                            _magnifiers.eq(index).addClass('active').trigger('enter')
                            _labels.removeClass('active').eq(index).addClass('active')
                            Game.play_sound(_sounds[index])
                          },
                          function() {
                            _stage.removeClass('active')
                            var index = $(this).data('mag-num') - 1
                            _magnifiers.eq(index).removeClass('active').trigger('exit')
                            _labels.eq(index).removeClass('active')
                            Game.stop_sound(_sounds[index])
                          } )
    if( supports_css3 ) return
    revolve_molecules(true)
    rotate_wheel(true)
    animate_waves()
    $('map area').hover(show_mag, hide_mag)
  }
  
  
  var create_water_molecule = function() {

    var radius = ($.browser.webkit ? 460 : 230)
  
    for( var i = 0; i < 32; i++ ) {
      
      // Create molecules DIVs
      $('<div />').data('num', i).appendTo( _molecules_container )

      // Build and store the paths for animating each of the molecules
      _molecule_paths.push( new $.path.arc( { center: [0,0],
                                              radius: radius,
                                              start:  i * 11.25,
                                              end:    (i * 11.25) + 360 } ) )

    }

    _molecules = _molecules_container.children( 'div' )
    
    // Set their initial position
    _molecules.each(function(i) {
      $(this).animate(  { path:     _molecule_paths[i] },
                        { duration: 0 } )
    })

  }
  
  
  var rotate_wheel = function(state) {

    if( state && !_wheel.hasClass('active') ) {
      _wheel
        .addClass('active')
        .css( { display: 'block',
                opacity: 0.0 } )
        .animate( { opacity:  1.0 },
                  { duration: _wheel_fade_time,
                    queue:    false } )
    }
    
    else if ( !state ) {
      _wheel
        .removeClass('active')
        .animate( { opacity:  0.0 },
                  { duration: _wheel_fade_time,
                    queue:    false,
                    complete: function(){_wheel.hide()} } )
    }

    _wheel.animate( { transform:  'rotate(360deg)' },
                    { duration:   _wheel_rotate_time,
                      easing:     'linear',
                      complete:   function() {
                                    if( _wheel.hasClass('active') )
                                      rotate_wheel(true)
                                  } } )

  }
  
  
  // The 32 water molecules’s positions rotate along with the wheel
  var revolve_molecules = function(state) {

    if( state && !_molecules_container.hasClass('active') ) {
      _molecules_container
        .addClass('active')
        .css( { display: 'block',
                opacity: 0.3 } )
        .animate( { opacity:  1.0 },
                  { duration: _wheel_fade_time,
                    queue:    false } )
    }
    
    else if ( !state ) {
      _molecules_container
        .removeClass('active')
        .animate( { opacity:  0.3 },
                  { duration: _wheel_fade_time,
                    queue:    false } )
    }

    _molecules.each(function(i) {

      var on_complete = function() {
        if( i == 31 && _molecules_container.hasClass('active') ) {
          revolve_molecules(true)
        }
      }
      
      $(this).animate(  { path:     _molecule_paths[i] },
                        { duration: _wheel_rotate_time,
                          easing:   'linear',
                          complete: on_complete } )

    })

  }
  
  
  var rotate_orange_arrows = function(state) {

    if( state ) {

      _orange_arrows_container.stop(true).css( 'opacity', 0 ).animate(  { opacity:  1.0 },
                                                                        { duration: _wheel_fade_time } )

      _orange_arrows.stop(true).css('transform', 'rotate(0deg)').animate( { transform:  'rotate(360deg)' },
                                                                          { duration:   5600,
                                                                            easing:     'linear',
                                                                            complete:   function() {
                                                                                          rotate_orange_arrows(true)
                                                                                        } } )
    }
    
    else {
      _orange_arrows_container.stop(true).css( 'opacity', 0 )
      _orange_arrows.stop(true)
    }
  
  }
  
  
  var animate_precipitation = function(state) {

    if( state ) {
      _precipitation.addClass('active').stop( true ).css( { top: -50 } ).animate( { top: 30 },
                                                                                  { duration: 1400,
                                                                                    easing:   'linear',
                                                                                    complete: function() {
                                                                                      if( _precipitation.hasClass('active') )
                                                                                        animate_precipitation(true)
                                                                                    } } )
    }
    
    else {
      _precipitation.removeClass('active').stop( true ).css( { top: -50 } )
    }

  }


  var animate_evaporation = function(state) {
  
    if( state && !_evaporation.hasClass('active') ) {
      _evaporation
        .addClass('active')
        .animate( { opacity:  1.0 },
                  { duration: _wheel_fade_time,
                    queue:    false } )
    }
    
    else if ( !state ) {
      _evaporation
        .removeClass('active')
        .animate( { opacity:  0.0 },
                  { duration: _wheel_fade_time,
                    queue:    false } )
    }

    _squiggles.animate( { backgroundPositionY:  '-=45' },
                        { duration:             _wheel_fade_time,
                          easing:               'linear',
                          complete:             function() {
                                                  if( _evaporation.hasClass('active') )
                                                    animate_evaporation(true)
                                                } } )
  
  }
  
  
  var show_mag = function() {
    _labels.stop(true).css('opacity', 0).filter('.active').delay(400).fadeTo(_wheel_fade_time, 1)
    rotate_orange_arrows(true)
    animate_precipitation(true)
    animate_evaporation(true)
    revolve_molecules(false)
    rotate_wheel(false)
  }
  
  
  var hide_mag = function() {
    _labels.stop(true).css('opacity', 0)
    rotate_wheel(true)
    revolve_molecules(true)
    rotate_orange_arrows(false)
    animate_precipitation(false)
    animate_evaporation(false)
  }
  
  
  var animate_waves = function() {

    _waves.each(function(i) {
    
      var $this = $(this)
      

      var animate_this_wave = function(wave) {

        wave
          .clearQueue()
          .animate( { marginTop:  wave.data('wave-height') },
                    { duration:   1000,
                      easing:     'linear' } )
          .animate( { marginTop:  0 },
                    { duration:   600,
                      easing:     'linear',
                      complete:   function() {animate_this_wave(wave)} } )
  
      }
      
      setTimeout( function() {
        animate_this_wave($this)
      }, (_waves.length - i - 1) * 180 )
    
    })

  }
  
  $(window).load(setup)

  Game.load_sounds([
    {
      id: 'gas',
      url: 'sounds/gas.mp3',
      volume: 50
    }, {
      id: 'condensation',
      url: 'sounds/condensation.mp3',
      volume: 50
    }, {
      id: 'solid',
      url: 'sounds/solid.mp3',
      volume: 50
    }, {
      id: 'precipitation',
      url: 'sounds/precipitation.mp3',
      volume: 50
    }, {
      id: 'liquid',
      url: 'sounds/liquid.mp3',
      volume: 50
    }, {
      id: 'evaporation',
      url: 'sounds/evaporation.mp3',
      volume: 50
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 35
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 35
    }
  ])
  
  
  Game.load_images(['images/alpha.png',
                    'images/arrow_heads.png',
                    'images/background.png',
                    'images/ferris_wheel.png',
                    'images/land.png',
                    'images/magnifier_fill.png',
                    'images/magnifier.png',
                    'images/orange_arrows.png',
                    'images/rain.png',
                    'images/snow.png',
                    'images/squiggles.png',
                    'images/water_molecule.png',
                    'images/wave_1.png',
                    'images/wave_2.png',
                    'images/wave_3.png',
                    'images/wave_4.png',
                    'images/wave_5.png',
                    'videos/gas.gif',
                    'videos/condensation.gif',
                    'videos/solid.gif',
                    'videos/precipitation.gif',
                    'videos/liquid.gif',
                    'videos/evaporation.gif'])


  Game.start_gameplay = function() {
    Game.stop_sound('theme')
    Game.play_sound('background')
  }


  Game.initialize()
  
  
})