<script context="module">
    export async function preload(page, session) {
        let user = '';
        let error = '';

        const response = await this.fetch('/api/account', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.status === 200) {
            user = await response.json();
        } else {
            error = await response.json();
        }

        return { user, error };
    }
</script>

<script>
    export let user = '';
    export let error = '';

    let newUsername = '';

    async function handleUsernameChange(event) {
        const response = await fetch('/api/account/username', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username: newUsername })
        });
        if (response.status === 200) {
            const data = await response.json();
            user.username = data.username;
        } else {
            error = await response.json();
        }
    }
</script>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

{#if user}
    <p class="text-green-700">{user.email}</p>
    <p class="text-green-700">{user.username}</p>

    {#if user.userMetaData.suggestChangeUsername}
        <p class="text-red-400">Change username</p>
    {/if}

    <h2>Change username</h2>
    <form on:submit|preventDefault={handleUsernameChange}>
        <input type="text" name="username" bind:value={newUsername}>
        <button>Update</button>
    </form>
{/if}
