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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async (signUpData: FormData) => {
    const username = signUpData.get("username");
    const email = signUpData.get("email");
    const password = signUpData.get("password");
    const confirmPassword = signUpData.get("confirm-password");
    try {
      setLoading(true);
      if (username === "" || email === "" || password === "") {
        toast.error("Enter the data first");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Confirm password did not match!");
        toast.error(error);
        setLoading(false)
        return;
      }
      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      setLoading(false);
      toast.success("Account created successfully");
      setTimeout(() => router.push("/login"), 1000);
    } catch (error: any) {
      setError(error.response.data.error);
      toast.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form action={onSignup} className="flex flex-col mt-4">
          <label className="block" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="bg-neutral-800 block p-2 rounded-lg"
            type="text"
            required
          />
          <label className="block mt-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="bg-neutral-800 block p-2 rounded-lg"
            type="email"
            required
          />
          <label className="block mt-2" htmlFor="password">
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
          <label className="block mt-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirm-password"
            className="bg-neutral-800 block p-2 rounded-lg"
            type="password"
            required
            minLength={6}
          />

          <Button type="submit" disabled={buttonDisabled} className="mt-4">
            {loading ? "loading" : "Sign Up"}
          </Button>
        </form>
        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default page;
