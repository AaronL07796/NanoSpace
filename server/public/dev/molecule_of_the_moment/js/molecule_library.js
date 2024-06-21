var ML = {}

ML.bucky = "\
HEADER    MOLECULE\n\
COMPND    C60 (BUCKMINSTERFULLERENE)\n\
AUTHOR    A. W. MAVERICK\n\
ATOM      1  C   MOL     1      -1.168  -3.284  -0.100  1.00  0.00\n\
ATOM      2  C   MOL     1      -0.588  -3.148  -1.380  1.00  0.00\n\
ATOM      3  C   MOL     1       0.808  -3.164  -1.228  1.00  0.00\n\
ATOM      4  C   MOL     1       1.096  -3.308   0.140  1.00  0.00\n\
ATOM      5  C   MOL     1      -0.124  -3.384   0.836  1.00  0.00\n\
ATOM      6  C   MOL     1      -2.340  -2.576   0.216  1.00  0.00\n\
ATOM      7  C   MOL     1      -2.472  -1.968   1.480  1.00  0.00\n\
ATOM      8  C   MOL     1      -1.428  -2.064   2.420  1.00  0.00\n\
ATOM      9  C   MOL     1      -0.256  -2.776   2.096  1.00  0.00\n\
ATOM     10  C   MOL     1       0.836  -2.088   2.664  1.00  0.00\n\
ATOM     11  C   MOL     1       2.056  -2.012   1.972  1.00  0.00\n\
ATOM     12  C   MOL     1       2.184  -2.624   0.708  1.00  0.00\n\
ATOM     13  C   MOL     1       2.992  -1.792  -0.096  1.00  0.00\n\
ATOM     14  C   MOL     1       2.704  -1.648  -1.464  1.00  0.00\n\
ATOM     15  C   MOL     1       1.612  -2.332  -2.032  1.00  0.00\n\
ATOM     16  C   MOL     1       1.016  -1.488  -2.988  1.00  0.00\n\
ATOM     17  C   MOL     1      -0.380  -1.472  -3.140  1.00  0.00\n\
ATOM     18  C   MOL     1      -1.184  -2.304  -2.336  1.00  0.00\n\
ATOM     19  C   MOL     1      -2.360  -1.596  -2.012  1.00  0.00\n\
ATOM     20  C   MOL     1      -2.936  -1.732  -0.736  1.00  0.00\n\
ATOM     21  C   MOL     1       1.740  -0.276  -3.012  1.00  0.00\n\
ATOM     22  C   MOL     1       2.784  -0.376  -2.068  1.00  0.00\n\
ATOM     23  C   MOL     1       3.360  -0.668   0.668  1.00  0.00\n\
ATOM     24  C   MOL     1       2.780  -0.804   1.948  1.00  0.00\n\
ATOM     25  C   MOL     1       0.336  -0.956   3.340  1.00  0.00\n\
ATOM     26  C   MOL     1      -1.064  -0.940   3.188  1.00  0.00\n\
ATOM     27  C   MOL     1      -3.436  -0.596  -0.064  1.00  0.00\n\
ATOM     28  C   MOL     1      -3.148  -0.740   1.304  1.00  0.00\n\
ATOM     29  C   MOL     1      -2.280  -0.324  -2.620  1.00  0.00\n\
ATOM     30  C   MOL     1      -1.056  -0.248  -3.316  1.00  0.00\n\
ATOM     31  C   MOL     1       1.056   0.248   3.316  1.00  0.00\n\
ATOM     32  C   MOL     1       2.280   0.324   2.620  1.00  0.00\n\
ATOM     33  C   MOL     1       3.436   0.596   0.064  1.00  0.00\n\
ATOM     34  C   MOL     1       3.148   0.744  -1.304  1.00  0.00\n\
ATOM     35  C   MOL     1       1.064   0.940  -3.188  1.00  0.00\n\
ATOM     36  C   MOL     1      -0.336   0.956  -3.340  1.00  0.00\n\
ATOM     37  C   MOL     1      -3.360   0.668  -0.668  1.00  0.00\n\
ATOM     38  C   MOL     1      -2.780   0.804  -1.948  1.00  0.00\n\
ATOM     39  C   MOL     1      -2.784   0.376   2.068  1.00  0.00\n\
ATOM     40  C   MOL     1      -1.740   0.276   3.012  1.00  0.00\n\
ATOM     41  C   MOL     1       2.360   1.596   2.012  1.00  0.00\n\
ATOM     42  C   MOL     1       2.936   1.732   0.736  1.00  0.00\n\
ATOM     43  C   MOL     1       1.428   2.064  -2.420  1.00  0.00\n\
ATOM     44  C   MOL     1       2.472   1.968  -1.480  1.00  0.00\n\
ATOM     45  C   MOL     1      -0.836   2.088  -2.668  1.00  0.00\n\
ATOM     46  C   MOL     1      -2.056   2.012  -1.972  1.00  0.00\n\
ATOM     47  C   MOL     1      -2.992   1.792   0.092  1.00  0.00\n\
ATOM     48  C   MOL     1      -2.704   1.648   1.464  1.00  0.00\n\
ATOM     49  C   MOL     1      -1.016   1.488   2.988  1.00  0.00\n\
ATOM     50  C   MOL     1       0.380   1.472   3.140  1.00  0.00\n\
ATOM     51  C   MOL     1      -1.612   2.332   2.032  1.00  0.00\n\
ATOM     52  C   MOL     1       1.184   2.304   2.336  1.00  0.00\n\
ATOM     53  C   MOL     1       2.340   2.576  -0.216  1.00  0.00\n\
ATOM     54  C   MOL     1       0.256   2.776  -2.096  1.00  0.00\n\
ATOM     55  C   MOL     1      -2.188   2.624  -0.708  1.00  0.00\n\
ATOM     56  C   MOL     1      -0.808   3.164   1.228  1.00  0.00\n\
ATOM     57  C   MOL     1       0.588   3.148   1.380  1.00  0.00\n\
ATOM     58  C   MOL     1       1.168   3.284   0.100  1.00  0.00\n\
ATOM     59  C   MOL     1       0.124   3.384  -0.836  1.00  0.00\n\
ATOM     60  C   MOL     1      -1.096   3.308  -0.140  1.00  0.00\n\
TER      61      MOL     1 \n\
END   \n\
"

ML.diamond = "\
HEADER    MOLECULE\n\
COMPND    DIAMOND\n\
AUTHOR    A. W. MAVERICK\n\
ATOM      1  C   MOL     1      -1.776  -1.780  -1.780  1.00  0.00\n\
ATOM      2  C   MOL     1      -1.776  -1.780   1.776  1.00  0.00\n\
ATOM      3  C   MOL     1      -1.776  -0.004  -0.004  1.00  0.00\n\
ATOM      4  C   MOL     1      -1.776   1.776  -1.780  1.00  0.00\n\
ATOM      5  C   MOL     1      -1.776   1.776   1.776  1.00  0.00\n\
ATOM      6  C   MOL     1       0.000  -1.780  -0.004  1.00  0.00\n\
ATOM      7  C   MOL     1       0.000  -0.004  -1.780  1.00  0.00\n\
ATOM      8  C   MOL     1       0.000  -0.004   1.776  1.00  0.00\n\
ATOM      9  C   MOL     1       0.000   1.776  -0.004  1.00  0.00\n\
ATOM     10  C   MOL     1       1.780  -1.780  -1.780  1.00  0.00\n\
ATOM     11  C   MOL     1       1.780  -1.780   1.776  1.00  0.00\n\
ATOM     12  C   MOL     1       1.780  -0.004  -0.004  1.00  0.00\n\
ATOM     13  C   MOL     1       1.780   1.776  -1.780  1.00  0.00\n\
ATOM     14  C   MOL     1       1.780   1.776   1.776  1.00  0.00\n\
ATOM     15  C   MOL     1      -0.888  -0.892  -0.892  1.00  0.00\n\
ATOM     16  C   MOL     1      -0.888   0.888   0.888  1.00  0.00\n\
ATOM     17  C   MOL     1       0.892  -0.892   0.888  1.00  0.00\n\
ATOM     18  C   MOL     1       0.892   0.888  -0.892  1.00  0.00\n\
TER      19      MOL     1 \n\
END   \n\
"


ML.PbTiO3 = "\
HEADER    MOLECULE\n\
COMPND    LEAD TITANATE (A PEROVSKITE)\n\
AUTHOR    A. W. MAVERICK\n\
ATOM      1  O     UNK   1      -1.952  -6.225   1.952  1.00  0.00\n\
ATOM      2  O     UNK   1      -1.952  -6.225  -1.952  1.00  0.00\n\
ATOM      3  O     UNK   1       1.952  -6.225   1.952  1.00  0.00\n\
ATOM      4  O     UNK   1       1.952  -6.225  -1.952  1.00  0.00\n\
ATOM      5  O     UNK   1      -3.904  -4.673   1.952  1.00  0.00\n\
ATOM      6  O     UNK   1      -3.904  -4.673  -1.952  1.00  0.00\n\
ATOM      7  O     UNK   1      -1.952  -4.673   3.904  1.00  0.00\n\
ATOM      8  O     UNK   1      -1.952  -4.673   0.000  1.00  0.00\n\
ATOM      9  O     UNK   1      -1.952  -4.673  -3.904  1.00  0.00\n\
ATOM     10  O     UNK   1       0.000  -4.673   1.952  1.00  0.00\n\
ATOM     11  O     UNK   1       0.000  -4.673  -1.952  1.00  0.00\n\
ATOM     12  O     UNK   1       1.952  -4.673   3.904  1.00  0.00\n\
ATOM     13  O     UNK   1       1.952  -4.673   0.000  1.00  0.00\n\
ATOM     14  O     UNK   1       1.952  -4.673  -3.904  1.00  0.00\n\
ATOM     15  O     UNK   1       3.904  -4.673   1.952  1.00  0.00\n\
ATOM     16  O     UNK   1       3.904  -4.673  -1.952  1.00  0.00\n\
ATOM     17  O     UNK   1      -1.952  -2.075   1.952  1.00  0.00\n\
ATOM     18  O     UNK   1      -1.952  -2.075  -1.952  1.00  0.00\n\
ATOM     19  O     UNK   1       1.952  -2.075   1.952  1.00  0.00\n\
ATOM     20  O     UNK   1       1.952  -2.075  -1.952  1.00  0.00\n\
ATOM     21  O     UNK   1      -3.904  -0.523   1.952  1.00  0.00\n\
ATOM     22  O     UNK   1      -3.904  -0.523  -1.952  1.00  0.00\n\
ATOM     23  O     UNK   1      -1.952  -0.523   3.904  1.00  0.00\n\
ATOM     24  O     UNK   1      -1.952  -0.523   0.000  1.00  0.00\n\
ATOM     25  O     UNK   1      -1.952  -0.523  -3.904  1.00  0.00\n\
ATOM     26  O     UNK   1       0.000  -0.523   1.952  1.00  0.00\n\
ATOM     27  O     UNK   1       0.000  -0.523  -1.952  1.00  0.00\n\
ATOM     28  O     UNK   1       1.952  -0.523   3.904  1.00  0.00\n\
ATOM     29  O     UNK   1       1.952  -0.523   0.000  1.00  0.00\n\
ATOM     30  O     UNK   1       1.952  -0.523  -3.904  1.00  0.00\n\
ATOM     31  O     UNK   1       3.904  -0.523   1.952  1.00  0.00\n\
ATOM     32  O     UNK   1       3.904  -0.523  -1.952  1.00  0.00\n\
ATOM     33  O     UNK   1      -1.952   2.075   1.952  1.00  0.00\n\
ATOM     34  O     UNK   1      -1.952   2.075  -1.952  1.00  0.00\n\
ATOM     35  O     UNK   1       1.952   2.075   1.952  1.00  0.00\n\
ATOM     36  O     UNK   1       1.952   2.075  -1.952  1.00  0.00\n\
ATOM     37  O     UNK   1      -3.904   3.627   1.952  1.00  0.00\n\
ATOM     38  O     UNK   1      -3.904   3.627  -1.952  1.00  0.00\n\
ATOM     39  O     UNK   1      -1.952   3.627   3.904  1.00  0.00\n\
ATOM     40  O     UNK   1      -1.952   3.627   0.000  1.00  0.00\n\
ATOM     41  O     UNK   1      -1.952   3.627  -3.904  1.00  0.00\n\
ATOM     42  O     UNK   1       0.000   3.627   1.952  1.00  0.00\n\
ATOM     43  O     UNK   1       0.000   3.627  -1.952  1.00  0.00\n\
ATOM     44  O     UNK   1       1.952   3.627   3.904  1.00  0.00\n\
ATOM     45  O     UNK   1       1.952   3.627   0.000  1.00  0.00\n\
ATOM     46  O     UNK   1       1.952   3.627  -3.904  1.00  0.00\n\
ATOM     47  O     UNK   1       3.904   3.627   1.952  1.00  0.00\n\
ATOM     48  O     UNK   1       3.904   3.627  -1.952  1.00  0.00\n\
ATOM     49  O     UNK   1      -1.952   6.225   1.952  1.00  0.00\n\
ATOM     50  O     UNK   1      -1.952   6.225  -1.952  1.00  0.00\n\
ATOM     51  O     UNK   1       1.952   6.225   1.952  1.00  0.00\n\
ATOM     52  O     UNK   1       1.952   6.225  -1.952  1.00  0.00\n\
ATOM     53 PB     UNK   1       0.000  -2.540   0.000  1.00  0.00\n\
ATOM     54 PB     UNK   1       0.000   1.610   0.000  1.00  0.00\n\
ATOM     55 TI     UNK   1      -1.952  -4.445   1.952  1.00  0.00\n\
ATOM     56 TI     UNK   1      -1.952  -0.295   1.952  1.00  0.00\n\
ATOM     57 TI     UNK   1      -1.952   3.855   1.952  1.00  0.00\n\
ATOM     58 TI     UNK   1      -1.952  -4.445  -1.952  1.00  0.00\n\
ATOM     59 TI     UNK   1      -1.952  -0.295  -1.952  1.00  0.00\n\
ATOM     60 TI     UNK   1      -1.952   3.855  -1.952  1.00  0.00\n\
ATOM     61 TI     UNK   1       1.952  -4.445   1.952  1.00  0.00\n\
ATOM     62 TI     UNK   1       1.952  -0.295   1.952  1.00  0.00\n\
ATOM     63 TI     UNK   1       1.952   3.855   1.952  1.00  0.00\n\
ATOM     64 TI     UNK   1       1.952  -4.445  -1.952  1.00  0.00\n\
ATOM     65 TI     UNK   1       1.952  -0.295  -1.952  1.00  0.00\n\
ATOM     66 TI     UNK   1       1.952   3.855  -1.952  1.00  0.00\n\
END\n\
"

