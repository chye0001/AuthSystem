<script>
    import toast, { Toaster } from 'svelte-french-toast';
  import { requestPasswordReset } from '../../api/authentication/authentication.js';
  import { BASE_URL } from '../../stores/apiStore.js';

    let email = $state("");
    let isSent = $state(false);
    let timer = $state(60);

    async function sendPasswordResetRequest(event) {
        event.preventDefault();
        console.log("requested");

        const result = await requestPasswordReset($BASE_URL, email);

        console.log("email link", result.data);
        
        if(result.success) {
            toast.success("Requst sent, check your email");
            email = "";

        } else {
            toast.error(result.errorMessage);
            return;
        }

        //TODO make this persist when leaving page and coming back
        isSent = true;
        const intervalId = setInterval(() => console.log(timer--), 1000) //1 seconds
        setTimeout(() => {
            isSent = false;
            clearInterval(intervalId);
            timer = 60;
        }, 60000); // 60 seconds
        
    }
</script>


<Toaster/>

{#if isSent}
    <h4>{timer} seconds before you can send another request</h4>
{/if}

<form onsubmit={sendPasswordResetRequest}>
    <h2>Request password reset</h2>
    <div class="form-group">
        <label for="email">Email</label>
        <input bind:value={email} id="email" type="text" placeholder="your email..." required>
    </div>

    <button type="submit">Send</button>
</form>

<style>
    @import '../../styles/form.css';
</style>
