import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.png";


import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <section className="bg-hero-gradient py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                The Easiest Way to Track Your Moods Online or Offline
              </h1>
              
              <p className="text-xl md:text-2xl text-primary font-semibold">
                Recommended by Psychologists, Therapists, and Social Workers
              </p>
              
              <div className="h-1 w-24 bg-primary rounded-full"></div>
            </div>
            
            <div className="space-y-4 text-lg text-foreground/80">
              <p>
                Mindbloom is a user-friendly app for patients to track symptom data relating to Bipolar I and II disorders, Depression, PTSD, and Anxiety Disorders.
              </p>
              
              <p>
                Identify triggers and patterns to help prevent relapses, and enhance doctor's visits with detailed data exports.
              </p>
            </div>
            
          <Button asChild variant="default" size="lg" className="group">
            <Link to="/auth">
              Start Tracking
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroDashboard} 
                alt="Mindbloom Dashboard Interface" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-400 to-amber-600 text-white px-6 py-8 rounded-xl shadow-xl transform rotate-3">
              <div className="text-center">
                <div className="text-2xl font-bold">BEST</div>
                <div className="text-xl font-semibold">APP</div>
                <div className="text-3xl font-bold">2024</div>
                <div className="text-xs mt-2 opacity-90">Bipolar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
