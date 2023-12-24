<script>
    import Wheel from "./Wheel.svelte";
    import {scale_config} from "./stores.js"
    import {modes} from './modes'
    import { nanoid } from 'nanoid'

    // $: console.log($scale_config.mode.values)
    let division = $scale_config['mode']['division']
    let unit = $scale_config.mode.unit
    let selected_mode = [1,0]

    let pickFromList = () => {
        let i = 1
        let values = {}
        let my_mode = modes[selected_mode[0]].member[selected_mode[1]]
        for (let item of  my_mode.notes){
            values[nanoid() ] = {
                note_name : i,
                angle : item
            }
            i++;
        }
        division = my_mode.division;
        $scale_config.mode = {
            "unit" : "division",
            "root" : my_mode.root,
            "division" : my_mode.division, 
            "relative": false,
            "values" : values
        }
        // console.log($scale_config) -> will trigger recursive
    }

    pickFromList()



    $:{
        //when division change, update all:
        // let old_division = 
        let real_division = division
        if (division==null || division <=0) {
            real_division  = 1
        }
        switch (unit){
                case 'division':
                    if (real_division > 0){
                        for (const note_id in $scale_config['mode']['values']){
                            $scale_config['mode']['values'][note_id]['angle'] = $scale_config['mode']['values'][note_id]['angle'] * real_division / $scale_config['mode']['division']
                        }   
                    }

                    break;
                }
        $scale_config['mode']['division'] = real_division
    }
</script>

<div class="card rounded-3xl p-8 h-fit min-w-[700px] max-w-[1000px] bg-chocomilk flex flex-row">
    <div>
        <select name="mode" id="mode" size="8" bind:value={selected_mode} on:change={pickFromList}>
            {#each modes as group, group_idx}
            <optgroup label={group.group_name}>
                {#each group.member as member, member_idx}
                    <option value={[group_idx, member_idx]}>{member.name}</option>
                {/each}
            </optgroup>
            {/each}
        </select>
    </div>
    <Wheel radius=140></Wheel>
    <div class="ml-[3rem]">
        <h1>Tuning</h1>
        <div>
            <label for="pickBaseFreq" class="block">Base Frequency (Hz)</label>
            <input type="number" id="pickBaseFreq" bind:value={$scale_config['base_frequency']} list="baseFreq" >


            <label for="division" class="block">Division</label>
            <input type="number" id="division" bind:value={division} list="commonStep" >

            <label for="scale_ratio" class="block">Scale Ratio</label>
            <input type="number" id="scale_ratio" bind:value={$scale_config['scale_ratio']} list="commonRatio" >
        </div>

        <div class="mt-4">
            <input id="clipping" class="checkbox" type="checkbox" bind:checked={$scale_config['clipping']} />
            <label class="ml-2" for="clipping">Turn on Clipping</label>
        </div>

    </div>
</div>

<datalist id="baseFreq">
    <option value="261.63">261.63 (C4)</option>
    <option value="440">440 (A4)</option>
    <option value="130.81">130.81 (C3)</option>
    <option value="220">2220 (A3)</option>
</datalist>

<datalist id="commonStep">
    <option value="12">12 TET (Western)</option>
    <option value="24">24 TET (Middle Eastern)</option>
    <option> 5 </option>
    <option>7</option>
    <option>9</option>
</datalist>

<datalist id="baseFreq">
    <option value="2">2 (Octave)</option>
    <option value="3">3 (Tritave)</option>
</datalist>