ML.insulin = "\
HEADER    HORMONE                                 10-JUL-89   4INS              \n\
TITLE     THE STRUCTURE OF 2ZN PIG INSULIN CRYSTALS AT 1.5 ANGSTROMS            \n\
TITLE    2 RESOLUTION                                                           \n\
COMPND    MOL_ID: 1;                                                            \n\
COMPND   2 MOLECULE: INSULIN (CHAIN A);                                         \n\
COMPND   3 CHAIN: A, C;                                                         \n\
COMPND   4 ENGINEERED: YES;                                                     \n\
COMPND   5 MOL_ID: 2;                                                           \n\
COMPND   6 MOLECULE: INSULIN (CHAIN B);                                         \n\
COMPND   7 CHAIN: B, D;                                                         \n\
COMPND   8 ENGINEERED: YES                                                      \n\
SOURCE    MOL_ID: 1;                                                            \n\
SOURCE   2 ORGANISM_SCIENTIFIC: SUS SCROFA;                                     \n\
SOURCE   3 ORGANISM_COMMON: PIG;                                                \n\
SOURCE   4 ORGANISM_TAXID: 9823;                                                \n\
SOURCE   5 MOL_ID: 2;                                                           \n\
SOURCE   6 ORGANISM_SCIENTIFIC: SUS SCROFA;                                     \n\
SOURCE   7 ORGANISM_COMMON: PIG;                                                \n\
SOURCE   8 ORGANISM_TAXID: 9823                                                 \n\
KEYWDS    HORMONE                                                               \n\
EXPDTA    X-RAY DIFFRACTION                                                     \n\
AUTHOR    G.G.DODSON,E.J.DODSON,D.C.HODGKIN,N.W.ISAACS,M.VIJAYAN                \n\
REVDAT   5   24-FEB-09 4INS    1       VERSN                                    \n\
REVDAT   4   01-APR-03 4INS    1       JRNL                                     \n\
REVDAT   3   31-JUL-94 4INS    3       HETATM                                   \n\
REVDAT   2   15-JUL-93 4INS    1       HEADER                                   \n\
REVDAT   1   15-APR-90 4INS    0                                                \n\
SPRSDE     15-APR-90 4INS      1INS                                             \n\
JRNL        AUTH   E.N.BAKER,T.L.BLUNDELL,J.F.CUTFIELD,S.M.CUTFIELD,            \n\
JRNL        AUTH 2 E.J.DODSON,G.G.DODSON,D.M.HODGKIN,R.E.HUBBARD,               \n\
JRNL        AUTH 3 N.W.ISAACS,C.D.REYNOLDS,ET AL.                               \n\
JRNL        TITL   THE STRUCTURE OF 2ZN PIG INSULIN CRYSTALS AT 1.5 A           \n\
JRNL        TITL 2 RESOLUTION.                                                  \n\
JRNL        REF    PHILOS.TRANS.R.SOC.LONDON,    V. 319   369 1988              \n\
JRNL        REF  2 SER.B                                                        \n\
JRNL        REFN                   ISSN 0080-4622                               \n\
JRNL        PMID   2905485                                                      \n\
REMARK   1                                                                      \n\
REMARK   1 REFERENCE 1                                                          \n\
REMARK   1  AUTH   J.BORDAS,G.G.DODSON,H.GREWE,M.H.J.KOCH,B.KREBS,              \n\
REMARK   1  AUTH 2 J.RANDALL                                                    \n\
REMARK   1  TITL   A COMPARATIVE ASSESSMENT OF THE ZINC-PROTEIN                 \n\
REMARK   1  TITL 2 COORDINATION IN 2ZN-INSULIN AS DETERMINED BY X-RAY           \n\
REMARK   1  TITL 3 ABSORPTION FINE STRUCTURE (EXAFS) AND X-RAY                  \n\
REMARK   1  TITL 4 CRYSTALLOGRAPHY                                              \n\
REMARK   1  REF    PROC.R.SOC.LONDON,SER.B       V. 219    21 1983              \n\
REMARK   1  REFN                   ISSN 0080-4649                               \n\
REMARK   1 REFERENCE 2                                                          \n\
REMARK   1  AUTH   E.J.DODSON,G.G.DODSON,D.C.HODGKIN,C.D.REYNOLDS               \n\
REMARK   1  TITL   STRUCTURAL RELATIONSHIPS IN THE TWO-ZINC INSULIN             \n\
REMARK   1  TITL 2 HEXAMER                                                      \n\
REMARK   1  REF    CAN.J.BIOCHEM.                V.  57   469 1979              \n\
REMARK   1  REFN                   ISSN 0008-4018                               \n\
REMARK   1 REFERENCE 3                                                          \n\
REMARK   1  AUTH   N.W.ISAACS,R.C.AGARWAL                                       \n\
REMARK   1  TITL   EXPERIENCE WITH FAST FOURIER LEAST SQUARES IN THE            \n\
REMARK   1  TITL 2 REFINEMENT OF THE CRYSTAL STRUCTURE OF                       \n\
REMARK   1  TITL 3 RHOMBOHEDRAL 2-ZINC INSULIN AT 1.5 ANGSTROMS                 \n\
REMARK   1  TITL 4 RESOLUTION                                                   \n\
REMARK   1  REF    ACTA CRYSTALLOGR.,SECT.A      V.  34   782 1978              \n\
REMARK   1  REFN                   ISSN 0108-7673                               \n\
REMARK   1 REFERENCE 4                                                          \n\
REMARK   1  AUTH   G.BENTLEY,G.DODSON,A.LEWITOVA                                \n\
REMARK   1  TITL   RHOMBOHEDRAL INSULIN CRYSTAL TRANSFORMATION                  \n\
REMARK   1  REF    J.MOL.BIOL.                   V. 126   871 1978              \n\
REMARK   1  REFN                   ISSN 0022-2836                               \n\
REMARK   1 REFERENCE 5                                                          \n\
REMARK   1  AUTH   E.J.DODSON,N.W.ISAACS,J.S.ROLLETT                            \n\
REMARK   1  TITL   A METHOD FOR FITTING SATISFACTORY MODELS TO SETS             \n\
REMARK   1  TITL 2 OF ATOMIC POSITIONS IN PROTEIN STRUCTURE                     \n\
REMARK   1  TITL 3 REFINEMENTS                                                  \n\
REMARK   1  REF    ACTA CRYSTALLOGR.,SECT.A      V.  32   311 1976              \n\
REMARK   1  REFN                   ISSN 0108-7673                               \n\
REMARK   1 REFERENCE 6                                                          \n\
REMARK   1  AUTH   D.C.HODGKIN                                                  \n\
REMARK   1  TITL   VARIETIES OF INSULIN                                         \n\
REMARK   1  REF    J.ENDOCRINOL.                 V.  63     1 1974              \n\
REMARK   1  REFN                   ISSN 0022-0795                               \n\
REMARK   1 REFERENCE 7                                                          \n\
REMARK   1  AUTH   D.C.HODGKIN                                                  \n\
REMARK   1  TITL   THE STRUCTURE OF INSULIN                                     \n\
REMARK   1  REF    DAN.TIDSSKR.FARM.             V.  46     1 1972              \n\
REMARK   1  REFN                   ISSN 0011-6513                               \n\
REMARK   1 REFERENCE 8                                                          \n\
REMARK   1  AUTH   T.BLUNDELL,G.DODSON,D.HODGKIN,D.MERCOLA                      \n\
REMARK   1  TITL   INSULIN. THE STRUCTURE IN THE CRYSTAL AND ITS                \n\
REMARK   1  TITL 2 REFLECTION IN CHEMISTRY AND BIOLOGY                          \n\
REMARK   1  REF    ADV.PROTEIN CHEM.             V.  26   279 1972              \n\
REMARK   1  REFN                   ISSN 0065-3233                               \n\
REMARK   1 REFERENCE 9                                                          \n\
REMARK   1  AUTH   T.L.BLUNDELL,J.F.CUTFIELD,E.J.DODSON,G.G.DODSON,             \n\
REMARK   1  AUTH 2 D.C.HODGKIN,D.A.MERCOLA                                      \n\
REMARK   1  TITL   THE CRYSTAL STRUCTURE OF RHOMBOHEDRAL 2 ZINC                 \n\
REMARK   1  TITL 2 INSULIN                                                      \n\
REMARK   1  REF    COLD SPRING HARBOR            V.  36   233 1972              \n\
REMARK   1  REF  2 SYMP.QUANT.BIOL.                                             \n\
REMARK   1  REFN                   ISSN 0091-7451                               \n\
REMARK   1 REFERENCE 10                                                         \n\
REMARK   1  AUTH   T.L.BLUNDELL,J.F.CUTFIELD,S.M.CUTFIELD,E.J.DODSON,           \n\
REMARK   1  AUTH 2 G.G.DODSON,D.C.HODGKIN,D.A.MERCOLA,M.VIJAYAN                 \n\
REMARK   1  TITL   ATOMIC POSITIONS IN RHOMBOHEDRAL 2-ZINC INSULIN              \n\
REMARK   1  TITL 2 CRYSTALS                                                     \n\
REMARK   1  REF    NATURE                        V. 231   506 1971              \n\
REMARK   1  REFN                   ISSN 0028-0836                               \n\
REMARK   1 REFERENCE 11                                                         \n\
REMARK   1  AUTH   T.L.BLUNDELL,G.G.DODSON,E.DODSON,D.C.HODGKIN,                \n\
REMARK   1  AUTH 2 M.VIJAYAN                                                    \n\
REMARK   1  TITL   X-RAY ANALYSIS AND THE STRUCTURE OF INSULIN                  \n\
REMARK   1  REF    RECENT PROG.HORM.RES.         V.  27     1 1971              \n\
REMARK   1  REFN                   ISSN 0079-9963                               \n\
REMARK   1 REFERENCE 12                                                         \n\
REMARK   1  AUTH   E.N.BAKER,G.DODSON                                           \n\
REMARK   1  TITL   X-RAY DIFFRACTION DATA ON SOME CRYSTALLINE                   \n\
REMARK   1  TITL 2 VARIETIES OF INSULIN                                         \n\
REMARK   1  REF    J.MOL.BIOL.                   V.  54   605 1970              \n\
REMARK   1  REFN                   ISSN 0022-2836                               \n\
REMARK   1 REFERENCE 13                                                         \n\
REMARK   1  AUTH   M.J.ADAMS,T.L.BLUNDELL,E.J.DODSON,G.G.DODSON,                \n\
REMARK   1  AUTH 2 M.VIJAYAN,E.N.BAKER,M.M.HARDING,D.C.HODGKIN,                 \n\
REMARK   1  AUTH 3 B.RIMMER,S.SHEAT                                             \n\
REMARK   1  TITL   STRUCTURE OF RHOMBOHEDRAL 2 ZINC INSULIN CRYSTALS            \n\
REMARK   1  REF    NATURE                        V. 224   491 1969              \n\
REMARK   1  REFN                   ISSN 0028-0836                               \n\
REMARK   1 REFERENCE 14                                                         \n\
REMARK   1  EDIT   M.O.DAYHOFF                                                  \n\
REMARK   1  REF    ATLAS OF PROTEIN SEQUENCE     V.   5   187 1972              \n\
REMARK   1  REF  2 AND STRUCTURE (DATA SECTION)                                 \n\
REMARK   1  PUBL   NATIONAL BIOMEDICAL RESEARCH FOUNDATION, SILVER              \n\
REMARK   1  PUBL 2 SPRING,MD.                                                   \n\
REMARK   1  REFN                                                                \n\
REMARK   2                                                                      \n\
REMARK   2 RESOLUTION.    1.50 ANGSTROMS.                                       \n\
REMARK   3                                                                      \n\
REMARK   3 REFINEMENT.                                                          \n\
REMARK   3   PROGRAM     : PROLSQ                                               \n\
REMARK   3   AUTHORS     : KONNERT,HENDRICKSON                                  \n\
REMARK   3                                                                      \n\
REMARK   3  DATA USED IN REFINEMENT.                                            \n\
REMARK   3   RESOLUTION RANGE HIGH (ANGSTROMS) : 1.50                           \n\
REMARK   3   RESOLUTION RANGE LOW  (ANGSTROMS) : NULL                           \n\
REMARK   3   DATA CUTOFF            (SIGMA(F)) : NULL                           \n\
REMARK   3   COMPLETENESS FOR RANGE        (%) : NULL                           \n\
REMARK   3   NUMBER OF REFLECTIONS             : NULL                           \n\
REMARK   3                                                                      \n\
REMARK   3  FIT TO DATA USED IN REFINEMENT.                                     \n\
REMARK   3   CROSS-VALIDATION METHOD          : NULL                            \n\
REMARK   3   FREE R VALUE TEST SET SELECTION  : NULL                            \n\
REMARK   3   R VALUE     (WORKING + TEST SET) : 0.153                           \n\
REMARK   3   R VALUE            (WORKING SET) : NULL                            \n\
REMARK   3   FREE R VALUE                     : NULL                            \n\
REMARK   3   FREE R VALUE TEST SET SIZE   (%) : NULL                            \n\
REMARK   3   FREE R VALUE TEST SET COUNT      : NULL                            \n\
REMARK   3                                                                      \n\
REMARK   3  FIT/AGREEMENT OF MODEL WITH ALL DATA.                               \n\
REMARK   3   R VALUE   (WORKING + TEST SET, NO CUTOFF) : NULL                   \n\
REMARK   3   R VALUE          (WORKING SET, NO CUTOFF) : NULL                   \n\
REMARK   3   FREE R VALUE                  (NO CUTOFF) : NULL                   \n\
REMARK   3   FREE R VALUE TEST SET SIZE (%, NO CUTOFF) : NULL                   \n\
REMARK   3   FREE R VALUE TEST SET COUNT   (NO CUTOFF) : NULL                   \n\
REMARK   3   TOTAL NUMBER OF REFLECTIONS   (NO CUTOFF) : NULL                   \n\
REMARK   3                                                                      \n\
REMARK   3  NUMBER OF NON-HYDROGEN ATOMS USED IN REFINEMENT.                    \n\
REMARK   3   PROTEIN ATOMS            : 829                                     \n\
REMARK   3   NUCLEIC ACID ATOMS       : 0                                       \n\
REMARK   3   HETEROGEN ATOMS          : 2                                       \n\
REMARK   3   SOLVENT ATOMS            : 350                                     \n\
REMARK   3                                                                      \n\
REMARK   3  B VALUES.                                                           \n\
REMARK   3   FROM WILSON PLOT           (A**2) : NULL                           \n\
REMARK   3   MEAN B VALUE      (OVERALL, A**2) : NULL                           \n\
REMARK   3   OVERALL ANISOTROPIC B VALUE.                                       \n\
REMARK   3    B11 (A**2) : NULL                                                 \n\
REMARK   3    B22 (A**2) : NULL                                                 \n\
REMARK   3    B33 (A**2) : NULL                                                 \n\
REMARK   3    B12 (A**2) : NULL                                                 \n\
REMARK   3    B13 (A**2) : NULL                                                 \n\
REMARK   3    B23 (A**2) : NULL                                                 \n\
REMARK   3                                                                      \n\
REMARK   3  ESTIMATED COORDINATE ERROR.                                         \n\
REMARK   3   ESD FROM LUZZATI PLOT        (A) : NULL                            \n\
REMARK   3   ESD FROM SIGMAA              (A) : NULL                            \n\
REMARK   3   LOW RESOLUTION CUTOFF        (A) : NULL                            \n\
REMARK   3                                                                      \n\
REMARK   3  RMS DEVIATIONS FROM IDEAL VALUES.                                   \n\
REMARK   3   DISTANCE RESTRAINTS.                    RMS    SIGMA               \n\
REMARK   3    BOND LENGTH                     (A) : 0.005 ; NULL                \n\
REMARK   3    ANGLE DISTANCE                  (A) : NULL  ; NULL                \n\
REMARK   3    INTRAPLANAR 1-4 DISTANCE        (A) : NULL  ; NULL                \n\
REMARK   3    H-BOND OR METAL COORDINATION    (A) : NULL  ; NULL                \n\
REMARK   3                                                                      \n\
REMARK   3   PLANE RESTRAINT                  (A) : NULL  ; NULL                \n\
REMARK   3   CHIRAL-CENTER RESTRAINT       (A**3) : NULL  ; NULL                \n\
REMARK   3                                                                      \n\
REMARK   3   NON-BONDED CONTACT RESTRAINTS.                                     \n\
REMARK   3    SINGLE TORSION                  (A) : NULL  ; NULL                \n\
REMARK   3    MULTIPLE TORSION                (A) : NULL  ; NULL                \n\
REMARK   3    H-BOND (X...Y)                  (A) : NULL  ; NULL                \n\
REMARK   3    H-BOND (X-H...Y)                (A) : NULL  ; NULL                \n\
REMARK   3                                                                      \n\
REMARK   3   CONFORMATIONAL TORSION ANGLE RESTRAINTS.                           \n\
REMARK   3    SPECIFIED                 (DEGREES) : NULL  ; NULL                \n\
REMARK   3    PLANAR                    (DEGREES) : NULL  ; NULL                \n\
REMARK   3    STAGGERED                 (DEGREES) : NULL  ; NULL                \n\
REMARK   3    TRANSVERSE                (DEGREES) : NULL  ; NULL                \n\
REMARK   3                                                                      \n\
REMARK   3  ISOTROPIC THERMAL FACTOR RESTRAINTS.    RMS    SIGMA                \n\
REMARK   3   MAIN-CHAIN BOND               (A**2) : NULL  ; NULL                \n\
REMARK   3   MAIN-CHAIN ANGLE              (A**2) : NULL  ; NULL                \n\
REMARK   3   SIDE-CHAIN BOND               (A**2) : NULL  ; NULL                \n\
REMARK   3   SIDE-CHAIN ANGLE              (A**2) : NULL  ; NULL                \n\
REMARK   3                                                                      \n\
REMARK   3  OTHER REFINEMENT REMARKS: SOME RESIDUES ARE APPARENTLY              \n\
REMARK   3  DISORDERED BUT DIFFICULT TO DESCRIBE IN TERMS OF ATOMIC             \n\
REMARK   3  POSITIONS. ALA B 30 IS ONE OF THESE RESIDUES. THE FOLLOWING         \n\
REMARK   3  RESIDUES ARE DISORDERED - GLN B 4, VAL B 12, GLU B 21, ARG B        \n\
REMARK   3  22, ARG D 22, LYS D 29.                                             \n\
REMARK   4                                                                      \n\
REMARK   4 4INS COMPLIES WITH FORMAT V. 3.15, 01-DEC-08                         \n\
REMARK 100                                                                      \n\
REMARK 100 THIS ENTRY HAS BEEN PROCESSED BY BNL.                                \n\
REMARK 200                                                                      \n\
REMARK 200 EXPERIMENTAL DETAILS                                                 \n\
REMARK 200  EXPERIMENT TYPE                : X-RAY DIFFRACTION                  \n\
REMARK 200  DATE OF DATA COLLECTION        : NULL                               \n\
REMARK 200  TEMPERATURE           (KELVIN) : NULL                               \n\
REMARK 200  PH                             : NULL                               \n\
REMARK 200  NUMBER OF CRYSTALS USED        : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200  SYNCHROTRON              (Y/N) : NULL                               \n\
REMARK 200  RADIATION SOURCE               : NULL                               \n\
REMARK 200  BEAMLINE                       : NULL                               \n\
REMARK 200  X-RAY GENERATOR MODEL          : NULL                               \n\
REMARK 200  MONOCHROMATIC OR LAUE    (M/L) : NULL                               \n\
REMARK 200  WAVELENGTH OR RANGE        (A) : NULL                               \n\
REMARK 200  MONOCHROMATOR                  : NULL                               \n\
REMARK 200  OPTICS                         : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200  DETECTOR TYPE                  : NULL                               \n\
REMARK 200  DETECTOR MANUFACTURER          : NULL                               \n\
REMARK 200  INTENSITY-INTEGRATION SOFTWARE : NULL                               \n\
REMARK 200  DATA SCALING SOFTWARE          : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200  NUMBER OF UNIQUE REFLECTIONS   : NULL                               \n\
REMARK 200  RESOLUTION RANGE HIGH      (A) : NULL                               \n\
REMARK 200  RESOLUTION RANGE LOW       (A) : NULL                               \n\
REMARK 200  REJECTION CRITERIA  (SIGMA(I)) : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200 OVERALL.                                                             \n\
REMARK 200  COMPLETENESS FOR RANGE     (%) : NULL                               \n\
REMARK 200  DATA REDUNDANCY                : NULL                               \n\
REMARK 200  R MERGE                    (I) : NULL                               \n\
REMARK 200  R SYM                      (I) : NULL                               \n\
REMARK 200  <I/SIGMA(I)> FOR THE DATA SET  : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200 IN THE HIGHEST RESOLUTION SHELL.                                     \n\
REMARK 200  HIGHEST RESOLUTION SHELL, RANGE HIGH (A) : NULL                     \n\
REMARK 200  HIGHEST RESOLUTION SHELL, RANGE LOW  (A) : NULL                     \n\
REMARK 200  COMPLETENESS FOR SHELL     (%) : NULL                               \n\
REMARK 200  DATA REDUNDANCY IN SHELL       : NULL                               \n\
REMARK 200  R MERGE FOR SHELL          (I) : NULL                               \n\
REMARK 200  R SYM FOR SHELL            (I) : NULL                               \n\
REMARK 200  <I/SIGMA(I)> FOR SHELL         : NULL                               \n\
REMARK 200                                                                      \n\
REMARK 200 DIFFRACTION PROTOCOL: NULL                                           \n\
REMARK 200 METHOD USED TO DETERMINE THE STRUCTURE: NULL                         \n\
REMARK 200 SOFTWARE USED: NULL                                                  \n\
REMARK 200 STARTING MODEL: NULL                                                 \n\
REMARK 200                                                                      \n\
REMARK 200 REMARK: NULL                                                         \n\
REMARK 280                                                                      \n\
REMARK 280 CRYSTAL                                                              \n\
REMARK 280 SOLVENT CONTENT, VS   (%): 36.05                                     \n\
REMARK 280 MATTHEWS COEFFICIENT, VM (ANGSTROMS**3/DA): 1.92                     \n\
REMARK 280                                                                      \n\
REMARK 280 CRYSTALLIZATION CONDITIONS: NULL                                     \n\
REMARK 290                                                                      \n\
REMARK 290 CRYSTALLOGRAPHIC SYMMETRY                                            \n\
REMARK 290 SYMMETRY OPERATORS FOR SPACE GROUP: H 3                              \n\
REMARK 290                                                                      \n\
REMARK 290      SYMOP   SYMMETRY                                                \n\
REMARK 290     NNNMMM   OPERATOR                                                \n\
REMARK 290       1555   X,Y,Z                                                   \n\
REMARK 290       2555   -Y,X-Y,Z                                                \n\
REMARK 290       3555   -X+Y,-X,Z                                               \n\
REMARK 290       4555   X+2/3,Y+1/3,Z+1/3                                       \n\
REMARK 290       5555   -Y+2/3,X-Y+1/3,Z+1/3                                    \n\
REMARK 290       6555   -X+Y+2/3,-X+1/3,Z+1/3                                   \n\
REMARK 290       7555   X+1/3,Y+2/3,Z+2/3                                       \n\
REMARK 290       8555   -Y+1/3,X-Y+2/3,Z+2/3                                    \n\
REMARK 290       9555   -X+Y+1/3,-X+2/3,Z+2/3                                   \n\
REMARK 290                                                                      \n\
REMARK 290     WHERE NNN -> OPERATOR NUMBER                                     \n\
REMARK 290           MMM -> TRANSLATION VECTOR                                  \n\
REMARK 290                                                                      \n\
REMARK 290 CRYSTALLOGRAPHIC SYMMETRY TRANSFORMATIONS                            \n\
REMARK 290 THE FOLLOWING TRANSFORMATIONS OPERATE ON THE ATOM/HETATM             \n\
REMARK 290 RECORDS IN THIS ENTRY TO PRODUCE CRYSTALLOGRAPHICALLY                \n\
REMARK 290 RELATED MOLECULES.                                                   \n\
REMARK 290   SMTRY1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 290   SMTRY2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 290   SMTRY3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 290   SMTRY1   2 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 290   SMTRY2   2  0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 290   SMTRY3   2  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 290   SMTRY1   3 -0.500000  0.866025  0.000000        0.00000            \n\
REMARK 290   SMTRY2   3 -0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 290   SMTRY3   3  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 290   SMTRY1   4  1.000000  0.000000  0.000000       41.25000            \n\
REMARK 290   SMTRY2   4  0.000000  1.000000  0.000000       23.81570            \n\
REMARK 290   SMTRY3   4  0.000000  0.000000  1.000000       11.33333            \n\
REMARK 290   SMTRY1   5 -0.500000 -0.866025  0.000000       41.25000            \n\
REMARK 290   SMTRY2   5  0.866025 -0.500000  0.000000       23.81570            \n\
REMARK 290   SMTRY3   5  0.000000  0.000000  1.000000       11.33333            \n\
REMARK 290   SMTRY1   6 -0.500000  0.866025  0.000000       41.25000            \n\
REMARK 290   SMTRY2   6 -0.866025 -0.500000  0.000000       23.81570            \n\
REMARK 290   SMTRY3   6  0.000000  0.000000  1.000000       11.33333            \n\
REMARK 290   SMTRY1   7  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 290   SMTRY2   7  0.000000  1.000000  0.000000       47.63140            \n\
REMARK 290   SMTRY3   7  0.000000  0.000000  1.000000       22.66667            \n\
REMARK 290   SMTRY1   8 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 290   SMTRY2   8  0.866025 -0.500000  0.000000       47.63140            \n\
REMARK 290   SMTRY3   8  0.000000  0.000000  1.000000       22.66667            \n\
REMARK 290   SMTRY1   9 -0.500000  0.866025  0.000000        0.00000            \n\
REMARK 290   SMTRY2   9 -0.866025 -0.500000  0.000000       47.63140            \n\
REMARK 290   SMTRY3   9  0.000000  0.000000  1.000000       22.66667            \n\
REMARK 290                                                                      \n\
REMARK 290 REMARK: NULL                                                         \n\
REMARK 300                                                                      \n\
REMARK 300 BIOMOLECULE: 1, 2, 3, 4, 5, 6, 7                                     \n\
REMARK 300 SEE REMARK 350 FOR THE AUTHOR PROVIDED AND/OR PROGRAM                \n\
REMARK 300 GENERATED ASSEMBLY INFORMATION FOR THE STRUCTURE IN                  \n\
REMARK 300 THIS ENTRY. THE REMARK MAY ALSO PROVIDE INFORMATION ON               \n\
REMARK 300 BURIED SURFACE AREA.                                                 \n\
REMARK 300 REMARK: THE CRYSTALLOGRAPHIC ASYMMETRIC UNIT OF INSULIN CONSISTS     \n\
REMARK 300 OF TWO INSULIN MOLECULES EACH CONSISTING OF TWO CHAINS. THIS         \n\
REMARK 300 ENTRY PRESENTS COORDINATES FOR MOLECULES I (CHAIN INDICATORS *A*     \n\
REMARK 300 AND *B*) AND II (CHAIN INDICATORS *C* AND *D*). THE QUASI-TWO-       \n\
REMARK 300 FOLD AXIS THAT TRANSFORMS MOLECULE I INTO MOLECULE II IS GIVEN       \n\
REMARK 300 IN THE *MTRIX* RECORDS BELOW. APPLYING THE THREE-FOLD                \n\
REMARK 300 CRYSTALLOGRAPHIC AXIS YIELDS A HEXAMER AROUND THE AXIS. THERE        \n\
REMARK 300 ARE TWO ZINC IONS SITUATED ON THIS THREE-FOLD AXIS. COORDINATES      \n\
REMARK 300 FOR THE ZINC IONS AND SOME WATER MOLECULES ARE INCLUDED BELOW        \n\
REMARK 300 WITH A BLANK CHAIN INDICATOR.                                        \n\
REMARK 350                                                                      \n\
REMARK 350 COORDINATES FOR A COMPLETE MULTIMER REPRESENTING THE KNOWN           \n\
REMARK 350 BIOLOGICALLY SIGNIFICANT OLIGOMERIZATION STATE OF THE                \n\
REMARK 350 MOLECULE CAN BE GENERATED BY APPLYING BIOMT TRANSFORMATIONS          \n\
REMARK 350 GIVEN BELOW.  BOTH NON-CRYSTALLOGRAPHIC AND                          \n\
REMARK 350 CRYSTALLOGRAPHIC OPERATIONS ARE GIVEN.                               \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 1                                                       \n\
REMARK 350 AUTHOR DETERMINED BIOLOGICAL UNIT: DIMERIC                           \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: DIMERIC                    \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 1680 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 3790 ANGSTROM**2                        \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -15.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: A, B                                  \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 2                                                       \n\
REMARK 350 AUTHOR DETERMINED BIOLOGICAL UNIT: DIMERIC                           \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: DIMERIC                    \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 1740 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 3620 ANGSTROM**2                        \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -15.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: C, D                                  \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 3                                                       \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: DODECAMERIC                \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 20600 ANGSTROM**2                         \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 12080 ANGSTROM**2                       \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -260.0 KCAL/MOL                       \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: A, B, C, D                            \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   2 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   2  0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   2  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   3 -0.500000  0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   3 -0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   3  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 4                                                       \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: HEXAMERIC                  \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 5730 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 10440 ANGSTROM**2                       \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -95.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: C, D                                  \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   2 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   2  0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   2  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   3 -0.500000  0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   3 -0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   3  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 5                                                       \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: HEXAMERIC                  \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 5580 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 10930 ANGSTROM**2                       \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -95.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: A, B                                  \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   2 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   2  0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   2  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350   BIOMT1   3 -0.500000  0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   3 -0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   3  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 6                                                       \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: TETRAMERIC                 \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 5120 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 5710 ANGSTROM**2                        \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -45.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: A, B                                  \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: C, D                                  \n\
REMARK 350   BIOMT1   2 -0.500000 -0.866025  0.000000        0.00000            \n\
REMARK 350   BIOMT2   2  0.866025 -0.500000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   2  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 350                                                                      \n\
REMARK 350 BIOMOLECULE: 7                                                       \n\
REMARK 350 SOFTWARE DETERMINED QUATERNARY STRUCTURE: TETRAMERIC                 \n\
REMARK 350 SOFTWARE USED: PISA                                                  \n\
REMARK 350 TOTAL BURIED SURFACE AREA: 4820 ANGSTROM**2                          \n\
REMARK 350 SURFACE AREA OF THE COMPLEX: 6010 ANGSTROM**2                        \n\
REMARK 350 CHANGE IN SOLVENT FREE ENERGY: -40.0 KCAL/MOL                        \n\
REMARK 350 APPLY THE FOLLOWING TO CHAINS: A, B, C, D                            \n\
REMARK 350   BIOMT1   1  1.000000  0.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT2   1  0.000000  1.000000  0.000000        0.00000            \n\
REMARK 350   BIOMT3   1  0.000000  0.000000  1.000000        0.00000            \n\
REMARK 375                                                                      \n\
REMARK 375 SPECIAL POSITION                                                     \n\
REMARK 375 THE FOLLOWING ATOMS ARE FOUND TO BE WITHIN 0.15 ANGSTROMS            \n\
REMARK 375 OF A SYMMETRY RELATED ATOM AND ARE ASSUMED TO BE ON SPECIAL          \n\
REMARK 375 POSITIONS.                                                           \n\
REMARK 375                                                                      \n\
REMARK 375 ATOM RES CSSEQI                                                      \n\
REMARK 375 ZN    ZN B  31  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375 ZN    ZN D  31  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375      HOH B 251  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375      HOH D  44  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375      HOH D 134  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375      HOH D 215  LIES ON A SPECIAL POSITION.                          \n\
REMARK 375      HOH D 269  LIES ON A SPECIAL POSITION.                          \n\
REMARK 525                                                                      \n\
REMARK 525 SOLVENT                                                              \n\
REMARK 525                                                                      \n\
REMARK 525 THE SOLVENT MOLECULES HAVE CHAIN IDENTIFIERS THAT                    \n\
REMARK 525 INDICATE THE POLYMER CHAIN WITH WHICH THEY ARE MOST                  \n\
REMARK 525 CLOSELY ASSOCIATED. THE REMARK LISTS ALL THE SOLVENT                 \n\
REMARK 525 MOLECULES WHICH ARE MORE THAN 5A AWAY FROM THE                       \n\
REMARK 525 NEAREST POLYMER CHAIN (M = MODEL NUMBER;                             \n\
REMARK 525 RES=RESIDUE NAME; C=CHAIN IDENTIFIER; SSEQ=SEQUENCE                  \n\
REMARK 525 NUMBER; I=INSERTION CODE):                                           \n\
REMARK 525                                                                      \n\
REMARK 525  M RES CSSEQI                                                        \n\
REMARK 525    HOH D  33        DISTANCE = 14.99 ANGSTROMS                       \n\
REMARK 525    HOH D  75        DISTANCE = 11.30 ANGSTROMS                       \n\
REMARK 525    HOH B 515        DISTANCE =  9.90 ANGSTROMS                       \n\
REMARK 525    HOH B 517        DISTANCE =  8.38 ANGSTROMS                       \n\
REMARK 525    HOH B 531        DISTANCE =  6.67 ANGSTROMS                       \n\
REMARK 525    HOH B 532        DISTANCE =  7.89 ANGSTROMS                       \n\
REMARK 525    HOH B 541        DISTANCE =  8.10 ANGSTROMS                       \n\
REMARK 525    HOH B 563        DISTANCE =  9.35 ANGSTROMS                       \n\
REMARK 525    HOH B 571        DISTANCE = 10.39 ANGSTROMS                       \n\
REMARK 525    HOH B 591        DISTANCE =  9.25 ANGSTROMS                       \n\
REMARK 525    HOH B 673        DISTANCE = 15.63 ANGSTROMS                       \n\
REMARK 525    HOH D 169        DISTANCE = 19.00 ANGSTROMS                       \n\
REMARK 525    HOH D 254        DISTANCE = 17.58 ANGSTROMS                       \n\
REMARK 525    HOH D 262        DISTANCE = 25.30 ANGSTROMS                       \n\
REMARK 525    HOH D 263        DISTANCE = 21.34 ANGSTROMS                       \n\
REMARK 525    HOH D 265        DISTANCE = 24.70 ANGSTROMS                       \n\
REMARK 525    HOH D 275        DISTANCE = 32.82 ANGSTROMS                       \n\
REMARK 525    HOH D 278        DISTANCE = 31.45 ANGSTROMS                       \n\
REMARK 620                                                                      \n\
REMARK 620 METAL COORDINATION                                                   \n\
REMARK 620  (M=MODEL NUMBER; RES=RESIDUE NAME; C=CHAIN IDENTIFIER;              \n\
REMARK 620  SSEQ=SEQUENCE NUMBER; I=INSERTION CODE):                            \n\
REMARK 620                                                                      \n\
REMARK 620 COORDINATION ANGLES FOR:  M RES CSSEQI METAL                         \n\
REMARK 620                              ZN B  31  ZN                            \n\
REMARK 620 N RES CSSEQI ATOM                                                    \n\
REMARK 620 1 HIS B  10   NE2                                                    \n\
REMARK 620 2 HOH B 201   O    90.2                                              \n\
REMARK 620 3 HIS B  10   NE2  98.9 163.2                                        \n\
REMARK 620 4 HIS B  10   NE2  98.7  93.7  98.8                                  \n\
REMARK 620 5 HOH B 201   O    93.9  74.8  90.4 163.0                            \n\
REMARK 620 6 HOH B 201   O   163.1  74.8  93.9  90.2  74.9                      \n\
REMARK 620 N                    1     2     3     4     5                       \n\
REMARK 620                                                                      \n\
REMARK 620 COORDINATION ANGLES FOR:  M RES CSSEQI METAL                         \n\
REMARK 620                              ZN D  31  ZN                            \n\
REMARK 620 N RES CSSEQI ATOM                                                    \n\
REMARK 620 1 HIS D  10   NE2                                                    \n\
REMARK 620 2 HIS D  10   NE2 103.4                                              \n\
REMARK 620 3 HOH D 233   O    87.7  96.7                                        \n\
REMARK 620 4 HOH D 233   O   154.0  87.7  67.5                                  \n\
REMARK 620 5 HOH D 233   O    96.7 154.0  67.5  67.5                            \n\
REMARK 620 6 HIS D  10   NE2 103.4 103.4 154.0  96.7  87.7                      \n\
REMARK 620 N                    1     2     3     4     5                       \n\
REMARK 800                                                                      \n\
REMARK 800 SITE                                                                 \n\
REMARK 800 SITE_IDENTIFIER: D1                                                  \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: DIMER-FORMING RESIDUES IN MOLECULE I               \n\
REMARK 800 SITE_IDENTIFIER: D2                                                  \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: DIMER-FORMING RESIDUES IN MOLECULE II              \n\
REMARK 800 SITE_IDENTIFIER: H1                                                  \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: HEXAMER-FORMING RESIDUES IN MOLECULE I             \n\
REMARK 800 SITE_IDENTIFIER: H2                                                  \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: HEXAMER-FORMING RESIDUES IN MOLECULE II            \n\
REMARK 800 SITE_IDENTIFIER: SI1                                                 \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: SURFACE-INVARIANT RESIDUES IN MOLECULE I NOT       \n\
REMARK 800  INVOLVED IN DIMERIZATION                                            \n\
REMARK 800 SITE_IDENTIFIER: SI2                                                 \n\
REMARK 800 EVIDENCE_CODE: AUTHOR                                                \n\
REMARK 800 SITE_DESCRIPTION: SURFACE-INVARIANT RESIDUES IN MOLECULE II NOT      \n\
REMARK 800  INVOLVED IN DIMERIZATION                                            \n\
REMARK 800 SITE_IDENTIFIER: AC1                                                 \n\
REMARK 800 EVIDENCE_CODE: SOFTWARE                                              \n\
REMARK 800 SITE_DESCRIPTION: BINDING SITE FOR RESIDUE ZN B 31                   \n\
REMARK 800 SITE_IDENTIFIER: AC2                                                 \n\
REMARK 800 EVIDENCE_CODE: SOFTWARE                                              \n\
REMARK 800 SITE_DESCRIPTION: BINDING SITE FOR RESIDUE ZN D 31                   \n\
DBREF  4INS A    1    21  UNP    P01315   INS_PIG         88    108             \n\
DBREF  4INS B    1    30  UNP    P01315   INS_PIG         25     54             \n\
DBREF  4INS C    1    21  UNP    P01315   INS_PIG         88    108             \n\
DBREF  4INS D    1    30  UNP    P01315   INS_PIG         25     54             \n\
SEQRES   1 A   21  GLY ILE VAL GLU GLN CYS CYS THR SER ILE CYS SER LEU          \n\
SEQRES   2 A   21  TYR GLN LEU GLU ASN TYR CYS ASN                              \n\
SEQRES   1 B   30  PHE VAL ASN GLN HIS LEU CYS GLY SER HIS LEU VAL GLU          \n\
SEQRES   2 B   30  ALA LEU TYR LEU VAL CYS GLY GLU ARG GLY PHE PHE TYR          \n\
SEQRES   3 B   30  THR PRO LYS ALA                                              \n\
SEQRES   1 C   21  GLY ILE VAL GLU GLN CYS CYS THR SER ILE CYS SER LEU          \n\
SEQRES   2 C   21  TYR GLN LEU GLU ASN TYR CYS ASN                              \n\
SEQRES   1 D   30  PHE VAL ASN GLN HIS LEU CYS GLY SER HIS LEU VAL GLU          \n\
SEQRES   2 D   30  ALA LEU TYR LEU VAL CYS GLY GLU ARG GLY PHE PHE TYR          \n\
SEQRES   3 D   30  THR PRO LYS ALA                                              \n\
HET     ZN  B  31       1                                                       \n\
HET     ZN  D  31       1                                                       \n\
HETNAM      ZN ZINC ION                                                         \n\
FORMUL   5   ZN    2(ZN 2+)                                                     \n\
FORMUL   7  HOH   *350(H2 O)                                                    \n\
HELIX    1 A11 GLY A    1  ILE A   10  1VAL 203 O H-BONDED TO HOH         10    \n\
HELIX    2 A12 SER A   12  GLU A   17  5CNTCTS MOSTLY GT 3A,NOT IDEAL      6    \n\
HELIX    3 B11 SER B    9  GLY B   20  1CYS 67 GLY 68, 3(10) CONTACTS     12    \n\
HELIX    4 A21 GLY C    1  ILE C   10  1NOT IDEAL ALPH,SOME PI CNTCTS     10    \n\
HELIX    5 A22 SER C   12  GLU C   17  5CNTCTS MOSTLY GT 3A,NOT IDEAL      6    \n\
HELIX    6 B21 SER D    9  GLY D   20  1CYS 67,GLY 68, 3(10) CONTACTS     12    \n\
SHEET    1   B 2 PHE B  24  TYR B  26  0                                        \n\
SHEET    2   B 2 PHE D  24  TYR D  26 -1  N  PHE B  24   O  TYR D  26           \n\
SSBOND   1 CYS A    6    CYS A   11                          1555   1555  2.05  \n\
SSBOND   2 CYS C    6    CYS C   11                          1555   1555  2.06  \n\
SSBOND   3 CYS A    7    CYS B    7                          1555   1555  1.97  \n\
SSBOND   4 CYS A   20    CYS B   19                          1555   1555  2.00  \n\
SSBOND   5 CYS C    7    CYS D    7                          1555   1555  2.01  \n\
SSBOND   6 CYS C   20    CYS D   19                          1555   1555  2.02  \n\
LINK        ZN    ZN B  31                 NE2 HIS B  10     1555   1555  2.11  \n\
LINK        ZN    ZN B  31                 O   HOH B 201     1555   1555  2.19  \n\
LINK        ZN    ZN D  31                 NE2 HIS D  10     1555   1555  2.08  \n\
LINK        ZN    ZN B  31                 NE2 HIS B  10     1555   2555  2.10  \n\
LINK        ZN    ZN B  31                 NE2 HIS B  10     1555   3555  2.11  \n\
LINK        ZN    ZN B  31                 O   HOH B 201     1555   2555  2.19  \n\
LINK        ZN    ZN B  31                 O   HOH B 201     1555   3555  2.19  \n\
LINK        ZN    ZN D  31                 NE2 HIS D  10     1555   3555  2.08  \n\
LINK        ZN    ZN D  31                 O   HOH D 233     1555   1554  2.32  \n\
LINK        ZN    ZN D  31                 O   HOH D 233     1555   3554  2.32  \n\
LINK        ZN    ZN D  31                 O   HOH D 233     1555   2554  2.32  \n\
LINK        ZN    ZN D  31                 NE2 HIS D  10     1555   2555  2.08  \n\
SITE     1  D1  5 VAL B  12  TYR B  16  PHE B  24  PHE B  25                    \n\
SITE     2  D1  5 TYR B  26                                                     \n\
SITE     1  D2  5 VAL D  12  TYR D  16  PHE D  24  PHE D  25                    \n\
SITE     2  D2  5 TYR D  26                                                     \n\
SITE     1  H1  7 LEU A  13  TYR A  14  PHE B   1  GLU B  13                    \n\
SITE     2  H1  7 ALA B  14  LEU B  17  VAL B  18                               \n\
SITE     1  H2  7 LEU C  13  TYR C  14  PHE D   1  GLU D  13                    \n\
SITE     2  H2  7 ALA D  14  LEU D  17  VAL D  18                               \n\
SITE     1 SI1  7 GLY A   1  GLU A   4  GLN A   5  CYS A   7                    \n\
SITE     2 SI1  7 TYR A  19  ASN A  21  CYS B   7                               \n\
SITE     1 SI2  7 GLY C   1  GLU C   4  GLN C   5  CYS C   7                    \n\
SITE     2 SI2  7 TYR C  19  ASN C  21  CYS D   7                               \n\
SITE     1 AC1  2 HIS B  10  HOH B 201                                          \n\
SITE     1 AC2  2 HIS D  10  HOH D 233                                          \n\
CRYST1   82.500   82.500   34.000  90.00  90.00 120.00 H 3          18          \n\
ORIGX1      1.000000  0.000000  0.000000        0.00000                         \n\
ORIGX2      0.000000  1.000000  0.000000        0.00000                         \n\
ORIGX3      0.000000  0.000000  1.000000        0.00000                         \n\
SCALE1      0.012121  0.006998  0.000000        0.00000                         \n\
SCALE2      0.000000  0.013996  0.000000        0.00000                         \n\
SCALE3      0.000000  0.000000  0.029412        0.00000                         \n\
MTRIX1   1 -0.878620 -0.476960  0.023050        0.00000    1                    \n\
MTRIX2   1 -0.477430  0.878370 -0.022860        0.00000    1                    \n\
MTRIX3   1 -0.009350 -0.031090 -0.999470        0.00000    1                    \n\
ATOM      1  N   GLY A   1      -8.863  16.944  14.289  1.00 21.88           N  \n\
ATOM      2  CA  GLY A   1      -9.929  17.026  13.244  1.00 22.85           C  \n\
ATOM      3  C   GLY A   1     -10.051  15.625  12.618  1.00 43.92           C  \n\
ATOM      4  O   GLY A   1      -9.782  14.728  13.407  1.00 25.22           O  \n\
ATOM      5  N   ILE A   2     -10.333  15.531  11.332  1.00 26.28           N  \n\
ATOM      6  CA  ILE A   2     -10.488  14.266  10.600  1.00 20.84           C  \n\
ATOM      7  C   ILE A   2      -9.367  13.302  10.658  1.00 11.81           C  \n\
ATOM      8  O   ILE A   2      -9.580  12.092  10.969  1.00 20.31           O  \n\
ATOM      9  CB  ILE A   2     -10.883  14.493   9.095  1.00 40.00           C  \n\
ATOM     10  CG1 ILE A   2     -11.579  13.146   8.697  1.00 36.74           C  \n\
ATOM     11  CG2 ILE A   2      -9.741  14.794   8.140  1.00 23.02           C  \n\
ATOM     12  CD1 ILE A   2     -12.813  13.031   9.640  1.00 26.69           C  \n\
ATOM     13  N   VAL A   3      -8.133  13.759  10.483  1.00 16.57           N  \n\
ATOM     14  CA  VAL A   3      -6.966  12.901  10.576  1.00 15.75           C  \n\
ATOM     15  C   VAL A   3      -6.892  12.161  11.922  1.00 22.09           C  \n\
ATOM     16  O   VAL A   3      -6.547  10.990  12.037  1.00 24.52           O  \n\
ATOM     17  CB  VAL A   3      -5.697  13.708  10.225  1.00 21.34           C  \n\
ATOM     18  CG1 VAL A   3      -4.382  12.960  10.448  1.00 32.48           C  \n\
ATOM     19  CG2 VAL A   3      -5.842  14.209   8.777  1.00 26.35           C  \n\
ATOM     20  N   GLU A   4      -7.043  13.019  12.935  1.00 16.58           N  \n\
ATOM     21  CA  GLU A   4      -6.889  12.474  14.295  1.00 15.32           C  \n\
ATOM     22  C   GLU A   4      -8.004  11.558  14.610  1.00 16.88           C  \n\
ATOM     23  O   GLU A   4      -7.888  10.474  15.128  1.00 23.30           O  \n\
ATOM     24  CB  GLU A   4      -6.809  13.691  15.266  1.00 17.11           C  \n\
ATOM     25  CG  GLU A   4      -5.615  14.565  14.951  1.00 21.45           C  \n\
ATOM     26  CD  GLU A   4      -5.704  15.457  13.735  1.00 21.59           C  \n\
ATOM     27  OE1 GLU A   4      -6.757  15.959  13.377  1.00 23.43           O  \n\
ATOM     28  OE2 GLU A   4      -4.568  15.569  13.179  1.00 25.36           O  \n\
ATOM     29  N   GLN A   5      -9.199  12.048  14.356  1.00 15.69           N  \n\
ATOM     30  CA  GLN A   5     -10.407  11.299  14.630  1.00 12.38           C  \n\
ATOM     31  C   GLN A   5     -10.431   9.940  13.980  1.00 19.86           C  \n\
ATOM     32  O   GLN A   5     -10.815   8.931  14.542  1.00 16.83           O  \n\
ATOM     33  CB  GLN A   5     -11.594  12.130  14.152  1.00 21.13           C  \n\
ATOM     34  CG  GLN A   5     -12.860  11.374  14.561  1.00 22.06           C  \n\
ATOM     35  CD  GLN A   5     -13.946  11.901  13.634  1.00 42.02           C  \n\
ATOM     36  OE1 GLN A   5     -13.908  13.027  13.169  1.00 55.10           O  \n\
ATOM     37  NE2 GLN A   5     -14.943  11.030  13.351  1.00 27.27           N  \n\
ATOM     38  N   CYS A   6     -10.033   9.815  12.695  1.00 13.19           N  \n\
ATOM     39  CA  CYS A   6     -10.050   8.518  12.065  1.00 12.63           C  \n\
ATOM     40  C   CYS A   6      -9.105   7.520  12.667  1.00  9.95           C  \n\
ATOM     41  O   CYS A   6      -9.395   6.288  12.666  1.00 14.22           O  \n\
ATOM     42  CB  CYS A   6      -9.660   8.673  10.559  1.00 12.54           C  \n\
ATOM     43  SG  CYS A   6     -10.925   9.459   9.579  1.00 13.00           S  \n\
ATOM     44  N   CYS A   7      -8.018   7.992  13.171  1.00 10.84           N  \n\
ATOM     45  CA  CYS A   7      -6.964   7.186  13.808  1.00 17.02           C  \n\
ATOM     46  C   CYS A   7      -7.236   6.948  15.358  1.00 13.71           C  \n\
ATOM     47  O   CYS A   7      -7.061   5.782  15.768  1.00 19.28           O  \n\
ATOM     48  CB  CYS A   7      -5.578   7.826  13.656  1.00 20.24           C  \n\
ATOM     49  SG  CYS A   7      -4.181   6.819  14.134  1.00 13.80           S  \n\
ATOM     50  N   THR A   8      -7.655   7.937  16.058  1.00 12.57           N  \n\
ATOM     51  CA  THR A   8      -7.862   7.732  17.520  1.00 19.99           C  \n\
ATOM     52  C   THR A   8      -9.143   6.997  17.870  1.00 26.34           C  \n\
ATOM     53  O   THR A   8      -9.189   6.157  18.795  1.00 25.43           O  \n\
ATOM     54  CB  THR A   8      -7.728   9.055  18.386  1.00 20.77           C  \n\
ATOM     55  OG1 THR A   8      -8.889   9.918  18.117  1.00 26.76           O  \n\
ATOM     56  CG2 THR A   8      -6.334   9.700  18.196  1.00 26.50           C  \n\
ATOM     57  N   SER A   9     -10.170   7.350  17.058  1.00 20.01           N  \n\
ATOM     58  CA  SER A   9     -11.509   6.803  17.121  1.00 16.88           C  \n\
ATOM     59  C   SER A   9     -11.796   5.981  15.856  1.00 12.70           C  \n\
ATOM     60  O   SER A   9     -11.139   5.010  15.473  1.00 17.60           O  \n\
ATOM     61  CB  SER A   9     -12.331   8.067  17.439  1.00 19.52           C  \n\
ATOM     62  OG  SER A   9     -13.674   7.774  17.650  1.00 32.34           O  \n\
ATOM     63  N   ILE A  10     -12.883   6.382  15.159  1.00 15.34           N  \n\
ATOM     64  CA  ILE A  10     -13.350   5.723  13.932  1.00 20.23           C  \n\
ATOM     65  C   ILE A  10     -13.969   6.902  13.106  1.00 17.50           C  \n\
ATOM     66  O   ILE A  10     -14.355   7.922  13.623  1.00 16.60           O  \n\
ATOM     67  CB  ILE A  10     -14.366   4.524  14.047  1.00 19.39           C  \n\
ATOM     68  CG1 ILE A  10     -15.702   4.874  14.742  1.00 22.05           C  \n\
ATOM     69  CG2 ILE A  10     -13.711   3.300  14.723  1.00 23.30           C  \n\
ATOM     70  CD1 ILE A  10     -16.702   3.722  15.005  1.00 42.11           C  \n\
ATOM     71  N   CYS A  11     -14.080   6.685  11.767  1.00 12.14           N  \n\
ATOM     72  CA  CYS A  11     -14.665   7.679  10.880  1.00 11.24           C  \n\
ATOM     73  C   CYS A  11     -15.301   6.881   9.766  1.00 12.17           C  \n\
ATOM     74  O   CYS A  11     -14.962   5.692   9.528  1.00 21.14           O  \n\
ATOM     75  CB  CYS A  11     -13.695   8.702  10.417  1.00 13.03           C  \n\
ATOM     76  SG  CYS A  11     -12.375   8.019   9.385  1.00 13.60           S  \n\
ATOM     77  N   SER A  12     -16.233   7.557   9.095  1.00 11.37           N  \n\
ATOM     78  CA  SER A  12     -16.999   6.978   8.005  1.00  9.91           C  \n\
ATOM     79  C   SER A  12     -16.563   7.644   6.726  1.00  7.40           C  \n\
ATOM     80  O   SER A  12     -15.967   8.753   6.711  1.00  9.67           O  \n\
ATOM     81  CB  SER A  12     -18.516   7.183   8.084  1.00 16.64           C  \n\
ATOM     82  OG  SER A  12     -18.869   8.543   7.881  1.00 17.14           O  \n\
ATOM     83  N   LEU A  13     -16.852   6.914   5.612  1.00 11.35           N  \n\
ATOM     84  CA  LEU A  13     -16.530   7.444   4.259  1.00 11.35           C  \n\
ATOM     85  C   LEU A  13     -17.317   8.715   4.030  1.00 12.55           C  \n\
ATOM     86  O   LEU A  13     -16.835   9.521   3.226  1.00 11.78           O  \n\
ATOM     87  CB  LEU A  13     -16.774   6.348   3.232  1.00 11.66           C  \n\
ATOM     88  CG  LEU A  13     -15.940   5.046   3.316  1.00 18.12           C  \n\
ATOM     89  CD1 LEU A  13     -16.050   4.197   2.018  1.00 18.76           C  \n\
ATOM     90  CD2 LEU A  13     -14.471   5.320   3.537  1.00 17.26           C  \n\
ATOM     91  N   TYR A  14     -18.491   8.790   4.629  1.00 10.84           N  \n\
ATOM     92  CA  TYR A  14     -19.282  10.035   4.368  1.00 10.75           C  \n\
ATOM     93  C   TYR A  14     -18.639  11.228   4.963  1.00 12.81           C  \n\
ATOM     94  O   TYR A  14     -18.706  12.298   4.341  1.00 15.11           O  \n\
ATOM     95  CB  TYR A  14     -20.746   9.900   4.799  1.00 12.90           C  \n\
ATOM     96  CG  TYR A  14     -21.463   8.764   4.079  1.00 18.23           C  \n\
ATOM     97  CD1 TYR A  14     -22.110   9.123   2.891  1.00 18.95           C  \n\
ATOM     98  CD2 TYR A  14     -21.461   7.440   4.475  1.00 15.42           C  \n\
ATOM     99  CE1 TYR A  14     -22.767   8.167   2.086  1.00 18.15           C  \n\
ATOM    100  CE2 TYR A  14     -22.118   6.436   3.676  1.00 14.31           C  \n\
ATOM    101  CZ  TYR A  14     -22.738   6.856   2.556  1.00 15.47           C  \n\
ATOM    102  OH  TYR A  14     -23.436   5.926   1.716  1.00 24.86           O  \n\
ATOM    103  N   GLN A  15     -17.945  11.100   6.091  1.00  9.63           N  \n\
ATOM    104  CA  GLN A  15     -17.178  12.138   6.774  1.00  9.40           C  \n\
ATOM    105  C   GLN A  15     -16.012  12.543   5.900  1.00 10.52           C  \n\
ATOM    106  O   GLN A  15     -15.611  13.717   5.722  1.00 14.25           O  \n\
ATOM    107  CB  GLN A  15     -16.774  11.841   8.205  1.00 13.89           C  \n\
ATOM    108  CG  GLN A  15     -17.894  11.668   9.206  1.00 17.53           C  \n\
ATOM    109  CD  GLN A  15     -17.524  11.056  10.515  1.00 28.21           C  \n\
ATOM    110  OE1 GLN A  15     -16.865  10.027  10.598  1.00 20.14           O  \n\
ATOM    111  NE2 GLN A  15     -17.994  11.650  11.624  1.00 30.25           N  \n\
ATOM    112  N   LEU A  16     -15.352  11.525   5.325  1.00 12.99           N  \n\
ATOM    113  CA  LEU A  16     -14.185  11.826   4.470  1.00 11.19           C  \n\
ATOM    114  C   LEU A  16     -14.605  12.634   3.249  1.00 15.54           C  \n\
ATOM    115  O   LEU A  16     -13.767  13.398   2.745  1.00 16.01           O  \n\
ATOM    116  CB  LEU A  16     -13.588  10.521   4.060  1.00 12.67           C  \n\
ATOM    117  CG  LEU A  16     -12.954   9.717   5.182  1.00 13.07           C  \n\
ATOM    118  CD1 LEU A  16     -12.115   8.571   4.602  1.00 16.61           C  \n\
ATOM    119  CD2 LEU A  16     -12.041  10.559   6.028  1.00 16.50           C  \n\
ATOM    120  N   GLU A  17     -15.779  12.420   2.759  1.00 17.50           N  \n\
ATOM    121  CA  GLU A  17     -16.223  13.179   1.589  1.00 17.72           C  \n\
ATOM    122  C   GLU A  17     -16.171  14.693   1.811  1.00 19.21           C  \n\
ATOM    123  O   GLU A  17     -16.118  15.466   0.803  1.00 18.48           O  \n\
ATOM    124  CB  GLU A  17     -17.645  12.862   1.215  1.00 17.38           C  \n\
ATOM    125  CG  GLU A  17     -17.885  11.629   0.360  1.00 27.97           C  \n\
ATOM    126  CD  GLU A  17     -19.225  11.667  -0.391  1.00 26.70           C  \n\
ATOM    127  OE1 GLU A  17     -20.201  11.466   0.276  1.00 29.93           O  \n\
ATOM    128  OE2 GLU A  17     -19.127  11.873  -1.643  1.00 34.66           O  \n\
ATOM    129  N   ASN A  18     -16.094  15.074   3.104  1.00 15.10           N  \n\
ATOM    130  CA  ASN A  18     -16.029  16.534   3.332  1.00 18.85           C  \n\
ATOM    131  C   ASN A  18     -14.703  17.131   2.954  1.00 18.46           C  \n\
ATOM    132  O   ASN A  18     -14.545  18.377   2.834  1.00 19.68           O  \n\
ATOM    133  CB  ASN A  18     -16.489  16.934   4.738  1.00 20.66           C  \n\
ATOM    134  CG  ASN A  18     -17.868  16.338   5.142  1.00 29.79           C  \n\
ATOM    135  OD1 ASN A  18     -18.813  16.053   4.382  1.00 34.48           O  \n\
ATOM    136  ND2 ASN A  18     -17.991  16.168   6.452  1.00 36.00           N  \n\
ATOM    137  N   TYR A  19     -13.697  16.327   2.738  1.00 15.68           N  \n\
ATOM    138  CA  TYR A  19     -12.358  16.724   2.380  1.00 14.19           C  \n\
ATOM    139  C   TYR A  19     -12.154  16.695   0.899  1.00 13.20           C  \n\
ATOM    140  O   TYR A  19     -11.010  17.038   0.480  1.00 16.12           O  \n\
ATOM    141  CB  TYR A  19     -11.364  15.840   3.178  1.00 14.35           C  \n\
ATOM    142  CG  TYR A  19     -11.586  16.223   4.634  1.00 21.24           C  \n\
ATOM    143  CD1 TYR A  19     -10.853  17.300   5.129  1.00 26.61           C  \n\
ATOM    144  CD2 TYR A  19     -12.562  15.703   5.445  1.00 19.21           C  \n\
ATOM    145  CE1 TYR A  19     -11.084  17.801   6.393  1.00 27.80           C  \n\
ATOM    146  CE2 TYR A  19     -12.833  16.207   6.714  1.00 23.98           C  \n\
ATOM    147  CZ  TYR A  19     -12.081  17.267   7.187  1.00 34.08           C  \n\
ATOM    148  OH  TYR A  19     -12.227  17.849   8.400  1.00 37.96           O  \n\
ATOM    149  N   CYS A  20     -13.057  16.313   0.077  1.00 13.05           N  \n\
ATOM    150  CA  CYS A  20     -12.838  16.309  -1.389  1.00 18.69           C  \n\
ATOM    151  C   CYS A  20     -12.984  17.799  -1.802  1.00 19.09           C  \n\
ATOM    152  O   CYS A  20     -13.588  18.579  -1.084  1.00 19.31           O  \n\
ATOM    153  CB  CYS A  20     -13.850  15.490  -2.157  1.00 15.99           C  \n\
ATOM    154  SG  CYS A  20     -13.923  13.761  -1.584  1.00 12.90           S  \n\
ATOM    155  N   ASN A  21     -12.380  18.063  -2.909  1.00 17.63           N  \n\
ATOM    156  CA  ASN A  21     -12.404  19.399  -3.608  1.00 25.23           C  \n\
ATOM    157  C   ASN A  21     -13.642  19.696  -4.447  1.00 34.82           C  \n\
ATOM    158  O   ASN A  21     -14.146  18.703  -4.956  1.00 31.24           O  \n\
ATOM    159  CB  ASN A  21     -11.228  19.392  -4.521  1.00 19.06           C  \n\
ATOM    160  CG  ASN A  21     -10.020  20.283  -4.456  1.00 40.71           C  \n\
ATOM    161  OD1 ASN A  21     -10.067  21.380  -5.083  1.00 68.22           O  \n\
ATOM    162  ND2 ASN A  21      -9.004  19.667  -3.808  1.00 39.69           N  \n\
ATOM    163  OXT ASN A  21     -13.881  20.890  -4.604  1.00 41.83           O  \n\
TER     164      ASN A  21                                                      \n\
ATOM    165  N   PHE B   1     -21.768   1.132   3.577  1.00 25.87           N  \n\
ATOM    166  CA  PHE B   1     -20.374   1.368   4.053  1.00 24.30           C  \n\
ATOM    167  C   PHE B   1     -20.341   1.145   5.585  1.00 39.74           C  \n\
ATOM    168  O   PHE B   1     -21.423   1.141   6.173  1.00 38.10           O  \n\
ATOM    169  CB  PHE B   1     -19.806   2.718   3.624  1.00 22.51           C  \n\
ATOM    170  CG  PHE B   1     -19.924   2.916   2.131  1.00 16.52           C  \n\
ATOM    171  CD1 PHE B   1     -20.067   4.204   1.618  1.00 35.58           C  \n\
ATOM    172  CD2 PHE B   1     -19.709   1.873   1.262  1.00 20.86           C  \n\
ATOM    173  CE1 PHE B   1     -20.093   4.444   0.243  1.00 52.66           C  \n\
ATOM    174  CE2 PHE B   1     -19.824   2.067  -0.123  1.00 51.46           C  \n\
ATOM    175  CZ  PHE B   1     -20.011   3.332  -0.631  1.00 42.63           C  \n\
ATOM    176  N   VAL B   2     -19.104   0.899   6.027  1.00 21.12           N  \n\
ATOM    177  CA  VAL B   2     -18.754   0.598   7.406  1.00 36.74           C  \n\
ATOM    178  C   VAL B   2     -17.780   1.656   7.965  1.00 23.52           C  \n\
ATOM    179  O   VAL B   2     -17.104   2.328   7.197  1.00 19.56           O  \n\
ATOM    180  CB  VAL B   2     -18.048  -0.765   7.638  1.00 30.58           C  \n\
ATOM    181  CG1 VAL B   2     -18.993  -1.953   7.609  1.00 25.73           C  \n\
ATOM    182  CG2 VAL B   2     -16.776  -0.916   6.799  1.00 22.31           C  \n\
ATOM    183  N   ASN B   3     -17.741   1.753   9.278  1.00 13.38           N  \n\
ATOM    184  CA  ASN B   3     -16.872   2.691   9.950  1.00 13.94           C  \n\
ATOM    185  C   ASN B   3     -15.457   2.100   9.881  1.00 15.03           C  \n\
ATOM    186  O   ASN B   3     -15.312   0.857   9.926  1.00 24.85           O  \n\
ATOM    187  CB  ASN B   3     -17.272   3.010  11.382  1.00 25.01           C  \n\
ATOM    188  CG  ASN B   3     -18.513   3.844  11.511  1.00 49.04           C  \n\
ATOM    189  OD1 ASN B   3     -18.658   4.774  10.724  1.00 34.50           O  \n\
ATOM    190  ND2 ASN B   3     -19.333   3.415  12.473  1.00 35.00           N  \n\
ATOM    191  N   GLN B   4     -14.509   3.031   9.767  1.00 12.52           N  \n\
ATOM    192  CA  GLN B   4     -13.137   2.542   9.571  1.00 22.69           C  \n\
ATOM    193  C   GLN B   4     -12.213   3.224  10.580  1.00 13.29           C  \n\
ATOM    194  O   GLN B   4     -12.347   4.333  11.118  1.00 20.53           O  \n\
ATOM    195  CB  GLN B   4     -12.666   2.760   8.116  1.00 39.18           C  \n\
ATOM    196  CG AGLN B   4     -13.007   1.731   7.035  0.60 11.45           C  \n\
ATOM    197  CG BGLN B   4     -12.978   1.763   6.996  0.40 37.30           C  \n\
ATOM    198  CD AGLN B   4     -12.270   0.520   6.830  0.60 12.42           C  \n\
ATOM    199  CD BGLN B   4     -14.070   2.781   6.746  0.40 32.97           C  \n\
ATOM    200  OE1AGLN B   4     -12.812  -0.612   6.494  0.60 17.67           O  \n\
ATOM    201  OE1BGLN B   4     -14.059   3.957   7.112  0.40 40.00           O  \n\
ATOM    202  NE2AGLN B   4     -10.898   0.624   6.949  0.60 28.94           N  \n\
ATOM    203  NE2BGLN B   4     -15.108   2.179   6.165  0.40 35.67           N  \n\
ATOM    204  N   HIS B   5     -11.158   2.442  10.837  1.00 13.02           N  \n\
ATOM    205  CA  HIS B   5     -10.083   3.000  11.779  1.00 17.05           C  \n\
ATOM    206  C   HIS B   5      -8.855   3.149  10.899  1.00 10.95           C  \n\
ATOM    207  O   HIS B   5      -8.284   2.166  10.380  1.00 17.14           O  \n\
ATOM    208  CB  HIS B   5      -9.982   1.956  12.877  1.00 22.24           C  \n\
ATOM    209  CG  HIS B   5      -8.934   2.400  13.860  1.00 25.74           C  \n\
ATOM    210  ND1 HIS B   5      -8.072   1.535  14.436  1.00 35.32           N  \n\
ATOM    211  CD2 HIS B   5      -8.637   3.596  14.329  1.00 28.02           C  \n\
ATOM    212  CE1 HIS B   5      -7.275   2.240  15.211  1.00 28.73           C  \n\
ATOM    213  NE2 HIS B   5      -7.571   3.509  15.150  1.00 30.21           N  \n\
ATOM    214  N   LEU B   6      -8.529   4.400  10.604  1.00 11.30           N  \n\
ATOM    215  CA  LEU B   6      -7.468   4.709   9.611  1.00 11.13           C  \n\
ATOM    216  C   LEU B   6      -6.399   5.604  10.158  1.00 11.03           C  \n\
ATOM    217  O   LEU B   6      -6.695   6.779  10.484  1.00 13.66           O  \n\
ATOM    218  CB  LEU B   6      -8.231   5.398   8.411  1.00 14.13           C  \n\
ATOM    219  CG  LEU B   6      -9.251   4.634   7.563  1.00 13.39           C  \n\
ATOM    220  CD1 LEU B   6     -10.017   5.598   6.671  1.00 14.70           C  \n\
ATOM    221  CD2 LEU B   6      -8.620   3.517   6.767  1.00 18.25           C  \n\
ATOM    222  N   CYS B   7      -5.180   5.069  10.115  1.00 10.06           N  \n\
ATOM    223  CA  CYS B   7      -4.058   5.835  10.569  1.00 10.70           C  \n\
ATOM    224  C   CYS B   7      -3.033   5.982   9.484  1.00 13.26           C  \n\
ATOM    225  O   CYS B   7      -2.955   5.198   8.573  1.00 19.10           O  \n\
ATOM    226  CB  CYS B   7      -3.434   5.105  11.762  1.00 15.88           C  \n\
ATOM    227  SG  CYS B   7      -4.523   5.099  13.246  1.00 16.40           S  \n\
ATOM    228  N   GLY B   8      -2.181   6.993   9.540  1.00 12.37           N  \n\
ATOM    229  CA  GLY B   8      -1.070   7.261   8.632  1.00 12.72           C  \n\
ATOM    230  C   GLY B   8      -1.465   7.317   7.204  1.00 13.24           C  \n\
ATOM    231  O   GLY B   8      -2.470   7.884   6.744  1.00 11.92           O  \n\
ATOM    232  N   SER B   9      -0.609   6.582   6.429  1.00 11.74           N  \n\
ATOM    233  CA  SER B   9      -0.863   6.544   4.980  1.00 15.89           C  \n\
ATOM    234  C   SER B   9      -2.183   5.870   4.578  1.00  9.73           C  \n\
ATOM    235  O   SER B   9      -2.649   6.111   3.528  1.00 10.43           O  \n\
ATOM    236  CB  SER B   9       0.309   5.921   4.206  1.00 17.74           C  \n\
ATOM    237  OG  SER B   9       0.534   4.626   4.735  1.00 17.37           O  \n\
ATOM    238  N   HIS B  10      -2.721   5.100   5.451  1.00 10.19           N  \n\
ATOM    239  CA  HIS B  10      -3.940   4.379   5.188  1.00  7.66           C  \n\
ATOM    240  C   HIS B  10      -5.081   5.431   5.075  1.00 10.17           C  \n\
ATOM    241  O   HIS B  10      -6.021   5.163   4.291  1.00 10.92           O  \n\
ATOM    242  CB  HIS B  10      -4.234   3.316   6.228  1.00  9.55           C  \n\
ATOM    243  CG  HIS B  10      -3.192   2.269   6.364  1.00  9.55           C  \n\
ATOM    244  ND1 HIS B  10      -3.043   1.310   5.423  1.00 15.86           N  \n\
ATOM    245  CD2 HIS B  10      -2.289   1.991   7.311  1.00  8.47           C  \n\
ATOM    246  CE1 HIS B  10      -2.078   0.573   5.774  1.00 10.65           C  \n\
ATOM    247  NE2 HIS B  10      -1.589   0.939   6.878  1.00  9.41           N  \n\
ATOM    248  N   LEU B  11      -5.016   6.497   5.810  1.00  8.93           N  \n\
ATOM    249  CA  LEU B  11      -6.071   7.518   5.617  1.00  9.64           C  \n\
ATOM    250  C   LEU B  11      -5.967   8.182   4.279  1.00  7.89           C  \n\
ATOM    251  O   LEU B  11      -6.969   8.462   3.666  1.00  9.74           O  \n\
ATOM    252  CB  LEU B  11      -5.860   8.541   6.740  1.00  6.93           C  \n\
ATOM    253  CG  LEU B  11      -6.949   9.607   6.783  1.00 14.50           C  \n\
ATOM    254  CD1 LEU B  11      -8.376   9.229   6.627  1.00 18.34           C  \n\
ATOM    255  CD2 LEU B  11      -6.742  10.309   8.115  1.00 20.70           C  \n\
ATOM    256  N   VAL B  12      -4.751   8.449   3.799  1.00 10.12           N  \n\
ATOM    257  CA  VAL B  12      -4.579   9.057   2.495  1.00  8.05           C  \n\
ATOM    258  C   VAL B  12      -5.050   8.131   1.372  1.00  8.14           C  \n\
ATOM    259  O   VAL B  12      -5.595   8.653   0.398  1.00 11.63           O  \n\
ATOM    260  CB  VAL B  12      -3.153   9.538   2.230  1.00 11.54           C  \n\
ATOM    261  CG1AVAL B  12      -2.822   9.786   0.799  0.50  4.68           C  \n\
ATOM    262  CG1BVAL B  12      -2.809  10.670   3.148  0.50 17.75           C  \n\
ATOM    263  CG2AVAL B  12      -2.809  10.670   3.148  0.50 17.75           C  \n\
ATOM    264  CG2BVAL B  12      -1.963   8.655   2.123  0.50 10.87           C  \n\
ATOM    265  N   GLU B  13      -4.906   6.880   1.502  1.00  6.12           N  \n\
ATOM    266  CA  GLU B  13      -5.432   5.946   0.542  1.00  8.88           C  \n\
ATOM    267  C   GLU B  13      -6.966   6.014   0.472  1.00 12.22           C  \n\
ATOM    268  O   GLU B  13      -7.578   6.035  -0.614  1.00 11.15           O  \n\
ATOM    269  CB  GLU B  13      -4.996   4.506   0.854  1.00 12.65           C  \n\
ATOM    270  CG  GLU B  13      -3.497   4.444   0.582  1.00 15.60           C  \n\
ATOM    271  CD  GLU B  13      -3.246   3.857  -0.794  1.00 53.85           C  \n\
ATOM    272  OE1 GLU B  13      -4.238   3.643  -1.500  1.00 33.68           O  \n\
ATOM    273  OE2 GLU B  13      -2.114   3.611  -1.126  1.00 47.24           O  \n\
ATOM    274  N   ALA B  14      -7.659   6.004   1.637  1.00  7.15           N  \n\
ATOM    275  CA  ALA B  14      -9.061   6.164   1.719  1.00  7.29           C  \n\
ATOM    276  C   ALA B  14      -9.563   7.482   1.051  1.00  6.80           C  \n\
ATOM    277  O   ALA B  14     -10.595   7.468   0.346  1.00 11.10           O  \n\
ATOM    278  CB  ALA B  14      -9.604   6.039   3.106  1.00 12.06           C  \n\
ATOM    279  N   LEU B  15      -8.876   8.580   1.321  1.00  6.72           N  \n\
ATOM    280  CA  LEU B  15      -9.224   9.854   0.717  1.00 13.51           C  \n\
ATOM    281  C   LEU B  15      -9.111   9.815  -0.829  1.00 14.62           C  \n\
ATOM    282  O   LEU B  15      -9.956  10.390  -1.496  1.00 12.32           O  \n\
ATOM    283  CB  LEU B  15      -8.317  10.981   1.327  1.00  9.71           C  \n\
ATOM    284  CG  LEU B  15      -8.755  11.581   2.649  1.00  8.92           C  \n\
ATOM    285  CD1 LEU B  15      -7.682  12.475   3.236  1.00 14.49           C  \n\
ATOM    286  CD2 LEU B  15     -10.096  12.235   2.460  1.00 12.03           C  \n\
ATOM    287  N   TYR B  16      -8.050   9.147  -1.297  1.00  8.65           N  \n\
ATOM    288  CA  TYR B  16      -7.838   8.961  -2.686  1.00  8.75           C  \n\
ATOM    289  C   TYR B  16      -8.999   8.175  -3.284  1.00 11.14           C  \n\
ATOM    290  O   TYR B  16      -9.508   8.504  -4.371  1.00 14.34           O  \n\
ATOM    291  CB  TYR B  16      -6.494   8.247  -3.047  1.00  7.72           C  \n\
ATOM    292  CG  TYR B  16      -6.271   8.027  -4.522  1.00 10.81           C  \n\
ATOM    293  CD1 TYR B  16      -6.450   6.784  -5.047  1.00 17.09           C  \n\
ATOM    294  CD2 TYR B  16      -6.009   9.104  -5.338  1.00 12.64           C  \n\
ATOM    295  CE1 TYR B  16      -6.354   6.581  -6.467  1.00 17.76           C  \n\
ATOM    296  CE2 TYR B  16      -5.898   8.958  -6.741  1.00 13.94           C  \n\
ATOM    297  CZ  TYR B  16      -6.110   7.692  -7.259  1.00 17.34           C  \n\
ATOM    298  OH  TYR B  16      -5.925   7.520  -8.594  1.00 25.34           O  \n\
ATOM    299  N   LEU B  17      -9.428   7.109  -2.664  1.00  8.68           N  \n\
ATOM    300  CA  LEU B  17     -10.566   6.290  -3.167  1.00  8.83           C  \n\
ATOM    301  C   LEU B  17     -11.861   7.087  -3.142  1.00 10.95           C  \n\
ATOM    302  O   LEU B  17     -12.650   7.046  -4.073  1.00 15.67           O  \n\
ATOM    303  CB  LEU B  17     -10.665   5.052  -2.327  1.00 10.82           C  \n\
ATOM    304  CG  LEU B  17      -9.594   4.104  -2.924  1.00 28.76           C  \n\
ATOM    305  CD1 LEU B  17      -9.136   3.067  -1.933  1.00 30.52           C  \n\
ATOM    306  CD2 LEU B  17     -10.280   3.540  -4.157  1.00 34.91           C  \n\
ATOM    307  N   VAL B  18     -12.123   7.786  -2.036  1.00  8.85           N  \n\
ATOM    308  CA  VAL B  18     -13.351   8.545  -1.933  1.00  8.77           C  \n\
ATOM    309  C   VAL B  18     -13.433   9.713  -2.873  1.00  9.77           C  \n\
ATOM    310  O   VAL B  18     -14.472   9.937  -3.457  1.00 16.86           O  \n\
ATOM    311  CB  VAL B  18     -13.604   8.974  -0.463  1.00 14.39           C  \n\
ATOM    312  CG1 VAL B  18     -14.784   9.899  -0.282  1.00 11.72           C  \n\
ATOM    313  CG2 VAL B  18     -13.862   7.763   0.393  1.00 12.58           C  \n\
ATOM    314  N   CYS B  19     -12.422  10.518  -2.958  1.00  9.03           N  \n\
ATOM    315  CA  CYS B  19     -12.433  11.758  -3.756  1.00  8.88           C  \n\
ATOM    316  C   CYS B  19     -11.994  11.555  -5.212  1.00 14.69           C  \n\
ATOM    317  O   CYS B  19     -12.410  12.303  -6.126  1.00 16.46           O  \n\
ATOM    318  CB  CYS B  19     -11.558  12.719  -3.005  1.00 11.19           C  \n\
ATOM    319  SG  CYS B  19     -12.040  13.127  -1.344  1.00 10.10           S  \n\
ATOM    320  N   GLY B  20     -11.149  10.609  -5.463  1.00 17.12           N  \n\
ATOM    321  CA  GLY B  20     -10.685  10.359  -6.851  1.00 21.59           C  \n\
ATOM    322  C   GLY B  20     -10.275  11.650  -7.524  1.00 21.38           C  \n\
ATOM    323  O   GLY B  20      -9.494  12.483  -7.053  1.00 20.41           O  \n\
ATOM    324  N   GLU B  21     -10.784  11.844  -8.710  1.00 29.76           N  \n\
ATOM    325  CA  GLU B  21     -10.398  13.043  -9.501  1.00 24.44           C  \n\
ATOM    326  C   GLU B  21     -10.898  14.356  -9.065  1.00 19.21           C  \n\
ATOM    327  O   GLU B  21     -10.430  15.331  -9.665  1.00 19.00           O  \n\
ATOM    328  CB  GLU B  21     -10.776  12.724 -10.968  1.00 28.66           C  \n\
ATOM    329  CG AGLU B  21     -12.310  12.519 -11.045  0.50 56.11           C  \n\
ATOM    330  CG BGLU B  21      -9.804  13.415 -11.966  0.50 75.35           C  \n\
ATOM    331  CD AGLU B  21     -12.707  11.349 -11.901  0.50 62.47           C  \n\
ATOM    332  CD BGLU B  21      -9.689  13.292 -13.466  0.50 52.68           C  \n\
ATOM    333  OE1AGLU B  21     -12.515  10.193 -11.564  0.50 48.34           O  \n\
ATOM    334  OE1BGLU B  21     -10.540  12.768 -14.159  0.50 50.28           O  \n\
ATOM    335  OE2AGLU B  21     -13.225  11.772 -12.958  0.50 49.92           O  \n\
ATOM    336  OE2BGLU B  21      -8.505  13.537 -13.781  0.50 27.33           O  \n\
ATOM    337  N   ARG B  22     -11.703  14.491  -8.034  1.00 15.49           N  \n\
ATOM    338  CA  ARG B  22     -12.089  15.732  -7.456  1.00 16.44           C  \n\
ATOM    339  C   ARG B  22     -10.797  16.222  -6.745  1.00 17.70           C  \n\
ATOM    340  O   ARG B  22     -10.636  17.458  -6.608  1.00 21.36           O  \n\
ATOM    341  CB  ARG B  22     -13.234  15.678  -6.464  1.00 21.99           C  \n\
ATOM    342  CG  ARG B  22     -14.645  15.427  -7.037  1.00 57.89           C  \n\
ATOM    343  CD  ARG B  22     -15.675  15.167  -5.960  1.00 31.23           C  \n\
ATOM    344  NE AARG B  22     -15.739  16.404  -5.124  0.50 16.46           N  \n\
ATOM    345  NE BARG B  22     -15.629  13.808  -5.271  0.50 17.69           N  \n\
ATOM    346  CZ AARG B  22     -16.608  16.581  -4.143  0.50 39.57           C  \n\
ATOM    347  CZ BARG B  22     -16.379  13.225  -4.283  0.50 33.09           C  \n\
ATOM    348  NH1AARG B  22     -16.743  17.672  -3.416  0.50 20.14           N  \n\
ATOM    349  NH1BARG B  22     -16.987  14.046  -3.392  0.50 51.50           N  \n\
ATOM    350  NH2AARG B  22     -17.405  15.551  -3.871  0.50 35.40           N  \n\
ATOM    351  NH2BARG B  22     -16.705  11.943  -4.184  0.50 19.59           N  \n\
ATOM    352  N   GLY B  23     -10.007  15.246  -6.287  1.00 19.18           N  \n\
ATOM    353  CA  GLY B  23      -8.844  15.673  -5.491  1.00 11.89           C  \n\
ATOM    354  C   GLY B  23      -9.339  15.932  -4.075  1.00 12.83           C  \n\
ATOM    355  O   GLY B  23     -10.524  15.922  -3.626  1.00 14.47           O  \n\
ATOM    356  N   PHE B  24      -8.343  16.165  -3.187  1.00 12.54           N  \n\
ATOM    357  CA  PHE B  24      -8.584  16.432  -1.765  1.00 10.08           C  \n\
ATOM    358  C   PHE B  24      -7.488  17.220  -1.123  1.00 10.77           C  \n\
ATOM    359  O   PHE B  24      -6.411  17.409  -1.657  1.00 10.93           O  \n\
ATOM    360  CB  PHE B  24      -8.754  15.111  -1.032  1.00  3.80           C  \n\
ATOM    361  CG  PHE B  24      -7.638  14.114  -1.034  1.00  5.98           C  \n\
ATOM    362  CD1 PHE B  24      -7.488  13.202  -2.069  1.00  5.61           C  \n\
ATOM    363  CD2 PHE B  24      -6.667  14.205  -0.036  1.00  8.93           C  \n\
ATOM    364  CE1 PHE B  24      -6.375  12.338  -2.106  1.00 14.64           C  \n\
ATOM    365  CE2 PHE B  24      -5.573  13.387   0.027  1.00 11.74           C  \n\
ATOM    366  CZ  PHE B  24      -5.457  12.470  -1.008  1.00  9.78           C  \n\
ATOM    367  N   PHE B  25      -7.717  17.612   0.116  1.00 14.20           N  \n\
ATOM    368  CA  PHE B  25      -6.813  18.302   1.052  1.00 12.03           C  \n\
ATOM    369  C   PHE B  25      -6.569  17.356   2.221  1.00 12.69           C  \n\
ATOM    370  O   PHE B  25      -7.485  16.788   2.757  1.00 15.22           O  \n\
ATOM    371  CB  PHE B  25      -7.387  19.633   1.684  1.00 17.25           C  \n\
ATOM    372  CG  PHE B  25      -7.105  20.689   0.637  1.00 30.38           C  \n\
ATOM    373  CD1 PHE B  25      -7.842  20.802  -0.543  1.00 61.20           C  \n\
ATOM    374  CD2 PHE B  25      -6.003  21.541   0.896  1.00 56.90           C  \n\
ATOM    375  CE1 PHE B  25      -7.445  21.790  -1.461  1.00 29.52           C  \n\
ATOM    376  CE2 PHE B  25      -5.648  22.564  -0.027  1.00 40.31           C  \n\
ATOM    377  CZ  PHE B  25      -6.382  22.681  -1.235  1.00 30.38           C  \n\
ATOM    378  N   TYR B  26      -5.345  17.202   2.583  1.00 11.25           N  \n\
ATOM    379  CA  TYR B  26      -4.996  16.333   3.717  1.00 10.42           C  \n\
ATOM    380  C   TYR B  26      -4.445  17.350   4.714  1.00 15.08           C  \n\
ATOM    381  O   TYR B  26      -3.350  17.906   4.518  1.00 14.52           O  \n\
ATOM    382  CB  TYR B  26      -3.949  15.288   3.319  1.00  9.51           C  \n\
ATOM    383  CG  TYR B  26      -3.404  14.530   4.474  1.00 12.61           C  \n\
ATOM    384  CD1 TYR B  26      -4.243  13.688   5.178  1.00 20.50           C  \n\
ATOM    385  CD2 TYR B  26      -2.105  14.676   4.857  1.00 13.88           C  \n\
ATOM    386  CE1 TYR B  26      -3.652  12.967   6.246  1.00 16.38           C  \n\
ATOM    387  CE2 TYR B  26      -1.577  14.010   5.941  1.00 10.97           C  \n\
ATOM    388  CZ  TYR B  26      -2.347  13.149   6.642  1.00 11.71           C  \n\
ATOM    389  OH  TYR B  26      -1.853  12.447   7.734  1.00 16.39           O  \n\
ATOM    390  N   THR B  27      -5.287  17.537   5.752  1.00 15.47           N  \n\
ATOM    391  CA  THR B  27      -4.902  18.555   6.772  1.00 20.05           C  \n\
ATOM    392  C   THR B  27      -4.834  18.053   8.250  1.00 15.09           C  \n\
ATOM    393  O   THR B  27      -5.825  18.282   8.943  1.00 22.56           O  \n\
ATOM    394  CB  THR B  27      -5.856  19.825   6.753  1.00 26.34           C  \n\
ATOM    395  OG1ATHR B  27      -7.228  19.328   6.558  0.50 39.91           O  \n\
ATOM    396  OG1BTHR B  27      -5.691  20.478   5.511  0.50 29.43           O  \n\
ATOM    397  CG2ATHR B  27      -5.505  20.781   5.606  0.50 34.53           C  \n\
ATOM    398  CG2BTHR B  27      -5.413  20.850   7.858  0.50 34.13           C  \n\
ATOM    399  N   PRO B  28      -3.702  17.548   8.603  1.00 18.26           N  \n\
ATOM    400  CA  PRO B  28      -3.494  17.055   9.954  1.00 21.56           C  \n\
ATOM    401  C   PRO B  28      -3.306  18.220  10.892  1.00 22.68           C  \n\
ATOM    402  O   PRO B  28      -3.072  19.330  10.484  1.00 21.93           O  \n\
ATOM    403  CB  PRO B  28      -2.249  16.209   9.808  1.00 21.60           C  \n\
ATOM    404  CG  PRO B  28      -1.544  16.617   8.595  1.00 21.39           C  \n\
ATOM    405  CD  PRO B  28      -2.526  17.320   7.778  1.00 14.32           C  \n\
ATOM    406  N   LYS B  29      -3.452  17.975  12.175  1.00 26.27           N  \n\
ATOM    407  CA  LYS B  29      -3.227  18.941  13.307  1.00 23.17           C  \n\
ATOM    408  C   LYS B  29      -1.707  18.995  13.459  1.00 52.81           C  \n\
ATOM    409  O   LYS B  29      -1.026  17.919  13.406  1.00 39.37           O  \n\
ATOM    410  CB  LYS B  29      -3.764  18.417  14.615  1.00 22.26           C  \n\
ATOM    411  CG  LYS B  29      -3.990  19.385  15.801  1.00 48.01           C  \n\
ATOM    412  CD  LYS B  29      -5.153  18.811  16.622  1.00 37.36           C  \n\
ATOM    413  CE  LYS B  29      -5.067  18.493  18.087  1.00 53.09           C  \n\
ATOM    414  NZ  LYS B  29      -4.208  19.418  18.841  1.00 61.16           N  \n\
ATOM    415  N   ALA B  30      -1.166  20.052  13.779  1.00 53.30           N  \n\
ATOM    416  CA  ALA B  30       0.148  20.539  13.902  1.00 45.30           C  \n\
ATOM    417  C   ALA B  30       0.991  20.467  15.167  1.00 50.30           C  \n\
ATOM    418  O   ALA B  30       0.427  20.710  16.268  1.00 62.63           O  \n\
ATOM    419  CB  ALA B  30       0.033  22.113  13.690  1.00 53.30           C  \n\
ATOM    420  OXT ALA B  30       2.226  20.205  15.000  1.00 76.30           O  \n\
TER     421      ALA B  30                                                      \n\
ATOM    422  N   GLY C   1      -0.643  19.956 -14.073  1.00 26.16           N  \n\
ATOM    423  CA  GLY C   1      -0.389  20.033 -12.615  1.00 30.96           C  \n\
ATOM    424  C   GLY C   1       0.447  18.825 -12.180  1.00 33.76           C  \n\
ATOM    425  O   GLY C   1       1.216  18.311 -13.006  1.00 21.35           O  \n\
ATOM    426  N   ILE C   2       0.244  18.434 -10.942  1.00 23.96           N  \n\
ATOM    427  CA  ILE C   2       1.003  17.290 -10.393  1.00 15.36           C  \n\
ATOM    428  C   ILE C   2       0.946  16.025 -11.185  1.00 13.59           C  \n\
ATOM    429  O   ILE C   2       1.971  15.359 -11.278  1.00 17.19           O  \n\
ATOM    430  CB  ILE C   2       0.491  17.013  -8.931  1.00 16.47           C  \n\
ATOM    431  CG1 ILE C   2       1.539  16.143  -8.164  1.00 15.91           C  \n\
ATOM    432  CG2 ILE C   2      -0.969  16.533  -8.863  1.00 17.06           C  \n\
ATOM    433  CD1 ILE C   2       1.081  15.828  -6.720  1.00 19.56           C  \n\
ATOM    434  N   VAL C   3      -0.179  15.655 -11.786  1.00 13.55           N  \n\
ATOM    435  CA  VAL C   3      -0.278  14.455 -12.591  1.00 17.58           C  \n\
ATOM    436  C   VAL C   3       0.590  14.454 -13.881  1.00 21.18           C  \n\
ATOM    437  O   VAL C   3       1.245  13.451 -14.197  1.00 19.26           O  \n\
ATOM    438  CB  VAL C   3      -1.709  14.136 -12.915  1.00 26.49           C  \n\
ATOM    439  CG1 VAL C   3      -1.808  12.868 -13.745  1.00 30.71           C  \n\
ATOM    440  CG2 VAL C   3      -2.567  13.989 -11.662  1.00 16.85           C  \n\
ATOM    441  N   GLU C   4       0.621  15.590 -14.497  1.00 24.23           N  \n\
ATOM    442  CA  GLU C   4       1.481  15.743 -15.686  1.00 23.06           C  \n\
ATOM    443  C   GLU C   4       2.966  15.744 -15.343  1.00 19.78           C  \n\
ATOM    444  O   GLU C   4       3.805  15.198 -16.061  1.00 29.30           O  \n\
ATOM    445  CB  GLU C   4       1.063  17.059 -16.361  1.00 24.43           C  \n\
ATOM    446  CG  GLU C   4      -0.349  16.900 -16.964  1.00 19.87           C  \n\
ATOM    447  CD  GLU C   4      -1.541  17.024 -16.030  1.00 27.93           C  \n\
ATOM    448  OE1 GLU C   4      -2.429  16.169 -16.211  1.00 37.08           O  \n\
ATOM    449  OE2 GLU C   4      -1.527  17.967 -15.181  1.00 27.92           O  \n\
ATOM    450  N   GLN C   5       3.289  16.386 -14.236  1.00 17.90           N  \n\
ATOM    451  CA  GLN C   5       4.695  16.445 -13.800  1.00 17.90           C  \n\
ATOM    452  C   GLN C   5       5.206  15.104 -13.307  1.00 23.62           C  \n\
ATOM    453  O   GLN C   5       6.331  14.684 -13.578  1.00 26.25           O  \n\
ATOM    454  CB  GLN C   5       4.820  17.553 -12.780  1.00 22.64           C  \n\
ATOM    455  CG  GLN C   5       4.373  18.969 -13.199  1.00 32.56           C  \n\
ATOM    456  CD  GLN C   5       5.405  19.755 -12.404  1.00 59.85           C  \n\
ATOM    457  OE1 GLN C   5       6.478  19.979 -12.947  1.00 50.22           O  \n\
ATOM    458  NE2 GLN C   5       4.976  19.940 -11.148  1.00 56.46           N  \n\
ATOM    459  N   CYS C   6       4.386  14.408 -12.514  1.00 20.45           N  \n\
ATOM    460  CA  CYS C   6       4.949  13.166 -11.921  1.00 20.95           C  \n\
ATOM    461  C   CYS C   6       4.472  11.875 -12.436  1.00 18.67           C  \n\
ATOM    462  O   CYS C   6       5.127  10.851 -12.293  1.00 17.98           O  \n\
ATOM    463  CB  CYS C   6       4.732  13.264 -10.354  1.00 16.76           C  \n\
ATOM    464  SG  CYS C   6       5.416  14.719  -9.509  1.00 20.00           S  \n\
ATOM    465  N   CYS C   7       3.347  11.802 -13.063  1.00 15.93           N  \n\
ATOM    466  CA  CYS C   7       2.858  10.515 -13.612  1.00 10.31           C  \n\
ATOM    467  C   CYS C   7       3.090  10.422 -15.112  1.00 27.34           C  \n\
ATOM    468  O   CYS C   7       3.601   9.455 -15.603  1.00 24.77           O  \n\
ATOM    469  CB  CYS C   7       1.348  10.332 -13.329  1.00 17.60           C  \n\
ATOM    470  SG  CYS C   7       0.602   8.899 -13.976  1.00 19.30           S  \n\
ATOM    471  N   THR C   8       2.691  11.395 -15.898  1.00 22.31           N  \n\
ATOM    472  CA  THR C   8       2.912  11.356 -17.382  1.00 20.22           C  \n\
ATOM    473  C   THR C   8       4.408  11.508 -17.641  1.00 29.24           C  \n\
ATOM    474  O   THR C   8       5.051  10.716 -18.357  1.00 25.27           O  \n\
ATOM    475  CB  THR C   8       1.993  12.487 -17.997  1.00 28.76           C  \n\
ATOM    476  OG1 THR C   8       0.590  12.071 -17.868  1.00 41.93           O  \n\
ATOM    477  CG2 THR C   8       2.536  12.795 -19.370  1.00 39.10           C  \n\
ATOM    478  N   SER C   9       4.957  12.549 -16.969  1.00 23.04           N  \n\
ATOM    479  CA  SER C   9       6.438  12.783 -17.031  1.00 23.81           C  \n\
ATOM    480  C   SER C   9       7.038  12.104 -15.796  1.00 22.97           C  \n\
ATOM    481  O   SER C   9       6.505  11.080 -15.351  1.00 28.36           O  \n\
ATOM    482  CB  SER C   9       6.838  14.249 -17.258  1.00 22.96           C  \n\
ATOM    483  OG  SER C   9       8.266  14.523 -17.319  1.00 30.96           O  \n\
ATOM    484  N   ILE C  10       8.157  12.532 -15.274  1.00 18.48           N  \n\
ATOM    485  CA  ILE C  10       8.820  12.068 -14.116  1.00 14.18           C  \n\
ATOM    486  C   ILE C  10       9.162  13.268 -13.217  1.00 22.06           C  \n\
ATOM    487  O   ILE C  10       9.398  14.336 -13.807  1.00 21.37           O  \n\
ATOM    488  CB  ILE C  10      10.082  11.219 -14.296  1.00 14.27           C  \n\
ATOM    489  CG1 ILE C  10      11.168  12.058 -14.941  1.00 17.05           C  \n\
ATOM    490  CG2 ILE C  10       9.771   9.901 -15.075  1.00 23.12           C  \n\
ATOM    491  CD1 ILE C  10      12.447  11.250 -15.181  1.00 28.86           C  \n\
ATOM    492  N   CYS C  11       9.158  13.001 -11.897  1.00 17.73           N  \n\
ATOM    493  CA  CYS C  11       9.488  14.178 -11.063  1.00 13.63           C  \n\
ATOM    494  C   CYS C  11      10.301  13.733  -9.869  1.00 24.12           C  \n\
ATOM    495  O   CYS C  11      10.238  12.518  -9.595  1.00 27.63           O  \n\
ATOM    496  CB  CYS C  11       8.284  14.934 -10.501  1.00 24.47           C  \n\
ATOM    497  SG  CYS C  11       7.324  13.971  -9.301  1.00 22.60           S  \n\
ATOM    498  N   SER C  12      10.941  14.682  -9.241  1.00 20.64           N  \n\
ATOM    499  CA  SER C  12      11.739  14.434  -8.095  1.00 19.89           C  \n\
ATOM    500  C   SER C  12      10.978  14.612  -6.784  1.00 26.49           C  \n\
ATOM    501  O   SER C  12       9.925  15.241  -6.843  1.00 17.94           O  \n\
ATOM    502  CB  SER C  12      12.896  15.478  -7.911  1.00 22.13           C  \n\
ATOM    503  OG  SER C  12      12.280  16.737  -7.889  1.00 25.55           O  \n\
ATOM    504  N   LEU C  13      11.522  14.165  -5.654  1.00 20.92           N  \n\
ATOM    505  CA  LEU C  13      10.827  14.392  -4.422  1.00 18.59           C  \n\
ATOM    506  C   LEU C  13      10.811  15.860  -4.099  1.00 17.62           C  \n\
ATOM    507  O   LEU C  13       9.865  16.311  -3.427  1.00 17.56           O  \n\
ATOM    508  CB  LEU C  13      11.451  13.616  -3.261  1.00 24.54           C  \n\
ATOM    509  CG  LEU C  13      11.620  12.137  -3.475  1.00 37.60           C  \n\
ATOM    510  CD1 LEU C  13      12.386  11.586  -2.273  1.00 42.94           C  \n\
ATOM    511  CD2 LEU C  13      10.209  11.562  -3.628  1.00 33.13           C  \n\
ATOM    512  N   TYR C  14      11.756  16.642  -4.538  1.00 19.39           N  \n\
ATOM    513  CA  TYR C  14      11.756  18.053  -4.253  1.00 15.81           C  \n\
ATOM    514  C   TYR C  14      10.632  18.665  -4.977  1.00 16.49           C  \n\
ATOM    515  O   TYR C  14      10.098  19.673  -4.517  1.00 24.31           O  \n\
ATOM    516  CB  TYR C  14      13.061  18.792  -4.698  1.00 23.42           C  \n\
ATOM    517  CG  TYR C  14      14.244  18.334  -3.884  1.00 22.68           C  \n\
ATOM    518  CD1 TYR C  14      14.406  18.926  -2.643  1.00 37.43           C  \n\
ATOM    519  CD2 TYR C  14      15.065  17.294  -4.321  1.00 44.52           C  \n\
ATOM    520  CE1 TYR C  14      15.469  18.455  -1.806  1.00 35.18           C  \n\
ATOM    521  CE2 TYR C  14      16.138  16.837  -3.558  1.00 39.13           C  \n\
ATOM    522  CZ  TYR C  14      16.305  17.440  -2.304  1.00 43.24           C  \n\
ATOM    523  OH  TYR C  14      17.325  17.067  -1.472  1.00 40.09           O  \n\
ATOM    524  N   GLN C  15      10.286  18.189  -6.156  1.00 16.44           N  \n\
ATOM    525  CA  GLN C  15       9.175  18.706  -6.908  1.00 13.87           C  \n\
ATOM    526  C   GLN C  15       7.940  18.402  -6.108  1.00 16.45           C  \n\
ATOM    527  O   GLN C  15       7.042  19.228  -6.047  1.00 17.74           O  \n\
ATOM    528  CB  GLN C  15       9.021  18.202  -8.378  1.00 19.83           C  \n\
ATOM    529  CG  GLN C  15      10.045  18.695  -9.368  1.00 27.50           C  \n\
ATOM    530  CD  GLN C  15      10.002  18.165 -10.771  1.00 46.46           C  \n\
ATOM    531  OE1 GLN C  15      10.459  17.057 -11.040  1.00 43.32           O  \n\
ATOM    532  NE2 GLN C  15       9.456  18.889 -11.761  1.00 35.38           N  \n\
ATOM    533  N   LEU C  16       7.841  17.245  -5.491  1.00 18.47           N  \n\
ATOM    534  CA  LEU C  16       6.580  16.984  -4.783  1.00 17.18           C  \n\
ATOM    535  C   LEU C  16       6.311  17.904  -3.587  1.00 21.36           C  \n\
ATOM    536  O   LEU C  16       5.195  18.069  -3.079  1.00 17.34           O  \n\
ATOM    537  CB  LEU C  16       6.542  15.527  -4.227  1.00 17.15           C  \n\
ATOM    538  CG  LEU C  16       6.500  14.520  -5.341  1.00 17.53           C  \n\
ATOM    539  CD1 LEU C  16       6.477  13.227  -4.593  1.00 22.82           C  \n\
ATOM    540  CD2 LEU C  16       5.117  14.493  -5.991  1.00 18.33           C  \n\
ATOM    541  N   GLU C  17       7.389  18.427  -3.040  1.00 16.47           N  \n\
ATOM    542  CA  GLU C  17       7.353  19.319  -1.959  1.00 10.93           C  \n\
ATOM    543  C   GLU C  17       6.614  20.601  -2.282  1.00 11.20           C  \n\
ATOM    544  O   GLU C  17       6.183  21.310  -1.386  1.00 13.69           O  \n\
ATOM    545  CB  GLU C  17       8.751  19.800  -1.584  1.00 16.99           C  \n\
ATOM    546  CG  GLU C  17       9.178  18.980  -0.408  1.00 22.69           C  \n\
ATOM    547  CD  GLU C  17      10.397  19.524   0.269  1.00 26.38           C  \n\
ATOM    548  OE1 GLU C  17      11.270  20.013  -0.342  1.00 26.42           O  \n\
ATOM    549  OE2 GLU C  17      10.358  19.291   1.470  1.00 30.68           O  \n\
ATOM    550  N   ASN C  18       6.466  20.844  -3.575  1.00 13.42           N  \n\
ATOM    551  CA  ASN C  18       5.707  22.010  -4.006  1.00 12.91           C  \n\
ATOM    552  C   ASN C  18       4.238  21.879  -3.683  1.00 14.96           C  \n\
ATOM    553  O   ASN C  18       3.506  22.887  -3.698  1.00 17.72           O  \n\
ATOM    554  CB  ASN C  18       5.894  22.279  -5.506  1.00 16.62           C  \n\
ATOM    555  CG  ASN C  18       7.286  22.755  -5.884  1.00 20.64           C  \n\
ATOM    556  OD1 ASN C  18       7.761  22.375  -6.927  1.00 28.41           O  \n\
ATOM    557  ND2 ASN C  18       7.836  23.540  -4.999  1.00 26.53           N  \n\
ATOM    558  N   TYR C  19       3.683  20.717  -3.420  1.00 10.42           N  \n\
ATOM    559  CA  TYR C  19       2.315  20.489  -3.110  1.00 11.44           C  \n\
ATOM    560  C   TYR C  19       2.035  20.284  -1.641  1.00 19.22           C  \n\
ATOM    561  O   TYR C  19       0.884  20.008  -1.330  1.00 14.52           O  \n\
ATOM    562  CB  TYR C  19       1.745  19.342  -3.938  1.00 13.89           C  \n\
ATOM    563  CG  TYR C  19       1.995  19.579  -5.394  1.00 13.15           C  \n\
ATOM    564  CD1 TYR C  19       1.176  20.360  -6.185  1.00 15.85           C  \n\
ATOM    565  CD2 TYR C  19       3.101  19.022  -6.004  1.00 20.18           C  \n\
ATOM    566  CE1 TYR C  19       1.482  20.590  -7.526  1.00 15.80           C  \n\
ATOM    567  CE2 TYR C  19       3.427  19.257  -7.342  1.00 20.94           C  \n\
ATOM    568  CZ  TYR C  19       2.600  20.077  -8.111  1.00 16.07           C  \n\
ATOM    569  OH  TYR C  19       2.930  20.198  -9.438  1.00 28.20           O  \n\
ATOM    570  N   CYS C  20       2.997  20.523  -0.779  1.00 15.85           N  \n\
ATOM    571  CA  CYS C  20       2.816  20.515   0.660  1.00 12.75           C  \n\
ATOM    572  C   CYS C  20       2.167  21.848   1.080  1.00 18.29           C  \n\
ATOM    573  O   CYS C  20       2.424  22.842   0.449  1.00 26.63           O  \n\
ATOM    574  CB  CYS C  20       4.116  20.329   1.465  1.00 12.02           C  \n\
ATOM    575  SG  CYS C  20       5.109  18.925   1.079  1.00 13.70           S  \n\
ATOM    576  N   ASN C  21       1.396  21.899   2.168  1.00 17.14           N  \n\
ATOM    577  CA  ASN C  21       0.814  23.152   2.677  1.00 22.18           C  \n\
ATOM    578  C   ASN C  21       1.879  23.650   3.681  1.00 31.46           C  \n\
ATOM    579  O   ASN C  21       2.937  22.991   3.836  1.00 44.77           O  \n\
ATOM    580  CB  ASN C  21      -0.433  22.757   3.387  1.00 21.67           C  \n\
ATOM    581  CG  ASN C  21      -1.636  22.166   2.742  1.00 29.17           C  \n\
ATOM    582  OD1 ASN C  21      -2.062  22.468   1.647  1.00 33.63           O  \n\
ATOM    583  ND2 ASN C  21      -2.242  21.277   3.591  1.00 33.21           N  \n\
ATOM    584  OXT ASN C  21       1.575  24.585   4.398  1.00 52.38           O  \n\
TER     585      ASN C  21                                                      \n\
ATOM    586  N   PHE D   1      18.330  11.816  -3.893  1.00 61.50           N  \n\
ATOM    587  CA  PHE D   1      17.047  11.272  -4.371  1.00 28.75           C  \n\
ATOM    588  C   PHE D   1      17.165  10.885  -5.854  1.00 45.77           C  \n\
ATOM    589  O   PHE D   1      18.169  11.137  -6.550  1.00 49.85           O  \n\
ATOM    590  CB  PHE D   1      15.801  12.158  -4.041  1.00 30.01           C  \n\
ATOM    591  CG  PHE D   1      16.035  12.424  -2.571  1.00 31.74           C  \n\
ATOM    592  CD1 PHE D   1      15.980  11.294  -1.745  1.00 39.79           C  \n\
ATOM    593  CD2 PHE D   1      16.425  13.629  -2.070  1.00 31.26           C  \n\
ATOM    594  CE1 PHE D   1      16.219  11.375  -0.405  1.00 31.66           C  \n\
ATOM    595  CE2 PHE D   1      16.706  13.719  -0.715  1.00 53.74           C  \n\
ATOM    596  CZ  PHE D   1      16.609  12.612   0.115  1.00 37.15           C  \n\
ATOM    597  N   VAL D   2      16.117  10.168  -6.274  1.00 33.71           N  \n\
ATOM    598  CA  VAL D   2      16.006   9.666  -7.682  1.00 24.16           C  \n\
ATOM    599  C   VAL D   2      14.648  10.218  -8.239  1.00 33.79           C  \n\
ATOM    600  O   VAL D   2      13.733  10.588  -7.495  1.00 22.26           O  \n\
ATOM    601  CB  VAL D   2      16.128   8.144  -7.911  1.00 27.80           C  \n\
ATOM    602  CG1 VAL D   2      17.529   7.562  -7.875  1.00 85.81           C  \n\
ATOM    603  CG2 VAL D   2      15.239   7.326  -6.976  1.00 36.43           C  \n\
ATOM    604  N   ASN D   3      14.564  10.315  -9.558  1.00 19.91           N  \n\
ATOM    605  CA  ASN D   3      13.383  10.694 -10.332  1.00 33.51           C  \n\
ATOM    606  C   ASN D   3      12.449   9.525 -10.618  1.00 27.19           C  \n\
ATOM    607  O   ASN D   3      12.946   8.479 -11.058  1.00 35.28           O  \n\
ATOM    608  CB  ASN D   3      13.966  11.427 -11.571  1.00 28.03           C  \n\
ATOM    609  CG  ASN D   3      14.214  12.869 -11.102  1.00 36.72           C  \n\
ATOM    610  OD1 ASN D   3      14.425  13.813 -11.829  1.00 71.83           O  \n\
ATOM    611  ND2 ASN D   3      14.114  13.118  -9.791  1.00 69.95           N  \n\
ATOM    612  N   GLN D   4      11.128   9.652 -10.488  1.00 38.71           N  \n\
ATOM    613  CA  GLN D   4      10.224   8.523 -10.782  1.00 30.37           C  \n\
ATOM    614  C   GLN D   4       8.833   8.864 -11.345  1.00 13.92           C  \n\
ATOM    615  O   GLN D   4       8.361  10.028 -11.197  1.00 25.56           O  \n\
ATOM    616  CB  GLN D   4       9.983   7.921  -9.378  1.00 38.84           C  \n\
ATOM    617  CG  GLN D   4      10.350   6.429  -9.194  1.00 40.71           C  \n\
ATOM    618  CD  GLN D   4      10.515   6.248  -7.678  1.00 31.29           C  \n\
ATOM    619  OE1 GLN D   4      10.490   5.138  -7.268  1.00 47.62           O  \n\
ATOM    620  NE2 GLN D   4      10.697   7.383  -6.997  1.00 30.17           N  \n\
ATOM    621  N   HIS D   5       8.291   7.803 -12.000  1.00 13.87           N  \n\
ATOM    622  CA  HIS D   5       6.903   7.919 -12.482  1.00 16.22           C  \n\
ATOM    623  C   HIS D   5       6.029   7.528 -11.252  1.00 16.61           C  \n\
ATOM    624  O   HIS D   5       6.115   6.355 -10.822  1.00 21.77           O  \n\
ATOM    625  CB  HIS D   5       6.427   7.086 -13.663  1.00 24.93           C  \n\
ATOM    626  CG  HIS D   5       6.855   7.450 -15.054  1.00 32.91           C  \n\
ATOM    627  ND1 HIS D   5       6.285   8.338 -15.876  1.00 31.86           N  \n\
ATOM    628  CD2 HIS D   5       7.867   6.966 -15.822  1.00 31.55           C  \n\
ATOM    629  CE1 HIS D   5       6.866   8.458 -17.068  1.00 28.50           C  \n\
ATOM    630  NE2 HIS D   5       7.838   7.587 -17.015  1.00 18.29           N  \n\
ATOM    631  N   LEU D   6       5.259   8.452 -10.792  1.00 11.23           N  \n\
ATOM    632  CA  LEU D   6       4.302   8.232  -9.639  1.00 22.97           C  \n\
ATOM    633  C   LEU D   6       2.854   8.566 -10.048  1.00 11.62           C  \n\
ATOM    634  O   LEU D   6       2.505   9.705 -10.335  1.00 14.32           O  \n\
ATOM    635  CB  LEU D   6       4.815   9.069  -8.489  1.00 16.96           C  \n\
ATOM    636  CG  LEU D   6       6.253   8.828  -7.985  1.00 18.92           C  \n\
ATOM    637  CD1 LEU D   6       6.828  10.000  -7.271  1.00 17.11           C  \n\
ATOM    638  CD2 LEU D   6       6.091   7.594  -7.091  1.00 18.40           C  \n\
ATOM    639  N   CYS D   7       2.119   7.495 -10.108  1.00 13.70           N  \n\
ATOM    640  CA  CYS D   7       0.745   7.570 -10.582  1.00 18.64           C  \n\
ATOM    641  C   CYS D   7      -0.288   7.058  -9.564  1.00 17.90           C  \n\
ATOM    642  O   CYS D   7       0.016   6.138  -8.853  1.00 18.63           O  \n\
ATOM    643  CB  CYS D   7       0.607   6.723 -11.869  1.00 31.44           C  \n\
ATOM    644  SG  CYS D   7       1.635   7.350 -13.232  1.00 20.00           S  \n\
ATOM    645  N   GLY D   8      -1.440   7.618  -9.644  1.00 19.94           N  \n\
ATOM    646  CA  GLY D   8      -2.580   7.155  -8.776  1.00 18.12           C  \n\
ATOM    647  C   GLY D   8      -2.305   7.237  -7.329  1.00  8.63           C  \n\
ATOM    648  O   GLY D   8      -1.914   8.246  -6.763  1.00 13.74           O  \n\
ATOM    649  N   SER D   9      -2.656   6.101  -6.694  1.00 11.65           N  \n\
ATOM    650  CA  SER D   9      -2.483   5.997  -5.227  1.00 12.39           C  \n\
ATOM    651  C   SER D   9      -1.032   6.120  -4.867  1.00  8.86           C  \n\
ATOM    652  O   SER D   9      -0.760   6.584  -3.762  1.00  9.84           O  \n\
ATOM    653  CB  SER D   9      -3.264   4.870  -4.568  1.00 14.54           C  \n\
ATOM    654  OG  SER D   9      -2.756   3.670  -5.015  1.00 21.40           O  \n\
ATOM    655  N   HIS D  10      -0.166   5.698  -5.800  1.00  8.91           N  \n\
ATOM    656  CA  HIS D  10       1.270   5.805  -5.452  1.00  9.09           C  \n\
ATOM    657  C   HIS D  10       1.755   7.227  -5.317  1.00  7.69           C  \n\
ATOM    658  O   HIS D  10       2.658   7.481  -4.533  1.00 11.42           O  \n\
ATOM    659  CB  HIS D  10       2.092   5.048  -6.482  1.00  8.95           C  \n\
ATOM    660  CG  HIS D  10       1.707   3.599  -6.615  1.00  8.78           C  \n\
ATOM    661  ND1 HIS D  10       1.951   2.701  -5.608  1.00 13.99           N  \n\
ATOM    662  CD2 HIS D  10       1.059   2.922  -7.561  1.00 11.16           C  \n\
ATOM    663  CE1 HIS D  10       1.536   1.530  -6.025  1.00  8.79           C  \n\
ATOM    664  NE2 HIS D  10       0.948   1.628  -7.159  1.00 11.60           N  \n\
ATOM    665  N   LEU D  11       1.142   8.109  -6.070  1.00  9.45           N  \n\
ATOM    666  CA  LEU D  11       1.434   9.541  -6.053  1.00  9.98           C  \n\
ATOM    667  C   LEU D  11       1.027  10.155  -4.729  1.00  5.91           C  \n\
ATOM    668  O   LEU D  11       1.818  10.853  -4.084  1.00  8.83           O  \n\
ATOM    669  CB  LEU D  11       0.815  10.196  -7.249  1.00 10.51           C  \n\
ATOM    670  CG  LEU D  11       1.105  11.705  -7.294  1.00 13.37           C  \n\
ATOM    671  CD1 LEU D  11       2.526  12.118  -7.270  1.00 11.72           C  \n\
ATOM    672  CD2 LEU D  11       0.404  12.225  -8.564  1.00 16.22           C  \n\
ATOM    673  N   VAL D  12      -0.188   9.816  -4.302  1.00  6.52           N  \n\
ATOM    674  CA  VAL D  12      -0.534  10.395  -2.938  1.00  6.95           C  \n\
ATOM    675  C   VAL D  12       0.207   9.758  -1.787  1.00  5.55           C  \n\
ATOM    676  O   VAL D  12       0.467  10.475  -0.761  1.00  8.60           O  \n\
ATOM    677  CB  VAL D  12      -2.065  10.355  -2.790  1.00 14.07           C  \n\
ATOM    678  CG1 VAL D  12      -2.687  11.271  -3.899  1.00 16.64           C  \n\
ATOM    679  CG2 VAL D  12      -2.636   9.010  -2.737  1.00 14.03           C  \n\
ATOM    680  N   GLU D  13       0.681   8.537  -1.890  1.00  8.61           N  \n\
ATOM    681  CA  GLU D  13       1.509   7.903  -0.866  1.00  7.25           C  \n\
ATOM    682  C   GLU D  13       2.815   8.631  -0.804  1.00  7.02           C  \n\
ATOM    683  O   GLU D  13       3.403   8.915   0.274  1.00 11.89           O  \n\
ATOM    684  CB  GLU D  13       1.770   6.435  -1.051  1.00 11.84           C  \n\
ATOM    685  CG  GLU D  13       0.458   5.634  -0.816  1.00 27.71           C  \n\
ATOM    686  CD  GLU D  13       0.536   4.937   0.492  1.00 62.15           C  \n\
ATOM    687  OE1 GLU D  13       1.499   5.094   1.172  1.00 28.12           O  \n\
ATOM    688  OE2 GLU D  13      -0.429   4.258   0.726  1.00 32.97           O  \n\
ATOM    689  N   ALA D  14       3.390   9.046  -1.888  1.00  9.58           N  \n\
ATOM    690  CA  ALA D  14       4.643   9.836  -1.985  1.00 10.00           C  \n\
ATOM    691  C   ALA D  14       4.495  11.218  -1.377  1.00 10.02           C  \n\
ATOM    692  O   ALA D  14       5.373  11.718  -0.675  1.00 12.34           O  \n\
ATOM    693  CB  ALA D  14       5.151   9.884  -3.366  1.00  9.23           C  \n\
ATOM    694  N   LEU D  15       3.340  11.836  -1.609  1.00  8.93           N  \n\
ATOM    695  CA  LEU D  15       3.014  13.121  -1.053  1.00  9.97           C  \n\
ATOM    696  C   LEU D  15       2.968  13.020   0.450  1.00 16.23           C  \n\
ATOM    697  O   LEU D  15       3.462  13.914   1.142  1.00 11.63           O  \n\
ATOM    698  CB  LEU D  15       1.719  13.654  -1.641  1.00  9.29           C  \n\
ATOM    699  CG  LEU D  15       1.771  14.340  -2.979  1.00 10.49           C  \n\
ATOM    700  CD1 LEU D  15       0.398  14.483  -3.556  1.00 12.99           C  \n\
ATOM    701  CD2 LEU D  15       2.487  15.663  -2.804  1.00 15.87           C  \n\
ATOM    702  N   TYR D  16       2.313  11.974   0.938  1.00 11.90           N  \n\
ATOM    703  CA  TYR D  16       2.254  11.791   2.374  1.00  8.84           C  \n\
ATOM    704  C   TYR D  16       3.662  11.710   3.013  1.00 11.08           C  \n\
ATOM    705  O   TYR D  16       3.925  12.338   4.014  1.00 10.74           O  \n\
ATOM    706  CB  TYR D  16       1.409  10.545   2.657  1.00  8.68           C  \n\
ATOM    707  CG  TYR D  16       1.408  10.201   4.150  1.00  9.93           C  \n\
ATOM    708  CD1 TYR D  16       0.611  10.879   5.091  1.00 13.27           C  \n\
ATOM    709  CD2 TYR D  16       2.232   9.163   4.535  1.00 10.34           C  \n\
ATOM    710  CE1 TYR D  16       0.657  10.554   6.429  1.00 11.61           C  \n\
ATOM    711  CE2 TYR D  16       2.284   8.846   5.894  1.00 17.86           C  \n\
ATOM    712  CZ  TYR D  16       1.518   9.554   6.843  1.00 13.23           C  \n\
ATOM    713  OH  TYR D  16       1.664   9.081   8.177  1.00 17.80           O  \n\
ATOM    714  N   LEU D  17       4.478  10.910   2.349  1.00  9.51           N  \n\
ATOM    715  CA  LEU D  17       5.832  10.719   2.819  1.00  8.94           C  \n\
ATOM    716  C   LEU D  17       6.672  11.993   2.879  1.00 12.51           C  \n\
ATOM    717  O   LEU D  17       7.395  12.298   3.853  1.00 13.68           O  \n\
ATOM    718  CB  LEU D  17       6.573   9.683   1.932  1.00 12.01           C  \n\
ATOM    719  CG  LEU D  17       7.784   9.141   2.606  1.00 26.75           C  \n\
ATOM    720  CD1 LEU D  17       7.274   8.084   3.613  1.00 27.77           C  \n\
ATOM    721  CD2 LEU D  17       8.533   8.579   1.435  1.00 36.25           C  \n\
ATOM    722  N   VAL D  18       6.585  12.773   1.784  1.00 10.21           N  \n\
ATOM    723  CA  VAL D  18       7.348  14.029   1.661  1.00  8.25           C  \n\
ATOM    724  C   VAL D  18       6.789  15.099   2.514  1.00  8.01           C  \n\
ATOM    725  O   VAL D  18       7.560  15.914   3.063  1.00 14.17           O  \n\
ATOM    726  CB  VAL D  18       7.357  14.409   0.176  1.00  8.24           C  \n\
ATOM    727  CG1 VAL D  18       7.683  15.903   0.006  1.00 18.17           C  \n\
ATOM    728  CG2 VAL D  18       8.321  13.582  -0.638  1.00 16.22           C  \n\
ATOM    729  N   CYS D  19       5.469  15.224   2.565  1.00  8.80           N  \n\
ATOM    730  CA  CYS D  19       4.790  16.327   3.282  1.00 10.89           C  \n\
ATOM    731  C   CYS D  19       4.550  16.076   4.760  1.00 20.41           C  \n\
ATOM    732  O   CYS D  19       4.771  17.057   5.513  1.00 17.13           O  \n\
ATOM    733  CB  CYS D  19       3.540  16.778   2.546  1.00 11.71           C  \n\
ATOM    734  SG  CYS D  19       3.846  17.363   0.909  1.00 11.30           S  \n\
ATOM    735  N   GLY D  20       4.108  14.860   5.076  1.00 15.31           N  \n\
ATOM    736  CA  GLY D  20       3.841  14.553   6.475  1.00 18.10           C  \n\
ATOM    737  C   GLY D  20       2.815  15.479   7.177  1.00 19.19           C  \n\
ATOM    738  O   GLY D  20       1.669  15.721   6.770  1.00 18.72           O  \n\
ATOM    739  N   GLU D  21       3.387  15.976   8.278  1.00 20.01           N  \n\
ATOM    740  CA  GLU D  21       2.659  16.847   9.244  1.00 23.69           C  \n\
ATOM    741  C   GLU D  21       2.237  18.138   8.636  1.00 19.09           C  \n\
ATOM    742  O   GLU D  21       1.246  18.727   9.109  1.00 24.03           O  \n\
ATOM    743  CB  GLU D  21       3.575  17.120  10.476  1.00 22.76           C  \n\
ATOM    744  CG  GLU D  21       5.075  17.192  10.046  1.00 53.97           C  \n\
ATOM    745  CD  GLU D  21       6.099  17.832  10.938  1.00 78.86           C  \n\
ATOM    746  OE1 GLU D  21       5.775  18.563  11.863  1.00 73.07           O  \n\
ATOM    747  OE2 GLU D  21       7.300  17.568  10.645  1.00 72.74           O  \n\
ATOM    748  N   ARG D  22       2.952  18.555   7.566  1.00 15.75           N  \n\
ATOM    749  CA  ARG D  22       2.552  19.835   6.996  1.00 21.02           C  \n\
ATOM    750  C   ARG D  22       1.231  19.779   6.228  1.00 30.79           C  \n\
ATOM    751  O   ARG D  22       0.558  20.740   5.955  1.00 22.02           O  \n\
ATOM    752  CB  ARG D  22       3.613  20.247   5.973  1.00 29.63           C  \n\
ATOM    753  CG  ARG D  22       5.024  20.325   6.450  1.00 16.81           C  \n\
ATOM    754  CD  ARG D  22       5.952  20.706   5.309  1.00 32.57           C  \n\
ATOM    755  NE AARG D  22       5.584  21.912   4.554  0.50 23.88           N  \n\
ATOM    756  NE BARG D  22       6.663  19.518   4.827  0.50 24.77           N  \n\
ATOM    757  CZ AARG D  22       6.163  22.431   3.476  0.50 34.85           C  \n\
ATOM    758  CZ BARG D  22       7.482  19.684   3.777  0.50 11.98           C  \n\
ATOM    759  NH1AARG D  22       5.819  23.547   2.845  0.50 18.26           N  \n\
ATOM    760  NH1BARG D  22       7.547  20.848   3.124  0.50 20.33           N  \n\
ATOM    761  NH2AARG D  22       7.190  21.770   2.930  0.50 20.80           N  \n\
ATOM    762  NH2BARG D  22       8.196  18.646   3.318  0.50 20.38           N  \n\
ATOM    763  N   GLY D  23       0.914  18.555   5.836  1.00 17.93           N  \n\
ATOM    764  CA  GLY D  23      -0.237  18.302   4.993  1.00 12.82           C  \n\
ATOM    765  C   GLY D  23       0.087  18.615   3.514  1.00 11.10           C  \n\
ATOM    766  O   GLY D  23       1.137  19.102   3.198  1.00 12.49           O  \n\
ATOM    767  N   PHE D  24      -0.903  18.290   2.672  1.00 11.76           N  \n\
ATOM    768  CA  PHE D  24      -0.774  18.497   1.209  1.00 10.21           C  \n\
ATOM    769  C   PHE D  24      -2.127  18.688   0.607  1.00  9.65           C  \n\
ATOM    770  O   PHE D  24      -3.142  18.470   1.204  1.00 12.03           O  \n\
ATOM    771  CB  PHE D  24       0.000  17.400   0.578  1.00  9.41           C  \n\
ATOM    772  CG  PHE D  24      -0.602  16.046   0.597  1.00  9.89           C  \n\
ATOM    773  CD1 PHE D  24      -0.280  15.182   1.648  1.00 12.55           C  \n\
ATOM    774  CD2 PHE D  24      -1.497  15.657  -0.387  1.00 12.14           C  \n\
ATOM    775  CE1 PHE D  24      -0.863  13.901   1.714  1.00 19.03           C  \n\
ATOM    776  CE2 PHE D  24      -2.049  14.388  -0.368  1.00 12.53           C  \n\
ATOM    777  CZ  PHE D  24      -1.737  13.486   0.692  1.00 14.23           C  \n\
ATOM    778  N   PHE D  25      -2.070  19.069  -0.693  1.00  8.89           N  \n\
ATOM    779  CA  PHE D  25      -3.285  19.185  -1.469  1.00 10.03           C  \n\
ATOM    780  C   PHE D  25      -3.021  18.326  -2.724  1.00  9.84           C  \n\
ATOM    781  O   PHE D  25      -1.918  18.362  -3.216  1.00 12.46           O  \n\
ATOM    782  CB  PHE D  25      -3.686  20.613  -1.925  1.00 10.32           C  \n\
ATOM    783  CG  PHE D  25      -2.567  21.455  -2.479  1.00 14.41           C  \n\
ATOM    784  CD1 PHE D  25      -2.435  21.546  -3.850  1.00 20.47           C  \n\
ATOM    785  CD2 PHE D  25      -1.647  22.070  -1.651  1.00 14.83           C  \n\
ATOM    786  CE1 PHE D  25      -1.470  22.321  -4.476  1.00 13.89           C  \n\
ATOM    787  CE2 PHE D  25      -0.608  22.775  -2.271  1.00 20.12           C  \n\
ATOM    788  CZ  PHE D  25      -0.558  22.880  -3.660  1.00 13.72           C  \n\
ATOM    789  N   TYR D  26      -3.962  17.546  -3.192  1.00 10.77           N  \n\
ATOM    790  CA  TYR D  26      -3.915  16.723  -4.366  1.00  8.24           C  \n\
ATOM    791  C   TYR D  26      -5.013  17.222  -5.272  1.00 11.68           C  \n\
ATOM    792  O   TYR D  26      -6.209  17.040  -5.011  1.00 12.49           O  \n\
ATOM    793  CB  TYR D  26      -4.090  15.233  -4.010  1.00 12.91           C  \n\
ATOM    794  CG  TYR D  26      -4.159  14.291  -5.196  1.00 13.37           C  \n\
ATOM    795  CD1 TYR D  26      -5.379  13.599  -5.455  1.00 12.94           C  \n\
ATOM    796  CD2 TYR D  26      -3.138  14.227  -6.110  1.00 12.82           C  \n\
ATOM    797  CE1 TYR D  26      -5.491  12.770  -6.582  1.00 18.45           C  \n\
ATOM    798  CE2 TYR D  26      -3.289  13.401  -7.216  1.00 14.97           C  \n\
ATOM    799  CZ  TYR D  26      -4.390  12.679  -7.390  1.00 16.87           C  \n\
ATOM    800  OH  TYR D  26      -4.411  11.849  -8.508  1.00 19.99           O  \n\
ATOM    801  N   THR D  27      -4.639  17.933  -6.342  1.00 10.07           N  \n\
ATOM    802  CA  THR D  27      -5.563  18.555  -7.264  1.00 15.24           C  \n\
ATOM    803  C   THR D  27      -5.254  18.120  -8.704  1.00 16.10           C  \n\
ATOM    804  O   THR D  27      -4.545  18.821  -9.404  1.00 18.07           O  \n\
ATOM    805  CB  THR D  27      -5.536  20.114  -7.048  1.00 16.40           C  \n\
ATOM    806  OG1 THR D  27      -4.178  20.585  -6.974  1.00 19.93           O  \n\
ATOM    807  CG2 THR D  27      -6.181  20.408  -5.709  1.00 16.74           C  \n\
ATOM    808  N   PRO D  28      -5.766  17.035  -9.149  1.00 11.98           N  \n\
ATOM    809  CA  PRO D  28      -5.571  16.537 -10.477  1.00 13.55           C  \n\
ATOM    810  C   PRO D  28      -6.105  17.452 -11.585  1.00 21.64           C  \n\
ATOM    811  O   PRO D  28      -5.471  17.453 -12.635  1.00 24.41           O  \n\
ATOM    812  CB  PRO D  28      -6.192  15.163 -10.479  1.00 21.77           C  \n\
ATOM    813  CG  PRO D  28      -6.813  14.874  -9.135  1.00 18.60           C  \n\
ATOM    814  CD  PRO D  28      -6.687  16.109  -8.343  1.00 11.54           C  \n\
ATOM    815  N   LYS D  29      -7.103  18.249 -11.346  1.00 18.85           N  \n\
ATOM    816  CA  LYS D  29      -7.647  19.148 -12.397  1.00 21.86           C  \n\
ATOM    817  C   LYS D  29      -6.782  20.313 -12.719  1.00 25.32           C  \n\
ATOM    818  O   LYS D  29      -6.944  20.988 -13.739  1.00 28.67           O  \n\
ATOM    819  CB  LYS D  29      -9.020  19.689 -11.971  1.00 37.73           C  \n\
ATOM    820  CG ALYS D  29     -10.118  18.678 -12.365  0.50 26.24           C  \n\
ATOM    821  CG BLYS D  29      -9.869  20.535 -12.933  0.50 51.60           C  \n\
ATOM    822  CD ALYS D  29     -11.261  18.659 -11.369  0.50 25.69           C  \n\
ATOM    823  CD BLYS D  29     -11.094  21.211 -12.318  0.50 26.73           C  \n\
ATOM    824  CE ALYS D  29     -12.315  17.615 -11.670  0.50 22.42           C  \n\
ATOM    825  CE BLYS D  29     -12.076  21.723 -13.345  0.50 41.26           C  \n\
ATOM    826  NZ ALYS D  29     -13.648  18.108 -11.182  0.50 39.07           N  \n\
ATOM    827  NZ BLYS D  29     -13.280  22.348 -12.731  0.50 38.89           N  \n\
ATOM    828  N   ALA D  30      -5.874  20.552 -11.809  1.00 17.54           N  \n\
ATOM    829  CA  ALA D  30      -5.022  21.709 -11.876  1.00 15.58           C  \n\
ATOM    830  C   ALA D  30      -3.942  21.534 -12.910  1.00 35.26           C  \n\
ATOM    831  O   ALA D  30      -3.347  20.451 -13.025  1.00 37.09           O  \n\
ATOM    832  CB  ALA D  30      -4.392  21.978 -10.527  1.00 32.86           C  \n\
ATOM    833  OXT ALA D  30      -3.822  22.597 -13.538  1.00 43.22           O  \n\
TER     834      ALA D  30                                                      \n\
HETATM  835 ZN    ZN B  31      -0.002  -0.004   7.891  0.33 10.40          ZN  \n\
HETATM  836 ZN    ZN D  31       0.000   0.000  -8.039  0.33 11.00          ZN  \n\
HETATM  837  O   HOH A  22      -9.600  22.800   0.340  1.00 86.30           O  \n\
HETATM  838  O   HOH A  23     -11.312  20.399   0.771  1.00 76.27           O  \n\
HETATM  839  O   HOH A  24     -12.203  23.328   2.558  0.50 53.25           O  \n\
HETATM  840  O   HOH A  25      -5.500  23.300   3.200  1.00 76.30           O  \n\
HETATM  841  O   HOH A  26     -10.414  20.888   3.177  1.00 46.17           O  \n\
HETATM  842  O   HOH A  27      -9.814  18.858  10.172  0.50 36.40           O  \n\
HETATM  843  O   HOH A  28      -5.367   9.301  10.390  1.00 29.29           O  \n\
HETATM  844  O   HOH A  29      -7.077  17.022  11.114  1.00 24.63           O  \n\
HETATM  845  O   HOH A  30      -1.805  14.585  13.563  1.00 36.72           O  \n\
HETATM  846  O   HOH A  31      -8.655  24.051   2.000  1.00 56.40           O  \n\
HETATM  847  O   HOH A  32      -7.400  20.900  13.300  1.00 82.49           O  \n\
HETATM  848  O   HOH A  33     -10.436  21.800  14.703  1.00 82.89           O  \n\
HETATM  849  O   HOH A  34      -8.811  19.800  14.800  1.00 84.33           O  \n\
HETATM  850  O   HOH A  35      -1.885  13.663  16.148  1.00 61.43           O  \n\
HETATM  851  O   HOH A  36     -11.760  21.100  16.700  0.50 40.14           O  \n\
HETATM  852  O   HOH A  37      -8.270  20.622  17.537  0.50 29.13           O  \n\
HETATM  853  O   HOH A  38      -7.800  16.300  17.668  1.00 75.77           O  \n\
HETATM  854  O   HOH A  39      -8.894  18.338  17.943  1.00 51.71           O  \n\
HETATM  855  O   HOH B  62      -0.463   3.085   2.990  1.00 35.04           O  \n\
HETATM  856  O   HOH B 101      -9.400  22.600   4.900  0.50 52.19           O  \n\
HETATM  857  O   HOH B 111      -7.624  16.101   5.527  1.00 25.99           O  \n\
HETATM  858  O   HOH B 122      -9.100  20.600   6.100  0.50 60.00           O  \n\
HETATM  859  O   HOH B 123      -8.768  19.973   5.675  0.50 51.16           O  \n\
HETATM  860  O   HOH B 132      -7.991  22.590   6.582  0.50 57.20           O  \n\
HETATM  861  O   HOH B 133     -12.272  21.574   6.100  1.00 55.48           O  \n\
HETATM  862  O   HOH B 156      -9.484  23.456   7.067  0.50 41.28           O  \n\
HETATM  863  O   HOH B 161       1.228   4.480   7.603  1.00 34.42           O  \n\
HETATM  864  O   HOH B 166       5.794  10.580   7.551  0.50 18.82           O  \n\
HETATM  865  O   HOH B 171      -3.193  10.008   8.356  1.00 20.33           O  \n\
HETATM  866  O   HOH B 172       3.540   5.186   7.514  1.00 50.94           O  \n\
HETATM  867  O   HOH B 181       3.162  12.350   8.534  1.00 60.02           O  \n\
HETATM  868  O   HOH B 186       5.402   7.037   8.018  1.00 76.30           O  \n\
HETATM  869  O   HOH B 191      -9.443  20.240   8.418  0.50 46.63           O  \n\
HETATM  870  O   HOH B 201      -0.074   1.535   9.452  1.00 25.97           O  \n\
HETATM  871  O   HOH B 203       0.475  13.399   9.000  1.00 61.33           O  \n\
HETATM  872  O   HOH B 207      -8.473  18.398   9.204  0.50 34.10           O  \n\
HETATM  873  O   HOH B 209       4.832  22.586  10.697  0.50 41.13           O  \n\
HETATM  874  O   HOH B 211       4.499   3.274   9.801  1.00 21.36           O  \n\
HETATM  875  O   HOH B 219      -9.503  22.800  10.020  0.50 40.98           O  \n\
HETATM  876  O   HOH B 223       3.402  22.242  10.235  0.50 38.69           O  \n\
HETATM  877  O   HOH B 227     -11.769  21.611  10.650  0.50 56.71           O  \n\
HETATM  878  O   HOH B 228      -9.990  20.281  10.186  0.50 56.19           O  \n\
HETATM  879  O   HOH B 234      -8.631  22.492  11.840  0.50 43.99           O  \n\
HETATM  880  O   HOH B 243      -6.059  22.694  11.492  1.00 61.96           O  \n\
HETATM  881  O   HOH B 244       2.400   0.700  11.139  1.00 63.37           O  \n\
HETATM  882  O   HOH B 246       0.589  13.731  11.296  0.50 60.20           O  \n\
HETATM  883  O   HOH B 247      -0.216  11.635  11.240  0.50 52.12           O  \n\
HETATM  884  O   HOH B 249       3.575  13.150  11.256  0.50 53.19           O  \n\
HETATM  885  O   HOH B 251      -0.023  -0.033  11.206  0.33 21.05           O  \n\
HETATM  886  O   HOH B 254      -5.435  20.514  11.630  1.00 51.70           O  \n\
HETATM  887  O   HOH B 261      -1.821   8.684  12.044  1.00 36.04           O  \n\
HETATM  888  O   HOH B 271       6.250  11.753  12.889  1.00 50.22           O  \n\
HETATM  889  O   HOH B 275       4.207  21.400  12.867  0.50 42.63           O  \n\
HETATM  890  O   HOH B 284       4.989  14.660  13.137  1.00 52.11           O  \n\
HETATM  891  O   HOH B 285      -3.059  10.929  12.998  0.50 54.91           O  \n\
HETATM  892  O   HOH B 288      -2.700  22.200  12.300  1.00 69.61           O  \n\
HETATM  893  O   HOH B 291       7.840  13.593  13.240  1.00 36.77           O  \n\
HETATM  894  O   HOH B 296       1.000  16.700  13.200  1.00 45.00           O  \n\
HETATM  895  O   HOH B 297      -1.841   2.626  14.104  1.00 47.47           O  \n\
HETATM  896  O   HOH B 299       3.947  18.704  13.926  0.50 87.22           O  \n\
HETATM  897  O   HOH B 305       0.063   7.371  13.477  0.50 44.43           O  \n\
HETATM  898  O   HOH B 321      -0.629   5.214  14.504  1.00 52.63           O  \n\
HETATM  899  O   HOH B 322       4.331  21.351  15.200  1.00 48.37           O  \n\
HETATM  900  O   HOH B 331      -3.496  10.462  15.323  1.00 41.57           O  \n\
HETATM  901  O   HOH B 344      -3.119  22.865  15.776  1.00 59.24           O  \n\
HETATM  902  O   HOH B 362      -3.814  12.169  17.184  1.00 40.38           O  \n\
HETATM  903  O   HOH B 367      -0.459  10.100  16.800  1.00 96.03           O  \n\
HETATM  904  O   HOH B 368      -5.600  22.740  16.755  0.50 60.98           O  \n\
HETATM  905  O   HOH B 374      -1.700  21.227  17.206  1.00 50.32           O  \n\
HETATM  906  O   HOH B 376      -7.614  21.771  17.400  0.50 39.65           O  \n\
HETATM  907  O   HOH B 381       4.677  20.377  17.882  1.00 49.25           O  \n\
HETATM  908  O   HOH B 383      -2.265   8.874  17.970  1.00 48.81           O  \n\
HETATM  909  O   HOH B 401      -4.837  15.671  19.009  1.00 33.67           O  \n\
HETATM  910  O   HOH B 402      -1.199  22.838  19.138  1.00 36.10           O  \n\
HETATM  911  O   HOH B 403       1.686  21.194  18.890  1.00 36.62           O  \n\
HETATM  912  O   HOH B 411      -5.300  12.855  19.148  1.00 51.00           O  \n\
HETATM  913  O   HOH B 421       4.304  23.913   8.300  1.00 56.36           O  \n\
HETATM  914  O   HOH B 425      -9.409  23.116  19.633  1.00 66.30           O  \n\
HETATM  915  O   HOH B 447       3.848  22.050  20.436  1.00 73.68           O  \n\
HETATM  916  O   HOH B 451      -5.648  12.110  21.371  1.00 36.62           O  \n\
HETATM  917  O   HOH B 453      -3.499   9.530  21.143  1.00 58.40           O  \n\
HETATM  918  O   HOH B 461      -2.438  17.554  21.488  1.00 27.54           O  \n\
HETATM  919  O   HOH B 491       1.801  22.097  22.791  1.00 33.66           O  \n\
HETATM  920  O   HOH B 492      -2.158  10.172  22.900  1.00 34.73           O  \n\
HETATM  921  O   HOH B 512      -6.414  11.027  24.091  1.00 36.40           O  \n\
HETATM  922  O   HOH B 515     -12.014  22.141  24.296  1.00 66.63           O  \n\
HETATM  923  O   HOH B 517      -9.519  22.726  24.412  1.00 71.89           O  \n\
HETATM  924  O   HOH B 531      -1.763  20.077  25.007  1.00 21.36           O  \n\
HETATM  925  O   HOH B 532      -8.670  18.367  25.265  1.00 27.41           O  \n\
HETATM  926  O   HOH B 536      -2.718  10.300  25.150  1.00 73.39           O  \n\
HETATM  927  O   HOH B 541      -1.293  22.963  25.513  1.00 29.91           O  \n\
HETATM  928  O   HOH B 563     -10.096  20.400  26.037  1.00 73.01           O  \n\
HETATM  929  O   HOH B 571      -9.600  23.170  26.887  1.00 62.82           O  \n\
HETATM  930  O   HOH B 591      -1.739  18.453  27.705  1.00 12.21           O  \n\
HETATM  931  O   HOH B 673     -11.700  22.918  32.100  1.00 83.01           O  \n\
HETATM  932  O   HOH C  22      13.443  19.181   0.629  1.00 37.18           O  \n\
HETATM  933  O   HOH C  23      14.910  22.149   0.107  1.00 64.34           O  \n\
HETATM  934  O   HOH C  24      15.228  18.988   2.773  1.00 47.95           O  \n\
HETATM  935  O   HOH C  25      14.487  19.051   4.963  0.50 47.26           O  \n\
HETATM  936  O   HOH C  26      -2.652  21.385   6.534  1.00 64.51           O  \n\
HETATM  937  O   HOH C  27      -2.600  23.100   8.100  0.50 37.93           O  \n\
HETATM  938  O   HOH C  28      15.038  21.545   5.268  1.00 55.92           O  \n\
HETATM  939  O   HOH C  29       6.358  23.611  -0.018  1.00 94.84           O  \n\
HETATM  940  O   HOH D  32       1.208   0.917  -0.239  1.00 44.11           O  \n\
HETATM  941  O   HOH D  33      26.674   0.029   0.118  1.00 64.26           O  \n\
HETATM  942  O   HOH D  34       8.897  22.662   0.833  0.50 72.59           O  \n\
HETATM  943  O   HOH D  35       5.430   4.632   0.353  0.50 68.27           O  \n\
HETATM  944  O   HOH D  36      10.779  23.846   1.400  0.50 44.66           O  \n\
HETATM  945  O   HOH D  37       3.208   6.718   2.188  1.00 44.14           O  \n\
HETATM  946  O   HOH D  38       1.948   1.415   2.000  1.00 83.31           O  \n\
HETATM  947  O   HOH D  39       3.289   3.437   2.898  1.00 29.40           O  \n\
HETATM  948  O   HOH D  40      10.311  22.834   3.121  0.50 53.93           O  \n\
HETATM  949  O   HOH D  41      10.183  24.198   3.002  0.50 47.80           O  \n\
HETATM  950  O   HOH D  42      23.650   0.900   3.000  1.00 86.30           O  \n\
HETATM  951  O   HOH D  43       8.256  18.783   3.330  0.50 14.13           O  \n\
HETATM  952  O   HOH D  44       0.000   0.000   2.721  0.33 78.41           O  \n\
HETATM  953  O   HOH D  45       5.786   4.688   3.296  1.00 79.24           O  \n\
HETATM  954  O   HOH D  46      12.041  23.097   3.478  0.50 31.09           O  \n\
HETATM  955  O   HOH D  47       9.781  13.999   4.347  1.00 38.00           O  \n\
HETATM  956  O   HOH D  48      24.800   2.000   4.680  1.00 50.76           O  \n\
HETATM  957  O   HOH D  49       1.700  14.430   4.490  1.00 60.70           O  \n\
HETATM  958  O   HOH D  50       4.071   5.888   5.145  1.00 60.78           O  \n\
HETATM  959  O   HOH D  51      12.744  23.426   5.604  0.50 40.09           O  \n\
HETATM  960  O   HOH D  52      10.354  21.084   4.829  0.50 33.95           O  \n\
HETATM  961  O   HOH D  53      12.369  21.475   5.162  0.50 61.18           O  \n\
HETATM  962  O   HOH D  54      13.100  13.724   6.029  1.00 21.23           O  \n\
HETATM  963  O   HOH D  55      25.212   3.031   6.890  1.00 49.58           O  \n\
HETATM  964  O   HOH D  56      10.600  10.100   6.800  0.50 50.00           O  \n\
HETATM  965  O   HOH D  57      11.191  23.508   6.621  0.50 37.26           O  \n\
HETATM  966  O   HOH D  58      14.528  16.192   7.070  1.00 51.29           O  \n\
HETATM  967  O   HOH D  59       1.492  23.231   6.892  0.50 27.00           O  \n\
HETATM  968  O   HOH D  60      14.502  18.882   6.980  0.50 59.76           O  \n\
HETATM  969  O   HOH D  61       0.172  22.959   7.609  0.50 29.31           O  \n\
HETATM  970  O   HOH D  62      10.079  20.626   8.067  0.52 33.28           O  \n\
HETATM  971  O   HOH D  63       8.276  22.353   6.634  0.50 71.16           O  \n\
HETATM  972  O   HOH D  64      11.200  20.200   6.480  0.50 43.34           O  \n\
HETATM  973  O   HOH D  65       9.467  21.709   6.550  0.50 60.52           O  \n\
HETATM  974  O   HOH D  66      12.911  19.857   7.882  0.50 41.83           O  \n\
HETATM  975  O   HOH D  67      24.906   0.400   8.400  1.00 59.59           O  \n\
HETATM  976  O   HOH D  68      22.962   4.308   7.971  1.00 75.46           O  \n\
HETATM  977  O   HOH D  69       6.986  23.533   8.608  0.50 42.86           O  \n\
HETATM  978  O   HOH D  70       7.747  22.514   8.736  0.50 51.31           O  \n\
HETATM  979  O   HOH D  71      11.350  23.300   9.170  1.00 50.61           O  \n\
HETATM  980  O   HOH D  72      13.640  22.500   8.400  1.00 61.09           O  \n\
HETATM  981  O   HOH D  73      21.200   5.800   9.000  1.00 46.66           O  \n\
HETATM  982  O   HOH D  74      -0.559  20.337   9.227  0.50 31.04           O  \n\
HETATM  983  O   HOH D  75      18.617  13.600   9.207  1.00 29.22           O  \n\
HETATM  984  O   HOH D  76       2.956   7.356   9.255  1.00 37.48           O  \n\
HETATM  985  O   HOH D  77      11.907  19.705   9.066  0.50 35.59           O  \n\
HETATM  986  O   HOH D  78      16.094  16.073   9.932  1.00 48.31           O  \n\
HETATM  987  O   HOH D  79      13.482  17.840   9.054  1.00 66.41           O  \n\
HETATM  988  O   HOH D  80       9.900  19.400  10.176  1.00 57.45           O  \n\
HETATM  989  O   HOH D  81       8.300  21.900   9.770  0.50 62.82           O  \n\
HETATM  990  O   HOH D  82       5.531  14.046   9.251  1.00 53.12           O  \n\
HETATM  991  O   HOH D  83       0.500  21.500   9.739  0.50 40.73           O  \n\
HETATM  992  O   HOH D  84      24.500   1.839  10.261  0.50 44.08           O  \n\
HETATM  993  O   HOH D  85      14.403  20.407   9.881  0.25 62.98           O  \n\
HETATM  994  O   HOH D  86       5.099  10.014  10.625  1.00 39.93           O  \n\
HETATM  995  O   HOH D  87       0.786  10.457  10.424  0.50 27.11           O  \n\
HETATM  996  O   HOH D  88       7.099  20.641  10.117  0.50 45.52           O  \n\
HETATM  997  O   HOH D  89       1.327   5.583  11.052  0.50 56.24           O  \n\
HETATM  998  O   HOH D  90      10.114  17.143  11.048  1.00 38.47           O  \n\
HETATM  999  O   HOH D  91      13.122  21.921  10.724  0.50 29.51           O  \n\
HETATM 1000  O   HOH D  92      24.000   4.400  11.200  1.00 63.61           O  \n\
HETATM 1001  O   HOH D  93       0.397   4.490  11.763  0.50 23.04           O  \n\
HETATM 1002  O   HOH D  94      20.200   6.301  11.100  1.00 62.49           O  \n\
HETATM 1003  O   HOH D  95       1.431   8.001  10.900  1.00 61.63           O  \n\
HETATM 1004  O   HOH D  96       3.725   4.937  12.004  1.00 60.07           O  \n\
HETATM 1005  O   HOH D  97       9.246  23.287  11.503  1.00 45.58           O  \n\
HETATM 1006  O   HOH D  98      13.713  17.818  11.963  1.00 66.30           O  \n\
HETATM 1007  O   HOH D  99      16.125  12.139  12.240  1.00 50.03           O  \n\
HETATM 1008  O   HOH D 100      12.904  20.420  11.491  0.50 30.82           O  \n\
HETATM 1009  O   HOH D 101      22.345   2.177  11.300  1.00 53.69           O  \n\
HETATM 1010  O   HOH D 102       2.938   2.622  12.785  1.00 45.76           O  \n\
HETATM 1011  O   HOH D 103       3.200   8.800  12.200  1.00 58.95           O  \n\
HETATM 1012  O   HOH D 104      12.623  23.254  12.208  0.50 36.01           O  \n\
HETATM 1013  O   HOH D 105       6.083  21.437  12.952  0.50 45.78           O  \n\
HETATM 1014  O   HOH D 106      15.629  16.552  13.704  1.00 54.02           O  \n\
HETATM 1015  O   HOH D 107       1.400  10.000  13.205  1.00 62.38           O  \n\
HETATM 1016  O   HOH D 108      10.681  15.953  13.460  1.00 37.62           O  \n\
HETATM 1017  O   HOH D 109       3.526  17.510  13.393  0.50 58.59           O  \n\
HETATM 1018  O   HOH D 110      17.589  14.886  12.994  0.50 46.92           O  \n\
HETATM 1019  O   HOH D 111       8.436  16.103  13.124  0.50 66.40           O  \n\
HETATM 1020  O   HOH D 112      20.767   2.758  14.127  0.50 49.50           O  \n\
HETATM 1021  O   HOH D 113      19.461   3.175  13.236  0.50 43.30           O  \n\
HETATM 1022  O   HOH D 114      10.600  21.200  12.800  1.00 65.41           O  \n\
HETATM 1023  O   HOH D 115      17.091  12.037  14.424  1.00 66.30           O  \n\
HETATM 1024  O   HOH D 116      26.230   1.151  12.982  0.50 42.97           O  \n\
HETATM 1025  O   HOH D 117       8.200  19.886  13.338  1.00 59.62           O  \n\
HETATM 1026  O   HOH D 118       3.000   8.250  14.500  1.00 39.38           O  \n\
HETATM 1027  O   HOH D 119      23.669   1.157  13.223  1.00 49.56           O  \n\
HETATM 1028  O   HOH D 120       6.706  17.656  14.200  1.00 62.44           O  \n\
HETATM 1029  O   HOH D 121      21.660   8.100  14.400  1.00 78.85           O  \n\
HETATM 1030  O   HOH D 122      16.002  14.165  14.204  0.50 36.21           O  \n\
HETATM 1031  O   HOH D 123      18.624   9.971  14.472  1.00 68.09           O  \n\
HETATM 1032  O   HOH D 124      12.345  18.363  14.320  1.00 61.52           O  \n\
HETATM 1033  O   HOH D 125      15.375  13.331  15.234  0.50 38.87           O  \n\
HETATM 1034  O   HOH D 126       8.900  16.074  15.111  0.50 56.02           O  \n\
HETATM 1035  O   HOH D 127       9.800  20.500  15.000  0.50 37.74           O  \n\
HETATM 1036  O   HOH D 128      20.471   6.314  15.326  0.50 42.47           O  \n\
HETATM 1037  O   HOH D 129      15.956  10.347  15.577  1.00 73.09           O  \n\
HETATM 1038  O   HOH D 130       4.166  16.122  15.117  1.00 64.59           O  \n\
HETATM 1039  O   HOH D 131      22.179   1.588  16.322  1.00 60.14           O  \n\
HETATM 1040  O   HOH D 132       7.227  21.575  16.034  1.00 79.51           O  \n\
HETATM 1041  O   HOH D 133      24.987   3.024  15.000  0.50 77.50           O  \n\
HETATM 1042  O   HOH D 134       0.000   0.000  15.940  0.33 48.19           O  \n\
HETATM 1043  O   HOH D 135       2.058   1.124  15.886  0.50 57.48           O  \n\
HETATM 1044  O   HOH D 136      19.200   4.000  16.256  1.00 52.18           O  \n\
HETATM 1045  O   HOH D 137      14.044  21.773  15.730  0.50 35.08           O  \n\
HETATM 1046  O   HOH D 138       1.900   3.400  16.729  1.00 42.63           O  \n\
HETATM 1047  O   HOH D 139      14.400  17.800  15.886  0.50 52.96           O  \n\
HETATM 1048  O   HOH D 140      13.700  15.600  15.000  1.00 65.01           O  \n\
HETATM 1049  O   HOH D 141       2.100   6.200  15.800  1.00 73.63           O  \n\
HETATM 1050  O   HOH D 142      13.105  18.675  16.692  0.50 57.75           O  \n\
HETATM 1051  O   HOH D 143       5.384   1.947  16.328  1.00 52.83           O  \n\
HETATM 1052  O   HOH D 144      19.387   1.649  16.538  1.00 38.74           O  \n\
HETATM 1053  O   HOH D 145       6.570  18.429  16.505  1.00 50.65           O  \n\
HETATM 1054  O   HOH D 146      18.269   7.536  16.565  1.00 60.44           O  \n\
HETATM 1055  O   HOH D 147      16.961  12.601  17.169  1.00 81.43           O  \n\
HETATM 1056  O   HOH D 148      19.266  10.576  17.790  1.00 63.02           O  \n\
HETATM 1057  O   HOH D 149      -2.564   5.638  17.137  1.00 48.33           O  \n\
HETATM 1058  O   HOH D 150      21.336   8.539  16.849  1.00 46.39           O  \n\
HETATM 1059  O   HOH D 151      11.361  23.312  16.935  1.00 56.56           O  \n\
HETATM 1060  O   HOH D 152      11.482  20.115  16.180  0.50 36.42           O  \n\
HETATM 1061  O   HOH D 153      10.431  19.608  16.704  0.50 61.59           O  \n\
HETATM 1062  O   HOH D 154      22.701   4.882  16.533  0.50 59.04           O  \n\
HETATM 1063  O   HOH D 155      -0.559   7.125  16.712  1.00 55.39           O  \n\
HETATM 1064  O   HOH D 156      22.349   3.895  16.628  0.50 44.55           O  \n\
HETATM 1065  O   HOH D 157      24.254   2.529  17.221  0.50 64.98           O  \n\
HETATM 1066  O   HOH D 158      17.313  15.074  17.581  1.00 53.72           O  \n\
HETATM 1067  O   HOH D 159      16.509   9.562  17.812  1.00 54.16           O  \n\
HETATM 1068  O   HOH D 160      17.535   3.747  17.792  1.00 51.88           O  \n\
HETATM 1069  O   HOH D 161       0.500   3.000  18.600  0.50 35.00           O  \n\
HETATM 1070  O   HOH D 162       6.000   4.100  17.800  1.00 50.00           O  \n\
HETATM 1071  O   HOH D 163       2.700   3.900  19.000  0.50 40.00           O  \n\
HETATM 1072  O   HOH D 164       2.992   5.257  18.400  0.50 40.00           O  \n\
HETATM 1073  O   HOH D 165      22.320   6.616  18.376  1.00 76.30           O  \n\
HETATM 1074  O   HOH D 166      14.300  15.147  17.400  0.50 41.41           O  \n\
HETATM 1075  O   HOH D 167      12.379  14.000  18.485  1.00 69.21           O  \n\
HETATM 1076  O   HOH D 168      26.585   1.034  18.302  1.00 72.39           O  \n\
HETATM 1077  O   HOH D 169      15.048   0.586  18.649  0.50 27.91           O  \n\
HETATM 1078  O   HOH D 170      24.664   3.165  18.640  0.50 55.98           O  \n\
HETATM 1079  O   HOH D 171      16.000   6.400  18.500  1.00 75.03           O  \n\
HETATM 1080  O   HOH D 172       7.587  19.898  18.900  1.00 74.10           O  \n\
HETATM 1081  O   HOH D 173      23.636   0.400  18.433  0.50 38.58           O  \n\
HETATM 1082  O   HOH D 174       7.200   0.000  19.364  1.00 80.00           O  \n\
HETATM 1083  O   HOH D 175      12.325  20.187  18.584  1.00 76.30           O  \n\
HETATM 1084  O   HOH D 176       8.868  21.918  18.717  1.00 88.44           O  \n\
HETATM 1085  O   HOH D 177       4.000   0.889  19.161  1.00 56.19           O  \n\
HETATM 1086  O   HOH D 178      11.500  16.200  18.500  1.00 54.59           O  \n\
HETATM 1087  O   HOH D 179      15.033  14.600  19.135  0.50 40.58           O  \n\
HETATM 1088  O   HOH D 180      16.700  11.300  19.500  0.50 53.18           O  \n\
HETATM 1089  O   HOH D 181      17.595   8.307  19.856  1.00 43.95           O  \n\
HETATM 1090  O   HOH D 182       8.460  17.052  19.897  1.00 58.87           O  \n\
HETATM 1091  O   HOH D 183      11.600  18.400  20.000  1.00 60.00           O  \n\
HETATM 1092  O   HOH D 184       7.200   3.000  19.668  1.00 79.22           O  \n\
HETATM 1093  O   HOH D 185      21.000   4.000  19.956  1.00 59.41           O  \n\
HETATM 1094  O   HOH D 186      -0.800   4.800  19.700  1.00 50.00           O  \n\
HETATM 1095  O   HOH D 187      13.592   4.017  20.054  1.00 43.20           O  \n\
HETATM 1096  O   HOH D 188      -0.400   2.600  20.000  0.50 40.00           O  \n\
HETATM 1097  O   HOH D 189      19.480   6.217  19.797  1.00 62.99           O  \n\
HETATM 1098  O   HOH D 190      20.876   1.574  20.116  0.50 41.62           O  \n\
HETATM 1099  O   HOH D 191      18.870   3.203  20.295  1.00 65.25           O  \n\
HETATM 1100  O   HOH D 192      22.043   8.448  20.602  0.50 38.02           O  \n\
HETATM 1101  O   HOH D 193      15.420   7.740  20.813  1.00 61.77           O  \n\
HETATM 1102  O   HOH D 194      14.400  19.900  20.800  1.00 46.45           O  \n\
HETATM 1103  O   HOH D 195       8.900   4.300  20.900  1.00 66.62           O  \n\
HETATM 1104  O   HOH D 196      12.900   7.700  20.600  1.00 50.81           O  \n\
HETATM 1105  O   HOH D 197      23.373   3.907  20.784  0.50 37.81           O  \n\
HETATM 1106  O   HOH D 198      22.600   5.200  21.000  0.50 50.00           O  \n\
HETATM 1107  O   HOH D 199      11.000  20.300  21.100  0.50 50.00           O  \n\
HETATM 1108  O   HOH D 200      15.900  13.400  20.500  0.50 37.02           O  \n\
HETATM 1109  O   HOH D 201      15.000  15.900  20.409  0.50 51.72           O  \n\
HETATM 1110  O   HOH D 202      11.455   5.672  21.400  0.50 45.30           O  \n\
HETATM 1111  O   HOH D 203      19.300  11.200  21.251  1.00 93.71           O  \n\
HETATM 1112  O   HOH D 204      12.867  15.311  21.383  1.00104.59           O  \n\
HETATM 1113  O   HOH D 205      16.200  18.500  20.516  0.50 57.42           O  \n\
HETATM 1114  O   HOH D 206      17.900  14.200  21.400  0.50 54.11           O  \n\
HETATM 1115  O   HOH D 207       2.426   2.789  21.667  0.50 37.21           O  \n\
HETATM 1116  O   HOH D 208       5.591   3.514  22.644  1.00 66.58           O  \n\
HETATM 1117  O   HOH D 209      21.490   9.784  21.789  0.50 37.24           O  \n\
HETATM 1118  O   HOH D 210      22.459   7.099  21.906  0.50 54.11           O  \n\
HETATM 1119  O   HOH D 211      23.362   5.246  22.116  0.50 53.14           O  \n\
HETATM 1120  O   HOH D 212      10.026   5.995  22.154  0.50 36.85           O  \n\
HETATM 1121  O   HOH D 213      16.230  16.756  22.900  1.00 51.60           O  \n\
HETATM 1122  O   HOH D 214       7.950   1.500  22.400  1.00 74.32           O  \n\
HETATM 1123  O   HOH D 215       0.000   0.000  22.203  0.33 26.53           O  \n\
HETATM 1124  O   HOH D 216       6.000   0.331  22.809  1.00 81.99           O  \n\
HETATM 1125  O   HOH D 217       2.400   1.900  22.950  0.50 53.75           O  \n\
HETATM 1126  O   HOH D 218      16.826   9.360  22.915  1.00 64.50           O  \n\
HETATM 1127  O   HOH D 219      10.028   0.600  22.667  1.00 50.88           O  \n\
HETATM 1128  O   HOH D 220       8.566  22.210  23.275  1.00 52.52           O  \n\
HETATM 1129  O   HOH D 221      19.041   7.317  22.965  1.00 45.49           O  \n\
HETATM 1130  O   HOH D 222      13.154  17.896  23.121  0.50 58.99           O  \n\
HETATM 1131  O   HOH D 223      25.120   2.792  23.670  1.00 49.60           O  \n\
HETATM 1132  O   HOH D 224       0.848   2.630  23.300  0.50 51.96           O  \n\
HETATM 1133  O   HOH D 225      12.799   4.914  23.300  1.00 45.19           O  \n\
HETATM 1134  O   HOH D 226      14.100   1.511  23.000  1.00 54.91           O  \n\
HETATM 1135  O   HOH D 227      18.000   5.200  23.400  0.50 40.00           O  \n\
HETATM 1136  O   HOH D 228      20.460   5.246  23.195  0.50 42.74           O  \n\
HETATM 1137  O   HOH D 229      18.500  13.238  23.926  0.50 60.34           O  \n\
HETATM 1138  O   HOH D 230       9.469   4.007  23.263  0.50 65.39           O  \n\
HETATM 1139  O   HOH D 231       3.330   4.805  23.757  1.00 24.03           O  \n\
HETATM 1140  O   HOH D 232      -1.798   3.543  24.064  1.00 80.64           O  \n\
HETATM 1141  O   HOH D 233       1.468   0.225  24.184  1.00 35.46           O  \n\
HETATM 1142  O   HOH D 234      13.052  19.509  23.128  0.50 62.84           O  \n\
HETATM 1143  O   HOH D 235       9.900  22.890  25.259  1.00 65.26           O  \n\
HETATM 1144  O   HOH D 236      16.495  17.126  26.000  1.00 40.00           O  \n\
HETATM 1145  O   HOH D 237      21.700   5.400  24.514  0.50 50.22           O  \n\
HETATM 1146  O   HOH D 238       6.642  20.679  24.898  1.00 58.56           O  \n\
HETATM 1147  O   HOH D 239      20.692   8.311  24.457  0.50 48.03           O  \n\
HETATM 1148  O   HOH D 240       7.700   4.223  25.055  1.00 33.74           O  \n\
HETATM 1149  O   HOH D 241      19.581  11.070  25.093  1.00 65.09           O  \n\
HETATM 1150  O   HOH D 242      22.450   8.700  25.159  0.50 48.15           O  \n\
HETATM 1151  O   HOH D 243      12.210  21.699  25.848  0.50 44.27           O  \n\
HETATM 1152  O   HOH D 244      11.500  21.600  24.157  0.50 70.69           O  \n\
HETATM 1153  O   HOH D 245      25.803   0.095  26.600  1.00 56.59           O  \n\
HETATM 1154  O   HOH D 246      23.392   1.295  25.732  1.00 48.54           O  \n\
HETATM 1155  O   HOH D 247      12.194   3.114  25.000  1.00 76.30           O  \n\
HETATM 1156  O   HOH D 248       4.708   1.340  26.039  1.00 30.59           O  \n\
HETATM 1157  O   HOH D 249      14.388  19.737  25.636  1.00 64.76           O  \n\
HETATM 1158  O   HOH D 250       5.419   3.667  26.434  1.00 31.12           O  \n\
HETATM 1159  O   HOH D 251      23.512   4.500  26.629  1.00 66.30           O  \n\
HETATM 1160  O   HOH D 252      16.389  14.064  27.171  1.00 74.53           O  \n\
HETATM 1161  O   HOH D 253      18.700  14.000  26.532  1.00 79.38           O  \n\
HETATM 1162  O   HOH D 254      10.926  10.684  26.940  1.00 44.80           O  \n\
HETATM 1163  O   HOH D 255      12.500  21.800  27.254  0.50 47.63           O  \n\
HETATM 1164  O   HOH D 256      27.000   1.000  28.300  1.00 70.92           O  \n\
HETATM 1165  O   HOH D 257      20.879   8.934  27.397  0.50 49.09           O  \n\
HETATM 1166  O   HOH D 258       5.301   3.962  28.700  0.60 31.54           O  \n\
HETATM 1167  O   HOH D 259      13.794  13.317  28.059  1.00 74.41           O  \n\
HETATM 1168  O   HOH D 260       6.578   4.370  28.779  0.40 28.91           O  \n\
HETATM 1169  O   HOH D 261      19.254  14.024  28.832  1.00 55.11           O  \n\
HETATM 1170  O   HOH D 262      14.279   1.568  28.963  1.00 65.08           O  \n\
HETATM 1171  O   HOH D 263      14.080   9.849  29.479  1.00 27.58           O  \n\
HETATM 1172  O   HOH D 264      23.137   6.636  29.293  0.50 55.90           O  \n\
HETATM 1173  O   HOH D 265      18.586   7.949  30.401  0.50 17.96           O  \n\
HETATM 1174  O   HOH D 266      10.475  22.332  30.034  1.00 41.35           O  \n\
HETATM 1175  O   HOH D 267      14.200  22.300  30.301  1.00 67.11           O  \n\
HETATM 1176  O   HOH D 268       4.564   5.544  30.131  1.00 37.24           O  \n\
HETATM 1177  O   HOH D 269       0.000   0.000  30.941  0.33 24.09           O  \n\
HETATM 1178  O   HOH D 270       3.559   3.107  30.844  1.00 34.61           O  \n\
HETATM 1179  O   HOH D 271      -1.317   2.461  30.833  1.00 27.74           O  \n\
HETATM 1180  O   HOH D 272       6.900   3.468  31.640  1.00 38.60           O  \n\
HETATM 1181  O   HOH D 273       1.484   2.379  31.639  1.00 81.34           O  \n\
HETATM 1182  O   HOH D 274      12.200  21.561  31.604  1.00 55.36           O  \n\
HETATM 1183  O   HOH D 275      25.195   1.527  33.000  1.00 77.73           O  \n\
HETATM 1184  O   HOH D 276      11.090  22.753  33.200  1.00 96.30           O  \n\
HETATM 1185  O   HOH D 277       3.296   3.651  33.200  1.00 86.30           O  \n\
HETATM 1186  O   HOH D 278      24.237   4.743  33.829  1.00 38.87           O  \n\
CONECT   43   76                                                                \n\
CONECT   49  227                                                                \n\
CONECT   76   43                                                                \n\
CONECT  154  319                                                                \n\
CONECT  227   49                                                                \n\
CONECT  247  835                                                                \n\
CONECT  319  154                                                                \n\
CONECT  464  497                                                                \n\
CONECT  470  644                                                                \n\
CONECT  497  464                                                                \n\
CONECT  575  734                                                                \n\
CONECT  644  470                                                                \n\
CONECT  664  836                                                                \n\
CONECT  734  575                                                                \n\
CONECT  835  247  870                                                           \n\
CONECT  836  664                                                                \n\
CONECT  870  835                                                                \n\
MASTER      511    3    2    6    2    4   14    9 1182    4   17   10          \n\
END                                                                             \n\
"

