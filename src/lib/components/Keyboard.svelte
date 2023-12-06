<script>
    export let base_frequency,mode;
    import Key from '$lib/components/Key.svelte'
    let curr_frequency = base_frequency

    let frequency_values = []

    //relative
    let curr_key = 0
    for (let key of mode.values){
        switch(mode.type){
            case "division":
                curr_key += key
                curr_frequency = (base_frequency * 2**(curr_key/mode.division) )
                break;
        }
        frequency_values.push(curr_frequency)
    }
    console.log(base_frequency)
    console.log(frequency_values)
</script>
<div>
    <ul class="set anu">
        <Key frequency={base_frequency}></Key>
        {#each frequency_values as value}
            <Key frequency={value}></Key>
        {/each}
        
      </ul>
</div>