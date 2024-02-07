"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuProps {
  classes: string;
}
const ThemeSwitcher: React.FC<DropdownMenuProps> = ({ classes }) => {
  const { setTheme, theme } = useTheme();

  const isDarkMode = theme === "dark";

  return (
    <div className={classes}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"} size="icon">
            {isDarkMode ? (
              <>
                <MoonIcon className="h-[1.2rem] w-[1.2rem] transform -scale-x-100 scale-100 text-dark dark:text-main transition-all" />
                <span className="sr-only">Toggle to dark theme</span>
              </>
            ) : (
              <>
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-dark dark:text-main" />
                <span className="sr-only">Toggle to light theme</span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[2000]" align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitcher;
