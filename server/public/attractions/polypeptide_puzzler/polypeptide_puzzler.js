window._area = 'dna'
window._attraction = 'polypeptide_pizzler'

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var CANVAS = $('#canvas')
  var CANVAS_ELEM = CANVAS[0]
  var WIDTH = CANVAS.width()
  var HEIGHT = CANVAS.height()
  var CONTEXT = CANVAS[0].getContext('2d')
  
  var LEGEND = $('#legend')
  var LEGEND_CONTEXT = LEGEND[0].getContext('2d')
  
  var FINISHED_CANVAS = $('#level_finished_canvas')
  var FINISHED_CONTEXT = FINISHED_CANVAS[0].getContext('2d')
  
  var TIME_LIMIT = 0
  var LENGTH = 0
  
  var TARGET_PP = null
  var PP = null
  var PEPTIDE_I = 0
  
  var START_TIME = Date.now()
  var LAST_TIME = Date.now()
  var FINISH_QUICKLY = false
  
  var START_NEW_LEVEL_TIMEOUT = null
  
  var TIME = 0
  var LEVEL = 0
  var SCORE = 0
  
  var PLAYING = false
  var WATER_DID_SPLASH = false
  
  
  var draw_legend = function() {
    LEGEND_CONTEXT.clearRect(0, 0, 190, 190)
    LEGEND_CONTEXT.save()
    LEGEND_CONTEXT.translate(95, 95)
    TARGET_PP.drawLegend(LEGEND_CONTEXT, PEPTIDE_I+1)
    LEGEND_CONTEXT.restore()
  }
  
  
  var draw_main = function(context, interval) {
    draw_polypeptide(context)
    draw_water_ripple(context, interval || 0)
  }
  
  
  var draw_polypeptide = function(context) {
    var holder_offset_y = 30 * PP.scale
    context.clearRect(0, 0, WIDTH, HEIGHT)
    
    context.save()
    context.translate(PP.offset_x, PP.offset_y)
    context.rotate(PP.angle)
    context.translate(0, -1*holder_offset_y)
    
    context.lineWidth = 10 * PP.scale
    context.lineCap = 'round'
    context.strokeStyle = '#E8B127'
    context.beginPath()
    context.moveTo(PP.full_length/-2 + 0, holder_offset_y)
    context.lineTo(PP.full_length/2 + 0, holder_offset_y)
    context.stroke()
    
    context.beginPath()
    context.fillStyle = '#CE462F'
    context.arc(0, holder_offset_y, 8, 0, Math.TWO_PI, false)
    context.fill()
    
    context.translate(PP.falling_y, 0)
    PP.drawFull(context, PEPTIDE_I+1)
    context.restore()
  }
  
  
  // Water ripple
  var num_water_points = 20
  var water_force_const = 0.003
  var water_dampening = 0.96
  var gravity = 0.02
  var water_start_coords = [263, 380]
  var water_end_coords = [830, 380]
  var water_point_spacing = (water_end_coords[0] - water_start_coords[0]) / (num_water_points-1)
  
  var water_points = []
  for(var i = 0; i < num_water_points; i++) {
    water_points.push([0, 0]) // [y-offset, y-velocity]
  }
  
  var draw_water_ripple = function(context, interval) {
    context.save()
    context.lineWidth = 20
    context.lineCap = 'round'
    context.strokeStyle = '#5294CE'
    context.fillStyle = '#60BFEE'
    
    // Update the water points
    var offset_prev, offset_next = 0
    
    interval = Math.min(33, interval)
    
    for(var i = 1; i < num_water_points-1; i++) {
      offset_prev = water_points[i-1][0] - water_points[i][0]
      offset_next = water_points[i+1][0] - water_points[i][0]
      water_points[i][1] += water_force_const * (offset_next + offset_prev) * interval
      water_points[i][1] *= water_dampening
      water_points[i][1] += gravity
    }
    
    // Draw the water
    context.beginPath()
    context.moveTo(water_start_coords[0], HEIGHT)
    context.lineTo(water_start_coords[0], water_start_coords[1])
    
    for(var i = 1; i < num_water_points-1; i++) {
      context.lineTo(water_start_coords[0] + i*water_point_spacing, water_start_coords[1] + water_points[i][0])
    }
    
    context.lineTo(water_end_coords[0], water_end_coords[1])
    context.lineTo(water_end_coords[0], HEIGHT)
    context.globalAlpha = 0.75
    context.fill()
    
    // Draw the surface line
    context.beginPath()
    context.moveTo(water_start_coords[0], water_start_coords[1])
    
    for(var i = 1; i < num_water_points-1; i++) {
      water_points[i][0] += water_points[i][1]
      context.lineTo(water_start_coords[0] + i*water_point_spacing, water_start_coords[1] + water_points[i][0])
    }
    
    context.lineTo(water_end_coords[0], water_end_coords[1])
    context.globalAlpha = 1
    context.stroke()
    
    context.restore()
  }
  
  var water_splash = function() {
    if(WATER_DID_SPLASH) return
    Game.play_sound('water_splash')
    WATER_DID_SPLASH = true
    water_points[8][0] = 25
    water_points[9][0] = 100
    water_points[10][0] = 25
  }
  
  
  var update_score = function() {
    $('#score span').html(SCORE)
  }
  
  
  var start_new_level = function() {
    $('#high_scores').hide()
    
    Game.stop_sound('theme').stop_sound('protein_folding')
    Game.play_sound('background')
    Game.play_sound('new_level')
    Game.play_sound('ticking_clock')
    
    $('#invalid').hide()
    
    PLAYING = true
    WATER_DID_SPLASH = false
    
    clearTimeout(START_NEW_LEVEL_TIMEOUT)
    $('#level_finished').hide()
    $('#level span').html(LEVEL+1)
    update_score()
    
    // Determine level difficulty
    LENGTH = LEVEL + 5
    if(LENGTH > 13) LENGTH = 13
    
    var time_multiple = 20 / (LEVEL + 5)
    TIME_LIMIT = time_multiple*LENGTH*1000
    
    // Initialize some stuff
    START_TIME = Date.now()
    LAST_TIME = START_TIME
    TIME = 0
    FINISH_QUICKLY = false
        
    // Generate the target polypeptide
    TARGET_PP = new Polypeptide(LENGTH, true)
    PP = new Polypeptide(LENGTH)
    PP.full_length = PP.length('drawFull')
    PP.offset_x = 550
    PP.offset_y = Math.min(200, PP.full_length / (2*PP.scale))
    
    PP.falling_y = 0
    PEPTIDE_I = 0
    PP.angle = 0
    PP.k = 0
    
    draw_legend()
    draw_main(CONTEXT)
    
    loop()
  }
  
  
  var finish_level = function() {
    Game.stop_sound('background')
    Game.stop_sound('ticking_clock')
    
    PLAYING = false
    
    var comparison = TARGET_PP.compare(PP)
    $('#level_finished .click_to_continue').hide()
    $('#level_finished').removeClass('win').removeClass('lose').addClass(comparison.match ? 'win' : 'lose').fadeIn(500)
    
    if(comparison.match) {
      if(LEVEL%2 == 0) {
        Game.play_sound('correct_a')
      } else {
        Game.play_sound('correct_b')
      }
      
      Game.play_sound('protein_folding')
      
      SCORE += 50 * (LEVEL + 1)
      $('#level_finished .score span').html(SCORE)
      setTimeout(function() {$('#level_finished .click_to_continue').fadeIn(500)}, 2000)
      LEVEL++
      
      setTimeout(function() {
        if(LEVEL == 1) {
          Game.unlock_achievement('polypeptide_puzzler_1', 'Protein Folder')
        } else if(LEVEL == 10) {
          Game.unlock_achievement('polypeptide_puzzler_2', 'Pro Protein Folder')
        } else if(LEVEL == 15) {
          Game.unlock_achievement('polypeptide_puzzler_3', 'Expert Protein Folder')
        } else if(LEVEL == 20) {
          Game.unlock_achievement('polypeptide_puzzler_4', 'Master Protein Folder')
        }
      }, 1000)
      
    } else {
      
      // Game over!
      Game.play_sound('game_over')
      $('#level_finished .score span').html(SCORE)
      User.save_score('polypeptide_puzzler', SCORE, 'Level '+(LEVEL+1))
      LEVEL = 0
      SCORE = 0
    }
    
    START_TIME = Date.now()
    PP.offset_y = 0
    loop_finished()
  }
  
  
  var add_peptide = function(e) {
    if(PEPTIDE_I >= PP.peptides.length - 2) return
    
    PEPTIDE_I++
    var direction = $(e.currentTarget).data('direction')
    
    if(direction == 'COUNTER_CLOCKWISE') {
      Game.play_sound('select_bead_1')
    } else if(direction == 'STRAIGHT') {
      Game.play_sound('select_bead_2')
    } else {
      Game.play_sound('select_bead_3')
    }
    
    PP.peptides[PEPTIDE_I] = Peptide[direction]
    
    if(PEPTIDE_I >= PP.peptides.length - 2) {
      var comparison = TARGET_PP.compare(PP)
      if(comparison.match) {
        // Done! Speed up the time
        FINISH_QUICKLY = true
      } else {
        // Otherwise, show the invalid notification
        $('#invalid').show()
      }
    }
    
    draw_main(CONTEXT)
    draw_legend()
  }
  
  
  var remove_peptide = function() {
    if(PEPTIDE_I <= 0) return
    PP.peptides[PEPTIDE_I] = Peptide.GHOST
    PEPTIDE_I--
    draw_main(CONTEXT)
    draw_legend()
    $('#invalid').hide()
  }
  
  
  var remove_all_peptides = function() {
    for(var i = 1; i < PP.peptides.length-1; i++) {
      PP.peptides[i] = Peptide.GHOST
    }
    PEPTIDE_I = 0
    draw_main(CONTEXT)
    draw_legend()
    $('#invalid').hide()
  }
  
  
  var loop = function() {
    var time = Date.now()
    var interval = time - LAST_TIME
    LAST_TIME = time
    
    draw_main(CONTEXT, interval)
    
    if(FINISH_QUICKLY) interval *= 20
    TIME += interval
    PP.angle = Math.min(TIME / TIME_LIMIT, 1) * (Math.PI / -2)
    
    if(TIME > TIME_LIMIT) {
      if(FINISH_QUICKLY) TIME = TIME_LIMIT
      FINISH_QUICKLY = false
      PP.falling_y = -0.0001 * Math.pow(TIME_LIMIT - TIME, 2)
      if(PP.falling_y < -1*(HEIGHT - PP.full_length/2 - (LENGTH < 8 ? 300 : 380))) water_splash()
      if(PP.falling_y < -1*(HEIGHT + PP.full_length - PP.offset_y - 100)) return finish_level()
    }
    
    requestAnimFrame(loop, CANVAS_ELEM)
  }
  
  
  var loop_finished = function() {
    if(PLAYING) return
    
    PP.k += (1 - PP.k) / 64.0
    PP.offset_y += (HEIGHT * 0.5 - PP.offset_y) / 25.0
    
    TIME = Date.now() - START_TIME
    
    var scale = 1 + PP.k
    
    FINISHED_CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    
    FINISHED_CONTEXT.save()
    FINISHED_CONTEXT.translate(WIDTH * 0.5, PP.offset_y)
    FINISHED_CONTEXT.rotate(TIME / 5000)
    FINISHED_CONTEXT.scale(scale, scale)
    
    var comparison = TARGET_PP.compare(PP)
    PP.drawComparison(FINISHED_CONTEXT, PP.k, comparison.matches)
    
    FINISHED_CONTEXT.restore()
    requestAnimFrame(loop_finished, CANVAS_ELEM)
  }
  
  
  var initialize = function() {
    $('#buttons div').click(add_peptide)
    
    $(document).bind('keydown', function(e) {
      var key = e.which
      if(key == 8) { // delete key
        remove_peptide()
        e.preventDefault()
      }
    })
    
    $('#polypeptide_click').click(function() {remove_peptide()})
    
    $('#level_finished').click(function() {
      if($('#level_finished').hasClass('lose')) {
        Game.show_high_scores()
      } else {
        start_new_level()
      }
    })
    
    $('#about').click(function() {
      $('#about').fadeOut(500)
      start_new_level()
    })
    
    $('#invalid').click(remove_all_peptides)
  }
  
  initialize()
  
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'correct_a',
      url: 'sounds/correct_a.mp3',
      volume: 50
    }, {
      id: 'correct_b',
      url: 'sounds/correct_b.mp3',
      volume: 50
    }, {
      id: 'protein_folding',
      url: 'sounds/protein_folding.mp3',
      volume: 50
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 50
    }, {
      id: 'select_bead_1',
      url: 'sounds/select_bead_1.mp3',
      volume: 15
    }, {
      id: 'select_bead_2',
      url: 'sounds/select_bead_2.mp3',
      volume: 15
    }, {
      id: 'select_bead_3',
      url: 'sounds/select_bead_3.mp3',
      volume: 15
    }, {
      id: 'water_splash',
      url: 'sounds/water_splash.mp3',
      volume: 50
    }, {
      id: 'ticking_clock',
      url: 'sounds/ticking_clock.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 50
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
      volume: 35
    }
  ])
  
  Game.load_images([
    'images/about.png',
    'images/background_gradient.png',
    'images/beaker.png',
    'images/finished_gradient.png',
    'images/buttons/counter_clockwise.png',
    'images/buttons/straight.png',
    'images/buttons/clockwise.png',
    'images/X.png',
    'images/legend_arrow.png',
    'images/high_scores.png'
  ])
  
  
  Game.start_gameplay = function() {
    $('#about').show()
  }
  
  
  Game.show_high_scores = function() {
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('polypeptide_puzzler', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="level">'+scores[i].misc+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', function(){start_new_level()})
  
  
  Game.initialize()
})
