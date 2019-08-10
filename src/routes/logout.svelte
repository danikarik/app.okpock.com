<script context="module">
    export async function preload(page, session) {
        const { isAuthenticated } = session;
        
        if (!isAuthenticated) {
            return this.redirect(302, '/');
        }
        
        return { isAuthenticated };
    }
</script>

<script>
    import { stores } from '@sapper/app';
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
            session.set({ isAuthenticated: false })
        }
    }
</script>

<h1>{$session.isAuthenticated}</h1>

<form on:submit|preventDefault={handleSubmit}>
    <button type="submit">Logout</button>
</form>
