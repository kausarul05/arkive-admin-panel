// src/app/admin/user-list/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
// import Link from "next/link"; // Link is not used, can be removed if not needed

// Full initial user data (re-declared here for self-contained example, ideally shared or fetched)
const initialUsersData = [
  {
    id: "5089",
    customer: {
      name: "Jane Cooper",
      avatar:
        "https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg",
    },
    joinDate: "6 April, 2023",
    status: "Active",
    email: "jane.cooper@example.com",
    phone: "664 333 224",
  },
  {
    id: "5090",
    customer: {
      name: "Jerome Bell",
      avatar:
        "https://images.pexels.com/photos/17595400/pexels-photo-17595400.jpeg", // Corrected Pexels URL
    },
    joinDate: "6 April, 2023",
    status: "Blocked",
    email: "jerome.bell@example.com",
    phone: "123 456 789",
  },
  {
    id: "5091",
    customer: {
      name: "Jenny Wilson",
      avatar: "https://placehold.co/40x40/5733FF/FFFFFF?text=JW",
    },
    joinDate: "6 April, 2023",
    status: "Active",
    email: "jenny.wilson@example.com",
    phone: "987 654 321",
  },
  {
    id: "5092",
    customer: {
      name: "Ralph Edwards",
      avatar: "https://placehold.co/40x40/FF33A1/FFFFFF?text=RE",
    },
    joinDate: "6 April, 2023",
    status: "Blocked",
    email: "ralph.edwards@example.com",
    phone: "555 123 456",
  },
  {
    id: "5093",
    customer: {
      name: "Alice Johnson",
      avatar: "https://placehold.co/40x40/33A1FF/FFFFFF?text=AJ",
    },
    joinDate: "7 April, 2023",
    status: "Active",
    email: "alice.j@example.com",
    phone: "111 222 333",
  },
  {
    id: "5094",
    customer: {
      name: "Bob Williams",
      avatar: "https://placehold.co/40x40/A133FF/FFFFFF?text=BW",
    },
    joinDate: "7 April, 2023",
    status: "Blocked",
    email: "bob.w@example.com",
    phone: "444 555 666",
  },
  {
    id: "5095",
    customer: {
      name: "Charlie Brown",
      avatar: "https://placehold.co/40x40/FFC133/FFFFFF?text=CB",
    },
    joinDate: "8 April, 2023",
    status: "Active",
    email: "charlie.b@example.com",
    phone: "777 888 999",
  },
  {
    id: "5096",
    customer: {
      name: "Diana Miller",
      avatar: "https://placehold.co/40x40/33FFC1/FFFFFF?text=DM",
    },
    joinDate: "8 April, 2023",
    status: "Blocked",
    email: "diana.m@example.com",
    phone: "222 333 444",
  },
  {
    id: "5097",
    customer: {
      name: "Eve Davis",
      avatar: "https://placehold.co/40x40/C133FF/FFFFFF?text=ED",
    },
    joinDate: "9 April, 2023",
    status: "Active",
    email: "eve.d@example.com",
    phone: "999 000 111",
  },
  {
    id: "5098",
    customer: {
      name: "Frank White",
      avatar: "https://placehold.co/40x40/FF3366/FFFFFF?text=FW",
    },
    joinDate: "9 April, 2023",
    status: "Blocked",
    email: "frank.w@example.com",
    phone: "333 444 555",
  },
];

