import { useState } from "react";
import { FiBell } from "react-icons/fi";
import "../Styles/Notifications.css";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New message from John", read: false },
    { id: 2, text: "You received a new request", read: false },
    { id: 3, text: "Sarah replied to your message", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="notification-container">
      {/* Bell */}
      <div className="bell" onClick={() => setOpen(!open)}>
        <FiBell size={20} />

        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="dropdown">
          <div className="dropdown-header">
            Notifications
          </div>

          {notifications.length === 0 && (
            <p className="empty">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-item ${
                !n.read ? "unread" : ""
              }`}
              onClick={() => markAsRead(n.id)}
            >
              {n.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}