// The library of Samples
// The sample images live in images/samples/[MICROSCOPE_NAME]/[SAMPLE_NAME]/[IMAGE_NAME].jpg
var SampleLibrary = {
  optical: [
     {name: '1', caption: "Daddy Longlegs Eyes\nMax Planck Institute for Neurobiology", info: "Specimen: Daddy longlegs eyes\nDr. Igor Siwanowicz\nMax Planck Institute for Neurobiology\nMunich, Germany\nTechnique: Confocal\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '2', caption: "Rat Brain\nUniversity of California, San Diego", info: "Specimen: Rat Hippocampus\nMr. Thomas Deerinck\nUniversity of California, San Diego\nSan Diego, California, USA\nTechnique: Multiphoton\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '3', caption: "Solitary coral\nCoral Culture & Collaborative Research Facility, Fort Johnson Marine Lab", info: "Specimen: Solitary coral, Fungia sp\nMr. James Nicholson\nCoral Culture & Collaborative Research Facility, Fort Johnson Marine Lab\nCharleston, South Carolina, USA\nTechnique: Reflected illumination/epifluorescence without barrier filter\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '4', caption: "Licmophora juergensii on red alga\nMr. Wolfgang Bettighofer", info: "Specimen: Licmophora juergensii on red alga\nMr. Wolfgang Bettighofer\nKiel, Germany\nTechnique: Differential interference contrast\n\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '5', caption: "Flower primordium of Tribulus sp\nUniversity of Tabriz", info: "Dr. M.R. Dadpour\nDepartment of Horticultural Sciences,\nUniversity of Tabriz\nTabriz, Iran\nSpecimen: Flower primordium of Tribulus sp\nTechnique: Epi-Illumination, 100 z-stacked images\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '6', caption: "Spirogyra\nUniversity of Wroclaw", info: "Dr. Jerzy Gubernator\nFaculty of Biotechnology,\nUniversity of Wroclaw\nWroclaw, Poland\nSpecimen: Spirogyra\nTechnique: Brightfield\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '7', caption: "Eye of a common blue damselfly\nMax Planck Institute for Neurobiology", info: "Specimen: Eye of a common blue damselfly (Enallagma cyathigerum)\nDr. Igor Siwanowicz\nMax Planck Institute for Neurobiology\nMunich, Germany\nTechnique: Confocal, series projection\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '8', caption: "Leg of a beetle\nChristian Albrecht University of Kiel, Institute of Zoology", info: "Specimen: Adhesive pad of the first leg of a beetle (Clytus sp.)\nDr. Jan Michels\nChristian Albrecht University of Kiel,\nInstitute of Zoology\nKiel, Germany\nTechnique: Autofluorescence\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '10', caption: "Weevil\nMr. Laurie Knight", info: "Specimen: Weevil (poss. Curculio nucum or Curculio glandium)\nMr. Laurie Knight\nTonbridge, Kent, United Kingdom\nTechnique: Episcopic illumination\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '11', caption: "Green algae\nMr. Wolfgang Bettighofer", info: "Specimen: Unicellular desmid Closterium costatum after its first binary fission\nMr. Wolfgang Bettighofer\nKiel, Germany\nTechnique: Differential interference contrast\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '17', caption: "Flower\nDepartment of Horticultural Sciences, University of Tabriz", info: "Dr. M.R. Dadpour\nSpecimen: Flower primordium of Spartium sp\nDepartment of Horticultural Sciences,\nUniversity of Tabriz\nTabriz, Iran\nTechnique: Epi-illumination\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '18', caption: "Mouse retina\nUniversity of California, San Diego", info: "Specimen: Mouse retina\nMr. Thomas Deerinck\nUniversity of California, San Diego\nSan Diego, California, USA\nTechnique: Confocal\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '20', caption: "Mushroom\nMr. Neil Egan", info: "Specimen: Common tree mushroom\nMr. Neil Egan\nCleveland, Ohio, USA\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '21', caption: "Hypostome of deer tick\nUniversity of Minnesota", info: "Specimen: Hypostome of deer tick\nDr. Marna Ericson\nDepartment of Dermatology,\nUniversity of Minnesota\nMinneapolis, Minnesota, USA\nTechnique: Confocal\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '23', caption: "Plant embryo\nDepartment of Plant Sciences, University of Cambridge", info: "Specimen: Arabidopsis thaliana plant embryo\nMr. Fernán Federici\nDepartment of Plant Sciences,\nUniversity of Cambridge\nCambridge, United Kingdom\nTechnique: Confocal with stereoscopic z-stack projection\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '24', caption: "Diatom\nMr. Frank Fox", info: "Specimen: Diatom from oamaru fossil\nMr. Frank Fox\nTrier, Rheinland-Pflaz, Germany\nTechnique: Darkfield\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '25', caption: "Fish scale\nMr. Ralph Grimm", info: "Mr. Ralph Grimm\nJimboomba, Queensland, Australia\nSpecimen: Ctenoid scale of a sole\nTechnique: Differential interference contrast\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
    ,{name: '26', caption: "Green Algae\nDr. Antonio Guillén", info: "Dr. Antonio Guillén\nLogroño, La Rioja, Spain\nSpecimen: Desmid Micrasterias, starting to divide\nTechnique: Darkfield and polarized light\n\n2010 Olympus BioScapes\nDigital Imaging Competition®"}
	],
	
	electron: [
     {name: '01pollen', caption: 'Pollen from hibiscus flower\nDartmouth College', info: 'Specimen: Pollen from hibiscus flower\nLouisa Howard\nDartmouth College'}
    ,{name: '02pollen', caption: 'Pollen from hibiscus flower\nDartmouth College', info: 'Specimen: Pollen from hibiscus flower\nLouisa Howard\nDartmouth College'}
    ,{name: '2spores', caption: 'Budding mushroom spores\nDartmouth College', info: 'Specimen: Budding mushroom spores\nLouisa Howard\nDartmouth College'}
    ,{name: '03liliaceaepollen', caption: 'Pollen grains from oriental lily\nDartmouth College', info: 'Specimen: Pollen grains from oriental lily\nLouisa Howard\nDartmouth College'}
    ,{name: '3spores', caption: 'Budding mushroom spores\nDartmouth College', info: 'Specimen: Budding mushroom spores\nLouisa Howard\nDartmouth College'}
    ,{name: '04convolvulaceaepollen', caption: 'Pollen from heavenly blue morning glory\nDartmouth College', info: 'Specimen: Pollen from heavenly blue morning glory\nLouisa Howard\nDartmouth College'}
    ,{name: '06euphorbiaceaepollen', caption: 'Pollen from castor bean plant\nDartmouth College', info: 'Specimen: Pollen from castor bean plant\nLouisa Howard\nDartmouth College'}
    ,{name: '6lungsem', caption: 'Lung tissue from a mammal\nDartmouth College', info: 'Specimen: Lung tissue from a mammal\nLouisa Howard\nDartmouth College'}
    ,{name: '7lungsem', caption: 'Lung tissue from a mammal\nDartmouth College', info: 'Specimen: Lung tissue from a mammal. There are red blood cells on the surface.\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_lower_1', caption: 'Black walnut tree lower leaf surface\nDartmouth College', info: 'Specimen: Black walnut tree lower leaf surface.\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_lower_2', caption: 'Black walnut tree lower leaf surface\nDartmouth College', info: 'Specimen: Black walnut tree lower leaf surface.\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_lower_3', caption: 'Black walnut tree lower leaf surface\nDartmouth College', info: 'Specimen: Black walnut tree lower leaf surface.\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_x-sect_2', caption: 'Cross section of a black walnut leaf\nDartmouth College', info: 'Specimen: Cross section of a black walnut leaf\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_x-sect_3', caption: 'Cross section of a black walnut leaf\nDartmouth College', info: 'Specimen: Cross section of a black walnut leaf\nLouisa Howard\nDartmouth College'}
    ,{name: 'black_walnut_leaf_x-section', caption: 'Cross section of a black walnut leaf\nDartmouth College', info: 'Specimen: Cross section of a black walnut leaf\nLouisa Howard\nDartmouth College'}
    ,{name: 'chlamydomonas2-4', caption: 'Chlamydomanas\nDartmouth College', info: 'Specimen: Green algae\nLouisa Howard\nDartmouth College'}
    ,{name: 'chlamydomonas6-1', caption: 'Chlamydomanas\nDartmouth College', info: 'Specimen: Green algae\nLouisa Howard\nDartmouth College'}
    ,{name: 'cholera3', caption: 'Cholera bacteria\nDartmouth College', info: 'Specimen: Cholera bacteria which infect the digestive system\nLouisa Howard\nDartmouth College'}
    ,{name: 'coleus_leaf_lower_3', caption: 'Lower surface of coleus leaf\nDartmouth College', info: 'Specimen: Lower surface of coleus leaf\nLouisa Howard\nDartmouth College'}
    ,{name: 'coleus_stem_', caption: 'Cross section of Coleus stem\nDartmouth College', info: 'Specimen: Cross section of Coleus stem\nLouisa Howard\nDartmouth College'}
    ,{name: 'Discoaster_surculus_01', caption: 'Microfossils of algae from a sediment core of the Deep Sea Drilling Project\nAlfred Wegener Institute', info: 'Specimen: Microfossils of algae from a sediment core of the Deep Sea Drilling Project\nHannes Grobe\nAlfred Wegener Institute'}
    ,{name: 'Drosophilidae_compound_eye_edit1', caption: 'Fruit fly eye\nDartmouth College', info: 'Specimen: Fruit fly eye\nLouisa Howard\nDartmouth College'}
    ,{name: 'Head_of_Orthoptera_SEM', caption: 'Short-horned grasshopper\nDartmouth College', info: 'Specimen: Short-horned grasshopper (side view of head)\nLouisa Howard\nDartmouth College'}
    ,{name: 'Head_of_Pentatomidae_SEM', caption: 'Stink bug\nDartmouth College', info: 'Specimen: Stink bug\nLouisa Howard\nDartmouth College'}
    ,{name: 'lungtrachea1a', caption: 'Lung tissue from a mammal\nDartmouth College', info: 'Specimen: Lung tissue from a mammal\nLouisa Howard\nDartmouth College'}
    ,{name: 'oryza_stem_1', caption: 'Rice stem showing vascular bundles arranged in two rings and central pore\nDartmouth College', info: 'Specimen: Rice stem showing vascular bundles arranged in two rings and central pore\nLouisa Howard\nDartmouth College'}
    ,{name: 'penta_anther2', caption: 'Pollen from star flower\nDartmouth College', info: 'Specimen: Pollen from star flower\nLouisa Howard\nDartmouth College'}
    ,{name: 'penta_anther4', caption: 'Pollen from star flower\nDartmouth College', info: 'Specimen: Pollen from star flower\nLouisa Howard\nDartmouth College'}
    ,{name: 'penta_stigma1', caption: 'Star flower stigma\nDartmouth College', info: 'Specimen: Star flower stigma\nLouisa Howard\nDartmouth College'}
    ,{name: 'SEM_blood_cells', caption: 'Human blood cells\nNational Cancer Institute', info: 'Specimen: Human blood cells\nBruce Wetzel and Harry Schaefer\nNational Cancer Institute'}
    ,{name: 'SEM_image_of_a_Peacock_wing,_slant_view_2', caption: 'Peacock feather\nWikipedia', info: 'Specimen: Peacock feather\nWikipedia\nCreative Commons License'}
    ,{name: 'SEM_image_of_a_Peacock_wing,_slant_view_4', caption: 'Peacock feather\nCreative Commons License', info: 'Specimen: Peacock feather\nWikipedia\nCreative Commons License'}
    ,{name: 'Snow_crystals_2', caption: 'Snow flakes\nAgricultural Research Service, U. S. Department of Agriculture', info: 'Specimen: Snow flakes\nElectron and Confocal Microscopy Laboratory\nAgricultural Research Service\nU. S. Department of Agriculture'}
    ,{name: 'Snowflake_300um_LTSEM_Edited', caption: 'Snow crystal with broad branches\nAgricultural Research Service, U. S. Department of Agriculture', info: 'Specimen: Snow crystal with broad branches\nElectron and Confocal Microscopy Laboratory\nAgricultural Research Service\nU. S. Department of Agriculture'}
    ,{name: 'sunflower_leaf_1_001', caption: 'Sunflower lower leaf surface\nDartmouth College', info: 'Specimen: Sunflower lower leaf surface.\nLouisa Howard\nDartmouth College'}
    ,{name: 'tomato_leaf_x-section__1', caption: 'Tomato leaf cross section\nDartmouth College', info: 'Specimen: Tomato leaf cross section\nLouisa Howard\nDartmouth College'}
    ,{name: 'tomato_leaf_x-section__2', caption: 'Tomato leaf cross section\nDartmouth College', info: 'Specimen: Tomato leaf cross section\nLouisa Howard\nDartmouth College'}
    ,{name: 'volcanic_ash-1', caption: 'Volcanic ash from Mount St. Helen\nDartmouth College', info: 'Specimen: Volcanic ash from Mount St. Helen\nDartmouth College'}
    ,{name: 'walnut_leaf__23_001', caption: 'Cross section of a black walnut leaf\nDartmouth College', info: 'Specimen: Cross section of a black walnut leaf\nLouisa Howard\nDartmouth College'}
	],

	atomic_force: [
     {name: 'AFM2', caption: 'Polymer Fibers\nRensselaer Nanotechnology Center', info: 'Specimen: Polymer Fibers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM3', caption: 'Polymer Flakes\nRensselaer Nanotechnology Center', info: 'Specimen: Polymer Flakes\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM4', caption: 'Semi-crystalline Polymers\nRensselaer Nanotechnology Center', info: 'Specimen: Semi-crystalline Polymers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM6', caption: 'Polymers\nRensselaer Nanotechnology Center', info: 'Specimen: Polymers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM7', caption: 'Semi-crystalline Polymers\nRensselaer Nanotechnology Center', info: 'Specimen: Semi-crystalline Polymers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM8', caption: 'Semi-crystalline Polymers\nRensselaer Nanotechnology Center', info: 'Specimen: Semi-crystalline Polymers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM9', caption: 'Metal Surface\nRensselaer Nanotechnology Center', info: 'Specimen: Metal Surface\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM10', caption: 'Magnetic Strip of a Zip Dirve\nRensselaer Nanotechnology Center', info: 'Specimen: Magnetic Strip of a Zip Dirve\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM11', caption: 'Graphene Flake on a substrate\nRensselaer Nanotechnology Center', info: 'Specimen: Graphene Flake on a substrate\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM12', caption: 'Polymers\nRensselaer Nanotechnology Center', info: 'Specimen: Polymers\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM14', caption: 'Polymer Etched Groove on semi-conductor\nRensselaer Nanotechnology Center', info: 'Specimen: Polymer Etched Groove on semi-conductor\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'AFM17', caption: 'Polymer Flake\nRensselaer Nanotechnology Center', info: 'Specimen: Polymer Flake\nProximal Probe Lab\nRensselaer Nanotechnology Center'}
    ,{name: 'block_copolymer_1', caption: 'Block Copolymer\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: Block Copolymer\nM. Trawick\nUniversity of Richmond\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'block_copolymer_2', caption: 'Block Copolymer\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: block copolymer\nIoan Botiz and Seth Darling \nCenter for Nanoscale Materials\nArgonne National Laboratory\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'Display1X081909Sonicate0m0009', caption: 'Thread-like Protein aggregates (Amyloid Fibrils)\nRensselaer Polytechnic Institute', info: 'Thread-like Protein aggregates (Amyloid Fibrils)\nKinsley French\nCenter for Biotechnology and Interdisciplinary Studies\nRensselaer Polytechnic Institute'}
    ,{name: 'Display5X081909Sonicate0m0006', caption: 'Thread-like Protein aggregates (Amyloid Fibrils)\nRensselaer Polytechnic Institute', info: 'Thread-like Protein aggregates (Amyloid Fibrils)\nKinsley French\nCenter for Biotechnology and Interdisciplinary Studies\nRensselaer Polytechnic Institute'}
    ,{name: 'etched_silicon', caption: 'Etched Silicon\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: Etched Silicon\nO. Gang\nBrookhaven National Laboratory\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'gypsum', caption: 'Gypsum\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: Gypsum\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'Hex_32-1_land_sea1_blue', caption: 'Thread-like Protein aggregates (Amyloid Fibrils)\nRensselaer Polytechnic Institute', info: 'Thread-like Protein aggregates (Amyloid Fibrils)\nJavier Aguilera\nCenter for Biotechnology and Interdisciplinary Studies\nRensselaer Polytechnic Institute'}
    ,{name: 'Hex_H_24-28', caption: 'Bead-like particles of Heparin, a sugar molecule that thins the blood\nRensselaer Polytechnic Institute', info: 'Bead-like particles of Heparin, a sugar molecule that thins the blood\nJavier Aguilera\nCenter for Biotechnology and Interdisciplinary Studies\nRensselaer Polytechnic Institute'}
    ,{name: 'Hex_HS_48hr-1', caption: 'Thread-like Protein aggregates (Amyloid Fibrils)\nRensselaer Polytechnic Institute', info: 'Thread-like Protein aggregates (Amyloid Fibrils)\nJavier Aguilera\nCenter for Biotechnology and Interdisciplinary Studies\nRensselaer Polytechnic Institute'}
    ,{name: 'pfm', caption: 'Bismuth Ferrite (BiFeO3)\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: Bismuth Ferrite (BiFeO3)\nLane Martin\nUniversity of Illinois at Urbana-Champaign\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'polymer_x', caption: 'Polymer\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen:  Polymer\nU. Maitra\nIndian Institute of Science\nBangalore India\nImage courtesy AFM manufacturer Asylum Research'}
    ,{name: 'quartz_nanotubes', caption: 'Carbon Nanotubes on Quartz\nImage courtesy AFM manufacturer Asylum Research', info: 'Specimen: Carbon Nanotubes on Quartz\nSimon Dunham\nJohn Rogers research group\nUniversity of Illinois at Urbana-Champaign\nImage courtesy AFM manufacturer Asylum Research'}
	]
	
}
