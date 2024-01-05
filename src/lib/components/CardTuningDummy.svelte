<script>
    import Wheel from "./Wheel.svelte";
    import {scale_config} from "./stores.js"
    import {modes} from './modes'
    import { nanoid } from 'nanoid'
import { log } from "tone/build/esm/core/util/Debug";

    // $: console.log($scale_config.mode.values)
    let division = $scale_config['mode']['division']
    let unit = $scale_config.mode.unit
    let selected_mode = [1,0]

    let innerWidth = undefined
    let innerHeight = undefined
    let not_mobile = true;

    $: if(innerWidth<=640){
        not_mobile = false;
    } else {
        not_mobile = true
    }

    let pickFromList = () => {
        let i = 0
        let values = {}
        let my_mode = modes[selected_mode[0]].member[selected_mode[1]]

        for (let item of  my_mode.notes){
            let note_name = i+1;
            if(my_mode.note_names!=undefined){
                note_name = my_mode.note_names[i]
            }
            values[nanoid() ] = {
                note_name,
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

<style>

/* Core styles/functionality */
.tab_input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.tab__content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.35s;
}
.tab_input:checked ~ .tab__content {
  max-height: 100%;
}

.tab__label,
.tab__close {
  text-align: left;
  display: flex;
  color: var(--darkgreen);
  background: var(--theme);
  cursor: pointer;
}
.tab__label {
  justify-content: space-between;
}
.tab__label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  transform: rotate(90deg);
  transition: all 0.35s;
}
.tab_input:checked + .tab__label::after {
  transform: rotate(270deg);
}
.tab__content p {
  margin: 0;
  padding: 1rem;
}
.tab__close {
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}
.accordion--radio {
  --theme: var(--secondary);
}

/* Arrow animation */
.tab_input:not(:checked) + .tab__label:hover::after {
  animation: bounce .5s infinite;
}
@keyframes bounce {
  25% {
    transform: rotate(90deg) translate(.25rem);
  }
  75% {
    transform: rotate(90deg) translate(-.25rem);
  }
}

</style>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="tuningcard">
    <div class="w-[160px] mr-[3rem] h-full sm:mb-0 mb-8">
        <h1>Tuning Palette</h1>

        <select name="mode" id="mode" class="w-full h-full mt-2" size={not_mobile*10} bind:value={selected_mode} on:change={pickFromList} defa>
            {#each modes as group, group_idx}
            <optgroup label={group.group_name}>
                {#each group.member as member, member_idx}
                        <option value={[group_idx, member_idx]}>{member.name}</option>
                {/each}
            </optgroup>
            {/each}
        </select>
    </div>
    <Wheel radius=100></Wheel>
    <div class="sm:ml-[3rem] w-[160px] self-start sm:mt-0 mt-8">
        <section class="accordion">
            <div class="tab">
              <input type="checkbox" name="accordion-1" id="cb1" checked={not_mobile} class="tab_input">
              <label for="cb1" class="tab__label"><h1>Tuning</h1></label>
              <div class="tab__content">
                <div >
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
        </section>


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
    <option value="5"> 5 TET (Nusantaran) </option>
</datalist>

<datalist id="commonRatio">
    <option value="1.98">1.98 (Embat Larasati)</option>
    <option value="2">2 (Octave)</option>
    <option value="2.02">2.02 (Embat Sundari)</option>
    <option value="2.04">2.04 (Embat Mucuk bung)</option>
    <option value="3">3 (Tritave)</option>
</datalist>