<script>
    export let step = 12
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Rounded corner rectangle -->
    {#each {length: step} as _, i}
        <rect x="50" width="1" height="5" fill="var(--darkgreen)" transform="rotate({360*i/step}, 50, 50)"/>
    {/each}
</svg>
  