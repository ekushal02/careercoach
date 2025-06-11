"use client";

import HeroSection from "@/components/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      <HeroSection />

      {/* Features Section */}
      <section className="w-full py-16 md:py-28 lg:py-32 bg-gradient-to-b from-background via-background to-[#0f172a] relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-14 text-foreground">
            Supercharge Your Career with
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Mentora </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-transparent hover:border-cyan-500 hover:shadow-lg transition duration-300 rounded-2xl p-4 bg-transparent backdrop-blur-md"
              >
                <CardContent className="text-center flex flex-col items-center space-y-3">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto text-center">
            {[
              { stat: "75+", label: "Career Paths Mapped" },
              { stat: "2000+", label: "Curated Q&As" },
              { stat: "98%", label: "User Satisfaction" },
              { stat: "24×7", label: "AI Assistant Access" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-3 group transition duration-300 hover:scale-105"
              >
                <h3 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
                  {item.stat}
                </h3>
                <p className="text-sm text-gray-400 tracking-wide group-hover:text-gray-200 transition">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-28 lg:py-32 bg-gradient-to-b from-background via-background to-[#0f172a] relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-center mb-6 text-foreground">
              How
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Mentora </span>
              Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <Card
                key={index}
                className="border border-transparent hover:border-cyan-500 hover:shadow-lg transition duration-300 rounded-2xl p-6 bg-transparent backdrop-blur-md"
              >
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-screen overflow-x-hidden py-16 md:py-28 lg:py-32 bg-transparent relative z-10">
        <div className="max-w-screen px-4 md:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-center mb-12 text-foreground">
            What Our
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Users </span>
            Say
          </h2>

          <div className="relative w-full overflow-hidden py-8">
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none"></div>

            {/* Scroll Container */}
            <div className="scroll-container flex min-w-[300%] gap-6">
              {[...testimonial, ...testimonial, ...testimonial].map((item, index) => (
                <div
                  key={index}
                  className="inline-block w-80 flex-shrink-0"
                  onMouseEnter={() => {
                    const container = document.querySelector('.scroll-container');
                    if (container) container.style.animationPlayState = 'paused';
                  }}
                  onMouseLeave={() => {
                    const container = document.querySelector('.scroll-container');
                    if (container) container.style.animationPlayState = 'running';
                  }}
                >
                  <Card className="h-full border border-transparent hover:border-cyan-500 hover:shadow-lg transition duration-300 rounded-2xl p-6 bg-transparent backdrop-blur-md">
                    <CardContent className="flex flex-col justify-between h-full space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12">
                          <Image
                            width={48}
                            height={48}
                            src={item.image}
                            alt={item.author}
                            unoptimized
                            className="rounded-full object-cover border-2 border-primary/30"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.author}</p>
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                          <p className="text-sm text-primary">{item.company}</p>
                        </div>
                      </div>
                      <blockquote className="text-sm italic text-muted-foreground relative leading-relaxed">
                        <span className="text-2xl text-primary absolute -top-3 -left-2">&ldquo;</span>
                        {item.quote}
                        <span className="text-2xl text-primary absolute -bottom-2 right-1">&rdquo;</span>
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Questions </span>
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger
                    className="text-left transition-colors duration-300 data-[state=open]:bg-gradient-to-r data-[state=open]:from-cyan-400 data-[state=open]:to-blue-500 data-[state=open]:bg-clip-text data-[state=open]:text-transparent"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="w-full py-28 rounded-xl shadow-lg bg-transparent">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Unlock Your True Career 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Potential </span>
            </h2>
            <p className="max-w-2xl text-cyan-100 text-lg sm:text-xl leading-relaxed drop-shadow-sm">
              Join thousands of ambitious professionals who’ve accelerated their growth with Mentora. 
              Your dream job is closer than you think.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                Get Started Today  <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}