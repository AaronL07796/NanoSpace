window._area = 'materials'
window._attraction = 'carbon_is_incredible'

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
    
  var VELOCITY = 0.5
  
  var MOVING = false
  var LAST_TIME = null
  
  var CONTAINER = $('#container')
  var FLOOR = $('#floor')
  var SKY = $('#sky')
  var TUBE = $('#tube')
  var MOLECULE = $('#floor .molecule')
  
  var WIDTH = CONTAINER.width()
  var HEIGHT = CONTAINER.height()
  var MOLECULE_HEIGHT = MOLECULE.height()
  
  var SKY_MOVEMENT = 0.185
  var SKY_GRADIENT_HEIGHT = 3000
  
  var BACKGROUND_POS = 0
  var SKY_BACKGROUND_POS = HEIGHT - SKY_GRADIENT_HEIGHT
  var FLOOR_POS = 0
  
  var STOP_ON_NEXT_FLOOR = false
  
  var CURRENT_FLOOR = 0
  var NEXT_FLOOR = null
  
  var MOVING_DURATION = 3000
  var DISTANCE_BETWEEN_FLOORS = 1500
  
  var START_MOVING_TIME = 0
  var MOVING_TIME = 0
  
  var MOLECULE_NUM_FRAMES = [null, null, 50, 50, 50, 50, 50, 50, 50] // Number of movie frames, indexed by floor number
  
  var FLOOR_TEXT_INTERVAL = 7000
  var FLOOR_TEXT = [
    null,
    [
      'Lobby - Please Choose a Floor'
    ],[
      "Carbon is an incredible element that is found everywhere on Earth.",
      "Each carbon atom can bond with up to four other atoms...",
      "...giving it the ability to form an incredible diversity of molecules and materials.",
      "Carbon is the foundation of the molecules that make all life...",
      "...as well as nonliving things, from coal to plastics to gasoline.",
      "Pure carbon takes different forms which have very different properties...",
      "...determined by the organization of the carbon atoms."
    ],[
      "Amorphous carbon does not have an ordered crystalline structure.",
      "Amorphous means without a clearly defined shape or form.",
      "Coal and soot are forms of amorphous carbon."
    ],[
      "Diamond is a form of pure carbon.",
      "Diamond's atoms are organized in a rigid crystal lattice structure.",
      "All the atoms in diamond are bonded to four others.",
      "Diamond is incredibly hard because of it’s atomic organization.",
      "Diamond is dazzling because of this organization.",
      "Diamond has the highest lattice density of any material.",
      "Diamond has the highest melting point of any material.",
      "Diamond has the highest tensile strength of any material.",
      "Diamond conducts heat five times better than silver."
    ],[
      "Graphite is a form of pure carbon.",
      "Graphite has a layered, planar structure.",
      "Graphite's atoms bond in an organized hexagonal grid.",
      "Graphite's individual layers are called graphene.",
      "Graphite's layers are weakly bonded to one another.",
      "Graphite is soft because of its layered organization.",
      "Graphite is a good lubricant because of this organization."
    ],[
      "Graphene is a single, one-atom-thick layer of carbon atoms.",
      "Graphene's atoms bond in a hexagonal grid similar to chicken wire.",
      "Graphene is an excellent electrical conductor.",
      "Graphene is the thinnest possible material.",
      "Graphene is a basic structural element of graphite and carbon nanotubes."
    ],[
      "Fullerenes are a form of pure carbon.",
      "Fullerenes have a cylindrical, spherical or ellipsoidal atom arrangement.",
      "Fullerenes were discovered on Earth in 1985.",
      "Fullerenes were discovered in outer space in 2010.",
      "Fullerenes are commonly called Buckyballs.",
      "Fullerenes were named after R. Buckminster Fuller.",
      "Fullerenes called C<sub>60</sub> look similar to a soccer ball.",
      "Fullerenes have potential as drug delivery vessels.",
      "Fullerenes can make scanning tunneling microscope tips."
    ],[
      "Nanotubes are a form of pure carbon.",
      "Nanotubes are cylindrical molecules of carbon.",
      "Nanotubes have incredible tensile strength.",
      "Nanotubes with 1 wall are close to 1 nanometer in diameter.",
      "Nanotubes can have multiple walls (coaxial tubes) of graphene.",
      "Nanotubes can be up to several centimeters in length.",
      "Nanotubes have a structure like graphene wrapped in a seamless cylinder.",
      "Nanotubes have can be conductors, semicondutors or superonductors based on their atom organization."
    ],
    null
  ]
  
  
  var initialize_floor_text = function(level_i) {
    var floor_text = FLOOR_TEXT[level_i] ? FLOOR_TEXT[level_i][0] : ''
    $('#floor .text').empty()
    $('<span />').html(floor_text).appendTo($('#floor .text'))
  }
  
  
  var _floor_text_i = 0
  var _floor_text_timeout = null
  
  var animate_floor_text = function(level_i) {
    if(!level_i || !FLOOR_TEXT[level_i] || FLOOR_TEXT[level_i].length <= 1) {
      _floor_text_i = 0
      clearTimeout(_floor_text_timeout)
      return
    }
    
    _floor_text_i++
    if(_floor_text_i >= FLOOR_TEXT[level_i].length) _floor_text_i = 0
    
    _floor_text_timeout = setTimeout(function() {
      $('<span />').html(FLOOR_TEXT[level_i][_floor_text_i]).appendTo($('#floor .text'))
      $('#floor .text').animate({left: '-100%'}, 750, function() {
        $('#floor .text span').eq(0).remove()
        $('#floor .text').css('left', 0)
      })
      animate_floor_text(level_i)
    }, FLOOR_TEXT_INTERVAL)
  }
  
  
  var start_moving = function() {
    var now = Date.now()
    
    if(!MOVING) {
      Game.stop_sound('background')
      Game.play_sound('elevator_moving')
      MOVING = true
      START_MOVING_TIME = now
      MOVING_TIME = 0
      animate_floor_text(false)
    }
    
    if(!LAST_TIME) LAST_TIME = now
    var interval = now - LAST_TIME
    LAST_TIME = now
    
    var direction = (NEXT_FLOOR > CURRENT_FLOOR ? 1 : -1)
    
    // Are we done moving?
    MOVING_TIME += interval
    if(MOVING_TIME >= MOVING_DURATION && !STOP_ON_NEXT_FLOOR) {
      FLOOR_POS = -1 * direction * HEIGHT
      STOP_ON_NEXT_FLOOR = true
      $('#button_panel .button').removeClass('selected')
      $('#button_panel .button.floor-'+NEXT_FLOOR).addClass('selected')
      $('#floor .lobby').hide()
      
      initialize_floor_text(NEXT_FLOOR)
      
      // Hide some stuff if we're on the top floor
      if(NEXT_FLOOR == 9) {
        $('#floor .mask').hide()
        $('#floor .screen_cover').hide()
      } else {
        $('#floor .mask').show()
        $('#floor .screen_cover').show()
      }
    }
    
    var offset = direction * VELOCITY * interval
    
    BACKGROUND_POS += offset
    if(BACKGROUND_POS >= HEIGHT) BACKGROUND_POS = 0
    TUBE.css('background-position', '0 '+BACKGROUND_POS+'px')

    SKY_BACKGROUND_POS += SKY_MOVEMENT*offset
    SKY.css('background-position', '0 '+SKY_BACKGROUND_POS+'px')
    
    FLOOR_POS += offset
    if(FLOOR_POS <= HEIGHT + 100) {
      FLOOR.css('top', FLOOR_POS)
    }
    
    if(STOP_ON_NEXT_FLOOR && ((direction > 0 && FLOOR_POS >= 0) || (direction < 0 && FLOOR_POS <= 0))) {
      FLOOR_POS = 0
      FLOOR.css('top', FLOOR_POS)
      STOP_ON_NEXT_FLOOR = false
      MOVING = false
      LAST_TIME = null
      CURRENT_FLOOR = NEXT_FLOOR
      NEXT_FLOOR = null
      
      if(CURRENT_FLOOR == 1) {
        $('#floor .lobby').fadeIn()
      
      } else if(CURRENT_FLOOR != 2 && CURRENT_FLOOR != 9) {
        animate_loading_message(true)
      }
      
      // Open the doors
      Game.play_sound('floor_arrival')
      
      setTimeout(function() {
        Game.stop_sound('elevator_moving')
        Game.play_sound('doors_open')
        Game.play_sound('background')
        
        $('#door_left').animate({left: -1*WIDTH}, 1000)
        $('#door_right').animate({right: -1*WIDTH}, 1000)
        
        // If we're on the first carbon floor, load the slideshow
        if(CURRENT_FLOOR == 2) {
          animate_floor_text(CURRENT_FLOOR)
          start_slideshow()
          
        
        // If we're on the top floor, do the special top-floor action
        } else if(CURRENT_FLOOR == 9) {
          setTimeout(on_top_floor, 500)
          
        // Otherwise, show the molecule
        } else if(CURRENT_FLOOR != 1) {
          animate_floor_text(CURRENT_FLOOR)
          
          setTimeout(function() {
            if(MOLECULE_IMG[CURRENT_FLOOR].src && MOLECULE_IMG[CURRENT_FLOOR].complete) {
              $(MOLECULE_IMG[CURRENT_FLOOR]).trigger('load')
            } else {
              MOLECULE_IMG[CURRENT_FLOOR].src = 'images/molecules/'+CURRENT_FLOOR+'.jpg'
            }
          }, 1000)
        }
        
      }, 250)
    
    } else {
      setTimeout(start_moving, 11)
    }
  }
  
  
  // If we're on the top floor, play the special video
  var on_top_floor = function() {
    CONTAINER.fadeOut(1000, function() {
      Game.stop_sound('background')
      $('#movie').show()
      $('#movie .video_container').html('').append("<iframe src='http://www.youtube.com/embed/"+youtube_videos.carbon_is_incredible+"?autoplay=1&wmode=opaque&modestbranding=1&showinfo=0&showsearch=0&rel=0' width='"+$('#movie').width()+"' height='"+$('#movie').height()+"' frameborder='0' allowfullscreen></iframe>")
    })
  }
  
  
  // Close the movie on the top floor
  var close_movie = function() {
    CONTAINER.show()
    $('#movie').hide()
    $('#movie .video_container').html('')
    $('#button_panel .button.floor-1').click()
    Game.play_sound('background')
  }
  
  $('#movie .close').bind('click', close_movie)
  
  
  // Animate the screen's loading message
  var _animate_loading_timeout = null
  var animate_loading_message = function(active, fade_out) {
    if(active) {
      $('#floor .screen_cover .loading')
        .css('opacity', fade_out ? 0.25 : 0)
        .show()
        .animate({'opacity': fade_out ? 0 : 0.25}, 500)
        _animate_loading_timeout = setTimeout(function() {animate_loading_message(true, !fade_out)}, 500)
    } else {
      clearTimeout(_animate_loading_timeout)
      $('#floor .screen_cover .loading').hide()
    }
  }
  
  
  // Molecule Dragging
  var MOLECULE_DRAGGING = false
  var MOLECULE_DRAG_START_X = 0
  var MOLECULE_START_FRAME = 0
  var MOLECULE_FRAME = 0
  
  var molecule_img_onload = function(e) {
    if(e.currentTarget.floor != CURRENT_FLOOR) return
    animate_loading_message(false)
    MOLECULE_FRAME = 0
    $('#floor .screen_cover').hide()
    $('#floor .drag').show()
    MOLECULE.css('background', 'transparent url(images/molecules/'+CURRENT_FLOOR+'.jpg) 0 0 no-repeat')
  }
  
  var MOLECULE_IMG = [null, null]
  for(var i = 2; i < 9; i++) {
    MOLECULE_IMG[i] = new Image()
    MOLECULE_IMG[i].floor = i
    MOLECULE_IMG[i].onload = molecule_img_onload
  }
  
  var drag_molecule = function(e) {
    var offset = e.clientX - MOLECULE_DRAG_START_X
    MOLECULE_FRAME = (MOLECULE_START_FRAME + Math.round(offset / 10)) % MOLECULE_NUM_FRAMES[CURRENT_FLOOR]
    if(MOLECULE_FRAME < 0) MOLECULE_FRAME += MOLECULE_NUM_FRAMES[CURRENT_FLOOR]
    MOLECULE.css('background-position', '0 -'+(MOLECULE_FRAME*MOLECULE_HEIGHT)+'px')
  }
  
  FLOOR.bind('mousedown', function(e) {
    $('#floor .drag').hide()
    MOLECULE_DRAGGING = true
    MOLECULE_DRAG_START_X = e.clientX
    $(document).bind('mousemove', drag_molecule)
  })
  
  $(document).bind('mouseup', function() {
    MOLECULE_DRAGGING = false
    MOLECULE_START_FRAME = MOLECULE_FRAME
    $(document).unbind('mousemove', drag_molecule)
  })
  
  
  // Button Panel
  $('#button_panel .button').click(function(e) {
    if(MOVING) return
    
    Game.play_sound('button_press')
    
    // Find the next floor
    NEXT_FLOOR = parseInt($(e.currentTarget).data('floor'))
    
    if(NEXT_FLOOR == CURRENT_FLOOR) {
      NEXT_FLOOR = null
      return
    }
    
    // Recalculate the velocity of the elevator
    var distance = DISTANCE_BETWEEN_FLOORS * (NEXT_FLOOR - CURRENT_FLOOR)
    VELOCITY = Math.abs(distance) / MOVING_DURATION
    
    // Show the screen cover
    $('#floor .drag').hide()
    if(CURRENT_FLOOR != 9) $('#floor .screen_cover').show()
    
    // Hide the big-ass molecule image, if it exists, otherwise animations suffer
    MOLECULE.css('background', '')
    
    // Stop the slideshow
    if(CURRENT_FLOOR == 2) stop_slideshow()
    
    // Close the doors
    Game.play_sound('doors_close')
    $('#door_left').animate({left: 0}, 1000)
    $('#door_right').animate({right: 0}, 1000)
    
    setTimeout(start_moving, 1000 + 250)
  })
  
  
  // Slideshow
  var SLIDESHOW_I = 0
  var SLIDESHOW_TIMEOUTS = [1, 2, 2/3, 2/3, 2/3, 2] // times FLOOR_TEXT_INTERVAL
  var _slideshow_timeout = null
  
  var initialize_slideshow = function() {
    $('<img />').attr('src', 'images/slideshow.jpg').appendTo($('#floor .slideshow'))
  }
  
  var next_slide = function() {
    SLIDESHOW_I++
    if(SLIDESHOW_I >= SLIDESHOW_TIMEOUTS.length) SLIDESHOW_I = 0
    if(SLIDESHOW_I == 0) {
      $('#floor .slideshow img').css({left: 0})
    } else {
      $('#floor .slideshow img').animate({left: -640*SLIDESHOW_I}, 750)
    }
        
    _slideshow_timeout = setTimeout(next_slide, SLIDESHOW_TIMEOUTS[SLIDESHOW_I] * FLOOR_TEXT_INTERVAL)
  }
  
  var start_slideshow = function() {
    SLIDESHOW_I = -1
    Game.play_sound('floor_arrival')
    $('#floor .slideshow').show()
    next_slide()
  }
  
  var stop_slideshow = function() {
    clearTimeout(_slideshow_timeout)
    $('#floor .slideshow').hide()
  }
  
  
    
  
  
  // ------------------ GAME SETUP ----------------------
  
  
  Game.load_sounds([
    {
      id: 'doors_close',
      url: 'sounds/doors_close.mp3',
      volume: 50
    }, {
      id: 'doors_open',
      url: 'sounds/doors_open.mp3',
      volume: 50
    }, {
      id: 'elevator_moving',
      url: 'sounds/elevator_moving.mp3',
      volume: 50
    }, {
      id: 'floor_arrival',
      url: 'sounds/floor_arrival.mp3',
      volume: 50
    }, {
      id: 'button_press',
      url: 'sounds/button_press.mp3',
      volume: 50
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 20
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      volume: 35
    }
  ])
  
  Game.load_images([
    'images/background.png',
    'images/button_glow.png',
    'images/button_highlight.png',
    'images/button_panel.png',
    'images/door_left.png',
    'images/door_right.png',
    'images/drag.png',
    'images/floor.png',
    'images/screen_cover.png',
    'images/sky_gradient.png',
    'images/stars.jpg',
    '../../images/viewbox/viewbox_close.png',
    'images/slideshow.jpg'
  ])
  
  
  Game.start_gameplay = function() {
    Game.stop_sound('theme')
    Game.stop_sound('background').play_sound('background')
    
    initialize_slideshow()
    
    // Move the bottom floor into position
    CURRENT_FLOOR = 1
    FLOOR_POS = 0
    FLOOR.css('top', FLOOR_POS)
    initialize_floor_text(CURRENT_FLOOR)
    
    // Doors should be open
    $('#door_left').css('left', -1*WIDTH)
    $('#door_right').css('right', -1*WIDTH)
    
    // We're in the lobby
    $('#button_panel .button').removeClass('selected')
    $('#button_panel .button.floor-1').addClass('selected')
    
  }
    
  Game.initialize()

})
