import { Card } from "@/components/ui/card";
import { LineChart, Shield, FileText, Smartphone } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Track Daily Moods",
    description:
      "Monitor your emotional patterns with easy-to-use mood tracking tools designed for clinical accuracy.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data is secure and private. Track offline and sync when ready, with full control over your information.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description:
      "Generate comprehensive reports for your healthcare provider with charts and insights from your tracking data.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description:
      "Access your mood tracker on any device - mobile, tablet, or desktop. Online or offline capability.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything You Need to Track Your Mental Health
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
          Powerful features designed with healthcare professionals to help you
          understand your emotional patterns.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 space-y-4 bg-card border border-border/40 hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
