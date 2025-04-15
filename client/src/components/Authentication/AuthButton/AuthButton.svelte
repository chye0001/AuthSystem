<script>
  import { navigate } from "svelte-routing";
  import { authCardState } from "../../../stores/authCardStateStore.js";
  import { authStore } from "../../../stores/authStore.js";

  function onSignIn() {
    authCardState.flipToSignIn();
    navigate("/authenticate", { replace: true });
  }

  function onSignUp() {
    authCardState.flipToSignUp();
    navigate("/authenticate", { replace: true });
  }

  function signOut() {
    authStore.signOut();
  }
</script>

<div>
  {#if !$authStore.isSignedIn}
    <button onclick={onSignIn}>Sign in</button>
    <button onclick={onSignUp}>Sign up</button>

  {:else}
    <button onclick={signOut}>Sign out</button>
    
  {/if}
</div>
