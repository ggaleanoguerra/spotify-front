<script setup>
import Home from "./components/Home.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="bg-black">
    <NavBar class="bg-black" />
    <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-black antialiased h-screen">
      <Home class="mt-20" />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
</style>
