import { ref } from 'vue';

const isAuthenticated = ref(false);
const userProfile = ref(null);

const setAuthenticated = (value) => {
  isAuthenticated.value = value;
};

const setUserProfile = (profile) => {
  userProfile.value = profile;
};

const checkAuth = () => {
  const token = localStorage.getItem('spotify_token');
  const tokenExpiry = localStorage.getItem('spotify_token_expiry'); // Assuming you store the token expiry time in localStorage

  if (token && tokenExpiry) {
    const now = new Date().getTime();
    if (now < tokenExpiry) {
      isAuthenticated.value = true;
      const profile = localStorage.getItem('spotify_user_profile');
      if (profile) {
        userProfile.value = JSON.parse(profile);
      }
    } else {
      // Token has expired
      localStorage.removeItem('spotify_token');
      localStorage.removeItem('spotify_token_expiry');
      isAuthenticated.value = false;
      userProfile.value = null;
    }
  } else {
    isAuthenticated.value = false;
    userProfile.value = null;
  }
};

export { isAuthenticated, userProfile, setAuthenticated, setUserProfile, checkAuth };