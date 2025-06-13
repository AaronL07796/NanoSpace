window._area = 'dna'
window._attraction = 'helix_of_fortune'

$(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var LETTERS = {
    'UUU': 'F', 'UUC': 'F',
    'UUA': 'F', 'UUG': 'L',
    'UCU': 'S', 'UCC': 'S', 'UCA': 'S', 'UCG': 'S',
    'UAU': 'Y', 'UAC': 'Y',
    'UAA': 'Z', 'UAG': 'Z',
    'UGU': 'C', 'UGC': 'C',
    'UGA': 'J',
    'UGG': 'W',
    
    'CUU': 'B', 'CUC': 'B', 'CUA': 'B', 'CUG': 'B',
    'CCU': 'P', 'CCC': 'P', 'CCA': 'P', 'CCG': 'P',
    'CAU': 'H', 'CAC': 'H',
    'CAA': 'Q', 'CAG': 'Q',
    'CGU': 'R', 'CGC': 'R', 'CGA': 'R', 'CGG': 'R',
    
    'AUU': 'I', 'AUC': 'I', 'AUA': 'I',
    'AUG': 'M',
    'ACU': 'T', 'ACC': 'T', 'ACA': 'T', 'ACG': 'T',
    'AAU': 'N', 'AAC': 'N',
    'AAA': 'K', 'AAG': 'K',
    'AGU': 'U', 'AGC': 'U',
    'AGA': 'O', 'AGG': 'O',
    
    'GUU': 'V', 'GUC': 'V', 'GUA': 'V', 'GUG': 'V',
    'GCU': 'A', 'GCC': 'A', 'GCA': 'A', 'GCG': 'A',
    'GAU': 'D', 'GAC': 'D',
    'GAA': 'E', 'GAG': 'E',
    'GGU': 'G', 'GGC': 'G', 'GGA': 'G', 'GGG': 'G'
  }
  
  
  var amino_acids_by_code = {
    'AUU': 'Isoleucine', 'AUC': 'Isoleucine', 'AUA': 'Isoleucine',  
    'CUU': 'Leucine', 'CUC': 'Leucine', 'CUA': 'Leucine', 'CUG': 'Leucine', 'UUA': 'Leucine', 'UUG': 'Leucine',
    'GUU': 'Valine', 'GUC': 'Valine', 'GUA': 'Valine', 'GUG': 'Valine',
    'UUU': 'Phenylalanine', 'UUC': 'Phenylalanine',
    'AUG': 'Methionine',
    'UGU': 'Cysteine', 'UGC': 'Cysteine',
    'GCU': 'Alanine', 'GCC': 'Alanine', 'GCA': 'Alanine', 'GCG': 'Alanine',
    'GGU': 'Glycine', 'GGC': 'Glycine', 'GGA': 'Glycine', 'GGG': 'Glycine',
    'CCU': 'Proline', 'CCC': 'Proline', 'CCA': 'Proline', 'CCG': 'Proline',
    'ACU': 'Threonine', 'ACC': 'Threonine', 'ACA': 'Threonine', 'ACG': 'Threonine',
    'UCU': 'Serine', 'UCC': 'Serine', 'UCA': 'Serine', 'UCG': 'Serine', 'AGU': 'Serine', 'AGC': 'Serine',
    'UAU': 'Tyrosine', 'UAC': 'Tyrosine',
    'UGG': 'Tryptophan',
    'CAA': 'Glutamine', 'CAG': 'Glutamine',
    'AAU': 'Asparagine', 'AAC': 'Asparagine',
    'CAU': 'Histidine', 'CAC': 'Histidine',
    'GAA': 'Glutamic acid', 'GAG': 'Glutamic acid',
    'GAU': 'Aspartic acid', 'GAC': 'Aspartic acid',
    'AAA': 'Lysine', 'AAG': 'Lysine',
    'CGU': 'Arginine', 'CGC': 'Arginine', 'CGA': 'Arginine', 'CGG': 'Arginine', 'AGA': 'Arginine', 'AGG': 'Arginine',
    'UAA': 'Stop codon', 'UAG': 'Stop codon', 'UGA': 'Stop codon'
  }
  
  var AMINO_ACIDS = {}
  for(var code in LETTERS) {
    if(!AMINO_ACIDS[LETTERS[code]]) AMINO_ACIDS[LETTERS[code]] = {name: amino_acids_by_code[code], codons: []}
    AMINO_ACIDS[LETTERS[code]].codons.push(code)
  }
  
  
  var LEVELS = [
    [
      {word: 'DNA', bases: 'GA_, AA_, GCC'},
      {word: 'ATOM', bases: 'GCG, ACA, AG_, AU_'},
      {word: 'WATER', bases: 'UG_, GCA, ACG, GA_, CGA'}
    ],[
      {word: 'ICE', bases: 'AU_, UG_, GA_'},
      {word: 'GAS', bases: 'GGG, G_C, UCC'},
      {word: 'NANO', bases: 'AA_, GCA, AA_, AG_'}
    ],[
      {word: 'MOLECULE', bases: 'AU_, AG_, UU_, GA_, UG_, AG_, UU_, GA_'},
      {word: 'HYDROGEN', bases: 'CA_, UA_, GA_, CGC, AG_, GGA, GA_, AA_'},
      {word: 'CARBON', bases: 'UG_, G_G, CGA, CUG, AG_, AA_'},
      {word: 'HELIUM', bases: 'CA_, GA_, UU_, AU_, AG_, AU_'},
      {word: 'PROTON', bases: 'CCG, C_U, AG_, ACG, AG_, AA_'}
    ],[
      {word: 'NEUTRON', bases: 'AA_, GA_, AG_, ACC, CGA, AG_, AA_'},
      {word: 'ELEMENT', bases: 'GA_, UU_, GA_, AU_, GA_, AA_, ACA'},
      {word: 'SOLID', bases: 'UCA, AG_, UU_, AU_, GA_'},
      {word: 'LIQUID', bases: 'UU_, AU_, CA_, AG_, AU_, GA_'},
      {word: 'NITROGEN', bases: 'AA_, AU_, ACA, C_C, AG_, GG_, GA_, AA_'}
    ],[
      {word: 'ARGON', bases: 'G_C, _GG, GG_, AG_, AA_'},
      {word: 'GENE', bases: '_GU, GA_, A_C, GA_'},
      {word: 'NUCLEUS', bases: 'AA_, AG_, UG_, UU_, GA_, AG_, U_A'},
      {word: 'MATTER', bases: 'AU_, _CA, A_G, _CC, GA_, C_G'}
    ],[
      {word: 'FORMULA', bases: 'UU_, AG_, C_A, AU_, AG_, UU_, G_U'},
      {word: 'POLYMER', bases: 'C_G, AG_, UU_, UA_, AU_, GA_, _GG'},
      {word: 'PROTEIN', bases: 'C_C, C_G, AG_, A_C, GA_, AU_, AA_'}
    ],[
      {word: 'CYTOSINE', bases: 'UG_, UA_, A_A, AG_ , U_G, AU_, AA_, GA_'},
      {word: 'THYMINE', bases: 'A_G, CA_, UA_, AU_, AU_, AA_, GA_'},
      {word: 'GUANINE', bases: 'GGC, AG_, G_U, AA_, AU_, AA_, GA_'},
      {word: 'ADENINE', bases: 'GCC, GA_, GA_, AA_, AU_, AA_ ,GA_'}
    ],[
      {word: 'ENZYME', bases: 'GA_, AA_, UA_, UA_, AU_, GA_'},
      {word: 'GENETICS', bases: 'G_C, GA_, AA_, GA_, AC_, AU_, UG_, U_C'},
      {word: 'HEREDITY', bases: 'CA_, G_G, C_A, GA_, GA_, AU_, A_C, UA_'},
      {word: 'GENOME', bases: 'G_G, GA_, AA_, AG_, AU_, GA_'}
    ]
  ]
  
  var LEVEL_I = 0
  var WORD = null
  var EDITABLE = true
  
  
  // Check to see if the word is complete
  var check_word = function() {
    var word = ''
    $('#word .letter input').each(function(i, elem) {
      word += elem.value
    })
    
    if(word == WORD.word) {
      word_complete()
    } else if(word.length == WORD.word.length) {
      if(!$('#invalid').is(':visible')) {
        Game.play_sound('wrong_word')
        $('#invalid').show()
      }
    } else {
      $('#invalid').hide()
    }
  }
  
  
  // If the level has been completed
  var word_complete = function() {
    $('#invalid').hide()
    EDITABLE = false
    
    // Achievement
    if(LEVEL_I >= 4) {
      Game.unlock_achievement('helix_of_fortune_1', 'DNA Detective')
    }
    
    LEVEL_I++
    Game.play_sound('level_complete')
    
    setTimeout(function() {
      if(LEVEL_I >= LEVELS.length) {
        game_over()
      } else {
        Message.display($('#level_complete_message'), 3000)
        setTimeout(start_next_level, 4000)
      }
    }, 1000)
  }
  
  
  // If the game is over
  var game_over = function() {
    Game.play_sound('game_over')
    Message.display($('#game_over_message'), -1)
    Game.unlock_achievement('helix_of_fortune_finished', 'DNA Expert!')
  }
  $('#game_over_message').click(function(){start_game()})
  
  
  // Highlight the selected bases
  var highlight_bases = function(bases, value) {
    
    // Generate a list of all possible combinations
    var combinations = []
    var b = ['G', 'A', 'C', 'U']
    var l
    
    for(var i1 = 0; i1 < 4; i1++) {
      if(bases[0] != b[i1] && bases[0] != '_') continue
      combinations.push(b[i1])
      
      for(var i2 = 0; i2 < 4; i2++) {
        if(bases[1] != b[i2] && bases[1] != '_') continue
        combinations.push(b[i1] + b[i2])
        
        for(var i3 = 0; i3 < 4; i3++) {
          if(bases[2] != b[i3] && bases[2] != '_') continue
          l = b[i1] + b[i2] + b[i3]
          combinations.push(l)
          if(LETTERS[l] && combinations.indexOf('_'+LETTERS[l]) == -1) combinations.push('_'+LETTERS[l])
        }
      }
    }
        
    // Add highlighted images
    var highlighted_container = $('#wheel .highlighted')
    highlighted_container.html('')
    for(var i = 0; i < combinations.length; i++) {
      
      if(combinations[i][0] == '_') {
        $('<div />').css('background', 'transparent url(images/wheel/chosen/'+combinations[i]+'.png) 0 0 no-repeat')
                    .addClass('b'+combinations[i]).appendTo(highlighted_container)
        if(combinations[i] != '_'+value) {
          $('<div />').css('background', 'transparent url(images/wheel/highlighted/'+combinations[i]+'.png) 0 0 no-repeat')
              .addClass('b'+combinations[i]).addClass('pulse').appendTo(highlighted_container)
        }

      } else {
        $('<div />').css('background', 'transparent url(images/wheel/highlighted/'+combinations[i]+'.png) 0 0 no-repeat')
                    .addClass('b'+combinations[i]).appendTo(highlighted_container)
      }
    }
  }
  
  
  var pulse_highlighted = function() {
    var timing = 350
    var elems = $('#wheel .pulse')
    
    if(elems.length == 0) {
      setTimeout(pulse_highlighted, timing)
      return
    }
    
    $('#wheel .pulse').fadeToggle(timing, 'linear', pulse_highlighted)
  }
  pulse_highlighted()
  
  
  // Populate the amino acid info square
  var populate_amino_acid_info = function(letter) {
    var amino_acid = AMINO_ACIDS[letter]
    $('#amino_acid .letter').html(letter)
    $('#amino_acid .name').html(amino_acid.name.toUpperCase())
    $('#amino_acid .codons span').html(amino_acid.codons.join(', '))
    $('#amino_acid').show()
  }
  
  
  // Letter selection
  var _selector_is_animating = false
  var _dont_hide_amino_acid_display = false
  $('#word .letter input').bind('mousedown', function(e) {
    if(!_dont_hide_amino_acid_display) $('#amino_acid').hide()
    _dont_hide_amino_acid_display = false
    
    var letter = $(e.currentTarget).closest('.letter')
    var selector = $('#word_selector')
    
    var letter_elem = letter.find('input')
    if(letter_elem.val()) populate_amino_acid_info(letter_elem.val())
    
    if(letter[0] == $('#word .letter.selected')[0]) return
    
    if(_selector_is_animating) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    
    Game.play_sound('advance')
    _selector_is_animating = true
    
    var letter_pos = letter.offset()
    var selector_pos = selector.offset()
    
    selector.appendTo($('body')).css({left: selector_pos.left, top: selector_pos.top})
    
    letter_elem.focus()
    highlight_bases(letter.data('bases'), letter_elem.val())
    
    selector.animate({left: letter_pos.left -20}, 250, function() {
      selector.appendTo(letter).css({left: -20, top: -40})
      $('#word .letter').removeClass('selected')
      letter.addClass('selected')
      _selector_is_animating = false
    })
  })
  
  $('#word .letter').bind('click', function(e) {
    $(e.currentTarget).find('input').trigger('mousedown')
  })
  
  $('map area').click(function(e) {
    e.preventDefault()
    var letter = $(e.currentTarget).data('letter')
    $('#word .letter.selected input').val(letter).focus().trigger('keydown')
  })
  
  
  $('#word .letter input').bind('keydown', function(e) {
    e.preventDefault()
    if(!EDITABLE) return
        
    if(e.which == 37) previous_letter()
    else if(e.which == 39) next_letter()
    else {
      var letter = e.which ? String.fromCharCode(e.which).toUpperCase() : e.currentTarget.value.toUpperCase()
      var letter_elem = $(e.currentTarget).closest('.letter')
      
      if(e.which == 8) {
        $(e.currentTarget).val('')
        $('#amino_acid').hide()
        
        letter_elem.find('.amino_acid').css('background', 'none')
      
      } else if(letter.match(/[A-Z]/) && letter != 'X') {
        Game.play_sound('letter_added')
        $(e.currentTarget).val(letter)
        populate_amino_acid_info(letter)
        letter_elem.find('.amino_acid').css('background', 'transparent url(images/amino_acids/'+letter+'.png) 50% 50% no-repeat')
        
        // If the next letter is empty, advance to it
        var next_letter_elem = $(e.currentTarget).parent().next()
        var next_input = next_letter_elem.hasClass('empty') ? null : next_letter_elem.find('input')
        if(next_input && next_input.val() == '') {
          _dont_hide_amino_acid_display = true
          next_input.trigger('mousedown')
        }
      }
    }
    check_word()
  })
  
  
  // Dragging of the selector
  var _selector_is_dragging = false
  var _selector_drag_offset = 0
  
  var on_word_selector_drag = function(e) {
    // Start moving the selector?
    if(!_selector_is_dragging) {
      var selector_pos = $('#word_selector').offset()
      _selector_drag_offset = e.clientX - selector_pos.left
      $('#word_selector').appendTo($('body')).css({left: selector_pos.left, top: selector_pos.top})
      _selector_is_dragging = true
    }
    
    var selector_left = e.clientX - _selector_drag_offset
    
    var word_offset = 25
    var first_word_pos = $('#word .letter:not(.empty):first').offset().left - word_offset
    var last_word_pos = $('#word .letter:not(.empty):last').offset().left - word_offset
    
    if(selector_left < first_word_pos) selector_left = first_word_pos
    else if(selector_left > last_word_pos) selector_left = last_word_pos
    
    $('#word_selector').css({left: selector_left})
  }
  
  $('#word_selector').bind('mousedown', function(e) {
    e.preventDefault()
    $(document).bind('mousemove', on_word_selector_drag)
    _selector_is_dragging = false
  })
  
  $(document).bind('mouseup', function() {
    $(document).unbind('mousemove', on_word_selector_drag)
    if(!_selector_is_dragging) return
    
    // Drop the selector
    var selector_center = $('#word_selector').offset().left + $('#word_selector').width()/2.0
    $('#word .letter:not(.empty)').each(function(i, letter) {
      letter = $(letter)
      if(selector_center > letter.offset().left && selector_center <= letter.offset().left + letter.width()) {
        $('#word_selector').appendTo(letter).css({left: -20, top: -40})
        letter.trigger('click')
        return false
      }
    })
    
    _selector_is_dragging = false
  })
  
  
  var previous_letter = function() {
    var letter = $('#word .letter.selected').prev('#word .letter')
    if(letter.is('.empty')) return
    letter.find('input').trigger('mousedown')
  }
  
  var next_letter = function() {
    var letter = $('#word .letter.selected').next('#word .letter')
    if(letter.is('.empty')) return
    letter.find('input').trigger('mousedown')
  }
  
  
  var start_next_level = function() {
    Game.play_sound('background').play_sound('new_word')
    EDITABLE = true
    
    $('#wheel .letters').show()
    setTimeout(function(){$('#wheel .letters').fadeOut(800)}, 1500)
    
    $('#word .letter input').val('')
    $('#word .letter').removeClass('selected')
    
    $('#word .letter .amino_acid').css('background', 'none')
    $('#amino_acid').hide()
    
    // Pick a random word from the level
    var level = LEVELS[LEVEL_I]
    WORD = level[Math.floor(Math.random()*level.length)]
    
    // Setup the letters
    $('#word .letter').addClass('empty')
    var bases = WORD.bases.split(/\s*,\s*/)
    
    for(var i = 0; i < bases.length; i++) {
      var b = bases[i].split('')
      var letter = $('#word .letter')
      letter.eq(i).data('bases', b)
      letter.eq(i).removeClass('empty')
      letter.eq(i).find('.bases span').each(function(i, elem) {
        $(elem).attr('class', 'base_'+b[i])
      })
    }
    
    $('#word .letter').eq(0).find('input').trigger('mousedown')
  }
  
  var GAME_STARTED = false
  var start_game = function() {
    $('#more_info, #overlay').hide()
    $('body').removeClass('more_info_visible')
    if(!GAME_STARTED) {
      Game.stop_sound('theme')
      LEVEL_I = 0
      Message.hide()
      start_next_level()
      GAME_STARTED = true
    }
  }
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'level_complete',
      url: 'sounds/level_complete.mp3',
      volume: 50
    }, {
      id: 'wrong_word',
      url: 'sounds/wrong_word.mp3',
      volume: 50
    }, {
      id: 'letter_added',
      url: 'sounds/letter_added.mp3',
      volume: 50
    }, {
      id: 'advance',
      url: 'sounds/advance.mp3',
      volume: 10
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 10
    }, {
      id: 'new_word',
      url: 'sounds/new_word.mp3',
      music_muteable: true,
      volume: 50
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      music_muteable: true,
      volume: 50
    }, {
      id: 'theme',
      url: 'sounds/theme.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 35
    }
  ])
  
  var images_to_preload = [
    'images/more_info.png',
    'images/overlay.png',
    'images/you_win.png',
    'images/input_background.png',
    'images/selector.png',
    'images/slot.png',
    'images/amino_acids/A.png',
    'images/amino_acids/B.png',
    'images/amino_acids/C.png',
    'images/amino_acids/D.png',
    'images/amino_acids/E.png',
    'images/amino_acids/F.png',
    'images/amino_acids/G.png',
    'images/amino_acids/H.png',
    'images/amino_acids/I.png',
    'images/amino_acids/J.png',
    'images/amino_acids/K.png',
    'images/amino_acids/L.png',
    'images/amino_acids/M.png',
    'images/amino_acids/N.png',
    'images/amino_acids/O.png',
    'images/amino_acids/P.png',
    'images/amino_acids/Q.png',
    'images/amino_acids/R.png',
    'images/amino_acids/S.png',
    'images/amino_acids/T.png',
    'images/amino_acids/U.png',
    'images/amino_acids/V.png',
    'images/amino_acids/W.png',
    'images/amino_acids/Y.png',
    'images/amino_acids/Z.png',
    'images/bases/a.png',
    'images/bases/c.png',
    'images/bases/g.png',
    'images/bases/u.png',
    'images/wheel/background.png',
    'images/wheel/letters.png',
    'images/wheel/highlighted/A.png',
    'images/wheel/highlighted/AA.png',
    'images/wheel/highlighted/AAA.png',
    'images/wheel/highlighted/AAC.png',
    'images/wheel/highlighted/AAG.png',
    'images/wheel/highlighted/AAU.png',
    'images/wheel/highlighted/AC.png',
    'images/wheel/highlighted/ACA.png',
    'images/wheel/highlighted/ACC.png',
    'images/wheel/highlighted/ACG.png',
    'images/wheel/highlighted/ACU.png',
    'images/wheel/highlighted/AG.png',
    'images/wheel/highlighted/AGA.png',
    'images/wheel/highlighted/AGC.png',
    'images/wheel/highlighted/AGG.png',
    'images/wheel/highlighted/AGU.png',
    'images/wheel/highlighted/AU.png',
    'images/wheel/highlighted/AUA.png',
    'images/wheel/highlighted/AUC.png',
    'images/wheel/highlighted/AUG.png',
    'images/wheel/highlighted/AUU.png',
    'images/wheel/highlighted/C.png',
    'images/wheel/highlighted/CA.png',
    'images/wheel/highlighted/CAA.png',
    'images/wheel/highlighted/CAC.png',
    'images/wheel/highlighted/CAG.png',
    'images/wheel/highlighted/CAU.png',
    'images/wheel/highlighted/CC.png',
    'images/wheel/highlighted/CCA.png',
    'images/wheel/highlighted/CCC.png',
    'images/wheel/highlighted/CCG.png',
    'images/wheel/highlighted/CCU.png',
    'images/wheel/highlighted/CG.png',
    'images/wheel/highlighted/CGA.png',
    'images/wheel/highlighted/CGC.png',
    'images/wheel/highlighted/CGG.png',
    'images/wheel/highlighted/CGU.png',
    'images/wheel/highlighted/CU.png',
    'images/wheel/highlighted/CUA.png',
    'images/wheel/highlighted/CUC.png',
    'images/wheel/highlighted/CUG.png',
    'images/wheel/highlighted/CUU.png',
    'images/wheel/highlighted/G.png',
    'images/wheel/highlighted/GA.png',
    'images/wheel/highlighted/GAA.png',
    'images/wheel/highlighted/GAC.png',
    'images/wheel/highlighted/GAG.png',
    'images/wheel/highlighted/GAU.png',
    'images/wheel/highlighted/GC.png',
    'images/wheel/highlighted/GCA.png',
    'images/wheel/highlighted/GCC.png',
    'images/wheel/highlighted/GCG.png',
    'images/wheel/highlighted/GCU.png',
    'images/wheel/highlighted/GG.png',
    'images/wheel/highlighted/GGA.png',
    'images/wheel/highlighted/GGC.png',
    'images/wheel/highlighted/GGG.png',
    'images/wheel/highlighted/GGU.png',
    'images/wheel/highlighted/GU.png',
    'images/wheel/highlighted/GUA.png',
    'images/wheel/highlighted/GUC.png',
    'images/wheel/highlighted/GUG.png',
    'images/wheel/highlighted/GUU.png',
    'images/wheel/highlighted/U.png',
    'images/wheel/highlighted/UA.png',
    'images/wheel/highlighted/UAA.png',
    'images/wheel/highlighted/UAC.png',
    'images/wheel/highlighted/UAG.png',
    'images/wheel/highlighted/UAU.png',
    'images/wheel/highlighted/UC.png',
    'images/wheel/highlighted/UCA.png',
    'images/wheel/highlighted/UCC.png',
    'images/wheel/highlighted/UCG.png',
    'images/wheel/highlighted/UCU.png',
    'images/wheel/highlighted/UG.png',
    'images/wheel/highlighted/UGA.png',
    'images/wheel/highlighted/UGC.png',
    'images/wheel/highlighted/UGG.png',
    'images/wheel/highlighted/UGU.png',
    'images/wheel/highlighted/UU.png',
    'images/wheel/highlighted/UUA.png',
    'images/wheel/highlighted/UUC.png',
    'images/wheel/highlighted/UUG.png',
    'images/wheel/highlighted/UUU.png',
    'images/wheel/highlighted/_A.png',
    'images/wheel/highlighted/_B.png',
    'images/wheel/highlighted/_C.png',
    'images/wheel/highlighted/_D.png',
    'images/wheel/highlighted/_E.png',
    'images/wheel/highlighted/_F.png',
    'images/wheel/highlighted/_G.png',
    'images/wheel/highlighted/_H.png',
    'images/wheel/highlighted/_I.png',
    'images/wheel/highlighted/_J.png',
    'images/wheel/highlighted/_K.png',
    'images/wheel/highlighted/_L.png',
    'images/wheel/highlighted/_M.png',
    'images/wheel/highlighted/_N.png',
    'images/wheel/highlighted/_O.png',
    'images/wheel/highlighted/_P.png',
    'images/wheel/highlighted/_Q.png',
    'images/wheel/highlighted/_R.png',
    'images/wheel/highlighted/_S.png',
    'images/wheel/highlighted/_T.png',
    'images/wheel/highlighted/_U.png',
    'images/wheel/highlighted/_V.png',
    'images/wheel/highlighted/_W.png',
    'images/wheel/highlighted/_Y.png',
    'images/wheel/highlighted/_Z.png',
    'images/wheel/selected/_A.png',
    'images/wheel/selected/_B.png',
    'images/wheel/selected/_C.png',
    'images/wheel/selected/_D.png',
    'images/wheel/selected/_E.png',
    'images/wheel/selected/_F.png',
    'images/wheel/selected/_G.png',
    'images/wheel/selected/_H.png',
    'images/wheel/selected/_I.png',
    'images/wheel/selected/_J.png',
    'images/wheel/selected/_K.png',
    'images/wheel/selected/_L.png',
    'images/wheel/selected/_M.png',
    'images/wheel/selected/_N.png',
    'images/wheel/selected/_O.png',
    'images/wheel/selected/_P.png',
    'images/wheel/selected/_Q.png',
    'images/wheel/selected/_R.png',
    'images/wheel/selected/_S.png',
    'images/wheel/selected/_T.png',
    'images/wheel/selected/_U.png',
    'images/wheel/selected/_V.png',
    'images/wheel/selected/_W.png',
    'images/wheel/selected/_Y.png',
    'images/wheel/selected/_Z.png',
    'images/wheel/chosen/_A.png',
    'images/wheel/chosen/_B.png',
    'images/wheel/chosen/_C.png',
    'images/wheel/chosen/_D.png',
    'images/wheel/chosen/_E.png',
    'images/wheel/chosen/_F.png',
    'images/wheel/chosen/_G.png',
    'images/wheel/chosen/_H.png',
    'images/wheel/chosen/_I.png',
    'images/wheel/chosen/_J.png',
    'images/wheel/chosen/_K.png',
    'images/wheel/chosen/_L.png',
    'images/wheel/chosen/_M.png',
    'images/wheel/chosen/_N.png',
    'images/wheel/chosen/_O.png',
    'images/wheel/chosen/_P.png',
    'images/wheel/chosen/_Q.png',
    'images/wheel/chosen/_R.png',
    'images/wheel/chosen/_S.png',
    'images/wheel/chosen/_T.png',
    'images/wheel/chosen/_U.png',
    'images/wheel/chosen/_V.png',
    'images/wheel/chosen/_W.png',
    'images/wheel/chosen/_Y.png',
    'images/wheel/chosen/_Z.png'
  ]
  
  Game.load_images(images_to_preload)
  
  Game.start_gameplay = function() {
    $('#more_info').show()
  }
  $('#more_info').bind('click', function() {
    $('#more_info').hide()
    $('#overlay').show()
  })
  $('#overlay').click(start_game)
  
  
  Game.should_open_instructions = function() {
    if($('#more_info').is(':visible')) {
      $('#more_info').hide()
      $('body').removeClass('more_info_visible')
    } else {
      $('body').addClass('more_info_visible')
      $('#more_info').unbind('click').bind('click', start_game)
      $('#more_info').show()
    }
    
    return false
  }
  
  Game.initialize()

})
