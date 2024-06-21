window._area = 'sizes'
window._attraction = 'micro_lab'

// Initialization Stuff

$(function() {
	$('img').live('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
	$('img').mousedown(function(e) {e.preventDefault()})
	$('a.nav').click(function() {
    Game.play_sound('click_on_microscope')
  })
	
	
	// Preload sample thumbnails
	for(var microscope in SampleLibrary) {
		var sample_container = $('#stage .sample_selector.screen.'+microscope+' ul')
		var samples = $.shuffle( SampleLibrary[microscope] )
		for(var i = 0, ii = samples.length; i < ii; i++) {
			var sample = samples[i]
			var thumbnail_url = 'images/samples/'+microscope+'/'+sample.name+'/thumb.jpg'

      var h_offset = (i%5) * -180
      var v_offset = Math.floor(i/5) * -180

			$('<li><div /><img src="'+thumbnail_url+'" /></li>')
			  .data('microscope', microscope)
			  .data('sample-name', sample.name)
			  .data('caption', sample.caption)
			  .data('info', sample.info)
			  .click(function() { SampleViewer.load( $(this).data('sample-name'), $(this).data('microscope'), $(this).data('info')) })
			  .mouseenter(function() { $('.'+$(this).data('microscope')+' .caption').text($(this).data('caption')) })
			  .mouseleave(function() { $('.'+$(this).data('microscope')+' .caption').empty() })
        .appendTo(sample_container)
			  .children('div').css('background-position', h_offset + 'px ' + v_offset + 'px')
		}
	}
	
})


var setup_microscopes = function() {
	var microscopes = $('.microscope')
	microscopes.bind({
	  mouseenter: function() {
	    var hovered_scope = $(this).children('img').stop().animate({marginTop: 0, marginLeft: 0, opacity: 1}, 300)
      microscopes.children('img').not(hovered_scope).stop().animate({marginTop: -21, marginLeft: -30, opacity: 0.4}, 200)
	  },
	  mouseleave: function() {
      microscopes.children('img').stop().animate({marginTop: 0, marginLeft: 0, opacity: 1}, 300)
	  },
	  click: function() {
      Game.play_sound('click_on_microscope')
    }
  })

}


// Controls which screen is currently visible (i.e. microscope selector, sample selector, sample viewer)
// Load a particular screen by calling Screen.load(name_of_screen, optional_microscope_name)

var Screen = function() {
	var THIS = {}
	
	var ACTIVE_SCREEN = null
	
	// Initialization
	$(function() {
		ACTIVE_SCREEN = $('#stage .screen.active')
	})
	
	// Load a screen
	THIS.load = function(screen, microscope) {
	  $('.caption').empty()
	  
		if(ACTIVE_SCREEN) ACTIVE_SCREEN.removeClass('active')
		
		var selector = '#stage .screen.'+screen
		if(microscope) {
		  selector += '.'+microscope
		}

    if(screen == 'sample_selector' && ACTIVE_SCREEN.hasClass('sample_viewer')) {
      Game.play_sound('theme')
      Game.stop_sound('background')
    }

    ACTIVE_SCREEN = $(selector)
		
		if(ACTIVE_SCREEN) ACTIVE_SCREEN.addClass('active')
	}
	
	// Return the active screen
	THIS.active = function() {return ACTIVE_SCREEN}
	
	return THIS
}()



// The Sample Viewer
// Load a new sample by calling SampleViewer.load(name_of_sample)

var SampleViewer = function() {
	var THIS = {}
	
	var SAMPLE, SAMPLE_VIEWER_CONTAINER, SAMPLE_CONTAINER, SAMPLE_SIZE
	
	var SAMPLES_LOADED = {optical: [], electron: [], atomic_force: []}
	
	
	var IMG = {}
	var IMG_SIZE = 0
  var ZOOM_SIZE = 0
  var IMG_X = 0
  var IMG_Y = 0
	
	
	// Load a sample into the sample viewer
	THIS.load = function(sample, microscope, info) {
		
    Game.play_sound('background')
    Game.stop_sound('theme')
		Game.play_sound('click_on_sample')
		
		if(microscope) {
			SAMPLE_VIEWER_CONTAINER = $('.screen.sample_viewer.'+microscope)
			SAMPLE_CONTAINER = SAMPLE_VIEWER_CONTAINER.find('.sample')
			SAMPLE_SIZE = SAMPLE_CONTAINER.width()
			SAMPLE_VIEWER_CONTAINER.find('.info').text(info)
			// Load the sample screen, if it's not already
			if(Screen.active() != SAMPLE_VIEWER_CONTAINER) {
				Screen.load('sample_viewer', microscope)
			}
			
			if(SAMPLES_LOADED[microscope].indexOf(sample) == -1) {
			  SAMPLES_LOADED[microscope].push(sample)
			}
		}
		
		SAMPLE = sample
		
		if(IMG.high_contrast) IMG.high_contrast.remove()
		if(IMG.regular) IMG.regular.remove()
		
		// Create images
		IMG.high_contrast = $('<img />').attr('src', 'images/samples/'+microscope+'/'+SAMPLE+'/high_contrast.jpg')
												.css({width: SAMPLE_SIZE, height: SAMPLE_SIZE})
												.hide()
												.appendTo(SAMPLE_CONTAINER)
		
		IMG.regular =       $('<img />').attr('src', 'images/samples/'+microscope+'/'+SAMPLE+'/standard.jpg')
												.css({width: SAMPLE_SIZE, height: SAMPLE_SIZE})
												.hide()
												.appendTo(SAMPLE_CONTAINER)
		
		IMG.regular.bind('load', function() {
		  IMG.regular.fadeIn(600)
		  IMG.high_contrast.fadeIn(600)
    	setTimeout(img_onload, 0)
  	})
  	
  	// Achievements
  	if(SAMPLES_LOADED.optical.length >= 3 && SAMPLES_LOADED.electron.length >= 3 && SAMPLES_LOADED.atomic_force.length >= 3) {
      Game.unlock_achievement('microlab_3_from_each', 'Micro Lab Assistant')
  	}
  	
  	if(SAMPLES_LOADED[microscope].length >= 10) {
  	  var microscope_name = microscope.charAt(0).toUpperCase() + microscope.slice(1)
      Game.unlock_achievement('microlab_all_'+microscope, microscope_name+' Specialist')
  	}
	}
  
  
  // On sample image load, set up sliders and stuff
  var img_onload = function() {
    IMG_SIZE = IMG.regular.width()  
    
    var min_size = SAMPLE_SIZE
    var max_size = IMG.regular[0].naturalWidth * 1.5
    ZOOM_SIZE = min_size + 0.25*(max_size - min_size)
    
    // Set up contrast slider
    SAMPLE_VIEWER_CONTAINER.find('.contrast_slider').slider({
      value: 0,
      slide: function(event, ui) {
        var contrast = ui.value / 100.0
        IMG.regular.css('opacity', 1 - contrast)
      }
    })
    
    // Set up zoom slider
    SAMPLE_VIEWER_CONTAINER.find('.zoom_slider').slider({
      min: min_size,
      max: max_size,
      value: ZOOM_SIZE,
      slide: function(event, ui) {
        ZOOM_SIZE = ui.value
        update_sample()
      }
    })
    
    
    // Set up pan knob
    var PAN_INTERVAL = null
    var PAN_X = 0
    var PAN_Y = 0
    
    SAMPLE_VIEWER_CONTAINER.find('.pan_control .knob').draggable({
      containment: 'parent',
      revert: true,
      revertDuration: 100,
      
      start: function(e, elem) {
        PAN_INTERVAL = setInterval(pan_slide, 33)
      },
      
      stop: function(e, elem) {
        clearInterval(PAN_INTERVAL)
      },
      
      drag: function(e, elem) {
        PAN_X = elem.originalPosition.left - elem.position.left
        PAN_Y = elem.originalPosition.top - elem.position.top
      }
    })
    
    var pan_slide = function() {
      IMG_X += (PAN_X / ZOOM_SIZE / 8)
      IMG_Y += (PAN_Y / ZOOM_SIZE / 8)
      update_sample()
    }
    
    update_sample()
  }
  
  
  // Update the sample based on slider values
  var update_sample = function() {    
    var offset = (ZOOM_SIZE - SAMPLE_SIZE) / 2
    
    // left and top can't be greater than 0
    var max = offset / ZOOM_SIZE
    if(IMG_X > max) IMG_X = max
    if(IMG_Y > max) IMG_Y = max
    
    // left and top can't be less than (SAMPLE_SIZE - ZOOM_SIZE)
    var min = (SAMPLE_SIZE + offset) / ZOOM_SIZE - 1
    if(IMG_X < min) IMG_X = min
    if(IMG_Y < min) IMG_Y = min
    
    var css = {
      width: ZOOM_SIZE,
      height: ZOOM_SIZE,
      left: (IMG_X * ZOOM_SIZE - offset) + 'px',
      top: (IMG_Y * ZOOM_SIZE - offset) + 'px'
    }
    
    IMG.regular.css(css)
    IMG.high_contrast.css(css)
  }
  
	
	return THIS
}()





var convert_fake_images = function() {
  
  $('.img').each(function() {
    var fake_img = $(this)
    $('<img />').load(function() {
      var img = $(this)
      img[0].className = fake_img[0].className
      img.id = fake_img.id
      fake_img.replaceWith(img)
    })
    .attr('src', fake_img.data('src'))
  })

}


Game.load_sounds([
  {
    id: 'click_on_microscope',
    url: 'sounds/click_on_microscope.mp3',
    volume: 50
  }, {
    id: 'click_on_sample',
    url: 'sounds/click_on_sample.mp3',
    volume: 50
  }, {
    id: 'background',
    url: 'sounds/background.mp3',
    music_muteable: true,
    stream: true,
    loops: 999999,
    volume: 25
  }, {
    id: 'theme',
    url: 'sounds/theme.mp3',
    music_muteable: true,
    stream: true,
    loops: 999999,
    volume: 35
  }
])

Game.load_images(['images/peripherals.png',
                  'images/microscope_optical.png',
                  'images/microscope_electron.png',
                  'images/microscope_atomic_force.png',
                  'images/microscope_mask.png',
                  'images/microscope_selector_background.png',
                  'images/sample_selector_background.png',
                  'images/sample_selector_mask.png',
                  'images/pan_knob.png',
                  'images/slider_knob.png'])

Game.start_gameplay = function() {
  convert_fake_images()
  setTimeout(setup_microscopes, 400)
}

Game.initialize()
