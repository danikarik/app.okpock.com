<script>
    import { goto } from '@sapper/app';

    let username = '';
    let email = '';
    let password = '';

    let error = '';

    async function handleSubmit(event) {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, email: email, password: password })
        });
        if (response.status === 201) {
            goto('/login');
        } else {
            error = await response.json();
        }
    }
</script>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="username" bind:value={username}>
    <input type="text" name="email" bind:value={email}>
    <input type="password" name="password" bind:value={password}>
    <button type="submit">Register</button>
</form>
