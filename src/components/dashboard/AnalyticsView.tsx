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

interface AnalyticsViewProps {
	logs: MoodLog[];
}

export function AnalyticsView({ logs }: AnalyticsViewProps) {
	const [chartType, setChartType] = useState("line");

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
				<div className="h-[400px] w-full">
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
			</CardContent>
		</Card>
	);
}
