<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import { authentication } from '../../../stores/authStore.js';
    import { signIn } from '../../../api/authentication/authentication.js';



    let username = $state("");
    let password = $state("");

    function handleSignIn() {
        const credentials = {
            username: username, 
            password: password
        }

        const result = signIn(credentials);

        result.success ? toast.success("Signing in") : toast.error("Wrong credentials try again...")
    }
</script>


<Toaster />

<form id="signin-card">
    <h2>Sign in</h2>
    <div class="form-group">
        <label for="signin-username">Username</label>
        <input bind:value={username} id="signin-username" type="text" placeholder="your username..." required>
    </div>

    <div class="form-group">
        <label for="signin-password">Password</label>
        <input bind:value={password} id="signin-password" type="password" placeholder="enter your password..." required>
    </div>

    <button onclick={handleSignIn}>Sign in</button>
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