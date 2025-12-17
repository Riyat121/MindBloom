import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, TrendingDown, Minus, Moon, Brain } from "lucide-react";
import { MoodLog } from "@/hooks/useMoodData";
import { Card, CardContent } from "@/components/ui/card";

interface MoodReportProps {
	logs: MoodLog[];
}

export const MoodReport = ({ logs }: MoodReportProps) => {
	const generateReport = () => {
		if (logs.length === 0) return null;

		const recentLogs = logs.slice(0, 7);
		const avgMood = (recentLogs.reduce((acc, log) => acc + log.mood, 0) / recentLogs.length).toFixed(1);
		const avgSleep = (recentLogs.reduce((acc, log) => acc + log.sleep, 0) / recentLogs.length).toFixed(1);
		const avgEnergy = (recentLogs.reduce((acc, log) => acc + (log.energy === 'High' ? 3 : log.energy === 'Medium' ? 2 : 1), 0) / recentLogs.length);

		// Emotion Frequency
		const emotionCounts: Record<string, number> = {};
		recentLogs.forEach(log => {
			log.emotions.forEach(e => emotionCounts[e] = (emotionCounts[e] || 0) + 1);
		});
		const topEmotions = Object.entries(emotionCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 3)
			.map(([e]) => e)
			.join(", ");

		// Stress Prediction (Simple Heuristic)
		const stressKeywords = ['Anxious', 'Stressed', 'Overwhelmed', 'Tired'];
		const stressCount = recentLogs.filter(log =>
			log.emotions.some(e => stressKeywords.includes(e))
		).length;
		const stressLevel = stressCount > 3 ? "High" : stressCount > 1 ? "Moderate" : "Low";

		return {
			dateRange: `${new Date(recentLogs[recentLogs.length - 1].timestamp).toLocaleDateString()} - ${new Date(recentLogs[0].timestamp).toLocaleDateString()}`,
			avgMood,
			avgSleep,
			avgEnergy: avgEnergy > 2.5 ? "High" : avgEnergy > 1.5 ? "Medium" : "Low",
			topEmotions,
			stressLevel,
			totalLogs: recentLogs.length
		};
	};

	const report = generateReport();

	const handleDownload = () => {
		if (!report) return;

		const content = `
Mindbloom Weekly Mood Report
Date Range: ${report.dateRange}

SUMMARY
----------------------------
Average Mood: ${report.avgMood}/10
Average Sleep: ${report.avgSleep} hours
Energy Level: ${report.avgEnergy}
Stress Level: ${report.stressLevel}

EMOTIONAL INSIGHTS
----------------------------
Top Emotions: ${report.topEmotions}
Total Logs: ${report.totalLogs}

RECOMMENDATIONS
----------------------------
${report.stressLevel === 'High' ? '- Consider scheduling more downtime.\n- Try the 1-min breathing exercise.' : ''}
${Number(report.avgSleep) < 7 ? '- Your sleep is a bit low. Aim for 7-8 hours.' : '- Great job on maintaining good sleep!'}
- Keep logging to track your progress!
    `.trim();

		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `Mindbloom_Report_${new Date().toISOString().split('T')[0]}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	if (!report) return null;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<FileText className="h-4 w-4" /> Weekly Report
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Weekly Wellness Report</DialogTitle>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Key Stats */}
					<div className="grid grid-cols-2 gap-4">
						<Card className="bg-indigo-50 dark:bg-indigo-900/20 border-none">
							<CardContent className="p-4 flex flex-col items-center">
								<span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{report.avgMood}</span>
								<span className="text-xs text-muted-foreground">Avg Mood</span>
							</CardContent>
						</Card>
						<Card className="bg-blue-50 dark:bg-blue-900/20 border-none">
							<CardContent className="p-4 flex flex-col items-center">
								<span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{report.avgSleep}</span>
								<span className="text-xs text-muted-foreground">Avg Sleep (hrs)</span>
							</CardContent>
						</Card>
					</div>

					{/* Insights List */}
					<div className="space-y-3">
						<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div className="flex items-center gap-3">
								<Brain className="h-5 w-5 text-purple-500" />
								<span className="font-medium">Stress Level</span>
							</div>
							<span className={`px-2 py-1 rounded text-xs font-bold ${report.stressLevel === 'High' ? 'bg-red-100 text-red-700' :
									report.stressLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
										'bg-green-100 text-green-700'
								}`}>
								{report.stressLevel}
							</span>
						</div>

						<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div className="flex items-center gap-3">
								<Moon className="h-5 w-5 text-indigo-500" />
								<span className="font-medium">Top Emotions</span>
							</div>
							<span className="text-sm text-muted-foreground max-w-[150px] text-right truncate">
								{report.topEmotions}
							</span>
						</div>
					</div>

					{/* Download Action */}
					<Button onClick={handleDownload} className="w-full gap-2">
						<Download className="h-4 w-4" /> Download Full Report
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
