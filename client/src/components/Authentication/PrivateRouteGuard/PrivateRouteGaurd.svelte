<script>
    import { navigate } from 'svelte-routing';
    import { authStore } from '../../../stores/authStore.js';
    import { authCardState } from '../../../stores/authCardStateStore.js';

    if(!authStore.isAuthenticated()) {
        authCardState.flipToSignIn();
        navigate("/authenticate", {
			state: { from: window.location.pathname },
			replace: true,
		});
    }
</script>



{#if authStore.isAuthenticated()}
    <slot/>
{/if}