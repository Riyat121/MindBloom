import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoodLog } from "@/hooks/useMoodData";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend
} from "recharts";
import { format, parseISO } from "date-fns";

import { useInsights } from "@/hooks/useInsights";

interface AnalyticsViewProps {
	logs: MoodLog[];
}

export function AnalyticsView({ logs }: AnalyticsViewProps) {
	const [chartType, setChartType] = useState("line");
	const insights = useInsights(logs);

	// Process data for charts
	const data = logs.map(log => ({
		date: format(parseISO(log.timestamp), "MMM dd"),
		mood: log.mood,
		sleep: log.sleep,
		energyLevel: log.energy === "High" ? 3 : log.energy === "Medium" ? 2 : 1
	})).reverse(); // Oldest first for trend

	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white dark:bg-gray-800 p-3 border rounded shadow-lg text-sm">
					<p className="font-bold mb-1">{label}</p>
					{payload.map((entry: any, index: number) => (
						<p key={index} style={{ color: entry.color }}>
							{entry.name}: {entry.value}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<Card className="col-span-1 md:col-span-3">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Detailed Analytics</CardTitle>
				<Select value={chartType} onValueChange={setChartType}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select Chart Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="line">Mood Trend (Line)</SelectItem>
						<SelectItem value="bar">Mood Distribution (Bar)</SelectItem>
						<SelectItem value="area">Sleep & Mood (Area)</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent>
				<div className="h-[400px] w-full mb-8">
					<ResponsiveContainer width="100%" height="100%">
						{chartType === "line" ? (
							<LineChart data={data}>
								<CartesianGrid strokeDasharray="3 3" opacity={0.3} />
								<XAxis dataKey="date" />
								<YAxis domain={[0, 10]} />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Mood" />
								<Line type="monotone" dataKey="sleep" stroke="#82ca9d" strokeWidth={2} name="Sleep (hrs)" />
							</LineChart>
						) : chartType === "bar" ? (
							<BarChart data={data}>
								<CartesianGrid strokeDasharray="3 3" opacity={0.3} />
								<XAxis dataKey="date" />
								<YAxis domain={[0, 10]} />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Bar dataKey="mood" fill="#8884d8" name="Mood" radius={[4, 4, 0, 0]} />
								<Bar dataKey="sleep" fill="#82ca9d" name="Sleep (hrs)" radius={[4, 4, 0, 0]} />
							</BarChart>
						) : (
							<AreaChart data={data}>
								<defs>
									<linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="date" />
								<YAxis domain={[0, 10]} />
								<CartesianGrid strokeDasharray="3 3" opacity={0.3} />
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Area type="monotone" dataKey="mood" stroke="#8884d8" fillOpacity={1} fill="url(#colorMood)" name="Mood" />
								<Area type="monotone" dataKey="sleep" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSleep)" name="Sleep (hrs)" />
							</AreaChart>
						)}
					</ResponsiveContainer>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-semibold mb-4">Emotional Triggers (from your journals)</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{insights.length === 0 ? (
							<p className="text-muted-foreground col-span-3 text-center py-4">
								No patterns detected yet. Keep journaling to see insights!
							</p>
						) : (
							insights.map((insight) => (
								<div key={insight.category} className="p-4 rounded-lg border bg-card/50 flex items-center justify-between">
									<div>
										<p className="font-medium">{insight.category}</p>
										<p className="text-sm text-muted-foreground">{insight.count} mentions</p>
									</div>
									<div className={`text-right ${insight.impact === 'positive' ? 'text-green-500' :
										insight.impact === 'negative' ? 'text-red-500' : 'text-yellow-500'
										}`}>
										<p className="font-bold text-xl">{insight.avgMood}</p>
										<p className="text-xs">Avg Mood</p>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
