import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import { Link } from "react-router-dom"; // <-- 1. IMPORT LINK HERE

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoIcon} alt="eMoods Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-foreground">MindBloom</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <a
              href="#reviews"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Reviews
            </a>
            <a
              href="#blog"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
          </div>

          {/* 2. ADD "asChild" TO THE BUTTON AND WRAP THE TEXT IN A <Link> */}
          <Button asChild variant="hero" size="lg">
            <Link to="/auth">Login / Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};