<script>
    import { navigate } from 'svelte-routing';
  import toast, { Toaster } from 'svelte-french-toast';
  import { signUp } from "../../../api/authentication/authentication";
  import { BASE_URL } from "../../../stores/apiStore";
  import { authStore } from '../../../stores/authStore';

  const { from } = $props();
  const originalPath = from.from;

  let username = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");

  
  async function onSignUp(event) {
    event.preventDefault();

    const isPasswordTheSame = passwordCheck();    
    if (!isPasswordTheSame) {
        toast.error("Password is not the same");
        return;
    }
    
    const signUpData = {
      username: username,
      email: email,
      password: password,
    };

    toast("Signing up...", {
                icon: "⏳"
            })
    const result = await signUp($BASE_URL, signUpData);

    if(result.success) {
        const username = result.data.username;
        const email = result.data.email;
        authStore.signIn(username, email);

        toast.success("Signed up");

        if(originalPath){
          navigate(originalPath);

        } else {
          navigate("/");
        }

    } else {
        toast.error(result.errorMessage);
    }
    
  }

  function passwordCheck() {
    if (password !== confirmPassword) {
        return false;
    }

    return true
  }
</script>


<Toaster/>
<form onsubmit={onSignUp} id="signup-card">
  <h2>Sign up</h2>
  <div class="form-group">
    <label for="signup-username">Username</label>
    <input
      bind:value={username}
      id="signup-username"
      type="text"
      placeholder="your username..."
      required
    />
  </div>

  <div class="form-group">
    <label for="signup-email">Email</label>
    <input
      bind:value={email}
      id="signup-email"
      type="email"
      placeholder="enter your email..."
      required
    />
  </div>

  <div class="form-group">
    <label for="signup-create-password">Create password</label>
    <input
      bind:value={password}
      id="signup-create-password"
      type="password"
      placeholder="create your password..."
      required
    />
  </div>

  <div class="form-group">
    <label for="signup-confirm-password">Confirm password</label>
    <input
      bind:value={confirmPassword}
      id="signup-confirm-password"
      type="password"
      placeholder="confirm your password..."
      required
    />
  </div>

  <button type="submit">Sign up</button>
</form>

<style>
  @import '../../../styles/form.css';
</style>
