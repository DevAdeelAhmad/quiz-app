"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { Input } from "../ui/input";
import { UserAuth } from "@/context/AuthContext";
import { LuAlertTriangle } from "react-icons/lu";
import { useToast } from "../ui/use-toast";

const PasswordTab = () => {
  const { toast } = useToast();
  const { user } = UserAuth();

  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleCPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== cPassword) {
      setErrorMessage("Passwords did not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password length must be 6 or greater");
      return;
    }
    try {
      await updatePassword(user, password);
      toast({
        title: "Success",
        description: "Sign in Success!",
        variant: "success",
      });
    } catch (error: any) {
      console.log("error: ", error);

      setErrorMessage("An error occurred. Please try again.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <Card className="rounded-xl p-5 w-full">
      <h1 className="text-xl lg:text-2xl font-semibold text-center">
        Change Password
      </h1>
      <CardContent className="m-10 grid gap-4">
        <form className="flex flex-col gap-5" onSubmit={handleChangePassword}>
          <Input
            className="border-gray-800 rounded-full"
            type="password"
            required
            placeholder="Enter new password here"
            value={password}
            onChange={handlePasswordChange}
          />
          <Input
            className="border-gray-800 rounded-full"
            type="password"
            required
            placeholder="Re-enter your password here"
            value={cPassword}
            onChange={handleCPasswordChange}
          />
          <Button type="submit">Change</Button>
          {errorMessage && (
            <div className="flex items-center gap-2 text-red-600">
              <LuAlertTriangle color="red" size={25} />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordTab;
