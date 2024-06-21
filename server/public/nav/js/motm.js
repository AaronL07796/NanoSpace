// Call this with either true or false to pause or resume the motm animation
var motm_pause = function(paused){}


$(function() {
  
  // FIXME: Busted PDBs:  
  // Buckyball - invalid center point
  // Adrenaline - invalid center point
  // Sucrose - invalid center point
  // TNT - invalid center point
  
  var MOLECULES = [
    {
//       name: 'buckyball',
//       title: 'Buckminsterfullerene',
//       chemical_formula: 'C60',
//       scale: 1.35,
//       minimized_scale: .25,
//       rotation_angle: 1.375046773217018,
//       rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
//       description: 'Buckminsterfullerene is a spherical molecule made of 60 carbon atoms.  It was discovered in 1985 and named after the inventor of geodesic domes due to the similarity in shape.'
//     },{
      name: 'asparagine',
      title: 'Asparagine',
      chemical_formula: 'C4H8N2O3',
      scale: 1.75,
      minimized_scale: .4,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Asparagine is one of the most common amino acids, one of the 20 building blocks of proteins. It was first isolated in asparagus juice in 1806.'
    },{
      name: 'leucine',
      title: 'Leucine',
      chemical_formula: 'C6H13NO2',
      scale: 1.75,
      minimized_scale: .4,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Leucine is an essential amino acid, which means that animals cannot produce it, so it must be consumed. It is produced by plants. It is utilized by the liver and muscles.'
    },{
      name: 'glucose',
      title: 'Glucose',
      chemical_formula: 'C6H12O6',
      scale: 1.7,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Glucose is a simple sugar and carbohydrate that cells use for energy. It is one of the main products of photosynthesis.'
    },{
//       name: 'adrenaline',
//       title: 'Adrenaline',
//       chemical_formula: 'C9H13NO3',
//       scale: 1.75,
//       minimized_scale: .4,
//       rotation_angle: 1.375046773217018,
//       rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
//       description: 'Adrenaline is a hormone produced by the body in high stress or excited states.'
//     },{
//       name: 'sucrose',
//       title: 'Sucrose',
//       chemical_formula: 'C12H22O11',
//       scale: 1.75,
//       minimized_scale: .4,
//       rotation_angle: 1.375046773217018,
//       rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
//       description: 'Sucrose is commonly known as "table sugar". It is derived from glucose and fructose. 150,000,000 tons are produced annually.'
//     },{
      name: 'tryptophan',
      title: 'Tryptophan',
      chemical_formula: 'C11H12N2O2',
      scale: 1.65,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Tryptophan is one of the 20 standard amino acids and essential to the human diet. It is plentiful in milk, chocolate, yogurt, poultry, red meat, eggs and peanuts.'
    },{
      name: 'codeine',
      title: 'Codeine',
      chemical_formula: 'C18H21NO3',
      scale: 1.5,
      minimized_scale: .25,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Codeine is a pain reliever. It is an opiate found in poppy flowers.'
    },{
      name: 'ascorbic_acid',
      title: 'Vitimin C',
      chemical_formula: 'C6H8O6',
      scale: 1.75,
      minimized_scale: .4,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Vitamin C, also know as ascorbic acid, is an essential nutrient for humans. It is an anitoxidant that is found in many citrus fruits and vegetables.'
    },{
      name: 'cortisone',
      title: 'Cortisone',
      chemical_formula: 'C21H28O5',
      scale: 1.15,
      minimized_scale: .2,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Cortisone is a steroid hormone. It is commonly used to reduce pain, swelling and inflammation at the site of an injury.'
    },{
      name: 'estrogen',
      title: 'Estrogen',
      chemical_formula: 'C18H24O2',
      scale: 1.25,
      minimized_scale: .225,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Estrogen is the primary female sex hormone. It is a steroid that is essential to the reproductive cycle.'
    },{
      name: 'testosterone',
      title: 'Testosterone',
      chemical_formula: 'C19H28O2',
      scale: 1.25,
      minimized_scale: .225,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Testosterone is the principal male sex hormone. It is an anabolic steroid that contributes to the growth of muscle mass and strength.'
    },{
      name: 'procaine',
      title: 'Procaine (Novocain)',
      chemical_formula: 'C13H20N2O2',
      scale: 1.25,
      minimized_scale: .225,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Procaine is a local anesthetic drug commonly used by dentists to block pain. Novocain is the common commercial name of this drug.'
    },{
      name: 'ibuprofen',
      title: 'Ibuprofen',
      chemical_formula: 'C13H18O2',
      scale: 1.3,
      minimized_scale: .25,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Ibuprofen is an anti-inflammatory drug used to relieve pain, treat arthritis and fevers. It was discovered in 1961.'
    },{
      name: 'menthol',
      title: 'Menthol',
      chemical_formula: 'C10H20O',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Menthol is an organic compound commonly found in mints. It is a mild local anesthetic that is widely used to relieve sore throats.'
    },{
      name: 'nicotine',
      title: 'Nicotine',
      chemical_formula: 'C10H14N2',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Nicotine is a highly addictive drug commonly found in tobacco. It is named after a French man that first imported tobacco plants and seeds from Brazil to Paris in 1560.'
    },{
      name: 'serotonin',
      title: 'Serotonin',
      chemical_formula: 'C10H12N2O',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Serotonin is a chemical produced in the brain. It is a neurotransmitter which means that it is involved with transmitting nerve impulses.  Serotonin is related to mood, sleep and appetite and a contributor to the feeling of well being.'
    },{
      name: 'caffeine',
      title: 'Caffeine',
      chemical_formula: 'C8H10N4O2',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Caffeine is a stimulant that was first isolated in coffee in 1820. It is a common ingredient in coffee, tea, soft drinks and energy drinks.'
    },{
      name: 'fructose',
      title: 'Fructose',
      chemical_formula: 'C6H12O6',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Fructose is also known as "fruit sugar" is a simple sugar commonly found in fruits, berries and honey.'
    },{
      name: 'citric_acid',
      title: 'Citric Acid',
      chemical_formula: 'C6H8O7',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Citric acid is a weak acid with a sour taste commonly found in many fruits and vegetables, especially citrus fruits. Lemons and limes have particularly high concentrations.'
    },{
//       name: 'tnt',
//       title: 'TNT',
//       chemical_formula: 'C7H5N3O6',
//       scale: 1.5,
//       minimized_scale: .3,
//       rotation_angle: 1.375046773217018,
//       rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
//       description: 'TNT is a explosive material commonly used in. It is useful since it is fairly shock and friction resistant so it is convenient to handle and fairly difficult to detonate.'
//     },{
      name: 'aspirin',
      title: 'Aspirin',
      chemical_formula: 'C9H8O4',
      scale: 1.5,
      minimized_scale: .35,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Aspirin is a common anti-inflammatory drug used to relieve minor aches and pains. It was first synthesized in 1853.'
    },{
      name: 'cinnamaldehyde',
      title: 'Cinnamaldehyde',
      chemical_formula: 'C9H8NO',
      scale: 1.5,
      minimized_scale: .3,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Cinnamaldehyde is the primary active component of cinnamon, a spice that comes from the inner bark of certain trees native to South East Asia.'
    },{
      name: 'saccharin',
      title: 'Saccharin',
      chemical_formula: 'C7H5NO3S',
      scale: 1.5,
      minimized_scale: .35,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Saccharin is an artificial sweetener used in many products like soft drinks, candies and toothpaste. It is much sweeter than sucrose, but has no food energy.'
    },{
      name: 'benzene',
      title: 'Benzene',
      chemical_formula: 'C6H6',
      scale: 2.4,
      minimized_scale: .45,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Benzene is a highly flammable, colorless liquid. It is common industrial chemical used in the production of plastics and synthetic rubber. It is found in crude oil, gasoline and cigarette smoke and known to cause cancer.'
    },{
      name: 'propane',
      title: 'Propane',
      chemical_formula: 'C3H8',
      scale: 2.5,
      minimized_scale: .5,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Propane is a fuel commonly used for barbecues, portable stoves and central heating. It is a by-product of natural gas and petroleum processing.'
    },{
      name: 'butane',
      title: 'Butane',
      chemical_formula: 'C4H10',
      scale: 2.35,
      minimized_scale: .35,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Butane is a colorless, highly flammable gas that is easy to liquify.  It is commonly used as fuel for lighters and cooking.'
    },{
      name: 'acetone',
      title: 'Acetone',
      chemical_formula: 'C3H6O',
      scale: 2.5,
      minimized_scale: .5,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Acetone is a solvent.  It is the active ingredient in paint thinner and nail polish remover.'
    },{
      name: 'ethanol',
      title: 'Ethanol',
      chemical_formula: 'C2H6O',
      scale: 2.5,
      minimized_scale: .65,
      rotation_angle: 1.375046773217018,
      rotation_vector: [0.9940454715973481, -0.10707201012961289, -0.02022832280766201],
      description: 'Ethanol is pure alcohol. It is the intoxicating ingredient in alcoholic beverages. It is also used as a motor fuel additive.'
    }
  ]
    

  var MOLECULE_I = 0
  
  var MOLECULE = null
  var MOLECULE_IS_ACTIVE = false
  
  var COORDINATES = [530, 455, 500]
  
  var HALL = $('#hall_area'),
      BACKGROUND_DARK,
      GLOW
  
  HALL.bind('enter', function() {
    MOLECULE_I = Math.floor(Math.random() * MOLECULES.length)
    
    BACKGROUND_DARK = HALL.find('.background_dark')
    GLOW = HALL.find('.glow')

    if($.support.opacity) {
      BACKGROUND_DARK.css('opacity', 0).show()
      GLOW.css('opacity', 0).show()
    }
    var m = MOLECULES[MOLECULE_I]
    
    MOLECULE = new Molecule(ML[m.name], {
      scale: m.minimized_scale,
      coordinates: COORDINATES,
      rotation_vector: m.rotation_vector,
      rotation_angle: m.rotation_angle,
      canvas: $('#motm')
    })
    
    MOLECULE.spin(.0005, true)
    
    if($.support.opacity) {
      HALL.children('.stage').css('opacity', 0).show().delay(200).fadeTo(500, 1.0)
    }
    
    motm_pause = function(paused) {
      if(paused) {
        MOLECULE.spin(false)
      } else {
        MOLECULE.spin(.0005, false)
      }
    }
  })

  var key_handler = function(event) {
    if(event.which == 27) close()
  }
  
  HALL.bind('exit', function() {
    close()
    MOLECULE.destroy()
  })
  
  
  var open = function() {
    if(MOLECULE_IS_ACTIVE) return
    MOLECULE_IS_ACTIVE = true
    
    $('#motm').trigger('motm_enter')
    
    HALL.find('.click_map').hide()
    
    var m = MOLECULES[MOLECULE_I]
    
    // Achievement
    var viewed_molecules = $.cookie('motm_viewed') ? $.cookie('motm_viewed').split(',') : []
    if(viewed_molecules.indexOf && viewed_molecules.indexOf(MOLECULE_I+'') == -1) {
      viewed_molecules.push(MOLECULE_I+'')
    }
    $.cookie('motm_viewed', viewed_molecules.join(','))
    
    if(viewed_molecules.length >= 3) {
      unlock_achievement('molecule_of_the_moment', 'Molecule Specialist')
    }
    
    
    if($.support.opacity) $('#motm').animate({opacity: 1}, 1000)
    if($.support.opacity) BACKGROUND_DARK.clearQueue().delay(200).animate({opacity: 1}, 1000)
    setTimeout(function() {
      MOLECULE.do_scale(m.scale, 300, -6.5)
      if($.support.opacity) GLOW.clearQueue().animate({opacity: 1}, 500)
      setTimeout(function() {
        var description = m.chemical_formula.replace(/(\d+)/g, '<sub>$1</sub>') + ' - ' + m.description
        HALL.find('.motm_description .inner').html(description)
        HALL.find('.motm_description').animate({bottom: 15}, 500, function() {
          $('#motm').trigger('motm_enter_complete')
        })
        $(document).keyup(key_handler)
      }, 300)
    }, 750)
  }
  
  
  var close = function() {
    if(!MOLECULE_IS_ACTIVE) return
    MOLECULE_IS_ACTIVE = false

    $('#motm').trigger('motm_exit')

    $(document).unbind('keyup', key_handler)
    
    HALL.find('.click_map').show()
    
    var m = MOLECULES[MOLECULE_I]
    
    HALL.find('.motm_description').animate({bottom: -500}, 500, function() {
      MOLECULE.do_scale(m.minimized_scale, 300, 0)
      if($.support.opacity) GLOW.clearQueue().animate({opacity: 0}, 500)
      setTimeout(function() {
        if($.support.opacity) $('#motm').animate({opacity: 0.75}, 1000)
        if($.support.opacity) BACKGROUND_DARK.clearQueue().delay(200).animate({opacity: 0}, 1000)
      }, 500)
    })
  }
  
  
  $('map[name=click_map_hall] .motm').live('click', open)
  HALL.find('.motm_description .close_button').live('click', close)
  
})
