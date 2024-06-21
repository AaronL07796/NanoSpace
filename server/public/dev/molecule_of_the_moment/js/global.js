var molecule = null

$(window).load(function() {
  
  var which_molecule = ML.biotin
  // var which_molecule = ML.PbTiO3
  // var which_molecule = ML.bucky
  
  molecule = new Molecule(which_molecule, {
    coordinates: [500, 250, 500],
    canvas: $('#molecule')
  })
})