ML.biotin = "\
GBO\n\
  -ISIS-            3D\n\
\n\
 70 71  0  0  0  0  0  0  0  0  0\n\
    9.6670   -3.2730   -1.3600 O   0  0  0  0  0\n\
    9.4420   -2.9260    0.1950 P   0  0  0  0  0\n\
    9.0060   -4.2590    0.9850 O   0  0  0  0  0\n\
   10.7010   -2.4010    0.7700 O   0  0  0  0  0\n\
    8.2840   -1.8160    0.3360 O   0  0  0  0  0\n\
    8.2170   -0.2300    0.0650 P   0  0  0  0  0\n\
    8.9820    0.5490    1.2480 O   0  0  0  0  0\n\
    8.8650    0.0780   -1.2290 O   0  0  0  0  0\n\
    6.6780    0.2410    0.0190 O   0  0  0  0  0\n\
    6.2810    1.5750   -0.3070 C   0  0  0  0  0\n\
    4.7790    1.6780   -0.2590 C   0  0  0  0  0\n\
    4.1340    2.2980   -1.2160 C   0  0  0  0  0\n\
    4.8990    3.0160   -2.2980 C   0  0  0  0  0\n\
    2.6270    2.2940   -1.2350 C   0  0  0  0  0\n\
    2.1050    3.5630   -0.5590 C   0  0  0  0  0\n\
    0.5980    3.5590   -0.5780 C   0  0  0  0  0\n\
   -0.0710    3.6080    0.5470 C   0  0  0  0  0\n\
    0.6600    3.5350    1.8630 C   0  0  0  0  0\n\
   -1.5730    3.7360    0.5250 C   0  0  0  0  0\n\
   -2.1780    2.4060    0.6280 N   0  0  0  0  0\n\
   -3.5190    2.2740    0.6290 C   0  0  0  0  0\n\
   -4.2250    3.2570    0.5440 O   0  0  0  0  0\n\
   -4.1420    0.9060    0.7340 C   0  0  0  0  0\n\
   -5.6670    1.0370    0.7120 C   0  0  0  0  0\n\
   -6.2990   -0.3520    0.8200 C   0  0  0  0  0\n\
   -7.8230   -0.2220    0.7980 C   0  0  0  0  0\n\
   -8.4550   -1.6110    0.9050 C   0  0  0  0  0\n\
   -8.1510   -2.5860   -0.6240 S   0  0  0  0  0\n\
   -9.6540   -3.6290   -0.4440 C   0  0  0  0  0\n\
  -10.6720   -2.6530    0.1780 C   0  0  0  0  0\n\
   -9.9930   -1.5100    0.9470 C   0  0  0  0  0\n\
  -10.4140   -0.2970    0.2280 N   0  0  0  0  0\n\
  -11.2070   -0.6480   -0.7940 C   0  0  0  0  0\n\
  -11.6990    0.1590   -1.5580 O   0  0  0  0  0\n\
  -11.4110   -1.9730   -0.8970 N   0  0  0  0  0\n\
    8.8810   -3.6230   -1.8030 H   0  0  0  0  0\n\
    9.6580   -4.9720    0.9440 H   0  0  0  0  0\n\
    8.6090    0.3940    2.1260 H   0  0  0  0  0\n\
    6.7170    2.2690    0.4120 H   0  0  0  0  0\n\
    6.6310    1.8230   -1.3090 H   0  0  0  0  0\n\
    4.2330    1.2410    0.5650 H   0  0  0  0  0\n\
    5.1730    2.3080   -3.0800 H   0  0  0  0  0\n\
    4.2770    3.8030   -2.7220 H   0  0  0  0  0\n\
    5.8020    3.4560   -1.8740 H   0  0  0  0  0\n\
    2.2770    2.2610   -2.2670 H   0  0  0  0  0\n\
    2.2600    1.4190   -0.6990 H   0  0  0  0  0\n\
    2.4550    3.5960    0.4730 H   0  0  0  0  0\n\
    2.4730    4.4380   -1.0950 H   0  0  0  0  0\n\
    0.0700    3.5160   -1.5190 H   0  0  0  0  0\n\
    0.9790    4.5350    2.1570 H   0  0  0  0  0\n\
   -0.0040    3.1260    2.6250 H   0  0  0  0  0\n\
    1.5330    2.8910    1.7580 H   0  0  0  0  0\n\
   -1.8970    4.3490    1.3670 H   0  0  0  0  0\n\
   -1.8840    4.2060   -0.4080 H   0  0  0  0  0\n\
   -1.6140    1.6200    0.6960 H   0  0  0  0  0\n\
   -3.8180    0.2930   -0.1070 H   0  0  0  0  0\n\
   -3.8310    0.4360    1.6670 H   0  0  0  0  0\n\
   -5.9910    1.6490    1.5540 H   0  0  0  0  0\n\
   -5.9780    1.5060   -0.2210 H   0  0  0  0  0\n\
   -5.9750   -0.9650   -0.0210 H   0  0  0  0  0\n\
   -5.9880   -0.8220    1.7530 H   0  0  0  0  0\n\
   -8.1480    0.3910    1.6390 H   0  0  0  0  0\n\
   -8.1340    0.2480   -0.1350 H   0  0  0  0  0\n\
   -8.0790   -2.1390    1.7810 H   0  0  0  0  0\n\
  -10.0000   -3.9800   -1.4160 H   0  0  0  0  0\n\
   -9.4640   -4.4700    0.2230 H   0  0  0  0  0\n\
  -11.3580   -3.1900    0.8330 H   0  0  0  0  0\n\
  -10.3470   -1.4860    1.9780 H   0  0  0  0  0\n\
  -10.1590    0.6100    0.4570 H   0  0  0  0  0\n\
  -11.9550   -2.4080   -1.5730 H   0  0  0  0  0\n\
  1 36  1  0  0  0\n\
  2  1  1  0  0  0\n\
  2  3  1  0  0  0\n\
  3 37  1  0  0  0\n\
  4  2  2  0  0  0\n\
  5  2  1  0  0  0\n\
  6  5  1  0  0  0\n\
  6  7  1  0  0  0\n\
  7 38  1  0  0  0\n\
  8  6  2  0  0  0\n\
  9  6  1  0  0  0\n\
 10  9  1  0  0  0\n\
 10 11  1  0  0  0\n\
 10 39  1  0  0  0\n\
 10 40  1  0  0  0\n\
 11 41  1  0  0  0\n\
 12 11  2  0  0  0\n\
 12 14  1  0  0  0\n\
 13 12  1  0  0  0\n\
 13 42  1  0  0  0\n\
 13 43  1  0  0  0\n\
 13 44  1  0  0  0\n\
 14 15  1  0  0  0\n\
 14 45  1  0  0  0\n\
 14 46  1  0  0  0\n\
 15 47  1  0  0  0\n\
 15 48  1  0  0  0\n\
 16 15  1  0  0  0\n\
 16 17  2  0  0  0\n\
 16 49  1  0  0  0\n\
 17 18  1  0  0  0\n\
 18 50  1  0  0  0\n\
 18 51  1  0  0  0\n\
 18 52  1  0  0  0\n\
 19 17  1  0  0  0\n\
 19 53  1  0  0  0\n\
 19 54  1  0  0  0\n\
 20 19  1  0  0  0\n\
 20 55  1  0  0  0\n\
 21 20  1  0  0  0\n\
 22 21  2  0  0  0\n\
 23 21  1  0  0  0\n\
 23 24  1  0  0  0\n\
 23 56  1  0  0  0\n\
 23 57  1  0  0  0\n\
 24 58  1  0  0  0\n\
 24 59  1  0  0  0\n\
 25 24  1  0  0  0\n\
 25 26  1  0  0  0\n\
 25 60  1  0  0  0\n\
 25 61  1  0  0  0\n\
 26 62  1  0  0  0\n\
 26 63  1  0  0  0\n\
 27 26  1  0  0  0\n\
 27 64  1  0  0  0\n\
 28 27  1  0  0  0\n\
 29 28  1  0  0  0\n\
 29 65  1  0  0  0\n\
 29 66  1  0  0  0\n\
 30 29  1  0  0  0\n\
 30 31  1  0  0  0\n\
 30 67  1  0  0  0\n\
 31 27  1  0  0  0\n\
 31 68  1  0  0  0\n\
 32 31  1  0  0  0\n\
 32 69  1  0  0  0\n\
 33 32  1  0  0  0\n\
 33 35  1  0  0  0\n\
 34 33  2  0  0  0\n\
 35 30  1  0  0  0\n\
 35 70  1  0  0  0\n\
M  END\n\
$$$$\n\
"

