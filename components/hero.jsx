"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  return (
    <section className="w-full pt-36 md:pt-48 pb-20 text-white relative overflow-hidden">
      <div className="space-y-8 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-4xl mx-auto">
          Empower Your Career with{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-mono">
            AI-Driven Coaching
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-gray-300 text-lg md:text-xl leading-relaxed">
          Personalized guidance, expert interview preparation, and smart tools — all tailored to accelerate your professional journey.
        </p>

        <div className="flex justify-center mt-8 animate-fadeUp delay-400">
          <Link href="/dashboard" passHref>
            <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:from-blue-500 hover:to-cyan-400 transition-transform transform hover:scale-105"
            >
                Get Started
            </Button>
          </Link>
        </div>

        <div ref={imageRef} className="hero-image-container mx-auto mt-12 md:mt-16">
          <Image
            src="/banner.png"
            width={2000}
            height={1200}
            alt="Dashboard Preview"
            className="hero-image"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;