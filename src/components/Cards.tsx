import { YoutubeCard } from "./YoutubeCard";
import { WebCard } from "./WebCard";
import { TwitterCard } from "./TwitterCard";
import React from "react";

export function Cards() {
  return (
    <div className="col-span-10 h-screen bg-[#121212]">
      <div className="flex flex-wrap gap-x-6 gap-y-4 pl-9">
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=MevKTPN4ozw"}
        />
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        <YoutubeCard
          type={"youtube"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        <YoutubeCard
          type={"webUrl"}
          url={"https://www.youtube.com/watch?v=LKeC1_mgokU"}
        />
        {/* <WebCard url="https://wwww.facebook.com" /> */}
        <TwitterCard url=""></TwitterCard>
      </div>
    </div>
  );
}
