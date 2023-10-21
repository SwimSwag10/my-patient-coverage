<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import PatientContent from "$lib/components/dashboard/PatientContent.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <PatientContent />
</div>
<Notification />