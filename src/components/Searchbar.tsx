"use client";
import { useState } from "react";
import { Search, SearchIcon } from "lucide-react";

export default function Searchbar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-row w-[600px] h-11 border border-gray-500 rounded-3xl">
        <div className="flex-[85%]">Search</div>
        <div className="flex-[15%]  bg-[#222] pt-2 rounded-r-3xl flex justify-center">
          <SearchIcon stroke="white" strokeWidth={1}></SearchIcon>
        </div>
      </div>
    </div>
  );
}
