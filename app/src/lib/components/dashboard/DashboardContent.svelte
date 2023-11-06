<script>
  import { clickOutside } from '$lib/utils/clickOutside.js'
  import user from '$lib/assets/icons/user.svg'
  import logo from '$lib/assets/accelerate-logo.png'
  import { fly} from 'svelte/transition'
	import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  let userName = "Jennifer Doe"

  let quote = {};
  let randomquotesNumber = Math.floor((Math.random() * 16) + 1);
  async function getquotes() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      quote = data[randomquotesNumber];
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  onMount(getquotes);
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-[1000px]">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="text-neutral-700">
    <div class="flex justify-center items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">Welcome, {userName}</h2>
    </div>
    <!-- this is where the analytic data will be -->
    {#if quote.text}
      <div class="flex justify-center items-center">
        <div>
          <h2 class="text-2xl font-bold text-neutral-700">"{quote.text}"</h2>
          <h2 class="text-sm font-bold italic text-neutral-500">- {quote.author}</h2>
        </div>
      </div>
    {/if}
  </div>
</div>