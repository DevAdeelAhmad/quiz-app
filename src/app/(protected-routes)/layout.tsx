import RedirectToSignIn from "@/components/RedirectToSignIn";
import React, { ReactNode } from "react";
interface ProtectedLayoutProps {
  children: ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return <RedirectToSignIn>{children}</RedirectToSignIn>;
};

export default ProtectedLayout;
