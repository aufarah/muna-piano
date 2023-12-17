<script>
    import {scale_config} from "./stores.js";
    import Key from '$lib/components/Key.svelte'
    let curr_frequency, frequency_values


    
    $: if ($scale_config) {
        frequency_values = []
        let curr_key = 0
        for (let key of (Object.values($scale_config.mode.values)).sort()){
            switch($scale_config.mode.unit){
                case "division":
                    curr_key = key['angle']
                    curr_frequency = ($scale_config.base_frequency * 2**(curr_key/$scale_config.mode.division) )
                    break;
            }
            frequency_values.push(curr_frequency)
        }
    }

</script>
<div>
    <ul class="set anu">
        {#each frequency_values as value}
            <Key frequency={value}></Key>
        {/each}
        
      </ul>
</div>