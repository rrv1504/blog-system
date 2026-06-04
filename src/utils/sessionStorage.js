const SESSION_KEY = "blog-session";

export function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || { user: null, token: "" };
  } catch {
    return { user: null, token: "" };
  }
}

export function storeSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
