import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodLog } from "@/hooks/useMoodData";
import { format } from "date-fns";

export function MoodChart({ data }: { data: MoodLog[] }) {
	const chartData = data.map(log => ({
		date: format(new Date(log.timestamp), "MMM d"),
		mood: log.mood,
		sleep: log.sleep
	}));

	return (
		<Card className="col-span-2">
			<CardHeader>
				<CardTitle>Mood & Sleep Trends</CardTitle>
			</CardHeader>
			<CardContent className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={chartData}>
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
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Area type="monotone" dataKey="mood" stroke="#8884d8" fillOpacity={1} fill="url(#colorMood)" name="Mood (1-10)" />
						<Area type="monotone" dataKey="sleep" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSleep)" name="Sleep (hrs)" />
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
