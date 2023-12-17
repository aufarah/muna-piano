import { writable } from 'svelte/store';
import { nanoid } from 'nanoid'

let initial = {}
initial[nanoid() ] = {
    angle : 0
}

export const notes = writable(initial);

initial = {
    "name" : "my_scale",
    "base_frequency" : 440,
    "scale_ratio": 2, //an octave 2:1
    "mode" : {
        "type" : "division",
        "division" : 12, 
        "relative": false,
        "values" : {}
    },
    "clipping": true
}
initial.mode.values[nanoid() ] = {
    angle : 0
}

export const scale_config = writable(initial);