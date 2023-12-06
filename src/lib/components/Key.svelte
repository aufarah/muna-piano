<script>
    import * as Tone from 'tone'

    export let frequency

    function fire(){
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(frequency, "8n");
    }

</script>

<li class="white b" on:click={fire}></li>