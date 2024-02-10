import RedirectToHomepage from "@/components/RedirectToHomepage";
import React, { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <RedirectToHomepage>{children}</RedirectToHomepage>;
};

export default AuthLayout;
