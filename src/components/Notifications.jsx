import React, { useEffect, useState } from "react";
import { Bell, Heart, MessageCircle } from "lucide-react";
import { getProfile } from "../services/authApi.js";
import { formatDate } from "../utils/date.js";

export function Notifications({ token }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getProfile(token).then((data) => setNotifications(data.stats.notifications || []));
  }, [token]);

  return (
    <section className="notification-list">
      {notifications.length === 0 && <p className="empty">No notifications yet.</p>}
      {notifications.map((notification) => (
        <article className="notification-card" key={notification.id}>
          <span className="notification-icon">
            {notification.type === "like" ? <Heart size={18} /> : <MessageCircle size={18} />}
          </span>
          <div>
            <p>{notification.text}</p>
            <span>{formatDate(notification.createdAt)}</span>
          </div>
        </article>
      ))}
      {notifications.length > 0 && (
        <p className="muted notification-footer">
          <Bell size={16} /> Showing recent activity on your posts.
        </p>
      )}
    </section>
  );
}
