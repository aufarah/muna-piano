<script>
    import * as Tone from 'tone'
    import {isKeyDown} from "./stores"
    import {currTouches} from './stores'

    export let frequency
    
    let me;

    
    function fire(){
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



    on:touchstart|preventDefault={(e)=>{
        $isKeyDown = true
        me.classList.add('active')
        let i = 0
        for (let touch of e.touches){
            if (touch.target== me) {
                $currTouches[String(i)] = me;
                console.log($currTouches);
            }
            i++;
        }
        fire()
    }}

    on:touchmove={(e)=>{
        // console.log(e.touches)
        for (let touch of e.touches){
            console.log(touch)
        }
        let touches = e.touches[0]
        let x = touches.clientX
        let y = touches.clientY
        let button = document.elementFromPoint(x, y)
        if(button){
            if(!$currTouches.includes(button)) {
                if ($currTouches.length>0){
                    for (let item of $currTouches){
                        item.dispatchEvent(new Event('mouseleave'));
                    }
                }
                $currTouches = []
                button.dispatchEvent(new Event('mouseenter'));
                $currTouches = $currTouches.concat(button)
            } 
        }
        
        // console.log(button)
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