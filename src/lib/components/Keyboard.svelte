<script>
    import {scale_config} from "./stores.js";
    import Key from '$lib/components/Key.svelte'
    let curr_frequency, frequency_values


    
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
<div>
    <ul class="set anu">
        {#each frequency_values as value}
            <Key frequency={value}></Key>
        {/each}
        
      </ul>
</div>