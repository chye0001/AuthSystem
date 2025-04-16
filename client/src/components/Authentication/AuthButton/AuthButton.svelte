<script>
  import { navigate } from "svelte-routing";
  import { authCardState } from "../../../stores/authCardStateStore.js";
  import { authStore } from "../../../stores/authStore.js";
  import { BASE_URL } from "../../../stores/apiStore.js";
  import { signOut } from "../../../api/authentication/authentication.js";


  function signIn() {
    authCardState.flipToSignIn();
    navigate("/authenticate", { replace: true });
  }

  function signUp() {
    authCardState.flipToSignUp();
    navigate("/authenticate", { replace: true });
  }

  async function onSignOut() {
    await signOut($BASE_URL);
    authStore.signOut();
    navigate("/");
  }
</script>

<div>
  {#if !$authStore.isAuthenticated}
    <button onclick={signIn}>Sign in</button>
    <button onclick={signUp}>Sign up</button>

  {:else}
    <button onclick={onSignOut}>Sign out</button>
    
  {/if}
</div>
