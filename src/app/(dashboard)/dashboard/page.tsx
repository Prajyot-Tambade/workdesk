"use client";
import { DashboardHeader } from "@/components/Dashboard/dashboard-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  // const [userData, setUserData] = useState<any>(null);

  // const userCache = useRef<any>(null);

  // const getUserDetails = async () => {
  //   if (userCache.current) {
  //     console.log(userCache.current)
  //     return userCache.current;
  //   }
  //   try {
  //     const res = await axios.post("/api/auth/getuser");
  //     userCache.current = res.data.user;
  //     setUserData(res.data.user);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  const router = useRouter();

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
    <div className="">
      <DashboardHeader title="Dashboard" />
      <div className="p-2">
        <Tabs defaultValue="in Progress" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="in Progress">In Progress</TabsTrigger>
            <TabsTrigger value="client Review">Client Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="in Progress"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
