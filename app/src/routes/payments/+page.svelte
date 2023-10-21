<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Notification from '$lib/components/dashboard/Notification.svelte';
  import PaymentContent from '$lib/components/dashboard/PaymentContent.svelte';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <PaymentContent />
</div>

<!-- maybe we have the entire PaymentContent code -->
<!-- Yes, I think so. I moved the notification component below it. -->

<Notification />