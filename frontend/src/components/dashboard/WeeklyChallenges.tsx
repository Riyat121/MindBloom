import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, CheckCircle2, Circle, Flame } from "lucide-react";
import { MoodLog } from "@/hooks/useMoodData";
import { isSameDay, subDays } from "date-fns";

interface WeeklyChallengesProps {
	logs: MoodLog[];
}

export const WeeklyChallenges = ({ logs }: WeeklyChallengesProps) => {
	const progress = useMemo(() => {
		const today = new Date();

		// Challenge 1: Log Streak (3 days)
		let streak = 0;
		for (let i = 0; i < 7; i++) {
			const checkDate = subDays(today, i);
			const hasLog = logs.some(log => isSameDay(new Date(log.timestamp), checkDate));
			if (hasLog) streak++;
			else break;
		}

		// Challenge 2: Sleep Goal (> 7h for 2 days)
		const sleepGoalCount = logs.filter(log => log.sleep >= 7).length;

		// Challenge 3: High Energy (2 days)
		const energyGoalCount = logs.filter(log => log.energy === 'High').length;

		return {
			streak: Math.min(streak, 3),
			sleep: Math.min(sleepGoalCount, 2),
			energy: Math.min(energyGoalCount, 2)
		};
	}, [logs]);

	const challenges = [
		{
			id: 1,
			title: "Consistency King",
			desc: "Log your mood 3 days in a row",
			current: progress.streak,
			target: 3,
			icon: <Flame className="h-5 w-5 text-orange-500" />
		},
		{
			id: 2,
			title: "Sleep Master",
			desc: "Sleep 7+ hours for 2 days",
			current: progress.sleep,
			target: 2,
			icon: <Trophy className="h-5 w-5 text-yellow-500" />
		},
		{
			id: 3,
			title: "Energy Boost",
			desc: "Report 'High' energy 2 times",
			current: progress.energy,
			target: 2,
			icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
		}
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Trophy className="h-5 w-5 text-primary" />
					Weekly Challenges
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{challenges.map(challenge => {
					const isComplete = challenge.current >= challenge.target;
					return (
						<div key={challenge.id} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
							<div className="flex items-center gap-3">
								<div className={`p-2 rounded-full ${isComplete ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
									{challenge.icon}
								</div>
								<div>
									<p className={`font-medium ${isComplete ? 'line-through text-muted-foreground' : ''}`}>
										{challenge.title}
									</p>
									<p className="text-xs text-muted-foreground">{challenge.desc}</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-sm font-bold text-muted-foreground">
									{challenge.current}/{challenge.target}
								</span>
								{isComplete ? (
									<CheckCircle2 className="h-5 w-5 text-green-500" />
								) : (
									<Circle className="h-5 w-5 text-gray-300" />
								)}
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
};
