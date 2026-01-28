"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (loginData: FormData) => {
    const email = loginData.get("email");
    const password = loginData.get("password");
    try {
      if (email === "" || password === "") {
        toast.error("Enter email and password first");
        return;
      }
      setLoading(true);
      await axios.post("/api/auth/login", { email, password });

      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (loginError: any) {
      setError(loginError.response.data.error);
      toast.error(loginError.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Login</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loading) return;
            onLogin(new FormData(e.currentTarget));
          }}
          className="flex flex-col mt-4"
        >
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="bg-neutral-800 block p-2 rounded-lg"
            type="email"
            required
          />
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="bg-neutral-800 block p-2 rounded-lg"
            type="password"
            required
            minLength={6}
          />

          <Button type="submit" disabled={loading} className="mt-4">
            {loading ? "loading" : "Login"}
          </Button>
        </form>
        <p>
          Don't have an account? <Link href="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
