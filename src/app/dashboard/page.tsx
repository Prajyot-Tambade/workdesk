"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  const userCache = useRef<any>(null);

  const getUserDetails = async () => {
    if (userCache.current) {
      console.log(userCache.current)
      return userCache.current;
    }
    try {
      const res = await axios.post("/api/auth/getuser");
      userCache.current = res.data.user;
      setUserData(res.data.user);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout ");
      toast.success("Logout successfully");
      router.push("/");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Error while logout");
    }
  };
  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      <h2>Hello {userData?.username}</h2>
      <button className="p-2 bg-white text-black rounded-lg" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default page;
