<script>
    import toast, { Toaster } from "svelte-french-toast";
    import { navigate } from "svelte-routing";
    import { resetPassword } from "../../api/authentication/authentication.js";
    import { authCardState } from "../../stores/authCardStateStore.js";
    import { BASE_URL } from "../../stores/apiStore.js";

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
        if (!checkPassed) {
            toast.error("Passwords are not the same");
            return;
        }

        toast("Reseting password...", {
            icon: "⏳",
        });
        const result = await resetPassword(
            $BASE_URL,
            resetPasswordToken,
            newPassword,
        );

        if (result.success) {
            toast.success("Password has been reset");
            authCardState.flipToSignIn();
            setTimeout(() => navigate("/authenticate"), 3000); //3 seconds
        } else {
            toast.error(result.errorMessage);
        }
    }

    function checkPassword() {
        if (newPassword !== confirmPassword) {
            return false;
        }

        return true;
    }
</script>

<!-- TODO fixed the broken 404 not found redirections. current error you have to reload page before content is shown -->
{#if corretPath}
    <Toaster />

    <div class="flex flex-col items-center mt-12">
        <form
            class="border-2 rounded-2xl px-16 pb-8 pt-12"
            onsubmit={changePassword}
        >
            <h2 class="text-2xl text-center mb-10">Reset password</h2>

            <div class="flex flex-col mt-6 mb-6">
                <label for="new-password">New password</label>
                <input
                    class="mb-6 rounded"
                    bind:value={newPassword}
                    id="new-password"
                    type="password"
                    placeholder="enter your new password..."
                    required
                />

                <label for="confirm-password">Confirm password</label>
                <input
                    class="mb-4 rounded"
                    bind:value={confirmPassword}
                    id="confirm-password"
                    type="password"
                    placeholder="confirm your password..."
                    required
                />

                <button
                    class="text-white mt-4 p-1 rounded-xs hover:opacity-75 bg-sky-600"
                    type="submit">Reset</button
                >
            </div>
        </form>
    </div>
{:else}
    <h1>404</h1>
    <h2>Not Found</h2>
{/if}

<style>
</style>
