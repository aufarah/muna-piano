<script>
    export let radius;


    import { onMount } from "svelte";
    import Note from "./Note.svelte";

    let casing, centerX, centerY,center, centerLeft,centerTop;

    onMount(()=>{
        center = casing.getBoundingClientRect();
        centerLeft = center.left
        centerTop = center.top
        centerX = center.left + window.scrollX + center.width/2;
        centerY = center.top + window.scrollY + center.height/2;
    })


</script>


<div class="relative case" style="width:{radius*2}px;height:{radius*2}px" bind:this={casing}>
    <div class="circle w-full h-full bg-teal-800 rounded-full">
        <Note bind:centerX bind:centerY radius={radius} initDeg={90*Math.PI/180}></Note>
        <Note bind:centerX bind:centerY radius={radius} initDeg={0*Math.PI/180}></Note>
    </div>
</div>