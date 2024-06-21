window._area = 'sizes'
window._attraction = 'mega_penny'

$(function() {
  $('img').bind('dragstart', function(e){e.preventDefault()})
  $('img').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var SLIDE_I = 0
    
  var SLIDING = false
  
  var clone_elem = function(old_elem, duration, className) {
    old_elem = old_elem.last()
    var new_elem = old_elem.clone().css('opacity', 0).appendTo(old_elem.parent())
    if(className) new_elem.attr('class', className)
    old_elem.animate({'opacity': 0}, duration, function(){old_elem.remove()})
    new_elem.animate({'opacity': 1}, duration)
    return new_elem
  }
  
  
  
  var load_slide = function(direction) {

    var slide = Slides[SLIDE_I]
    SLIDING = true
    
    var duration = 350    
    
    // Update the slide information
    clone_elem($('#slide h1'), duration, 'slide-'+SLIDE_I).html(slide.title)
    
    var new_qty = clone_elem($('#slide .qty'), duration, 'qty slide-'+SLIDE_I)
    new_qty.find('.num').html(slide.num)
    new_qty.find('.num_text').html(slide.num_text)
    
    var new_table = $('#slide .info .table').clone().html('')
    for(var i = 0; i < slide.data_table.length; i++) {
      var row = $('<div />').addClass('row')
      $('<span />').addClass('name').html(slide.data_table[i][0]).appendTo(row)
      $('<span />').addClass('value').html(slide.data_table[i][1]).appendTo(row)
      row.appendTo(new_table)
    }
    
    var new_info = clone_elem($('#slide .info'), duration, 'info slide-'+SLIDE_I)
    new_info.find('.table').replaceWith(new_table)
    new_info.find('.description').html(slide.description)
    
    
    // Change the image
    if(!direction) {
      $('#slide .penny_img').attr('class', 'penny_img slide-'+SLIDE_I).attr('src', slide.img)
      SLIDING = false
      
    } else {
      var img_duration = 500
      setTimeout(function() {
        var old_img = $('#slide .penny_img')
        var new_img = old_img.clone().attr('class', 'penny_img slide-'+SLIDE_I).attr('src', slide.img).appendTo(old_img.parent())
        
        var old_img_done = function() {
          old_img.remove()
          SLIDING = false
        }
        
        if(direction > 0) {
          new_img.css({width: 1000, opacity: 0}).animate({width: 365, opacity: 1}, duration)
          old_img.animate({width: 0, opacity: 0}, duration, old_img_done)
        } else {
          new_img.css({width: 0, opacity: 0}).animate({width: 365, opacity: 1}, duration)
          old_img.animate({width: 1000, opacity: 0}, duration, old_img_done)
        }
      }, duration+50)
    }
    
  }
  
  
  // Load the previous slide
  var load_previous_slide = function(e) {
    if(SLIDING) return
    
    Game.play_sound('next')
    
    if(SLIDE_I == 0) {
      show_intro()
    } else {
      if($('#final_slide').is(':visible')) hide_final()
      SLIDE_I--
      if(SLIDE_I < 0) SLIDE_I = 0
      load_slide(-1)
    }
  }
  
  
  // Load the next slide
  var load_next_slide = function(e) {
    if(SLIDING) return
    
    Game.play_sound('next')
    
    SLIDE_I++
    if(SLIDE_I >= Slides.length) {
      show_final()
    } else {
      load_slide(1)
    }
  }
  

  var key_handler = function(event) {
    if(event.which == 37) {
      load_previous_slide()
      $('#final_slide').is(':visible') ? hide_final() : load_previous_slide()
    }
    else if(event.which == 39 && SLIDE_I < Slides.length - 1) {
      $('#intro_slide').is(':visible') ? hide_intro() : load_next_slide()
    }
  }
    
  
  // Show / Hide the intro slide
  var show_intro = function() {
    $('#intro_slide').fadeIn(300)
  }
  var hide_intro = function() {
    $('#intro_slide').fadeOut(300)
  }
  
  // Show / Hide the final slide
  var show_final = function() {
    $('#final_slide').fadeIn(300)
  }
  var hide_final = function() {
    $('#final_slide').fadeOut(300)
  }
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
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
      loops: 999999,
      stream: true,
      volume: 35
    }
  ])
  
  var images_to_preload = ['images/back.png', 'images/next.png', 'images/penny_stack.png']
  
  for(var i = 0; i < Slides.length; i++) {
    images_to_preload.push(Slides[i].img)
  }
  
  Game.load_images(images_to_preload)
  
  Game.start_gameplay = function() {
    Game.stop_sound('theme')
    Game.play_sound('background')
    
    $('#intro_slide .enter a').click(hide_intro)
    $('#intro_slide .links a').click(function(e) {
      SLIDE_I = parseInt($(e.currentTarget).data('slide'))
      hide_intro()
      load_slide()
    })
    
    $('.controls .back').click(load_previous_slide)
    $('.controls .next').click(load_next_slide)
    $('.controls').mousedown(function(e){return false})
    $(document).keyup(key_handler)
    load_slide()
  }
  
  Game.initialize()
  
})
