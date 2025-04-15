<script>
  import Signin from '../../components/Authentication/Signin/Signin.svelte';
  import Signup from '../../components/Authentication/Signup/Signup.svelte';
  import { authCardState } from '../../stores/authCardStateStore.js';

  
  let from = $state(window.history.state);

  let isFliped = $state($authCardState.isSigninCard);
  function flipCard() {
    isFliped = !isFliped;
  }
</script>



<div class="container">
  <div class={["card", { isFliped }]}>
    <div class="signup">
      <Signup {from}/>
    </div>

    <div class="signin">
      <Signin {from}/>
    </div>
  </div>

  <!-- TODO ADD FORGOT PASSWORD -->
  <a class="flip-link" onclick={flipCard}>
    { isFliped ? "Dont have an account? Sign Up" : "Already have an account? Sign In" }
  </a>
</div>



<style>
  /* FROM SVELTE DOCS CARD FLIP */
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
    align-items: center;
    justify-content: center;
    perspective: 100vh;
  }

  .card {
    position: relative;
    height: 36em;
    width: 30em;
    background: var(--bg-1);
    border-radius: 2em;
    transform: rotateY(180deg);
    transition: transform 0.4s;
    transform-style: preserve-3d;
    padding: 0;
    user-select: none;
    border: 3px solid black; /* Added border to the card */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: adding a shadow for depth */
  }

  .card.isFliped {
    transform: rotateY(0);
  }

  .signin,
  .signup {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    backface-visibility: hidden;
    border-radius: 2em;
    border: 1px solid var(--fg-2);
    box-sizing: border-box;
    padding: 2em;
  }

  .signin {
    background:
      url(./svelte-logo.svg) no-repeat 5em 5em,
      url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
    background-size:
      8em 8em,
      8em 8em;
  }

  .signup {
    transform: rotateY(180deg);
  }

  .flip-link {
    margin-top: 1em;
    color: var(--fg-1);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
