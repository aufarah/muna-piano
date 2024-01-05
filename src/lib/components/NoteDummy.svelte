<script>
    export let radius, centerX,centerY,initDeg, note_name
    export let division
    import {clickOutside} from "./clickOutside";

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

    
    $: if (elem) {
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
        let deg = rad * division / (2*Math.PI)
        return deg
    }

    function pos2unit(posX,posY){
        //input are absolute to page
        let dX = posX - centerX
        let dY = posY- centerY
        let deg = Math.atan2(dY,dX)+Math.PI/2
        deg = deg * division / (2*Math.PI)
        return deg
    }

    function unit2pos(deg){

        deg = deg * 2*Math.PI/(division)
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

                     deg = Math.round(deg)


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
                    if (e.movementX!=0 || e.movementY!=0) aftermoving = true;
                    left += e.movementX;
                    top += e.movementY;


                    let deg = pos2unit(e.pageX,e.pageY)
                    deg = Math.round(deg)

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
    <button on:click={popper_show} class="note note_button  ">{note_name}</button>
</button>
