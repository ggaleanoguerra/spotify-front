<template>
  <nav class="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../icons/spotify.svg" class="h-18" alt="Spotify logo" />
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button
          v-if="!isAuthenticated"
          @click="loginWithSpotify"
          type="button"
          class="inline-flex items-center justify-center text-black bg-custom focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <img src="../icons/spotify-icon.svg" class="h-6 mr-2" alt="Spotify logo" />
          Sign In with Spotify
        </button>
        <div v-else>
          <span>Welcome, User!</span>
          <button @click="logout" type="button" class="ml-4 text-sm text-red-600">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, checkAuth, setAuthenticated } from '../store/auth';

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();

    onMounted(() => {
      checkAuth();
    });

    const loginWithSpotify = () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
      const scope = encodeURIComponent('user-read-private user-read-email');
      const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
      // console.log('authUrl:', authUrl); // <-- Verifica la URL de autenticación
    };

    const logout = () => {
      localStorage.removeItem('spotify_token');
      setAuthenticated(false);
      router.push('/'); // Redirige a la página de inicio
    };

    return {
      isAuthenticated,
      loginWithSpotify,
      logout,
    };
  },
};
</script>

<style scoped>
</style>
