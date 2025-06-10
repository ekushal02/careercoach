"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  PenBox,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderClient() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY === 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoClass = isHydrated
    ? "h-48 py-1 w-auto object-contain"
    : "h-40 py-1 w-auto object-contain";

  return (
    <header
      className={`fixed top-0 w-full z-50 border-b ${
        isAtTop
          ? "bg-gradient-to-b from-background via-background to-[#0f172a] border-border"
          : "bg-transparent border-transparent"
      } transition-colors duration-300 ease-in-out`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Sensai Logo"
            width={200}
            height={60}
            className={logoClass}
          />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-background to-blue-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:from-blue-500 hover:to-background transition-transform transform hover:scale-105"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button
                className="md:hidden w-10 h-10 p-0 bg-gradient-to-r from-background to-blue-500 text-white rounded-full shadow-lg hover:from-blue-500 hover:to-background transition-transform transform hover:scale-105"
              >
                <LayoutDashboard className="h-4 w-4 mx-auto" />
              </Button>


            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-background to-cyan-400 text-white shadow-md hover:from-cyan-400 hover:to-background hover:scale-105 transition-all duration-300">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              {/* This ensures the menu renders correctly in the DOM */}
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="z-[100] mt-2 w-48 rounded-xl shadow-lg border border-border bg-background backdrop-blur-md"
              >
                <div className="px-1 py-1">
                  <Link
                    href="/resume"
                    className="group flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-muted hover:text-blue-500"
                  >
                    <FileText className="h-4 w-4 transition-colors duration-200 group-hover:text-blue-500" />
                    Build Resume
                  </Link>

                  <Link
                    href="/ai-cover-letter"
                    className="group flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-muted hover:text-blue-500"
                  >
                    <PenBox className="h-4 w-4 transition-colors duration-200 group-hover:text-blue-500" />
                    Cover Letter
                  </Link>

                  <Link
                    href="/interview"
                    className="group flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-muted hover:text-blue-500"
                  >
                    <GraduationCap className="h-4 w-4 transition-colors duration-200 group-hover:text-blue-500" />
                    Interview Prep
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-transform transform hover:scale-105"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
