import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Gabriel R",
    date: "Jul 2025",
    text: "It's really useful to help your therapist keep track of how you're doing with medication and/or how you do on a daily basis.",
  },
  {
    name: "Zoabdy",
    date: "Sep 2024",
    text: "I downloaded this app to get a better view of my changing moods and hope to recognize patterns in my behavior. I like how customizable it is and how you can even add timestamped notes if things are changing throughout the day.",
  },
  {
    name: "Sarah M",
    date: "Dec 2024",
    text: "This has been an extremely useful app to both me and my psychiatrist. Paired with a chart of what 'mild, moderate, severe' mean for each mood, tracking my symptoms became a breeze and relaying info to my psych is so easy. After one full year of tracking, I am stable but will continue using this app daily to watch for any changes in mood. Thank you so much!!",
  },
];

export const Reviews = () => {
  return (
    <section className="py-20 bg-background" id="reviews">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mindbloom Reviews
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            See What Our Users Say
          </p>
          
          <div className="flex justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-foreground/80 leading-relaxed">
                {review.text}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.date}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
