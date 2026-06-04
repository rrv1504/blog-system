const DEPLOYED_API_URL = "https://blog-system-v4j5.onrender.com/api";
const isGitHubPages = typeof window !== "undefined" && window.location.hostname === "rrv1504.github.io";

export const API_URL = import.meta.env.VITE_API_URL || (isGitHubPages ? DEPLOYED_API_URL : "/api");
