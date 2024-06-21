$('#park').bind('park_entered', function() {

  $('.poster_link').each(function(){
    $(this).viewbox({
      widthWindow: 600,
      heightWindow: 409
    })
  })

  $('#hall_area .video_link').attr('href', 'http://youtu.be/' + youtube_videos.hall)
  $('#h2o_area .video_link').attr('href', 'http://youtu.be/' + youtube_videos.h2o)
  $('#sizes_area .video_link').attr('href', 'http://youtu.be/' + youtube_videos.sizes)
  $('#dna_area .video_link').attr('href', 'http://youtu.be/' + youtube_videos.dna)
  $('#materials_area .video_link').attr('href', 'http://youtu.be/' + youtube_videos.materials)

  $('.video_link').each(function(){
    $(this).viewbox({
      widthWindow: 960,
      heightWindow: 540
    })
  })

  $('.store_link').each(function(){
    $(this).viewbox({
      widthWindow: 450,
      heightWindow: 300
    })
  })

})

// Alpha-Video hack for the jumbo screens in each outdoor area
$(function() {

  var supports_video_element = !!$('<video />').prop('canPlayType')
  var supports_canvas_element = !!$('<canvas />').prop('getContext')

  if(supports_video_element && supports_canvas_element) {

    $('.area').each(function() {

      var area = $(this)
      var screen = area.find('.screen')
      var video = screen.children('video')
      var canvas = screen.children('canvas')

      if(!video[0] || !canvas[0]) return

      var alpha
      var context = canvas[0].getContext('2d')
      var alpha_path = canvas.attr('data-alpha-src')

      var start_playback = function() {

        alpha = $('<img />').load(function() {
          video.bind('ended', video[0].play)
          video[0].play()
          if(area.hasClass('active')) setTimeout(process_frame, 100)
          video.bind('playing', function() {
            if(!area.hasClass('active')) return
            process_frame()
            canvas.delay(800).fadeTo(400, 1)
          })
        }).attr('src', alpha_path)[0]

      }

      var process_frame = function() {
        if(!area.hasClass('active')) return
        context.clearRect(0, 0, alpha.width, alpha.height)
        context.drawImage(video[0], 0, 0)
        context.globalCompositeOperation = 'xor'
        context.drawImage(alpha, 0, 0, alpha.width, alpha.height)
        requestAnimFrame(process_frame)
      }

      var stop_playback = function() {
        video[0].pause()
      }

      area.bind('enter_complete', start_playback)
      area.bind('exit', stop_playback)
      $('#viewbox').live({
        enter_viewbox: stop_playback,
        exit_viewbox: start_playback
      })

    })
  }

})

// Animations for #gate_area
$(function() {

  var area = $('#gate_area'),
      arch_lights = area.find('.arch_lights'),
      arch_frame = 0,
      spotlight = area.find('.spotlight'),
      legal_links = $('#legal_footer a, .legal a[href*="#"]'),
      legal_sections = area.find('.legal')

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      var legal_visible = legal_sections.is(':visible')
      if($.browser.real_safari && !legal_visible) area.hide()
      arch_lights.prop('className', 'arch_lights frame_' + arch_frame).show()
      if($.browser.real_safari && !legal_visible) area.show()
      arch_frame = ( (arch_frame + 1) % 25 )
    }
    setTimeout(start_playback_333, 333)
  }

  var cleanup_gate = function() {
    area.find('.attractions').removeClass('slide_in slide_out')
    area.find('.dome').removeClass('zoom_in')
  }

  var slide_attractions_in = function() {
    setTimeout(function() {
      area.find('.attractions').addClass('slide_in')
    }, 0)
  }

  var show_legal_info = function() {
    var clicked = $('#'+this.href.split('#')[1])
    legal_sections.not(clicked).fadeOut()
    clicked.fadeIn()
    return false
  }

  area.bind('exit_complete', cleanup_gate)
  area.bind('enter', slide_attractions_in)
  area.bind('enter_complete', start_playback_333 )
  legal_links.click(show_legal_info)
  $('.legal .close_button').live('click', function() {
    $(this).parent().fadeOut()
  })

})

