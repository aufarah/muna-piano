<script>
    import "../app.css";
	import Navbar from "../lib/components/Navbar.svelte";
</script>

<div class="app">
	<!-- <Header /> -->
	<div class="hill_2"></div>
<div class="hill_1"></div>

	<main class="h-screen w-screen">
		<Navbar></Navbar>
		<slot />
	</main>

	<!-- <footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>