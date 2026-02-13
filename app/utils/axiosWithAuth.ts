import axios from "axios";

// Axios instance with Bearer token for protected API routes
const axiosWithAuth = axios.create({
  withCredentials: true,
});

// Add request interceptor to extract token from sessionStorage and add as Bearer token
axiosWithAuth.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage (stored during login)
    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("access_token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Bearer token added to Authorization header");
    } else {
      console.warn("⚠️ No token found in sessionStorage");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosWithAuth;
