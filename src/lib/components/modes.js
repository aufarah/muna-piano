let modes = [
    {
        name : 'Major / Ionian (I)',
        states : [0,2,4,5,7,9,11]
    }
]
let i = 1
for (let item of major){
    initial.mode.values[nanoid() ] = {
        note_name : i,
        angle : item
    }
    i++;
}