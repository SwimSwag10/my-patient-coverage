<script>
  import { fade, fly, slide } from 'svelte/transition'
  import { clickOutside } from '$lib/utils/clickOutside.js'
	import Dropdown from '$lib/components/dashboard/header/Dropdown.svelte';

  let patientDropdown = false;
  let userName = "Jennifer Doe"
  let userEmail = "jenniferdoe@gmail.com"
  let isPatientCoverageActive = true;
  // TODO: make sure the isFamilyMemberClicked points to the patient that has been clicked in the family.
  let isFamilyMemberClicked = true;
  let globalPatient = true;
  let patientSubItemClicked = "benefits";

  function okayge() {
    globalPatient = true;
    console.log(globalPatient);
  }

  // TODO: add a isFormValid function
  // TODO: move "handlePatientApiCall(validatedData)" function call, and "globalPatient" inside isFormValid
  function onFormSubmission(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    console.log(data)
    globalPatient = true;
    return data
  }

  // https://www.dentalofficetoolkit.com/api/dot-gateway/v02/memberdetail/search

</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col text-neutral-700 gap-4">
    <div class="flex justify-between px-6 items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <h2 class="text-2xl font-bold text-white">Patients</h2>
      <div use:clickOutside on:click_outside={() => patientDropdown = false} class="relative">
        <button
          on:click={() => patientDropdown = !patientDropdown}
          class="flex items-center w-1/8 h-10 px-4 py-1 rounded-md border border-white bg-transparent text-white hover:text-rose-700 hover:bg-white hover:shadow-lg focus:ring-4 focus:ring-white/50"
        >
          {#if globalPatient === true}
            <h2>Select A Different Patient</h2>
          {/if}
          {#if globalPatient === false}
            <h2>Select A Patient</h2>
          {/if}
          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
        <Dropdown patientShow={patientDropdown} userName={userName} userEmail={userEmail} />
      </div>
    </div>
    {#if globalPatient === true}
      <div class="flex flex-col gap-8" in:slide="{{ y: -100, duration: 100, delay: 100 }}">

        <!-- patient data -->
        <div class="w-full">
          <h2 class="text-md font-bold">Patient info:</h2>
          <table class="w-full">
            <thead>
              <tr>
                <td>Name</td>
                <td>Birthdate</td>
                <td>Relationship</td>
                <td>Eligability</td>
                <td>Effective Date</td>
              </tr>
            </thead>
            <tbody>
              <tr 
                class=""
                class:bg-emerald-100={isFamilyMemberClicked === true}
                class:text-neutral-700={isFamilyMemberClicked === true}
              >
                <td>justin Fleagle</td>
                <td>01/01/2001</td>
                <td>subscriber</td>
                <td>innactive</td>
                <td>01/01/2020</td>
              </tr>
              <tr class="hover:bg-neutral-100">
                <td>bobby Fleagle</td>
                <td>01/01/2020</td>
                <td>child</td>
                <td>innactive</td>
                <td>01/01/2020</td>
              </tr>
            </tbody>
          </table>
        </div> 

        <div class="flex justify-start gap-4">
          <button 
            on:click={() => patientSubItemClicked = "benefits"}
            class="py-1.5 px-2 border-emerald-500"
            class:border-b-2={patientSubItemClicked === "benefits"}
          >
            Benefit Info
          </button>
          <button 
            on:click={() => patientSubItemClicked = "coverage"}
            class="py-1.5 px-2 border-emerald-500"
            class:border-b-2={patientSubItemClicked === "coverage"}
          >
            Coverage
          </button>
          <button 
            on:click={() => patientSubItemClicked = "visits"}
            class="py-1.5 px-2 border-emerald-500"
            class:border-b-2={patientSubItemClicked === "visits"}
          >
            Past Visits
          </button>
          <button 
            on:click={() => patientSubItemClicked = "address"}
            class="py-1.5 px-2 border-emerald-500"
            class:border-b-2={patientSubItemClicked === "address"}
          >
            Mailing Address
          </button>
        </div>
      </div>

      <!-- patient content benefit info -->
      <div in:slide="{{ duration: 100, delay: 100 }}">
        {#if patientSubItemClicked === "benefits"}
          <h2 class="py-2">The employer has selected the following benefit plan.
            Eligibility is not a guarantee of coverage as actual benefit payments are determined only when a claim is processed.
          </h2>
          <table class="w-full">
            <thead>
              <tr class="text-sm font-semibold tracking-wide text-left text-gray-900 bg-neutral-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3">Plan + Product</th>
                <th class="px-4 py-3">Payer ID</th>
                <th class="px-4 py-3">Group Number + Sub</th>
                <th class="px-4 py-3">Group Name + Sub</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="text-gray-700 group/item text-xs">
                <td class="px-4 py-3 border">
                  <div class="flex items-center">
                    <div 
                      class="relative w-3 h-3 mr-3 rounded-full md:block"
                      class:bg-rose-500={isPatientCoverageActive === false}
                      class:bg-emerald-500={isPatientCoverageActive === true}
                    >
                      <div class="object-cover w-full h-full rounded-full p-[4px]">
                      </div>
                      <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                    </div>
                    <div class="w-full">
                      <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold text-black">
                        DDPH
                      </h2>
                      <p class="text-gray-600">Delta Dental PPO (Point-of-Service)/OSU Clinic</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 border">DDPOH</td>
                <td class="px-4 py-3 border">
                  <div>
                    <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold">
                      1960
                    </h2>
                    <p class="text-gray-600">1001</p>
                  </div>
                </td>
                <td class="px-4 py-3 border">
                  <div>
                    <h2 class="elementLengthChecker whitespace-nowrap overflow-hidden font-semibold">
                      The Ohio State University Student Health Insurance Program
                    </h2>
                    <p class="text-gray-600">The Ohio State University Student Health Insurance Program</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        {/if}
      </div>

    {:else if globalPatient === false}
      <div class="w-[40%]" in:slide="{{ duration: 100, delay: 100 }}">
        <div class="flex justify-between px-6 items-center w-full h-14 rounded bg-neutral-100">
          <h2 class="text-md font-bold">Add patient here:</h2>
        </div>  
        <form 
          on:submit|preventDefault={onFormSubmission} 
          class="flex flex-col w-full pt-2 mb-2 mt-4 gap-4 border border-neutral-500 rounded"
        >
          <div class="flex flex-row items-center gap-2 pl-4">
            <label for="memberId" class="w-[50%] pr-4 border-r border-neutral-700">Member ID</label>
            <input
              required
              id="memberId"
              placeholder="Member ID or SSN"
              type="text"
              class="pl-2 text-left hover:bg-neutral-100 focus:bg-neutral-100 rounded-l"
            />
          </div>
          <div class="flex flex-row items-center gap-2 pl-4">
            <label for="birthday" class="w-[50%] pr-4 border-r border-neutral-700">Date of Birth</label>
            <input
              required
              id="birthday"
              type="date"
              class="pl-2 text-left text-neutral-400 hover:bg-neutral-100 focus:bg-neutral-100 rounded-l"
            />
          </div>
          <button
            type="submit"
            class="pl-4 text-left py-2 rounded-b hover:bg-neutral-100 focus:bg-neutral-100"
          >
            Add Patient
          </button>
        </form>
      </div>
    {/if}
  </div>
  <!-- <footer in:fly={{ y: 100, duration: 100, delay: 100 }} class="fixed bottom-0 w-full flex flex-row gap-5 py-3 pl-6 bg-neutral-100 text-neutral-500">
    <h2>Mailing Address:</h2>
    <h2>1234 State Road California 33333</h2>
  </footer> -->
</div>