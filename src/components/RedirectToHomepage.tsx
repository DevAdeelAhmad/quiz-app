"use client";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import React, { ReactNode } from "react";
interface RedirectToHomepageProps {
  children: ReactNode;
}

const RedirectToHomepage = ({ children }: RedirectToHomepageProps) => {
  const { user } = UserAuth();
  const router = useRouter();
  if (user) {
    if (typeof window !== "undefined") {
      router.push("/");
    }
    return null;
  } else return <div>{children}</div>;
};

export default RedirectToHomepage;
