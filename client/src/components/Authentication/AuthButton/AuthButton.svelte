<script>
  import { navigate } from "svelte-routing";
  import { authCardState } from "../../../stores/authCardStateStore.js";
  import { authStore } from "../../../stores/authStore.js";
  import { BASE_URL } from "../../../stores/apiStore.js";
  import { signOut } from "../../../api/authentication/authentication.js";


  function signIn() {
    console.log("signin clicked");
    authCardState.flipToSignIn();
    navigate("/authenticate", { replace: true });
  }

  function signUp() {
    console.log("signup clicked");
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
    
    <div class="flex justify-between">
      <button class="p-2 mr-3 border rounded" onclick={signIn}>Sign in</button>
      <button class="p-2 border rounded" onclick={signUp}>Sign up</button>
    </div>

  {:else}
    <button class="p-2 border rounded" onclick={onSignOut}>Sign out</button>
    
  {/if}
</div>
