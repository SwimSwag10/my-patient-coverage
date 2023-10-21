import {writable} from "svelte/store"

export const deltaDental = writable({
    credentials: "",
    authHeaders: {}
})

export const publicKey = writable("")