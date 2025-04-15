<script>
    import { navigate } from 'svelte-routing';
  import toast, { Toaster } from 'svelte-french-toast';
  import { signUp } from "../../../api/authentication/authentication";
  import { BASE_URL } from "../../../stores/apiStore";
  import { authStore } from '../../../stores/authStore';

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
        toast.success("Signed up");
        authStore.signIn();
        navigate("/");

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
  /* Styles from gpt */
  h2 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 1.5em;
    font-size: 1.8em;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3em;
  }

  label {
    margin-bottom: 0.4em;
    font-weight: 500;
    color: #34495e;
  }

  input {
    padding: 0.7em;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 0.95em;
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
    padding: 0.8em;
    font-size: 1em;
    cursor: pointer;
    font-weight: 500;
    margin-top: 0.8em;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
