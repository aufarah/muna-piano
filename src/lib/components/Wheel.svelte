<script>
    export let radius;


    import { onDestroy, onMount } from "svelte";
    import Note from "./Note.svelte";
    import WheelGrid from "./WheelGrid.svelte";

    import {scale_config} from "./stores.js";

    import { nanoid } from 'nanoid'
    import ContextNote from "./ContextNote.svelte";

    let casing, centerX, centerY,center, centerLeft,centerTop, borderWidth=16;

    onMount(()=>{
        center = casing.getBoundingClientRect();
        centerLeft = center.left
        centerTop = center.top
        centerX = center.left + window.scrollX + center.width/2;
        centerY = center.top + window.scrollY + center.height/2;
    })


    // $: console.log($scale_config.mode.values)

    let add_note = () => {

        $scale_config.mode.values[nanoid()] = {
            angle : Math.random()*$scale_config.mode.division
        }
        $scale_config = $scale_config
    }

    // $:
</script>

<div class="relative case" style="
        width:{radius*2}px;
        height:{radius*2}px;
        aspect-ratio:1" 
    bind:this={casing}>
    <div class="absolute w-full h-full">
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
