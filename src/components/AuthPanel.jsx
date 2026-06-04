import React, { useState } from "react";
import { UserRound } from "lucide-react";
import { login, register } from "../services/authApi.js";

export function AuthPanel({ mode = "login", onAuth, onModeChange }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", avatarUrl: "", bio: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = isSignup ? form : { email: form.email, password: form.password };
      const session = isSignup ? await register(payload) : await login(payload);
      onAuth(session);
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-panel">
      <div>
        <p className="eyebrow">Blog Platform</p>
        <h1>{isSignup ? "Create your writer account." : "Welcome back to your writing space."}</h1>
      </div>
      <form onSubmit={submit} className="auth-form">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {isSignup && (
          <>
            <label>
              Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Profile photo URL
              <input value={form.avatarUrl} onChange={(event) => setForm({ ...form, avatarUrl: event.target.value })} />
            </label>
            <label>
              Bio
              <textarea rows={3} value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} />
            </label>
          </>
        )}
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary" disabled={loading}>
          <UserRound size={18} />
          {loading ? "Please wait" : isSignup ? "Create account" : "Login"}
        </button>
        <button type="button" className="link-button" onClick={() => onModeChange(isSignup ? "login" : "signup")}>
          {isSignup ? "Already have an account? Login" : "New here? Create an account"}
        </button>
      </form>
    </section>
  );
}
