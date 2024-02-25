import React, { ReactNode } from "react";
import Sidebar from "@/components/commons/Sidebar";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      {children}
    </div>
  );
};

export default AuthLayout;
