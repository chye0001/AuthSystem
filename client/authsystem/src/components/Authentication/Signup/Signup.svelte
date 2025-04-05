<form id="signup-card">
    <h2>Sign up</h2>
    <div class="form-group">
        <label for="signup-username">Username</label>
        <input id="signup-username" type="text" placeholder="your username..." required>
    </div>

    <div class="form-group">
        <label for="signup-email">Email</label>
        <input id="signup-email" type="email" placeholder="enter your email..." required>
    </div>

    <div class="form-group">
        <label for="signup-create-password">Create password</label>
        <input id="signup-create-password" type="password" placeholder="create your password..." required>
    </div>

    <div class="form-group">
        <label for="signup-confirm-password">Confirm password</label>
        <input id="signup-confirm-password" type="password" placeholder="confirm your password..." required>
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
