<script context="module">
	export async function preload(page, session) {
        const { type, token } = await page.query;
		return { type, token };
	}
</script>

<script>
    import { goto } from '@sapper/app';
    export let type;
    export let token;

    let password = '';
    let error = '';

    async function handleSubmit(event) {
        const response = await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: type, token: token, password: password })
        });
        if (response.status === 202) {
            goto('/login');
        } else {
            error = await response.json();
        }
    }
</script>

<svelte:head>
	<title>Reset</title>
</svelte:head>


{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
    <input type="password" name="password" bind:value={password}>
    <button type="submit">Reset</button>
</form>
