<template>
  <div class="w-full bg-black">
    <footer class="bg-black rounded-lg shadow dark:bg-gray-900 m-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
       
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <span
            class="block text-sm text-white sm:text-center dark:text-gray-400"
        >© {{ year }}
            <a href="https://www.linkedin.com/in/ggaleanoguerra/" class="hover:underline">Gabriel Galeano</a>.
            All Rights Reserved.</span>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>