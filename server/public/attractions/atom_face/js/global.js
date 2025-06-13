window._area = 'nav'
window._attraction = 'atom_face'

$(window).load(function() {
  $('#face, #color_picker').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var face_container = $('#face')
  var face_container_position = face_container.offset()  
  
  var FACE_CONTAINER_BOX = [
    face_container_position.left,
    face_container_position.top,
    face_container_position.left + face_container.width(),
    face_container_position.top + face_container.height()
  ]
  
  var FACE_RADIUS = 0
  var FACE_X = 0
  var FACE_Y = 0
  
  var DEFAULT_POSITION = { // From the face's x,y
    eyes: [-440, 195],
    eyebrows: [-440, 135],
    mouths: [-500, 305]
  }
  
  var DRAGGING = false
  
  var FACE_PARTS = {
    'eyes': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    'eyebrows': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    'mouths': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  }
  
  var HEAD = 2 // 1 through 9
  var COLOR = 1 // 1 through 9
  
  
  var over_face = function(elem) {
    var position = elem.offset()
    var distance = Math.sqrt(Math.pow(FACE_X - position.left - elem.width()/2, 2) + Math.pow(FACE_Y - position.top - elem.height()/2, 2))
    if(distance > 0.8*FACE_RADIUS) {
      return false
    } else {
      return true
    }
  }
  
  
  var over_face_container = function(elem) {
    var hx = FACE_CONTAINER_BOX[0]
    var hy = FACE_CONTAINER_BOX[1]
    var hx2 = FACE_CONTAINER_BOX[2]
    var hy2 = FACE_CONTAINER_BOX[3]
    
    var position = elem.offset()
    var x = position.left
    var y = position.top
    var x2 = position.left + elem.width()
    var y2 = position.top + elem.height()
        
    var overlap = !(hx > x2 || hx2 < x || hy > y2 || hy2 < y)
    return overlap
  }
  
  
  var toggle_tab = function(type) {
    $('#tray .tab').css('z-index', 1)
    $('#'+type).css('z-index', 2)
    $('#tray .tab .button').css('z-index', 3)
  }
  
  
  var change_head = function(head) {
    if(head && typeof head != 'number') {
      head.preventDefault()
      head = $(head.currentTarget).data('head')
    }
    
    if(head) HEAD = head
    
    var img = $('<img />').attr('src', 'images/heads/'+HEAD+'-'+COLOR+'.png')
    img.load(function() {
      var face_position = img.offset()
      FACE_RADIUS = img.width() / 2
      FACE_X = face_position.left + FACE_RADIUS
      FACE_Y = face_position.top + FACE_RADIUS
    })
    
    $('#face').html('')
    img.appendTo($('#face'))
  }
  
  
  var change_color = function(color) {
    Game.play_sound('button')
    if(typeof color != 'number') color = $(color.currentTarget).data('color')
    COLOR = color
    
    $('#heads .parts div').each(function(i, elem) {
      elem = $(elem)
      elem.find('img').attr('src', 'images/heads/'+elem.data('head')+'-'+COLOR+'.png')
    })
    
    $('#face img').attr('src', 'images/heads/'+HEAD+'-'+COLOR+'.png')
  }
  
  
  var images_to_preload = [
    'images/bottom_bar.png',
    'images/color_picker.png',
    'images/ok_button.png',
    'images/tabs/eyebrows.png',
    'images/tabs/eyes.png',
    'images/tabs/mouths.png',
    'images/tabs/heads.png'
  ]
  
  var initialize = function() {
    Game.stop_sound('background').stop_sound('theme')
    setTimeout(function() {Game.play_sound('background')}, 2000)
    
    // Tab buttons
    $('#tray .buttons div').click(function(e) {
      toggle_tab(e.currentTarget.className)
    })
    
    
    // Create face components
    for(var part in FACE_PARTS) {
      var part_container = $('#'+part+' .parts')
      
      for(var i = 0; i < FACE_PARTS[part].length; i++) {
        var src = 'images/'+part+'/'+FACE_PARTS[part][i]+'.png'
        images_to_preload.push(src)
        
        if(part == 'eyes') {
          var blink_src = 'images/'+part+'/'+FACE_PARTS[part][i]+'_blink.png'
          images_to_preload.push(blink_src)
        }
        
        if(part == 'eyebrows') {
          var top = i * 44
          var left = i%2 == 0 ? 10 : 90
        } else if(part == 'eyes') {
          var top = i * 36
          var left = i%2 == 0 ? 15 : 110
        } else if(part == 'mouths') {
          var top = i * 36
          var left = i%2 == 0 ? 10 : 96
        }
        
        $('<img />')
          .attr('src', src)
          .data('part_type', part)
          .data('part_i', FACE_PARTS[part][i])
          .addClass('small')
          .addClass('part_'+part+'_'+FACE_PARTS[part][i])
          .data('top', top).data('left', left)
          .css({top: top, left: left})
          .appendTo(part_container)
      }
    }
    
    $('#heads .parts div').each(function(i, elem) {
      elem = $(elem)
      elem.bind('mousedown', change_head)
      var head = elem.data('head')
      $('<img />').attr('src', 'images/heads/'+head+'-'+COLOR+'.png').appendTo(elem)
      
      for(var i = 1; i <= 9; i++) {
        images_to_preload.push('images/heads/'+head+'-'+i+'.png')
      }
    })
    
    change_head(HEAD)
        
    $('#color_picker span').click(change_color)
    
    $('#ok_button').bind('mousedown', function(){$('#ok_button').addClass('click')})
    $(document).bind('mouseup', function(){$('#ok_button').removeClass('click')})
    $('#ok_button').bind('click', save_face)
    
    var face_components = $('#eyes img, #eyebrows img, #mouths img')
    
    face_components.draggable({
      
      start: function(e, elem) {
        Game.play_sound('grab')
        Game.play_sound('drag')
        DRAGGING = true
        elem.helper.removeClass('selected').removeClass('small')
      },
      
      
      stop: function(e, elem) {
        DRAGGING = false

        Game.stop_sound('drag')

        // If the item is not over the face
        // move to the "default" position on the face and
        // move previously selected item back to the tray
        if(!over_face(elem.helper)) {
          Game.play_sound('drop_in_tray')
          var type = elem.helper.data('part_type')
          
          var relative_position = elem.position
          var absolute_position = elem.offset
          
          var start_x = absolute_position.left - relative_position.left
          var start_y = absolute_position.top - relative_position.top
          
          var previous_selected_elem = $('#'+type+' img.selected')
          previous_selected_elem.removeClass('selected').addClass('small')
          
          if(previous_selected_elem.length > 0) {
            var previous_position = previous_selected_elem.position()
            var x = previous_position.left + previous_selected_elem.width()/2
            var y = previous_position.top + previous_selected_elem.height()/2
          } else {
            var x = DEFAULT_POSITION[type][0]
            var y = DEFAULT_POSITION[type][1]
          }
          
          x -= elem.helper.width() / 2
          y -= elem.helper.height() / 2
          
          elem.helper.animate({top: y, left: x}, 100, 'linear')
          previous_selected_elem.animate({top: previous_selected_elem.data('top'), left: previous_selected_elem.data('left')}, 250, 'linear')
          
          elem.helper.addClass('selected')
          
        // Otherwise, the item is over the face, so don't do anything
        } else {
          Game.play_sound('drop_on_atom')
          elem.helper.addClass('selected')
        }
        
      },
      
      
      drag: function(e, elem) {
        // If we're hovering over the face, move any previously selected item back to the tray
        if(over_face(elem.helper)) {
          var type = elem.helper.data('part_type')
          var selected_elem = $('#'+type+' img.selected')
          selected_elem.removeClass('selected').addClass('small').animate({top: selected_elem.data('top'), left: selected_elem.data('left')}, 250, 'linear')
        }
      }
      
    })
    
    
    // When clicking on a face components, either swap it with the previously selected item,
    // or just move it to face if there isn't a previously selected one
    face_components.bind('click', function(e) {
      if(DRAGGING || $(e.currentTarget).hasClass('selected')) return
      
      Game.play_sound('swap_item')
      
      var elem = $(e.currentTarget)
      elem.removeClass('small')
      
      var type = elem.data('part_type')
      var position = elem.offset()
      
      var previous_selected_elem = $('#'+type+' img.selected')
      
      if(previous_selected_elem.length > 0) {
        var previous_position = previous_selected_elem.position()
        var x = previous_position.left + previous_selected_elem.width()/2
        var y = previous_position.top + previous_selected_elem.height()/2
      } else {
        var x = DEFAULT_POSITION[type][0]
        var y = DEFAULT_POSITION[type][1]
      }
      
      x -= elem.width() / 2
      y -= elem.height() / 2
      
      previous_selected_elem.removeClass('selected').addClass('small')
      elem.animate({top: y, left: x}, 100, 'linear')
      previous_selected_elem.animate({top: previous_selected_elem.data('top'), left: previous_selected_elem.data('left')}, 250, 'linear')
      elem.addClass('selected')
    })
    
    
    // Set up the initial face
    var on_resume_login = function() {
      var face = User.atom_face()
      
      DEFAULT_POSITION = {
        eyes: [face.eyes[1], face.eyes[2]],
        eyebrows: [face.eyebrows[1], face.eyebrows[2]],
        mouths: [face.mouth[1], face.mouth[2]]
      }
      
      $('.part_eyebrows_'+face.eyebrows[0]).click()
      $('.part_eyes_'+face.eyes[0]).click()
      $('.part_mouths_'+face.mouth[0]).click()
      
      change_head(face.head)
      change_color(face.color)
    }
    
    if(User.login_resumed()) {
      on_resume_login()
    } else {
      Game.on_resume_login = on_resume_login
    }
    
    
    // Set up eye blinking
    setInterval(eye_blink, 6000)
  }
  
  
  var eye_blink = function() {
    var img_src = $('#eyes .selected').attr('src')
    if(!img_src) return
    img_src_blink = img_src.replace('_blink', '').replace('.png', '_blink.png')
    $('#eyes .selected').attr('src', img_src_blink)
    setTimeout(function() {$('#eyes .selected').attr('src', img_src)}, 350)
  }
  
  
  // Save the user's atom face
  var save_face = function() {
    Game.play_sound('ok')
    var eyebrows = $('#eyebrows img.selected')
    var eyes = $('#eyes img.selected')
    var mouth = $('#mouths img.selected')
    
    var eyebrows_pos = eyebrows.position()
    var eyes_pos = eyes.position()
    var mouth_pos = mouth.position()
    
    var face = {
      eyebrows: [eyebrows.data('part_i'), eyebrows_pos.left + eyebrows.width()/2, eyebrows_pos.top + eyebrows.height()/2],
      eyes: [eyes.data('part_i'), eyes_pos.left + eyes.width()/2, eyes_pos.top + eyes.height()/2],
      mouth: [mouth.data('part_i'), mouth_pos.left + mouth.width()/2, mouth_pos.top + mouth.height()/2],
      head: HEAD,
      color: COLOR
    }
    
    $('#ok_button').css('opacity', '0.5')
    
    User.save_atom_face(face, function(r) {
      Game.unlock_achievement('atom_face_made', 'You start as a Hydrogen atom with one electron. Earn more electrons by playing games throughout NanoSpace.', function() {
        window.location.href = '/'
      })
    })
  }
  
  initialize()
  
  
  // ------------------ GAME SETUP ----------------------
  
  $(function() {
    Game.load_sounds([
      {
        id: 'drag',
        url: 'sounds/drag.mp3',
        loops: 999999,
        volume: 30
      }, {
        id: 'grab',
        url: 'sounds/grab.mp3',
        volume: 50
      }, {
        id: 'drop_in_tray',
        url: 'sounds/drop_in_tray.mp3',
        volume: 50
      }, {
        id: 'drop_on_atom',
        url: 'sounds/drop_on_atom.mp3',
        volume: 25
      }, {
        id: 'swap_item',
        url: 'sounds/swap_item.mp3',
        volume: 50
      }, {
        id: 'button',
        url: 'sounds/button.mp3',
        volume: 50
      }, {
        id: 'ok',
        url: 'sounds/ok.mp3',
        music_muteable: true,
        volume: 30
      }, {
        id: 'background',
        url: 'sounds/background.mp3',
        music_muteable: true,
        stream: true,
        loops: 999999,
        volume: 45
      }
    ])
    
    Game.load_images(images_to_preload)
    
    Game.start_gameplay = function() {
      
    }
    
    Game.initialize()
  })
  
})
