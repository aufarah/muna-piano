<script>
    import {scale_config} from "./stores.js";
    import Key from '$lib/components/Key.svelte'
    let curr_frequency, frequency_values

    let my_keyboard, width, curr_scroll=0;
    let innerWidth = 0
    let innerHeight = 0

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
        frequency_values = []
        let curr_key = 0

        if ($scale_config.mode.division>0){
            for (let i = 0; i<=1; i++){
                    for (let key in $scale_config.mode.values) {
                        switch($scale_config.mode.unit){
                            case "division":
                                curr_key = $scale_config.mode.values[key]['angle'] - $scale_config.mode.root
                                curr_key += $scale_config.mode.division*(curr_key<0)
                                curr_key = curr_key%$scale_config.mode.division
                                console.log(curr_key)
                                curr_frequency = ($scale_config.base_frequency * $scale_config.scale_ratio**(i + curr_key/$scale_config.mode.division) )
                                break;
                        }
                        frequency_values.push(curr_frequency)
                    }
                }
        }


        frequency_values = frequency_values.sort(function(a, b){return a-b})
    }

</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class=" rounded-3xl bg-chocomilk w-full sm:w-fit px-4">
    <div id="menu-keyboard" class="h-[2em] w-full rounded-3xl ">
       
    </div>
    <!-- <div> -->
        <input type="range" min="0" max={width} bind:value={curr_scroll} class="slider w-full" id="myRange" on:input={()=>{my_keyboard.scroll(curr_scroll,0)}} >
    <!-- </div> -->
    <ul class="keyboard" bind:this={my_keyboard}>
        {#each frequency_values as value}
            <Key frequency={value}></Key>
        {/each}
        
      </ul>
</div>