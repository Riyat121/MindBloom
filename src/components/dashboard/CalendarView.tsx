import { DayPicker } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { MoodLog } from "@/hooks/useMoodData";
import { parseISO } from "date-fns";
import "react-day-picker/dist/style.css";

interface CalendarViewProps {
	logs: MoodLog[];
}

export function CalendarView({ logs }: CalendarViewProps) {
	// Extract dates from logs
	const loggedDays = logs.map(log => parseISO(log.timestamp));

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CalendarIcon className="h-5 w-5 text-primary" />
					Mood Calendar
				</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-center">
				<DayPicker
					mode="multiple"
					selected={loggedDays}
					modifiers={{
						logged: loggedDays
					}}
					modifiersStyles={{
						logged: {
							fontWeight: 'bold',
							backgroundColor: 'var(--primary)',
							color: 'white',
							borderRadius: '50%'
						},
						today: {
							fontWeight: 'bold',
							color: 'var(--primary)',
							border: '2px solid var(--primary)',
							borderRadius: '50%'
						}
					}}
					className="p-3"
				/>
			</CardContent>
		</Card>
	);
}
