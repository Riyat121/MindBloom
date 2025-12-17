// src/pages/Index.tsx

// --- CORRECTED IMPORTS ---

// This file uses named export
// This file uses named export
import { Navigation } from "@/components/Navigation";

// These files use "export function Name()" or "export const Name"
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Reviews } from "@/components/Reviews";
import { Pricing } from "@/components/Pricing";
import { Blog } from "@/components/Blog";

// This file uses "export function Component()"
import { Component as Footer } from "@/components/Footer";

// --- YOUR COMPONENT ---

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <Reviews />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;