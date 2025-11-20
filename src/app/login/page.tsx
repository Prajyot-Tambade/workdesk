"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = axios.post("/api/auth/login", user);
      setLoading(false);
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup Failed: ", error.message);
      toast.error("Error while creating account");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex flex-col gap-2">
        <h2>Login</h2>

        <label className=" block" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="bg-neutral-800 block p-2 rounded-lg"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
        />
        <label className=" block" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className="bg-neutral-800 block p-2 rounded-lg"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
        />
        <button
          disabled={buttonDisabled}
          onClick={onLogin}
          className="p-2 w-full bg-white text-black rounded-lg cursor-pointer"
        >
          {loading ? "loading" : "Login"}
        </button>
        <p>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
