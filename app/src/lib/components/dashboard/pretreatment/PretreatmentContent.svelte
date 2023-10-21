<script>
  import { fly } from 'svelte/transition'
  import user from '$lib/assets/icons/user.svg'
  let globalPatient = true;
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit xl:pr-4">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col justify-center items-center text-neutral-700 gap-4">
    <div class="flex justify-between px-6 items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">Pre-Treatments</h2>
      <a 
        href="/pretreatment/create" 
        alt="" 
        class="flex items-center w-1/8 h-10 px-4 py-1 rounded-md border border-white bg-transparent text-white hover:text-rose-700 hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-white/50"
      >
        <h2>Create Pre-treatment</h2>
        <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>
    </div>
    {#if globalPatient }
      <div>
        <h2>Okaygebusiness</h2>
      </div>
    {/if}
  </div>
</div>