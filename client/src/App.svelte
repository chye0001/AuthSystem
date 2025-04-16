<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Authentication from './pages/Authentication/Authentication.svelte';
  import Home from './pages/Home/Home.svelte';
  import PetJournal from './pages/PetJournal/PetJournal.svelte';
  import AuthButton from './components/Authentication/AuthButton/AuthButton.svelte';
  import PrivateRoute from './components/Authentication/PrivateRoute/PrivateRoute.svelte';
  import RequestPasswordReset from './pages/ResetPassword/RequestPasswordReset.svelte';
  import ResetPassword from './pages/ResetPassword/ResetPassword.svelte';

  const url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home...</Link>
    <Link to="/petjournal">Pet Journal</Link>
    <AuthButton/>
  
  </nav>

  <div>
    <Route path="/">
      <Home/>
    </Route>

    <PrivateRoute path="/petjournal">
      <PetJournal/>
    </PrivateRoute>

    <Route path="/authenticate">
      <Authentication/>
    </Route>

    <Route path="/request-reset-password">
      <RequestPasswordReset/>
    </Route>

    <Route path="/restpassword/*">
      <ResetPassword/>
    </Route>

    <!-- TODO create a 404 not found -->
  </div>
</Router>