"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const avatars = ["/avatars/male-avatar.png", "/avatars/female-avatar.png"];

const page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onSignup = async (signUpData: FormData) => {
    const username = signUpData.get("username");
    const email = signUpData.get("email");
    const password = signUpData.get("password");
    const confirmPassword = signUpData.get("confirm-password");
    try {
      if (username === "" || email === "" || password === "" || avatar === null) {
        toast.error("Enter the data first");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Confirm password did not match!");
        toast.error(error);
        setLoading(false);
        return;
      }
      setLoading(true);
      await axios.post("/api/auth/signup", {
        username,
        email,
        password,
        avatar
      });
      setLoading(false);
      toast.success("Account created successfully");
      setTimeout(() => router.push("/login"), 1000);
    } catch (signupError: any) {
      setError(signupError.response.data.error);
      toast.error(signupError.response.data.error);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-[90vh] flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        {error && <p className="text-red-600">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loading) return;
            onSignup(new FormData(e.currentTarget));
          }}
          className="flex flex-col mt-4"
        >
          <div className="flex items-center gap-4">
            {/* Preview */}
            {avatar ? (
              <img
                src={avatar}
                alt="Selected avatar"
                className="h-16 w-16 rounded-full border"
              />
            ) : (
              <div className="h-16 w-16 rounded-full border flex items-center justify-center text-xs text-muted-foreground">
                Avatar
              </div>
            )}

            {/* Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Choose avatar
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Select your avatar
                  </DialogTitle>
                </DialogHeader>

                <div className="flex gap-4 justify-center!">
                  {avatars.map((img) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => {
                        setAvatar(img);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative rounded-full p-1 transition hover:scale-105",
                        avatar === img
                          ? "ring-2 ring-primary"
                          : "ring-2 ring-transparent",
                      )}
                    >
                      <img
                        src={img}
                        alt="Avatar option"
                        className="h-32 w-32 rounded-full"
                      />
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
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

          <Button type="submit" disabled={loading} className="mt-4">
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
