<template>
  <div v-if="isAuthenticated" class="relative bg-black text-white min-h-screen p-4">
    <div>
      <article class="font-bold text-2xl ml-12 md:text-center mb-10">
        I'm currently playing...
      </article>
    </div>
    
    <div class="flex flex-col md:flex-row md:justify-center md:space-x-4">
      <!-- Current Song Card -->
      <div class="rounded-xl bg-card m-2 flex flex-col justify-center md:max-w-96 md:ml-14">
        <div class="px-6 pt-6 pb-4 flex items-center">
          <a
            v-if="currentTrack"
            :href="currentTrack.external_urls.spotify"
            target="_blank"
          >
            <img
              :src="currentTrack.album.images[0].url"
              :alt="currentTrack.name"
              class="w-24 h-24 rounded-md mr-6"
            />
          </a>
          <div v-if="currentTrack" class="flex flex-col">
            <span class="font-sans text-lg font-medium leading-7 text-white">
              <a :href="currentTrack.external_urls.spotify" target="_blank">
                {{ currentTrack.name }}
              </a>
            </span>
            <span class="font-sans text-base font-medium leading-6 text-white">
              <a
                :href="currentTrack.artists[0].external_urls.spotify"
                target="_blank"
                >{{ currentTrack.artists[0].name }}</a
              >
            </span>
            <span class="font-sans text-base font-medium leading-6 text-white">
              <a
                :href="currentTrack.album.external_urls.spotify"
                target="_blank"
                >{{ currentTrack.album.name }}</a
              >
            </span>
          </div>
          <div v-else class="text-white font-bold text-lg">
            No track currently playing
          </div>
        </div>
      </div>
      <!-- Artist Info Card -->
      <div class="rounded-xl bg-card m-2 flex flex-col justify-center md:w-auto p-4">
        <article v-if="artistDescription">
          <img :src="artistDescription.image" alt="Artist's photo" class="w-full md:w-48 lg:w-64 xl:w-80 rounded-t-xl">
          <h2 class="text-xl font-bold">{{ artistDescription.name }}</h2>
          <p>{{ artistDescription.followers }} followers</p>
          <p>Genres: {{ artistDescription.genres.join(', ') }}</p>
        </article>
        <article v-else>
          <p>No description available for the artist.</p>
        </article>
      </div>
    </div>
  </div>
  <div v-else>
    <p>
      You are not authorized to view this page. Please
      <router-link to="/">log in</router-link>.
    </p>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { isAuthenticated, checkAuth } from "../store/auth";

export default {
  setup() {
    const router = useRouter();
    const currentTrack = ref(null);
    const artistDescription = ref(null);

    const fetchCurrentTrack = async () => {
      const token = localStorage.getItem("spotify_token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const track = response.data.item;
        if (track) {
          currentTrack.value = track;
          localStorage.setItem("spotify_current_track", JSON.stringify(track));

          // Fetch artist information
          const artistResponse = await axios.get(
            `https://api.spotify.com/v1/artists/${track.artists[0].id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const artist = artistResponse.data;
          artistDescription.value = {
            name: artist.name,
            image: artist.images[0]?.url || '',
            followers: artist.followers.total.toLocaleString(),
            genres: artist.genres,
          };
        }
      } catch (error) {
        console.error("Error fetching currently playing track or artist:", error);
      }
    };

    onMounted(() => {
      checkAuth();
      if (!isAuthenticated.value) {
        router.push("/");
      } else {
        const storedTrack = localStorage.getItem("spotify_current_track");
        if (storedTrack) {
          currentTrack.value = JSON.parse(storedTrack);
        }
        fetchCurrentTrack();
        const interval = setInterval(fetchCurrentTrack, 10000); // Actualizar cada 10 segundos
        onUnmounted(() => clearInterval(interval));
      }
    });

    return {
      isAuthenticated,
      currentTrack,
      artistDescription,
    };
  },
};
</script>

<style scoped>
.bg-card {
  background-color: #111112;
}
</style>
