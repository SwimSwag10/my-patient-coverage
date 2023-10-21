<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import ClaimCreate from '$lib/components/dashboard/ClaimCreate.svelte';
  import api from '$lib/utils/api.js';

  // get the user data from the input form.
  // add the user input form data to the api call.

  export async function createClaim(formData) {
    
  }
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <ClaimCreate />
</div>

<Notification />