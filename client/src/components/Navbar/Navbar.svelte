<script>
    import { authentication } from "../../stores/authStore.js";
</script>



<nav>
  <ul>
    <li><a href="">Home</a></li>
    <li><a href="">s</a></li>
    <li><a href="">f</a></li>
  </ul>

  <button>{ $authentication.isSignedIn ? "Sign out" : "Sign in" }</button>
</nav>



<!-- Styles by Gemini -->
<style>
  nav {
    background-color: #f0f0f0; /* Light gray background */
    padding: 15px 20px; /* Some padding around the navbar */
    display: flex; /* Arrange items horizontally */
    justify-content: space-between; /* Space out the list and the button */
    align-items: center; /* Vertically align items in the center */
  }

  ul {
    list-style: none; /* Remove bullet points */
    padding: 0;
    margin: 0;
    display: flex; /* Arrange list items horizontally */
  }

  li {
    margin-right: 15px; /* Space between list items */
  }

  li:last-child {
    margin-right: 0; /* Remove margin from the last item */
  }

  a {
    text-decoration: none; /* Remove underlines from links */
    color: #333; /* Dark gray link color */
    font-weight: bold; /* Make links a bit bolder */
  }

  a:hover {
    color: #007bff; /* Blue color on hover */
  }

  button {
    background-color: #007bff; /* Blue button background */
    color: white; /* White button text */
    border: none; /* Remove button border */
    padding: 10px 15px; /* Padding inside the button */
    border-radius: 5px; /* Slightly rounded corners */
    cursor: pointer; /* Change cursor to indicate it's clickable */
    font-weight: bold;
  }

  button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
</style>
