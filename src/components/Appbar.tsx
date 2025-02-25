"use client";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { CreateContentModal } from "./CreateContentModal";

export const Appbar = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuthStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="h-20 border-b-2 flex justify-between
      px-20
    items-center"
    >
      <div className="text-white">Brainly</div>
      {isModalOpen && (
        <CreateContentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        ></CreateContentModal>
      )}
      {children}
      <div className="">
        {loading ? null : (
          <div className="flex items-center gap-x-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              Add
            </Button>
            {session?.user ? (
              <Button
                variant="secondary"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </Button>
            ) : (
              <button
                className="border border-white rounded-xl h-10 w-16 text-white"
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
    </div>
  );
};
