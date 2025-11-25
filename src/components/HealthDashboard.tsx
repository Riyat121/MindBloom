import React from 'react';
import HealthProfile from './HealthProfile';
import { motion } from 'framer-motion';
import HealthLogForm from './HealthLogForm';
import { useHealthData } from '@/hooks/useHealthData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moon } from "lucide-react";

const HealthDashboard = () => {
	const { healthLogs } = useHealthData();

	const sleepAnalysis = React.useMemo(() => {
		if (healthLogs.length === 0) return null;

		const recentLogs = healthLogs.slice(0, 7);
		const avgSleep = recentLogs.reduce((acc, log) => acc + log.sleepHours, 0) / recentLogs.length;

		// Calculate Quality Score (0-100)
		// Base: 70
		// +10 for each hour > 7 (max 20)
		// +20 for "Good", +0 for "Average", -20 for "Poor"
		const qualityScore = recentLogs.reduce((acc, log) => {
			let score = 70;
			if (log.sleepHours >= 7) score += Math.min((log.sleepHours - 7) * 10, 20);
			else score -= (7 - log.sleepHours) * 10;

			if (log.sleepQuality === 'Good') score += 20;
			if (log.sleepQuality === 'Poor') score -= 20;

			return acc + score;
		}, 0) / recentLogs.length;

		return {
			avgSleep: avgSleep.toFixed(1),
			qualityScore: Math.round(Math.max(0, Math.min(100, qualityScore))),
			recommendation: avgSleep < 7 ? "Try sleeping 30m earlier tonight." : "Great sleep routine! Keep it up."
		};
	}, [healthLogs]);

	return (
		<div className="container mx-auto p-6 space-y-8 pb-20 md:pb-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="space-y-2"
			>
				<h1 className="text-3xl font-bold tracking-tight">Health & Wellness</h1>
				<p className="text-muted-foreground">
					Track your physical health metrics and get personalized recommendations.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<HealthProfile />
			</motion.div>

			{sleepAnalysis && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15 }}
				>
					<Card className="bg-indigo-900 text-white border-none">
						<CardContent className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
							<div className="space-y-2">
								<h3 className="text-xl font-bold flex items-center gap-2">
									<Moon className="h-5 w-5 text-indigo-300" />
									Sleep Analysis
								</h3>
								<p className="text-indigo-200">
									Your average sleep this week is <span className="font-bold text-white">{sleepAnalysis.avgSleep} hours</span>.
									<br />
									{sleepAnalysis.recommendation}
								</p>
							</div>
							<div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
								<div className="text-center">
									<p className="text-xs text-indigo-300 uppercase">Quality Score</p>
									<p className="text-3xl font-bold">{sleepAnalysis.qualityScore}</p>
								</div>
								<div className="h-10 w-[1px] bg-indigo-500/50" />
								<div className="text-center">
									<p className="text-xs text-indigo-300 uppercase">Avg Hours</p>
									<p className="text-3xl font-bold">{sleepAnalysis.avgSleep}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="lg:col-span-1"
				>
					<HealthLogForm />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="lg:col-span-2"
				>
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Recent History</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-[300px] pr-4">
								<div className="space-y-4">
									{healthLogs.length === 0 ? (
										<p className="text-muted-foreground text-center py-8">No health logs yet. Start tracking today!</p>
									) : (
										healthLogs.map((log) => (
											<div key={log.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
												<div>
													<p className="font-medium">{new Date(log.timestamp).toLocaleDateString()}</p>
													<p className="text-sm text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
												</div>
												<div className="flex gap-6 text-sm">
													<div className="flex flex-col items-end">
														<span className="font-semibold text-indigo-600 dark:text-indigo-400">{log.sleepHours}h</span>
														<span className="text-muted-foreground">Sleep</span>
													</div>
													<div className="flex flex-col items-end">
														<span className="font-semibold text-rose-600 dark:text-rose-400">{log.heartRate} bpm</span>
														<span className="text-muted-foreground">Heart Rate</span>
													</div>
													<div className="flex flex-col items-end">
														<span className="font-semibold text-emerald-600 dark:text-emerald-400">{log.sleepQuality}</span>
														<span className="text-muted-foreground">Quality</span>
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
};

export default HealthDashboard;
