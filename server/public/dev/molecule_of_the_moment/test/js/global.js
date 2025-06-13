var molecule = null


var change_molecule = function(elem, symbol) {
  if(molecule) molecule.destroy()
  molecule = new Molecule(MoleculeLibrary[symbol])
  
  $('#molecule_selector a').bind('click', function(e) {
    $('#molecule_selector a').removeClass('selected')
    $(elem).addClass('selected')
  })
}


$(window).load(function() {
  $('#molecule_selector a:first').click()
})