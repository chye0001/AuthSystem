import { writable } from 'svelte/store';

//TODO add isUser / isAdmin later for roles / authorization features
function initAuthStore() {
    let isAuthenticated = false;
    let username = "";
    let email = "";

    const user = JSON.parse(localStorage.getItem("authenticated"));
    if (user !== null) {
        isAuthenticated = user.isAuthenticated;
        username = user.username;
        email = user.email;
    }
    
    const { set, update, subscribe } = writable({ isAuthenticated: isAuthenticated , username: username, email: email});

    return {
        set,
        update,
        subscribe,
        signIn: (username, email) => {
            const user = {
                isAuthenticated: true,
                username: username,
                email: email
            }
            
            localStorage.setItem("authenticated", JSON.stringify(user));
            set({  isAuthenticated: true, username: username, email: email });
        },
        signOut: () => {
            localStorage.removeItem("authenticated");
            set({ isAuthenticated: false, username: "", email: "" });
        },
        isAuthenticated: () => {
            const isAuthenticated = localStorage.getItem("authenticated");
            if(!isAuthenticated) {
                return false;
            }

            return true;
        }
    }
}

export const authStore = initAuthStore();