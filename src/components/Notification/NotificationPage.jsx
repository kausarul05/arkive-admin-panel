"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowLeftIcon,
  // MagnifyingGlassIcon, // Removed as search bar is removed
  // AdjustmentsHorizontalIcon, // Not used, but kept from original imports
  EyeIcon, // For view/mark as unread
  TrashIcon, // For delete
  CheckCircleIcon, // For mark as read
  // EnvelopeIcon // Alternative for unread, not currently used
} from "@heroicons/react/24/outline";

import { notifications as initialNotifications } from "../../components/lib/notificationData"; // Import mock data
// import Image from 'next/image'; // Not used, but kept from original imports

// NotificationPage now accepts an onBackClick prop
const NotificationPage = ({ onBackClick }) => {
  // const [searchTerm, setSearchTerm] = useState(''); // Removed searchTerm state
  // Use state to manage notifications for deletion/read status
  const [allNotifications, setAllNotifications] =
    useState(initialNotifications);

  const now = useMemo(() => new Date(), []); // Memoize current time for grouping calculations

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
      // For simplicity, just return a formatted date for older items.
      // In a real app, you might differentiate days more clearly.
      return notificationDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Group notifications - removed filtering by searchTerm
  const groupedNotifications = useMemo(() => {
    // const filtered = allNotifications.filter(notif => // Removed filtering
    //   notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   notif.description.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filtered = allNotifications; // Use all notifications directly as search is removed

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

    filtered.forEach((notif) => {
      const notifDate = new Date(notif.timestamp);
      if (notifDate >= startOfToday) {
        today.push(notif);
      } else if (notifDate >= startOfYesterday) {
        yesterday.push(notif);
      } else {
        older.push(notif); // Or discard if only showing today/yesterday
      }
    });

    return { today, yesterday, older };
  }, [allNotifications, now]); // Removed searchTerm from dependencies

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
    // Adjust text color based on read status for dark theme
    const statusClasses = notification.isRead
      ? "text-gray-400" // Read notifications slightly faded
      : "text-white"; // Unread notifications stand out

    return (
      <div className="p-5">
        <div
          className={`flex items-center justify-between ${
            notification.isRead ? "" : ""
          } last:border-b-0 transition-colors duration-200`}
        >
          <div className="flex-grow">
            <p className={`text-base font-semibold ${statusClasses}`}>
              {notification.title}
            </p>
            <p className={`text-sm ${statusClasses}`}>
              {notification.description}
            </p>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {" "}
              {/* Adjusted to gray-400 for dark theme */}
              {getRelativeTime(notification.timestamp)}
            </span>
            <div className="flex space-x-2">
              {/* Mark as Read/Unread Icon */}
              <button
                onClick={() => handleToggleReadStatus(notification.id)}
                // Adjusted colors for better contrast on dark background
                className={`${
                  notification.isRead ? "text-blue-400" : "text-purple-400"
                } hover:opacity-75 p-1 rounded-full transition-opacity duration-200`}
                aria-label={
                  notification.isRead ? "Mark as unread" : "Mark as read"
                }
              >
                {notification.isRead ? (
                  <CheckCircleIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
              {/* Delete Icon */}
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                // Adjusted for better contrast on dark background
                className="text-red-400 hover:text-red-300 p-1 rounded-full transition-colors duration-200"
                aria-label="Delete notification"
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
    // Main container changed to black background and white text
    <div className="bg-black rounded-2xl text-white p-6 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Back button now calls onBackClick prop */}
          <button
            // Changed text to white, bg to gray-800, hover to gray-700 for dark theme
            className="text-white bg-gray-800 rounded-[33px] p-[10px] hover:bg-gray-700 transition-colors duration-200"
            onClick={onBackClick}
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-[24px] font-medium">Notification</h1>{" "}
          {/* Text will be white from parent */}
        </div>
        {/* Removed search bar and filter button */}
      </div>

      {/* Notification List Container */}
      <div className="rounded-lg overflow-hidden">
        {groupedNotifications.today.length > 0 && (
          <div className="py-2">
            <h2 className="text-lg font-semibold text-white px-4 py-4">
              {" "}
              {/* Changed text to white */}
              Today{" "}
              <span className="text-[#71F50C] bg-[#71F50C1A] rounded-full text-[12px] p-2 px-3 font-normal">
                {groupedNotifications.today.length}
              </span>
            </h2>
            {groupedNotifications.today.map((notif) => (
              <div
                key={notif.id}
                className="border border-gray-700 rounded mt-2"
              >
                {" "}
                {/* Adjusted border color */}
                <NotificationItem notification={notif} />
              </div>
            ))}
          </div>
        )}

        {groupedNotifications.yesterday.length > 0 && (
          <div className="py-2">
            <h2 className="text-lg font-semibold text-white px-4 py-4">
              {" "}
              {/* Changed text to white */}
              Yesterday{" "}
              <span className="text-[#71F50C] bg-[#71F50C1A] rounded-full text-[12px] p-2 px-3 font-normal">
                {groupedNotifications.yesterday.length}
              </span>
            </h2>
            {groupedNotifications.yesterday.map((notif) => (
              <div
                key={notif.id}
                className="border border-gray-700 rounded mt-2"
              >
                {" "}
                {/* Adjusted border color */}
                <NotificationItem notification={notif} />
              </div>
            ))}
          </div>
        )}

        {groupedNotifications.older.length > 0 && (
          <div className="py-2">
            <h2 className="text-lg font-semibold text-white px-4 py-4">
              {" "}
              {/* Changed text to white */}
              Older{" "}
              <span className="text-[#71F50C] bg-[#71F50C1A] rounded-full text-[12px] p-2 px-3 font-normal">
                {groupedNotifications.older.length}
              </span>
            </h2>
            {groupedNotifications.older.map((notif) => (
              <div
                key={notif.id}
                className="border border-gray-700 rounded mt-2"
              >
                {" "}
                {/* Adjusted border color */}
                <NotificationItem notification={notif} />
              </div>
            ))}
          </div>
        )}

        {groupedNotifications.today.length === 0 &&
          groupedNotifications.yesterday.length === 0 &&
          groupedNotifications.older.length === 0 && (
            <p className="p-4 text-center text-gray-400">
              No notifications found.
            </p>
          )}
      </div>
    </div>
  );
};

export default NotificationPage;
