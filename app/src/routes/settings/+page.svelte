<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import SettingContent from '$lib/components/dashboard/SettingContent.svelte'
  import Notification from '$lib/components/dashboard/Notification.svelte';
</script>

<Header />
<div class="flex gap-4">
  <SideBar />
  <SettingContent />
</div>
<Notification />