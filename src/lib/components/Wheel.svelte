<script>
    export let radius;


    import { onDestroy, onMount } from "svelte";
    import Note from "./Note.svelte";
    import ContextNote from "./ContextNote.svelte";

    let casing, centerX, centerY,center, centerLeft,centerTop, borderWidth=16;

    onMount(()=>{
        center = casing.getBoundingClientRect();
        centerLeft = center.left
        centerTop = center.top
        centerX = center.left + window.scrollX + center.width/2;
        centerY = center.top + window.scrollY + center.height/2;
    })

    let note_id = 0
    let Notes = {
        0: {
            angle : 0 //in radian
        }
    }

    $: console.log(Notes)

    let add_note = () => {
        note_id+=1
        Notes[note_id] = {
            angle : note_id*15
        }
    }

    let delete_note = () => {
        // nodeRef
        // console.log(Notes[note_id].elem)
        // let anu = Notes[note_id].elem.$destroy()
        // console.log(anu)
        delete Notes[note_id] 
        Notes = Notes
        note_id-=1
    }

    // $:
</script>

<div class="relative case" style="
        width:{radius*2}px;
        height:{radius*2}px;" 
    bind:this={casing}>
    <div class="wheel circle w-full h-full border-palely  rounded-full"
        style="
            border-width: {borderWidth/2}px;
            box-shadow : 0px 0px 0px {borderWidth/2}px var(--palely);
        ">

        {console.log('wkwkw',Object.keys(Notes))}
        {#each Object.keys(Notes) as note_key}
        {#if (Notes[note_key]!=undefined)}
            <Note bind:centerX bind:centerY radius={radius} bind:initDeg={Notes[note_key].angle} bind:note_id={note_key}></Note>
        {/if}
        {/each}
        
        <!-- <Note bind:centerX bind:centerY radius={radius} initDeg={0*Math.PI/180}></Note> -->
    </div>
    <button on:click={add_note}>wkw</button>
    <button on:click={delete_note}>hihi</button>
</div>