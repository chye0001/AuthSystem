<form id="signin-card">
    <h2>Sign in</h2>
    <div class="form-group">
        <label for="signin-username">Username</label>
        <input id="signin-username" type="text" placeholder="your username..." required>
    </div>

    <div class="form-group">
        <label for="signin-password">Password</label>
        <input id="signin-password" type="password" placeholder="enter your password..." required>
    </div>

    <button type="submit">Sign in</button>
</form>

<style>
    /* Styles from gpt */
    h2 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
    }
    
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }
    
    label {
        margin-bottom: 8px;
        font-weight: 500;
        color: #34495e;
        font-size: 16px;
    }
    
    input {
        padding: 12px;
        border: 1px solid #bdc3c7;
        border-radius: 4px;
        font-size: 16px;
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
        padding: 12px;
        font-size: 16px;
        cursor: pointer;
        font-weight: 500;
        margin-top: 20px;
        transition: background-color 0.3s;
    }
    
    button:hover {
        background-color: #2980b9;
    }

</style>