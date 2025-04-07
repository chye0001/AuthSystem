<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import { authentication } from '../../../stores/authStore.js';
    import { signIn } from '../../../api/authentication/authentication.js';



    let email = $state("");
    let password = $state("");

    //TODO redirection to protected page and implimenting of guard routes.
    async function handleSignIn(event) {
        event.preventDefault();

        const credentials = {
            email: email, 
            password: password
        }

        let result;
        if(!$authentication.isSignedIn) {
            toast("Signing in...", {
                icon: "⏳"
            })

            result = await signIn(credentials);
        }

        result.success ? toast.success("Signed in") : toast.error("Wrong credentials try again...")
    }
</script>


<Toaster />

<form id="signin-card" onsubmit={handleSignIn}>
    <h2>Sign in</h2>
    <div class="form-group">
        <label for="signin-username">Email</label>
        <input bind:value={email} id="signin-username" type="email" placeholder="your email..." required>
    </div>

    <div class="form-group">
        <label for="signin-password">Password</label>
        <input bind:value={password} id="signin-password" type="password" placeholder="enter your password..." required>
    </div>

    <button type="submit">Sign in</button>
</form>



<style>
    /* Styles from gpt */
    h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
    }
    
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }
    
    label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #34495e;
        font-size: 16px;
    }
    
    input {
        padding: 12px;
        border: 1px solid #bdc3c7;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s;
    }
    
    input:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
    
    button {
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 12px;
        font-size: 16px;
        cursor: pointer;
        font-weight: 500;
        margin-top: 20px;
        transition: background-color 0.3s;
    }
    
    button:hover {
        background-color: #2980b9;
    }

</style>