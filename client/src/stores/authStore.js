import { writable } from 'svelte/store';

//TODO add isUser / isAdmin later for roles / authorization features
function initAuthStore() {
    const { set, update, subscribe } = writable({ isSignedIn: false });

    return {
        set,
        update,
        subscribe,
        signIn: () => {
            localStorage.setItem("authenticated", "true");
            set({ isSignedIn: true })
        },
        signOut: () => {
            localStorage.removeItem("authenticated");
            set({ isSignedIn: false })
        }
    }
}

export const authStore = initAuthStore();