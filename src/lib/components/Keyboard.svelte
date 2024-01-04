<script>
    import {scale_config} from "./stores.js";
    import Key from '$lib/components/Key.svelte'
    let curr_frequency, key_members

    let my_keyboard, width, curr_scroll=0;
    let innerWidth = 0
    let innerHeight = 0

    let scale_step = 2
    // $: if(my_keyboard){
    //     width =  my_keyboard.clientWidth
    // }

    $: if (innerWidth && my_keyboard && $scale_config){
        width =  my_keyboard.scrollWidth - my_keyboard.offsetWidth
    }

    // $:{
    //     console.log('::', innerHeight, innerWidth)
    // }

    // let scroll_keyboard = () => {
    //     let width = my_keyboard.clientWidth;

    // }
    
    $: if ($scale_config) {
        key_members = []
        let curr_key = 0

        if ($scale_config.mode.division>0){
            for (let i = 0; i<scale_step; i++){
                    for (let key in $scale_config.mode.values) {
                        switch($scale_config.mode.unit){
                            case "division":
                                curr_key = $scale_config.mode.values[key]['angle'] - $scale_config.mode.root
                                curr_key += $scale_config.mode.division*(curr_key<0)
                                curr_key = curr_key%$scale_config.mode.division
                                curr_frequency = ($scale_config.base_frequency * $scale_config.scale_ratio**(i + curr_key/$scale_config.mode.division) )
                                break;
                        }
                        let item = {
                            value: curr_frequency,
                            note_id : key,
                            note_name : $scale_config.mode.values[key].note_name,
                            scale_step : i+1
                        }
                        key_members.push(item)
                    }
                }
        }


        key_members = key_members.sort(function(a, b){
                                return a.value-b.value
                           })
    }

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="card rounded-3xl bg-chocomilk w-full sm:w-fit px-4 max-w-[100vw]">
    <div id="menu-keyboard" class="h-[2em] w-full rounded-3xl mt-2 h-fit">
        <div class="w-[300px] flex">
            <label class=" text-xs" for="clipping">Scale Step Number:</label>
            <input class=" text-xs w-[10pt]" id="clipping" type="number" bind:value={scale_step} />
        </div>

    </div>
    <!-- <div> -->
        <input type="range" min="0" max={width} bind:value={curr_scroll} class="slider w-full" id="myRange" on:input={()=>{my_keyboard.scroll(curr_scroll,0)}} >
    <!-- </div> -->
    <ul class="keyboard" bind:this={my_keyboard}>
        {#each key_members as member}
            <Key key_data={member}></Key>
        {/each}
        
      </ul>
</div>