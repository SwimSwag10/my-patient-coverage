<script>
  import { fly } from 'svelte/transition';
  import { onMount } from "svelte";
  import availity from '$lib/assets/icons/availity.svg';
  import deltaDentalIcon from '$lib/assets/icons/delta-dental.svg';
  import arrowLeft from '$lib/assets/icons/arrowLeft.svg';
  import { payment } from '$lib/utils/paymentObjectTests.json';
  import { page } from '$app/stores'

  let paymentData;
  let resolvedIndividualPayment;

  async function getDeltaPaymentData() {
    // const requestHeaders = {}

    // const response = await fetch("paymentObjectTest.json", {
    //     method: 'POST',
    //     headers: requestHeaders,
    //     body: "testing",
    // })

    // if (response.ok) {
    //     console.log(await response.json())
    // }
    return payment
  }

  async function downloadClaimAsCSV(paymentId, claimId) {
    paymentData = getDeltaPaymentData()
    const claimData = paymentData.then(data => {
      const payment = data[$page.params.paymentId];
      const claim = payment.claims.find(claim => claim.claimId === claimId);
      return claim;
    });

    const claim = await claimData;

    if (claim) {
      const csvContent = generateCSVContent(claim);
      const encodedURI = encodeURIComponent(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedURI}`);
      link.setAttribute("download", `${paymentId}-${claimId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  function generateCSVContent(claim) {
    const csvHeaders = [
      "Claim ID",
      "Claim Number",
      "Patient Name",
      "Service Date",
      "Member Number",
      "Claim Status",
      "Received Date"
    ];
    const csvRows = [
      [
        claim.claimId,
        claim.claimNumber,
        claim.patientName,
        claim.serviceDate,
        claim.memberNumber,
        claim.claimStatus,
        claim.receivedDate
      ]
    ];
    const csvContent = [csvHeaders, ...csvRows].map(row => row.join(",")).join("\n");
    return csvContent;
  }


  let elements;
  let currentPage = 1;
  const itemsPerPage = 10;
  let totalPages = Math.ceil(payment[$page.params.paymentId].claims.length / itemsPerPage);

  let displayedClaims = [];

  onMount(() => {
    paymentData = getDeltaPaymentData()
    paymentData.then(data => {
      console.log(data);
      resolvedIndividualPayment = data;
    });
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

  function updateDisplayedClaims() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    displayedClaims = payment[$page.params.paymentId].claims.slice(startIndex, endIndex);
  }

  function goToPage(page) {
    if (currentPage !== page) {
      currentPage = page;
      updateDisplayedClaims();
      scrollToTop();
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage += 1;
      updateDisplayedClaims();
      scrollToTop();
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      currentPage -= 1;
      updateDisplayedClaims();
      scrollToTop();
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  $: {
    totalPages = Math.ceil(payment[$page.params.paymentId].claims.length / itemsPerPage);
  }

  updateDisplayedClaims();
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col justify-center items-center text-neutral-700 gap-4">
    <!-- individual payment header -->
    <section class="container mx-auto font-mono table-container flex flex-row gap-0 items-center rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500 text-neutral-100">
      <a href="{`/payments`}" class="flex justify-center items-center w-8 h-8 mx-2 bg-white rounded-full hover:bg-neutral-100">
        <img class="fill-neutral-500 w-4 h-4 mr-1" src="{arrowLeft}" alt="">
      </a>
      <div class="w-full overflow-hidden opacity-50 border-l">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left uppercase border-b">
                <th class="px-4 py-3">Payment ID</th>
                <th class="px-4 py-3">Check Number</th>
                <th class="px-4 py-3">Net Payment Amount($)</th>
                <th class="px-4 py-3">Insurance Provider</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td class="px-4 py-3 border-r">{payment[$page.params.paymentId].id}</td>
                  <td class="px-4 py-3 text-ms font-semibold border-x">{payment[$page.params.paymentId].check_number}</td>
                  <td class="px-4 py-3 text-xs border-x">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm">
                      {payment[$page.params.paymentId].net_payment_amount}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm border-l">{payment[$page.params.paymentId].insurance_provider}</td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {#if payment[$page.params.paymentId].claims.length > 0}
      <section class="container mx-auto font-mono table-container">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-neutral-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Claim Number</th>
                  <th class="px-4 py-3">Member Number</th>
                  <th class="px-4 py-3">Patient Name ($)</th>
                  <th class="px-4 py-3">Claim Status</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {#each payment[$page.params.paymentId].claims as claim}
                  <tr class="text-gray-700 hover:bg-neutral-50 group/item">
                    <td class="px-4 py-3 border">
                      <div class="flex items-center text-sm">
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
                          <a href="{`/payments/${$page.params.paymentId}/${claim.claimId}`}" alt="none">
                            <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold text-black hover:text-emerald-500">
                              {claim.claimId}
                            </h2>
                          </a>
                          <p class="text-xs text-gray-600">{payment[$page.params.paymentId].insurance_provider}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">xxxxxxxxx</td>
                    <td class="px-4 py-3 text-xs border">
                      <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm">
                        {claim.patientName}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm border">
                      <div class="flex justify-between">
                        {claim.claimStatus}
                        <button 
                          class="group p-2 rounded-full group/edit invisible group-hover/item:visible hover:bg-neutral-200" 
                          on:click={() => downloadClaimAsCSV($page.params.paymentId, claim.claimId)}
                        >
                          <span class="group-hover:opacity-100 opacity-0 transition-opacity duration-300 absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-7px] bg-neutral-700 text-white font-thin text-sm px-1 py-[2px] rounded shadow-lg">
                            Delta
                          </span>
                          <svg
                            width="18" 
                            height="20" 
                            viewBox="0 0 18 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 18.2979V16.1702H1.35V17.8723C1.35 18.3424 1.75294 18.7234 2.25 18.7234H15.75C16.2471 18.7234 16.65 18.3424 16.65 17.8723V16.1702H18V18.2979C18 19.2379 17.1941 20 16.2 20H1.8C0.805888 20 0 19.2379 0 18.2979Z" fill="#555555"/>
                            <path d="M8.4 15.1734V0.567375C8.4 0.254023 8.66863 0 9 0C9.33137 0 9.6 0.254023 9.6 0.567376V15.1734C9.61868 15.1583 9.63688 15.1424 9.65455 15.1257L15.7564 9.35562C16.0014 9.12397 16.3986 9.12397 16.6436 9.35563C16.8935 9.59198 16.8877 9.97684 16.6307 10.2063L9.68095 16.4131C9.29874 16.7545 8.70126 16.7545 8.31905 16.4131L1.36928 10.2063C1.1123 9.97684 1.10649 9.59198 1.35643 9.35563C1.60141 9.12397 1.99859 9.12397 2.24357 9.35563L8.34546 15.1257C8.36312 15.1424 8.38132 15.1583 8.4 15.1734Z" fill="#555555"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          {#if totalPages > 10}
            <div class="flex flex-row justify-center items-center gap-1 bg-neutral-100 text-neutral-700 font-thin">
              <button class="px-2 py-1 hover:bg-neutral-200" on:click={previousPage}>
                Previous
              </button>
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
              <button class="px-2 py-1 hover:bg-neutral-200" on:click={nextPage}>
                Next
              </button>
            </div>
          {/if}
        </div>
      </section>
    {:else}
      <div class="flex flex-col items-center gap-3 px-10 py-2 rounded border border-neutral-500">
        <div class="flex flex-col gap-2 items-center">
          <h2>
            You do not have any claims!
          </h2>
          <h2 class="text-neutral-500 font-thin">
            Make sure your insurance providers are connected!
          </h2>
        </div>
        <div class="flex flex-row justify-center items-center gap-3">
          <button class="bg-neutral-100 text-neutral-500 p-2 rounded hover:bg-neutral-200 hover:shadow-md">
            Insurance Providers
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>