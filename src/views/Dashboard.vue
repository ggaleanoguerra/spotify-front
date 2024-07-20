<template>
    <div v-if="isAuthenticated">
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
  