<script>
    export let radius, centerX,centerY,initDeg
    export let note_id, note_name
    import ContextNote from "./ContextNote.svelte";
    import { writable } from 'svelte/store';
    import {scale_config} from "./stores.js";

    import {clickOutside} from "./clickOutside"
    import {get } from 'svelte/store';
    import { onMount } from "svelte";

    let anu = ''
    let elem;
    
    let intra_trigger = writable(0);
    let current_division, current_unit, old_division, old_unit;
    let initial, left, top; 
    let not_loaded = true

    let popper = false

    let refreshNote = () => {
        //idk why we should repeat these again:
        initial = unit2pos(initDeg)
        left = initial[0]
        top = initial[1]
        elem.style.top = `${top}px`;
		elem.style.left = `${left}px`;
        popper = false
    }

    $: if(centerX!== undefined&&elem&&not_loaded) {
        refreshNote()
    }

    // $: $scale_config.mode.values.note_id.angle = initDeg

    // $: {
    //     old_unit = current_unit
    //     old_division = current_division
    //     current_unit  = $scale_config['mode']['unit']
    //     current_division  = $scale_config['mode']['division']
    //     $intra_trigger += 1
    // }

    // $: {
    //     let deg;
    //     $intra_trigger
    //     switch (current_unit){
    //         case 'division':
    //             deg = rad * current_division / old_division
    //             break
    //     }
    //     $scale_config.mode.values[note_id] = {
    //         angle : initDeg
    //     }
    // }
    
    $: if (elem) {

        $scale_config.mode.values[note_id] = {
            angle : initDeg
        }
        refreshNote()
    }
    
    function pos2rad(posX,posY){
        //input are absolute to page
        let dX = posX - centerX
        let dY = posY- centerY
        let deg = Math.atan2(dY,dX)+Math.PI/2
        return deg
    }

    function rad2unit(rad){
        switch ($scale_config.mode.unit){
            case 'division':
                let deg = rad * $scale_config.mode.division / (2*Math.PI)
                return deg
                break;
        }
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

    function unit2pos(deg){
        //output will be relative to casing
        switch ($scale_config.mode.unit){
            case 'division':
                deg = deg * 2*Math.PI/($scale_config.mode.division)
                break;
        }
        let posX = radius * Math.cos(deg-Math.PI/2) + centerX - (centerX-radius)
        let posY = radius * Math.sin(deg-Math.PI/2) + centerY - (centerY-radius)
        return [posX, posY];
    }

	function dragMe(node) {
        let moving = false;

         let position = {
            left: null,
            top: null
         }

		 node.style.position = 'absolute';

		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';

        node.addEventListener('touchstart', (e) => {
                moving = true;
                let touches = e.touches[0]
                position.left = touches.pageX 
                position.top = touches.pageY
        });
		 
		node.addEventListener('touchmove', (e) => {
			  if (moving) {
                     let touches = e.touches[0]
                     let movementLeft = touches.pageX - position.left
                     let movementTop = touches.pageY - position.top
					 left += movementLeft
					 top += movementTop
                     
                     let deg = pos2unit(touches.pageX,touches.pageY )

                    //rounding logic
                     if ($scale_config.clipping){
                        let in12 = deg/(2*Math.PI) * $scale_config.mode.division
                        deg = (2 * Math.PI) * Math.round(in12) / $scale_config.mode.division 
                     }

                     initDeg = deg
                     let coord = unit2pos(deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;

                     position.left = touches.pageX
                     position.top = touches.pageY

                     e.preventDefault();
				}
		 }, { passive: false });

         node.addEventListener('touchend', () => {
                moving = false;
            });

         node.addEventListener('mousedown', (e) => {
                moving = true;
                anu = "teken"
        });

         window.addEventListener('mousemove', (e) => {
            if (moving) {
                    anu="gerak"
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

                     initDeg = deg
                     let coord = unit2pos(deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;
				}
         })

         window.addEventListener('mouseup', () => {
             anu ="lepas"
                moving = false;
            });
        }

        
        let popper_show = () => {
            popper = true;
            event.stopPropagation();
        }
        let popper_hide = () => {
            popper = false
        }

</script>

<!-- <style>
	.note {
		border: solid 1px grey;
	}
</style> -->

<svelte:options accessors/>

<div use:dragMe class="note rounded-full w-[50px] h-[50px] origin-center -ml-[25px] -mt-[25px] bg-orange" bind:this={elem}>
    <button on:click={popper_show}>{note_id}</button>
    {#if popper}
    <div use:clickOutside={
        ()=>{
            console.log('anying')
            popper=false
        }
    }>
        <ContextNote note_id={note_id} ></ContextNote>
    </div>
    {/if}
</div>
