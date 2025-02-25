"use client";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

interface propTypes {
  type: string;
  url: string;
}

export function YoutubeCard({ type, url }: propTypes) {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div className="group bg-[#181818] p-4 rounded-lg w-[360px] flex flex-col gap-y-2 shadow-md shadow-black/50 duration-300 hover:scale-105 hover:border hover:border-gray-800 ">
        <div
          draggable
          className="rounded-2xl overflow-hidden transition-all duration-300 group-hover:rounded-none h-[208px]"
        >
          {loading && <div className="bg-[#282828] h-full w-full"></div>}
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            controls
            onReady={() => {
              setLoading(false);
            }}
          />
        </div>
        <div className="text-white font-medium text-lg">
          AI is Making Devs Dumb! - Should you use AI at work?
        </div>
        <div className="flex justify-between">
          <div className="text-gray-400">1 days ago</div>
          <EllipsisVertical color="#fff" className="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
