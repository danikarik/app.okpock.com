<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style></style>

<Nav {segment}/>

<main class="pt-16">
	<slot></slot>
</main>
