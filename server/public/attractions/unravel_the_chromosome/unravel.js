window._area = 'dna'
window._attraction = 'unravel_the_chromosome'

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var SLIDES = [
    {'src': 'images/slides/1.png', 'h-offset': 450, 'v-offset': 300},
    {'src': 'images/slides/2.png', 'h-offset': 450, 'v-offset': 300},
    {'src': 'images/slides/3.png', 'h-offset': 241, 'v-offset': 257},
    {'src': 'images/slides/4.png', 'h-offset': 117, 'v-offset': 154},
    {'src': 'images/slides/5.png', 'h-offset': 423, 'v-offset': 300},
    {'src': 'images/slides/6.png', 'h-offset': 785, 'v-offset': 140},
    {'src': 'images/slides/7.png', 'h-offset': 450, 'v-offset': 300},
    {'src': 'images/slides/8.png', 'h-offset': 490, 'v-offset': 274},
    {'src': 'images/slides/9.png', 'h-offset': 590, 'v-offset': 420}
  ]
  
  // Create slide elements
  for(var i = 0; i < SLIDES.length; i++) {
    var slide = $('<div />').addClass('slide')
    $('<img />')
      .attr('src', SLIDES[i]['src'])
      .data('h-offset', SLIDES[i]['h-offset'])
      .data('v-offset', SLIDES[i]['v-offset'])
      .appendTo(slide)
    slide.appendTo($('#slides'))
  }
  
  var _slides = $('.slide')
  _slides.eq(0).addClass('active')
  var _images = _slides.children('img')
  var _next_button = $('#next_button')
  var _prev_button = $('#prev_button')
  var _canvas = $('#canvas')
  var _ctx = _canvas[0].getContext('2d')
  var _patterns = []
  var _animation
  
  var setup = function() {
    _images.each(function() {
      _patterns.push( _ctx.createPattern(this, 'repeat') )
    })
  }
  
  var next_slide = function(slide_num) {
    var old_slide = _slides.filter('.active')
    var new_slide = old_slide.next()

    if( !new_slide[0] || _next_button.hasClass('disabled') ) {
      return
    }

    Game.play_sound('next')

    process_image(_slides.index(new_slide), 'out')
    
    old_slide.removeClass('active')      
    new_slide.addClass('active')
        
    update_buttons(new_slide)
  }

  var prev_slide = function(slide_num) {
    var old_slide = _slides.filter('.active')
    var new_slide = old_slide.prev()
    
    if( !new_slide[0] || _prev_button.hasClass('disabled') ) {
      return
    }
    
    Game.play_sound('back')
    
    process_image(_slides.index(new_slide), 'in')
    
    old_slide.removeClass('active')
    new_slide.addClass('active')
    
    update_buttons(new_slide)
  }

  var process_image = function(slide_num, direction) {
    clearTimeout(_animation)
    
    var pos = 0.0
    var increment = 0.025
    
    var zoom = function() {
      var curved_pos = (-Math.cos(pos*Math.PI)/2) + 0.5
      
      _ctx.fillStyle = '#000'
      _ctx.fillRect(0, 0, 900, 600)
      if (direction == 'in') {
        _ctx.beginPath()
        _ctx.arc(450, 300, 541, 0, Math.PI * 2, false)
        _ctx.fillStyle = _patterns[slide_num+1]
        _ctx.fill()
        _ctx.closePath()
        
        
        var radius = 541 * curved_pos
        var h_offset = _images.eq(slide_num+1).data('h-offset')
        var v_offset = _images.eq(slide_num+1).data('v-offset')
        var h_center = scale(curved_pos, 0, 1, h_offset, 450)
        var v_center = scale(curved_pos, 0, 1, v_offset, 300)
                
        _ctx.beginPath()
        _ctx.arc(h_center, v_center, radius, 0, Math.PI * 2, false)
        _ctx.fillStyle = _patterns[slide_num]
        _ctx.fill()
        _ctx.closePath()
      }
      else {
        _ctx.beginPath()
        _ctx.arc(450, 300, 541, 0, Math.PI * 2, false)
        _ctx.fillStyle = _patterns[slide_num]
        _ctx.fill()
        _ctx.closePath()

        var radius = 541 - (541 * curved_pos)
        var h_offset = _images.eq(slide_num).data('h-offset')
        var v_offset = _images.eq(slide_num).data('v-offset')
        var h_center = scale(curved_pos, 0, 1, 450, h_offset)
        var v_center = scale(curved_pos, 0, 1, 300, v_offset)
        
        _ctx.beginPath()
        _ctx.arc(h_center, v_center, radius, 0, Math.PI * 2, false)
        _ctx.fillStyle = _patterns[slide_num-1]
        _ctx.fill()
        _ctx.closePath()
      }
      pos += increment
      if(pos <= 1 + increment) {
        _animation = setTimeout(zoom, 13)
      }
    }
    
    zoom()
  }

  var scale = function(x, i1, i2, o1, o2) {
    return ( ((x-i1)/(i2-i1)) * (o2-o1) ) + o1
  }

  var update_buttons = function(current_slide) {
    if( current_slide[0] == _slides.first()[0] ) {
      _prev_button.addClass('disabled')
    }
    else {
      _prev_button.removeClass('disabled')
    }
    
    if( current_slide[0] == _slides.last()[0] ) {
      _next_button.addClass('disabled')
    }
    else {
      _next_button.removeClass('disabled')
    }
  }
  
  var key_handler = function(event) {
    if( event.which == 37 || event.which == 38 ) {
      prev_slide()
    }
    else if( event.which == 39 || event.which == 40 ) {
      next_slide()
    }
  }
  
  _next_button.bind('mousedown', false).click(next_slide)
  _prev_button.bind('mousedown', false).click(prev_slide)
  
  $(document).keyup(key_handler)
    
  Game.load_sounds([
    {
      id: 'back',
      url: 'sounds/back.mp3',
      multiShot: true,
      volume: 20
    }, {
      id: 'next',
      url: 'sounds/next.mp3',
      multiShot: true,
      volume: 20
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
      volume: 40
    }
  ])
  
  Game.load_images([
    'images/previous_slide.png',
    'images/next_slide.png',
    'images/slides/1.png',
    'images/slides/2.png',
    'images/slides/3.png',
    'images/slides/4.png',
    'images/slides/5.png',
    'images/slides/6.png',
    'images/slides/7.png',
    'images/slides/8.png'
  ])

  Game.start_gameplay = function() {
    setup()
    Game.stop_sound('theme')
    Game.play_sound('background')
    process_image(0, 'out')
  }

  Game.initialize()
  
})
