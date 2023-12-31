export let modes = [
    {
        group_name : 'TET',
        member : [
            {
                name : '5 TET',
                notes : [...Array(5).keys()],
                note_names : [1,2,3,5,6],
                root : 0,
                division: 5
            },
            {
                name : '12 TET',
                notes : [...Array(12).keys()],
                root : 0,
                division: 12
            },
            {
                name : '24 TET',
                notes : [...Array(24).keys()],
                root : 0,
                division: 24
            }
        ]
    },
    {
        group_name : 'Western Diatonic',
        member : [
            {
                name : 'Major / Ionian (I)',
                notes : [0,2,4,5,7,9,11],
                root : 0,
                division: 12
            },
            {
                name : 'Dorian (II)',
                notes : [0,2,4,5,7,9,11],
                root : 2,
                division: 12
            },
            {
                name : 'Phrygian (III)',
                notes : [0,2,4,5,7,9,11],
                root : 4,
                division: 12
            },
            {
                name : 'Lydian (IV)',
                notes : [0,2,4,5,7,9,11],
                root : 5,
                division: 12
            },
            {
                name : 'Mixolydian (V)',
                notes : [0,2,4,5,7,9,11],
                root : 7,
                division: 12
            },
            {
                name : 'Minor / Aeolian (VI)',
                notes : [0,2,4,5,7,9,11],
                root : 9,
                division: 12
            },
            {
                name : 'Locrian (VII)',
                notes : [0,2,4,5,7,9,11],
                root : 11,
                division: 12
            }
        ]
    },
    {
        group_name : "Madendas",
        member : [
            {
                name : "Madenda/Sorog/Hirajoshi",
                notes : [0,2,3,7,8],
                root : 0,
                division: 12
            },
            {
                name : "Iwato",
                notes : [0,2,3,7,8],
                root : 2,
                division: 12
            },
            {
                name : "Kaushikdhvani",
                notes : [0,2,3,7,8],
                root : 3,
                division: 12
            },
            {
                name : "Ambassel/Olympos Enharmonic/Gunakali",
                notes : [0,2,3,7,8],
                root : 7,
                division: 12
            },
            {
                name : "Amrtavarshini",
                notes : [0,2,3,7,8],
                root : 8,
                division: 12
            }
        ]
    },
    {
        group_name : "Pelogs",
        member : [
            {
                name : "Pelog Pentatonic (12 TET)",
                notes : [0,1,3,7,8],
                root : 0,
                division: 12
            },
            {
                name : "Pelog Heptatonic (12 TET)",
                notes: [0,1,3,6,7,8,10],
                root : 0,
                division: 12
            },
            {
                name : "Pelog Barang",
                notes: [  1,3,  7,8,10],
                note_names: [2,3,5,6,7],
                root : 0,
                division: 12
            },
            {
                name : "Pelog Bem",
                notes: [0,1,  6,7,8],
                note_names: [1,2,4,5,6],
                root : 0,
                division: 12
            }
        ]
    },
    {
        group_name : "Slendro",
        member : [
            {
                name : "Slendro / 5 TET",
                notes : [...Array(5).keys()],
                note_names : [1,2,3,5,6],
                root : 0,
                division: 5
            },
            {
                name : "Slendro on 12 TET",
                notes : [0,2,5,7,10],
                note_names : [1,2,3,5,6],
                root : 0,
                division: 12
            },
        ]
    },
    {
        group_name : "Maqam Ajam",
        member : [
            {
                name : 'Ajam',
                notes : [0,2,4,5,7,9,11],
                root : 0,
                division: 12
            },
            {
                name : 'Shawq Afza',
                notes : [0,2,4,5,7,8,11],
                root : 0,
                division: 12
            }
        ]
    },
    {
        group_name : "Maqam Bayati",
        member : [
            {
                name : 'Bayati Nahawand',
                notes : [0,2,3.5,5,7,9,10],
                root : 0,
                division: 12
            },
            {
                name : 'Bayati Rast',
                notes : [0,2,3.5,5,7,9,10.5],
                root : 0,
                division: 12
            },
            {
                name : 'Bayati Shuri',
                notes : [0,2,3.5,5,7,8,11],
                root : 0,
                division: 12
            },
            {
                name : 'Husayni I',
                notes : [0,2,3.5,5,7,9,10],
                root : 0,
                division: 12
            },
            {
                name : 'Husayni II',
                notes : [0,2,3.5,5,7,9,10.5],
                root : 0,
                division: 12
            },
        ]
    },
    {
        group_name : "Maqam Hijaz",
        member : [
            {
                name : 'Hijaz Nahawand',
                notes : [0,2,3,6,7,9,10],
                root : 0,
                division: 12
            },
            {
                name : 'Hijaz Rast',
                notes : [0,2,3,6,7,9,10.5],
                root : 0,
                division: 12
            },
            {
                name : 'Hijazkar',
                notes : [0,1,4,5,7,8,11],
                root : 0,
                division: 12
            },
            {
                name : 'Zanjaran',
                notes : [0,1,4,5,7,9,10],
                root : 0,
                division: 12
            },
        ]
    },
    {
        group_name : "Maqam Kurd",
        member : [
            {
                name : 'Kurd',
                notes : [0,2,3,5,7,9,10],
                root : 0,
                division: 12
            }
        ]
    }
]
// let i = 1
// for (let item of major){
//     initial.mode.values[nanoid() ] = {
//         note_name : i,
//         angle : item
//     }
//     i++;
// }