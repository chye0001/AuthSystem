<script>
  import { Route } from 'svelte-routing';
  import PrivateRouteGaurd from '../PrivateRouteGuard/PrivateRouteGaurd.svelte';

    const path = $props();
    const redirectPath = path.path;
    
</script>

<Route {redirectPath}>
    <PrivateRouteGaurd>
        <slot/>
    </PrivateRouteGaurd>
</Route>