import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodLog } from "@/hooks/useMoodData";
import { Lightbulb, Moon, Battery, Smile } from "lucide-react";

export function Suggestions({ logs }: { logs: MoodLog[] }) {
	if (logs.length === 0) return null;

	const latest = logs[logs.length - 1];
	const suggestions = [];

	if (latest.sleep < 6) {
		suggestions.push({
			icon: <Moon className="text-indigo-500" />,
			title: "Improve Sleep",
			text: "You slept less than 6 hours. Try a wind-down routine tonight."
		});
	}

	if (latest.mood < 5) {
		suggestions.push({
			icon: <Smile className="text-yellow-500" />,
			title: "Boost Mood",
			text: "Feeling low? A short walk or calling a friend might help."
		});
	}

	if (latest.energy === "Low") {
		suggestions.push({
			icon: <Battery className="text-red-500" />,
			title: "Recharge",
			text: "Low energy detected. Stay hydrated and take short breaks."
		});
	}

	if (suggestions.length === 0) {
		suggestions.push({
			icon: <Lightbulb className="text-yellow-400" />,
			title: "Keep it up!",
			text: "You're doing great! Maintain your healthy habits."
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Personalized Tips</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{suggestions.map((s, i) => (
					<div key={i} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
						<div className="mt-1">{s.icon}</div>
						<div>
							<h4 className="font-semibold text-sm">{s.title}</h4>
							<p className="text-sm text-muted-foreground">{s.text}</p>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
