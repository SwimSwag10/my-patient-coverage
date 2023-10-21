<script>
  import { fly } from 'svelte/transition';
  import { onMount } from "svelte";
  import availity from '$lib/assets/icons/availity.svg';
  import arrowLeft from '$lib/assets/icons/arrowLeft.svg';
  import { payment } from '$lib/utils/paymentObjectTests.json';
  import { page } from '$app/stores'
  // this is our test data for building the 
  import { claimDetailsTest } from '$lib/utils/deltaClaimDetails.json';

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

  let elements;

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
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col justify-center items-center text-neutral-700 gap-4">
    <section class="container mx-auto font-mono table-container flex flex-row gap-0 items-center rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500 text-neutral-100">
      <a href="{`/payments/${$page.params.paymentId}`}" class="flex justify-center items-center w-8 h-8 mx-2 bg-white rounded-full hover:bg-neutral-100">
        <img class="fill-neutral-500 w-4 h-4 mr-1" src="{arrowLeft}" alt="">
      </a>
      <div class="w-full overflow-hidden opacity-50 border-l">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left uppercase border-b">
                <th class="px-4 py-3">Claim ID</th>
                <th class="px-4 py-3">Member Number</th>
                <th class="px-4 py-3">Net Claim Amount($)</th>
                <th class="px-4 py-3">Insurance Provider</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td class="px-4 py-3 border-r">{payment[$page.params.paymentId].claims[$page.params.claimId]}</td>
                  <td class="px-4 py-3 text-ms font-semibold border-x">{payment[$page.params.paymentId].claims[0]}</td>
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

    <!-- if the patient has recieved more than one procedure during a visit, there will be multiple tables -->
    {#each claimDetailsTest.lineItems as operationItem}
      <section class="container mx-auto font-mono table-container">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-neutral-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3 text-[0.8rem]">Procedure Code</th>
                  <th class="px-4 py-3 text-[0.8rem]">Tooth Number</th>
                  <th class="px-4 py-3 text-[0.8rem]">Service Date</th>
                  <th class="px-4 py-3 text-[0.8rem]">Submitted Amount</th>
                  <th class="px-4 py-3 text-[0.8rem]">Approved Amount</th>
                  <th class="px-4 py-3 text-[0.8rem]">Allowed Amount</th>
                  <th class="px-4 py-3 text-[0.8rem]">Ded</th>
                  <th class="px-4 py-3 text-[0.8rem]">Office Visit</th>
                  <th class="px-4 py-3 text-[0.8rem]">Co-Pay (%)</th>
                  <th class="px-4 py-3 text-[0.8rem]">Patient Payment</th>
                  <th class="px-4 py-3 text-[0.8rem]">Plan Payment</th>
                  <th class="px-4 py-3 text-[0.8rem]">Par Network</th>
                  <th class="px-4 py-3 text-[0.8rem]">Product</th>
                  <th class="px-4 py-3 text-[0.8rem]">Claim Line Status</th>
                  <th class="px-4 py-3 text-[0.8rem]">Payment Number</th>
                  <th class="px-4 py-3 text-[0.8rem]">Pay To</th>
                  <th class="px-4 py-3 text-[0.8rem]">Area of Arch</th>
                  <th class="px-4 py-3 text-[0.8rem]">Surface</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <!-- this data we are pulling from will change the data -->
                <tr class="text-gray-700">
                  <td class="px-4 py-3 text-sm border">{operationItem.procedureCode}</td>
                  <td class="px-4 py-3 text-ms font-thin border">{operationItem.toothCode}</td>
                  <td class="px-4 py-3 text-sm border">{operationItem.serviceDate}</td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.submittedAmount} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.approvedAmount} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.allowedAmount} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.deductibleAmount} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.officeVisitAmount} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.coPayPercent} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.patientPayment} </span>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    <span class="px-2 py-1 font-semibold leading-tight text-emerald-700 bg-emerald-100 rounded-sm"> {operationItem.planPayment} </span>
                  </td>
                  <td class="px-4 py-3 text-sm border">{operationItem.networkName}</td>
                  <td class="px-4 py-3 text-sm border">{operationItem.productName}</td> 
                  <td class="px-4 py-3 text-sm border">{operationItem.lineItemStatus}</td>
                  <td class="px-4 py-3 text-sm border">{operationItem.paymentNumber}</td>
                  <td class="px-4 py-3 text-sm border">{operationItem.payTo}</td>
                  <td class="px-4 py-3 text-ms border">{operationItem.areaOfOralCavity}</td>
                  <td class="px-4 py-3 text-sm border">null</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    {/each}
  </div>
</div>