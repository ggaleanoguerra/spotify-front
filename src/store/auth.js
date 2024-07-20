import { ref } from 'vue';

const isAuthenticated = ref(false);

const setAuthenticated = (value) => {
  isAuthenticated.value = value;
};

const checkAuth = () => {
  const token = localStorage.getItem('spotify_token');
  isAuthenticated.value = !!token;
};

export { isAuthenticated, setAuthenticated, checkAuth };
