<script>
  import { clickOutside } from '$lib/utils/clickOutside.js'
  import { fly, fade } from 'svelte/transition'

  import availity from '$lib/assets/icons/availity.svg'
  import deltaDental from '$lib/assets/icons/delta-dental.svg'

  let showDropdown = false;
  let showTooltip = false;

  const determineInsuranceDowntime = () => {
    return true;
  }
  function handleMouseEnter() {
    setTimeout(() => {
      showTooltip = true;
    }, 500);
  }
  function handleMouseLeave() {
    showTooltip = false;
  }
</script>

<div class="fixed right-2 bottom-2">
  {#if determineInsuranceDowntime}
    <div use:clickOutside on:click_outside={() => showDropdown = false}>
      <button on:click={() => showDropdown = !showDropdown} class="relative m-2 inline-flex">
        <div class="absolute bottom-[15%] left-[15%] right-auto top-auto inline-block -translate-x-2/4 translate-y-1/2 rounded-full bg-rose-700 w-3 h-3"></div>
        <div class="flex items-center justify-center rounded-full bg-white w-10 h-10 hover:border hover:border-neutral-700 text-center shadow-lg">
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="mx-auto w-5 text-neutral-700" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>
          </div>
        </div>
      </button>
      {#if showDropdown}
        <button in:fly={{ x: 100, duration: 100 }} out:fade={{ duration: 100 }} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} class="absolute group flex flex-col justify-center items-center bottom-2 left-[-80%] bg-white shadow rounded-full hover:border hover:border-neutral-700 w-10 h-10 whitespace-nowrap">
          <span class="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-7px] bg-neutral-700 text-white font-thin text-sm px-1 py-[2px] rounded shadow-lg" class:visible={showTooltip} class:invisible={!showTooltip}>
            Availity
          </span>
          <img src="{availity}" alt="">
        </button>
        <button in:fly={{ x: 100, duration: 100 }} out:fade={{ duration: 100 }} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} class="absolute group flex flex-col justify-center items-center bottom-2 left-[-170%] bg-white shadow rounded-full hover:border hover:border-neutral-700 w-10 h-10 whitespace-nowrap">
          <span class="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-7px] bg-neutral-700 text-white font-thin text-sm px-1 py-[2px] rounded shadow-lg" class:visible={showTooltip} class:invisible={!showTooltip}>
            Delta Dental
          </span>
          <img src="{deltaDental}" alt="" class="w-7 h-7">
        </button>
      {/if}
    </div>
  {/if}
</div>