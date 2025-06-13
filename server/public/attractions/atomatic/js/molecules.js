// var AtomDefinitions = {
//   'H': {color: 'rgb(255, 0, 0)', radius: 20, mass: 1},
//   'C': {color: 'rgb(100, 100, 100)', radius: 30, mass: 12},
//   'N': {color: 'rgb(255, 0, 255)', radius: 35, mass: 14},
//   'O': {color: 'rgb(0, 0, 255)', radius: 40, mass: 16},
// }
// 
var AtomDefinitions = {}
AtomDefinitions['H'] = {color: PERIODIC_TABLE['H'].color, radius: 50*PERIODIC_TABLE['H'].radius, mass: PERIODIC_TABLE['H'].mass}
AtomDefinitions['C'] = {color: PERIODIC_TABLE['C'].color, radius: 50*PERIODIC_TABLE['C'].radius, mass: PERIODIC_TABLE['C'].mass}
AtomDefinitions['N'] = {color: PERIODIC_TABLE['N'].color, radius: 50*PERIODIC_TABLE['N'].radius, mass: PERIODIC_TABLE['N'].mass}
AtomDefinitions['O'] = {color: PERIODIC_TABLE['O'].color, radius: 50*PERIODIC_TABLE['O'].radius, mass: PERIODIC_TABLE['O'].mass}



// Note: Make sure the atoms in the symbol strings are in order of heaviest to lightest
var CompleteMolecules = {
  'HH': {formula: 'H2', num: 0, points: 10, positions: [[0, 12], [Math.PI, 12]], radius: 27},
  'OO': {formula: 'O2', num: 0, points: 10, positions: [[0, 25], [Math.PI, 25]], radius: 50},
  'NN': {formula: 'N2', num: 0, points: 10, positions: [[0, 25], [Math.PI, 25]], radius: 50},
  'OON': {formula: 'NO2', num: 0, points: 40, positions: [[0, 35], [Math.PI, 35], [0, 0]], radius: 50},
  'OHH': {formula: 'H2O', num: 0, points: 40, positions: [[0, 0], [0, 35], [1.824, 35]], radius: 45},
  'OOC': {formula: 'CO2', num: 0, points: 40, positions: [[0, 35], [Math.PI, 35], [0, 0]], radius: 45},
  'CHHHH': {formula: 'CH4', num: 0, points: 75, positions: [[0, 0], [0, 35], [Math.PI/2, 35], [Math.PI, 35], [(3/2)*Math.PI, 35]], radius: 45},
  'NHHH': {formula: 'NH3', num: 0, points: 75, positions: [[0, 0], [5, 35], [1, 35], [Math.PI, 35]], radius: 45},
  'NCH': {formula: 'HCN', num: 0, points: 40, positions: [[0, 35], [0, 0], [Math.PI, 35]], radius: 45}
}


// Use the list of complete molecules to create an array of all possible molecular fragments
var MoleculeFragments = {}

for(var symbol in CompleteMolecules) {
  // Add the molecule itself to the list
  var m = CompleteMolecules[symbol]
  var positions = m.positions.slice(0)
  MoleculeFragments[symbol] = {positions: positions, radius: m.radius, stable: true}
  
  // Add molecule fragments
  for(var i = symbol.length-1; i > 1; i--) {
    var new_symbol = symbol.substring(0, i)
    if(MoleculeFragments[new_symbol]) continue
    MoleculeFragments[new_symbol] = {positions: positions.slice(0, i), radius: m.radius, stable: false}
  }
  
  // Make sure we get all combinations by reversing the symbol and fragmenting it again
  symbol = symbol.split('').reverse().join('')
  positions = positions.slice(0).reverse()
  for(var i = symbol.length-1; i > 1; i--) {
    var new_symbol = symbol.substring(0, i).split('').reverse().join('')
    if(MoleculeFragments[new_symbol]) continue
    MoleculeFragments[new_symbol] = {positions: positions.slice(0, i).reverse(), radius: m.radius, stable: false}
  }
}


