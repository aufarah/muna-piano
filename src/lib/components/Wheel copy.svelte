<script>
	function dragMe(node) {
		 let moving = false;
		 let left = 300;
		 let top = 100;

         let initial = node.getBoundingClientRect();
         let initial_left = initial.left + window.scrollX;
         let initial_top = initial.top + window.scrollY;

		 node.style.position = 'absolute';
		 node.style.top = `${top}px`;
		 node.style.left = `${left}px`;
		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';

         let offset_left = 0
         let offset_top = 0

		 node.addEventListener('touchstart', (e) => {
			 moving = true;
             let start_touch = node.getBoundingClientRect();
             let touches = e.touches[0]
             offset_left = touches.pageX - start_touch.left - window.scrollX;
             offset_top = touches.pageY - start_touch.top - window.scrollY;
             console.log(offset_left,offset_top, touches)
             console.log(start_touch.left,start_touch.top)
		 });
		 
		window.addEventListener('touchmove', (e) => {
			  if (moving) {
                     let touches = e.touches[0]
					 left = touches.pageX - initial_left - offset_left;
					 top = touches.pageY - initial_top - offset_top;
					 node.style.top = `${top}px`;
					 node.style.left = `${left}px`;
                    //  console.log(e.movementX)
				}
		 });
		
		 window.addEventListener('touchend', () => {
			 moving = false;
		 });
	
	}
</script>

<style>
	h1 {
		border: solid 1px grey;
	}
</style>

<div class="w-[800px] h-[800px] bg-teal-400 relative">
    <h1 use:dragMe >
		Drag Me
	</h1>
</div>