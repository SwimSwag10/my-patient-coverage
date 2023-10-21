<script>
  import { clickOutside } from '$lib/utils/clickOutside.js'
  import user from '$lib/assets/icons/user.svg'
  import logo from '$lib/assets/accelerate-logo.png'
  import { fly} from 'svelte/transition'

  let userName = "Jennifer Doe"
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-[1000px]">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="text-neutral-700">
    <div class="flex justify-center items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">Welcome, {userName}</h2>
    </div>
    <!-- this is where the analytic data will be -->
    <h2>this is where the analytic data will be</h2>
    <div class="flex justify-center items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">This is where we will have the quote of the day to encourage the predominantly female workers.  </h2>
    </div>
  </div>
</div>