export default function UserDetailsPage({ params }) {
  const router = useRouter();
  // Unwrap params if it's a Promise (Next.js 14+)
  const unwrappedParams =
    typeof params.then === "function" ? React.use(params) : params;
  const userId = unwrappedParams.id;
  const [mounted, setMounted] = useState(false);

  // Find the user from the initialUsersData array
  const user = initialUsersData.find((u) => u.id === userId);

  useEffect(() => {
    setMounted(true);
    // document.body.style.overflow = "hidden"; // This might cause issues if other modals are open
    // Consider using a more targeted approach for overflow, or allow scrolling in the background
    return () => {
      // document.body.style.overflow = "auto";
    };
  }, []);

  if (!user || !mounted) {
    // You might want a better loading/error state here
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center text-white">
        Loading user details...
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4" // Added padding for smaller screens
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
            <h2 className="text-xl font-bold text-[#DCF3FF]"> Details</h2>
            <button
              className="text-white text-xl font-bold hover:text-red-500"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
              >
                <path
                  d="M1.10042 8.53868C1.02122 8.53869 0.94379 8.51522 0.877932 8.47122C0.812075 8.42723 0.760744 8.36469 0.730433 8.29152C0.700123 8.21835 0.692193 8.13783 0.707649 8.06015C0.723104 7.98247 0.76125 7.91113 0.81726 7.85513L8.21648 0.45591C8.29158 0.380813 8.39343 0.338623 8.49964 0.338623C8.60584 0.338623 8.70769 0.380813 8.78279 0.45591C8.85789 0.531008 8.90008 0.632862 8.90008 0.739066C8.90008 0.845271 8.85789 0.947125 8.78279 1.02222L1.38357 8.42144C1.34642 8.45867 1.30228 8.48819 1.25369 8.50831C1.2051 8.52843 1.15301 8.53875 1.10042 8.53868Z"
                  fill="#DCF3FF"
                />
                <path
                  d="M8.49961 8.53868C8.44702 8.53875 8.39493 8.52843 8.34634 8.50831C8.29775 8.48819 8.25361 8.45867 8.21646 8.42144L0.817238 1.02222C0.742141 0.947125 0.699951 0.845271 0.699951 0.739066C0.699951 0.632862 0.742141 0.531008 0.817238 0.45591C0.892336 0.380813 0.99419 0.338623 1.10039 0.338623C1.2066 0.338623 1.30845 0.380813 1.38355 0.45591L8.78277 7.85513C8.83878 7.91113 8.87693 7.98247 8.89238 8.06015C8.90784 8.13783 8.89991 8.21835 8.8696 8.29152C8.83929 8.36469 8.78796 8.42723 8.7221 8.47122C8.65624 8.51522 8.57881 8.53869 8.49961 8.53868Z"
                  fill="#DCF3FF"
                />
              </svg>
            </button>
          </div>

          <div className="w-full h-48 rounded-lg overflow-hidden mb-4 bg-gray-700 flex items-center justify-center">
            {" "}
            {/* Added bg for placeholder */}
            {user.customer.avatar ? (
              <Image
                src={user.customer.avatar}
                alt={user.customer.name}
                width={400}
                height={200}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/400x200/CCCCCC/000000?text=Image+Not+Found";
                }} // Fallback for image
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            {user.customer.name}
          </h2>

          <p className="text-white mb-1 flex items-center">
            {/* Email Icon */}
            <svg
              className="w-5 h-5 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-7 6l-2 2-2-2m-8 6h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Email: {user.email}
          </p>
          <p className="text-white mb-1 flex items-center">
            {/* Phone Icon */}
            <svg
              className="w-5 h-5 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            Phone: {user.phone}
          </p>
          <p className="text-sm text-white mt-2 flex items-center">
            {/* Account Status Icon */}
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M14.6666 4.05813V10.4448C14.6666 12.2848 13.1732 13.7781 11.3332 13.7781H4.66655C4.35988 13.7781 4.06655 13.7381 3.77988 13.6581C3.36655 13.5448 3.23322 13.0181 3.53988 12.7115L10.6266 5.6248C10.7732 5.47813 10.9932 5.4448 11.1999 5.4848C11.4132 5.5248 11.6466 5.4648 11.8132 5.3048L13.5266 3.5848C14.1532 2.95813 14.6666 3.1648 14.6666 4.05813Z"
                fill="#DCF3FF"
              />
              <path
                d="M9.75992 5.15814L2.77992 12.1381C2.45992 12.4581 1.92659 12.3781 1.71325 11.9781C1.46659 11.5248 1.33325 10.9981 1.33325 10.4448V4.05814C1.33325 3.16481 1.84659 2.95814 2.47325 3.58481L4.19325 5.31148C4.45325 5.56481 4.87992 5.56481 5.13992 5.31148L7.52659 2.91814C7.78659 2.65814 8.21325 2.65814 8.47325 2.91814L9.76659 4.21148C10.0199 4.47148 10.0199 4.89814 9.75992 5.15814Z"
                fill="#DCF3FF"
              />
            </svg>
            Account status:
            <span
              className={`font-semibold text-[12px] ${
                user.status === "Active" ? "text-green-400" : "text-red-400"
              }`}
            >
              {user.status}
            </span>
          </p>
          <p className="text-sm text-white mt-1">
            Joined: <span className="font-bold">{user.joinDate}</span>
          </p>
          <p className="text-sm text-white mt-1">
            User ID: <span className="font-bold">#{user.id}</span>
          </p>

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
