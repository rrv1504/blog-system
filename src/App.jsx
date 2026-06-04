import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthPanel } from "./components/AuthPanel.jsx";
import { Notifications } from "./components/Notifications.jsx";
import { PostCard } from "./components/PostCard.jsx";
import { PostEditor } from "./components/PostEditor.jsx";
import { Topbar } from "./components/Topbar.jsx";
import { UserProfile } from "./components/UserProfile.jsx";
import { getPosts } from "./services/postsApi.js";
import { clearSession, getStoredSession, storeSession } from "./utils/sessionStorage.js";

export default function App() {
  const [session, setSession] = useState(getStoredSession);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(session.user ? "dashboard" : "login");
  const [selectedPostId, setSelectedPostId] = useState("");

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );
  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId),
    [posts, selectedPostId]
  );
  const notificationCount = useMemo(() => {
    if (!session.user) {
      return 0;
    }

    return posts.reduce((total, post) => {
      if (post.authorId !== session.user.id) {
        return total;
      }

      const likes = post.likedBy.filter((userId) => userId !== session.user.id).length;
      const comments = post.comments.filter((comment) => comment.authorId !== session.user.id).length;
      return total + likes + comments;
    }, 0);
  }, [posts, session.user]);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((caughtError) => setError(caughtError.message))
      .finally(() => setLoading(false));
  }, []);

  function saveSession(nextSession) {
    storeSession(nextSession);
    setSession(nextSession);
    setView("dashboard");
  }

  function updateSession(nextSession) {
    storeSession(nextSession);
    setSession(nextSession);
  }

  function logout() {
    clearSession();
    setSession({ user: null, token: "" });
    setSelectedPostId("");
    setView("login");
  }

  function upsertPost(updatedPost) {
    setPosts((currentPosts) => {
      const exists = currentPosts.some((post) => post.id === updatedPost.id);

      if (exists) {
        return currentPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
      }

      return [updatedPost, ...currentPosts];
    });
  }

  function renderFeed() {
    return (
      <section className="feed">
        {loading && <p className="muted">Loading posts...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && sortedPosts.length === 0 && <p className="empty">No posts yet. Write the first one.</p>}
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={session.user}
            token={session.token}
            onUpdated={upsertPost}
            onOpen={(id) => {
              setSelectedPostId(id);
              setView("article");
            }}
            variant="grid"
          />
        ))}
      </section>
    );
  }

  function renderArticle() {
    if (!selectedPost) {
      return (
        <section className="article-empty">
          <button type="button" className="ghost" onClick={() => setView("dashboard")}>
            <ArrowLeft size={17} />
            Back to posts
          </button>
          <p className="empty">This article could not be found.</p>
        </section>
      );
    }

    return (
      <section className="article-page">
        <button type="button" className="ghost back-button" onClick={() => setView("dashboard")}>
          <ArrowLeft size={17} />
          Back to posts
        </button>
        <PostCard
          post={selectedPost}
          user={session.user}
          token={session.token}
          onUpdated={upsertPost}
          onDeleted={(id) => {
            setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
            setSelectedPostId("");
            setView("dashboard");
          }}
        />
      </section>
    );
  }

  return (
    <main>
      <Topbar
        user={session.user}
        onLogout={logout}
        onNavigate={(nextView) => {
          if (nextView !== "article") {
            setSelectedPostId("");
          }
          setView(nextView);
        }}
        view={view}
        notificationCount={notificationCount}
      />

      {view === "login" && <AuthPanel mode="login" onAuth={saveSession} onModeChange={setView} />}
      {view === "signup" && <AuthPanel mode="signup" onAuth={saveSession} onModeChange={setView} />}
      {view === "dashboard" && <section className="page">{renderFeed()}</section>}
      {view === "article" && <section className="page article-shell">{renderArticle()}</section>}
      {view === "profile" && session.user && (
        <section className="page">
          <UserProfile
            session={session}
            posts={sortedPosts}
            onSessionUpdate={updateSession}
            onPostUpdated={upsertPost}
            onPostDeleted={(id) => setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id))}
          />
        </section>
      )}
      {view === "notifications" && session.user && (
        <section className="page narrow-page">
          <Notifications token={session.token} />
        </section>
      )}
      {view === "add" && (
        <section className="page narrow-page">
          {session.user ? (
            <section className="compose-panel">
            <h2>Create Blog</h2>
              <PostEditor
                token={session.token}
                onSaved={(post) => {
                  upsertPost(post);
                  setView("dashboard");
                }}
              />
            </section>
          ) : (
            <AuthPanel mode="login" onAuth={saveSession} onModeChange={setView} />
          )}
        </section>
      )}
    </main>
  );
}
