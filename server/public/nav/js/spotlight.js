if(!$.support.opacity) {
  $('.spotlight_center').each(function() {
    $(this).data('src', $(this).data('src').replace('spotlight.png', 'spotlight_ie.png'))
  })
}

$(function() {

  if(navigator.userAgent.match(/(iPad|iPhone|iPod)/i))
    return

  var $win = $(window),
      $bod = $('body'),
      $areas = $('.area'),
      $map_zones = $('map area.has_spotlight'),
      hover_opacity = 0.45,
      fade_in_time = 800,
      move_time = $.support.opacity ? 400 : 0,
      fade_out_time = $.support.opacity ? 800 : 0,
      collapse_time = $.support.opacity ? 1200 : 0,
      autoblur_delay_time = 3000,
      autoblur_timeout

  var prepare_spotlight = function() {

    var $area = $(this)
    var shape = $area.attr('shape').toLowerCase()
    var ords = $area.attr('coords').split(',')
    var l, t, size

    if( shape == 'poly' ) {
      var r, b
      l = t = Infinity
      r = b = 0
  
      for(var i = 0; i < ords.length / 2; i++) {
        var offset = i * 2
        var x = parseInt(ords[offset], 10)
        var y = parseInt(ords[offset + 1], 10)
        if(x < l) l = x
        if(y < t) t = y
        if(x > r) r = x
        if(y > b) b = y
      }
      
      var w = r - l
      var h = b - t
      size = (w > h) ? w : h
      l =  l - ((size - w) / 2)
      t =  t - ((size - h) / 2)
    }
    else if ( shape == 'circle' ) {
      var x = parseInt(ords[0], 10)
      var y = parseInt(ords[1], 10)
      var radius = parseInt(ords[2], 10)
      
      l = x - radius
      t = y - radius
      size = radius * 2
    }
    
    
    $area.data('spotlight', {'x': l, 'y': t, 'size': size})

  }

  var focus_spotlight = function() {

    clearTimeout(autoblur_timeout)

    var $map_zone = $(this)
    var $area = $areas.filter('.active')
    var $spotlight = $area.find('.spotlight')
    var $spotlight_center = $spotlight.children('.spotlight_center')
    var $spotlight_top = $spotlight.children('.spotlight_top')
    var $spotlight_bottom = $spotlight.children('.spotlight_bottom')
    var $spotlight_left = $spotlight.children('.spotlight_left')
    var $spotlight_right = $spotlight.children('.spotlight_right')
    var offset = $area.find('.stage').offset()
    var center_pos = $map_zone.data('spotlight')
    var viewport_w = ($.browser.msie ? $win.width() : $bod.width())
    var viewport_h = $win.height()
    var center_top = center_pos.y + offset.top
    var center_left = center_pos.x + offset.left
    var center_size = center_pos.size
    var top_height = center_top
    var bottom_height = Math.max( 0, viewport_h - center_size - top_height)
    var left_width = center_left
    var right_width = Math.max( 0, viewport_w - center_size - left_width)
    
    if( $spotlight.is(':visible') && $.support.opacity ) {
      if( $.support.opacity )
        $spotlight.stop(true).animate( { opacity: hover_opacity }, move_time )
      else
        $spotlight.show()
      $spotlight_center.stop(true).animate( { top: center_top,
                                              left: center_left,
                                              width: center_size }, move_time )
      $spotlight_top.stop(true).animate({height: top_height}, move_time )
      $spotlight_bottom.stop(true).animate({height: bottom_height}, move_time )
      $spotlight_left.stop(true).animate({width: left_width}, move_time )
      $spotlight_right.stop(true).animate({width: right_width}, move_time )
    }
    else {
      $spotlight_center.stop(true).css( { top: center_top,
                                          left: center_left,
                                          width: center_size } )
      $spotlight_top.stop(true).css('height', top_height)
      $spotlight_bottom.stop(true).css('height', bottom_height)
      $spotlight_left.stop(true).css('width', left_width)
      $spotlight_right.stop(true).css('width', right_width)
      if( $.support.opacity )
        $spotlight.stop(true).css(  { display: 'block',
                                      opacity: 0.0 } ).animate( { opacity: hover_opacity }, fade_in_time )
      else {
        $spotlight_top.stop(true).css({left: center_left, width: center_size})
        $spotlight_bottom.stop(true).css({left: center_left, width: center_size})
        $spotlight.show()
      }
    }

    autoblur_timeout = setTimeout(blur_spotlight, autoblur_delay_time)

  }

  var blur_spotlight = function(e) {

    clearTimeout(autoblur_timeout)

		var blur_time = fade_out_time

		if( e && e.type == 'resize' ) {
			blur_time = 0
		}

    if( $.support.opacity )
      $areas.filter('.active').find('.spotlight').animate(  { opacity: 'hide' },
                                                            { duration: blur_time, queue: false } )
    else
      $areas.filter('.active').find('.spotlight').hide()
  }

  var awaken_spotlight = function() {

    var $map_zone = $(this)
    var $area = $areas.filter('.active')
    var $spotlight = $area.find('.spotlight')

    if( $spotlight.is(':hidden')  ) {
      $map_zone.trigger('mouseover')
    }

  }

  var collapse_spotlight = function(e) {

    if( !$.support.opacity ) return true

    e.preventDefault()

    clearTimeout(autoblur_timeout)

    var $area = $areas.filter('.active')
    var $map_zone = $(this)
    var $spotlight = $area.find('.spotlight')
    var $spotlight_center = $spotlight.children('.spotlight_center')
    var $spotlight_top = $spotlight.children('.spotlight_top')
    var $spotlight_bottom = $spotlight.children('.spotlight_bottom')
    var $spotlight_left = $spotlight.children('.spotlight_left')
    var $spotlight_right = $spotlight.children('.spotlight_right')

    $map_zones.unbind()
    $area.trigger('transitioning_to_attraction').unbind()
    $win.unbind().unload($.noop)

    var center_radius = $map_zone.data('spotlight').size / 2
    var center_top = $spotlight_center.offset().top + center_radius
    var center_left = $spotlight_center.offset().left + center_radius
    var top_height = center_top
    var bottom_height = $spotlight_bottom.height() + center_radius
    var left_width = center_left
    var right_width = $spotlight_right.width() + center_radius

    $spotlight.stop(true).animate( { opacity: 1.0 }, collapse_time/3 )

    var params = { duration: collapse_time*(2/3), easing: 'easeInBack' }
    $spotlight_center.stop(true).delay(collapse_time/3).animate( { top: center_top, left: center_left, width: 0 }, params )
    $spotlight_top.stop(true).delay(collapse_time/3).animate({height: top_height}, params )
    $spotlight_bottom.stop(true).delay(collapse_time/3).animate({height: bottom_height}, params )
    $spotlight_left.stop(true).delay(collapse_time/3).animate({width: left_width}, params )
    $spotlight_right.stop(true).delay(collapse_time/3).animate({width: right_width}, params )

    setTimeout(function () {
      $('#park').hide()
      window.location.href = $map_zone.attr('href')
    }, collapse_time+200)

  }

  $win.blur(blur_spotlight).resize(blur_spotlight)

  $areas.bind('exit', blur_spotlight)

  $map_zones
    .each(prepare_spotlight)
    .mouseover(focus_spotlight)
    .mousemove(awaken_spotlight)
    .mouseout(blur_spotlight)
    .filter('.attraction').click(collapse_spotlight).end()
    .not('.attraction').click(blur_spotlight).end()

})
