<script>
  export let userShow;
  export let patientShow;
  export let userName;
  export let userEmail;

  import user from '$lib/assets/icons/user.svg';

  import { slide } from 'svelte/transition';
</script>

{#if userShow}
  <div 
    transition:slide="{{ duration: 150 }}" 
    class="absolute flex flex-col top-[90%] bg-white right-0 rounded-b whitespace-nowrap shadow-lg shadow-black/20"
  >
    <div class="flex border-neutral-400 border-b p-4">
      <div class="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-neutral-200"><img src="{user}" alt draggable="false" class="w-[3rem] h-[3rem]"></div>
      <div class="grid content-center ml-4">
        <div class="text-left font-semibold">{userName}</div>
        <div class="text-left font-light">{userEmail}</div>
      </div>
    </div>
    <!-- Add your custom dropdown content here -->
    <div class="flex flex-col mb-2">
      <a href="/policy" on:click={() => {userShow = false;}} 
        class="pl-4 text-left my-1 py-2 hover:bg-neutral-100 focus:bg-neutral-100">Privacy Policy</a>
      <a href="/" on:click={() => {userShow = false;}} 
        class="pl-4 text-left my-1 py-2 hover:bg-neutral-100 focus:bg-neutral-100">Sign Out</a>  
    </div>
  </div>
{/if}

{#if patientShow}
  <div 
    transition:slide="{{ duration: 150 }}" 
    class="absolute flex flex-col top-[90%] bg-white right-0 rounded-b whitespace-nowrap shadow-lg shadow-black/20"
  >
    <div class="flex items-center justify-center border-neutral-400 bg-neutral-50 border-b py-3">
      <div class="grid content-center">
        <div class="font-semibold underline underline-offset-2">Specify member search criteria</div>
      </div>
    </div>
    <form class="flex flex-col mt-4 gap-2">
      <div class="flex flex-row items-center gap-2 pl-4">
        <h2 class="w-[50%] pr-4 border-r border-neutral-700">Member ID</h2>
        <input
          id="memberId"
          placeholder="Member ID or SSN"
          type="text"
          class="pl-2 text-left my-1 hover:bg-neutral-100 focus:bg-neutral-100"
        />
      </div>
      <div class="flex flex-row items-center gap-2 pl-4">
        <h2 class="w-[50%] pr-4 border-r border-neutral-700">Date of Birth</h2>
        <input
          id="memberId"
          placeholder="01/01/2000"
          type="text"
          class="pl-2 text-left my-1 hover:bg-neutral-100 focus:bg-neutral-100"
        />
      </div>
      <button  
        on:click={() => {patientShow = false;}}
        class="pl-4 text-left py-2 rounded-b hover:bg-neutral-100 focus:bg-neutral-100"
      >
        Add Patient
      </button>
    </form>
  </div>
{/if}
