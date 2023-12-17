<script>
    import Wheel from "./Wheel.svelte";
    import {scale_config} from "./stores.js"


    $: console.log($scale_config)
</script>

<div class="card rounded-3xl p-8 h-fit min-w-[700px] max-w-[1000px] bg-chocomilk flex flex-row">
    <Wheel radius=200></Wheel>
    <div class="ml-[3rem]">
        <h1>Tuning</h1>
        <div>
            <label for="pickBaseFreq">Base Frequency (Hz)</label>
            <input type="number" id="pickBaseFreq" bind:value={$scale_config['base_frequency']} list="baseFreq" >

            <label for="division">Division</label>
            <input type="number" id="division" bind:value={$scale_config['mode']['division']} list="commonStep" >

            <label for="scale_ratio">Scale Ratio</label>
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