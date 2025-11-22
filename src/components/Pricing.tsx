import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
	{
		name: "Free",
		price: "₹0",
		description: "Essential mood tracking for everyone.",
		features: ["Daily Mood Logging", "Basic Charts", "Local Data Storage"],
		buttonText: "Current Plan",
		popular: false,
	},
	{
		name: "Standard",
		price: "₹299",
		description: "Unlock more insights and resources.",
		features: ["Everything in Free", "Weekly Reports", "Access to Resources", "Export Data"],
		buttonText: "Upgrade",
		popular: false,
	},
	{
		name: "Pro",
		price: "₹499",
		description: "Complete mental wellness toolkit.",
		features: ["Everything in Standard", "AI Chatbot Companion", "Advanced Analytics", "Priority Support"],
		buttonText: "Upgrade",
		popular: true,
	},
];

export const Pricing = () => {
	return (
		<section id="pricing" className="py-20 bg-secondary/20">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground">
						Simple, Transparent Pricing
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Choose the plan that fits your journey. No hidden fees. Cancel anytime.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
					{plans.map((plan) => (
						<Card
							key={plan.name}
							className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
									Most Popular
								</div>
							)}
							<CardHeader>
								<CardTitle className="text-2xl">{plan.name}</CardTitle>
								<div className="mt-4">
									<span className="text-4xl font-bold">{plan.price}</span>
									<span className="text-muted-foreground">/month</span>
								</div>
								<CardDescription className="mt-2">{plan.description}</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<ul className="space-y-3">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
											<Check className="h-4 w-4 text-green-500 flex-shrink-0" />
											{feature}
										</li>
									))}
								</ul>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full"
									variant={plan.popular ? "default" : "outline"}
								>
									{plan.buttonText}
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
