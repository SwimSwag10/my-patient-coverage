<script>
  // this is for testing on windows locally
  import paymentTest from '$lib/utils/paymentObjectTests.json';

  import { fly, slide } from 'svelte/transition';
  import { onMount } from "svelte";
  import availityIcon from '$lib/assets/icons/availity.svg';
  import deltaDentalIcon from '$lib/assets/icons/delta-dental.svg'
  import api from '$lib/utils/api.js';
	import { deltaDental } from "$lib/utils/stores.js";
	import { claim_comment } from 'svelte/internal';

  let open = false;
  let elements;
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalPages = 1;

  let payment = [];
  let displayedPayments = [];

  // this is for the Information Requests EFT table
  let informationRequests = false;

  function updateDisplayedPayments() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    displayedPayments = payment.slice(startIndex, endIndex);
  }

  function goToPage(page) {
    if (currentPage !== page) {
      currentPage = page;
      updateDisplayedPayments();
      scrollToTop();
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage += 1;
      updateDisplayedPayments();
      scrollToTop();
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      currentPage -= 1;
      updateDisplayedPayments();
      scrollToTop();
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function getFullNameInitials(fullName) {
    const names = fullName.split(' ');
    const [firstName, lastName] = names;
    const firstInitial = firstName.charAt(0);
    const lastInitial = lastName.charAt(0);
    return firstInitial + lastInitial;
  }

  // ❔ Where are we getting the authHeaders from?
  // async function getPayments() {
  //   let response = await api("/deltadental/payments", "POST", {authHeaders: $deltaDental.authHeaders});
  //   if (response?.body?.payments) {
  //     payment = response.body.payments;
  //   }
  // }

  // this is for local testing on Window. When switching to testing, uncomment the below function and comment the above function.
  async function getPayments() {
    payment = paymentTest.payment.map((p) => ({ ...p, isOpen: false }));
  }

  // New variable to track the currently open dropdown ID
  let openPaymentDropdownId = null;
  let isToggleDropdownClicked = null;
  // Function to handle click on the toggle dropdown button
  function toggleDropdown(paymentId) {
    openPaymentDropdownId = openPaymentDropdownId === paymentId ? null : paymentId;
    isToggleDropdownClicked = true;
  }

  $: {
    if ($deltaDental.authHeaders) {
      getPayments()
    }
  }

  $: {
    if (payment.length) {
      totalPages = Math.ceil(payment.length / itemsPerPage);
      updateDisplayedPayments();
    }
  }

  onMount(() => {
    setTimeout(() => {
      elements = Array.from(document.querySelectorAll('.elementLengthChecker'));
      elements.forEach((element) => {
        const elementWidth = element.offsetWidth;
        let textWidth = element.scrollWidth;
        if (textWidth > elementWidth) {
          const text = element.textContent;
          const ellipsisText = '...';
          let truncatedText = text;
          while (textWidth > elementWidth && truncatedText.length > 0) {
            truncatedText = truncatedText.slice(0, -1);
            element.textContent = truncatedText + ellipsisText;
            textWidth = element.scrollWidth;
          }
        }
      });
    }, 0);
  });
</script>

<!-- we added the outermost div because we removed it from the Sidebar -->
<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col justify-center items-center text-neutral-700 gap-4">
    <div class="flex justify-between px-6 items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">Payments</h2>
      <div class="flex flex-row items-center gap-4">
        <a 
          href="/payments/create" 
          alt="" 
          class="flex items-center w-1/8 h-10 px-4 py-1 rounded-md border border-white bg-transparent text-white hover:text-rose-700 hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-white/50"
        >
          <h2>Create Claim</h2>
          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- Infomration Requests EFTs table. -->
    {#if informationRequests}
      <section class="container mx-auto font-mono table-container">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="w-full text-md font-semibold tracking-wide text-gray-900 bg-neutral-100 uppercase border-b border-gray-300">
                  <th class="px-4 py-1">Information Requested</th>
                </tr>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-neutral-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Payment Number</th>
                  <th class="px-4 py-3">Check Number</th>
                  <th class="px-4 py-3">Net Payment ($)</th>
                  <th class="px-4 py-3">Payment Date</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {#each displayedPayments as payment}
                  <tr class="text-gray-700 hover:bg-neutral-50 group/item">
                    <td class="px-4 py-3 border">
                      <div class="flex items-center text-sm">

                        <button
                          on:click={() => toggleDropdown(payment.id)}
                          class="mr-2 group p-2 rounded-full group/edit invisible group-hover/item:visible"
                          class:bg-neutral-200={openPaymentDropdownId === payment.id}
                          class:visible={openPaymentDropdownId === payment.id}
                        >
                          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>

                        <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img 
                            class="object-cover w-full h-full rounded-full p-[4px] overflow-visible" 
                            src="{deltaDentalIcon}" 
                            alt="" 
                            loading="lazy" 
                          />
                          <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div class="w-40">
                          <a href="{`/payments/${payment.id}`}" alt="none">
                            <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold text-black hover:text-emerald-500">
                              {payment.paymentId}
                            </h2>
                          </a>
                          <p class="text-xs text-gray-600">{payment.insurance_provider}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">{payment.check_number}</td>
                    <td class="px-4 py-3 text-xs border">
                      <span 
                        class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"
                      > 
                        {payment.net_payment_amount} 
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm border">{payment.issue_date}</td>
                  </tr>
                  {#if openPaymentDropdownId === payment.id}
                    {#each payment.claims as claim}
                      <tr>
                        <td colspan="4" class="px-4 py-3 text-xs border">
                          <div class="flex flex-row justify-between w-full h-fit">
                            <div class="flex items-center h-8 px-3 border rounded border-neutral-700">
                              <h2 class="font-semibold">{claim.patientName}</h2>
                            </div>
                          </div>
                          <div class="flex flex-row w-full text-sm">
                            <div class="flex-col w-full">
                              <div class="flex flex-row justify-between w-full">
                                <h2>Type:</h2>
                                <span 
                                  class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"
                                > 
                                  {payment.payment_type} 
                                </span>
                              </div>
                              <div class="flex flex-row justify-between w-full">
                                <h2>Payer:</h2>
                                <h2>{payment.insurance_provider}</h2>
                              </div>
                            </div>
                            <div class="flex-col w-full">
                              <div class="flex flex-row justify-between w-full">

                              </div>
                            </div>
                            <div class="flex-col w-full">
                              <div class="flex flex-row justify-between w-full">

                              </div>
                            </div>
                            <div class="flex-col w-full">
                              <div class="flex flex-row justify-between w-full">

                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    {/each}
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
          <div class="flex flex-row justify-center items-center gap-1 bg-neutral-100 text-neutral-700 font-thin">
            <button class="px-2 py-1 hover:bg-neutral-200" on:click={previousPage}>Previous</button>
            <div class="flex flex-row justify-center items-center">
              {#each Array.from({ length: totalPages }) as _, index}
                <button class="px-1 hover:bg-neutral-200"
                  class:selected={currentPage === index + 1}
                  class:bg-neutral-200={currentPage === index + 1}
                  on:click={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              {/each}
            </div>
            <button class="px-2 py-1 hover:bg-neutral-200" on:click={nextPage}>Next</button>
          </div>
        </div>
      </section>
    {/if}

    {#if displayedPayments.length > 0}
      <section class="container mx-auto font-mono table-container">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-neutral-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Payment Number</th>
                  <th class="px-4 py-3">Check Number</th>
                  <th class="px-4 py-3">Net Payment ($)</th>
                  <th class="px-4 py-3">Payment Date</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {#each displayedPayments as payment}
                  <tr class="text-gray-700 hover:bg-neutral-50 group/item">
                    <td class="px-4 py-3 border">
                      <div class="flex items-center text-sm">

                        <button
                          on:click={() => toggleDropdown(payment.id)}
                          class="mr-2 group p-2 rounded-full group/edit invisible group-hover/item:visible"
                          class:bg-neutral-200={openPaymentDropdownId === payment.id}
                          class:visible={openPaymentDropdownId === payment.id}
                        >
                          <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>

                        <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img 
                            class="object-cover w-full h-full rounded-full p-[4px] overflow-visible" 
                            src="{deltaDentalIcon}" 
                            alt="" 
                            loading="lazy" 
                          />
                          <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div class="w-40">
                          <a href="{`/payments/${payment.id}`}" alt="none">
                            <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold text-black hover:text-emerald-500">
                              {payment.paymentId}
                            </h2>
                          </a>
                          <p class="text-xs text-gray-600">{payment.insurance_provider}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">{payment.check_number}</td>
                    <td class="px-4 py-3 text-xs border">
                      <span 
                        class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"
                      > 
                        {payment.net_payment_amount} 
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm border">{payment.issue_date}</td>
                  </tr>
                  {#if openPaymentDropdownId === payment.id}
                    <!-- TODO: This nested table will eventually need to be abstracted into it's own component. -->
                    <tr class="border">
                      <td colspan="4">
                        {#each payment.claims as claim}
                        <div class="flex flex-row m-4">
                          <a href="{`/payments/${payment.id}/${claim.claimId}`}" 
                            class="flex justify-center items-center w-20 h-20 rounded bg-neutral-100 hover:bg-emerald-700 hover:text-white hover:shadow focus:ring-4 ring-emerald-700/30"
                          >
                            <h2 class="text-[2em] font-bold">{getFullNameInitials(claim.patientName)}</h2>
                          </a>
                          <div class="flex flex-row justify-between items-center w-full ml-4 pb-2 border-b">
                            <div class="flex flex-row gap-4 w-full">
                              <p>Name:</p>
                              <p class="font-normal">{claim.patientName}</p>
                            </div>
                            <div class="flex flex-row gap-4 w-full">
                              <p>Claim Number:</p>
                              <p class="font-normal">{claim.claimNumber}</p>
                            </div>
                            <div class="flex flex-row gap-4 w-full">
                              <p>Member Number</p>
                              <p class="font-normal">{claim.memberNumber}</p>
                            </div>
                          </div>                  
                        </div>
                        {/each}
                      </td>
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </div>
          <div class="flex flex-row justify-center items-center gap-1 bg-neutral-100 text-neutral-700 font-thin">
            <button class="px-2 py-1 hover:bg-neutral-200" on:click={previousPage}>Previous</button>
            <div class="flex flex-row justify-center items-center">
              {#each Array.from({ length: totalPages }) as _, index}
                <button class="px-1 hover:bg-neutral-200"
                  class:selected={currentPage === index + 1}
                  class:bg-neutral-200={currentPage === index + 1}
                  on:click={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              {/each}
            </div>
            <button class="px-2 py-1 hover:bg-neutral-200" on:click={nextPage}>Next</button>
          </div>
        </div>
      </section>
    <!-- If no data is inside of the endpoint -->
    {:else}
      <div class="flex flex-col items-center gap-3 px-10 py-2 rounded border border-neutral-500">
        <div class="flex flex-col gap-2 items-center">
          <h2 class="">You do not have any payments!</h2>
          <h2 class="text-neutral-500 font-thin">Make sure your insurance providers are connected!</h2>
        </div>
        <div class="flex flex-row justify-center items-center gap-3">
          <!-- MAKE SURE YOU CONNECT THIS LINK WHEN THE INSURANC PROVIDER LINK IS MADE -->
          <button class="bg-neutral-100 text-neutral-500 p-2 rounded hover:bg-neutral-200 hover:shadow-md">Insurance Providers</button>
        </div>
      </div>
    {/if}
  </div>
</div>