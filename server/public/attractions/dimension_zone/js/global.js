window._area = 'sizes'
window._attraction = 'dimension_zone'

$(window).load(function() {
  $('body').bind('dragstart', function(e){e.preventDefault()})
  $('body').bind('selectstart', function(e){e.preventDefault()}).css('-moz-user-select', 'none')
  
  
  var VIEWPORT = $('#viewport .inner')
  var VIEWPORT_OFFSET = VIEWPORT.offset()
  
  var WIDTH = VIEWPORT.width()
  
  var RULER_CANVAS = $('#ruler canvas')
  var RULER_CANVAS_HEIGHT = RULER_CANVAS.height()
  var RULER_CONTEXT = RULER_CANVAS[0].getContext('2d')
  var RULER_LABELS = $('#ruler .labels')
  
  var LOG_SCALE = 15
  var NEW_LOG_SCALE = 15
  var SCALE = 0
  
  var ORIGINAL_SLIDER_VALUE = -2350
  var SLIDER_VALUE = ORIGINAL_SLIDER_VALUE
    
  // NOTES:
  // Inconsistent perspective
  // Many objects cut off
  // Vectorization has rendered some objects mushy and unclear
  // Atom nucleons are inconsistently sized
  // Style of atoms / molecules is inconsistent
  // Intel 4004 transister is wrong
  // Human egg cell is actually 4 cells
  // Objects sizes don't always represent the width of the image (light wavelengths, objects at angles, etc)
  // Venus isn't green
  // Which stars are which?
  //
  // Gold leaf - needs to be a view of the thickness
  // Football field - probably should be lengthwise
  // "Observable universe" looks like it's actually the Hubble Deep Field
  // Stars need to be globes, not points of light
  
  var OBJECT_LIBRARY = {
    'electron': {width: 1.00E-18, img_src: 'images/objects/electron.png', img: new Image(), visible: true},
    'proton': {width: 1.00E-15, img_src: 'images/objects/proton.png', img: new Image(), visible: true},
    'neutron': {width: 2.20E-15, img_src: 'images/objects/neutron.png', img: new Image(), visible: true},
    'nucleus of a gold atom': {width: 1.40E-14, img_src: 'images/objects/gold-nucleus.png', img: new Image(), visible: true},
    'hydrogen atom': {width: 2.50E-11, img_src: 'images/objects/hydrogen-atom.png', img: new Image(), visible: true},
    'helium atom': {width: 5.60E-11, img_src: 'images/objects/helium-atom.png', img: new Image(), visible: true},
    'carbon atom': {width: 7.00E-11, img_src: 'images/objects/carbon-atom.png', img: new Image(), visible: true},
    'oxygen atom': {width: 1.32E-10, img_src: 'images/objects/oxygen-atom.png', img: new Image(), visible: true},
    'gold atom': {width: 2.72E-10, img_src: 'images/objects/gold-atom.png', img: new Image(), visible: true},
    'h2o': {width: 2.80E-10, img_src: 'images/objects/h2o.png', img: new Image(), visible: true},
    'Glucose': {width: 1.00E-09, img_src: 'images/objects/glucose.png', img: new Image(), visible: true},
    'Menthol': {width: 1.00E-09, img_src: 'images/objects/menthol.png', img: new Image(), visible: true},
    'Caffeine': {width: 1.00E-09, img_src: 'images/objects/caffeine.png', img: new Image(), visible: true},
    'testosterone': {width: 1.50E-09, img_src: 'images/objects/testosterone.png', img: new Image(), visible: true},
    'c60': {width: 1.10E-09, img_src: 'images/objects/c60.png', img: new Image(), visible: true},
    'DNA helix': {width: 2.00E-09, img_src: 'images/objects/dnahelix.png', img: new Image(), visible: true},
    'insulin molecule': {width: 5.00E-09, img_src: 'images/objects/insulin.png', img: new Image(), visible: true},
    'Green Fluorescent Protein': {width: 5.00E-09, img_src: 'images/objects/greenfluorescentprotein.png', img: new Image(), visible: true},
    'hemoglobin molecule': {width: 6.00E-09, img_src: 'images/objects/hemoglobinmolecule.png', img: new Image(), visible: true},
    'human ribosome': {width: 6.00E-09, img_src: 'images/objects/ribosome.png', img: new Image(), visible: true},
    'rubisco': {width: 1.40E-08, img_src: 'images/objects/rubisco.png', img: new Image(), visible: true},
    'cell membrane': {display_width: 8.00E-09, width: 5.00E-08, img_src: 'images/objects/cell_membrane.png', img: new Image(), visible: true},
    'HIV virus': {width: 9.00E-08, img_src: 'images/objects/hivvirus.png', img: new Image(), visible: true},
    'a typical bacterium': {width: 1.00E-06, img_src: 'images/objects/bacteria.png', img: new Image(), visible: true},
    'violet light': {display_width: 4.00E-07, width: 2.90E-06, img_src: 'images/objects/wavelengthofvioletlight.png', img: new Image(), visible: true},
    'red light': {display_width: 6.70E-07, width: 2.40E-06, img_src: 'images/objects/wavelengthofredlight.png', img: new Image(), visible: true},
    'single yeast organism': {width: 7.00E-06, img_src: 'images/objects/yeast.png', img: new Image(), visible: true},
    'red blood cell ': {width: 8.40E-06, img_src: 'images/objects/redbloodcell.png', img: new Image(), visible: true},
    'sperm cell': {display_width: 1.00E-06, width: 1.60E-05, img_src: 'images/objects/spermcell.png', img: new Image(), visible: true},
    'average cell in the human body': {width: 1.00E-05, img_src: 'images/objects/humancell.png', img: new Image(), visible: true},
    'fog, mist or cloud water droplet': {width: 1.00E-05, img_src: 'images/objects/waterdrop.png', img: new Image(), visible: true},
    'white blood cell (neutrophil)': {width: 1.50E-05, img_src: 'images/objects/whitebloodcell.png', img: new Image(), visible: true},
    'a human hair': {width: 11.75E-05, display_width: 2.50E-05, img_src: 'images/objects/hair.png', img: new Image(), visible: true},
    'Pollen Grain': {width: 5.00E-05, img_src: 'images/objects/pollengrain.png', img: new Image(), visible: true},
    'dust mite': {width: 1.00E-04, img_src: 'images/objects/dustmite.png', img: new Image(), visible: true},
    'human fertilized egg cell': {width: 1.00E-04, img_src: 'images/objects/ferteggcell.png', img: new Image(), visible: true},
    'Grain of salt': {width: 1.00E-04, img_src: 'images/objects/salt.png', img: new Image(), visible: true},
    'mustard seed': {width: 1.27E-03, img_src: 'images/objects/mustardseed.png', img: new Image(), visible: true},
    'large grain of sand': {width: 2.00E-03, img_src: 'images/objects/sandgrain.png', img: new Image(), visible: true},
    'a pin': {display_width: 1.70E-03, width: 2.60E-03, img_src: 'images/objects/pinhead.png', img: new Image(), visible: true},
    'sesame seed': {width: 3.00E-03, img_src: 'images/objects/sesameseed.png', img: new Image(), visible: true},
    'average red ant': {width: 5.00E-03, img_src: 'images/objects/redant.png', img: new Image(), visible: true},
    'snowflake': {width: 1.00E-02, img_src: 'images/objects/snowflake.png', img: new Image(), visible: true},
    'large mosquito': {width: 1.50E-02, img_src: 'images/objects/mosquito.png', img: new Image(), visible: true},
    'jelly bean': {width: 1.50E-02, img_src: 'images/objects/jellybean.png', img: new Image(), visible: true},
    'penny ': {width: 1.90E-02, img_src: 'images/objects/penny.png', img: new Image(), visible: true},
    'Pentium E6800 microprocessor': {width: 3.75E-02, img_src: 'images/objects/pentiume6800microprocessor.png', img: new Image(), visible: true},
    'golf ball': {width: 4.27E-02, img_src: 'images/objects/golfball.png', img: new Image(), visible: true},
    'baseball': {width: 7.62E-02, img_src: 'images/objects/baseball.png', img: new Image(), visible: true},
    'soccer ball': {width: 2.20E-01, img_src: 'images/objects/soccerball.png', img: new Image(), visible: true},
    'NBA regulation basketball': {width: 2.38E-01, img_src: 'images/objects/basketball.png', img: new Image(), visible: true},
    'A Human': {display_width: 1.70E+00, width: 0.675E+00, img_src: 'images/objects/human.png', img: new Image(), visible: true},
    'a London Bus ': {width: 8.38E+00, img_src: 'images/objects/londonbus.png', img: new Image(), visible: true},
    'triceratops': {width: 9.00E+00, img_src: 'images/objects/triceratops.png', img: new Image(), visible: true},
    'blue whale': {display_width: 3.30E+01, width: 2.90E+01, img_src: 'images/objects/bluewhale.png', img: new Image(), visible: true},
    'goodyear blimp': {width: 5.80E+01, img_src: 'images/objects/blimp.png', img: new Image(), visible: true},
    'American football field': {width: 4.9E+01, display_width: 1.09E+02, img_src: 'images/objects/footballfield.png', img: new Image(), visible: true},
    'Statue of Liberty': {width: 36.82, display_width: 9.30E+01, img_src: 'images/objects/statueofliberty.png', img: new Image(), visible: true},
    'taj mahal': {width: 101.43, display_width: 6.49E+01, img_src: 'images/objects/tajmahal.png', img: new Image(), visible: true},
    'lincoln memorial': {width: 139.25, display_width: 5.78E+01, img_src: 'images/objects/lincolnmemorial.png', img: new Image(), visible: true},
    'Great Pyramid of Giza': {width: 334.8, display_width: 1.37E+02, img_src: 'images/objects/greatpyramid.png', img: new Image(), visible: true},
    'Washington Monument': {width: 101.4, display_width: 1.69E+02, img_src: 'images/objects/washingtonmon.png', img: new Image(), visible: true},
    'eiffel tower': {width: 212.6, display_width: 3.24E+02, img_src: 'images/objects/eiffeltower.png', img: new Image(), visible: true},
    'empire state building': {width: 125, display_width: 3.81E+02, img_src: 'images/objects/empirestatebuilding.png', img: new Image(), visible: true},
    'sears tower': {width:142, display_width: 4.42E+02, img_src: 'images/objects/searstower.png', img: new Image(), visible: true},
    'Oriental Pearl TV tower': {width: 79, display_width: 4.68E+02, img_src: 'images/objects/orientalpearltvtowers.png', img: new Image(), visible: true},
    'Petronas Twin Towers': {width: 278, display_width: 4.52E+02, img_src: 'images/objects/petronastowers.png', img: new Image(), visible: true},
    'Burj Khalifa': {width: 2.42E+02, display_width: 8.28E+02, img_src: 'images/objects/burjdubaitower.png', img: new Image(), visible: true},
    'Mt Fuji': {width: 2.26E+04, display_width: 3.78E+03, img_src: 'images/objects/fuji.png', img: new Image(), visible: true},
    'Mt Everest': {width: 2.94E+04, display_width: 8.85E+03, img_src: 'images/objects/everest.png', img: new Image(), visible: true},
    'Great Lakes': {width: 1.69E+06, img_src: 'images/objects/GreatLakes.png', img: new Image(), visible: true},
    'Pluto': {width: 2.27E+06, img_src: 'images/objects/pluto.png', img: new Image(), visible: true},
    'Greenland': {width: 2.67E+06, img_src: 'images/objects/Greenland.png', img: new Image(), visible: true},
    'the Moon': {width: 3.48E+06, img_src: 'images/objects/moon.png', img: new Image(), visible: true},
    'United States of America': {width: 5.3E+06, img_src: 'images/objects/America.png', img: new Image(), visible: true},
    'Antarctica': {width: 5.736E+06, img_src: 'images/objects/Antarctica.png', img: new Image(), visible: true},
    'Africa': {width: 7.62E+06, img_src: 'images/objects/Africa.png', img: new Image(), visible: true},
    'Mars': {width: 6.79E+06, img_src: 'images/objects/mars.png', img: new Image(), visible: true},
    'Venus': {width: 1.21E+07, img_src: 'images/objects/venus.png', img: new Image(), visible: true},
    'Earth': {width: 1.27E+07, img_src: 'images/objects/earth.png', img: new Image(), visible: true},
    'neptune': {width: 4.94E+07, img_src: 'images/objects/neptune.png', img: new Image(), visible: true},
    'saturn': {width: 1.20E+08, img_src: 'images/objects/saturn.png', img: new Image(), visible: true},
    'jupiter': {width: 1.42E+08, img_src: 'images/objects/jupiter.png', img: new Image(), visible: true},
    'the sun': {width: 1.39E+09, img_src: 'images/objects/sun.png', img: new Image(), visible: true},
    'Sirius A': {width: 2.50E+09, img_src: 'images/objects/sirius.png', img: new Image(), visible: true},
    'Pollux': {width: 1.10E+10, img_src: 'images/objects/pollux.png', img: new Image(), visible: true},
    'Aldebaran': {width: 6.00E+10, img_src: 'images/objects/Aldebaran.png', img: new Image(), visible: true},
    'Rigel': {width: 9.70E+10, img_src: 'images/objects/rigel.png', img: new Image(), visible: true},
    'La Superba': {width: 4.20E+11, img_src: 'images/objects/La-Superba.png', img: new Image(), visible: true},
    'Antares': {width: 1.11E+12, img_src: 'images/objects/antares.png', img: new Image(), visible: true},
    'VY Canis Majoris': {width: 3.00E+12, img_src: 'images/objects/VY-Canis-Majoris.png', img: new Image(), visible: true},
    'Homunculus Nebula': {width: 2.00E+13, img_src: 'images/objects/homunculusnebula.png', img: new Image(), visible: true},
    'Sting Ray Nebula': {width: 3.00E+14, img_src: 'images/objects/stingraynebula.png', img: new Image(), visible: true},
    'Cat\'s Eye Nebula': {width: 2.50E+15, img_src: 'images/objects/catseyenebula.png', img: new Image(), visible: true},
    'Ring Nebula': {width: 1.30E+16, img_src: 'images/objects/ringnebula.png', img: new Image(), visible: true},
    'Helix Nebula': {width: 3.00E+16, img_src: 'images/objects/helixnebula.png', img: new Image(), visible: true},
    'Horsehead Nebula': {width: 2.00E+16, img_src: 'images/objects/horseheadnebula.png', img: new Image(), visible: true},
    'Crab Nebula': {width: 7.00E+16, img_src: 'images/objects/crabnebula.png', img: new Image(), visible: true},
    'The Pillars of Creation': {width: 9.50E+16, img_src: 'images/objects/pillarsofcreation.png', img: new Image(), visible: true},
    'Great Orion Nebula': {width: 2.00E+17, img_src: 'images/objects/greatorionnebula.png', img: new Image(), visible: true},
    'Rosette Nebula': {width: 6.50E+17, img_src: 'images/objects/rosettenebula.png', img: new Image(), visible: true},
    'M14 Globular Cluster': {width: 5.00E+17, img_src: 'images/objects/m14globularcluster.png', img: new Image(), visible: true},
    'Omega Centauri': {width: 1.00E+18, img_src: 'images/objects/omegacentauri.png', img: new Image(), visible: true},
    'M54 Globular Clster': {width: 1.50E+18, img_src: 'images/objects/m54globularcluster.png', img: new Image(), visible: true},
    'Sagitarius Dwarf Galaxy': {width: 1.00E+19, img_src: 'images/objects/sagitariusdwarfgalaxy.png', img: new Image(), visible: true},
    'Large Magellanic Cloud': {width: 7.50E+19, img_src: 'images/objects/largemagellaniccloud.png', img: new Image(), visible: true},
    'NGC 7714': {width: 3.50E+20, img_src: 'images/objects/ngc7714.png', img: new Image(), visible: true},
    'Triangulum Galaxy': {width: 5.00E+20, img_src: 'images/objects/triangulumgalaxy.png', img: new Image(), visible: true},
    'Sombrero Galaxy': {width: 7.00E+20, img_src: 'images/objects/sombrerogalaxy.png', img: new Image(), visible: true},
    'Black Eye Galaxy': {width: 8.50E+20, img_src: 'images/objects/blackeyegalaxy.png', img: new Image(), visible: true},
    'Milky Way Galaxy': {width: 1.20E+21, img_src: 'images/objects/milkyway.png', img: new Image(), visible: true},
    'Andromeda Galaxy': {width: 1.50E+21, img_src: 'images/objects/andromedagalaxy.png', img: new Image(), visible: true},
    'Pinwheel Galaxy': {width: 1.80E+21, img_src: 'images/objects/pinwheelgalaxy.png', img: new Image(), visible: true},
    'Virgo A': {width: 2.50E+21, img_src: 'images/objects/virgoa.png', img: new Image(), visible: true},
    'Local Galactic Group': {width: 4.00E+22, img_src: 'images/objects/localgalacticgroup.png', img: new Image(), visible: true},
    'Virgo Galactic Group': {width: 1.50E+23, img_src: 'images/objects/virgogalacticgroup.png', img: new Image(), visible: true},
    'Observable Universe': {width: 1.40E+26, img_src: 'images/objects/observableuniverse.png', img: new Image(), visible: true},
  }
  
  
  var order = 0
  for(var object in OBJECT_LIBRARY) {
    OBJECT_LIBRARY[object].order = order
    order++
  }
  
    
  var MIN_WIDTH = 100e-9
  var MAX_WIDTH = 1.391e9
  
  var ZOOMING = false
  
  var LEVELS = [
    {max_random_oom: 20, min_multiple: 10, num_random: 2, num_tries: 6},
    {max_random_oom: 10, min_multiple: 10, num_random: 3, num_tries: 5},
    {max_random_oom: 6, min_multiple: 4, num_random: 4, num_tries: 5},
    {max_random_oom: 5, min_multiple: 3, num_random: 4, num_tries: 4},
    {max_random_oom: 3, min_multiple: 2, num_random: 5, num_tries: 4},
    {max_random_oom: 2, min_multiple: 2, num_random: 5, num_tries: 4},
    {max_random_oom: 2, min_multiple: 1.5, num_random: 6, num_tries: 4},
    {max_random_oom: 2, min_multiple: 1.5, num_random: 6, num_tries: 3}
  ]
  
  var LEVEL_NUM = 0
  var LEVEL = null
  
  
  var OBJECTS = []
  var OBJECT_GROUPS = []
  var OBJECTS_PER_GROUP = 15
  
  // Load object images
  for(var obj in OBJECT_LIBRARY) {
    OBJECT_LIBRARY[obj].img.obj = OBJECT_LIBRARY[obj]
    OBJECT_LIBRARY[obj].img.src = OBJECT_LIBRARY[obj].img_src
  }
  
  
  
  // ---------------------------------------------------
  
  
  var TRIES_LEFT = 0
  var NUM_CORRECT = 0
  var RANDOM_TARGET_OBJECT_NAMES = []
  var FOUND_TARGET_OBJECT_NAMES = []
  var PLAYING = false
  
  
  var start_new_game = function(difficulty_change) {
    $('#game_instructions').hide()
    
    if(difficulty_change) {
      Game.play_sound('new_level')
    } else {
      Game.play_sound('start_game')
    }
    
    Message.hide()
    
    PLAYING = true
    
    difficulty_change = difficulty_change || 0
    LEVEL_NUM += difficulty_change
    if(LEVEL_NUM < 0) {
      LEVEL_NUM = 0
    } else if(LEVEL_NUM >= LEVELS.length) {
      LEVEL_NUM = LEVELS.length - 1
    }
    
    LEVEL = LEVELS[LEVEL_NUM]
    
    TRIES_LEFT = LEVEL.num_tries
    NUM_CORRECT = 0
    
    load_objects()
    setup_slider()
    update_score_display()
    do_slide(ORIGINAL_SLIDER_VALUE)
  }
  
  
  var game_over = function() {
    PLAYING = false
    Message.hide()
    
    Game.play_sound('game_over')
    
    if(NUM_CORRECT >= LEVEL.num_random) {
      var message = 'YEY! You win!'
      
      // Achievements
      if(LEVEL_NUM >= 3-1) {
        Game.unlock_achievement('dimension_zone_1', 'Scale Scavenge Hunter')
      } else if(LEVEL_NUM >= 6-1) {
        Game.unlock_achievement('dimension_zone_2', 'Dimension Zone Pro')
      }
      
    } else {
      var message = 'OH NO! You lose!'
    }
    
    $('.message.play_again .content').html(message)
    Message.display($('.message.play_again'), -1)
  }
  
  
  var update_score_display = function() {
    $('#score .num_correct').html(NUM_CORRECT + ' of ' + LEVEL.num_random)
    $('#score .tries_left').html(TRIES_LEFT)
    $('#score').show()
  }
  
  
  var object_click = function(e) {
    var elem = $(e.currentTarget)
    
    hide_object_info()
    show_object_info(elem.data('obj'))
    
    if(!PLAYING) return
    
    var object_name = elem.data('object_name')
    if(object_name && RANDOM_TARGET_OBJECT_NAMES.indexOf(object_name) != -1) {
      Game.play_sound('correct')
      
      if(FOUND_TARGET_OBJECT_NAMES.indexOf(object_name) == -1) {
        FOUND_TARGET_OBJECT_NAMES.push(object_name)
        Message.display('Good job!', 1000)
//       setTimeout(function(){scale_object_to_proper_size(elem)}, 1000)
        NUM_CORRECT += 1
      }
    
    } else {
      Game.play_sound('incorrect')
      TRIES_LEFT -= 1
      Message.display('Wrong!<br />Guess again!', 1000)
    }
    
    update_score_display()
    
    if(TRIES_LEFT <= 0 || NUM_CORRECT >= LEVEL.num_random) game_over()
  }
  
  
  var load_objects = function() {
    OBJECTS = []
    RANDOM_TARGET_OBJECT_NAMES = []
    FOUND_TARGET_OBJECT_NAMES = []
    
    VIEWPORT.empty()
    
    // Copy the objects
    for(var name in OBJECT_LIBRARY) {
      var obj = $.extend({}, OBJECT_LIBRARY[name])
      obj.name = name
      OBJECTS.push(obj)
    }
    
    // Get random objects
    if(LEVEL && LEVEL.num_random) {
      var random_objects = OBJECTS.sort(function(){return Math.round(Math.random())-0.5}).slice(0, LEVEL.num_random)
      
      // Randomly change the size of the objects
      // base on "max_random_oom", which is simply the maximum orders of magnitude the object's size can change
      var random_object
      for(var i = 0; i < LEVEL.num_random; i++) {
        var random_object = random_objects[i]
        var min = Math.max(Math.log10(MIN_WIDTH), Math.log10(random_object.width) - LEVEL.max_random_oom)
        var max = Math.min(Math.log10(MAX_WIDTH), Math.log10(random_object.width) + LEVEL.max_random_oom)
        var random_width = Math.pow(10, min + Math.random() * (max - min))
        
        // Make sure the random width is different enough
        if(random_width < random_object.width && random_width > random_object.width / LEVEL.min_multiple) {
          random_width = random_object.width / LEVEL.min_multiple
        } else if(random_width > random_object.width && random_width < random_object.width * LEVEL.min_multiple) {
          random_width = random_object.width * LEVEL.min_multiple
        }
        
        random_object.width = random_width
        
        for(var obj in OBJECT_LIBRARY) {
          if(OBJECT_LIBRARY[obj].width > random_object.width) {
            random_object.original_order = random_object.order
            random_object.order = OBJECT_LIBRARY[obj].order - 0.5
            break
          }
        }
        $(random_object.img).data('object_name', random_object.name)
        RANDOM_TARGET_OBJECT_NAMES.push(random_object.name)
      }
    }
    
    insert_objects()
  }
  
  
  var insert_objects = function() {
    // Order the objects by size
    OBJECTS.sort(function(a, b) {return a.order - b.order})
    
    // Place the objects in the appropriate groups
    OBJECT_GROUPS = []
    var num_groups = Math.ceil(OBJECTS.length / OBJECTS_PER_GROUP)
    for(var i = 0; i < num_groups; i++) {
      OBJECT_GROUPS.push({min_width: 0, max_width: 0, objects: [], hidden: false})
    }
    
    var group = null
    for(var i = 0; i < OBJECTS.length; i++) {
      group = OBJECT_GROUPS[Math.floor(i / OBJECTS_PER_GROUP)]
      group.objects.push(OBJECTS[i])
    }
    
    for(var i = 0; i < num_groups; i++) {
      group = OBJECT_GROUPS[i]
      group.min_width = group.objects[0].width
      group.max_width = group.objects[group.objects.length-1].width
    }
    
    // Place the objects in the viewport
    for(var i = 0; i < OBJECTS.length; i++) {
      $(OBJECTS[i].img).data('obj', OBJECTS[i]).bind('click', object_click).appendTo(VIEWPORT)
    }
  }
  
  
  var ZOOM_TIMEOUT = null
  var LAST_ZOOM_TIME = null
  
  var zoom_to_new_scale = function() {
    clearTimeout(ZOOM_TIMEOUT)
    ZOOMING = true
    
    var time = new Date().getTime()
    var interval = time - LAST_ZOOM_TIME
    LAST_ZOOM_TIME = time
    
    var steps = 200 / interval
    
    LOG_SCALE += (NEW_LOG_SCALE - LOG_SCALE) / steps
    SCALE = Math.pow(10, LOG_SCALE)
    
    draw_objects()
    draw_ruler()
    
    if(Math.abs(NEW_LOG_SCALE - LOG_SCALE) > 0.01) {
      ZOOM_TIMEOUT = setTimeout(zoom_to_new_scale, 10)
    } else {
      ZOOMING = false
      if(!DIAL_DRAGGING) show_object_info()
    }
  }
  
  
  var shown_img = null
  var show_object_info_timeout = null
  
  var set_object_info = function(obj) {
    $('#container .object_info .inner').html(obj.name)
    
    var width = obj.display_width || obj.width
    
    var exp = Math.exponent(width)
    var i = width / Math.pow(10, exp)
    
    if(Math.abs(i - Math.round(i)) < .01) {
      i = Math.round(i)
    } else {
      i = i.toFixed(1)
    }
    
    if(exp == 0) {
      var size = Math.round(i)+(i == 1 ? ' meter' : ' meters')
    } else if(exp > 0 && exp <= 3) {
      var size = addCommas(Math.round(width))+' meters'
    } else {
      var size = i+' x 10<sup>'+exp+'</sup> meters'
    }
    
    $('<span />').addClass('size').html(size).appendTo($('#container .object_info .inner'))
  }
  
  var show_object_info = function(selected_obj) {
    Game.play_sound('object')
    
    var obj, img, left, right
    
    var orf_img = $('.object_info .orf img')
    var orf_src = orf_img.attr('src').split('?')[0]
    orf_img.attr('src', orf_src+'?'+Date.now())
    
    if(selected_obj) {
      shown_img = $(selected_obj.img)
      shown_img.animate({opacity: 0.25}, 200).animate({opacity: 1}, 200)
      set_object_info(selected_obj)
      $('#container .object_info').fadeIn(500)
      
    } else {
      for(var i = 0; i < OBJECTS.length; i++) {
        obj = OBJECTS[i]
        if(!OBJECTS[i].visible) continue
        
        img = $(obj.img)
        left = img.position().left
        right = left + img.width()
        
        if(left <= WIDTH/2 && right >= WIDTH/2) {
          shown_img = img
          selected_obj = obj
          shown_img.animate({opacity: 0.25}, 200).animate({opacity: 1}, 200)
          .animate({opacity: 0.25}, 200).animate({opacity: 1}, 200)
          show_object_info_timeout = setTimeout(function() {
            set_object_info(selected_obj)
            $('#container .object_info').fadeIn(500)
          }, 800)
          break
        }
      }
    }
  }
  
  
  var hide_object_info = function() {
    if(shown_img) shown_img.stop().css('opacity', 1)
    clearTimeout(show_object_info_timeout)
    $('#container .object_info').stop().css('opacity', 1).hide()
  }
  
  
  var draw_objects = function() {
    var obj, group, width
    
    var min_width = 2
    var max_width = 10*WIDTH
    
    var num_groups = OBJECT_GROUPS.length
    
    for(var i = 0; i < num_groups; i++) {
      var group = OBJECT_GROUPS[i]
      
      // Is the group too small or too large to display?
      if((group.max_width / SCALE) < min_width || (group.min_width / SCALE) > max_width) {
        if(!group.hidden) {   // If it's not already hidden, hide it
          group.hidden = true
          for(var o = 0; o < group.objects.length; o++) {
            obj = group.objects[o]
            obj.img.style.display = 'none'
            obj.visible = false
          }
        }
      
      // Otherwise, just update the size of the objects
      } else {
        group.hidden = false
        for(var o = 0; o < group.objects.length; o++) {
          obj = group.objects[o]
          width = Math.round(obj.width / SCALE)
          if(width >= min_width && width <= max_width) {
            obj.img.style.width = width+'px'
            
            if(!obj.visible) {
              obj.visible = true
              obj.img.style.display = 'inline'
            }
            
          } else if(obj.visible) {
            obj.visible = false
            obj.img.style.display = 'none'
          }
        }
      }
      
    }
    
//     for(var i = 0; i < OBJECTS.length; i++) {
//       obj = OBJECTS[i]
//       
//       width = Math.round(obj.width / SCALE)
//       if(width > 1 && width < 10*WIDTH) {
//         obj.img.style.width = width+'px'
// 				
//         if(!obj.visible) {
//           obj.visible = true
//           obj.img.style.display = 'inline'
//         }
//         
//       } else if(obj.visible) {
//         obj.visible = false
//         obj.img.style.display = 'none'
//       }
//     }
  }
  
  
  var draw_ruler = function() {
  	RULER_LABELS.html('')
  	
  	var log_scale = LOG_SCALE + Math.log10(WIDTH)
  	
    var super_rule_log_scale = Math.floor(log_scale)
    var super_rule_spacing = WIDTH / Math.pow(10, log_scale - super_rule_log_scale)
    
    var rule_log_scale = super_rule_log_scale - 1
    var rule_spacing = WIDTH / Math.pow(10, log_scale - rule_log_scale)

    var sub_rule_log_scale = rule_log_scale - 1
    var sub_rule_spacing = WIDTH / Math.pow(10, log_scale - sub_rule_log_scale)
    
    RULER_CONTEXT.clearRect(0, 0, WIDTH, RULER_CANVAS_HEIGHT)
    RULER_CONTEXT.lineCap = 'round'
    
    var height_percent = super_rule_spacing / WIDTH
    
    
    // Ruler label parameters
    var label_color = 'rgba(255, 255, 255, '+(1 - 0.1 * (WIDTH / super_rule_spacing))+')'
		
    // Draw super rule
    var opacity = Math.min(1, super_rule_spacing / (WIDTH/10))
    var height = RULER_CANVAS_HEIGHT * (0.5 + 0.5 * height_percent)
    RULER_CONTEXT.strokeStyle = 'rgba(255, 255, 255, '+opacity+')'
    RULER_CONTEXT.lineWidth = 3
    
    var x = 0
    var i = 0
    var label = ''
    while(x <= WIDTH) {
      RULER_CONTEXT.beginPath()
      RULER_CONTEXT.moveTo(x, 0)
      RULER_CONTEXT.lineTo(x, height)
      RULER_CONTEXT.stroke()
      x += super_rule_spacing
      i++
      if(super_rule_log_scale == 0) {
        label = i+(i == 1 ? ' meter' : ' meters')
      } else if(super_rule_log_scale > 0 && super_rule_log_scale <= 3) {
        label = addCommas(i*Math.pow(10, super_rule_log_scale))+' m'
      } else {
        label = i+' x 10<sup>'+super_rule_log_scale+'</sup> m'
      }
      $('<span />').css({width: x+20, color: label_color}).html(label).appendTo(RULER_LABELS)
    }

    // Draw main rule
    opacity = Math.min(1, rule_spacing / (WIDTH/10))
    height = RULER_CANVAS_HEIGHT * (.25 + .25 * height_percent)
    RULER_CONTEXT.strokeStyle = 'rgba(255, 255, 255, '+opacity+')'
    RULER_CONTEXT.lineWidth = 2
    
    x = 0
    while(x <= WIDTH) {
      RULER_CONTEXT.beginPath()
      RULER_CONTEXT.moveTo(x, 0)
      RULER_CONTEXT.lineTo(x, height)
      RULER_CONTEXT.stroke()
      x += rule_spacing
    }
    
    // Draw sub rule
    opacity = Math.min(1, sub_rule_spacing / (WIDTH/10))
    height = RULER_CANVAS_HEIGHT * (.25 * height_percent)
    RULER_CONTEXT.strokeStyle = 'rgba(255, 255, 255, '+opacity+')'
    RULER_CONTEXT.lineWidth = 1
    
    x = 0
    while(x <= WIDTH) {
      RULER_CONTEXT.beginPath()
      RULER_CONTEXT.moveTo(x, 0)
      RULER_CONTEXT.lineTo(x, height)
      RULER_CONTEXT.stroke()
      x += sub_rule_spacing
    }
  }
    
  
  var scale_object_to_proper_size = function(elem) {
    var original_obj = OBJECT_LIBRARY[elem.data('object_name')]
            
    // Create the new object
    var width = elem.width() * SCALE
    var obj_img = $(original_obj.img.cloneNode(true))
    
    var ghost_obj = $.extend({}, original_obj)
    ghost_obj.img = ghost_obj.img.cloneNode(true)
		ghost_obj.width = 0
    
    // Move the object to it's proper position in the OBJECTS array
    var next_obj = null
    if(OBJECTS.length == 0) {
    	OBJECTS.push(ghost_obj)
    	
    } else {
			var insert_i = -1
			for(var i = 0, ii = OBJECTS.length; i < ii; i++) {
				if(OBJECTS[i].order > original_obj.order) {
					insert_i = i
					next_obj = $(OBJECTS[i].img)
					break
				}
			}
			if(insert_i == -1) {
				OBJECTS.push(ghost_obj)
			} else {
				OBJECTS.splice(insert_i, 0, ghost_obj)
			}
    }
		
		// Drop the object
    obj_img.css({
    	position: 'absolute',
    	display: 'inline',
    	width: elem.width(),
    	left: elem.position().left,
    	bottom: 0
    })
    $(ghost_obj.img).css({visibility: 'hidden'})
    
    if(next_obj) {
    	$(ghost_obj.img).insertBefore(next_obj)
    	obj_img.insertBefore(next_obj)
    } else {
    	obj_img.appendTo(VIEWPORT)
	    $(ghost_obj.img).appendTo(VIEWPORT)
    }
    
    elem.remove()
    
    insert_objects()
    draw_objects()
    
    // After a short delay, animate the object to it's proper position
    setTimeout(function() {
    	animate_ghost(obj_img, ghost_obj, original_obj.width)
    }, 250)
  }
  
  
  var animate_ghost = function(obj_img, ghost_obj, width) {  	
  	var speed = .1
  	
  	var delta_width = width - ghost_obj.width
		ghost_obj.width += speed * delta_width
		
		var obj_left = obj_img.position().left
		var ghost_left = $(ghost_obj.img).position().left
		var delta_left = ghost_left - obj_left
		
		obj_left += speed * delta_left
		var obj_width = obj_img.width()
		obj_width += speed * (width/SCALE - obj_width)
		
		obj_img.css({left: obj_left, width: obj_width})
		
		// Finish the animation if we are done, or if the object is far enough off the screen to the right
		if(obj_width > WIDTH || Math.abs(delta_width / ghost_obj.width) <= 0.01) {
			ghost_obj.width = width
			$(ghost_obj.img).css({visibility: 'visible'})
      obj_img.remove()
			
			// Zoom to the dropped object if it's not on the screen
			if(obj_left > WIDTH || obj_width > WIDTH || obj_width < 25) {
    		SLIDER_VALUE = 1000 * (Math.exponent(ghost_obj.width) - 1.6)
    		do_slide(SLIDER_VALUE)
    	}
		
		} else {
    	setTimeout(function() {animate_ghost(obj_img, ghost_obj, width)}, 0)
    }
    
    draw_objects()
  }
  
  
  // Set up zoom slider
  var do_slide = function(value) {
    NEW_LOG_SCALE = value / 1000
    LAST_ZOOM_TIME = new Date().getTime()
    if(!ZOOMING) {
      hide_object_info()
      zoom_to_new_scale()
    }
  }
  
  var DIAL_DRAGGING = false
  var MIN_SLIDER, MAX_SLIDER
  
  var setup_slider = function() {
    if(OBJECTS.length > 0) {
      MIN_SLIDER = 1000 * (Math.exponent(OBJECTS[0].width) - 2)
      MAX_SLIDER = 1000 * (Math.exponent(OBJECTS[OBJECTS.length-1].width) - 2)
    } else {
      MIN_SLIDER = 1000 * -11
      MAX_SLIDER = 1000 * 7
    }
    
    // Set zoom level to smallest object
    if(OBJECTS.length > 0) {
      LOG_SCALE = Math.exponent(OBJECTS[0].width) - 2
    } else {
      LOG_SCALE = -11
    }
    NEW_LOG_SCALE = LOG_SCALE
    SCALE = Math.pow(10, LOG_SCALE)
  }
  
  
  
  var DIAL_CONTAINER = $('#zoom_dial')
  var DIAL_INTERVAL = null
  var DIAL_PADDING = 322
  var DIAL_OFFSET = 0
  var DIAL_CONTAINER_WIDTH = DIAL_CONTAINER.width()
  var DIAL = $('#zoom_dial .handle')
  
  DIAL.css('left', DIAL_CONTAINER_WIDTH / 2)
  
  var update_dial = function() {
    SLIDER_VALUE += DIAL_OFFSET * 2.0
    SLIDER_VALUE = Math.min(MAX_SLIDER, Math.max(MIN_SLIDER, SLIDER_VALUE))
    do_slide(SLIDER_VALUE)
  }
  
  DIAL.unbind('mousedown').bind('mousedown', function() {
    Game.play_sound('zooming')
    DIAL_DRAGGING = true
    DIAL_INTERVAL = setInterval(update_dial, 66)
  })
  
  $(document).bind('mouseup', function() {
    if(!DIAL_DRAGGING) return
    Game.stop_sound('zooming')
    DIAL_DRAGGING = false
    clearInterval(DIAL_INTERVAL)
    DIAL.animate({left: DIAL_CONTAINER_WIDTH / 2}, 250)
  })
  
  $(document).bind('mousemove', function(e) {
    if(!DIAL_DRAGGING) return
    var left = e.clientX - DIAL_CONTAINER.offset().left
    left = Math.max(DIAL_PADDING, Math.min(DIAL_CONTAINER_WIDTH - DIAL_PADDING, left))
    DIAL.css('left', left)
    DIAL_OFFSET = left - DIAL_CONTAINER_WIDTH / 2
  })
  
  
  
  var addCommas = function(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }
  
  
  
  // ------------------ GAME SETUP ----------------------
  
  Game.load_sounds([
    {
      id: 'object',
      url: 'sounds/object.mp3',
      volume: 50
    }, {
      id: 'start_game',
      url: 'sounds/start_game.mp3',
      volume: 50
    }, {
      id: 'new_level',
      url: 'sounds/new_level.mp3',
      volume: 50
    }, {
      id: 'game_over',
      url: 'sounds/game_over.mp3',
      volume: 50
    }, {
      id: 'correct',
      url: 'sounds/correct.mp3',
      volume: 50
    }, {
      id: 'incorrect',
      url: 'sounds/incorrect.mp3',
      volume: 50
    }, {
      id: 'zooming',
      url: 'sounds/zooming.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 20
    }, {
      id: 'background',
      url: 'sounds/background.mp3',
      music_muteable: true,
      stream: true,
      loops: 999999,
      volume: 20
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
    'images/orf.gif',
    'images/orf_background.png',
    'images/info_gradient.png',
    'images/dial_holder.png',
    'images/slider.png'
  ]
  
  for(var i in OBJECT_LIBRARY) {
    images_to_preload.push(OBJECT_LIBRARY[i].img_src) 
  }
  
  Game.load_images(images_to_preload)
  
  Game.start_gameplay = function() {
    hide_object_info()
    
    Game.stop_sound('theme')
    Game.play_sound('background')
    
    $('#game_instructions .play').bind('click', function() {
      if($('.message.start').is(':visible')) return
      hide_object_info()
      Message.display($('.message.start'), -1)
    })
        
    $('#start_game').bind('click', function(){start_new_game()})
    $('#cancel_game').bind('click', Message.hide)
    
    $('.message.play_again .easier').bind('click', function(){start_new_game(-1)})
    $('.message.play_again .harder').bind('click', function(){start_new_game(1)})
    $('.message.play_again .stop_playing').bind('click', function() {
      Message.hide()
      $('#game_instructions').show()
      $('#score').hide()
      LEVEL = null
      load_objects()
      do_slide(ORIGINAL_SLIDER_VALUE)
    })
    
    load_objects()
    setup_slider()
    do_slide(ORIGINAL_SLIDER_VALUE)
  }
  
  Game.initialize()
})


Math.log10 = function(num) {
  return Math.log(num) / Math.LN10
}

Math.exponent = function(num) {
  return Math.floor(Math.log10(num))
}

$.digits = function(number) {
	return (''+number).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
