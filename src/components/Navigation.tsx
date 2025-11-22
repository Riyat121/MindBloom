import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";
import { Link } from "react-router-dom"; // <-- 1. IMPORT LINK HERE
import { ModeToggle } from "@/components/mode-toggle";

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
            {["Features", "Pricing", "Reviews", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-base font-semibold text-foreground/80 hover:text-primary transition-all hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild variant="hero" size="lg">
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};