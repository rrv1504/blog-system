import React, { useState } from "react";
import { Bell, LogOut, Menu, PenLine, UserRound, X } from "lucide-react";

export function Topbar({ user, onLogout, onNavigate, view, notificationCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const title = {
    add: "Add Post",
    article: "Article",
    dashboard: "Writer Dashboard",
    login: "Login",
    notifications: "Notifications",
    profile: "Profile",
    signup: "Sign Up"
  }[view] || "Writer Dashboard";

  function navigate(nextView) {
    onNavigate(nextView);
    setMenuOpen(false);
  }

  function handleLogout() {
    onLogout();
    setMenuOpen(false);
  }

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <div>
          <p className="eyebrow">Blog Platform</p>
          <h1>{title}</h1>
        </div>
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav className={menuOpen ? "session open" : "session"} aria-label="Primary navigation">
        <button type="button" className={view === "dashboard" ? "nav-active" : ""} onClick={() => navigate("dashboard")}>
          Posts
        </button>
        {user ? (
          <>
            <button type="button" className={view === "add" ? "nav-active" : ""} onClick={() => navigate("add")}>
              <PenLine size={17} />
              Add
            </button>
            <button
              type="button"
              className={view === "notifications" ? "nav-active badge-button" : "badge-button"}
              onClick={() => navigate("notifications")}
            >
              <Bell size={17} />
              {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
            </button>
            <button type="button" className={view === "profile" ? "nav-active" : ""} onClick={() => navigate("profile")}>
              <UserRound size={17} />
              Profile
            </button>
            <span className="session-user">{user.name}</span>
            <button type="button" onClick={handleLogout} title="Logout" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <button type="button" className={view === "login" ? "nav-active" : ""} onClick={() => navigate("login")}>
              Login
            </button>
            <button type="button" className={view === "signup" ? "nav-active" : ""} onClick={() => navigate("signup")}>
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
