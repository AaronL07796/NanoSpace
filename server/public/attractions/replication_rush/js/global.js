window._area = 'dna'
window._attraction = 'replication_rush'

// TODO:
// - Variable speed background music
// - Infinite random mode if they beat all the levels

$(window).load(function() {
  
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var BASE_LETTER = {0: 'A', 1: 'T', 2: 'G', 3: 'C'}
  var BASE_NUMBER = {'A': 0, 'T': 1, 'G': 2, 'C': 3}
  
  
  var LEVELS = [
     {name: 'Trp Cage',                     powerpill_prob: 0.1, speed_multiplier: 1.0, allowed_errors: 3, trophy: '2JOF.jpg',  sequence_str: 'GATGCGTATGCGCAGTGGCTGAAAGATGGCGGCCCGTCCTCCGGCCGTCCGCCGCCGTCC'}
    ,{name: 'Insulin',                      powerpill_prob: 0.1, speed_multiplier: 1.05, allowed_errors: 3, trophy: '1AI0.jpg',  sequence_str: 'GGCATTGTGGAACAGTGCTGCACCTCCATTTGCTCCCTGTATCAGCTGGAAAATTATTGCAATTTTGTGAATCAGCATCTGTGCGGCTCCCATCTGGTGGAAGCGCTGTATCTGGTGTGCGGCGAACGTGGCTTTTTTTATACCCCGAAAACC'}
    ,{name: 'Pheremone ER-23',              powerpill_prob: 0.1, speed_multiplier: 1.1, allowed_errors: 3, trophy: '1HA8.jpg',  sequence_str: 'GGCGAATGCGAACAGTGCTTTTCCGATGGCGGCGATTGCACCACCTGCTTTAATAATGGCACCGGCCCGTGCGCGAATTGCCTGGCGGGCTATCCGGCGGGCTGCTCCAATTCCGATTGCACCGCGTTTCTGTCCCAGTGCTATGGCGGCTGC'}
    ,{name: 'Fasciculin 1 (Snake Venom)',   powerpill_prob: 0.1, speed_multiplier: 1.1, allowed_errors: 3, trophy: '1FAS.jpg',  sequence_str: 'ACCATGTGCTATTCCCATACCACCACCTCCCGTGCGATTCTGACCAATTGCGGCGAAAATTCCTGCTATCGTAAATCCCGTCGTCATCCGCCGAAAATGGTGCTGGGCCGTGGCTGCGGCTGCCCGCCGGGCGATGATTATCTGGAAGTGAAATGCTGCACCTCCCCGGATAAATGCAATTAT'}
    ,{name: 'Chymotrypsin inhibitor 2',     powerpill_prob: 0.1, speed_multiplier: 1.15, allowed_errors: 3, trophy: '1COA.jpg',  sequence_str: 'ATGAAAACCGAATGGCCGGAACTGGTGGGCAAATCCGTGGAAGAAGCGAAAAAAGTGATTCTGCAGGATAAACCGGAAGCGCAGATTATTGTGCTGCCGGTGGGCACCATTGTGACCATGGAATATCGTATTGATCGTGTGCGTCTGTTTGTGGATAAACTGGATAATGTGGCGGAAGTGCCGCGTGTGGGC'}
    ,{name: 'Cold-shock protein a',         powerpill_prob: 0.1, speed_multiplier: 1.15, allowed_errors: 3, trophy: '3MEF.jpg',  sequence_str: 'TCCGGCAAAATGACCGGCATTGTGAAATGGTTTAATGCGGATAAAGGCTTTGGCTTTATTACCCCGGATGATGGCTCCAAAGATGTGTTTGTGCATTTTTCCGCGATTCAGAATGATGGCTATAAATCCCTGGATGAAGGCCAGAAAGTGTCCTTTACCATTGAATCCGGCGCGAAAGGCCCGGCGGCGGGCAATGTGACCTCCCTG'}
    ,{name: 'Tendamistat',                  powerpill_prob: 0.1, speed_multiplier: 1.2, allowed_errors: 3, trophy: '2AIT.jpg',  sequence_str: 'GATACCACCGTGTCCGAACCGGCGCCGTCCTGCGTGACCCTGTATCAGTCCTGGCGTTATTCCCAGGCGGATAATGGCTGCGCGGAAACCGTGACCGTGAAAGTGGTGTATGAAGATGATACCGAAGGCCTGTGCTATGCGGTGGCGCCGGGCCAGATTACCACCGTGGGCGATGGCTATATTGGCTCCCATGGCCATGCGCGTTATCTGGCGCGTTGCCTG'}
    ,{name: 'Ubiquitin',                    powerpill_prob: 0.1, speed_multiplier: 1.2, allowed_errors: 3, trophy: '1UBQ.jpg',  sequence_str: 'ATGCAGATTTTTGTGAAAACCCTGACCGGCAAAACCATTACCCTGGAAGTGGAACCGTCCGATACCATTGAAAATGTGAAAGCGAAAATTCAGGATAAAGAAGGCATTCCGCCGGATCAGCAGCGTCTGATTTTTGCGGGCAAACAGCTGGAAGATGGCCGTACCCTGTCCGATTATAATATTCAGAAAGAATCCACCCTGCATCTGGTGCTGCGTCTGCGTGGCGGC'}
    ,{name: 'Barstar',                      powerpill_prob: 0.1, speed_multiplier: 1.25, allowed_errors: 3, trophy: '1BTA.jpg',  sequence_str: 'AAAAAAGCGGTGATTAATGGCGAACAGATTCGTTCCATTTCCGATCTGCATCAGACCCTGAAAAAAGAACTGGCGCTGCCGGAATATTATGGCGAAAATCTGGATGCGCTGTGGGATTGCCTGACCGGCTGGGTGGAATATCCGCTGGTGCTGGAATGGCGTCAGTTTGAACAGTCCAAACAGCTGACCGAAAATGGCGCGGAATCCGTGCTGCAGGTGTTTCGTGAAGCGAAAGCGGAAGGCTGCGATATTACCATTATTCTGTCC'}
    ,{name: 'Tenascin',                     powerpill_prob: 0.1, speed_multiplier: 1.25, allowed_errors: 3, trophy: '1TEN.jpg',  sequence_str: 'CGTCTGGATGCGCCGTCCCAGATTGAAGTGAAAGATGTGACCGATACCACCGCGCTGATTACCTGGTTTAAACCGCTGGCGGAAATTGATGGCATTGAACTGACCTATGGCATTAAAGATGTGCCGGGCGATCGTACCACCATTGATCTGACCGAAGATGAAAATCAGTATTCCATTGGCAATCTGAAACCGGATACCGAATATGAAGTGTCCCTGATTTCCCGTCGTGGCGATATGTCCTCCAATCCGGCGAAAGAAACCTTTACCACC'}
    ,{name: 'CytochromeC',                  powerpill_prob: 0.1, speed_multiplier: 1.3, allowed_errors: 3, trophy: '1HRC.jpg',  sequence_str: 'GGCGATGTGGAAAAAGGCAAAAAAATTTTTGTGCAGAAATGCGCGCAGTGCCATACCGTGGAAAAAGGCGGCAAACATAAAACCGGCCCGAATCTGCATGGCCTGTTTGGCCGTAAAACCGGCCAGGCGCCGGGCTTTACCTATACCGATGCGAATAAAAATAAAGGCATTACCTGGAAAGAAGAAACCCTGATGGAATATCTGGAAAATCCGAAAAAATATATTCCGGGCACCAAAATGATTTTTGCGGGCATTAAAAAAAAAACCGAACGTGAAGATCTGATTGCGTATCTGAAAAAAGCGACCAATGAA'}
  ]
  var LEVEL_I = 0
  
  
  var AMINO_ACIDS = {
    'ATT': 'Isoleucine', 'ATC': 'Isoleucine', 'ATA': 'Isoleucine',  
    'CTT': 'Leucine', 'CTC': 'Leucine', 'CTA': 'Leucine', 'CTG': 'Leucine', 'TTA': 'Leucine', 'TTG': 'Leucine',
    'GTT': 'Valine', 'GTC': 'Valine', 'GTA': 'Valine', 'GTG': 'Valine',
    'TTT': 'Phenylalanine', 'TTC': 'Phenylalanine',
    'ATG': 'Methionine',
    'TGT': 'Cysteine', 'TGC': 'Cysteine',
    'GCT': 'Alanine', 'GCC': 'Alanine', 'GCA': 'Alanine', 'GCG': 'Alanine',
    'GGT': 'Glycine', 'GGC': 'Glycine', 'GGA': 'Glycine', 'GGG': 'Glycine',
    'CCT': 'Proline', 'CCC': 'Proline', 'CCA': 'Proline', 'CCG': 'Proline',
    'ACT': 'Threonine', 'ACC': 'Threonine', 'ACA': 'Threonine', 'ACG': 'Threonine',
    'TCT': 'Serine', 'TCC': 'Serine', 'TCA': 'Serine', 'TCG': 'Serine', 'AGT': 'Serine', 'AGC': 'Serine',
    'TAT': 'Tyrosine', 'TAC': 'Tyrosine',
    'TGG': 'Tryptophan',
    'CAA': 'Glutamine', 'CAG': 'Glutamine',
    'AAT': 'Asparagine', 'AAC': 'Asparagine',
    'CAT': 'Histidine', 'CAC': 'Histidine',
    'GAA': 'Glutamic acid', 'GAG': 'Glutamic acid',
    'GAT': 'Aspartic acid', 'GAC': 'Aspartic acid',
    'AAA': 'Lysine', 'AAG': 'Lysine',
    'CGT': 'Arginine', 'CGC': 'Arginine', 'CGA': 'Arginine', 'CGG': 'Arginine', 'AGA': 'Arginine', 'AGG': 'Arginine',
    'TAA': 'Stop codon', 'TAG': 'Stop codon', 'TGA': 'Stop codon'
  }
  
  
  var CANVAS = $('#canvas')
  var CANVAS_ELEM = CANVAS[0]
  var CONTEXT = CANVAS[0].getContext('2d')
  
  var WIDTH = CANVAS.width()
  var HEIGHT = CANVAS.height()
    
  var BASE = {}
  BASE.width = 49
  BASE.height = 67
  BASE.img = [new Image(), new Image(), new Image(), new Image()]
  BASE.img[0].src = 'images/base_pairs/1.png'
  BASE.img[1].src = 'images/base_pairs/2.png'
  BASE.img[2].src = 'images/base_pairs/3.png'
  BASE.img[3].src = 'images/base_pairs/4.png'
  
  var POLYMERASE = {
    img: new Image(),
    top: 2,
    left: 205,
    height: 242,
    front_offset: 48,
    front_padding: 10
  }
  POLYMERASE.img.src = 'images/polymerase.png'

  var HELIX = {
    img: new Image(),
    pattern: null,
    top: 63,
    width: 600,
    height: 118,
    offset: 0,
    speed: 0.3
  }
  HELIX.img.src = 'images/helix.png'
  HELIX.img.onload = function() {HELIX.pattern = CONTEXT.createPattern(HELIX.img, 'repeat-x')}
  
  var BASES_ON_SCREEN = Math.ceil(WIDTH / BASE.width) + 1
  
  var LEVEL = {}
  var SEQUENCE_I = -1
  
  // VISIBLE_SEQUENCE is the storage for the currently visible portion of the level's sequence
  var VISIBLE_SEQUENCE = []
  
  // VISIBLE_SEQUENCE_I is the total number of bases in the bottom strand (i.e. bases to be matched)
  // MATCHING_I is the total number of complete matching bases pairs in the sequence
  // MATCHING_IN_PLACE_I is the number that are actually in place.
  // The difference between the two should be the number of base pairs that are sliding into position, (i.e. the length of SLIDING_BASES)
  var VISIBLE_SEQUENCE_I = -1
  var MATCHING_I = -1
  var MATCHING_IN_PLACE_I = -1
  
  var MATCH_HISTORY = [] // used to calculate the average speed at which the user completes base pairs
  var MATCH_HISTORY_LENGTH = 5
  
  var NEXT_BASE = null // The next base that needs to be filled in the sequence
  
  var OFFSET_X = 0
  var PREV_BASE_X = OFFSET_X - BASE.width
  
  var TOP_Y = 58
  var BOTTOM_Y = 186
  
  var FLOATING_BASE_TOP = 225
  var FLOAT_BASE_BOTTOM = 70
  var FLOATING_BASE_TIME = 1000
  var NEW_BASE_TIMEOUT = null
  
  var ERRORS = 0
  
  var INITIAL_SPEED = 0.03    // pixels per ms
  var SPEED = INITIAL_SPEED   // pixels per ms
  var MIN_SPEED = 0.030       // pixels per ms
  
  var PREVIOUS_TIME = new Date().getTime()
  var INTERVAL = 33           // ms
  
  var SCORE = 0
  
  var LOOP = true
  
  var FLOATING_BASES = []
  var SLIDING_BASES = []
  
  var POWERPILL_PROB = 0.1
  
  
  // -------------------------------------------------------------------
  
  
  var stop = function() {
    LOOP = false
    clearInterval(NEW_BASE_TIMEOUT)
  }
  
  
  var go = function() {
    LOOP = true
    PREVIOUS_TIME = new Date().getTime()
    loop()
    add_floating_base()
    update_speed()
    update_score()
    update_errors(false)
  }
  
  
  var point_in_box = function(point, box_corner, box_width, box_height, box_angle) {
    var v = [point[0]-box_corner[0], point[1]-box_corner[1]]
    var v1 = [box_width * Math.cos(box_angle), box_width * Math.sin(box_angle)]
    var v2 = [box_height * Math.cos(box_angle + (Math.PI/2)), box_height * Math.sin(box_angle + (Math.PI/2))]
    
    var dot_v_v1 = Math.dot2D(v, v1)
    var dot_v1_v1 = Math.dot2D(v1, v1)
    var dot_v_v2 = Math.dot2D(v, v2)
    var dot_v2_v2 = Math.dot2D(v2, v2)
    
    return(0 <= dot_v_v1 && dot_v_v1 <= dot_v1_v1 && 0 <= dot_v_v2 && dot_v_v2 <= dot_v2_v2)
  }
  
  
  var add_next_base_to_sequence = function() {
    if(!LEVEL.infinite && (!LEVEL.sequence || SEQUENCE_I >= LEVEL.sequence.length - 1)) return false
    
    SEQUENCE_I++
    VISIBLE_SEQUENCE_I++
    PREV_BASE_X += BASE.width
    
    // Are we in infinite random mode?
    if(LEVEL.infinite) {
      var base = {
        num:  Math.floor(Math.random()*4),
        x: PREV_BASE_X,
        i: VISIBLE_SEQUENCE_I
      }
      LEVEL.sequence.push(base.num)
    
    // Get next base in sequence
    } else {                
      var base = {
        num: LEVEL.sequence[SEQUENCE_I],
        x: PREV_BASE_X,
        i: VISIBLE_SEQUENCE_I
      }
    }
    
    VISIBLE_SEQUENCE.push(base)
    return base
  }
  
  
  var add_floating_base = function() {
    remove_floating_bases()
    
    // 1) If FLOATING_BASES doesn't contain the next few bases we need, then add it
    // 2) If any base doesn't exist, add it
    // 3) Otherwise, just pick a random base
    
    var next_bases = []
    for(var i = 0, ii = VISIBLE_SEQUENCE.length; i < ii; i++) {
      if(VISIBLE_SEQUENCE[i].i <= MATCHING_I) continue
      next_bases.push(matching_base(VISIBLE_SEQUENCE[i].num))
      if(next_bases.length > 4) break
    }
    
    var base_exists = [false, false, false, false]
    for(var i = 0, ii = FLOATING_BASES.length; i < ii; i++) {
      var next_bases_i = next_bases.indexOf(FLOATING_BASES[i].num)
      if(next_bases_i != -1) next_bases.splice(next_bases_i, 1)
      base_exists[FLOATING_BASES[i].num] = true
    }
    
    if(next_bases.length > 0) {
      var num = next_bases[0]
    } else {
      var num_that_doesnt_exist = base_exists.indexOf(false)
      var num = (num_that_doesnt_exist == -1) ? Math.floor(Math.random()*4) : num_that_doesnt_exist
    }
    
    var speed_multiple = SPEED / INITIAL_SPEED
    
    FLOATING_BASES.push({
      num: num,
      x: WIDTH,
      y: FLOATING_BASE_TOP + Math.random() * (HEIGHT - FLOATING_BASE_TOP - FLOAT_BASE_BOTTOM),
      vx: (-0.1 * Math.random() - 0.05) * speed_multiple,
      angle: Math.random() * 2 * Math.PI,
      i: null,
      powerpill: Math.random() < POWERPILL_PROB ? true : false
    })
    
    NEW_BASE_TIMEOUT = setTimeout(add_floating_base, FLOATING_BASE_TIME / speed_multiple)
  }
  
  
  // Remove any floating bases that are off the screen
  var remove_floating_bases = function() {
    var removed_indices = []
    
    for(var i = 0, ii = FLOATING_BASES.length; i < ii; i++) {
      if(FLOATING_BASES[i].x + BASE.height + BASE.width < 0) {
        removed_indices.push(i)
      }
    }
    
    FLOATING_BASES.remove_elements(removed_indices)
  }
  
  
  var matching_base = function(base) {
    if(base == 0) return 1
    if(base == 1) return 0
    if(base == 2) return 3
    else          return 2
  }
  
  
  var draw_base = function(base) {
    CONTEXT.save()
    CONTEXT.translate(base.x + BASE.width, base.y)
    CONTEXT.rotate(base.angle)
    CONTEXT.drawImage(BASE.img[base.num], 0, 0)
    CONTEXT.restore()
  }
  
  
  var draw_sequence = function() {
    var base
    for(var i = 0, ii = VISIBLE_SEQUENCE.length; i < ii; i++) {
      base = VISIBLE_SEQUENCE[i]
      CONTEXT.drawImage(BASE.img[base.num], OFFSET_X + base.x, TOP_Y)
      
      // If there's a matching base, draw it too
      if(base.i <= MATCHING_IN_PLACE_I) {
        CONTEXT.save()
        CONTEXT.translate(OFFSET_X + base.x + BASE.width, BOTTOM_Y)
        CONTEXT.rotate(Math.PI)
        CONTEXT.drawImage(BASE.img[matching_base(base.num)], 0, 0)
        CONTEXT.restore()
      }
    }
  }
  
  
  var draw_sliding_bases = function() {
    var speed = 6
    var base
    
    var removed_indices = []
    
    for(var i = 0, ii = SLIDING_BASES.length; i < ii; i++) {
      base = SLIDING_BASES[i]
      var d_angle = base.angle - Math.PI
      var d_x = base.x - (base.i * BASE.width) - OFFSET_X
      var d_y = base.y - BOTTOM_Y
      
      base.angle -= d_angle / speed
      base.x -= d_x / speed
      base.y -= d_y / speed
      
      // If the sliding base is close enough, remove it from the array of sliding bases
      if(Math.sqrt(d_x*d_x + d_y*d_y) < 100) {
        MATCHING_IN_PLACE_I++
        removed_indices.push(i)
      }
      
      draw_base(base)
    }
    
    SLIDING_BASES.remove_elements(removed_indices)
  }
  
  
  var draw_floating_bases = function() {
    var base
    for(var i = 0, ii = FLOATING_BASES.length; i < ii; i++) {
      base = FLOATING_BASES[i]
      base.x += base.vx * INTERVAL
      
      if(base.powerpill) {
        CONTEXT.globalAlpha = 0.5 + Math.cos(Date.now() / 100) / 4
        draw_base(base)
        CONTEXT.globalAlpha = 1
      
      } else {
        draw_base(base)
      }
    }
  }
  
  
  var draw_polymerase = function() {
    var front = POLYMERASE.left + POLYMERASE.front_offset - POLYMERASE.front_padding
    CONTEXT.clearRect(0, 0, front, POLYMERASE.top + POLYMERASE.height)
    
    // Draw Helix
    HELIX.offset -= HELIX.speed
    if(HELIX.offset > HELIX.width) HELIX.offset = 0
    
    CONTEXT.fillStyle = HELIX.pattern
    CONTEXT.save()
    CONTEXT.translate(HELIX.offset, HELIX.top)
    CONTEXT.fillRect(-1*HELIX.offset, 0, front, HELIX.height)
    CONTEXT.restore()
    
    // Draw Polymerase
    CONTEXT.save()
    CONTEXT.translate(POLYMERASE.left, POLYMERASE.top)
    CONTEXT.drawImage(POLYMERASE.img, 0, 0)
    CONTEXT.restore()
  }
  
  
  // If they get too close to the front edge, make it go faster than it otherwise would
  var update_speed = function() {
    var num_matches = MATCH_HISTORY.length - 1
    
    if(num_matches > 0) {
      var avg_time = 0
      var last_nonzero_time = 5000
      var time
      for(var i = 0; i < num_matches; i++) {
        time = MATCH_HISTORY[i+1] - MATCH_HISTORY[i]
        if(time < 100) time = last_nonzero_time
        last_nonzero_time = time
        avg_time += time
      }
      
      avg_time /= num_matches
      
      // avg_time is essentially the average time to go BASE.width pixels, so
      var pixels_per_ms = LEVEL.speed_multiplier * BASE.width / avg_time
      
      SPEED = Math.max(MIN_SPEED, pixels_per_ms)
    }
    
    $('#speed .value').html(Math.round(1000*SPEED))
  }
  
  
  var update_errors = function(display_message) {
    if(display_message !== false) {
      Message.display('WRONG BASE!', 500)
    }
    
    $('#errors .value').html(ERRORS+'/'+LEVEL.allowed_errors)
    if(ERRORS >= LEVEL.allowed_errors) game_over('Too Many Replication Errors')
  }
  
  
  var add_to_score = function(points) {
    SCORE += points
    Message.display('+'+points, 500)
    update_score()
  }
  
  
  var update_score = function() {
    $('#score .value').html(SCORE)
  }
  
  
  var game_over = function(message) {
    Game.play_sound('game_over')
    stop()
    User.save_score('replication_rush', SCORE)
    $('#game_over_message .alert').html(message)
    Message.display($('#game_over_message'), -1)
  }
  
  $('#game_over_message').click(function(){Game.show_high_scores()})
  
  
  var draw = function() {
    CONTEXT.clearRect(0, 0, WIDTH, HEIGHT)
    draw_sequence()
    draw_sliding_bases()
    draw_polymerase()
    draw_floating_bases()
  }
  
    
  var loop = function() {
    var time = new Date().getTime()
    INTERVAL = time - PREVIOUS_TIME
    PREVIOUS_TIME = time
    
    OFFSET_X -= SPEED * INTERVAL
    update_speed()
    
    // Has a base in the sequence moved off the page?
    if(OFFSET_X + VISIBLE_SEQUENCE[0].x + BASE.width - POLYMERASE.left - POLYMERASE.front_offset < 0) {
      
      // If it was unmatched, the game is over
      if(VISIBLE_SEQUENCE[0].i >= MATCHING_I) {
        game_over('Unmatched Base Pair')
      
      // Otherwise, remove it and add another
      } else {
        Game.play_sound('metronome')
        VISIBLE_SEQUENCE.splice(0, 1)
        add_next_base_to_sequence()
      }
    }
    
    draw()
    
    if(LOOP) requestAnimFrame(loop, CANVAS_ELEM)
  }
  
  
  // A base has been selected, so move it up to the chain
  var select_base = function(base) {
    MATCHING_I++
    
    // Have we completed an amino acid?
    var amino_acid_completed = (MATCHING_I+1) % 3 == 0
    if(amino_acid_completed) {
      Game.play_sound('amino_created')
      
      var codon = ''+BASE_LETTER[LEVEL.sequence[MATCHING_I-2]]+''+BASE_LETTER[LEVEL.sequence[MATCHING_I-1]]+''+BASE_LETTER[LEVEL.sequence[MATCHING_I]]
      var amino_acid = AMINO_ACIDS[codon]
      
      $('#amino_acid img').attr('src', 'images/amino_acids/'+amino_acid.replace(' ', '_', 'g')+'.png')
      $('#amino_acid span').html(amino_acid+'!')
      $('#amino_acid').clearQueue().css('opacity', 1).hide().fadeIn(200).delay(1600).fadeOut(200)
      
      // Update the score
      add_to_score(Math.round(1000*SPEED))
    
    } else {
      Game.play_sound(BASE_LETTER[base.num].toLowerCase() +'_button')
    }
    
    base.i = MATCHING_I
    SLIDING_BASES.push(base)
    FLOATING_BASES.splice(FLOATING_BASES.indexOf(base), 1)
    
    MATCH_HISTORY.push(new Date().getTime())
    if(MATCH_HISTORY.length > MATCH_HISTORY_LENGTH) MATCH_HISTORY.shift()
    
    // Are we done with the level?
    if(!LEVEL.infinite && MATCHING_I >= LEVEL.sequence.length - 1) {
      return level_completed()
    }
    
    // Find next maching base
    for(var i = 0, ii = VISIBLE_SEQUENCE.length; i < ii; i++) {
      if(VISIBLE_SEQUENCE[i].i > MATCHING_I) {
        NEXT_BASE = matching_base(VISIBLE_SEQUENCE[i].num)
        break
      }
    }
  }
  
  
  // Watch for mouse clicks
  $(CANVAS).bind('mousedown', function(e) {
    if(!LOOP) return
    
    e.preventDefault()
    e.stopPropagation()
    
    var point = [e.layerX, e.layerY]
    
    var clicked_on_any_base = false
    var correct_base = null
    
    // Search through the floating bases to see if they clicked on the correct base
    var base
    for(var i = 0, ii = FLOATING_BASES.length; i < ii; i++) {
      base = FLOATING_BASES[i]
      if(point_in_box(point, [base.x + BASE.width, base.y], BASE.width, BASE.height, base.angle)) {
        clicked_on_any_base = true
        if(FLOATING_BASES[i].num == NEXT_BASE) {
          correct_base = FLOATING_BASES[i]
          break
        }
      }
    }
    
    if(!clicked_on_any_base) return
    
    // Did we click on the correct one?
    if(correct_base) {
      select_base(correct_base)
      
      // If the base was a powerpill, check for additional matches
      if(correct_base.powerpill) {
        var found_match = true
        var num_extra = 0
        while(found_match && num_extra < 3) {
          found_match = false
          for(var i = 0, ii = FLOATING_BASES.length; i < ii; i++) {
            if(FLOATING_BASES[i].num == NEXT_BASE) {
              select_base(FLOATING_BASES[i])
              found_match = true
              num_extra++
              break
            }
          }
        }
      }
      
    } else {
      ERRORS++
      update_errors()
    }
  })
  
  
  var _level_completed_message_timeout = null
  
  var level_completed = function() {
    setTimeout(function() {
      stop()
      Game.play_sound('new_protein')
      $('#level_completed_message .trophy').empty().append($('<img />').attr('src', 'images/trophies/'+LEVEL.trophy))
      
      if(LEVEL_I == 3-1) {
        Game.unlock_achievement('replication_rush_1', 'Replication Pro!', function() {
          Message.display($('#level_completed_message'), 1500)
        _level_completed_message_timeout = setTimeout(next_level_prompt, 1500)
        })
      } else if(LEVEL_I == 6-1) {
        Game.unlock_achievement('replication_rush_2', 'Replication Expert!', function() {
          Message.display($('#level_completed_message'), 1500)
        _level_completed_message_timeout = setTimeout(next_level_prompt, 1500)
        })
      } else if(LEVEL_I == 9-1) {
        Game.unlock_achievement('replication_rush_3', 'Replication Master!', function() {
          Message.display($('#level_completed_message'), 1500)
        _level_completed_message_timeout = setTimeout(next_level_prompt, 1500)
        })
      } else if(LEVEL_I == LEVELS.length-1) {
        Game.unlock_achievement('replication_rush_4', 'Replication Champ!', function() {
          Message.display($('#level_completed_message'), 1500)
        _level_completed_message_timeout = setTimeout(next_level_prompt, 1500)
        })
      } else {
        Message.display($('#level_completed_message'), 4000)
        _level_completed_message_timeout = setTimeout(next_level_prompt, 4000)
      }
    }, 700)
  }
  
  $('#level_completed_message').click(function() {
    clearTimeout(_level_completed_message_timeout)
    next_level_prompt()
  })
  
  
  var start_level = function() {
    Game.stop_sound('theme').stop_sound('new_protein')
    Game.play_sound('new_level')
    
    Message.hide()
    
    // Initialize some stuff
    SEQUENCE_I = -1
    
    VISIBLE_SEQUENCE = []
    VISIBLE_SEQUENCE_I = -1
    MATCHING_I = -1
    MATCHING_IN_PLACE_I = -1
    
    MATCH_HISTORY = []
    MATCH_HISTORY_LENGTH = 5
    
    NEXT_BASE = null
    
    OFFSET_X = 0
    PREV_BASE_X = OFFSET_X - BASE.width
    
    ERRORS = 0
    INITIAL_SPEED = 0.03
    SPEED = INITIAL_SPEED
    PREVIOUS_TIME = new Date().getTime()
    
    FLOATING_BASES = []
    SLIDING_BASES = []
    
    $('#info #target .label').html(LEVEL.name)
    
    // Convert the level sequence strings to an array of numbers (which is more useful)
    if(!LEVEL.sequence) {
      var sequence_str = LEVEL.sequence_str.split('')
      LEVEL.sequence = []
      for(var i = 0, ii = sequence_str.length; i < ii; i++) {
        LEVEL.sequence.push(BASE_NUMBER[sequence_str[i]])
      }
    }
    
    // Fill the screen with initial bases
    for(var i = 0; i < BASES_ON_SCREEN; i++) {
      add_next_base_to_sequence()
    }
    
    MATCHING_I = Math.floor(BASES_ON_SCREEN / 2) - 1
    MATCHING_IN_PLACE_I = MATCHING_I
    NEXT_BASE = matching_base(VISIBLE_SEQUENCE[MATCHING_I+1].num)
    
    // Go!
    go()
  }
  
  
  var _start_level_message_timeout = null
  
  var next_level_prompt = function() {
    Message.hide()
        
    LEVEL_I++
    LEVEL = LEVELS[LEVEL_I]
    
    POWERPILL_PROB = LEVEL.powerpill_prob
    
    // If we've run out of levels, go into random mode!
    if(!LEVEL) {
      LEVEL = {infinite: true, name: 'Infinite Mode!', allowed_errors: 5, sequence_str: '', sequence: []}
      Message.display($('#infinite_mode_message'), 4000)
    } else {
      $('#start_level_message .level .val').html(LEVEL_I+1)
      $('#start_level_message .protein').html(LEVEL.name)
      $('#level_completed_message .protein').html(LEVEL.name)
      Message.display($('#start_level_message'), 4000)
    }
    
    
    _start_level_message_timeout = setTimeout(start_level, 4000)
  }
  
  $('#start_level_message, #infinite_mode_message').click(function() {
    clearTimeout(_start_level_message_timeout)
    start_level()
  })
  
  
  // Start the game after the info screen is clicked
  $('#more_info').click(function() {
    $('#more_info').hide()
    LEVEL_I = -1
    INITIAL_SPEED = 0.03
    SCORE = 0
    ERRORS = 0
    next_level_prompt()
  })
  
  
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'a_button',
      url: 'sounds/a_button.mp3',
      multiShot: true,
      autoLoad: true,
      volume: 50
    },{
      id: 'c_button',
      url: 'sounds/c_button.mp3',
      volume: 50
    },{
      id: 'g_button',
      url: 'sounds/g_button.mp3',
      volume: 50
    },{
      id: 't_button',
      url: 'sounds/t_button.mp3',
      volume: 50
    },{
      id: 'amino_created',
      url: 'sounds/amino_created.mp3',
      volume: 50
    },{
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 50
    },{
      id: 'metronome',
      url: 'sounds/metronome.mp3',
      volume: 50
    },{
      id: 'new_protein',
      url: 'sounds/new_protein.mp3',
      volume: 30
    },{
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 30
    },{
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 35
    }
  ])
  
  var images_to_load = [
    'images/more_info.png',
    'images/helix.png',
    'images/polymerase.png',
    'images/base_pairs/1.png',
    'images/base_pairs/2.png',
    'images/base_pairs/3.png',
    'images/base_pairs/4.png',
    'images/amino_acids/Alanine.png',
    'images/amino_acids/Arginine.png',
    'images/amino_acids/Asparagine.png',
    'images/amino_acids/Aspartic_acid.png',
    'images/amino_acids/Cysteine.png',
    'images/amino_acids/Glutamic_acid.png',
    'images/amino_acids/Glutamine.png',
    'images/amino_acids/Glycine.png',
    'images/amino_acids/Histidine.png',
    'images/amino_acids/Isoleucine.png',
    'images/amino_acids/Leucine.png',
    'images/amino_acids/Lysine.png',
    'images/amino_acids/Methionine.png',
    'images/amino_acids/Phenylalanine.png',
    'images/amino_acids/Proline.png',
    'images/amino_acids/Serine.png',
    'images/amino_acids/Threonine.png',
    'images/amino_acids/Tryptophan.png',
    'images/amino_acids/Tyrosine.png',
    'images/amino_acids/Valine.png',
    'images/high_scores.png'
  ]
  
  for(var i = 0; i < LEVELS.length; i++) {
    images_to_load.push('images/trophies/'+LEVELS[i].trophy)
  }
  
  Game.load_images(images_to_load)
  
  Game.can_pause = function() {
    if(!LOOP && !PAUSED) return false
    return true
  }
  
  var PAUSED = false
  
  $(Game).bind('pause', function(e, paused) {
    PAUSED = paused
    PAUSED ? stop() : go()
  })
  
  Game.start_gameplay = function() {
    $('#high_scores').hide()
    $('#more_info').show()
  }
  
  Game.show_high_scores = function() {
    Game.play_sound('theme')
    var high_scores_elem = $('#high_scores .inner')
    high_scores_elem.html('')
    
    User.all_high_scores_for_game('replication_rush', function(scores) {
      for(var i = 0; i < Math.min(5, scores.length); i++) {
        var score = $('<div><span class="place">'+(i+1)+'</span><span class="score">'+scores[i].score+'</span><span class="username">'+scores[i].username+'</span></div>')
        score.appendTo(high_scores_elem)
      }
    })
    
    $('#high_scores').show()
  }
  $('#high_scores').bind('click', function(){Game.start_gameplay()})
  
  Game.initialize()
  
})


// -------------------------------------------------------------------


Math.dot2D = function(a, b) {
  return a[0]*b[0] + a[1]*b[1]
}

Array.prototype.remove_elements = function(removed_indices) {
  for(var i = 0, ii = removed_indices.length; i < ii; i++) {
    this.splice(removed_indices[i] - i, 1)
  }
  return self
}
