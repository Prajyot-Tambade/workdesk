"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/auth/verifyemail", { token });
      setVerified(true);
      setLoading(false);
      toast.success("Email verified successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error("Error while verifying email!");
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken || "");
    console.log("Token from URL:", urlToken);
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="flex flex-col gap-2">
        <h1>Verify Email</h1>
        <h2>Click on the button below to verify your email</h2>

        <button
          disabled={loading || verified}
          className="p-2 w-full bg-white text-black rounded-lg cursor-pointer 
                     disabled:bg-neutral-600 disabled:text-neutral-400"
          onClick={verifyEmail}
        >
          {loading
            ? "Verifying email..."
            : verified
            ? "Email Verified"
            : "Verify email"}
        </button>
      </div>
    </div>
  );
};

export default Page;