// Animations for #hall_area
$(function() {

  var area = $('#hall_area'),
      neon_lights = area.find('.neon_lights'),
      neon_frame = 0,
      doorways = area.find('.doorways'),
      doorways_frame = 0

  var choose_and_show_people = function() {
    var num_to_show = Math.ceil( Math.random() * 3 )
    var people_to_show = $.shuffle( [1, 2, 3, 4, 5] ).slice( num_to_show * -1 )
    var people = area.find('.people').hide()

    for(var i = 0; i < people_to_show.length; i++) {
      people.filter('.layer_' + people_to_show[i] + ', .people_up_' + people_to_show[i]).show()
    }
  }

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    neon_lights.prop('className', 'neon_lights frame_' + neon_frame)
    neon_frame = ( (neon_frame + 1) % 14 )
    setTimeout(start_playback_333, 333)
  }

  var start_playback_1000 = function() {
    if(!area.hasClass('active')) return
    doorways.prop('className', 'doorways frame_' + doorways_frame)
    doorways_frame = ( (doorways_frame + 1) % 6 )
    setTimeout(start_playback_1000, 1000)
  }

  var pulse_lights = function() {
    if(!area.hasClass('active')) return
    area.find('.lighting_mask').fadeToggle(5000, pulse_lights)
  }

  var stop_pulsing = function() {
    area.find('.lighting_mask').stop(true).fadeOut()
  }

  area.bind('enter', choose_and_show_people)

  area.bind('enter_complete', function() {
    if($.support.opacity) setTimeout(pulse_lights, 2000)
    start_playback_333()
    start_playback_1000()
  })

  if($.support.opacity) {
    $('#motm').bind('motm_enter', stop_pulsing)
    $('#motm').bind('motm_exit', pulse_lights)
  }

})

// Animations for #theater_area
$(function() {

  var area = $('#theater_area'),
			entrance_duration = 1000,
		  seats,
			curtains_left,
			curtains_right,
			curtains_top,
			lighting_mask,
			people,
			container,
      grid,
      videos = []

	var setup = function() {
		seats = area.find('.seats')
		curtains_left = area.find('.curtains_left')
		curtains_right = area.find('.curtains_right')
		curtains_top = area.find('.curtains_top')
		lighting_mask = area.find('.lighting_mask')
		people = area.find('.people')
    container = area.find('.video_container')
    grid = area.find('.video_grid')
	}

  var choose_and_show_people = function() {
    var num = Math.ceil( Math.random() * 3 )

    curtains_left.css('left', 0)
    curtains_right.css('right', 0)
    curtains_top.css('top', -25)
    lighting_mask.css('opacity', 0)
  	seats.css('bottom', 0)
    people.removeClass('chosen').hide().filter('.people_'+num+', .people_up_'+num).css('bottom', 0).addClass('chosen').show()
  }

  var request_videos_in_album = function() {
    if(videos.length == 0) {
      $.ajax({ url: 'http://vimeo.com/api/v2/album/1848167/videos.json',
               dataType: 'jsonp',
               success: album_response })
    }
  }

  var album_response = function(r) {
    for(var i = 0; i < r.length; i++) {
      videos.push({
        title: r[i].title,
        video_id: r[i].id,
        thumbnail: r[i].thumbnail_medium
      })
    }
    populate_grid()
    play_video(videos[0].video_id)
  }
  window.album_response = album_response

  var entrance_animation = function() {
    // console.log('here');
    var chosen_people = people.filter('.chosen')

    curtains_left.animate({left: -60}, entrance_duration)
    curtains_right.animate({right: -60}, entrance_duration)
    curtains_top.animate({top: -75}, entrance_duration)
    lighting_mask.fadeTo(entrance_duration, 1)
  	seats.animate({bottom: -45}, entrance_duration)
  	chosen_people.animate({bottom: -90}, entrance_duration, function() {
      area.find('.video_area').stop().css({opacity: 0, zIndex: 8}).fadeTo(500, 1, request_videos_in_album)
    })
  }

  var populate_grid = function() {
    for(var i = 0; i < videos.length; i++) {(function(i){

      var v = videos[i]

      var cell = $('<div class="cell" />').click(function() { play_video(v.video_id) })
      var img = $('<img />').attr('src', v.thumbnail)
      var title = $('<div class="video_title" />').text(v.title)

      cell.append(img).append(title).appendTo(grid)

    })(i)}
  }

  var addEvent = function(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false)
    } else {
      element.attachEvent('on' + eventName, callback)
    }
  }

  var play_video = function(video_id) {
    container.show().html('<iframe id="player_'+video_id+'" src="http://player.vimeo.com/video/'+video_id+'?api=1&amp;player_id=player_'+video_id+'" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
    var player = $f('player_'+video_id)

    player.addEvent('ready', function() {
      player.addEvent('finish', function() {
        container.hide()
      })
      player.api('play')
      area.trigger('video_playing')
    })
  }

  var stop_trailer = function() {
    container.empty().hide()//.css({opacity: 0, zIndex: 1})
    area.find('.video_area').css({opacity:0, zIndex:1});
  }

	$('#park').bind('images_ready', setup)
  area.bind('enter', choose_and_show_people)
  area.bind('enter_complete', entrance_animation)
  area.bind('exit', stop_trailer)

})

