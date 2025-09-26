// src/app/admin/user-list/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Cookies from "js-cookie";
import { apiRequest } from "@/app/lib/api";
import toast from "react-hot-toast";

export default function UserDetailsPage({ params }) {
  const router = useRouter();
  const userId = params.id; // Get ID from route params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        toast.error("You must login first!");
        router.push("/login");
        return;
      }

      try {
        const response = await apiRequest("get", `/user?_id=${userId}`, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("response", response?.data)
        setUser(response.data?.user[0]); // Assuming API returns user in data field
      } catch (err) {
        console.error("Failed to fetch user:", err);
        toast.error("Failed to fetch user details");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, router]);

  console.log(user)

  if (loading || !user) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center text-white">
        Loading user details...
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-white p-6 rounded-lg w-full max-w-md relative border border-gray-600"
          style={{
            background: "rgba(255, 255, 255, 0.35)",
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#DCF3FF]">Details</h2>
            <button
              className="text-white text-xl font-bold hover:text-red-500"
              onClick={() => router.back()}
            >
              X
            </button>
          </div>

          <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-700 flex items-center justify-center">
            {user.profile ? (
              <Image
                src={user.profile}
                alt={user.userName}
                width={400}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Found";
                }}
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">{user.userName}</h2>
          <p className="text-white mb-1 flex items-center">Email: {user.email}</p>
          <p className="text-white mb-1 flex items-center">Phone: {user.mobile}</p>
          <p className="text-sm text-white mt-2 flex items-center">
            Account status:{" "}
            <span
              className={`font-semibold text-[16px] ml-2 ${user.status === "Active" ? "text-green-400" : "text-red-400"
                }`}
            >
              {user.isDeleted ? "Blocked" : "Active"}
            </span>
          </p>
          <p className="text-sm text-white mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-sm text-white mt-1">User ID: #{user.id}</p>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded bg-gray-600 w-full hover:bg-gray-500 transition-colors duration-200"
            >
              Close
            </button>
            <button
              className="px-4 py-2 rounded w-full transition-colors duration-200"
              style={{ background: "#CA0D0C" }}
            >
              {user.status === "Active" ? "Block Account" : "Activate Account"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
