<script>
    export let step = 12
</script>

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" r="20" cy="50" fill="var(--palely)" transform="rotate({0}, 50, 50)"/>
    <rect x="49.5" width="1" height="30" y="20" fill="var(--orange)" transform="rotate({0}, 50, 50)"/>
    <polygon points="47,20 50,10 53,20"fill="var(--orange)" transform="rotate({0}, 50, 50)"/>
    
    <!-- Rounded corner rectangle -->
    {#each {length: step} as _, i}
        <rect x="50" width="1" height="5" fill="var(--darkgreen)" transform="rotate({360*i/step}, 50, 50)"/>
    {/each}
</svg>
  