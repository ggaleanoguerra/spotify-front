<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { setAuthenticated, setUserProfile } from "../store/auth";

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/callback`,
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.data.access_token;
      localStorage.setItem("spotify_token", accessToken);
      setAuthenticated(true);

      const profileResponse = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userProfile = profileResponse.data;
      console.log("User profile:", userProfile);

      localStorage.setItem("spotify_user_profile", JSON.stringify(userProfile));
      setUserProfile(userProfile);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error during Spotify callback:", error);
    }
  } else {
    console.error("Authorization code not found");
  }
});
</script>

<template>
  <div class="text-white">Loading...</div>
</template>

<style scoped>
</style>
