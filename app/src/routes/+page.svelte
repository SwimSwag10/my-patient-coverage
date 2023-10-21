<script>
  import Header from "$lib/components/dashboard/Header.svelte";
  import SideBar from "$lib/components/dashboard/SideBar.svelte";
  import Login from "$lib/components/Login.svelte";
	import { publicKey } from "$lib/utils/stores.js";
  import api from '$lib/utils/api.js';

  import { browser } from '$app/environment';
  // export let data;
  let id = 0;
              
  if (browser)
    id = parseInt(new URLSearchParams(window.location.search).get('id')) - 1

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /* 
  *
  * ❔ this is fetching the public key from the publick-key endpoint we setup that uses the lambda function for creating a kms key.
  * 
  */
  async function fetchData() {
	  const res = await api('/public-key')
      if (res.ok && res.body) {
        // ❔ What is spki?
				let spki = res.body.publicKey
				const publicKeyBuffer = base64ToArrayBuffer(spki)
				$publicKey = await window.crypto.subtle.importKey(
					'spki',
					publicKeyBuffer,
					{
						name: 'RSA-OAEP',
						modulusLength: 256,
						hash:  { name: 'sha-256' }
					},
					true,
					['encrypt']
				)
      }
  }

  fetchData()
</script>

<div class="w-full h-screen flex justify-center items-center bg-white text-neutral-800">
  <!-- ❔ We should be passing a component variable into the Login component for the public data key -->
  <Login />
</div>