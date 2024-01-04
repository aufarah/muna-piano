<script>
    export let radius, centerX,centerY,initDeg
    export let note_id
    import ContextNote from "./ContextNote.svelte";
    import { writable } from 'svelte/store';
    import {scale_config} from "./stores.js";

    import {clickOutside} from "./clickOutside"
    import {get } from 'svelte/store';
    import { onMount } from "svelte";

    let anu = ''
    let elem;
    let moving = false;
    let aftermoving = false
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
        // console.log(note_id)
        // console.log('wkwk: ',$scale_config.mode.values[note_id])
        $scale_config.mode.values[note_id].angle = initDeg
    
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
         let position = {
            left: null,
            top: null
         }

		 node.style.position = 'absolute';

		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';

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
                aftermoving = false;
        });

         window.addEventListener('mousemove', (e) => {
            if (moving) {
                    anu="gerak"

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

                     initDeg = deg
                     let coord = unit2pos(deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;
				}
         })

         window.addEventListener('mouseup', () => {
            // actually_moving = false
            moving = false;
            });
        }

        
        let popper_show = () => {
            if (aftermoving == false){
                popper = true;
                event.stopPropagation();
                return false;
            }

        }
        let popper_hide = () => {
            popper = false
            return false;
        }

</script>

<!-- <style>
	.note {
		border: solid 1px grey;
	}
</style> -->

<svelte:options accessors/>


<button use:dragMe use:clickOutside={popper_hide} class="note rounded-full w-[15%] h-[15%] origin-center -ml-[7.5%] -mt-[7.5%] bg-orange" bind:this={elem} on:contextmenu|preventDefault={()=>{popper_show(); return false}}>
    <button on:click={popper_show} class="note note_button  "></button>
    {#if popper}
    <div use:clickOutside={popper_hide}>
        <ContextNote note_id={note_id} ></ContextNote>
    </div>
    {/if}
</button>