// Animations for #h2o_area
$(function() {

  var frame_333 = 0,
      area = $('#h2o_area'),
      stage = area.children('.stage'),
			diver_src = stage.find('.diver').data('src'),
      spotlight = area.find('.spotlight')

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      stage.prop('className', 'stage frame_' + frame_333)
      frame_333 = (frame_333 + 1) % 6
    }
    setTimeout(start_playback_333, 333)
  }

  var restart_diver_animation = function() {
		stage.find('.diver')[0].src = diver_src + '?' + $.now()
  }

  area.bind('enter', restart_diver_animation)
  area.bind('enter_complete', start_playback_333)

})

// Animations for #sizes_area
$(function() {

  var frame_333 = 0,
      area = $('#sizes_area'),
      atom = area.find('.atom'),
      atom_height = 117,
      orf = area.find('.orf_globe'),
      orf_height = 203,
      spotlight = area.find('.spotlight')

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      atom.children().css('top', frame_333 * atom_height * -1)
      orf.children().css('top', frame_333 * orf_height * -1)
      frame_333 = (frame_333 + 1) % 6
    }
    setTimeout(start_playback_333, 333)
  }

  var start_playback_1000 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      area.find('.microscope_neon').toggle()
    }
    setTimeout(start_playback_1000, 1000)
  }

  area.bind('enter_complete', start_playback_333)
  area.bind('enter_complete', start_playback_1000)


})

// Animations for #dna_area
$(function() {

  var frame_333 = 0,
      area = $('#dna_area'),
      stage = area.children('.stage'),
      spotlight = area.find('.spotlight')

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      stage.prop('className', 'stage frame_' + frame_333)
      frame_333 = (frame_333 + 1) % 12
    }
    setTimeout(start_playback_333, 333)
  }

  area.bind('enter_complete', start_playback_333)

})

// Animations for #materials_area
$(function() {

  var area = $('#materials_area'),
      frame_333 = 0,
      frame_666 = 0,
      thermonator = area.find('.thermonator_wrapper'),
      thermonator_height = 245,
      atomium_lights = area.find('.atomium_lights'),
      spotlight = area.find('.spotlight')

  var start_playback_333 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      atomium_lights.prop('className', 'atomium_lights animation frame_' + frame_333)
      frame_333 = (frame_333 + 1) % 7
    }
    setTimeout(start_playback_333, 333)
  }

  var start_playback_666 = function() {
    if(!area.hasClass('active')) return
    if(!spotlight.is(':animated')) {
      thermonator.children().css('marginTop', frame_666 * thermonator_height * -1)
      area.find('.diamond_neon').toggle()
      frame_666 = (frame_666 + 1) % 4
    }
    setTimeout(start_playback_666, 666)
  }


  area.bind('enter_complete', start_playback_333)
  area.bind('enter_complete', start_playback_666)

})
