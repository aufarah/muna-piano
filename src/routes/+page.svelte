<script>
    import CardTuning from '../lib/components/CardTuning.svelte';
    import Keyboard from'$lib/components/Keyboard.svelte';
	import ss_muna from "../lib/assets/ss_muna.png"
</script>

<!-- <div class=""> -->
<svelte:head>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="Muna Piano" />
    <meta property="og:description" content="Muna Piano is highly customizable online musical Instrument. It offers ability to tune specifically each key, experimenting with any musical scale, and let everyone explore many world musical tradition by supporting microtonal and non-octavian music system. Muna Piano let you create your own musical instrument."/>
    <meta property="og:url" content="https://munapiano.netlify.app/" />
    <meta property="og:image" content={ss_muna} />
</svelte:head>
    <!-- <div class="bg-teal-400 h-[50%]"></div> -->
<div class="flex flex-col justify-center items-center gap-y-8 mt-4">
    <CardTuning></CardTuning>
    <Keyboard></Keyboard>
</div>




