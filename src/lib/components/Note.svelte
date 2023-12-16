<script>
    export let radius, centerX,centerY,initDeg
    export let note_id, note_name
    import { onMount } from "svelte";

    let anu = ''
    let elem;
    let initial, left, top; 
    let not_loaded = true

    $: if(centerX!== undefined&&elem&&not_loaded) {
        initial = deg2pos(initDeg)
        left = initial[0]
        top = initial[1]
        elem.style.top = `${top}px`;
		elem.style.left = `${left}px`;
        not_loaded=false
    }

    function pos2deg(posX,posY){
        //input are absolute to page
        let dX = posX - centerX
        let dY = posY- centerY
        return Math.atan2(dY,dX)
    }

    function deg2pos(deg){
        //output will be relative to casing
        let posX = radius * Math.cos(deg) + centerX - (centerX-radius)
        let posY = radius * Math.sin(deg) + centerY - (centerY-radius)
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
                     
                     let deg = pos2deg(touches.pageX,touches.pageY )
                     initDeg = deg
                     let coord = deg2pos(deg)

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


                     let deg = pos2deg(e.pageX,e.pageY)
                     initDeg = deg
                     let coord = deg2pos(deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;
				}
         })

         window.addEventListener('mouseup', () => {
             anu ="lepas"
                moving = false;
            });
        }

</script>

<!-- <style>
	.note {
		border: solid 1px grey;
	}
</style> -->

<svelte:options accessors/>

<div use:dragMe class="note rounded-full w-[50px] h-[50px] origin-center -ml-[25px] -mt-[25px] bg-orange" bind:this={elem}>
    {note_id}
</div>