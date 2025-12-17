import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Resources() {
	return (
		<Card className="col-span-1 md:col-span-3">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<BookOpen className="h-5 w-5 text-primary" />
					Mental Health Resources
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4 md:grid-cols-3">
				{/* Crisis Hotline */}
				<div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20 space-y-2">
					<div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
						<Phone className="h-5 w-5" />
						<h3>Crisis Hotline</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						If you are in immediate danger, please call 911 or your local emergency number.
					</p>
					<div className="pt-2">
						<p className="font-medium">National Suicide Prevention Lifeline</p>
						<p className="text-lg font-bold">988</p>
					</div>
				</div>

				{/* Support Groups */}
				<div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 space-y-2">
					<div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
						<Users className="h-5 w-5" />
						<h3>Find a Support Group</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Connect with others who understand what you're going through.
					</p>
					<Button variant="link" className="p-0 h-auto text-blue-600" asChild>
						<a href="https://www.dbsalliance.org/" target="_blank" rel="noreferrer">
							DBSA Alliance <ExternalLink className="ml-1 h-3 w-3" />
						</a>
					</Button>
				</div>

				{/* Online Therapy */}
				<div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 space-y-2">
					<div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
						<BookOpen className="h-5 w-5" />
						<h3>Professional Help</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Find licensed therapists available online or in your area.
					</p>
					<Button variant="link" className="p-0 h-auto text-green-600" asChild>
						<a href="https://www.betterhelp.com/" target="_blank" rel="noreferrer">
							BetterHelp <ExternalLink className="ml-1 h-3 w-3" />
						</a>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
