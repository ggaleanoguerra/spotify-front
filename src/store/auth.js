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
  if (token) {
    isAuthenticated.value = true;
    const profile = localStorage.getItem('spotify_user_profile');
    if (profile) {
      userProfile.value = JSON.parse(profile);
    }
  } else {
    isAuthenticated.value = false;
    userProfile.value = null;
  }
};

export { isAuthenticated, userProfile, setAuthenticated, setUserProfile, checkAuth };