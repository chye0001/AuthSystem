<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { requestPasswordReset } from "../../api/authentication/authentication.js";
    import { BASE_URL } from "../../stores/apiStore.js";

    let email = $state("");
    let isSent = $state(false);
    let timer = $state(60);

    async function sendPasswordResetRequest(event) {
        event.preventDefault();
        console.log("requested");

        toast("Sending...", {
                icon: "⏳"
            })

        const result = await requestPasswordReset($BASE_URL, email);

        console.log("email link", result.data);

        if (result.success) {
            toast.success("Requst sent, check your email");
            email = "";
            
        } else {
            return toast.error(result.errorMessage);
        }

        //TODO make this persist when leaving page and coming back
        isSent = true;
        const intervalId = setInterval(() => timer--, 1000); //1 seconds
        setTimeout(() => {
            isSent = false;
            clearInterval(intervalId);
            timer = 60;
        }, 60000); // 60 seconds
    }
</script>

<Toaster />

<div class="flex flex-col items-center mt-12">
    <form class="border-2 rounded-2xl px-12 pb-10 pt-12" onsubmit={sendPasswordResetRequest}>
        <h2 class="text-2xl text-center mb-10">Request password reset</h2>

        {#if isSent}
            <h4>{timer} seconds before you can send another request</h4>
        {/if}

        <div class="flex flex-col mt-6 mb-6">
            <label for="email">Email</label>
            <input
            bind:value={email}
            id="email"
            class="rounded"
            type="text"
            placeholder="your email..."
            required
            />

            <button class="text-white mt-4 p-1 rounded-xs hover:opacity-75 bg-sky-600" type="submit">Send</button>
        </div>

    </form>
</div>

<style>
</style>
