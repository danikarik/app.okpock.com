<script>
    import { goto, stores } from '@sapper/app';
    const { session } = stores();

    async function handleSubmit(event) {
        const response = await fetch('/api/logout', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            session.set({
                isAuthenticated: false,
                user: false
            })
            goto('/');
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <button type="submit">Logout</button>
</form>
