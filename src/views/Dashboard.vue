<template>
    <div v-if="isAuthenticated" class="absolute top-0 left-0 right-0 z-10 p-4 text-center text-white bg-black animate__animated animate__fadeIn">
      <h1 class="text-white">Dashboard</h1>
      <p class="text-white">Welcome to the dashboard!</p>
    </div>
    <div v-else>
      <p>You are not authorized to view this page. Please <router-link to="/">log in</router-link>.</p>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { isAuthenticated, checkAuth } from '../store/auth';
  
  export default {
    setup() {
      const router = useRouter();
  
      onMounted(() => {
        if (!isAuthenticated.value) {
          router.push('/');
        }
      });
  
      return {
        isAuthenticated
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  