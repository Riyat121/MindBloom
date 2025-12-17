import { useMemo } from 'react';
import { MoodLog } from './useMoodData';

interface TriggerInsight {
	category: string;
	avgMood: number;
	count: number;
	impact: 'negative' | 'positive' | 'neutral';
}

const KEYWORDS = {
	Academic: ['exam', 'study', 'test', 'homework', 'school', 'grade', 'class'],
	Financial: ['money', 'rent', 'cost', 'expensive', 'bill', 'debt', 'pay'],
	Social: ['friend', 'party', 'hangout', 'date', 'social', 'meet'],
	Family: ['mom', 'dad', 'sister', 'brother', 'family', 'parent'],
	Health: ['sick', 'pain', 'tired', 'sleep', 'gym', 'workout', 'run'],
	Work: ['job', 'boss', 'meeting', 'deadline', 'work', 'office']
};

export function useInsights(logs: MoodLog[]) {
	const insights = useMemo(() => {
		const categoryStats: Record<string, { totalMood: number; count: number }> = {};

		logs.forEach(log => {
			if (!log.journal) return;

			const text = log.journal.toLowerCase();

			Object.entries(KEYWORDS).forEach(([category, words]) => {
				if (words.some(word => text.includes(word))) {
					if (!categoryStats[category]) {
						categoryStats[category] = { totalMood: 0, count: 0 };
					}
					categoryStats[category].totalMood += log.mood;
					categoryStats[category].count += 1;
				}
			});
		});

		const results: TriggerInsight[] = Object.entries(categoryStats)
			.map(([category, stats]) => {
				const avgMood = stats.totalMood / stats.count;
				let impact: 'negative' | 'positive' | 'neutral' = 'neutral';

				if (avgMood < 5) impact = 'negative';
				if (avgMood > 7) impact = 'positive';

				return {
					category,
					avgMood: parseFloat(avgMood.toFixed(1)),
					count: stats.count,
					impact
				};
			})
			.filter(insight => insight.count >= 2) // Only show if appeared at least twice
			.sort((a, b) => a.avgMood - b.avgMood); // Sort by lowest mood first (triggers)

		return results;
	}, [logs]);

	return insights;
}
