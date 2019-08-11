<script>
    import { stores } from '@sapper/app';
    const { session } = stores();

    let email = '';

    let data = '';
    let error = '';

    async function handleSubmit(event) {
        const response = await fetch('/api/recover', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        if (response.status === 200) {
            data = await response.json();
        } else {
            error = await response.json();
        }
    }
</script>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

{#if data}
    <p class="text-green-700">{data.email}</p>
    <p class="text-green-700">{data.sentAt}</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="email" bind:value={email}>
    <button type="submit">Recover</button>
</form>
