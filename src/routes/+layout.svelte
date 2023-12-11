<script>
    import "../app.css";
	import Navbar from "../lib/components/Navbar.svelte";
</script>

<div class="app">
	<!-- <Header /> -->
	<main class="h-screen w-screen">
		<Navbar></Navbar>
		<slot />
	</main>

	<!-- <footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>