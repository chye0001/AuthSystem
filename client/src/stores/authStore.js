import { writable } from 'svelte/store';

//TODO add isUser / isAdmin later for roles / authorization features
function initAuthStore() {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    const { set, update, subscribe } = writable({ isAuthenticated: isAuthenticated });

    return {
        set,
        update,
        subscribe,
        signIn: () => {
            localStorage.setItem("authenticated", "true");
            set({ isAuthenticated: true })
        },
        signOut: () => {
            localStorage.removeItem("authenticated");
            set({ isAuthenticated: false })
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