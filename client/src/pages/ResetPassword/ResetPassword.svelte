<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import { navigate } from 'svelte-routing';
  import { resetPassword } from '../../api/authentication/authentication.js';
  import { authCardState } from '../../stores/authCardStateStore.js';
  import { BASE_URL } from '../../stores/apiStore.js';

    let newPassword = $state("");
    let confirmPassword = $state("");

   
    const path = window.location.href.split("/");
    const corretPath = path.length === 5;
    if (!corretPath) {
        navigate("/404-not-found");
    }

    const resetPasswordToken = path.pop();



    async function changePassword(event) {
        event.preventDefault();
        
        const checkPassed = checkPassword();
        if(!checkPassed) {
            toast.error("Passwords are not the same");
            return;  
        } 
        
        toast("Reseting password...", {
                icon: "⏳"
            })
        const result = await resetPassword($BASE_URL, resetPasswordToken, newPassword);
        
        if(result.success) {
            toast.success("Password has been reset");
            authCardState.flipToSignIn();
            setTimeout(() => navigate("/authenticate"), 3000); //3 seconds

        } else {
            toast.error(result.errorMessage);
        }
    } 

    function checkPassword() {
        if(newPassword !== confirmPassword) {
            return false;
        }

        return true;
    }
</script>

<!-- TODO fixed the broken 404 not found redirections. current error you have to reload page before content is shown -->
{#if corretPath}
    <Toaster/>

    <div class="card container">

        <form onsubmit={changePassword}>
            <h2>Reset password</h2>
            <div class="form-group">
                <label for="new-password">New password</label>
                <input bind:value={newPassword} id="new-password" type="password" placeholder="enter your new password..." required>
            </div>
            
            <div class="form-group">
                <label for="confirm-password">Confirm password</label>
                <input bind:value={confirmPassword} id="confirm-password" type="password" placeholder="confirm your password..." required>
            </div>
            
            <button type="submit">Reset</button>
        </form>
    </div>
{:else} 
    <h1>404</h1>
    <h2>Not Found</h2>

{/if}


<style>
    @import '../../styles/form.css';

    input{
        margin-left: 2em;
        margin-right: 2em;
    }

    button{
        margin-left: 2em;
        margin-right: 2em;
    }
</style>
