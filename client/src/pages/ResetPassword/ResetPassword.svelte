<script>
    import toast, { Toaster } from 'svelte-french-toast';
  import { resetPassword } from '../../api/authentication/authentication.js';
  import { BASE_URL } from '../../stores/apiStore.js';
  import { navigate } from 'svelte-routing';

    let newPassword = $state("");
    let confirmPassword = $state("");

    async function changePassword(event) {
        event.preventDefault();
        
        const checkPassed = checkPassword();
        if(!checkPassed) {
            toast.error("Passwords are not the same");
            return;  
        } 

        const resetPasswordToken = window.location.href.split("/").pop();
        const result = await resetPassword($BASE_URL, resetPasswordToken, newPassword);
        
        if(result.success) {
            toast.success("Password has been reset");
            setTimeout(() => navigate("/"), 3000); //3 seconds

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


<Toaster/>
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

<style>
    @import '../../styles/form.css';
</style>
