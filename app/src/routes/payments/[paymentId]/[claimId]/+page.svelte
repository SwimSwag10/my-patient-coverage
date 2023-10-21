<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import ClaimContent from '$lib/components/dashboard/ClaimContent.svelte';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <ClaimContent />
</div>
<Notification />

<!-- maybe we have the entire PaymentContent code -->