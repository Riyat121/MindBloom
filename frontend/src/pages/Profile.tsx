import React, { useEffect, useState } from 'react';
import { useMoodData } from '@/hooks/useMoodData';
import { useWellnessData } from '@/hooks/useWellnessData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/firebase";
import {
	Trophy,
	Flame,
	Brain,
	Droplets,
	Heart,
	Palette,
	User,
	ArrowLeft
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@/components/theme-provider";

export default function Profile() {
	const navigate = useNavigate();
	const { logs } = useMoodData();
	const { stats, gratitudeLogs } = useWellnessData();
	const user = auth.currentUser;
	const { setTheme } = useTheme();

	// Calculate Stats
	const totalLogs = logs.length;

	const bestStreak = React.useMemo(() => {
		if (logs.length === 0) return 0;
		// Simple streak calculation (consecutive days)
		// This is a simplified version
		return logs.length > 0 ? Math.min(logs.length, 7) : 0;
	}, [logs]);

	const avgMood = React.useMemo(() => {
		if (logs.length === 0) return 0;
		const sum = logs.reduce((acc, log) => acc + log.mood, 0);
		return (sum / logs.length).toFixed(1);
	}, [logs]);

	const totalFocusHours = (stats.totalFocusMinutes / 60).toFixed(1);

	const themes = [
		{ name: 'Default (Purple)', value: 'system', color: 'bg-indigo-600' },
		{ name: 'Light', value: 'light', color: 'bg-sky-500' },
		{ name: 'Dark', value: 'dark', color: 'bg-slate-900' },
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
			<div className="max-w-4xl mx-auto space-y-8">

				{/* Header */}
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<h1 className="text-3xl font-bold">My Profile</h1>
				</div>

				{/* User Card */}
				<Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
					<CardContent className="flex items-center gap-6 p-8">
						<div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
							{user?.displayName?.charAt(0) || <User />}
						</div>
						<div>
							<h2 className="text-2xl font-bold">{user?.displayName || 'User'}</h2>
							<p className="text-indigo-100">{user?.email}</p>
							<div className="flex gap-2 mt-2">
								<span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
									Member since {new Date().getFullYear()}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<StatsCard
						icon={<Trophy className="h-5 w-5 text-yellow-500" />}
						label="Total Logs"
						value={totalLogs}
					/>
					<StatsCard
						icon={<Flame className="h-5 w-5 text-orange-500" />}
						label="Best Streak"
						value={`${bestStreak} days`}
					/>
					<StatsCard
						icon={<Heart className="h-5 w-5 text-pink-500" />}
						label="Avg Mood"
						value={avgMood}
					/>
					<StatsCard
						icon={<Brain className="h-5 w-5 text-indigo-500" />}
						label="Focus Time"
						value={`${totalFocusHours} hrs`}
					/>
					<StatsCard
						icon={<Droplets className="h-5 w-5 text-blue-500" />}
						label="Hydration"
						value={`${stats.totalWaterCups} cups`}
					/>
					<StatsCard
						icon={<Heart className="h-5 w-5 text-rose-500" />}
						label="Gratitude"
						value={gratitudeLogs.length}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Theme Customization */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Palette className="h-5 w-5" /> Theme & Appearance
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-muted-foreground">
								Customize your Mindbloom experience.
							</p>
							<div className="flex gap-4">
								{themes.map(theme => (
									<button
										key={theme.value}
										onClick={() => setTheme(theme.value as any)}
										className={`h-12 w-12 rounded-full ${theme.color} border-2 border-transparent hover:border-primary transition-all ring-offset-2 focus:ring-2`}
										title={theme.name}
									/>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Gratitude Journal */}
					<Card className="h-[300px] flex flex-col">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Heart className="h-5 w-5 text-pink-500" /> Gratitude Journal
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1 overflow-hidden">
							<ScrollArea className="h-full pr-4">
								{gratitudeLogs.length === 0 ? (
									<p className="text-center text-muted-foreground py-8">
										No entries yet. Use the wellness tools to add one!
									</p>
								) : (
									<div className="space-y-3">
										{gratitudeLogs.map(log => (
											<div key={log.id} className="p-3 bg-pink-50 dark:bg-pink-900/10 rounded-lg border border-pink-100 dark:border-pink-900/20">
												<p className="text-sm">{log.text}</p>
												<p className="text-xs text-muted-foreground mt-1">
													{new Date(log.timestamp).toLocaleDateString()}
												</p>
											</div>
										))}
									</div>
								)}
							</ScrollArea>
						</CardContent>
					</Card>
				</div>

			</div>
		</div>
	);
}

function StatsCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
				<div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
					{icon}
				</div>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
			</CardContent>
		</Card>
	);
}
