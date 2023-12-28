<script>
    import CardTuning from '../lib/components/CardTuning.svelte';
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

<!-- <div class=""> -->

    <!-- <div class="bg-teal-400 h-[50%]"></div> -->
<div class="hill_2"></div>
<div class="hill_1"></div>

<div class="flex flex-col justify-center items-center gap-y-8 mt-4">
    <CardTuning></CardTuning>
    <Keyboard></Keyboard>
</div>




