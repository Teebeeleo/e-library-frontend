import React, { useEffect, useState } from "react";
import { fetchNotifications, markNotificationRead } from "./api";
import { FiBell, FiBookOpen, FiCheckCircle, FiInfo } from "react-icons/fi";

export default function NotificationsPage({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState("");

  useEffect(() => {
    if (!user?.id) return;
    fetchNotifications(user.id)
      .then((data) => {
        if (Array.isArray(data)) setNotifications(data);
        else setError(data?.error || "Could not load notifications.");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user?.id]);

  async function handleMarkRead(notifId) {
    try {
      await markNotificationRead(notifId);
      setNotifications((prev) =>
        prev.map((n) => n._id === notifId ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error("Could not mark as read:", err.message);
    }
  }

  async function handleMarkAllRead() {
    try {
      await Promise.all(
        notifications.filter((n) => !n.is_read).map((n) => markNotificationRead(n._id))
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Could not mark all as read:", err.message);
    }
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  function getIcon(type) {
    if (type === "new_book") return <FiBookOpen size={16} className="text-teal-500" />;
    if (type === "system")   return <FiInfo     size={16} className="text-blue-500" />;
    return                          <FiBell     size={16} className="text-[#c0a062]" />;
  }

  if (loading)
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-gray-400 animate-pulse">Loading notifications…</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-gray-900 text-xl font-bold">Notifications</h2>
          <p className="text-gray-400 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors flex items-center gap-1"
          >
            <FiCheckCircle size={13} /> Mark all as read
          </button>
        )}
      </div>

      {/* Empty state */}
      {notifications.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <FiBell size={36} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No notifications yet.</p>
          <p className="text-gray-300 text-sm mt-1">We will notify you when new books are added.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => !notif.is_read && handleMarkRead(notif._id)}
              className={`bg-white border rounded-2xl p-4 flex items-start gap-4 transition-all cursor-pointer ${
                notif.is_read
                  ? "border-gray-100 opacity-60"
                  : "border-teal-100 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Icon */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                notif.is_read ? "bg-gray-50" : "bg-teal-50"
              }`}>
                {getIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${notif.is_read ? "text-gray-500" : "text-gray-900 font-medium"}`}>
                  {notif.message}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {notif.createdAt
                    ? new Date(notif.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })
                    : "Just now"}
                </p>
              </div>

              {/* Unread dot */}
              {!notif.is_read && (
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
