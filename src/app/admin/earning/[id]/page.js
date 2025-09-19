// src/app/earnings/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { motion } from "framer-motion"; // Only motion is needed, AnimatePresence is for conditional rendering within one component

// Dummy data for demonstration (ideally, this would be fetched from an API)
const dummyData = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1, // Add a unique ID for better keying
  name: `Robert ${i + 1}`,
  itemNumber: `#A${12345 + i}`,
  salePrice: `$${(123 + i * 0.5).toFixed(2)}`,
  commission: `${(10 + i % 5)}%`,
  profit: `${(80 + i * 0.2).toFixed(2)}`,
  date: `12 June 2025`,
  description: `Detailed description for item #A${12345 + i}. This item was sold on 12 June 2025, generating a significant profit. Buyer: Customer ${i % 10 + 1}, Payment Method: Card ending in **** ${1234 + i % 100}.`,
  buyer: `Customer ${i % 10 + 1}`,
  paymentMethod: `Card ending in **** ${1234 + i % 100}`,
}));

export default function EarningDetailsPage({ params }) {
  const router = useRouter();
  const earningId = params.id; // Get the ID from the URL params

  const [earningDetails, setEarningDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (earningId) {
      const fetchDetails = async () => {
        try {
          setLoading(true);
          setError(null);
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 300));

          // Find the item from dummyData based on the ID
          const foundItem = dummyData.find(item => item.id === Number(earningId));

          if (foundItem) {
            setEarningDetails(foundItem);
          } else {
            setError('Earning record not found.');
          }
        } catch (err) {
          console.error("Failed to fetch earning details:", err);
          setError('Failed to load earning details.');
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [earningId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        <p>Loading earning details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-red-500 p-4">
        <p className="mb-4">Error: {error}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-[#DCF3FF] text-[#181818] font-semibold rounded-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCF3FF]"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!earningDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white p-4">
        <p className="mb-4">Earning record not found for ID: {earningId}.</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-[#DCF3FF] text-[#181818] font-semibold rounded-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCF3FF]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-[#121212] font-inter text-white p-4 sm:p-8"
      initial={{ opacity: 0, y: 20 }} // Animation for page entry
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-[#232323] rounded-xl p-6 sm:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#DCF3FF]">Earning Details </h1>
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400">Name:</p>
            <p className="text-lg font-medium">{earningDetails.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Item Number:</p>
            <p className="text-lg font-medium">{earningDetails.itemNumber}</p>
          </div>
          <div>
            <p className="text-gray-400">Sale Price:</p>
            <p className="text-lg font-medium">{earningDetails.salePrice}</p>
          </div>
          <div>
            <p className="text-gray-400">Commission:</p>
            <p className="text-lg font-medium">{earningDetails.commission}</p>
          </div>
          <div>
            <p className="text-gray-400">Sellers Profit:</p>
            <p className="text-lg font-medium">{earningDetails.profit}</p>
          </div>
          <div>
            <p className="text-gray-400">Transaction Date:</p>
            <p className="text-lg font-medium">{earningDetails.date}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-400">Description:</p>
          <p className="text-base">{earningDetails.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Buyer:</p>
            <p className="text-base">{earningDetails.buyer}</p>
          </div>
          <div>
            <p className="text-gray-400">Payment Method:</p>
            <p className="text-base">{earningDetails.paymentMethod}</p>
          </div>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-8 w-full px-6 py-3 bg-[#DCF3FF] text-[#181818] font-semibold rounded-md hover:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCF3FF]"
        >
          Go Back to List
        </button>
      </div>
    </motion.div>
  );
}