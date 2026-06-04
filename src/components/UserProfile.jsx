import React, { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, PenLine, ThumbsUp, UserRound } from "lucide-react";
import { getProfile, updateProfile } from "../services/authApi.js";
import { PostCard } from "./PostCard.jsx";

export function UserProfile({ session, posts = [], onSessionUpdate, onPostUpdated, onPostDeleted }) {
  const [profile, setProfile] = useState({ user: session.user, stats: null });
  const [form, setForm] = useState({
    name: session.user?.name || "",
    avatarUrl: session.user?.avatarUrl || "",
    bio: session.user?.bio || ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile(session.token).then((data) => {
      setProfile(data);
      setForm({
        name: data.user.name || "",
        avatarUrl: data.user.avatarUrl || "",
        bio: data.user.bio || ""
      });
    });
  }, [session.token]);

  const stats = useMemo(() => profile.stats || {}, [profile.stats]);
  const ownPosts = useMemo(
    () => posts.filter((post) => post.authorId === session.user?.id),
    [posts, session.user?.id]
  );

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    const result = await updateProfile(form, session.token);
    const nextSession = { ...session, user: result.user };
    onSessionUpdate(nextSession);
    setProfile((current) => ({ ...current, user: result.user }));
    setMessage("Profile updated.");
  }

  return (
    <section className="profile-layout">
      <section className="profile-card">
        {form.avatarUrl ? (
          <img className="profile-photo" src={form.avatarUrl} alt="" />
        ) : (
          <span className="profile-photo avatar-fallback">{form.name.charAt(0) || "U"}</span>
        )}
        <div>
          <p className="eyebrow">Profile</p>
          <h2>{profile.user?.name}</h2>
          <p>{profile.user?.bio || "No bio added yet."}</p>
        </div>
      </section>

      <section className="stats-grid">
        <div><PenLine size={20} /><strong>{stats.posts || 0}</strong><span>Posts</span></div>
        <div><Heart size={20} /><strong>{stats.likesReceived || 0}</strong><span>Likes received</span></div>
        <div><MessageCircle size={20} /><strong>{stats.commentsReceived || 0}</strong><span>Comments</span></div>
        <div><ThumbsUp size={20} /><strong>{stats.likesGiven || 0}</strong><span>Likes given</span></div>
      </section>

      <form className="auth-form" onSubmit={submit}>
        <h2>Edit Profile</h2>
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
          <textarea rows={4} value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} />
        </label>
        {message && <p className="success">{message}</p>}
        <button type="submit" className="primary">
          <UserRound size={18} />
          Save profile
        </button>
      </form>

      <section className="profile-posts">
        <div className="section-heading">
          <p className="eyebrow">Your writing</p>
          <h2>Your posts</h2>
        </div>
        {ownPosts.length === 0 ? (
          <p className="empty">You have not written any posts yet.</p>
        ) : (
          <div className="profile-post-list">
            {ownPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                user={session.user}
                token={session.token}
                onUpdated={onPostUpdated}
                onDeleted={onPostDeleted}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
