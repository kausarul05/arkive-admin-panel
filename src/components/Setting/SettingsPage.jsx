"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { apiRequest } from "@/app/lib/api";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const SettingsPage = ({ onBackClick }) => {
  const editor = useRef(null);

  const [activeTab, setActiveTab] = useState("privacy-security");
  const [editableContent, setEditableContent] = useState("");
  const [tabContents, setTabContents] = useState({
    "privacy-security": { title: "Privacy Policy", date: "", text: "" },
    "terms-conditions": { title: "Terms & Conditions", date: "", text: "" },
  });
  const [settingsData, setSettingsData] = useState(null);

  // Jodit config
  const joditConfig = useMemo(
    () => ({
      readonly: false,
      spellcheck: false,
      buttons:
        "undo,redo,|,bold,italic,underline,strikethrough,|,ul,ol,|,link,cut,copy,paste,|,align,|,source",
      theme: "dark",
      toolbarButtonSize: "large",
      style: {
        backgroundColor: "#000000",
        color: "#FFFFFF",
      },
    }),
    []
  );

  // Load API data
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest("get", "/settings");
      const apiSettings = data?.data?.setting || [];

      // mapping API data to tabContents format
      const updatedContents = {
        "privacy-security": {
          title: "Privacy Policy",
          date: new Date(
            apiSettings.find((s) => s.type === "privacy_policy")?.updatedAt ||
            Date.now()
          ).toLocaleString(),
          text: apiSettings.find((s) => s.type === "privacy_policy")?.content || "",
        },
        "terms-conditions": {
          title: "Terms & Conditions",
          date: new Date(
            apiSettings.find((s) => s.type === "terms_and_conditions")?.updatedAt ||
            Date.now()
          ).toLocaleString(),
          text:
            apiSettings.find((s) => s.type === "terms_and_conditions")?.content ||
            "",
        },
      };

      setSettingsData(apiSettings);
      setTabContents(updatedContents);
      setEditableContent(updatedContents[activeTab]?.text || "");
    };

    fetchData();
  }, []);

  // Update editor content when tab changes
  useEffect(() => {
    if (tabContents[activeTab]) {
      setEditableContent(tabContents[activeTab].text);
    }
  }, [activeTab, tabContents]);

  // const handleSaveAndChange = () => {
  //   setTabContents((prev) => ({
  //     ...prev,
  //     [activeTab]: { ...prev[activeTab], text: editableContent },
  //   }));
  //   showConfirmation(`Content for "${tabContents[activeTab].title}" saved!`);
  // };

  const handleSaveAndChange = async () => {
    try {
      
      const typeMap = {
        "privacy-security": "privacy_policy",
        "terms-conditions": "terms_and_conditions",
      };

      const payload = {
        data: {
          type: typeMap[activeTab],
          content: editableContent,
        },
      };

      // PUT request 
      await apiRequest("put", "/settings", payload);

      // Local state update
      setTabContents((prev) => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], text: editableContent },
      }));

      toast.success(`Content for "${tabContents[activeTab].title}" updated!`);
    } catch (error) {
      console.error("Error updating settings:", error);
      showConfirmation("Failed to update settings!");
    }
  };


  const showConfirmation = (message) => {
    const confirmDialog = document.createElement("div");
    confirmDialog.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    confirmDialog.innerHTML = `
      <div class="bg-black p-6 rounded-lg shadow-lg text-white">
        <p class="mb-4">${message}</p>
        <button id="confirmOkBtn" class="bg-cyan-400 hover:bg-cyan-300 text-white py-2 px-4 rounded-[4px] border-b-4 border-cyan-500">OK</button>
      </div>
    `;
    document.body.appendChild(confirmDialog);
    document.getElementById("confirmOkBtn").onclick = () => {
      document.body.removeChild(confirmDialog);
    };
  };


  return (
    <div className="bg-black rounded-2xl min-h-screen text-white p-6 sm:p-6 lg:p-8 ">
      <div className="flex items-center mb-6">
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="text-gray-300 hover:text-white mr-4"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-2xl sm:text-3xl font-semibold">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <div className="md:w-full flex justify-start bg-black rounded-t-lg overflow-x-auto scrollbar-hide">
          {["privacy-security", "terms-conditions"].map((tabId) => (
            <button
              key={tabId} 
              className={`flex-shrink-0 px-4 py-4 text-lg font-semibold relative ${activeTab === tabId
                ? "text-[#DCF3FF]"
                : "text-gray-400 hover:text-white"
                }`}
              onClick={() => setActiveTab(tabId)}
            >
              {tabContents[tabId].title}
              {activeTab === tabId && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] -mb-[1px] bg-[#DCF3FF]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-black p-4 rounded-b-lg -mt-px">
        <h2 className="text-xl font-semibold mb-1">
          {tabContents[activeTab]?.title}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          {tabContents[activeTab]?.date}
        </p>
        <div className="rounded-md mb-6 py-2">
          <JoditEditor
            className="jodit-custom-theme"
            ref={editor}
            value={editableContent}
            config={joditConfig}
            onChange={(newContent) => setEditableContent(newContent)}
          />
        </div>

        <div className="col-span-full mt-4">
          <button
            type="button"
            onClick={handleSaveAndChange}
            className="w-full mx-auto flex justify-center items-center rounded-[4px] bg-[#FFFF] text-black py-2 font-semibold shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition duration-300 ease-in-out hover:bg-[#E6E6E6] focus:outline-none"
          >
            Save & Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
