<script context="module">
    export async function preload(page, session) {
        const { isAuthenticated } = session;
        
        if (!isAuthenticated) {
            return this.redirect(302, '/login');
        }
        
        return { isAuthenticated };
    }
</script>

<script>
    import { onMount } from 'svelte';
    import { stores } from '@sapper/app';
    const { session } = stores();

    let user = null;

    let error = '';

    onMount(async () => {
        const response = await fetch('/api/account', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (response.status === 200) {
            user = await response.json();
        } else {
            error = await response.json();
        }
	});

    
</script>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

{#if user}
    <p class="text-green-700">{user.email}</p>
{/if}
