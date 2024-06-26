var PERIODIC_TABLE = {
  'H':  {name: 'Hydrogen',      pos:[0, 0],     levels: [1],                        atomic_number: 1,   mass: 1.01, radius: 0.397, color: '#E0CFEA',  period: 1,  category: 'hydrogen'},
  'He': {name: 'Helium',        pos:[17, 0],    levels: [2],                        atomic_number: 2,   mass: 4.00, radius: 0.454, color: '#DE72D6',  period: 1,  category: 'noble_gases'},
  'Li': {name: 'Lithium',       pos:[0, 1],     levels: [2, 1],                     atomic_number: 3,   mass: 6.94, radius: 0.51,  color: '#A7CFEF',  period: 2,  category: 'alkali_metals'},
  'Be': {name: 'Beryllium',     pos:[1, 1],     levels: [2, 2],                     atomic_number: 4,   mass: 9.01, radius: 0.567, color: '#CA9A6D',  period: 2,  category: 'alkali_earth_metals'},
  'B':  {name: 'Boron',         pos:[12, 1],    levels: [2, 3],                     atomic_number: 5,   mass: 10.8, radius: 0.624, color: '#9F6233',  period: 2,  category: 'metalloids'},
  'C':  {name: 'Carbon',        pos:[13, 1],    levels: [2, 4],                     atomic_number: 6,   mass: 12.0, radius: 0.681, color: '#374451',  period: 2,  category: 'nonmetals'},
  'N':  {name: 'Nitrogen',      pos:[14, 1],    levels: [2, 5],                     atomic_number: 7,   mass: 14.0, radius: 0.738, color: '#00A6DA',  period: 2,  category: 'nonmetals'},
  'O':  {name: 'Oxygen',        pos:[15, 1],    levels: [2, 6],                     atomic_number: 8,   mass: 16.0, radius: 0.794, color: '#FF3E3B',  period: 2,  category: 'nonmetals'},
  'F':  {name: 'Fluorine',      pos:[16, 1],    levels: [2, 7],                     atomic_number: 9,   mass: 19.0, radius: 0.77,  color: '#FFE9AC',  period: 2,  category: 'halogens'},
  'Ne': {name: 'Neon',          pos:[17, 1],    levels: [2, 8],                     atomic_number: 10,  mass: 20.2, radius: 0.873, color: '#FFA779',  period: 2,  category: 'noble_gases'},
  'Na': {name: 'Sodium',        pos:[0, 2],     levels: [2, 8, 1],                  atomic_number: 11,  mass: 23.0, radius: 1,     color: '#F0EE5F',  period: 3,  category: 'alkali_metals'},
  'Mg': {name: 'Magnesium',     pos:[1, 2],     levels: [2, 8, 2],                  atomic_number: 12,  mass: 24.3, radius: 1,     color: '#AEFFF0',  period: 3,  category: 'alkali_earth_metals'},
  'Al': {name: 'Aluminium',     pos:[12, 2],    levels: [2, 8, 3],                  atomic_number: 13,  mass: 27.0, radius: 1,     color: '#C2C2C2',  period: 3,  category: 'other_metals'},
  'Si': {name: 'Silicon',       pos:[13, 2],    levels: [2, 8, 4],                  atomic_number: 14,  mass: 28.1, radius: 1,     color: '#011788',  period: 3,  category: 'metalloids'},
  'P':  {name: 'Phosphorus',    pos:[14, 2],    levels: [2, 8, 5],                  atomic_number: 15,  mass: 31.0, radius: 1,     color: '#912B88',  period: 3,  category: 'nonmetals'},
  'S':  {name: 'Sulfur',        pos:[15, 2],    levels: [2, 8, 6],                  atomic_number: 16,  mass: 32.1, radius: 1,     color: '#FFB541',  period: 3,  category: 'nonmetals'},
  'Cl': {name: 'Chlorine',      pos:[16, 2],    levels: [2, 8, 7],                  atomic_number: 17,  mass: 35.5, radius: 1,     color: '#9AFEA3',  period: 3,  category: 'halogens'},
  'Ar': {name: 'Argon',         pos:[17, 2],    levels: [2, 8, 8],                  atomic_number: 18,  mass: 40.0, radius: 1,     color: '#31B25A',  period: 3,  category: 'noble_gases'},
  'K':  {name: 'Potassium',     pos:[0, 3],     levels: [2, 8, 8, 1],               atomic_number: 19,  mass: 39.1, radius: 1,     color: '#FF8633',  period: 4,  category: 'alkali_metals'},
  'Ca': {name: 'Calcium',       pos:[1, 3],     levels: [2, 8, 8, 2],               atomic_number: 20,  mass: 40.1, radius: 1,     color: '#021FCF',  period: 4,  category: 'alkali_earth_metals'},
  'Sc': {name: 'Scandium',      pos:[2, 3],     levels: [2, 8, 9, 2],               atomic_number: 21,  mass: 45.0, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Ti': {name: 'Titanium',      pos:[3, 3],     levels: [2, 8, 10, 2],              atomic_number: 22,  mass: 47.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'V':  {name: 'Vanadium',      pos:[4, 3],     levels: [2, 8, 11, 2],              atomic_number: 23,  mass: 50.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Cr': {name: 'Chromium',      pos:[5, 3],     levels: [2, 8, 13, 1],              atomic_number: 24,  mass: 52.0, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Mn': {name: 'Manganese',     pos:[6, 3],     levels: [2, 8, 13, 2],              atomic_number: 25,  mass: 54.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Fe': {name: 'Iron',          pos:[7, 3],     levels: [2, 8, 14, 2],              atomic_number: 26,  mass: 55.8, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Co': {name: 'Cobalt',        pos:[8, 3],     levels: [2, 8, 15, 2],              atomic_number: 27,  mass: 58.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Ni': {name: 'Nickel',        pos:[9, 3],     levels: [2, 8, 16, 2],              atomic_number: 28,  mass: 58.7, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Cu': {name: 'Copper',        pos:[10, 3],    levels: [2, 8, 18, 1],              atomic_number: 29,  mass: 63.5, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Zn': {name: 'Zinc',          pos:[11, 3],    levels: [2, 8, 18, 2],              atomic_number: 30,  mass: 65.4, radius: 1,     color: '#021FCF',  period: 4,  category: 'transition_metals_part_1'},
  'Ga': {name: 'Gallium',       pos:[12, 3],    levels: [2, 8, 18, 3],              atomic_number: 31,  mass: 69.7, radius: 1,     color: '#021FCF',  period: 4,  category: 'other_metals'},
  'Ge': {name: 'Germanium',     pos:[13, 3],    levels: [2, 8, 18, 4],              atomic_number: 32,  mass: 72.6, radius: 1,     color: '#021FCF',  period: 4,  category: 'metalloids'},
  'As': {name: 'Arsenic',       pos:[14, 3],    levels: [2, 8, 18, 5],              atomic_number: 33,  mass: 74.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'metalloids'},
  'Se': {name: 'Selenium',      pos:[15, 3],    levels: [2, 8, 18, 6],              atomic_number: 34,  mass: 79.0, radius: 1,     color: '#021FCF',  period: 4,  category: 'nonmetals'},
  'Br': {name: 'Bromine',       pos:[16, 3],    levels: [2, 8, 18, 7],              atomic_number: 35,  mass: 79.9, radius: 1,     color: '#021FCF',  period: 4,  category: 'halogens'},
  'Kr': {name: 'Krypton',       pos:[17, 3],    levels: [2, 8, 18, 8],              atomic_number: 36,  mass: 83.8, radius: 1,     color: '#021FCF',  period: 4,  category: 'noble_gases'},
  'Rb': {name: 'Rubidium',      pos:[0, 4],     levels: [2, 8, 18, 8, 1],           atomic_number: 37,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'alkali_metals'},
  'Sr': {name: 'Strontium',     pos:[1, 4],     levels: [2, 8, 18, 8, 2],           atomic_number: 38,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'alkali_earth_metals'},
  'Y':  {name: 'Yttrium',       pos:[2, 4],     levels: [2, 8, 18, 9, 2],           atomic_number: 39,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Zr': {name: 'Zirconium',     pos:[3, 4],     levels: [2, 8, 18, 10, 2],          atomic_number: 40,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Nb': {name: 'Niobium',       pos:[4, 4],     levels: [2, 8, 18, 12, 1],          atomic_number: 41,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Mo': {name: 'Molybdenum',    pos:[5, 4],     levels: [2, 8, 18, 13, 1],          atomic_number: 42,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Tc': {name: 'Technetium',    pos:[6, 4],     levels: [2, 8, 18, 13, 2],          atomic_number: 43,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Ru': {name: 'Ruthenium',     pos:[7, 4],     levels: [2, 8, 18, 15, 1],          atomic_number: 44,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Rh': {name: 'Rhodium',       pos:[8, 4],     levels: [2, 8, 18, 16, 1],          atomic_number: 45,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Pd': {name: 'Palladium',     pos:[9, 4],     levels: [2, 8, 18, 18],             atomic_number: 46,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Ag': {name: 'Silver',        pos:[10, 4],    levels: [2, 8, 18, 18, 1],          atomic_number: 47,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'Cd': {name: 'Cadmium',       pos:[11, 4],    levels: [2, 8, 18, 18, 2],          atomic_number: 48,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'transition_metals_part_1'},
  'In': {name: 'Indium',        pos:[12, 4],    levels: [2, 8, 18, 18, 3],          atomic_number: 49,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'other_metals'},
  'Sn': {name: 'Tin',           pos:[13, 4],    levels: [2, 8, 18, 18, 4],          atomic_number: 50,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'other_metals'},
  'Sb': {name: 'Antimony',      pos:[14, 4],    levels: [2, 8, 18, 18, 5],          atomic_number: 51,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'metalloids'},
  'Te': {name: 'Tellurium',     pos:[15, 4],    levels: [2, 8, 18, 18, 6],          atomic_number: 52,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'metalloids'},
  'I':  {name: 'Iodine',        pos:[16, 4],    levels: [2, 8, 18, 18, 7],          atomic_number: 53,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'halogens'},
  'Xe': {name: 'Xenon',         pos:[17, 4],    levels: [2, 8, 18, 18, 8],          atomic_number: 54,  mass: 0,    radius: 1,     color: '#021FCF',  period: 5,  category: 'noble_gases'},
  'Cs': {name: 'Caesium',       pos:[0, 5],     levels: [2, 8, 18, 18, 8, 1],       atomic_number: 55,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'alkali_metals'},
  'Ba': {name: 'Barium',        pos:[1, 5],     levels: [2, 8, 18, 18, 8, 2],       atomic_number: 56,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'alkali_earth_metals'},
  'La': {name: 'Lanthanum',     pos:[2, 7],     levels: [2, 8, 18, 18, 9, 2],       atomic_number: 57,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Ce': {name: 'Cerium',        pos:[3, 7],     levels: [2, 8, 18, 19, 9, 2],       atomic_number: 58,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Pr': {name: 'Praseodymium',  pos:[4, 7],     levels: [2, 8, 18, 21, 8, 2],       atomic_number: 59,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Nd': {name: 'Neodymium',     pos:[5, 7],     levels: [2, 8, 18, 22, 8, 2],       atomic_number: 60,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Pm': {name: 'Promethium',    pos:[6, 7],     levels: [2, 8, 18, 23, 8, 2],       atomic_number: 61,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Sm': {name: 'Samarium',      pos:[7, 7],     levels: [2, 8, 18, 24, 8, 2],       atomic_number: 62,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Eu': {name: 'Europium',      pos:[8, 7],     levels: [2, 8, 18, 25, 8, 2],       atomic_number: 63,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Gd': {name: 'Gadolinium',    pos:[9, 7],     levels: [2, 8, 18, 25, 9, 2],       atomic_number: 64,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Tb': {name: 'Terbium',       pos:[10, 7],    levels: [2, 8, 18, 27, 8, 2],       atomic_number: 65,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Dy': {name: 'Dysprosium',    pos:[11, 7],    levels: [2, 8, 18, 28, 8, 2],       atomic_number: 66,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Ho': {name: 'Holmium',       pos:[12, 7],    levels: [2, 8, 18, 29, 8, 2],       atomic_number: 67,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Er': {name: 'Erbium',        pos:[13, 7],    levels: [2, 8, 18, 30, 8, 2],       atomic_number: 68,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Tm': {name: 'Thulium',       pos:[14, 7],    levels: [2, 8, 18, 31, 8, 2],       atomic_number: 69,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Yb': {name: 'Ytterbium',     pos:[15, 7],    levels: [2, 8, 18, 32, 8, 2],       atomic_number: 70,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Lu': {name: 'Lutetium',      pos:[2, 5],     levels: [2, 8, 18, 32, 9, 2],       atomic_number: 71,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'lanthanides'},
  'Hf': {name: 'Hafnium',       pos:[3, 5],     levels: [2, 8, 18, 32, 10, 2],      atomic_number: 72,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Ya': {name: 'Tantalum',      pos:[4, 5],     levels: [2, 8, 18, 32, 11, 2],      atomic_number: 73,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'W':  {name: 'Tungsten',      pos:[5, 5],     levels: [2, 8, 18, 32, 12, 2],      atomic_number: 74,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Re': {name: 'Rhenium',       pos:[6, 5],     levels: [2, 8, 18, 32, 13, 2],      atomic_number: 75,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Os': {name: 'Osmium',        pos:[7, 5],     levels: [2, 8, 18, 32, 14, 2],      atomic_number: 76,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Ir': {name: 'Iridium',       pos:[8, 5],     levels: [2, 8, 18, 32, 15, 2],      atomic_number: 77,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Pt': {name: 'Platinum',      pos:[9, 5],     levels: [2, 8, 18, 32, 17, 1],      atomic_number: 78,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Au': {name: 'Gold',          pos:[10, 5],    levels: [2, 8, 18, 32, 18, 1],      atomic_number: 79,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Hg': {name: 'Mercury',       pos:[11, 5],    levels: [2, 8, 18, 32, 18, 2],      atomic_number: 80,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'transition_metals_part_2'},
  'Tl': {name: 'Thallium',      pos:[12, 5],    levels: [2, 8, 18, 32, 18, 3],      atomic_number: 81,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'other_metals'},
  'Pb': {name: 'Lead',          pos:[13, 5],    levels: [2, 8, 18, 32, 18, 4],      atomic_number: 82,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'other_metals'},
  'Bi': {name: 'Bismuth',       pos:[14, 5],    levels: [2, 8, 18, 32, 18, 5],      atomic_number: 83,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'other_metals'},
  'Po': {name: 'Polonium',      pos:[15, 5],    levels: [2, 8, 18, 32, 18, 6],      atomic_number: 84,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'metalloids'},
  'At': {name: 'Astatine',      pos:[16, 5],    levels: [2, 8, 18, 32, 18, 7],      atomic_number: 85,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'halogens'},
  'Rn': {name: 'Radon',         pos:[17, 5],    levels: [2, 8, 18, 32, 18, 8],      atomic_number: 86,  mass: 0,    radius: 1,     color: '#021FCF',  period: 6,  category: 'noble_gases'},
  'Fr': {name: 'Francium',      pos:[0, 6],     levels: [2, 8, 18, 32, 18, 8, 1],   atomic_number: 87,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'alkali_metals'},
  'Ra': {name: 'Radium',        pos:[1, 6],     levels: [2, 8, 18, 32, 18, 8, 2],   atomic_number: 88,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'alkali_earth_metals'},
  'Ac': {name: 'Actinium',      pos:[2, 8],     levels: [2, 8, 18, 32, 18, 9, 2],   atomic_number: 89,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Th': {name: 'Thorium',       pos:[3, 8],     levels: [2, 8, 18, 32, 18, 10, 2],  atomic_number: 90,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Pa': {name: 'Protactinium',  pos:[4, 8],     levels: [2, 8, 18, 32, 20, 9, 2],   atomic_number: 91,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'U':  {name: 'Uranium',       pos:[5, 8],     levels: [2, 8, 18, 32, 21, 9, 2],   atomic_number: 92,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Np': {name: 'Neptunium',     pos:[6, 8],     levels: [2, 8, 18, 32, 22, 9, 2],   atomic_number: 93,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Pu': {name: 'Plutonium',     pos:[7, 8],     levels: [2, 8, 18, 32, 24, 8, 2],   atomic_number: 94,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Am': {name: 'Americium',     pos:[8, 8],     levels: [2, 8, 18, 32, 25, 8, 2],   atomic_number: 95,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Cm': {name: 'Curium',        pos:[9, 8],     levels: [2, 8, 18, 32, 25, 9, 2],   atomic_number: 96,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Bk': {name: 'Berkelium',     pos:[10,8],     levels: [2, 8, 18, 32, 27, 8, 2],   atomic_number: 97,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Cf': {name: 'Californium',   pos:[11,8],     levels: [2, 8, 18, 32, 28, 8, 2],   atomic_number: 98,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Es': {name: 'Einsteinium',   pos:[12, 8],    levels: [2, 8, 18, 32, 29, 8, 2],   atomic_number: 99,  mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Fm': {name: 'Fermium',       pos:[13, 8],    levels: [2, 8, 18, 32, 30, 8, 2],   atomic_number: 100, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Md': {name: 'Mendelevium',   pos:[14, 8],    levels: [2, 8, 18, 32, 31, 8, 2],   atomic_number: 101, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'No': {name: 'Nobelium',      pos:[15, 8],    levels: [2, 8, 18, 32, 32, 8, 2],   atomic_number: 102, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Lr': {name: 'Lawrencium',    pos:[2, 6],     levels: [2, 8, 18, 32, 32, 8, 3],   atomic_number: 103, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'actinides'},
  'Rf': {name: 'Rutherfordium', pos:[3, 6],     levels: [2, 8, 18, 32, 32, 10, 2],  atomic_number: 104, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Db': {name: 'Dubnium',       pos:[4, 6],     levels: [2, 8, 18, 32, 32, 11, 2],  atomic_number: 105, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Sg': {name: 'Seaborgium',    pos:[5, 6],     levels: [2, 8, 18, 32, 32, 12, 2],  atomic_number: 106, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Bh': {name: 'Bohrium',       pos:[6, 6],     levels: [2, 8, 18, 32, 32, 13, 2],  atomic_number: 107, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Hs': {name: 'Hassium',       pos:[7, 6],     levels: [2, 8, 18, 32, 32, 14, 2],  atomic_number: 108, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Mt': {name: 'Meitnerium',    pos:[8, 6],     levels: [2, 8, 18, 32, 32, 15, 2],  atomic_number: 109, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Ds': {name: 'Darmstadtium',  pos:[9, 6],     levels: [2, 8, 18, 32, 32, 17, 1],  atomic_number: 110, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Rg': {name: 'Roentgenium',   pos:[10, 6],    levels: [2, 8, 18, 32, 32, 18, 1],  atomic_number: 111, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Cn': {name: 'Copernicium',   pos:[11, 6],    levels: [2, 8, 18, 32, 32, 18, 2],  atomic_number: 112, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'transition_metals_part_2'},
  'Uut': {name: 'Ununtrium',    pos:[12, 6],    levels: [2, 8, 18, 32, 32, 18, 3],  atomic_number: 113, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'},
  'Uuq': {name: 'Ununquadium',  pos:[13, 6],    levels: [2, 8, 18, 32, 32, 18, 4],  atomic_number: 114, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'},
  'Uup': {name: 'Ununpentium',  pos:[14, 6],    levels: [2, 8, 18, 32, 32, 18, 5],  atomic_number: 115, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'},
  'Uuh': {name: 'Ununhexium',   pos:[15, 6],    levels: [2, 8, 18, 32, 32, 18, 6],  atomic_number: 116, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'},
  'Uus': {name: 'Ununseptium',  pos:[16, 6],    levels: [2, 8, 18, 32, 32, 18, 7],  atomic_number: 117, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'},
  'Uuo': {name: 'Ununoctium',   pos:[17, 6],    levels: [2, 8, 18, 32, 32, 18, 8],  atomic_number: 118, mass: 0,    radius: 1,     color: '#021FCF',  period: 7,  category: 'unknown_metals'}
}

PERIODIC_TABLE_SYMBOLS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ya", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Uut", "Uuq", "Uup", "Uuh", "Uus", "Uuo"]