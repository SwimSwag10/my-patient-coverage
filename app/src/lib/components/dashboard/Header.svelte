<script>
  import Dropdown from '$lib/components/dashboard/header/Dropdown.svelte';
  import user from '$lib/assets/icons/user.svg'
  // import logo from '$lib/assets/icons/mypatientcoverage.svg'
  import logo from '$lib/assets/accelerate-logo.png'
  import { clickOutside } from '$lib/utils/clickOutside.js'

  let userDropdown = false;
  let patientDropdown = false;
  let userName = "Jennifer Doe"
  let userEmail = "jenniferdoe@gmail.com"
</script>

<header class="fixed w-[100%] flex gap-6 items-center h-20 z-[1] px-6 bg-white text-neutral-700 shadow-md">
  <a href="/dashboard">
    <img src="{logo}" alt="logo" class="w-30 h-10">
  </a>
  <div class="flex justify-between items-center basis-full">
    <div class="flex gap-10 ">
      <div class="font-light">Alpha Version 1.0</div>
    </div>
    <div class="flex gap-10 align-middle">

      <div use:clickOutside on:click_outside={() => userDropdown = false} class="relative">
        <button on:click={() => userDropdown = !userDropdown} class="w-[3rem] h-[3rem] rounded-full flex justify-center items-center bg-neutral-200 hover:bg-neutral-300">
          <img src="{user}" alt draggable="false" class="w-8 h-8">
        </button>
        <Dropdown userShow={userDropdown} userName={userName} userEmail={userEmail} />
      </div>

    </div>
  </div>
</header>