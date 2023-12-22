import { writable } from 'svelte/store';
import { nanoid } from 'nanoid'

// let initial = {}
// initial[nanoid() ] = {
//     angle : 0
// }

// export const notes = writable(initial);

let initial = {
    "name" : "my_scale",
    "base_frequency" : 440,
    "scale_ratio": 2, //an octave 2:1
    "mode" : {
        "unit" : "division",
        "root" : 0,
        "division" : 12, 
        "relative": false,
        "values" : {}
    },
    "clipping": true
}

let major = [0,2,4,5,7,9,11]
let i = 1
for (let item of major){
    initial.mode.values[nanoid() ] = {
        note_name : i,
        angle : item
    }
    i++;
}

export const scale_config = writable(initial);
export const  isKeyDown = writable(false)