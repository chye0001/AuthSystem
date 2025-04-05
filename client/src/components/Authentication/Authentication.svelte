<script>
  import Signin from './Signin/Signin.svelte';
  import Signup from './Signup/Signup.svelte';

  import toast, { Toaster } from 'svelte-french-toast';

  function handleClick() {
    toast.success("Hello, world!");
  }

  let flipped = $state(false);

  function flipCard() {
    flipped = !flipped;
  }
</script>

<Toaster />
<button type="button" onclick={handleClick}>Toast</button>

<div class="container">
  <div class={["card", { flipped }]}>
    <div class="signup">
      <Signup />
    </div>

    <div class="signin">
      <Signin />
    </div>
  </div>

  <a href="#" class="flip-link" onclick={flipCard}>
    {flipped
      ? "Dont have an account? Sign Up"
      : "Already have an account? Sign In"}
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

  .card.flipped {
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
