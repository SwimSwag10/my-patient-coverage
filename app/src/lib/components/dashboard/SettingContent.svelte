<script>
  import { clickOutside } from '$lib/utils/clickOutside.js'
  import user from '$lib/assets/icons/user.svg'
  import logo from '$lib/assets/accelerate-logo.png'
  import { fly, fade } from 'svelte/transition'

  let userName = "Jennifer Doe"
  let userEmail = "jenniferdoe@gmail.com"
  let userPassword = "somethingPassword"

  import Modal from '$lib/components/Modal.svelte'
  let dialog;
  function closeModal() {
    dialog.close();
  }
  function handleClose() {
    dialog.dispatchEvent(new CustomEvent("close"));
  }

  import { payments } from '$lib/utils/deltaPaymentSearch.json';
  let searchQuery = '';

  function filterPayments() {
    return payments.filter((payment) =>
      Object.values(payment).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }
</script>

<div class="flex flex-col gap-4 pt-24 w-[60%] h-fit">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col gap-4 text-neutral-700 w-5/6">
    <h2 class="font-semibold">Account Settings</h2>
    <div class="flex flex-row pb-4 gap-2 border-b border-neutral-200">
      <button class="w-[4rem] h-[4rem] rounded-full flex justify-center items-center bg-neutral-200 hover:bg-neutral-300">
        <img src="{user}" alt draggable="false" class="w-8 h-8">
      </button>
      <div class="flex flex-row justify-between items-center w-full">
        <div>
          <h2 class="font-medium">Your Account</h2>
          <h2 class="text-neutral-500">This application is in alpha and is subject to change</h2>
        </div>
        <button class="w-30 h-10 p-2 bg-neutral-100 rounded hover:bg-neutral-200 hover:text-neutral-800">Upload Photo</button>
      </div>
    </div>
    <div class="flex flex-col gap-2 pb-4 border-b border-neutral-200">
      <h2 class="font-medium">Name</h2>
      <div class="flex justify-between items-center">
        <h2 class="text-neutral-500">{userName}</h2>
        <button class="w-20 h-10 p-2 bg-neutral-100 rounded hover:bg-neutral-200 hover:text-neutral-800">Edit</button>
      </div>
    </div>
    <div class="flex flex-col gap-2 pb-4 border-b border-neutral-200">
      <h2 class="font-medium">Email Address</h2>
      <div class="flex justify-between items-center">
        <h2 class="text-neutral-500">{userEmail}</h2>
        <button class="w-20 h-10 p-2 bg-neutral-100 rounded hover:bg-neutral-200 hover:text-neutral-800">Edit</button>
      </div>
    </div>
    <div class="flex flex-col gap-3 pb-4 border-b border-neutral-200">
      <h2 class="font-medium">Change Password</h2>
      <div class="flex flex-row gap-4">
        <div class="relative h-10 w-1/2 min-w-[200px]">
          <input
            class="peer h-full w-full rounded border border-neutral-300 border-t-transparent text-neutral-500 bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border focus:border-neutral-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            type="password"
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-neutral-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-500 peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:border-neutral-500 peer-focus:after:border-t peer-focus:after:border-r peer-focus:after:border-neutral-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            New Password
          </label>
        </div>
        <div class="relative h-10 w-1/2 min-w-[200px]">
          <input
            class="peer h-full w-full rounded border border-neutral-300 border-t-transparent text-neutral-500 bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border focus:border-neutral-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            type="password"
          />
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-neutral-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-neutral-500 peer-focus:before:border-t peer-focus:before:border-l peer-focus:before:border-neutral-500 peer-focus:after:border-t peer-focus:after:border-r peer-focus:after:border-neutral-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Confirm Password
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <h2>Delete Account</h2>
      <button 
      on:click={() => dialog.showModal()}
        class="flex justify-center items-center w-[6rem] h-[3rem] px-3 rounded text-neutral-500 bg-neutral-100 hover:bg-red-200 hover:text-neutral-700 hover:shadow"
      >
        Delete
      </button>
    </div>
    
    <Modal bind:dialog on:close={closeModal}>
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Account deletion</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.</p>
                    <div class="flex-col gap-4 pt-4">
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your password to delete:</label>
                      <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        class="font-mono bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="password" 
                        required
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-10">
              <button on:click={handleClose} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
              <button on:click={handleClose} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  <div class="flex items-center justify-between pb-4">
      <div>
          <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <svg class="w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                  </svg>
              Last 30 days
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
          </button>
          <!-- Dropdown menu -->
          <div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
              <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                  <li>
                      <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="filter-radio-example-1" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
                      </div>
                  </li>
                  <li>
                      <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="filter-radio-example-2" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
                      </div>
                  </li>
                  <li>
                      <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="filter-radio-example-3" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
                      </div>
                  </li>
                  <li>
                      <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="filter-radio-example-4" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
                      </div>
                  </li>
                  <li>
                      <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                          <label for="filter-radio-example-5" class="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
          bind:value={searchQuery}
        />
      </div>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" class="p-4">
                  <div class="flex items-center">
                      <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                      <label for="checkbox-all-search" class="sr-only">checkbox</label>
                  </div>
              </th>
              <th scope="col" class="px-6 py-3">
                  Product name
              </th>
              <th scope="col" class="px-6 py-3">
                  Color
              </th>
              <th scope="col" class="px-6 py-3">
                  Category
              </th>
              <th scope="col" class="px-6 py-3">
                  Price
              </th>
              <th scope="col" class="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      <tbody>
        {#each filterPayments() as payment}
          <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="{`checkbox-table-${payment.id}`}" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="{`checkbox-table-${payment.id}`}" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {payment.check_number}
            </th>
            <td class="px-6 py-4">
              {payment.issue_date}
            </td>
            <td class="px-6 py-4">
              {payment.net_payment_amount}
            </td>
            <!-- Add other fields from the JSON data here as needed -->
            <td class="px-6 py-4">
              <a href="/" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
          </tr>
        {/each}
      </tbody>
  </table>
</div>


  </div>
</div>