var Molecule = function(params) {
  var THIS = {}
  
  params = params || {}
  
  THIS.x = params.x || 0
  THIS.y = params.y || 0
  THIS.vx = params.vx || 0
  THIS.vy = params.vy || 0
  
  THIS.angle = (typeof params.angle == 'undefined') ? Math.random()*2*Math.PI : params.angle
  THIS.v_angle = 0
  
  THIS.radius = 0
  THIS.mass = 0
  
  THIS.atoms = []
  var ATOM_POSITIONS = []
  
  THIS.symbol = ''
  THIS.stable = false
  
  
  // Add an atom to this molecule
  var add_atom = function(atom_symbol) {
    var atom_info = AtomDefinitions[atom_symbol]
    
    THIS.atoms.push(atom_symbol)
    THIS.mass += atom_info.mass
    
    // Sort the atoms by mass
    THIS.atoms.sort(function(a, b) {
      return AtomDefinitions[b].mass - AtomDefinitions[a].mass
    })
    
    // Update the molecule's symbol string (e.g. 'OHH' for H20)
    THIS.symbol = THIS.atoms.join('')
    
    // Update the atom positions and molecule radius
    if(THIS.atoms.length == 1) {
      ATOM_POSITIONS = [[0, 0]]
      THIS.radius = atom_info.radius
      THIS.stable = false
      
    } else {
      var geometry = MoleculeFragments[THIS.symbol]
      
      // Put the atoms in the proper position for drawing
      ATOM_POSITIONS = geometry.positions.slice(0)
      ATOM_POSITIONS.splice(Math.floor(ATOM_POSITIONS.length / 2), 0, ATOM_POSITIONS.shift())
      THIS.atoms.splice(Math.floor(THIS.atoms.length / 2), 0, THIS.atoms.shift())
      
      THIS.radius = geometry.radius
      THIS.stable = geometry.stable
    }
  }
  
  
  // Add / fuse another molecule to this molecule
  THIS.add_molecule = function(molecule) {    
    for(var i = 0; i < molecule.atoms.length; i++) {
      add_atom(molecule.atoms[i])
    }
  }
  
  
  // Draw the molecule to the given canvas context
  THIS.draw = function(context) {
    var atom_position, atom_info, radius, x, y
    
    context.strokeStyle = 'rgb(0, 0, 0)'
    context.lineWidth = 2
    
    for(var i = 0; i < THIS.atoms.length; i++) {
      atom_info = AtomDefinitions[THIS.atoms[i]]
      atom_position = ATOM_POSITIONS[i]
      
      radius = atom_info.radius
      var angle = THIS.angle + atom_position[0]
      
      x = THIS.x + atom_position[1] * Math.cos(angle)
      y = THIS.y + atom_position[1] * Math.sin(angle)
      
      context.save()
      
      // Draw the ball
      context.fillStyle = atom_info.color
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2, false)
      context.stroke()
      context.fill()
      
      // Set the clipping region for the highlight
      context.beginPath()
      context.arc(x, y, radius*0.94, 0, Math.PI * 2, false)
      context.clip()
      
      // Draw the highlight
      context.fillStyle = 'rgba(255, 255, 255, 0.5)'
      context.fillRect(x - radius, y - radius, 2*radius, 2*radius)
      
      // Draw the fill color again
      context.fillStyle = atom_info.color
      context.beginPath()
      context.arc(x - 0.25*radius, y + 0.5*radius, radius, 0, Math.PI * 2, false)
      context.fill()
      
      context.restore()
    }
  }
    
  
  /* Initialization */
  
  // Add any initial atoms to the molecule
  if(params.symbol) {
    params.atoms = params.atoms || []
    params.atoms = params.atoms.concat(params.symbol.split(''))
  }
  
  if(params.atoms) {
    for(var i = 0; i < params.atoms.length; i++) {
      add_atom(params.atoms[i])
    }
  }
  
  
  return THIS
}