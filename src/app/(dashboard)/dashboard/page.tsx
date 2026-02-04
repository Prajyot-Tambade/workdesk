"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/Dashboard/dashboard-header";
import IconSelector from "@/components/ui/iconSelector";
import { IconName } from "lucide-react/dynamic";
import * as Icons from "lucide-react";
const toKebabCase = (str: string) =>
  str.replace(/Icon$/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2");
const iconNames = Object.keys(Icons)
  .filter(
    (key) =>
      key !== "createLucideIcon" &&
      !key.endsWith("Icon") &&
      key !== "Lucide React",
  )
  .map(toKebabCase) as IconName[];
const Page = () => {

  const [icon, setIcon] = useState<IconName | undefined>(undefined);
  return (
    <div className="">
      <DashboardHeader title="Dashboard" />
      <div className="p-4">
      </div>
    </div>
  );
};

export default Page;
