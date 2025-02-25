"use client";
import { useEffect, useState } from "react";

interface WebCardProps {
  url: string;
}

export function WebCard({ url }: WebCardProps) {
  const [meta, setMeta] = useState<{
    title?: string;
    description?: string;
    image?: string;
  }>({});

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`
        );
        const data = await res.json();
        setMeta(data);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };
    fetchMetadata();
  }, [url]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[360px] rounded-lg border border-gray-600 p-4 hover:bg-gray-800 transition"
    >
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title}
          className="rounded-lg mb-2 w-full h-40 object-cover"
        />
      )}
      <h3 className="text-white font-medium text-lg">
        {meta.title || "Unknown Title"}
      </h3>
      <p className="text-gray-400 text-sm">
        {meta.description || "No description available"}
      </p>
    </a>
  );
}
