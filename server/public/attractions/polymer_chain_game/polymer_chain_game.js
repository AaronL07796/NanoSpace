window._area = 'materials'
window._attraction = 'polymer_chain_game'

$(function() {
  
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  var CANVAS = $('#canvas')
  var CANVAS_ELEM = CANVAS[0]
  var CONTEXT = CANVAS[0].getContext('2d')
  var WIDTH = CANVAS.width()
  var HEIGHT = CANVAS.height()
  
  var position = CANVAS.offset()
  var TOP = position.top
  var LEFT = position.left
  
  $(window).bind('resize', function() {
    var position = CANVAS.offset()
    TOP = position.top
    LEFT = position.left
  })
  
  var FALLING_MERS = []
  var MER_SPAWN_RATE = 1000
  var FALLING_RATE_MAX = .25
  var FALLING_RATE_MIN = 0.1
  var LAST_MER_TIME = null
  var PERCENT_BAD = 0.25
  var PERCENT_CONTAMINATION = 0.25
  var PERCENT_POWERPILL = 0.25
  
  var POLYMER_CHAIN = {
    mers: [],
    rate_of_acceleration: 0.2,
    damping: 0.5,
    sway_period: 400,
    min_sway_period: 100,
    sway_magnitude: Math.PI * 0.015625,
    contamination_multiplier: 0.99,
    impact_multiplier: 0.5,
    max_visible_mers: 9,
    contamination: 0,
    capture_distance_squared: 40*40,
    total_length: 0
  }
  
  var LOOPING = false
  var LAST_LOOP_TIME = null
  var INTERVAL = 0
  var MOUSE_Y = 0
  
  var ZOOM_TARGET = 1
  var ZOOM = ZOOM_TARGET
  var ZOOM_WIDTH = WIDTH * ZOOM
  var ZOOM_HEIGHT = HEIGHT * ZOOM
  var ZOOM_TOP = (HEIGHT - ZOOM_HEIGHT) / 2
  
  var BACKGROUND_BOTTOM_COLOR = null
  var BACKGROUND_BOTTOM_IMG = new Image()
  BACKGROUND_BOTTOM_IMG.onload = function() {BACKGROUND_BOTTOM_IMG.pattern = CONTEXT.createPattern(BACKGROUND_BOTTOM_IMG, 'repeat-x')}
  BACKGROUND_BOTTOM_IMG.src = 'images/background_bottom.png'
  
  var BACKGROUND_TOP_IMGS = []
  for(var i = 0; i < 10; i++) (function(i) {
    BACKGROUND_TOP_IMGS[i] = new Image()
    BACKGROUND_TOP_IMGS[i].onload = function() {BACKGROUND_TOP_IMGS[i].pattern = CONTEXT.createPattern(BACKGROUND_TOP_IMGS[i], 'repeat-x')}
    BACKGROUND_TOP_IMGS[i].src = 'images/background_top/'+(i+1)+'.png'
  })(i)
  
  var BACKGROUND_BOTTOM_X = 0
  var BACKGROUND_TOP_X = 0
  var BACKGROUND_BOTTOM_VELOCITY = -0.06
  var BACKGROUND_TOP_VELOCITY = -0.12
  
  var MER_RADIUS = 16
  var ZOOM_MER_RADIUS = MER_RADIUS / ZOOM
  var MER_DIAMETER = MER_RADIUS * 2
  var MER_CHAIN_DISTANCE = MER_DIAMETER
  var MER_MAX_VELOCITY = 16
  var MER_MAX_VELOCITY_2 = MER_MAX_VELOCITY * MER_MAX_VELOCITY
  var MER_MAX_VELOCITY_DAMPING = 0.5
  
  var POWERPILL = false
  var POWERPILL_TIME = 12000
  var POWERPILL_TIMEOUT = null
  
  var MER_BONUS = 1000
  
  var CAN_PAUSE = false
  
  var LEVEL_COLORS = [
    {
      background_bottom:  '#282585',
      good_mer:           {c: '#9347C4', c_shadow: '#B3A839', c_line: '#16B4F5', h: '#3C9EF7', h_shadow: '#FFFFFF', h_line: '#9241CC'},
      contaminated_mer:   {c: '#6BA849', c_shadow: '#E9DF5F', c_line: '#E94B0A', h: '#F7903D', h_shadow: '#6BBD4F', h_line: '#6DBE33'},
    }, {
      background_bottom:  '#2C1B60',
      good_mer:           {c: '#FF53E3', c_shadow: '#FFFEC7', c_line: '#16B4F5', h: '#04B6EF', h_shadow: '#F2F2F2', h_line: '#9241CC'},
      contaminated_mer:   {c: '#93D74C', c_shadow: '#00033D', c_line: '#E94B0A', h: '#EB4924', h_shadow: '#0D0D0D', h_line: '#6DBE33'},
    }, {
      background_bottom:  '#41217A',
      good_mer:           {c: '#BF1C31', c_shadow: '#FFFFFF', c_line: '#F1C6CA', h: '#FFF36F', h_shadow: '#BF1C31', h_line: '#BE1E2D'},
      contaminated_mer:   {c: '#39E1D3', c_shadow: '#000000', c_line: '#FFFFFF', h: '#701AAA', h_shadow: '#FFFFFF', h_line: '#41E1D2'},
    }, {
      background_bottom:  '#007CAA',
      good_mer:           {c: '#66318A', c_shadow: '#FBAD57', c_line: '#CBEBA2', h: '#FBAD57', h_shadow: '#683575', h_line: '#EE4036'},
      contaminated_mer:   {c: '#66318A', c_shadow: '#EBE05D', c_line: '#EBDAA2', h: '#F03E3D', h_shadow: '#FAD77E', h_line: '#FAAF40'},
    }, {
      background_bottom:  '#82151F',
      good_mer:           {c: '#FFEF55', c_shadow: '#0A3CCD', c_line: '#0A33D6', h: '#0C3CCD', h_shadow: '#5DCDF0', h_line: '#60CCF4'},
      contaminated_mer:   {c: '#0429F3', c_shadow: '#F6CA52', c_line: '#F5CC29', h: '#F5CA52', h_shadow: '#A03219', h_line: '#9F330B'},
    }, {
      background_bottom:  '#95454C',
      good_mer:           {c: '#01B8B8', c_shadow: '#FFD571', c_line: '#B7F8F2', h: '#BFFE90', h_shadow: '#F25B94', h_line: '#16CBB9'},
      contaminated_mer:   {c: '#EB3349', c_shadow: '#DCE0DF', c_line: '#B7F8F2', h: '#66318A', h_shadow: '#EB3349', h_line: '#E93446'},
    }, {
      background_bottom:  '#004F48',
      good_mer:           {c: '#00CBBA', c_shadow: '#CDF8F4', c_line: '#B7F8F2', h: '#ABFD8A', h_shadow: '#96454D', h_line: '#95454C'},
      contaminated_mer:   {c: '#EB3349', c_shadow: '#31070C', c_line: '#48070D', h: '#530E84', h_shadow: '#93BBF9', h_line: '#E93446'},
    }, {
      background_bottom:  '#8600A6',
      good_mer:           {c: '#A92B89', c_shadow: '#FFF36F', c_line: '#FFF54D', h: '#FFF36F', h_shadow: '#231F20', h_line: '#A8278E'},
      contaminated_mer:   {c: '#52D77F', c_shadow: '#021BAA', c_line: '#000AB2', h: '#021BAA', h_shadow: '#DCE0DF', h_line: '#57D871'},
    }, {
      background_bottom:  '#2D1A70',
      good_mer:           {c: '#A92299', c_shadow: '#F2A675', c_line: '#F1766B', h: '#F2756F', h_shadow: '#A1E1E3', h_line: '#A81B9F'},
      contaminated_mer:   {c: '#51E374', c_shadow: '#028992', c_line: '#0E8994', h: '#028992', h_shadow: '#000000', h_line: '#57E460'},
    }, {
      background_bottom:  '#0B187A',
      good_mer:           {c: '#1D38B5', c_shadow: '#D8EF81', c_line: '#D9F16B', h: '#D8EF81', h_shadow: '#1D38B5', h_line: '#1C31BD'},
      contaminated_mer:   {c: '#E3CC5E', c_shadow: '#27198D', c_line: '#260E94', h: '#27198D', h_shadow: '#E3CC5E', h_line: '#E3CE42'},
    }
  ]
  var COLORS = null
  var BAD_MER_COLOR = '#FF0000'
  var POWERPILL_COLOR = '#FFFF00'
  
  var TIME_LEFT = 0
  var TARGET_MERS = 0
  var TOTAL_MERS = 0
  
  // -----------------------------------------------------------------
  
  
  var LEVELS = [
     {time: 45*1000, target: 10, percent_bad: 0.1, percent_contamination: 0.1, percent_powerpill: 0.045, falling_rate_min: .25, falling_rate_max: .1, mer_spawn_rate: 1000}
    ,{time: 75*1000, target: 15, percent_bad: 0.2, percent_contamination: 0.15, percent_powerpill: 0.05, falling_rate_min: .15, falling_rate_max: .3, mer_spawn_rate: 1000}
    ,{time: 75*1000, target: 15, percent_bad: 0.25, percent_contamination: 0.15, percent_powerpill: 0.055, falling_rate_min: .2, falling_rate_max: .4, mer_spawn_rate: 1000}
    ,{time: 120*1000, target: 20, percent_bad: 0.3, percent_contamination: 0.15, percent_powerpill: 0.06, falling_rate_min: .25, falling_rate_max: .5, mer_spawn_rate: 1000}
    ,{time: 120*1000, target: 20, percent_bad: 0.5, percent_contamination: 0.15, percent_powerpill: 0.065, falling_rate_min: .25, falling_rate_max: .65, mer_spawn_rate: 1000}
    ,{time: 120*1000, target: 35, percent_bad: 0.5, percent_contamination: 0.2, percent_powerpill: 0.07, falling_rate_min: .25, falling_rate_max: .65, mer_spawn_rate: 1000}
    ,{time: 120*1000, target: 50, percent_bad: 0.65, percent_contamination: 0.2, percent_powerpill: 0.075, falling_rate_min: .35, falling_rate_max: .75, mer_spawn_rate: 1000}
  ]
  var LEVEL_I = 0
  
  // -----------------------------------------------------------------
  
  
  var stop = function() {
    LOOPING = false
    Timer.pause_all()
  }
  
  
  var start = function() {
    LOOPING = true
    LAST_LOOP_TIME = Date.now()
    Timer.resume_all()
    loop()
  }
  
  
  var start_new_level = function() {
    CAN_PAUSE = true
    Message.hide()
    
    POWERPILL = false
    Timer.clear(POWERPILL_TIMEOUT)
    
    Game.stop_sound('theme')
    Game.stop_sound('powerpill_background')
    Game.stop_sound('background').play_sound('background')
    Game.play_sound('new_level')
    
    var level = LEVELS[LEVEL_I]
    
    TIME_LEFT = level.time
    TARGET_MERS = level.target
    PERCENT_BAD = level.percent_bad
    PERCENT_CONTAMINATION = level.percent_contamination
    PERCENT_POWERPILL = level.percent_powerpill
    FALLING_RATE_MIN = level.falling_rate_min
    FALLING_RATE_MAX = level.falling_rate_max
    MER_SPAWN_RATE = level.mer_spawn_rate
    FALLING_MERS = []
    POLYMER_CHAIN.contamination = 0
    POLYMER_CHAIN.mers = [{
      type: 'good',
      x: 0,
      y: HEIGHT / 2,
      vx: 0,
      vy: 0,
      a: 0,
      va: 0.0
    }]
    POLYMER_CHAIN.total_length = 1
    
    var level_color_i = LEVEL_I % LEVEL_COLORS.length
    COLORS = LEVEL_COLORS[level_color_i]
    BACKGROUND_BOTTOM_COLOR = COLORS.background_bottom
    $('#info').css('background-color', COLORS.background_bottom)
    $('#info div.collected .level').html(LEVEL_I+1)
    
    $('#info .collected .target').html(TARGET_MERS)
    update_score()
    
    start()
  }
  
  
  var update_time = function() {
    $('#info .time .val').html(format_time(TIME_LEFT))
  }
  
  
  var update_score = function() {
    $('#info .collected .num').html(POLYMER_CHAIN.total_length - 1) // Ignore the first base mer
  }
  
  
  var end_level = function() {
    CAN_PAUSE = false
    stop()
    
    // Have they completed the level?
    if(POLYMER_CHAIN.total_length - 1 >= TARGET_MERS) {
      Game.play_sound('level_complete')
      $('#next_level_message .level_complete .val').html(LEVEL_I+1)
      LEVEL_I++
      if(LEVEL_I >= LEVELS.length) LEVEL_I = LEVELS.length - 1
      TOTAL_MERS += POLYMER_CHAIN.total_length - 1
      $('#next_level_message .length .val').html(TOTAL_MERS + LEVEL_I*MER_BONUS)
      $('#next_level_message .needed .num').html(LEVELS[LEVEL_I].target)
      $('#next_level_message .needed .level').html('Level '+(LEVEL_I+1))
      
      if(LEVEL_I == 3) {
        Game.unlock_achievement('polymer_chain_game_1', 'Polymer Pro!', function() {
          Message.display($('#next_level_message'), 1500)
          start_game_timeout = setTimeout(start_new_level, 1500)
        })
      } else if(LEVEL_I == 6) {
        Game.unlock_achievement('polymer_chain_game_2', 'Polymer Champ!', function() {
          Message.display($('#next_level_message'), 1500)
          start_game_timeout = setTimeout(start_new_level, 1500)
        })
      } else {
        Message.display($('#next_level_message'), 4000)
        start_game_timeout = setTimeout(start_new_level, 4000)
      }
      
    } else {
      Game.play_sound('game_over')
      User.save_score('polymer_chain_game', TOTAL_MERS + LEVEL_I*MER_BONUS, 'Level '+(LEVEL_I+1))
      Message.display($('#game_over_message'), -1)
    }
  }
  
  $('#game_over_message').click(function() {Game.show_high_scores()})
  
  
  // Add a falling mer to the stage
  var add_falling_mer = function() {
    var rand = Math.random()
    if(rand < PERCENT_BAD) {
      var type = 'bad'
    } else if(rand < PERCENT_BAD + PERCENT_CONTAMINATION) {
      var type = 'contamination'
    } else if(rand < PERCENT_BAD + PERCENT_CONTAMINATION + PERCENT_POWERPILL) {
      var type = 'powerpill'
    } else {
      var type = 'good'
    }
    
    FALLING_MERS.push({
      type: type,
      x: ZOOM_WIDTH + MER_DIAMETER,
      y: ZOOM_TOP + Math.random() * ZOOM_HEIGHT,
      vx: -1 * (FALLING_RATE_MIN + Math.random()*(FALLING_RATE_MAX - FALLING_RATE_MIN)),
      vy: 0,
      a: 0,
      va: 0.01 * (Math.random() - Math.random())
    })
  }
  
  
  /* Twiddle refers to manipulating the polymer chain based on the current time
  * (which causes the polymer chain to sway slightly) and off of the given X and
  * Y mouse positions (which the polymer chain tries to angle itself towards). */
  var twiddle_polymer_chain = function(y, min, max) {
    var base = Math.constrain(y, min, max)
    var c = (1 - 1 / (POLYMER_CHAIN.contamination + 1)) * POLYMER_CHAIN.contamination_multiplier
    var period = Math.max(POLYMER_CHAIN.sway_period * (1 - c), POLYMER_CHAIN.min_sway_period)
    var magnitude = POLYMER_CHAIN.sway_magnitude * (1 + 3*c)
    var sway = Math.cos(LAST_LOOP_TIME / period) * magnitude
    
    var mer = POLYMER_CHAIN.mers[Math.max(POLYMER_CHAIN.mers.length - POLYMER_CHAIN.max_visible_mers, 0)]
    mer.a = sway
    mer.vx = 0
    mer.vy += (base - mer.y) * POLYMER_CHAIN.rate_of_acceleration
    mer.va = 0
  }
  
  
  // Update a single mer in the polymer chain
  var update_polymer_chain_mer = function(mer) {
    var v = mer.vx * mer.vx + mer.vy * mer.vy

    /* If the mer is travelling faster than MAX_VELOCITY, we only allow some of
     * the velocity (determined by MAX_VELOCITY_DAMPING) to be imparted. This is
     * something like a smoothed terminal velocity, which helps prevent things
     * from looking crazy or getting out of control. */
  
    if(v < MER_MAX_VELOCITY_2) {
      v = 1
    } else {
      v = 1 + (MER_MAX_VELOCITY / Math.sqrt(v) - 1) * MER_MAX_VELOCITY_DAMPING
    }
    
    mer.x += mer.vx * v
    mer.y += mer.vy * v
    mer.a += mer.va
  }
  
  
   /* Updating the polymer chain consists mostly of simply updating each mer in
   * the chain. However, by being attached to the chain, each mer has a little
   * special functionality to undertake.
   *
   * First, each mer has a DAMPING factor, which is essentially friction--it
   * causes each mer to slow down a little bit relative to the previous frame.
   *
   * Secondly, each mer is attracted to where it "ought to be" based on where the
   * mer below it on the chain is situated.
   *
   * The interplay between the attractive force and the frictional force is what
   * gives the polymer chain it's "waviness." */
  var update_polymer_chain = function() {
    var mers = POLYMER_CHAIN.mers
    
    var base = Math.max(mers.length - POLYMER_CHAIN.max_visible_mers, 0)
    var min = Math.max(base - 4, 0)
    var i, a, b
    
    b = mers[base]
    update_polymer_chain_mer(b)
    
    b.vx *= POLYMER_CHAIN.damping
    b.vy *= POLYMER_CHAIN.damping
    b.va *= POLYMER_CHAIN.damping
    
    for(i = base + 1; i < mers.length; ++i) {
      a = b
      b = mers[i]
      
      b.vx += (a.x + Math.cos (a.a) * MER_CHAIN_DISTANCE - b.x) * POLYMER_CHAIN.rate_of_acceleration
      b.vy += (a.y + Math.sin (a.a) * MER_CHAIN_DISTANCE - b.y) * POLYMER_CHAIN.rate_of_acceleration
      b.va += (a.a - b.a) * POLYMER_CHAIN.rate_of_acceleration
      
      update_polymer_chain_mer(b)
      
      b.vx *= POLYMER_CHAIN.damping
      b.vy *= POLYMER_CHAIN.damping
      b.va *= POLYMER_CHAIN.damping
    }
    
    b = mers[base]
    
    for(i = base - 1; i >= min; --i) {
      a = b
      b = mers[i]
  
      b.vx += (a.x - Math.cos (a.a) * MER_CHAIN_DISTANCE - b.x) * POLYMER_CHAIN.rate_of_acceleration
      b.vy += (a.y - Math.sin (a.a) * MER_CHAIN_DISTANCE - b.y) * POLYMER_CHAIN.rate_of_acceleration
      b.va += (a.a - b.a) * POLYMER_CHAIN.rate_of_acceleration
  
      update_polymer_chain_mer(b)
    
      b.vx *= POLYMER_CHAIN.damping
      b.vy *= POLYMER_CHAIN.damping
      b.va *= POLYMER_CHAIN.damping
    }
  }
    
  
  // Draw a single atom
  var draw_atom = function(x, y, r, fore, back, line) {
    CONTEXT.save()
    
/* 
    CONTEXT.strokeStyle = line
    CONTEXT.lineWidth = 1

 */
  
    // Draw the ball
    CONTEXT.fillStyle = fore
    CONTEXT.beginPath()
    CONTEXT.arc(x, y, r, 0, Math.PI * 2, false)
//     CONTEXT.stroke()
    CONTEXT.fill()
    
    // Set the clipping region for the highlight
/* 
    CONTEXT.beginPath()
    CONTEXT.arc(x, y, r*0.8, 0, Math.PI * 2, false)
    CONTEXT.clip()
    
    // Draw the highlight
    CONTEXT.fillStyle = back
    CONTEXT.fillRect(x - r, y - r, 2*r, 2*r)
    
    // Draw the fill color again
    CONTEXT.fillStyle = fore
    CONTEXT.beginPath()
    CONTEXT.arc(x + 0.35*r, y - 0.15*r, 0.75*r, 0, Math.PI * 2, false)
    CONTEXT.fill()

 */
    
    CONTEXT.restore()
    
    // Clean up weird clipping artifact line
/* 
    CONTEXT.strokeStyle = fore
    CONTEXT.lineWidth = 1
    CONTEXT.beginPath()
    CONTEXT.arc(x, y, r*0.8, 0, Math.PI * 2, false)
    CONTEXT.stroke()

 */
  }
  
  
  // Draw a single mer (which is a collection of atoms)
  var draw_mer = function(mer, x_offset, hydrogen_offset) {
    CONTEXT.save()
    
    CONTEXT.translate((x_offset || 0) + mer.x / ZOOM, (mer.y - ZOOM_TOP) / ZOOM)
    if(hydrogen_offset) CONTEXT.translate(0, hydrogen_offset)
    CONTEXT.rotate(mer.a)
    
    if(mer.type == 'good') {
      var colors = COLORS['good_mer']
      if(hydrogen_offset > 0) {
        CONTEXT.translate(hydrogen_offset, 0)
        draw_atom(0, ZOOM_MER_RADIUS * -1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
        draw_atom(0, ZOOM_MER_RADIUS * 1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
        CONTEXT.translate(-1*hydrogen_offset, 0)
        draw_atom(0, 0, ZOOM_MER_RADIUS, colors.c, colors.c_shadow, colors.c_line)
      } else {
        draw_atom(0, 0, ZOOM_MER_RADIUS, colors.c, colors.c_shadow, colors.c_line)
        if(hydrogen_offset) CONTEXT.translate(hydrogen_offset, 0)
        draw_atom(0, ZOOM_MER_RADIUS * -1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
        draw_atom(0, ZOOM_MER_RADIUS * 1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
      }
    
    } else if(mer.type == 'contamination') {
      var colors = COLORS['contaminated_mer']
      draw_atom(0, 0, ZOOM_MER_RADIUS, colors.c, colors.c_shadow, colors.c_line)
      draw_atom(0, ZOOM_MER_RADIUS * -1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
      draw_atom(0, ZOOM_MER_RADIUS * 1.125, ZOOM_MER_RADIUS * 0.375, colors.h, colors.h_shadow, colors.h_line)
    
    } else if(mer.type == 'bad') {
      if(POWERPILL) {
        CONTEXT.save()
        CONTEXT.globalAlpha = 0.5 + Math.cos(LAST_LOOP_TIME * .01) / 4
        CONTEXT.fillStyle = BAD_MER_COLOR
        CONTEXT.fillRect(-1*ZOOM_MER_RADIUS, -1*ZOOM_MER_RADIUS, MER_DIAMETER, MER_DIAMETER)
        CONTEXT.restore()
      } else {
        CONTEXT.fillStyle = BAD_MER_COLOR
        CONTEXT.fillRect(-1*ZOOM_MER_RADIUS, -1*ZOOM_MER_RADIUS, MER_DIAMETER, MER_DIAMETER)
      }
    
    } else if(mer.type == 'powerpill') {
      var colors = COLORS['powerpill']
      CONTEXT.fillStyle = POWERPILL_COLOR
      CONTEXT.beginPath()
      CONTEXT.arc(0, 0, ZOOM_MER_RADIUS, 0, Math.PI * 2, false)
      CONTEXT.stroke()
      CONTEXT.fill()
    }
    
    CONTEXT.restore()
  }
  
  // Set the objects to null for stupid garbage collector
  var to_null = function(objects) {
    for(var i = 0, ii = objects.length; i < ii; i++) {
      objects[i] = null
    }
  }
  
  
  // Update and draw the stage
  var loop = function() {
    var time = Date.now()
    INTERVAL = time - LAST_LOOP_TIME
    LAST_LOOP_TIME = time
    
    TIME_LEFT -= INTERVAL
    if(TIME_LEFT < 0) TIME_LEFT = 0
    update_time()
    if(TIME_LEFT == 0) end_level()
    
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    
    // Update the background images
    BACKGROUND_BOTTOM_X += BACKGROUND_BOTTOM_VELOCITY * INTERVAL / ZOOM
    BACKGROUND_TOP_X += BACKGROUND_TOP_VELOCITY * INTERVAL / ZOOM
    var bottom_y = 50 * (1 - ZOOM)
    
    CONTEXT.save()
    CONTEXT.translate(BACKGROUND_BOTTOM_X, HEIGHT - BACKGROUND_BOTTOM_IMG.height + bottom_y)
    CONTEXT.fillStyle = BACKGROUND_BOTTOM_COLOR
    CONTEXT.fillRect(-1*BACKGROUND_BOTTOM_X, 2, WIDTH, BACKGROUND_BOTTOM_IMG.height)
    CONTEXT.fillStyle = BACKGROUND_BOTTOM_IMG.pattern
    CONTEXT.fillRect(-1*BACKGROUND_BOTTOM_X, 0, WIDTH, BACKGROUND_BOTTOM_IMG.height)
    CONTEXT.restore()
    
     CONTEXT.save()
     var background_top_img = BACKGROUND_TOP_IMGS[LEVEL_I]
     CONTEXT.fillStyle = background_top_img.pattern
     CONTEXT.translate(BACKGROUND_TOP_X, HEIGHT - background_top_img.height + 2*bottom_y)
     CONTEXT.fillRect(-1*BACKGROUND_TOP_X, 2, WIDTH, background_top_img.height)
     CONTEXT.restore()
    
    // Remove mers from the chain if they're off the screen
    if(POLYMER_CHAIN.mers.length > POLYMER_CHAIN.max_visible_mers+1) {
      to_null(POLYMER_CHAIN.mers.splice(0, POLYMER_CHAIN.mers.length - POLYMER_CHAIN.max_visible_mers - 1))
    }
    
    // Update and draw the polymer chain
    var target_offset = -2*MER_RADIUS*Math.max(0, POLYMER_CHAIN.mers.length - POLYMER_CHAIN.max_visible_mers)
    var offset = (target_offset - POLYMER_CHAIN.mers[0].x) / 10
    twiddle_polymer_chain(MOUSE_Y - TOP, ZOOM_TOP, ZOOM_TOP + ZOOM_HEIGHT)
    update_polymer_chain()
    var hydrogen_offset = 0.15*ZOOM_MER_RADIUS
    for(var i = 0, ii = POLYMER_CHAIN.mers.length; i < ii; i++) {
      POLYMER_CHAIN.mers[i].x += offset
      draw_mer(POLYMER_CHAIN.mers[i], POLYMER_CHAIN.offset, i%2 ? -1*hydrogen_offset : hydrogen_offset)
    }
    
    
    // Update and draw falling mers
    var mer = null
    
    var polymer_chain_head = POLYMER_CHAIN.mers[POLYMER_CHAIN.mers.length - 1]
    
    for(var i = 0, ii = FALLING_MERS.length; i < ii; i++) {
      mer = FALLING_MERS[i]
      mer.a += mer.va * INTERVAL
      mer.x += mer.vx * INTERVAL
      
      // If the mer has fallen off the bottom of the screen, remove it
      if(mer.x < 0 - MER_DIAMETER) {
        to_null(FALLING_MERS.splice(i, 1))
        i--; ii--
        continue
      }
      
      draw_mer(mer)
      if(mer.ghost) continue
      
      // If it's a powerpill, has it hit the head of the polymer chain?
      if(mer.type == 'powerpill') {
        var dist_squared = Math.pow(polymer_chain_head.x - mer.x, 2) + Math.pow(polymer_chain_head.y - mer.y, 2)
        if(dist_squared < POLYMER_CHAIN.capture_distance_squared) {
          Game.play_sound('powerpill_hit')
          Game.stop_sound('background')
          Game.stop_sound('powerpill_background')
          Game.play_sound('powerpill_background')
          
          to_null(FALLING_MERS.splice(i, 1))
          i--; ii--
          
          POWERPILL = true
          Timer.clear(POWERPILL_TIMEOUT)
          POWERPILL_TIMEOUT = Timer.set(function() {
            POWERPILL = false
            Game.stop_sound('background')
            Game.stop_sound('powerpill_background')
            Game.play_sound('background')
          }, POWERPILL_TIME)
        }
      
      // If it's a good mer, has it hit the head of the polymer chain?
      } else if(mer.type != 'bad') {
        var dist_squared = Math.pow(polymer_chain_head.x - mer.x, 2) + Math.pow(polymer_chain_head.y - mer.y, 2)
        if(dist_squared < POLYMER_CHAIN.capture_distance_squared) {
          Game.play_sound('mer_added')
          POLYMER_CHAIN.mers.push($.extend(mer, {}))
          POLYMER_CHAIN.total_length++
          to_null(FALLING_MERS.splice(i, 1))
          i--; ii--
          if(mer.type == 'contamination') POLYMER_CHAIN.contamination++
          update_score()
        }
        
        // Is it attracted to the polymer chain?
        if(POWERPILL && mer.type == 'good') {
          mer.x += (polymer_chain_head.x - mer.x) / (.0025*dist_squared)
          mer.y += (polymer_chain_head.y - mer.y) / (.0025*dist_squared)
        }
        
      // If it's a bad mer, has it hit anywhere on the chain?
      } else if(!POWERPILL && mer.type == 'bad') {
        var hit_i = null
        
        for(var j = 0, jj = POLYMER_CHAIN.mers.length; j < jj; j++) {
          var dist_squared = Math.pow(POLYMER_CHAIN.mers[j].x - mer.x, 2) + Math.pow(POLYMER_CHAIN.mers[j].y - mer.y, 2)
          if(dist_squared < POLYMER_CHAIN.capture_distance_squared) {
            hit_i = j
            break
          }
        }
        
        if(hit_i == 0) hit_i = 1
        
        if(hit_i !== null) {
          Game.play_sound('polymer_sliced')
          mer.ghost = true
          mer.vx *= 4
          var hit_mers = POLYMER_CHAIN.mers.splice(hit_i)
          POLYMER_CHAIN.total_length -= hit_mers.length
          var hit_mer = null
          for(var j = 0; j < hit_mers.length; j++) {
            hit_mer = hit_mers[j]
            hit_mer.vx = mer.vx
            hit_mer.vy = 0
            hit_mer.va = 0
            hit_mer.ghost = true
            if(hit_mer.type == 'contamination') POLYMER_CHAIN.contamination--
            FALLING_MERS.push(hit_mer)
          }
        }
        
        update_score()
      } 
    }
    
    
    // Update bounds
    ZOOM_TARGET = (Math.min(POLYMER_CHAIN.total_length, POLYMER_CHAIN.max_visible_mers) + 4) / 16
    ZOOM += (ZOOM_TARGET - ZOOM) / 10
    ZOOM_WIDTH = WIDTH * ZOOM
    ZOOM_HEIGHT = HEIGHT * ZOOM
    ZOOM_TOP = (HEIGHT - ZOOM_HEIGHT) / 2
    ZOOM_MER_RADIUS = MER_RADIUS / ZOOM
    MER_DIAMETER = ZOOM_MER_RADIUS * 2
        
    // Add a falling mer?
    if(!LAST_MER_TIME || (time - LAST_MER_TIME > MER_SPAWN_RATE)) {
      add_falling_mer()
      LAST_MER_TIME = time
    }
    
    
    if(LOOPING) requestAnimFrame(loop, CANVAS_ELEM)
  }
  
  
  $(document).bind('mousemove', function(e) {
    MOUSE_Y = e.clientY
  })
  
  
  Math.constrain = function (i, min, max) {
    return i < min ? min : i > max ? max : i
  }
  
  
  var format_time = function(time) {
    var time_seconds = time / 1000
    var minutes = Math.floor(time_seconds / 60)
    var seconds = Math.floor(time_seconds - minutes*60)
    if(minutes < 10) minutes = '0'+minutes
    if(seconds < 10) seconds = '0'+seconds
    return minutes+':'+seconds
  }
  
  
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'mer_added',
      url: 'sounds/mer_added.mp3',
      volume: 50
    }, {
      id: 'powerpill_hit',
      url: 'sounds/powerpill_hit.mp3',
      volume: 50
    }, {
      id: 'polymer_sliced',
      url: 'sounds/polymer_sliced.mp3',
      volume: 50
    }, {
      id: 'level_complete',
      url: 'sounds/level_complete.mp3',
      music_muteable: true,
      volume: 30
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      music_muteable: true,
      volume: 30
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 50
    }, {
      id: 'powerpill_background',
      url: 'sounds/powerpill_background.mp3',
      stream: true,
      loops: 999999,
      volume: 45
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
      volume: 35
    }
  ])
  
  Game.load_images([
    'images/more_info.png',
    'images/background_bottom.png',
    'images/background_top/1.png',
    'images/background_top/2.png',
    'images/background_top/3.png',
    'images/background_top/4.png',
    'images/background_top/5.png',
    'images/background_top/6.png',
    'images/background_top/7.png',
    'images/background_top/8.png',
    'images/background_top/9.png',
    'images/background_top/10.png',
    'images/high_scores.png'
  ])
  
  Game.can_pause = function() {
    return CAN_PAUSE
  }
  
  $(Game).bind('pause', function(e, paused) {
    if(paused) {
      stop()
      Message.display('PAUSED', -1)
    } else {
      Message.hide()
      start()
    }
  })
  
  Game.start_gameplay = function() {
    $('#high_scores').hide()
    $('#more_info').show()
  }
  
  var start_game_timeout = null
  $('#more_info').click(function() {
    $('#more_info').hide()
    Game.stop_sound('background')
    Game.play_sound('background')
    LEVEL_I = 0
    $('#start_game_message .instructions .num').html(LEVELS[LEVEL_I].target)
    Message.display($('#start_game_message'), 4000)
    start_game_timeout = setTimeout(start_new_level, 4000)
  })
  
  $('#start_game_message, #next_level_message').click(function() {
    clearTimeout(start_game_timeout)
    start_new_level()
  })
  
  Game.show_high_scores = function() {
    Game.play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('polymer_chain_game', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="level">'+scores[i].misc+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', function() {Game.start_gameplay()})
  
  Game.initialize()
})
