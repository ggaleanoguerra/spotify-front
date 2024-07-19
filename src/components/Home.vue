<script setup>
</script>

<template>
  <div class="relative">
    <div
      v-if="tracks.length"
      class="absolute top-0 left-0 right-0 z-10 p-4 text-center text-white bg-black bg-opacity-55 animate__animated animate__fadeIn"
    >
      <h1
        class="text-white font-bold md:text-6xl md:mt-2 text-5xl mt-44 md:text-left"
      >
        <span
          v-if="currentTitleIndex < titles.length"
          class="title"
          :key="currentTitleIndex"
          >{{ titles[currentTitleIndex].name }}</span
        >
        <span> music!</span>
      </h1>
      <p class="text-white md:text-6xl md:mt-8 text-2xl mt-10">
        We are one with the music
      </p>
    </div>
    <div class="relative flex items-center justify-center h-screen z-0">
      <div class="container">
        <ul
          v-if="tracks.length"
          class="image-container animate__animated animate__fadeIn"
        >
          <li
            v-for="track in tracks.slice(0, 15)"
            :key="track.id"
            class="track-item"
          >
            <p class="text-center">{{ track.name }}</p>
            <img
              :src="track.album.images[0].url"
              :alt="track.name"
              class="image animate-pulse"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "animate.css";

export default {
  name: "Home",
  data() {
    return {
      tracks: [],
      token: "",
      showText: false,
      titles: [{ name: "My" }, { name: "Your" }, { name: "Our" }],
      currentTitleIndex: 0,
    };
  },
  created() {
    this.fetchToken();
    this.interval = setInterval(() => {
      if (this.currentTitleIndex < this.titles.length - 1) {
        this.currentTitleIndex++;
      } else {
        this.currentTitleIndex = 0;
      }
    }, 2500);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchToken() {
      try {
        const response = await axios.get(import.meta.env.VITE_SPOTIFY_API);
        this.token = response.data.access_token;
        this.fetchPlaylist();
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    },
    async fetchPlaylist() {
      const playlistId = "37i9dQZEVXbMDoHDwVN2tF"; // Replace with your playlist ID

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        this.tracks = response.data.tracks.items.map((item) => item.track);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  overflow-x: hidden;
  text-align: center;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.track-item {
  flex: 0 1 100px;
  margin: 5px;
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: auto;
  max-width: 100px;
  object-fit: cover;
  border-radius: 5px;
}

@media (max-width: 600px) {
  .track-item {
    flex: 0 1 80px;
  }
  .image {
    max-width: 80px;
  }
}
.title {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
