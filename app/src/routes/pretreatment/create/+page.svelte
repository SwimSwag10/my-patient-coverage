<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import PretreatmentCreate from '$lib/components/dashboard/pretreatment/PretreatmentCreate.svelte';
  import api from '$lib/utils/api.js';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <PretreatmentCreate />
</div>

<Notification />