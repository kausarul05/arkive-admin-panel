"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { apiRequest } from "./api";
import Cookies from "js-cookie";

/**
 * Hook to handle admin notifications via socket.io
 * @param {boolean} isAdmin - true if current user is admin
 * @returns {[notification, setNotification]} - state and updater
 */
const useAdminSocket = (isAdmin = false) => {
    const [notification, setNotification] = useState([]);
    const accessToken = Cookies.get("accessToken");

    // fetch initial notifications
    const handleFetchNotification = async () => {
        try {
            const res = await apiRequest("get", "/notification", null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            // console.log("data", res?.data?.notification)
            if (!res.success || !Array.isArray(res?.data?.notification)) {
                toast.error("Failed to fetch notifications");
                return;
            }
            setNotification(res?.data?.notification);
        } catch (err) {
            console.error("Fetch notification error:", err);
            toast.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        if (!isAdmin) return;

        handleFetchNotification();

        // Connect to socket
        const socket = io("https://379691db0e46.ngrok-free.app", {
            auth: { isAdmin: true },
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
        
        socket.on("connect", () => console.log("Socket connected:", socket.id));
        socket.on("connect_error", (err) => console.log("Socket connection error:", err));
        socket.onAny((event, ...args) => console.log("Event received:", event, args));

        // Listen for new notifications
        socket.on("Admin", (newNotif) => {
            console.log("New notification received:", newNotif);
            setNotification((prev) => [newNotif, ...prev]);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => socket.disconnect();
    }, [isAdmin]);

    return [notification, setNotification];
};

export default useAdminSocket;
