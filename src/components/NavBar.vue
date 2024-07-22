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
        <div v-else class="relative">
          <img
            :src="userProfile?.images[0]?.url"
            alt="User Profile"
            class="h-10 w-10 rounded-full cursor-pointer"
            @click="toggleDropdown"
          />
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700">{{ userProfile.display_name }}</a>
              <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 cursor-pointer">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, userProfile, checkAuth, setAuthenticated } from '../store/auth';

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const dropdownOpen = ref(false);

    onMounted(() => {
      checkAuth();
    });

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const loginWithSpotify = () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
      const scope = encodeURIComponent('user-read-private user-read-email user-read-playback-state');
      const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
      window.location.href = authUrl;
    };

    const logout = () => {
      localStorage.removeItem('spotify_token');
      localStorage.removeItem('spotify_user_profile');
      setAuthenticated(false);
      router.push('/');
    };

    watch(isAuthenticated, (newVal) => {
      if (newVal) {
        const profile = localStorage.getItem('spotify_user_profile');
        if (profile) {
          userProfile.value = JSON.parse(profile);
        }
      }
    });

    return {
      isAuthenticated,
      userProfile,
      loginWithSpotify,
      logout,
      dropdownOpen,
      toggleDropdown,
    };
  },
};
</script>