ML.AR1 = "\
AR1\n\
  -ISIS-            3D\n\
\n\
 63 65  0  0  0  0  0  0  0  0  0\n\
    8.4270   -4.3400    0.0400 C   0  0  0  0  0\n\
    9.3940   -3.6080    0.0120 O   0  0  0  0  0\n\
    7.1850   -3.8170    0.0430 N   0  0  0  0  0\n\
    7.0100   -2.4250    0.0140 C   0  0  0  0  0\n\
    5.8410   -1.7840    0.0140 N   0  0  0  0  0\n\
    6.0590   -0.4850   -0.0120 C   0  0  0  0  0\n\
    7.4080   -0.2730   -0.0380 N   0  0  0  0  0\n\
    8.0850    1.0260   -0.0740 C   0  0  0  0  0\n\
    8.0060   -1.4960   -0.0180 C   0  0  0  0  0\n\
    5.0220    0.5620   -0.0210 C   0  0  0  0  0\n\
    5.3430    1.7350   -0.0450 O   0  0  0  0  0\n\
    3.7190    0.2200   -0.0020 N   0  0  0  0  0\n\
    2.7320    1.2160   -0.0110 C   0  0  0  0  0\n\
    1.4150    1.0110   -0.0010 N   0  0  0  0  0\n\
    0.7950    2.1740   -0.0100 C   0  0  0  0  0\n\
    1.7350    3.1650   -0.0360 N   0  0  0  0  0\n\
    1.4790    4.6070   -0.0600 C   0  0  0  0  0\n\
    2.9550    2.5600   -0.0370 C   0  0  0  0  0\n\
   -0.6640    2.3720    0.0010 C   0  0  0  0  0\n\
   -1.1260    3.4980   -0.0150 O   0  0  0  0  0\n\
   -1.4890    1.3060    0.0270 N   0  0  0  0  0\n\
   -2.8780    1.4950    0.0370 C   0  0  0  0  0\n\
   -3.7980    0.5290    0.0580 N   0  0  0  0  0\n\
   -4.9980    1.0730    0.0640 C   0  0  0  0  0\n\
   -4.8570    2.4320    0.0390 N   0  0  0  0  0\n\
   -5.9390    3.4190    0.0310 C   0  0  0  0  0\n\
   -3.5210    2.6960    0.0230 C   0  0  0  0  0\n\
   -6.2750    0.3410    0.0890 C   0  0  0  0  0\n\
   -7.3270    0.9520    0.0880 O   0  0  0  0  0\n\
   -6.2790   -1.0070    0.1120 N   0  0  0  0  0\n\
   -7.5500   -1.7360    0.1370 C   0  0  0  0  0\n\
   -7.2740   -3.2410    0.1600 C   0  0  0  0  0\n\
   -8.5480   -3.9710    0.1850 N   0  3  0  0  0\n\
   -9.2760   -3.7290   -1.0680 C   0  0  0  0  0\n\
   -8.2850   -5.4090    0.3280 C   0  0  0  0  0\n\
    8.5620   -5.4120    0.0620 H   0  0  0  0  0\n\
    6.4120   -4.4020    0.0650 H   0  0  0  0  0\n\
    8.2400    1.3260   -1.1100 H   0  0  0  0  0\n\
    7.4690    1.7700    0.4310 H   0  0  0  0  0\n\
    9.0480    0.9480    0.4300 H   0  0  0  0  0\n\
    9.0680   -1.6930   -0.0260 H   0  0  0  0  0\n\
    3.4630   -0.7160    0.0170 H   0  0  0  0  0\n\
    1.4070    4.9460   -1.0930 H   0  0  0  0  0\n\
    0.5440    4.8190    0.4590 H   0  0  0  0  0\n\
    2.2970    5.1290    0.4370 H   0  0  0  0  0\n\
    3.9160    3.0510   -0.0540 H   0  0  0  0  0\n\
   -1.1210    0.4090    0.0400 H   0  0  0  0  0\n\
   -6.2160    3.6460   -0.9980 H   0  0  0  0  0\n\
   -6.8030    3.0160    0.5600 H   0  0  0  0  0\n\
   -5.6030    4.3300    0.5270 H   0  0  0  0  0\n\
   -3.0590    3.6720    0.0020 H   0  0  0  0  0\n\
   -5.4400   -1.4940    0.1130 H   0  0  0  0  0\n\
   -8.1120   -1.4550    1.0270 H   0  0  0  0  0\n\
   -8.1290   -1.4860   -0.7520 H   0  0  0  0  0\n\
   -6.7120   -3.5210   -0.7310 H   0  0  0  0  0\n\
   -6.6950   -3.4900    1.0490 H   0  0  0  0  0\n\
   -9.1040   -3.6520    0.9640 H   0  0  0  0  0\n\
  -10.2220   -4.2710   -1.0500 H   0  0  0  0  0\n\
   -9.4710   -2.6620   -1.1740 H   0  0  0  0  0\n\
   -8.6760   -4.0740   -1.9100 H   0  0  0  0  0\n\
   -7.7450   -5.5890    1.2570 H   0  0  0  0  0\n\
   -9.2310   -5.9520    0.3460 H   0  0  0  0  0\n\
   -7.6850   -5.7540   -0.5140 H   0  0  0  0  0\n\
  1  2  2  0  0  0\n\
  1  3  1  0  0  0\n\
  1 36  1  0  0  0\n\
  3  4  1  0  0  0\n\
  3 37  1  0  0  0\n\
  4  5  1  0  0  0\n\
  4  9  2  0  0  0\n\
  5  6  2  0  0  0\n\
  6  7  1  0  0  0\n\
  6 10  1  0  0  0\n\
  7  8  1  0  0  0\n\
  7  9  1  0  0  0\n\
  8 38  1  0  0  0\n\
  8 39  1  0  0  0\n\
  8 40  1  0  0  0\n\
  9 41  1  0  0  0\n\
 10 11  2  0  0  0\n\
 10 12  1  0  0  0\n\
 12 13  1  0  0  0\n\
 12 42  1  0  0  0\n\
 13 14  1  0  0  0\n\
 13 18  2  0  0  0\n\
 14 15  2  0  0  0\n\
 15 16  1  0  0  0\n\
 15 19  1  0  0  0\n\
 16 17  1  0  0  0\n\
 16 18  1  0  0  0\n\
 17 43  1  0  0  0\n\
 17 44  1  0  0  0\n\
 17 45  1  0  0  0\n\
 18 46  1  0  0  0\n\
 19 20  2  0  0  0\n\
 19 21  1  0  0  0\n\
 21 22  1  0  0  0\n\
 21 47  1  0  0  0\n\
 22 23  1  0  0  0\n\
 22 27  2  0  0  0\n\
 23 24  2  0  0  0\n\
 24 25  1  0  0  0\n\
 24 28  1  0  0  0\n\
 25 26  1  0  0  0\n\
 25 27  1  0  0  0\n\
 26 48  1  0  0  0\n\
 26 49  1  0  0  0\n\
 26 50  1  0  0  0\n\
 27 51  1  0  0  0\n\
 28 29  2  0  0  0\n\
 28 30  1  0  0  0\n\
 30 31  1  0  0  0\n\
 30 52  1  0  0  0\n\
 31 32  1  0  0  0\n\
 31 53  1  0  0  0\n\
 31 54  1  0  0  0\n\
 32 33  1  0  0  0\n\
 32 55  1  0  0  0\n\
 32 56  1  0  0  0\n\
 33 34  1  0  0  0\n\
 33 35  1  0  0  0\n\
 33 57  1  0  0  0\n\
 34 58  1  0  0  0\n\
 34 59  1  0  0  0\n\
 34 60  1  0  0  0\n\
 35 61  1  0  0  0\n\
 35 62  1  0  0  0\n\
 35 63  1  0  0  0\n\
M  END\n\
$$$$\n\
"

