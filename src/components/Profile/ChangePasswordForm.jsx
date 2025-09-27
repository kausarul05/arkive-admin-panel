"use client";

import { apiRequest } from "@/app/lib/api";
import Cookies from "js-cookie";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const accessToken = Cookies.get("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    if(newPassword !== confirmedPassword){
      toast.error("Password do not match")
      return;
    }

    const payload = {
      "data": {
        oldPassword : currentPassword,
        newPassword : confirmedPassword,
      },
    };

    try {
      const res = await apiRequest("patch", "/auth/update_password", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("res", res)

      if (res?.success) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.success("Failed to update password!");
    } finally {
      // setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 flex flex-col items-center bg-black text-white"
    >
      {" "}
      {/* Added bg-black and text-white */}
      <div className="mb-4 w-full max-w-[982px]">
        <label
          htmlFor="currentPassword"
          className="block text-white text-sm font-bold mb-2" // Changed text to white
        >
          Current Password
        </label>
        <input
          type="password"
          id="currentPassword"
          // Changed text and background of input for dark theme
          className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-4 w-full max-w-[982px]">
        <label
          htmlFor="newPassword"
          className="block text-white text-sm font-bold mb-2" // Changed text to white
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          // Changed text and background of input for dark theme
          className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6 w-full max-w-[982px]">
        <label
          htmlFor="confirmedPassword"
          className="block text-white text-sm font-bold mb-2" // Changed text to white
        >
          Confirmed Password
        </label>
        <input
          type="password"
          id="confirmedPassword"
          // Changed text and background of input for dark theme
          className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          required
        />
      </div>
      {message && (
        <p
          className={`text-center mb-4 ${messageType === "success" ? "text-green-400" : "text-red-400" // Adjusted for dark theme
            }`}
        >
          {message}
        </p>
      )}
      <div className="flex items-center justify-center mt-6 md:w-[982px]">
        <button
          type="submit"
          className="bg-[#DCF3FF] hover:bg-opacity-80 text-black font-bold w-full py-3 px-4 rounded-[4px] focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
