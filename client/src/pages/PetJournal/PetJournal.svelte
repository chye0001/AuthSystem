<script>
    import { authStore } from '../../stores/authStore.js';
</script>

<div class="flex flex-col items-center">
    <h1>Pet Journal page</h1>
    <h2>Welcome {$authStore.username}, to the private route!</h2>
</div>
