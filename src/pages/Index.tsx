// src/pages/Index.tsx

// --- CORRECTED IMPORTS ---

// This file uses named export
import { Navigation } from "@/components/Navigation";

// These files use "export function Name()" or "export const Name"
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features"; // This now matches your new .tsx file
import { Reviews } from "@/components/Reviews";

// This file uses "export function Component()"
import { Component as Footer } from "@/components/Footer";

// --- YOUR COMPONENT ---

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Index;