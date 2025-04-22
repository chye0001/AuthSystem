import { writable } from 'svelte/store';

function authCardStateStore() {
    const {set, update, subscribe} = writable({isSigninCard: false});

    return {
        set,
        update,
        subscribe,
        flipToSignUp: () => {set({isSigninCard: false})},
        flipToSignIn: () => {set({isSigninCard: true})}
    }
}

export const authCardState = authCardStateStore();