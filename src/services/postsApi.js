import { api } from "./api.js";

export function getPosts() {
  return api("/posts");
}

export function createPost(payload, token) {
  return api("/posts", {
    method: "POST",
    body: JSON.stringify(payload)
  }, token);
}

export function updatePost(id, payload, token) {
  return api(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  }, token);
}

export function deletePost(id, token) {
  return api(`/posts/${id}`, { method: "DELETE" }, token);
}

export function addComment(postId, payload, token) {
  return api(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify(payload)
  }, token);
}

export function toggleLike(postId, token) {
  return api(`/posts/${postId}/like`, { method: "POST" }, token);
}
