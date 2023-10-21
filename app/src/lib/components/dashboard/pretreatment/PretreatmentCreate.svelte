<script>
  import { fly } from 'svelte/transition'
  import arrowLeft from '$lib/assets/icons/arrowLeft.svg';
</script>

<div class="flex flex-col gap-4 pt-24 w-[80%] h-fit xl:pr-4">
  <div in:fly="{{ y: -100, duration: 100, delay: 100 }}" class="flex flex-col justify-center items-center text-neutral-700 gap-4">
    <div class="flex justify-between px-6 items-center w-full h-14 rounded bg-gradient-to-r from-emerald-700 via-emerald-700 via-40% to-rose-500">
      <div class="flex flex-row gap-4">
        <a href="{`/pretreatment`}" class="flex justify-center items-center w-8 h-8 mx-2 bg-white rounded-full hover:bg-neutral-100">
          <img class="fill-neutral-500 w-4 h-4 mr-1" src="{arrowLeft}" alt="">
        </a>
        <h2 class="text-2xl font-bold text-white">Create Pre-treatment</h2>
      </div>
    </div>
    
    <form class="w-full">

      <div class="w-[60%]">
        <div class="relative z-0 w-full mb-6 group">
            <input 
              type="email" 
              name="floating_email" 
              id="floating_email" 
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
              placeholder=" " 
              required 
            />
            <label 
              for="floating_email" 
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input 
              type="password" 
              name="floating_password" 
              id="floating_password" 
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
              placeholder=" " 
              required 
            />
            <label 
              for="floating_password" 
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
            <input 
              type="password" 
              name="repeat_password" 
              id="floating_repeat_password" 
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
              placeholder=" " 
              required 
            />
            <label 
              for="floating_repeat_password" 
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
              <input 
                type="text" 
                name="floating_first_name" 
                id="floating_first_name" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
                placeholder=" " 
                required 
              />
              <label 
                for="floating_first_name" 
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
              <input 
                type="text" 
                name="floating_last_name" 
                id="floating_last_name" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
                placeholder=" " 
                required 
              />
              <label 
                for="floating_last_name" 
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
              <input 
                type="tel" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                name="floating_phone" id="floating_phone" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
                placeholder=" " 
                required 
              />
              <label 
                for="floating_phone" 
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
              <input 
                type="text" 
                name="floating_company" 
                id="floating_company" 
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-neutral-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-400 focus:outline-none focus:ring-0 focus:border-emerald-500 peer" 
                placeholder=" " 
                required 
              />
              <label 
                for="floating_company" 
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-500 peer-focus:dark:text-emerald-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Company (Ex. Google)
              </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <label 
              for="countries" 
              class="block py-2.5 px-0 w-full text-sm mb-2 font-medium text-gray-900 dark:text-white"
            >
              Select your state
            </label>
            <select 
              id="countries" 
              class="block py-2.5 px-0 w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Ohio</option>
              <option>Florida</option>
              <option>pennsylvania</option>
              <option>Michigan</option>
            </select>
          </div>
          
          <div class="relative z-0 w-full mb-6 group">
            <label 
              for="states" 
              class="block py-2.5 px-0 w-full text-sm mb-2 font-medium text-gray-900 dark:text-white"
            >
              Claim Type
            </label>
            <select 
              id="states" 
              class="block py-2.5 px-0 w-full text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Payment</option>
              <option>Claim</option>
              <option>Pre-Treatment Estimate</option>
              <option>Status</option>
            </select>
          </div>
        </div>
        <button 
          type="submit" 
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-800/50 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Submit
        </button>
      </div>

    </form>

  </div>
</div>