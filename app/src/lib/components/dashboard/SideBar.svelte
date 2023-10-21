<script>
  import arrow_right from '$lib/assets/icons/arrow_right.svg';
  import { page } from '$app/stores'

  $: activePage = $page.route.id;
</script>

<aside class="flex flex-col justify-between sticky top-0 w-fit h-screen pt-24 pb-4 text-neutral-700">
  
    <div class="grid content-around w-full pl-4 gap-2">
      <!-- sidebar user nav button -->
      <div class="flex items-center h-14 px-3 border rounded border-neutral-400">
        <div class="flex justify-between">
          <div class="w-10 h-10 rounded-full flex justify-center items-center bg-neutral-200">
            <svg class="w-6 h-6" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" stroke-width="2" d="M21.25 10C21.25 13.4517 18.4517 16.25 15 16.25C11.5482 16.25 8.75 13.4517 8.75 10C8.75 6.54822 11.5482 3.75 15 3.75C18.4517 3.75 21.25 6.54822 21.25 10Z"/>
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3.75 26.25C4.9466 22.4046 8.02498 21.25 15 21.25C21.975 21.25 25.0534 22.4046 26.25 26.25"/>
            </svg>
          </div>
          <div class="grid content-center ml-4">
            <div class="text-left font-semibold">Jennifer Doe</div>
            <div class="text-left font-light text-sm">jenniferdoe@gmail.com</div>
          </div>
        </div>
      </div>

      <!-- sidebar home button -->
      <a href="/dashboard" alt="dashboard"
        class="flex justify-between items-center h-10 px-3 rounded hover:bg-neutral-200 transition-colors"
        class:bg-neutral-200={activePage.startsWith("/dashboard")}
      >
        <div class="flex flex-row gap-4">
          <svg class="w-6 h-6" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M22.1522 9.76638C22.9395 10.4974 23.3332 10.863 23.5416 11.3409C23.75 11.8188 23.75 12.356 23.75 13.4304V21.25C23.75 23.607 23.75 24.7855 23.0177 25.5178C22.2855 26.25 21.107 26.25 18.75 26.25H17.5H12.5H11.25C8.89298 26.25 7.71446 26.25 6.98224 25.5178C6.25 24.7855 6.25 23.607 6.25 21.25V13.4304C6.25 12.356 6.25 11.8188 6.4584 11.3409C6.66681 10.863 7.06045 10.4974 7.84775 9.76638L10.625 7.18751L11.5978 6.28424C13.2114 4.78582 14.0183 4.03661 15 4.03661C15.9817 4.03661 16.7886 4.78582 18.4022 6.28424L19.375 7.18751L22.1522 9.76638Z"/>
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.5 26.25V21.25C12.5 19.8693 13.6193 18.75 15 18.75C16.3808 18.75 17.5 19.8693 17.5 21.25V26.25"/>
          </svg>
          <h2>Home</h2>
        </div>
        {#if !activePage.startsWith("/dashboard")}
          <img src={arrow_right} alt draggable="false" class="w-3 h-3">
        {/if}
      </a>

      <!-- sidebar patients button -->
      <a href="/patients" alt="patients"
        class="flex justify-between items-center h-10 px-3 rounded hover:bg-neutral-200 transition-colors"
        class:bg-neutral-200={activePage.startsWith("/patients")}
      >
        <div class="flex flex-row gap-4">
          <svg class="w-6 h-6" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" d="M21.25 10C21.25 13.4517 18.4517 16.25 15 16.25C11.5482 16.25 8.75 13.4517 8.75 10C8.75 6.54822 11.5482 3.75 15 3.75C18.4517 3.75 21.25 6.54822 21.25 10Z"/>
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M3.75 26.25C4.9466 22.4046 8.02498 21.25 15 21.25C21.975 21.25 25.0534 22.4046 26.25 26.25"/>
          </svg>
          <h2>Patients</h2>
        </div>
        {#if !activePage.startsWith("/patients")}
          <img src={arrow_right} alt draggable="false" class="w-3 h-3">
        {/if}
      </a>

      <!-- sidebar payments button -->
      <a href="/payments" alt="payments"
        class="flex justify-between items-center h-10 px-3 rounded hover:bg-neutral-200 focus:bg-neutral-200 transition-colors"
        class:bg-neutral-200={activePage.startsWith("/payments")}
      >
        <div class="flex flex-row gap-4">
          <svg class="w-6 h-6" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M17.4406 7.1875C17.4406 7.1875 15.2409 4.58334 9.99982 4.58334C-0.416607 4.58334 -0.416607 15 9.99982 15C20.4165 15 20.4168 25.4167 10.0001 25.4167C5.53583 25.4167 2.55964 22.8125 2.55964 22.8125"/>
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 1.97916V28.0208"/>
          </svg>
          <h2>Payments</h2>
        </div>
        {#if !activePage.startsWith("/payments")}
          <img src={arrow_right} alt draggable="false" class="w-3 h-3">
        {/if}
      </a>

      <!-- sidebar pre-treatment button -->
      <a href="/pretreatment" alt="pretreatment"
        class="flex justify-between items-center h-10 px-3 rounded hover:bg-neutral-200 focus:bg-neutral-200 transition-colors"
        class:bg-neutral-200={activePage.startsWith("/pretreatment")}
      >
        <div class="flex flex-row gap-4">
          <svg class="w-6 h-6" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M17.2855 6.53554C18.0081 7.25811 18.3694 7.6194 18.5597 8.07882C18.75 8.53825 18.75 9.04919 18.75 10.0711V19.25C18.75 21.607 18.75 22.7855 18.0177 23.5177C17.2855 24.25 16.107 24.25 13.75 24.25H6.25C3.89298 24.25 2.71446 24.25 1.98224 23.5177C1.25 22.7855 1.25 21.607 1.25 19.25V6.75C1.25 4.39298 1.25 3.21446 1.98224 2.48224C2.71446 1.75 3.89298 1.75 6.25 1.75H10.4289C11.4507 1.75 11.9618 1.75 12.4211 1.9403C12.8806 2.1306 13.2419 2.49189 13.9645 3.21446L17.2855 6.53554Z"/>
          </svg>
          <h2>Pre-treatments</h2>
        </div>
        {#if !activePage.startsWith("/pretreatment")}
          <img src={arrow_right} alt draggable="false" class="w-3 h-3">
        {/if}
      </a>

      <!-- sidebar settings button -->
      <a href="/settings" alt="settings"
        class="flex justify-between items-center h-10 px-3 rounded hover:bg-neutral-200 focus:bg-neutral-200 transition-colors"
        class:bg-neutral-200={activePage.startsWith("/settings")}
      >
        <div class="flex flex-row gap-4">
          <svg class="w-6 h-6" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12.8186 5.23508C12.3032 6.47194 10.8581 7.0307 9.64146 6.46919C7.62848 5.54013 5.54 7.62861 6.46906 9.64159C7.03057 10.8582 6.47181 12.3034 5.23495 12.8188C3.29603 13.6266 3.29603 16.3734 5.23495 17.1813C6.47181 17.6966 7.03057 19.1419 6.46906 20.3584C5.54 22.3714 7.62848 24.4599 9.64146 23.5308C10.8581 22.9693 12.3032 23.528 12.8186 24.7649C13.6265 26.7039 16.3732 26.7039 17.1811 24.7649C17.6965 23.528 19.1417 22.9693 20.3582 23.5308C22.3712 24.4599 24.4597 22.3714 23.5306 20.3584C22.9691 19.1419 23.5279 17.6966 24.7647 17.1813C26.7037 16.3734 26.7037 13.6266 24.7647 12.8188C23.5279 12.3034 22.9691 10.8582 23.5306 9.64159C24.4597 7.62861 22.3712 5.54013 20.3582 6.46919C19.1417 7.0307 17.6965 6.47194 17.1811 5.23508C16.3732 3.29616 13.6265 3.29616 12.8186 5.23508Z"/>
            <path stroke="currentColor" stroke-width="2" d="M18.75 15C18.75 17.0711 17.0711 18.75 15 18.75C12.9289 18.75 11.25 17.0711 11.25 15C11.25 12.9289 12.9289 11.25 15 11.25C17.0711 11.25 18.75 12.9289 18.75 15Z"/>
          </svg>
          <h2>Settings</h2>
        </div>
        {#if !activePage.startsWith("/settings")}
          <img src={arrow_right} alt draggable="false" class="w-3 h-3">
        {/if}
      </a>
    </div>
  
    <div class="grid content-around w-full pl-6 gap-3">
      <!-- sidebar footer -->
      <div class="grid content-center h-12 border-b border-neutral-300">
        <div class="font-light text-sm">Created By Accelerate Medical</div>
      </div>
    </div>

</aside>
