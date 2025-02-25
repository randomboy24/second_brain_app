"use client";
import { useEffect } from "react";
import Twitter from "twitter-lite";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";

export function TwitterCard({ url }: { url: string }) {
  async function fetchTweets() {
    try {
      // const tweets = await client.get("statuses/user_timeline", {
      //     screen_name: "EleanorTerrett", // Replace with the desired username
      //     count: 1, // Number of tweets to fetch
      //     tweet_mode: "extended", // Get full tweet text (not truncated)
      // });

      fetch("http://localhost:3000/api/tweets?id=1894263938646511909", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((data) => console.log(data));

      // console.log(tweets);
    } catch (err) {
      console.log("Error = " + err);
    }
  }

  useEffect(() => {
    // fetchTweets()
    //   .then(() => console.log("executed"))
    //   .catch(() =>
    //     console.log("something went wrong while fetching the tweets.")
    //   );
  }, []);

  return (
    <div className=" w-[360px] bg-[#181818] shadow-md shadow-black/50 r rounded-lg hover:scale-105 duration-300 hover:border hover:border-gray-800">
      <div className="">
        <Image
          src={"/twitterlogo2.jpg"}
          alt="twitter logo"
          height={"208"}
          width={"360"}
        ></Image>
      </div>
      <div className="flex justify-between gap-x-2 mt-4">
        <div>
          <img
            className="w-16 h-10 rounded-full"
            src="https://pbs.twimg.com/profile_images/1857696803384135680/fv_WIgwV_normal.jpg"
            alt="Rounded avatar"
          />
        </div>
        <div className="text-white font-medium text-lg">
          Completed Week 28.1 of #100xdevs cohort 3 Topic: Rust Bootcamp-3 ....
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-gray-400">1 days ago</div>
        <EllipsisVertical color="#fff" className="hover:cursor-pointer" />
      </div>
    </div>
  );
}
