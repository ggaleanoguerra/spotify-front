<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { setAuthenticated } from '../store/auth';

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/callback`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      localStorage.setItem('spotify_token', response.data.access_token);
      setAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during Spotify callback:', error);
    }
  } else {
    console.error('Authorization code not found');
  }
});
</script>

<template>
  <div class="text-white">Loading...</div>
</template>

<style scoped>
</style>
