"use client";

import React, { useMemo } from "react";
import {
  ArrowLeftIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import useAdminSocket from "@/app/lib/useAdminSocket";

// NotificationPage accepts an onBackClick prop
const NotificationPage = ({ onBackClick, isAdmin = true }) => {
  // Use the socket hook instead of local mock data
  const [allNotifications, setAllNotifications] = useAdminSocket(isAdmin);

  console.log("All Notification", allNotifications)

  const now = useMemo(() => new Date(), []);

  const getRelativeTime = (timestamp) => {
    const notificationDate = new Date(timestamp);
    const diffMinutes = Math.round(
      (now.getTime() - notificationDate.getTime()) / (1000 * 60)
    );
    const diffHours = Math.round(diffMinutes / 60);

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return notificationDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Group notifications by today/yesterday/older
  const groupedNotifications = useMemo(() => {
    const today = [];
    const yesterday = [];
    const older = [];

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfYesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    allNotifications.forEach((notif) => {
      const notifDate = new Date(notif.timestamp);
      if (notifDate >= startOfToday) {
        today.push(notif);
      } else if (notifDate >= startOfYesterday) {
        yesterday.push(notif);
      } else {
        older.push(notif);
      }
    });

    return { today, yesterday, older };
  }, [allNotifications, now]);

  const handleDeleteNotification = (id) => {
    setAllNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleToggleReadStatus = (id) => {
    setAllNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const NotificationItem = ({ notification }) => {
    const statusClasses = notification.isRead
      ? "text-gray-400"
      : "text-white";

    return (
      <div className="p-5">
        <div className="flex items-center justify-between last:border-b-0 transition-colors duration-200">
          <div className="flex-grow">
            <p className={`text-base font-semibold ${statusClasses}`}>
              {notification?.data?.message}
            </p>
            <p className={`text-sm ${statusClasses}`}>
              {notification.description}
            </p>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {getRelativeTime(notification.timestamp)}
            </span>
            <div className="flex space-x-2">
              {/* Mark as Read/Unread */}
              <button
                onClick={() => handleToggleReadStatus(notification.id)}
                className={`${notification.isRead ? "text-blue-400" : "text-purple-400"
                  } hover:opacity-75 p-1 rounded-full transition-opacity duration-200`}
              >
                {notification.isRead ? (
                  <CheckCircleIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className="text-red-400 hover:text-red-300 p-1 rounded-full transition-colors duration-200"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black rounded-2xl text-white p-6 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            className="text-white bg-gray-800 rounded-[33px] p-[10px] hover:bg-gray-700 transition-colors duration-200"
            onClick={onBackClick}
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-[24px] font-medium">Notification</h1>
        </div>
      </div>

      {/* Notification Groups */}
      <div className="rounded-lg overflow-hidden">
        {Object.entries(groupedNotifications).map(([group, items]) =>
          items.length > 0 ? (
            <div key={group} className="py-2">
              <h2 className="text-lg font-semibold text-white px-4 py-4">
                {group.charAt(0).toUpperCase() + group.slice(1)}{" "}
                <span className="text-[#71F50C] bg-[#71F50C1A] rounded-full text-[12px] p-2 px-3 font-normal">
                  {items.length}
                </span>
              </h2>
              {items.map((notif) => (
                <div
                  key={notif.id}
                  className="border border-gray-700 rounded mt-2"
                >
                  <NotificationItem notification={notif} />
                </div>
              ))}
            </div>
          ) : null
        )}

        {allNotifications.length === 0 && (
          <p className="p-4 text-center text-gray-400">
            No notifications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
