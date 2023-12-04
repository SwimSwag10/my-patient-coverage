<script>
  import { goto } from '$app/navigation';
  import logo from '$lib/assets/accelerate-logo.png'
  import { fly, slide, fade } from 'svelte/transition';
  import { deltaDental } from '../utils/stores.js'
  import api from '$lib/utils/api.js';
  import { encryptData } from '../utils/encrypt.js'
  import arrowLeft from '$lib/assets/icons/arrowLeft.svg';

  
  let MPCName = ""
  let MPCEmail = ""
  let MPCPassword = ""
  let deltaUsername = ""
  let deltaPassword = ""

  /*
  *
  * TODO: Verify that the input fields abide by criteria befoer api is sent.
  * 
  */

  async function createUser() {
    let response = await api(
      "/signup", "POST", 
      {
        username: MPCName,
        email: MPCEmail, 
        password: MPCPassword, 
        deltaUsername: deltaUsername, 
        deltaPassword: deltaPassword
      }
    );
    if (response?.body?.data) {
      userCreationData = response.body.data;
    }
  }

  async function submit() {
    // this code is kinda like storing user creds in a cookie.
    $deltaDental.credentials = await encryptData(JSON.stringify({deltaUsername, deltaPassword}))
    goto("/dashboard")
  }
</script>


<form class="bg-white" on:submit={createUser, submit}>
  <div in:fly="{{ x: -50, duration: 200, delay: 300 }}" out:fly="{{ x: -50, duration: 200 }}" class="fixed inset-y-0 left-0 flex items-center justify-center mb-4">
    <a href="/">
      <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-4 fill-white">
        <rect width="16.9687" height="1.69687" rx="0.848434" transform="matrix(0.782777 0.622302 -0.782777 0.622302 1.32812 9.81299)"/>
        <rect width="16.9687" height="1.69687" rx="0.848434" transform="matrix(0.782777 -0.622302 0.782777 0.622302 0.388672 10.5596)"/>
      </svg>
    </a>
  </div>
  <div class="flex min-h-screen">
    <div class="flex flex-row w-full">

      <!-- DESC: remember that both the mpc username, password and delta username and password need values to be submitted -->

      <!-- mypatientcoverage signup -->
      <div in:fly="{{ x: -50, duration: 200, delay: 300 }}" out:fly="{{ x: -50, duration: 200 }}" class="flex flex-col justify-center items-center gap-2 w-1/3 bg-black">
        <h2 class="font-bold text-3xl text-white">my-patient-coverage</h2>
        <p class="text-xs md:text-base text-white">create your account</p>
        <input bind:value={MPCName} type="text" placeholder="First Name" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input bind:value={MPCEmail} type="text" placeholder="Email" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input bind:value={MPCPassword} type="text" placeholder="Password" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input type="text" placeholder="Confirm Password" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
      </div>
      <!-- availity signup -->
      <div in:fly="{{ x: -50, duration: 200, delay: 600 }}" out:fly="{{ x: -50, duration: 200 }}" class="flex flex-col justify-center items-center gap-2 w-1/3 bg-emerald-700">
        <h2 class="font-bold text-3xl text-white">Availity</h2>
        <p class="text-xs md:text-base text-white">use your availity login creadentials</p>
        <input type="text" placeholder="Availity Username" class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input type="text" placeholder="Availity Password" class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input type="text" placeholder="Confirm Password" class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
      </div>
      <!-- delta dental sign up -->
      <div in:fly="{{ x: -50, duration: 200, delay: 900 }}" out:fly="{{ x: -50, duration: 200 }}" class="flex flex-col justify-center items-center gap-2 w-1/3 bg-white">
        <h2 class="font-bold text-3xl text-black">Delta Dental</h2>
        <p class="text-xs md:text-base">use your delta dental login creadentials</p>
        <input bind:value={deltaUsername} type="text" placeholder="Delta Dental Username" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input bind:value={deltaPassword} type="text" placeholder="Delta Dental Password" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
        <input type="text" placeholder="Confirm Password" required class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
      </div>

    </div>
  </div>
  <div in:fade="{{ duration: 200, delay: 1000 }}" out:fly="{{ x: -50, duration: 200 }}" class="fixed inset-x-0 bottom-0 flex items-center justify-center mb-4">
    <button type="submit" class="flex items-center justify-center flex-none w-40 px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-white hover:text-black">
      Create Account
    </button>
  </div>
</form>
