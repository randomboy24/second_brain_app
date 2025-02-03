"use client";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { signIn, signOut } from "next-auth/react";

export const Appbar = () => {
  const { session, loading } = useAuthStatus();

  return (
    <div
      className="h-20 border-b-2 flex justify-end
      pr-20
    items-center"
    >
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:3000/api/content", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              link: "twitter",
              title: "title of the video",
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        testbutton
      </button>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:3000/api/content", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        getallbutton
      </button>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:3000/api/content", {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              id: "37567659-4421-4d3e-a049-a96863d371f0",
            }),
          });
          const data = await res.json();
          console.log(data);
        }}
      >
        deletebutton
      </button>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          {session?.user ? (
            <button
              className="border border-white rounded-xl h-10 w-16"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="border border-white rounded-xl h-10 w-16"
              onClick={() => {
                signIn();
              }}
            >
              Signin
            </button>
          )}
        </div>
      )}
    </div>
  );
};
