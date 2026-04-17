var User = function() {

  var THIS = {}
  
  var local_storage = new $.store()
  
  // New code as of 10-28
  var csrftoken = $('meta[name=csrf-token]').attr('content');
  if (csrftoken) {
    $.ajaxSetup({
      headers:{
        "X-CSRF-TOKEN": csrftoken
      }
    });
    console.log("CSRF Token set globally for AJAX requests.");
  } else {
    console.warn("CSRF meta tag not found.");
  }
  // end of new code

    
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
    
    $.getJSON('/save_atom_face', {atom_face: ATOM_FACE}, function(r) {
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
  
  
  // Log in the user
  THIS.login = function(name, password, params) {
    params = params || {}
    
    var user_session = {'name': name, 'password': password}

    // Anti-CSRF token
    console.log("2nd csrf before");
    var csrftoken = $('meta[name=csrf-token]').attr('content');
    console.log(csrftoken);
    $.ajaxSetup({
        headers:{
            "X-CSRF-Token": csrftoken
        }
    });
    console.log("2nd csrf after");
    
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
    var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
    var hash = MD5("nano"+game_label+score.toString()+misc)
    var score = {label: game_label, score: score, misc: misc, hash: hash}
    
    // Query the server if we're logged in
    if(LOGGED_IN) {
      $.getJSON('/add_score', {score: score}, function(r) {
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
      $.getJSON('/high_score', {label: game_label}, function(r) {
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
      $.getJSON('/unlock_achievement', {achievement: achievement}, function(r) {
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
    // Return false if key or value are empty or zero
    if(!key || !value) return false
    
    // Query the server if we're logged in
    if(LOGGED_IN) {
      $.getJSON('/set_flag', {flag_key: key, flag_value: value}, function(r) {
          if(r.success) ACHIEVEMENTS.push(r.achievement)
          if(typeof callback == 'function') callback(r.achievement)
      })
    
    // Cache the flags if the user isn't logged in
    } else {
      FLAGS[key] = value
      local_storage.set('flags', FLAGS)
    }
    
    return true
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
