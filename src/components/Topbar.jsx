import React from "react";
import { Bell, LogOut, PenLine, UserRound } from "lucide-react";

export function Topbar({ user, onLogout, onNavigate, view, notificationCount = 0 }) {
  const title = {
    add: "Add Post",
    article: "Article",
    dashboard: "Writer Dashboard",
    login: "Login",
    notifications: "Notifications",
    profile: "Profile",
    signup: "Sign Up"
  }[view] || "Writer Dashboard";

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Blog Platform</p>
        <h1>{title}</h1>
      </div>
      <div className="session">
        <button type="button" className={view === "dashboard" ? "nav-active" : ""} onClick={() => onNavigate("dashboard")}>
          Posts
        </button>
        {user ? (
          <>
            <button type="button" className={view === "add" ? "nav-active" : ""} onClick={() => onNavigate("add")}>
              <PenLine size={17} />
              Add
            </button>
            <button
              type="button"
              className={view === "notifications" ? "nav-active badge-button" : "badge-button"}
              onClick={() => onNavigate("notifications")}
            >
              <Bell size={17} />
              {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
            </button>
            <button type="button" className={view === "profile" ? "nav-active" : ""} onClick={() => onNavigate("profile")}>
              <UserRound size={17} />
              Profile
            </button>
            <span>{user.name}</span>
            <button type="button" onClick={onLogout} title="Logout" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <button type="button" className={view === "login" ? "nav-active" : ""} onClick={() => onNavigate("login")}>
              Login
            </button>
            <button type="button" className={view === "signup" ? "nav-active" : ""} onClick={() => onNavigate("signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}
