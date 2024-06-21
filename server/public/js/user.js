var User = function() {
  var THIS = {}
  
  var local_storage = new $.store()
  
  
  var LOGGED_IN = false
  THIS.logged_in = function() {return LOGGED_IN}

  var LOGIN_RESUMED = false
  THIS.login_resumed = function() {return LOGIN_RESUMED}
  
  var NAME = null
  THIS.name = function() {return NAME}
  
  var SCORES = local_storage.get('scores') || []
  
  var ACHIEVEMENTS = local_storage.get('achievements') || []
  THIS.num_achievements = function() {
    return ACHIEVEMENTS.length
  }
  
  var FLAGS = local_storage.get('flags') || {}
  THIS.flags = function() {
    return FLAGS
  }
  
  var ATOM_FACE = null
  THIS.atom_face = function() {
    var face = {
      eyebrows: [1, -390, 155],
      eyes: [1, -400, 215],
      mouth: [1, -392, 310],
      head: 2,
      color: 1
    }
    
    if(!ATOM_FACE) return face
    
    var face_params = ATOM_FACE.split(/[\n\r]/)
    var params = null
    
    if(face_params[0]) {
      params = face_params[0].split(',')
      if(typeof params[0] != 'undefined')  face.eyebrows[0] = params[0]
      if(typeof params[1] != 'undefined')  face.eyebrows[1] = parseFloat(params[1])
      if(typeof params[2] != 'undefined')  face.eyebrows[2] = parseFloat(params[2])
    }
    
    if(face_params[1]) {
      params = face_params[1].split(',')
      if(typeof params[0] != 'undefined')  face.eyes[0] = params[0]
      if(typeof params[1] != 'undefined')  face.eyes[1] = parseFloat(params[1])
      if(typeof params[2] != 'undefined')  face.eyes[2] = parseFloat(params[2])
    }
    
    if(face_params[2]) {
      params = face_params[2].split(',')
      if(typeof params[0] != 'undefined')  face.mouth[0] = params[0]
      if(typeof params[1] != 'undefined')  face.mouth[1] = parseFloat(params[1])
      if(typeof params[2] != 'undefined')  face.mouth[2] = parseFloat(params[2])
    }
    
    if(typeof face_params[3] != 'undefined') {
      face.head = parseInt(face_params[3])
    }
    
    if(typeof face_params[4] != 'undefined') {
      face.color = parseInt(face_params[4])
    }
    
    return face
  }
  
  THIS.save_atom_face = function(face, callback) {
    var face_str = ''
    
    face_str += face.eyebrows.join(',') + "\n"
    face_str += face.eyes.join(',') + "\n"
    face_str += face.mouth.join(',') + "\n"
    face_str += face.head + "\n"
    face_str += face.color
    
    ATOM_FACE = face_str
    
    $.getJSON('/users/current/save_atom_face', {atom_face: ATOM_FACE}, function(r) {
      if(typeof callback == 'function') callback(r)
    })
  }
  
  // Create the user's atom face badge
  THIS.create_atom_face = function(face_container, size_scale) {
    var face = User.atom_face()
    
    var offset_x = 620*size_scale
    var offset_y = -12*size_scale
    
    var position_img = function(e) {
      var img = $(e.currentTarget)
      var width = e.currentTarget.naturalWidth * size_scale
      var height = e.currentTarget.naturalHeight * size_scale
      
      img.css({
        'width': width,
        'left': offset_x + size_scale*img.data('x_pos') - width/2,
        'top': offset_y + size_scale*img.data('y_pos') - height/2
      })
      
      img.show()
    }
    
    $('<img />').hide().addClass('head')
                .attr('src', '/attractions/atom_face/images/heads/'+face.head+'-'+face.color+'.png')
                .css({top: 0, left: 0})
                .bind('load', position_img)
                .appendTo(face_container)
    
    $('<img />').hide().addClass('eyebrows')
                .attr('src', '/attractions/atom_face/images/eyebrows/'+face.eyebrows[0]+'.png')
                .data('x_pos', face.eyebrows[1])
                .data('y_pos', face.eyebrows[2])
                .bind('load', position_img)
                .appendTo(face_container)

    $('<img />').hide().addClass('eyes')
                .attr('src', '/attractions/atom_face/images/eyes/'+face.eyes[0]+'.png')
                .data('x_pos', face.eyes[1])
                .data('y_pos', face.eyes[2])
                .bind('load', position_img)
                .appendTo(face_container)

    $('<img />').hide().addClass('mouth')
                .attr('src', '/attractions/atom_face/images/mouths/'+face.mouth[0]+'.png')
                .data('x_pos', face.mouth[1])
                .data('y_pos', face.mouth[2])
                .bind('load', position_img)
                .appendTo(face_container)

  }

  
  // Create a new user
  THIS.create = function(user, params) {
    $.post('/users', {'user': user}, function(r) {
      if(r.user) {
        logged_in_setup(r.user)
        if(typeof params.success == 'function') params.success(r.user)
      } else {
        if(typeof params.failure == 'function') params.failure(r.error)
      }
      if(typeof params.complete == 'function') params.complete(r)
    }, 'json')
  }
  
  
  // Save the user
  THIS.save = function(user, params) {
    params = params || {}
    
    $.ajax({
      url: '/users/current.json',
      data: {user: user},
      type: 'PUT',
      complete: function(r) {
        r = $.parseJSON(r.responseText)
        if(r.user) {
          if(typeof params.success == 'function') params.success(THIS)
        } else {
          if(typeof params.failure == 'function') params.failure(THIS)
        }
        if(typeof params.complete == 'function') params.complete(THIS)
      }
    })
  }
  
  
  var logged_in_setup = function(user) {
    LOGGED_IN = true
    NAME = user.name
    
    SCORES = user.scores
    ACHIEVEMENTS = user.achievements
    ATOM_FACE = user.atom_face
    FLAGS = user.flags
    
    local_storage.set('scores', [])
    local_storage.set('achievements', [])
    local_storage.set('flags', {})
  }
  
  
  var logged_in_setup_with_token = function(user) {
    logged_in_setup(user)
    window.location.hash = 'gate'
    setTimeout(function() {$('#user_settings').fadeIn(500)}, 3000)
  }
  
  
  // Log in the user
  THIS.login = function(name, password, params) {
    params = params || {}
    
    var user_session = {'name': name, 'password': password}
    
    $.post('/login', {'user_session': user_session, 'scores': SCORES, 'achievements': ACHIEVEMENTS, 'flags': FLAGS}, function(r) {
      if(!r.user) {
        if(typeof params.failure == 'function') params.failure(r)
      } else {
        logged_in_setup(r.user)
        if(typeof params.success == 'function') params.success(THIS)
      }
      if(typeof params.complete == 'function') params.complete(THIS)
    }, 'json')
  }
  
  
  // Resume the logged in state of a user
  THIS.resume_login = function(params) {
    params = params || {}
    
    // Are they trying to log in with a token?
    var hash = window.location.hash
    if(hash.substring(0,3) == '#t=') {
      var token = hash.split('#t=')[1]
      
      $.getJSON('/login', {'token': token}, function(r) {
        LOGIN_RESUMED = true
        
        if(r.user) {
          logged_in_setup_with_token(r.user)
          if(typeof params.success == 'function') params.success(THIS)
        } else {
          if(typeof params.failure == 'function') params.failure(THIS)
        }
        if(typeof params.complete == 'function') params.complete(THIS)
      })
    
    
    // Otherwise, check to see if they're already logged in
    } else {
    
      $.getJSON('/logged_in', function(r) {
        LOGIN_RESUMED = true
        
        if(r.user) {
          logged_in_setup(r.user)
          if(typeof params.success == 'function') params.success(THIS)
        } else {
          if(typeof params.failure == 'function') params.failure(THIS)
        }
        if(typeof params.complete == 'function') params.complete(THIS)
      })
    }
  }
  
  
  // Logout the user
  THIS.logout = function(callback) {
    $.getJSON('/logout', function(r) {
      LOGGED_IN = false
      local_storage.set('scores', [])
      local_storage.set('achievements', [])
      local_storage.set('flags', {})
      if(typeof callback == 'function') callback()
    })
  }
  
  
  // Save a score, and check to see if it's a new high score
  THIS.save_score = function(game_label, score, misc, callback) {
    var score = {label: game_label, score: score, misc: misc}
    
    // Query the server if we're logged in
    if(LOGGED_IN) {
      $.getJSON('/users/current/add_score', {score: score}, function(r) {
        if(r.success) SCORES.push(score)
        if(typeof callback == 'function') callback(score)
      })
      
    // Cache the score if the user isn't logged in
    } else {
      SCORES.push(score)
      local_storage.set('scores', SCORES)
      if(typeof callback == 'function') callback(score)
    }
  }
  
  
  // Get a user's high score for a particular game
  THIS.my_high_score_for_game = function(game_label, callback) {
    if(LOGGED_IN) {
      $.getJSON('/users/current/high_score', {label: game_label}, function(r) {
        if(typeof callback == 'function') callback(r.score, r.misc)
      })
    
    } else {
      var game_scores = [{score: 0, misc: ''}]
      for(var i = 0; i < SCORES.length; i++) {
        if(SCORES[i].label == game_label) game_scores.push({score: SCORES[i].score, misc: SCORES[i].misc})
      }
      if(typeof callback == 'function') {
        var score = game_scores.sort(function(a, b){return b.score - a.score})[0]
        callback(score.score, score.misc)
      }
    }
  }
  
  
  // Get all users high scores for a particular game
  THIS.all_high_scores_for_game = function(game_label, callback) {
    $.getJSON('/games/'+game_label+'/high_scores', function(r) {
      if(typeof callback == 'function') callback(r.scores)
    })
  }
  
  
  // Does the user have the given achievement?
  THIS.has_achievement = function(label) {
    for(var i = 0; i < ACHIEVEMENTS.length; i++) {
      if(ACHIEVEMENTS[i].label == label) return true
    }
    return false
  }
  
  
  // Unlock an achievement
  THIS.unlock_achievement = function(achievement_label, params) {
    params = params || {}
    new_callback = params.new_achievement
    existing_callback = params.existing_achievement
    
    // If the user already has this achievement, don't add it
    for(var i = 0; i < ACHIEVEMENTS.length; i++) {
      if(ACHIEVEMENTS[i] && ACHIEVEMENTS[i].label == achievement_label) {
        if(typeof existing_callback == 'function') existing_callback()
        return
      }
    }
    
    var achievement = {label: achievement_label, title: ''}
    
    // Query the server if we're logged in
    if(LOGGED_IN) {
      $.getJSON('/users/current/unlock_achievement', {achievement: achievement}, function(r) {
          if(r.success) ACHIEVEMENTS.push(r.achievement)
          if(typeof new_callback == 'function') new_callback(r.achievement)
      })
      
    // Cache the achievement if the user isn't logged in
    } else {
      $.getJSON('/achievements/'+achievement.label, function(achievement) {
        if(achievement && achievement.label) ACHIEVEMENTS.push(achievement)
        local_storage.set('achievements', ACHIEVEMENTS)
        if(typeof new_callback == 'function') new_callback(achievement)
      })
    }
  }
  
  
  // Set a user flag
  THIS.set_flag  = function(key, value, callback) {
    FLAGS[key] = value
    
    // Query the server if we're logged in
    if(LOGGED_IN) {
      if(!value) value = ''
      $.getJSON('/users/current/set_flag', {flag_key: key, flag_value: value}, function(r) {
          if(r.success) ACHIEVEMENTS.push(r.achievement)
          if(typeof callback == 'function') callback(r.achievement)
      })
    
    // Cache the flags if the user isn't logged in
    } else {
      local_storage.set('flags', FLAGS)
    }
    
    return FLAGS
  }
  
  
  // Get a user flag
  THIS.get_flag = function(flag_key) {
    return FLAGS[flag_key]
  }
  
  
  // Has the user played at least one game?
  THIS.played_a_game = function() {
    return (SCORES.length > 0)
  }
  
  
  return THIS
}()
