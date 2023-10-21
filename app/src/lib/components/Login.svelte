<script>
  import logo from '$lib/assets/accelerate-logo.png'
  import { fly } from 'svelte/transition';
</script>

<body class="bg-white">
  <!-- Example -->
  <div class="flex min-h-screen">
    <!-- Container -->
    <div class="flex flex-row w-full">
      <!-- Sidebar -->
      <div in:fly="{{ x: -100, duration: 300 }}" out:fly="{{ x: 500, duration: 200 }}" class='hidden lg:flex flex-col justify-between bg-emerald-700 lg:max-w-sm xl:max-w-lg text-white'>
        <div class="flex justify-center items-center mt-20 bg-white rounded-e-lg w-40 h-10 [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]">
          <img src="{logo}" alt="logo" class="w-8 h-8">
        </div>
        <div class="lg:p-8 xl:p-12">
          <div class='space-y-5 mb-2'>
            <h1 class="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold font-serif [text-shadow:_0_4px_0_rgb(0_0_0_/_20%)]">The best of every insurance management software in one</h1>
            <p class="text-lg">You do not have an account?</p>
            <a href="/signup" class="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-emerald-700 hover:border-white [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]">
              Create account here
            </a>
          </div>
          <p class="font-medium">© 2023 Accelerate Medical</p>
        </div>
      </div>

      <!-- Login -->
      <div in:fly="{{ x: 100, duration: 300 }}" out:fly="{{ x: 500, duration: 200 }}" class="flex flex-1 flex-col items-center justify-center px-10 relative">
        <div class="flex lg:hidden justify-between items-center w-full py-4">
          <div class="flex items-center justify-start space-x-3">
            <img src="{logo}" alt="logo" class="w-6 h-6">
            <span href="#" class="font-medium text-lg">Brand</span>
          </div>
          <div class="flex items-center space-x-2">
            <span>Not a member? </span>
            <a href="/signup" class="underline font-medium text-emerald-500">
              Sign up now
            </a>
          </div>
        </div>
        <!-- Login box -->
        <div class="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
          <div class="flex flex-col space-y-2 text-center">
            <h2 class="text-3xl md:text-4xl font-bold">login to your account</h2>
            <p class="text-md md:text-xl">Where you manage your future</p>
          </div>
          <div class="flex flex-col max-w-md space-y-5">
            <input type="text" placeholder="Email" class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
            <input type="text" placeholder="Password" class="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal font-mono [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]" />
            <a href="/dashboard" class="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-white hover:text-black [box-shadow:_0_4px_0_rgb(0_0_0_/_20%)]">
              Confirm Login
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>