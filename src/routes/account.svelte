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
</script>

{#if error}
    <p class="text-red-700">{error.message}</p>
{/if}

{#if user}
    <p class="text-green-700">{user.email}</p>

    {#if user.userMetaData.suggestChangeUsername}
        <p class="text-red-400">Change username</p>
    {/if}
{/if}
