"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("changePassword");

  const [profileImage, setProfileImage] = useState("/image/userImage.png");
  const fileInputRef = useRef(null);

  const handleBackClick = () => {
    router.back();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    // Main container changed to black background and white text
    <div className="min-h-screen bg-black text-white flex justify-center items-start pt-8 pb-8 rounded-lg">
      <div
        className="flex items-center gap-4 cursor-pointer ml-5"
        onClick={handleBackClick}
      >
        <div className="">
          {/* Adjusted ArrowLeft background and text color for dark theme */}
          <ArrowLeft
            className="text-white bg-gray-800 rounded-full p-2"
            size={40}
          />
        </div>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>{" "}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="p-6">
          <div className="flex justify-center gap-[18px] items-center mb-6">
            <div
              // Adjusted border color for visibility on dark bg
              className="relative rounded-full border-4 border-gray-700 cursor-pointer"
              onClick={handleImageClick}
            >
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <Image
                  src={profileImage}
                  alt="User Profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-black">
                {/* Adjusted border color to black for contrast */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.586 3.586a2 2 0 112.828 2.828l-7.793 7.793a.5.5 0 01-.128.093l-3 1a.5.5 0 01-.611-.611l1-3a.5.5 0 01.093-.128l7.793-7.793zM10.707 6.293a1 1 0 00-1.414 1.414L12 9.414l1.293-1.293a1 1 0 00-1.414-1.414L10.707 6.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h2 className="text-[24px] font-bold mt-3 text-white">
                Lukas Wagner
              </h2>{" "}
              {/* Changed text to white */}
              <p className="text-white font-[400] text-xl">Admin</p>{" "}
              {/* Changed text to white */}
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <button
              className={`py-2 px-6 text-[16px] font-semibold ${
                activeTab === "editProfile"
                  ? "border-b-2 border-[#DCF3FF] text-[#DCF3FF]"
                  : "text-gray-400 hover:text-gray-200" // Adjusted text color for non-active tabs
              }`}
              onClick={() => setActiveTab("editProfile")}
            >
              Edit Profile
            </button>
            <button
              className={`py-2 px-6 text-[16px] font-semibold ${
                activeTab === "changePassword"
                  ? "border-b-2 border-[#DCF3FF] text-[#DCF3FF]"
                  : "text-gray-400 hover:text-gray-200" // Adjusted text color for non-active tabs
              }`}
              onClick={() => setActiveTab("changePassword")}
            >
              Change Password
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/jpg"
          />

          {activeTab === "editProfile" && (
            <div className="p-6 flex flex-col items-center">
              <form className="w-full max-w-[982px] ">
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-white text-sm font-bold mb-2" // Changed text to white
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    // Changed text and background of input for dark theme
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
                    defaultValue="Lukas Wagner"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-bold mb-2" // Changed text to white
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    // Changed text and background of input for dark theme
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
                    defaultValue="lukas.wagner@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contactNo"
                    className="block text-white text-sm font-bold mb-2" // Changed text to white
                  >
                    Contact No
                  </label>
                  <input
                    type="tel"
                    id="contactNo"
                    // Changed text and background of input for dark theme
                    className="shadow appearance-none rounded w-full h-[50px] py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border border-gray-700 "
                    defaultValue="+1234567890"
                  />
                </div>
                <div className="flex items-center justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-[#DCF3FF] hover:bg-opacity-80 text-black font-bold w-full py-3 px-4 rounded-[4px] focus:outline-none focus:shadow-outline"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === "changePassword" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
}
