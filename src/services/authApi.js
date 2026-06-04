import { api } from "./api.js";

export function login(payload) {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function register(payload) {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getProfile(token) {
  return api("/auth/profile", {}, token);
}

export function updateProfile(payload, token) {
  return api("/auth/me", {
    method: "PUT",
    body: JSON.stringify(payload)
  }, token);
}
