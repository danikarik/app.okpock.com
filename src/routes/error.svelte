<script context="module">
	export async function preload(page, session) {
        const { message, error } = await page.query;
		return { message, error };
	}
</script>

<script>
    let status = 500;

    export let message;
    export let error;
</script>

<style>
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

{#if message}
    <p>{message}</p>
{/if}

{#if error}
    <p>{error}</p>
{/if}
