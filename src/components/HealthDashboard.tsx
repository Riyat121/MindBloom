import React from 'react';
import HealthProfile from './HealthProfile';
import { motion } from 'framer-motion';
import HealthLogForm from './HealthLogForm';
import { useHealthData } from '@/hooks/useHealthData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const HealthDashboard = () => {
	const { healthLogs } = useHealthData();

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
