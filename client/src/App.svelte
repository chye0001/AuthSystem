<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Authentication from './pages/Authentication/Authentication.svelte';
  import Home from './pages/Home/Home.svelte';
  import PetJournal from './pages/PetJournal/PetJournal.svelte';
  import { authStore } from './stores/authStore.js';
  import AuthButton from './components/Authentication/AuthButton/AuthButton.svelte';

  const url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/petjournal">Pet Journal</Link>
    <AuthButton/>
  
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
