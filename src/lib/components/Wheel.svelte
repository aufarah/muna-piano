<script>
    export let radius;


    import { onDestroy, onMount } from "svelte";
    import Note from "./Note.svelte";
    import WheelGrid from "./WheelGrid.svelte";

    import {scale_config} from "./stores.js";

    import { nanoid } from 'nanoid'
    import ContextNote from "./ContextNote.svelte";

    let casing, centerX, centerY,center, centerLeft,centerTop, borderWidth=16;
    let wheel;

    onMount(()=>{
        center = casing.getBoundingClientRect();
        centerLeft = center.left
        centerTop = center.top
        centerX = center.left + window.scrollX + center.width/2;
        centerY = center.top + window.scrollY + center.height/2;
    })


    $: if(wheel){
        // console.log($scale_config.mode)
        wheel.style.transform = `rotate(${$scale_config.mode.root/$scale_config.mode.division * 360}deg)`
    }

    let add_note = () => {

        $scale_config.mode.values[nanoid()] = {
            angle : Math.random()*$scale_config.mode.division
        }
        $scale_config = $scale_config
    }

    function pos2unit(posX,posY){
        //input are absolute to page
        let dX = posX - centerX
        let dY = posY- centerY
        let deg = Math.atan2(dY,dX)+Math.PI/2
        switch ($scale_config.mode.unit){
            case 'division':
                deg = deg * $scale_config.mode.division / (2*Math.PI)
                break;
        }
        return deg
    }

    function dragMe(node) {
        let moving = false, aftermoving = false;
        let left = centerX, top = centerY

        let position = {
            left: null,
            top: null
         }

		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';
         node.style.transform = 'rotate(0deg)'

        node.addEventListener('touchstart', (e) => {
                moving = true;
                aftermoving = false;
                let touches = e.touches[0]
                position.left = touches.pageX 
                position.top = touches.pageY
        });
		 
		node.addEventListener('touchmove', (e) => {
			  if (moving) {
                     let touches = e.touches[0]
                     let movementLeft = touches.pageX - position.left
                     let movementTop = touches.pageY - position.top
                     if (movementLeft!=0 || movementTop!=0) aftermoving = true;
					 left += movementLeft
					 top += movementTop
                     
                     let deg = pos2unit(touches.pageX,touches.pageY )

                    //rounding logic
                    if ($scale_config.clipping){
                        switch ($scale_config.mode.unit){
                            case 'division':
                                deg = Math.round(deg)
                                break;
                            default:  //radian
                                let in12 = deg/(2*Math.PI) * $scale_config.mode.division
                                deg = (2 * Math.PI) * Math.round(in12) / $scale_config.mode.division 
                                break;
                        }

                     }

                     $scale_config.mode.root = deg
                     node.style.transform = `rotate(${$scale_config.mode.root/$scale_config.mode.division * 360}deg)`
                     
                     e.preventDefault();
				}
		 }, { passive: false });

         node.addEventListener('touchend', () => {
                moving = false;
            });

         node.addEventListener('mousedown', (e) => {
                moving = true;
                aftermoving = false;
        });

         window.addEventListener('mousemove', (e) => {
            if (moving) {

                    if (e.movementX!=0 || e.movementY!=0) aftermoving = true;
                    left += e.movementX;
                    top += e.movementY;


                    let deg = pos2unit(e.pageX,e.pageY)

                    //rounding logic
                    if ($scale_config.clipping){
                        switch ($scale_config.mode.unit){
                            case 'division':
                                deg = Math.round(deg)
                                break;
                            default:  //radian
                                let in12 = deg/(2*Math.PI) * $scale_config.mode.division
                                deg = (2 * Math.PI) * Math.round(in12) / $scale_config.mode.division 
                                break;
                        }

                     }

                     $scale_config.mode.root = deg
                     node.style.transform = `rotate(${$scale_config.mode.root/$scale_config.mode.division * 360}deg)`
				}
         })

         window.addEventListener('mouseup', () => {
            // actually_moving = false
            moving = false;
            });
        }

    // $:
</script>

<div class="relative case" style="
        width:{radius*2}px;
        height:{radius*2}px;
        aspect-ratio:1" 
    bind:this={casing}>
    <div  use:dragMe class="absolute w-full h-full" bind:this={wheel}>
        <WheelGrid step={$scale_config.mode.division}/>
    </div>
    <div class="wheel circle w-full h-full border-palely  rounded-full"
        style="
            border-width: {borderWidth/2}px;
            box-shadow : 0px 0px 0px {borderWidth/2}px var(--palely);
        ">

        {#each Object.keys($scale_config.mode.values) as note_key}
            <Note centerX={centerX} centerY={centerY} radius={radius} initDeg={$scale_config.mode.values[note_key].angle} note_id={note_key}></Note>
        {/each}
        
        <!-- <Note bind:centerX bind:centerY radius={radius} initDeg={0*Math.PI/180}></Note> -->
    </div>
    <button on:click={add_note}>Add Note</button>
</div>
