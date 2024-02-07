"use client";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import React, { ReactNode } from "react";
interface RedirectToSignInProps {
  children: ReactNode;
}

const RedirectToSignIn = ({ children }: RedirectToSignInProps) => {
  const { user } = UserAuth();
  const router = useRouter();
  if (!user) {
    if (typeof window !== 'undefined') {
        router.push('/signin');
    }
    return null;
}
else
  return <div>{children}</div>;
};

export default RedirectToSignIn;
