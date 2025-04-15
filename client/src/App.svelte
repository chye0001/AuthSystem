<script>
  import { Router, Link, Route, navigate } from 'svelte-routing';
  import Authentication from './pages/Authentication/Authentication.svelte';
  import Home from './pages/Home/Home.svelte';
  import PetJournal from './pages/PetJournal/PetJournal.svelte';
  import { authStore } from './stores/authStore.js';
  import { authCardState } from './stores/authCardStateStore.js';

  function onSignIn() {
    console.log("signin");
    
    authCardState.flipToSignIn();
    navigate("/authenticate", { replace: true });
  }

  function onSignUp() {
    console.log("signup");
    
    authCardState.flipToSignUp();
    navigate("/authenticate", { replace: true });
  }

  function signOut() {
    authStore.signOut();
  }

  const url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/petjournal">Pet Journal</Link>
    <div>
      {#if !$authStore.isSignedIn}
        <button onclick={onSignIn}>Sign in</button>
        <button onclick={onSignUp}>Sign up</button>
      
      {:else}
        <button onclick={signOut}>Sign out</button>
    
      {/if}
    </div>
  
  </nav>

  <div>
    <Route path="/">
      <Home/>
    </Route>

    <Route path="/petjournal">
      <PetJournal/>
    </Route>

    <Route path="/authenticate">
      <Authentication/>
    </Route>
  </div>
</Router>
