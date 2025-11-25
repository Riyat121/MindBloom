import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MoodLog } from "@/hooks/useMoodData";

interface MoodSummaryProps {
	logs: MoodLog[];
	className?: string;
}

export const MoodSummary = ({ logs, className }: MoodSummaryProps) => {
	const insights = useMemo(() => {
		if (logs.length < 2) return null;

		const recentLogs = logs.slice(0, 7); // Last 7 entries
		const currentAvg = recentLogs.reduce((acc, log) => acc + log.mood, 0) / recentLogs.length;

		// Compare with previous period if available
		const previousLogs = logs.slice(7, 14);
		let trend = 'stable';
		let percentChange = 0;

		if (previousLogs.length > 0) {
			const prevAvg = previousLogs.reduce((acc, log) => acc + log.mood, 0) / previousLogs.length;
			percentChange = ((currentAvg - prevAvg) / prevAvg) * 100;
			if (percentChange > 5) trend = 'up';
			else if (percentChange < -5) trend = 'down';
		}

		// Count emotions
		const emotionCounts: Record<string, number> = {};
		recentLogs.forEach(log => {
			log.emotions.forEach(emotion => {
				emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
			});
		});

		const topEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];

		// Sleep trend
		const sleepAvg = recentLogs.reduce((acc, log) => acc + log.sleep, 0) / recentLogs.length;

		return {
			currentAvg: currentAvg.toFixed(1),
			trend,
			percentChange: Math.abs(Math.round(percentChange)),
			topEmotion: topEmotion ? { name: topEmotion[0], count: topEmotion[1] } : null,
			sleepAvg: sleepAvg.toFixed(1)
		};
	}, [logs]);

	if (!insights) return null;

	return (
		<Card className={`bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none shadow-lg rounded-2xl flex flex-col ${className}`}>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-lg font-medium text-white/90">
					<Sparkles className="h-5 w-5 text-yellow-300" />
					Weekly Insights
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4 flex-1 flex flex-col justify-center">
				<div className="flex items-start gap-4">
					<div className="flex-1 space-y-1">
						<p className="font-medium text-lg leading-snug">
							{insights.trend === 'up' && `Your mood improved ${insights.percentChange}% this week! 🚀`}
							{insights.trend === 'down' && `It's been a tough week. Take it easy. 💙`}
							{insights.trend === 'stable' && `Your mood has been stable this week. 🧘`}
						</p>

						<div className="text-sm text-white/80 space-y-1 pt-1">
							{insights.topEmotion && (
								<p>You felt <span className="font-bold text-white">{insights.topEmotion.name}</span> on {insights.topEmotion.count} days.</p>
							)}
							<p>Average sleep: <span className="font-bold text-white">{insights.sleepAvg} hours</span>.</p>
						</div>
					</div>

					<div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm flex flex-col items-center min-w-[80px]">
						<span className="text-xs text-white/80 uppercase tracking-wider">Avg Mood</span>
						<span className="text-3xl font-bold">{insights.currentAvg}</span>
						{insights.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-300" />}
						{insights.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-300" />}
						{insights.trend === 'stable' && <Minus className="h-4 w-4 text-white/50" />}
					</div>
				</div>
				<div className="mt-auto pt-2 text-xs text-white/60 text-center border-t border-white/10">
					{new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')} - {new Date().toLocaleDateString('en-GB')}
				</div>
			</CardContent>
		</Card>
	);
};
