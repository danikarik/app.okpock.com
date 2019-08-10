<!-- <script context="module">
    export async function preload(page, session) {
        const { isAuthenticated } = session;
        
        if (isAuthenticated) {
            return this.redirect(302, '/');
        }
        
        return { isAuthenticated };
    }
</script> -->

<script>
    import { goto, stores } from '@sapper/app';
    const { session } = stores();

    let username = '';
    let password = '';

    let error = '';

    async function handleSubmit(event) {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
        if (response.status === 200) {
            session.set({ isAuthenticated: true });
            goto('/account');
        } else {
            error = await response.json();
        }
    }
</script>

<h1>{$session.isAuthenticated}</h1>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="username" bind:value={username}>
    <input type="password" name="password" bind:value={password}>
    <button type="submit">Login</button>
</form>
