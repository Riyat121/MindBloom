import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

const blogPosts = [
	{
		id: 1,
		title: "FDA Clears First Prescription Digital Therapeutic for Anxiety",
		excerpt: "The FDA has cleared DaylightRx, a smartphone-based app delivering cognitive behavioral therapy for generalized anxiety disorder, showing high remission rates.",
		date: "Sep 2024",
		readTime: "4 min read",
		category: "News",
		source: "The Online GP",
		image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" // Tech/Medical vibe
	},
	{
		id: 2,
		title: "Major Genetic Discoveries in Bipolar Disorder",
		excerpt: "A landmark study has identified nearly 300 gene locations associated with bipolar disorder, paving the way for more targeted and effective treatments.",
		date: "Oct 2024",
		readTime: "6 min read",
		category: "Research",
		source: "NIH / Broad Institute",
		image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" // Science/DNA vibe
	},
	{
		id: 3,
		title: "Nutritional Psychiatry: The Gut-Brain Connection",
		excerpt: "New research highlights how the gut microbiome influences mental health, suggesting that diet and probiotics could play a key role in managing mood disorders.",
		date: "Nov 2024",
		readTime: "5 min read",
		category: "Wellness",
		source: "Harvard Health",
		image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" // Healthy food vibe
	}
];

export const Blog = () => {
	return (
		<section id="blog" className="py-20">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16 space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-foreground">
						Latest Mental Health News
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Stay informed with the latest research and breakthroughs from trusted sources.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{blogPosts.map((post) => (
						<Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col group">
							<div className="h-48 overflow-hidden relative">
								<img
									src={post.image}
									alt={post.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
									Source: {post.source}
								</div>
							</div>
							<CardHeader>
								<div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
									<span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
										{post.category}
									</span>
									<span>{post.date} • {post.readTime}</span>
								</div>
								<CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
									{post.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-1">
								<p className="text-muted-foreground line-clamp-3">
									{post.excerpt}
								</p>
							</CardContent>
							<CardFooter className="border-t pt-4">
								<Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group/btn w-full justify-between">
									Read Report
									<ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
