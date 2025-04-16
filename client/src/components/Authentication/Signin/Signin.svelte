<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import { BASE_URL } from '../../../stores/apiStore.js';
    import { authStore } from '../../../stores/authStore.js';
    import { signIn } from '../../../api/authentication/authentication.js';
  import { navigate } from 'svelte-routing';


    const { from } = $props()
    const originalPath = from.from;

    let username = $state("");
    let password = $state("");

    async function handleSignIn(event) {
        event.preventDefault();

        const credentials = {
            username: username, 
            password: password
        }

        let result;
        if(!$authStore.isAuthenticated) {
            toast("Signing in...", {
                icon: "⏳"
            })

            result = await signIn($BASE_URL, credentials);
        }

        if(result.success) {
            const username = result.data.username;
            const email = result.data.email;
            authStore.signIn(username, email);

            toast.success("Signed in");

            if(originalPath) {
                navigate(originalPath);

            } else {
                navigate("/");
            }

        } else {
            toast.error("Wrong credentials try again...");
        }
    }
</script>


<Toaster />

<form id="signin-card" onsubmit={handleSignIn}>
    <h2>Sign in</h2>
    <div class="form-group">
        <label for="signin-username">Username</label>
        <input bind:value={username} id="signin-username" type="text" placeholder="your username..." required>
    </div>

    <div class="form-group">
        <label for="signin-password">Password</label>
        <input bind:value={password} id="signin-password" type="password" placeholder="enter your password..." required>
    </div>

    <button type="submit">Sign in</button>
</form>



<style>
    @import '../../../styles/form.css';
  </style>