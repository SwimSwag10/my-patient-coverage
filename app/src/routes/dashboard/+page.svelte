<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import DashboardContent from "$lib/components/dashboard/DashboardContent.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import api from '$lib/utils/api.js'
	import { onMount } from "svelte";
	import { deltaDental } from "$lib/utils/stores.js";

  /*
  *
  * TODO: This API request is sent everytime the page is loaded. Should this happen? Or should it only happen when we press
  * the sign up button from the sign up page? We are going to have to have someway of calling the delta data somehow when
  * we visit the homepage - since we are not storing any of the data. So, yes, actually, we will need to send out a request
  * to deltadental to login everytime we load the homepage. We will also have to mount a response to all of the other insurance
  * providers that a profile has a part of their profile.
  * 
  */

  onMount(() => {
    // Delta Dental login requets to fetch the data we will need.
    api("/deltadental/login", "POST", {credentials: $deltaDental.credentials}).then(response => {
      $deltaDental.authHeaders = response.body.authHeaders
    })

    // This will be for the other insurance provider logins.
    // api("/deltadental/login", "POST", {credentials: $deltaDental.credentials}).then(response => {
    //   $deltaDental.authHeaders = response.body.authHeaders
    // })
  })

  /*
  *
  * TODO: add an api fetch request to the inspirational quotes generator.
  * We want to also make sure to pass in the response of that api request inside of a component variable to DashboardContent.
  * 
  */
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <DashboardContent />
</div>
<Notification />