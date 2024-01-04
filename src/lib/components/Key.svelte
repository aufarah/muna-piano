<script>
    import * as Tone from 'tone'
    import {isKeyDown} from "./stores"
    import {currTouches} from './stores'

    export let key_data

    let frequency;

    $: if(key_data) {
        frequency = key_data.value
    }
    

    Tone.start()
    
    let me, my_touch_id;

    
    function fire(){
        // console.log('aku',frequency)
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(frequency, 0.25)
        setTimeout(() => { 
            synth.dispose()
        }, 250+1000)
        Tone.start() 
    }

    function fire_mousemove(){
        if ($isKeyDown == true){
            me.classList.add('active')
            fire()
        }
    }

    function fire_mouse(){
        $isKeyDown = true
        fire()
    }

    let release = () => {
        me.classList.remove('active')
        $isKeyDown = false
    }



    // window.addEventListener('click', () => {

    //     console.log(frequency)
    //     // fire()
    // })

</script>

<button class="white b grid place-items-center" 

    on:touchstart|preventDefault={(e)=>{
        // $isKeyDown = true
        me.classList.add('active')
        let i = 0
        for (let touch of e.touches){
            if (touch.target== me) {
                $currTouches[String(i)] = me;
                my_touch_id = i
            }
            i++;
        }
        fire_mouse()
    }}

    on:touchmove|preventDefault={(e)=>{
        let touches = e.touches[my_touch_id]
        let x = touches.clientX
        let y = touches.clientY
        let button = document.elementFromPoint(x, y)
        if(button){
            if($currTouches[my_touch_id] != button) {
                if ($currTouches[my_touch_id] != undefined){
                    $currTouches[my_touch_id].dispatchEvent(new Event('mouseleave'));
                }
                button.dispatchEvent(new Event('touchenter'));
                $currTouches[my_touch_id] = button;
            } 
        }
    }}

    on:mousedown={()=>{
        me.classList.add('active')
        fire_mouse()
    }} 
    
    on:mouseenter={()=>{
        fire_mousemove()
    }} 

    on:touchenter = {()=>{
        me.classList.add('active')
        fire()
    }}
    
    on:mouseup={release}

    on:mouseleave = {()=>{
        me.classList.remove('active')
   }}
    on:touchend={(e)=>{
        me.classList.remove('active');
        $isKeyDown = false;

        let i = 0
        if ($currTouches[my_touch_id] != undefined){
            $currTouches[my_touch_id].dispatchEvent(new Event('mouseleave'));
        }
        my_touch_id = undefined;

    }}
    bind:this={me} >
<!-- {} -->
    <div class="bg-darkgreen aspect-square w-[14pt]  rounded-full grid place-items-center text-xs text-white">{key_data.scale_step}</div>
    <div class="bg-orange aspect-square w-[23pt]  rounded-full grid place-items-center">{key_data.note_name}</div>
</button>