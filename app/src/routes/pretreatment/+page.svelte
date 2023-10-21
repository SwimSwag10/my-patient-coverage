<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import PretreatmentContent from '$lib/components/dashboard/pretreatment/PretreatmentContent.svelte';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <PretreatmentContent />
</div>
<Notification />