<script>
    export let radius;
    import { onMount } from "svelte";

    let casing, centerX, centerY,center;

    onMount(()=>{
        center = casing.getBoundingClientRect();
        centerX = center.left + window.scrollX + center.width/2;
        centerY = center.top + window.scrollY + center.height/2;
    })


    function pos2deg(centerX,centerY,posX,posY){
        //input are absolute to page
        let dX = posX - centerX
        let dY = posY- centerY
        return Math.atan2(dY,dX)
    }

    function deg2pos(centerX,centerY,deg){
        //output will be relative to casing
        let posX = radius * Math.cos(deg) + centerX - center.left
        let posY = radius * Math.sin(deg) + centerY - center.top
        return [posX, posY];
    }

	function dragMe(node) {
        console.log(radius)
		 let moving = false;
		 let left = Number(String(radius));
		 let top = 0;

         let initial = node.getBoundingClientRect();
         let initial_left = initial.left + window.scrollX;
         let initial_top = initial.top + window.scrollY;

         let position = {
            left: null,
            top: null
         }

		 node.style.position = 'absolute';
		 node.style.top = `${top}px`;
		 node.style.left = `${left}px`;
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
                     
                     let deg = pos2deg(centerX,centerY,touches.pageX,touches.pageY )
                     let coord = deg2pos(centerX,centerY,deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;
                    // position.left = coord[0] 
                    //  position.top = coord[1] 
                    // node.style.top = `${top}px`;
					//  node.style.left = `${left}px`;
                     position.left = touches.pageX
                     position.top = touches.pageY

                     e.preventDefault();
				}
		 }, { passive: false });

         node.addEventListener('touchend', () => {
                moving = false;
            });

         window.addEventListener('mousedown', (e) => {
                moving = true;
        });

         window.addEventListener('mousemove', (e) => {
            if (moving) {
					 left += e.movementX;
					 top += e.movementY;


                     let deg = pos2deg(centerX,centerY,e.pageX,e.pageY)
                     let coord = deg2pos(centerX,centerY,deg)

					 node.style.top = `${coord[1]}px`;
					 node.style.left = `${coord[0]}px`;
				}
         })

         window.addEventListener('mouseup', () => {
                moving = false;
            });


	
	}
</script>

<style>
	h1 {
		border: solid 1px grey;
	}
</style>

<div class="bg-teal-400 relative case" style="width:{radius*2}px;height:{radius*2}px" bind:this={casing}>
    <div class="circle w-full h-full bg-teal-800 rounded-full">

    </div>
    <h1 use:dragMe  class="rounded-full w-[50px] h-[50px] origin-center -ml-[25px] -mt-[25px]"></h1>
</div>