ML.alcohol = "\
12M\n\
  -ISIS-            3D\n\
\n\
 22 22  0  0  0  0  0  0  0  0  0\n\
   -0.4800    2.7410    0.7590 C   0  0  0  0  0\n\
   -0.1190    2.0590   -0.5620 C   0  0  0  0  0\n\
    0.4650    0.6980   -0.2810 C   0  0  0  0  0\n\
    1.8360    0.5370   -0.2040 C   0  0  0  0  0\n\
    2.3720   -0.7110    0.0530 C   0  0  0  0  0\n\
    1.5370   -1.7980    0.2340 C   0  0  0  0  0\n\
    0.1670   -1.6360    0.1570 C   0  0  0  0  0\n\
   -0.3700   -0.3880   -0.0960 C   0  0  0  0  0\n\
   -1.8640   -0.2120   -0.1790 C   0  0  0  0  0\n\
   -2.5040   -1.4710    0.0370 O   0  0  0  0  0\n\
   -0.9030    3.7250    0.5560 H   0  0  0  0  0\n\
   -1.2120    2.1350    1.2930 H   0  0  0  0  0\n\
    0.4170    2.8490    1.3690 H   0  0  0  0  0\n\
   -1.0160    1.9500   -1.1720 H   0  0  0  0  0\n\
    0.6120    2.6650   -1.0960 H   0  0  0  0  0\n\
    2.4880    1.3860   -0.3450 H   0  0  0  0  0\n\
    3.4430   -0.8360    0.1130 H   0  0  0  0  0\n\
    1.9560   -2.7730    0.4340 H   0  0  0  0  0\n\
   -0.4860   -2.4860    0.2980 H   0  0  0  0  0\n\
   -2.1900    0.4970    0.5830 H   0  0  0  0  0\n\
   -2.1310    0.1670   -1.1650 H   0  0  0  0  0\n\
   -3.4570   -1.3140   -0.0250 H   0  0  0  0  0\n\
  1  2  1  0  0  0\n\
  1 11  1  0  0  0\n\
  1 12  1  0  0  0\n\
  1 13  1  0  0  0\n\
  2  3  1  0  0  0\n\
  2 14  1  0  0  0\n\
  2 15  1  0  0  0\n\
  3  4  2  0  0  0\n\
  3  8  1  0  0  0\n\
  4  5  1  0  0  0\n\
  4 16  1  0  0  0\n\
  5  6  2  0  0  0\n\
  5 17  1  0  0  0\n\
  6  7  1  0  0  0\n\
  6 18  1  0  0  0\n\
  7  8  2  0  0  0\n\
  7 19  1  0  0  0\n\
  8  9  1  0  0  0\n\
  9 10  1  0  0  0\n\
  9 20  1  0  0  0\n\
  9 21  1  0  0  0\n\
 10 22  1  0  0  0\n\
M  END\n\
$$$$\n\
"