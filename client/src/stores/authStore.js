import { writable } from 'svelte/store';

//TODO add isUser / isAdmin later for roles / authorization features
function authStore() {
    const { set, update, subscribe } = writable({ isSignedIn: false });

    return {
        set,
        update,
        subscribe,
        signOut: () => {set({ isSignedIn: false })},
        signIn: () => {set({ isSignedIn: true })}
    }
}

export const authentication = authStore();