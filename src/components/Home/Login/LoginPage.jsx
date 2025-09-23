"use client"; // This directive is required for client-side functionality in App Router components

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { apiRequest } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigation = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Indicate loading state

    // --- Client-side validation ---
    if (!email || !password) {
      setError("Please enter both email and password.");
      toast.error("Please enter both email and password.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // --- Simulate API Call (Replace with your actual backend call) ---
    // console.log("Attempting to log in with:", { email, password, rememberMe });

    try {
      const payload = {
        "data": {
          email,
          password
        }
      }

      const loginData = await apiRequest("post", "/auth/login", payload);
      toast.success(loginData?.message)
      navigation.push("/admin")
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-[#1A1A1A] ">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Left Red Panel - now with image background and blur */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url("/arkive-image.png")`,
          // filter: "blur(4px)", // Apply blur effect - apply to a pseudo-element or separate overlay for better control
        }}
      >
        {/* If you want the blur effect to appear only on the image, and not on the entire panel,
            you'd typically use a pseudo-element or an overlay div with a backdrop-filter.
            For simplicity here, the blur class would be on this div, but visually it blurs the entire half.
        */}
      </div>
      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 bg-[#2D2D2D] flex items-center justify-center p-4 sm:p-8">
        <div className="md:w-[564px] p-10 rounded-[15px] flex flex-col justify-center items-center gap-10">
          <div className="self-stretch flex flex-col justify-start items-center gap-[30px]">
            <div className="self-stretch flex flex-col justify-center items-center gap-[30px]">
              <div className="w-full  flex flex-col justify-start gap-[18px]">
                <Image
                  src="/ark-logo.png"
                  alt="Arkive"
                  width={170}
                  height={150}
                  className="rounded-lg h-10"
                />
                <p className="self-stretch text-start text-white text-[24px] font-semibold">
                  Welcome to Arkive
                </p>
                <p className="self-stretch text-start text-[#FFF] text-sm font-semibold ">
                  Sign in to your account
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col items-end gap-[18px]"
              >
                <div className="self-stretch flex flex-col justify-start items-start gap-[18px]">
                  {/* Email Input */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <label
                      htmlFor="email"
                      className="self-stretch text-white text-sm font-normal font-[Inter]"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="self-stretch h-10 w-full px-3 py-2.5  rounded-md border border-[#DCDCDC] text-white focus:outline-none focus:ring-1 focus:ring-[#66B8FF] font-[Inter]"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Password Input */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <label
                      htmlFor="password"
                      className="self-stretch text-white text-sm font-normal font-[Inter]"
                    >
                      Password
                    </label>
                    <div className="relative self-stretch">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="h-10 px-3 py-2.5  rounded-md border border-[#DCDCDC] text-white focus:outline-none focus:ring-1 focus:ring-[#66B8FF] font-[Inter] w-full pr-10"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      {/* Toggle button for password visibility */}
                      <button
                        type="button" // Important: Prevents form submission
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-[#B0B0B0] hover:text-white"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          // Eye-off icon (hidden password)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye-off"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 0-.36M22 12s-3 7-10 7c-1.31 0-2.6-.34-3.79-.91M2 2l20 20" />
                            <path d="M6.71 6.71A3 3 0 0 0 12 10a3 3 0 0 0 3.29 2.91" />
                          </svg>
                        ) : (
                          // Eye icon (visible password)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-eye"
                          >
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="self-stretch flex justify-between items-center mt-2">
                  <label
                    htmlFor="rememberMe"
                    className="flex items-center gap-3 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="hidden peer"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="w-[18px] h-[18px] bg-[#3B3B3B] peer-checked:bg-[#66B8FF] rounded-[2px] border border-[#505050] peer-checked:border-[#66B8FF] flex items-center justify-center relative">
                      {rememberMe && (
                        <svg
                          className="w-3 h-3 text-white absolute"
                          fill="none"
                          viewBox="0 0 14 11"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 5.5L4.95263 9.5L13 1.5" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[#B0B0B0] text-xs font-normal font-[Inter]">
                      Remember Password
                    </span>
                  </label>
                  <a
                    href="/Forgot-Password"
                    className="text-[#CCE6FF] text-xs font-normal font-[Inter] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2 font-[Inter]">
                    {error}
                  </p>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  className={`w-full h-10 mx-auto mt-4 bg-[#FFF] text-[#23272E] rounded-md text-sm font-normal font-[Inter] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex justify-center items-center transition duration-300 ease-in-out  ${loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
