<!-- <script>
  export let show = undefined;
  export let action = undefined;
  export let actionName = undefined;
  export let arg = undefined;

  document.body.style.overflow = "hidden";
</script>

<div
  on:click={() => {document.body.style.overflow = "scroll"; show = false;}}
  on:keyup={() => {document.body.style.overflow = "scroll"; show = false;}}
  class="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-[2]"></div>
<div class="fixed w-min h-min inset-0 m-auto bg-white rounded-md shadow px-4 py-3 flex flex-col gap-3 z-[2]">
  <slot />
  {#if actionName}
    <div class="flex justify-between">
      <button on:click={() => show = false} class="bg-gray-200 rounded-md px-3 py-2">Cancel</button>
      {#if actionName == "Delete"}
        <button on:click={() => {show = false; action(arg);}} class="bg-red-200 text-red-800 rounded-md px-3 py-2">{actionName}</button>
      {:else}
        <button on:click={() => {show = false; action(arg);}} class="bg-blue-200 text-blue-800 rounded-md px-3 py-2">{actionName}</button>
      {/if}
    </div>
  {/if}
</div> -->

<script>
  export let dialog
</script>

<dialog bind:this={dialog} on:close>
  <slot/>
</dialog>