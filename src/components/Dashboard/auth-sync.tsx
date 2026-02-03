"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthSync({ user }: { user: any }) {
  const { authStatus, setUser } = useAuthStore();

  useEffect(() => {
    if (!authStatus) {
      setUser(user);
    }
  }, [authStatus, setUser, user]);

  return null;
}
