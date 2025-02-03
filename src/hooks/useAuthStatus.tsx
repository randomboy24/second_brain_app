"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAuthStatus = () => {
  const { data: session, status } = useSession();
  return {
    session,
    loading: status === "loading",
  };
};
