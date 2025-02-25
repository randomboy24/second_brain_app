"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const urlTypes = ["twitter", "youtube", "web", "github"] as const;
type UrlType = (typeof urlTypes)[number];

export function CreateContentModal({ isOpen, onClose }: ModalProps) {
  const [url, setUrl] = useState("");
  const [type, setType] = useState<UrlType>("web");

  async function onSubmit() {}

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
      <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md relative border border-gray-700 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-100">Add URL</h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition"
              placeholder="Enter URL"
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as UrlType)}
              className="w-full px-3 py-2 bg-[#2A2A2A] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 transition"
            >
              {urlTypes.map((urlType) => (
                <option key={urlType} value={urlType} className="bg-[#1E1E1E]">
                  {urlType.charAt(0).toUpperCase() + urlType.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
