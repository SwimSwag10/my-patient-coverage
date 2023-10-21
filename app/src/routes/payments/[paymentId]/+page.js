export const load = ({ params }) => {
    return {
        paymentId: params.paymentId
        // this is where we will call the deltaRequest.js file. We should get an object of data.
        // the exact type of data we need inside of this +page.js file is the "GET * payments" fetch.
        // these could also be inside of the +page.svelte as well.
    }
}