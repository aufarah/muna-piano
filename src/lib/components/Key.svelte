<script>
    import * as Tone from 'tone'
    import {isKeyDown} from "./stores"

    export let frequency
    
    let me;

    
    async function fire(){
        // console.log('aku',frequency)
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(frequency, 0.25)
        setTimeout(() => { 
            synth.dispose()
        }, 250+1000)
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

<button class="white b" 



on:touchstart|preventDefault={()=>{
    $isKeyDown = true
    me.classList.add('active')
    fire()
}}
    on:mousedown={()=>{
        me.classList.add('active')
        fire_mouse()
    }} 
    
    on:mouseenter={()=>{
        fire_mousemove()
    }} 
    
    on:mouseup={release}

    on:mouseleave = {()=>{
        me.classList.remove('active')
   }}
    on:touchend={()=>{
         me.classList.remove('active')
    }}
    bind:this={me} ></button>