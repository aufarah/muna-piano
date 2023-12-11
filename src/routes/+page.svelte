<script>
    import Keyboard from'$lib/components/Keyboard.svelte';
    import Wheel from '../lib/components/Wheel.svelte';

    let base_frequency = 261.6; //C4
    let mode = {
        "type" : "division",
        "division" : 12,
        "relative": true,
        // "values" : [2,2,1,2,2,2,1]
        "values" : [2,1,4,1,4]
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Keyboard base_frequency={base_frequency} mode={mode}></Keyboard>

<Wheel radius=200></Wheel>
<Wheel radius=300></Wheel>

<div class="w-[900px] h-[900px] bg-teal-300"></div>
<p class="white">wkwkwk</p>
